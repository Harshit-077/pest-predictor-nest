
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
  try {
    console.log("Loading leaf classification model...");
    
    // Try to use the TensorFlow.js model first
    try {
      // Create a temporary image to validate model
      const tempImg = new Image();
      tempImg.width = 10;
      tempImg.height = 10;
      tempImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      
      // Attempt to load the TensorFlow.js model
      await predictLeafHealth(tempImg, TENSORFLOWJS_MODEL_URL);
      console.log("Custom TensorFlow.js model loaded successfully!");
      
      // Store the model type in localStorage for UI display
      localStorage.setItem('leaf_model_type', 'custom');
      
      return true;
    } catch (tfError) {
      console.warn("Failed to load custom model, falling back to Hugging Face model:", tfError);
      
      // Fall back to Hugging Face model
      classifierInstance = await pipeline("image-classification", MODEL_ID);
      console.log("Hugging Face model loaded successfully!");
      
      // Store the model type in localStorage for UI display
      localStorage.setItem('leaf_model_type', 'fallback');
      
      return true;
    }
  } catch (error) {
    console.error("Error loading model:", error);
    return false;
  }
};

/**
 * Classify a leaf image as healthy or unhealthy
 * @param imageUrl URL of the image to classify
 */
export const classifyLeafImage = async (imageUrl: string) => {
  try {
    // Check which model type we're using
    const modelType = localStorage.getItem('leaf_model_type');
    
    if (modelType === 'custom') {
      // Use our custom TensorFlow.js model
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
        // Continue to the fallback logic below
      }
    }
    
    // Fallback to Hugging Face model
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

export default {
  initClassifier,
  classifyLeafImage
};
