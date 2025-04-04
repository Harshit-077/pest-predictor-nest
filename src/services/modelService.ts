
import * as tf from '@tensorflow/tfjs';

// Model state
let model: tf.LayersModel | null = null;
let isModelLoading = false;
let modelLoadError: Error | null = null;

// Load the model
export const loadModel = async (modelUrl: string): Promise<tf.LayersModel> => {
  if (model) return model;
  
  if (isModelLoading) {
    // Wait for the current loading process to finish
    return new Promise((resolve, reject) => {
      const checkIfModelLoaded = () => {
        if (model) resolve(model);
        else if (modelLoadError) reject(modelLoadError);
        else setTimeout(checkIfModelLoaded, 100);
      };
      checkIfModelLoaded();
    });
  }

  try {
    isModelLoading = true;
    console.log('Loading model from:', modelUrl);
    
    // Load the model
    model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully');
    
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    modelLoadError = error as Error;
    throw error;
  } finally {
    isModelLoading = false;
  }
};

// Process image for model input
export const preprocessImage = async (image: HTMLImageElement, targetSize: [number, number] = [224, 224]): Promise<tf.Tensor> => {
  // Create a tensor from the image
  const tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor(targetSize)
    .toFloat()
    .div(tf.scalar(255.0))
    .expandDims();
    
  return tensor;
};

// Make a prediction
export const predictLeafHealth = async (imageElement: HTMLImageElement, modelUrl: string): Promise<{
  isHealthy: boolean;
  confidence: number;
  pestName?: string;
}> => {
  try {
    // Load model if not already loaded
    const loadedModel = await loadModel(modelUrl);
    
    // Preprocess the image
    const processedImage = await preprocessImage(imageElement);
    
    // Make prediction
    const predictions = await loadedModel.predict(processedImage) as tf.Tensor;
    const values = await predictions.data();
    
    // Cleanup tensors to prevent memory leaks
    processedImage.dispose();
    predictions.dispose();
    
    // Process results
    const confidenceValue = Math.max(...Array.from(values));
    const classIndex = Array.from(values).indexOf(confidenceValue);
    
    // Assuming class 0 is healthy in your model
    const isHealthy = classIndex === 0;
    
    // You may need to adjust these based on your actual model's class mapping
    const pestTypes = [
      'None', 
      'Leaf Blight', 
      'Powdery Mildew', 
      'Rust', 
      'Leaf Spot', 
      'Mosaic Virus'
    ];
    
    // Get treatment recommendations based on the detected issue
    const pestName = isHealthy ? undefined : pestTypes[classIndex] || 'Unknown Disease';
    
    return {
      isHealthy,
      confidence: confidenceValue * 100,
      pestName
    };
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};

// Helper function to generate treatment recommendations based on detected issues
export const getTreatmentRecommendations = (pestName?: string): string => {
  if (!pestName) {
    return "Your plant appears healthy. Continue regular care with adequate water, light, and nutrients.";
  }
  
  // Treatment recommendations for common plant diseases
  const recommendations: Record<string, string> = {
    'Leaf Blight': "Remove affected leaves and ensure good air circulation. Apply a copper-based fungicide and avoid overhead watering. Improve soil drainage and avoid overwatering.",
    'Powdery Mildew': "Increase air circulation, apply neem oil or a sulfur-based fungicide, and avoid overhead watering. Remove severely affected leaves and keep foliage dry.",
    'Rust': "Remove and destroy affected leaves. Apply a fungicide containing myclobutanil or sulfur, and ensure proper spacing between plants. Avoid wetting leaves during irrigation.",
    'Leaf Spot': "Remove affected leaves and ensure good air circulation. Apply a copper-based fungicide and avoid overhead watering. Practice crop rotation if in a garden setting.",
    'Mosaic Virus': "Unfortunately, there's no cure for mosaic virus. Remove and destroy infected plants to prevent spread to healthy plants. Control aphids and other insects that may spread the virus.",
    'Unknown Disease': "Isolate the affected plant from others to prevent potential spread. Remove visibly affected leaves. Consider consulting with a plant specialist or agricultural extension service for precise diagnosis and treatment."
  };
  
  return recommendations[pestName] || "Consult with a plant specialist for diagnosis. Meanwhile, isolate the plant from others, remove visibly affected leaves, and avoid overwatering.";
};
