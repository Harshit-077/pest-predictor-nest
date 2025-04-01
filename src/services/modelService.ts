
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
    
    // Process results based on your model output format
    // This needs to be adjusted based on your specific model output structure
    const confidenceValue = Math.max(...Array.from(values));
    const classIndex = Array.from(values).indexOf(confidenceValue);
    
    // Example mapping - adjust based on your model's classes
    const isHealthy = classIndex === 0; // Assuming 0 is healthy in your model
    const pestTypes = ['None', 'Leaf Blight', 'Powdery Mildew', 'Rust']; // Adjust based on your model's classes
    
    return {
      isHealthy,
      confidence: confidenceValue * 100,
      pestName: isHealthy ? undefined : pestTypes[classIndex]
    };
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};
