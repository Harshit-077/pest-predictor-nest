import { getTreatmentRecommendations, predictLeafHealth } from './modelService';
import { pipeline, env } from "@huggingface/transformers";

// Configure the transformers.js environment
env.allowLocalModels = false;
env.useBrowserCache = true;

// Model information
const MODEL_ID = "Xenova/vit-base-patch16-224";
const TENSORFLOWJS_MODEL_URL = '/models/leaf_health_model/model.json';

// Create a singleton pipeline instance
let classifierInstance: any = null;

/**
 * Initialize the image classification pipeline
 */
export const initClassifier = async () => {
  if (!classifierInstance) {
    try {
      console.log("Loading leaf classification model...");
      // Try to use the TensorFlow.js model first, fall back to Hugging Face if that fails
      try {
        // Attempt to load the TensorFlow.js model
        await predictLeafHealth(new Image(), TENSORFLOWJS_MODEL_URL);
        console.log("Custom TensorFlow.js model loaded successfully!");
        return true;
      } catch (tfError) {
        console.warn("Failed to load custom model, falling back to Hugging Face model:", tfError);
        // Fall back to Hugging Face model
        classifierInstance = await pipeline("image-classification", MODEL_ID);
        console.log("Hugging Face model loaded successfully!");
        return true;
      }
    } catch (error) {
      console.error("Error loading model:", error);
      return false;
    }
  }
  return true;
};

/**
 * Classify a leaf image as healthy or unhealthy
 * @param imageUrl URL of the image to classify
 */
export const classifyLeafImage = async (imageUrl: string) => {
  try {
    // Try using the TensorFlow.js model first
    try {
      // Load the image
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });
      
      // Use our custom model
      const result = await predictLeafHealth(img, TENSORFLOWJS_MODEL_URL);
      
      // Get treatment recommendations
      const recommendations = getTreatmentRecommendations(result.pestName);
      
      return {
        isHealthy: result.isHealthy,
        confidence: result.confidence,
        pestName: result.pestName || "",
        recommendations
      };
    } catch (tfError) {
      console.warn("Custom model prediction failed, falling back to Hugging Face:", tfError);
      
      // Fall back to Hugging Face model if TensorFlow.js model fails
      if (!classifierInstance) {
        const initialized = await initClassifier();
        if (!initialized) {
          throw new Error("Failed to initialize the model");
        }
      }
      
      // Classify using Hugging Face model
      const results = await classifierInstance(imageUrl);
      
      // Process results as before
      const diseaseKeywords = ["mold", "blight", "rust", "spot", "rot", "disease", "mildew"];
      const healthyKeywords = ["leaf", "plant", "green", "healthy", "foliage"];
      
      let isHealthy = true;
      let confidence = 0;
      let detectedIssue = "";
      
      // Check all classifications for disease indicators
      for (const prediction of results) {
        const label = prediction.label.toLowerCase();
        
        // Check for disease keywords
        for (const keyword of diseaseKeywords) {
          if (label.includes(keyword)) {
            isHealthy = false;
            confidence = prediction.score * 100;
            detectedIssue = formatIssueName(label);
            break;
          }
        }
        
        // If already found unhealthy, break
        if (!isHealthy) break;
        
        // Check for healthy indicators with higher confidence
        for (const keyword of healthyKeywords) {
          if (label.includes(keyword) && prediction.score > 0.7) {
            isHealthy = true;
            confidence = prediction.score * 100;
            break;
          }
        }
      }
      
      // Generate treatment recommendations
      const recommendations = getTreatmentRecommendations(detectedIssue);
      
      return {
        isHealthy,
        confidence,
        pestName: isHealthy ? "" : detectedIssue,
        recommendations
      };
    }
  } catch (error) {
    console.error("Error classifying image:", error);
    throw error;
  }
};

/**
 * Format the detected issue name
 */
const formatIssueName = (label: string): string => {
  // Extract the most relevant part of the label
  const diseaseTypes = [
    "leaf spot", "powdery mildew", "rust", "blight", 
    "mosaic virus", "rot", "wilt", "bacterial spot"
  ];
  
  for (const disease of diseaseTypes) {
    if (label.includes(disease)) {
      return disease.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  }
  
  // If no specific disease found, return a generic name
  return "Leaf Disease";
};

/**
 * Generate treatment recommendations based on the detected issue
 */
const generateRecommendations = (issue: string): string => {
  if (!issue) {
    return "Your plant appears healthy. Continue regular care with adequate water, light, and nutrients.";
  }
  
  const recommendations: Record<string, string> = {
    "Leaf Spot": "Remove affected leaves and ensure good air circulation. Apply a copper-based fungicide and avoid overhead watering.",
    "Powdery Mildew": "Increase air circulation, apply neem oil or a sulfur-based fungicide, and avoid overhead watering.",
    "Rust": "Remove and destroy affected leaves. Apply a fungicide containing myclobutanil or sulfur, and ensure proper spacing between plants.",
    "Blight": "Remove affected plant parts, improve drainage, and apply a copper-based fungicide. Rotate crops if in a garden setting.",
    "Mosaic Virus": "Unfortunately, there's no cure for mosaic virus. Remove and destroy infected plants to prevent spread to healthy plants.",
    "Rot": "Reduce watering frequency, improve soil drainage, and remove affected parts. Apply a fungicide containing thiophanate-methyl.",
    "Wilt": "Check for root damage, improve drainage, and ensure proper watering. Apply a fungicide if fungal wilt is suspected.",
    "Bacterial Spot": "Remove infected leaves, avoid overhead watering, and apply a copper-based bactericide."
  };
  
  return recommendations[issue] || "Consult with a plant specialist for diagnosis. Meanwhile, isolate the plant from others, remove visibly affected leaves, and avoid overwatering.";
};

export default {
  initClassifier,
  classifyLeafImage
};
