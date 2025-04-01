
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Upload, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { classifyLeafImage, initClassifier } from "@/services/leafClassificationService";

const PestForm: React.FC = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Initialize the model when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        const success = await initClassifier();
        setModelLoaded(success);
        
        if (success) {
          console.log("Model initialized successfully");
        } else {
          console.error("Failed to initialize model");
          toast({
            title: "Model initialization failed",
            description: "There was an issue loading the leaf classification model.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error initializing model:", error);
        toast({
          title: "Model initialization error",
          description: "There was an error loading the leaf classification model.",
          variant: "destructive"
        });
      }
    };

    loadModel();
  }, [toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload a leaf image to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    toast({
      title: "Processing image",
      description: "Your leaf image is being analyzed...",
    });
    
    try {
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(selectedImage);
      
      // Analyze the image using our Hugging Face model
      const result = await classifyLeafImage(imageUrl);
      
      // Convert result to the format expected by PredictionResult component
      const predictionData = {
        pestRisk: result.isHealthy ? 'low' : 'high',
        confidence: result.confidence.toFixed(1),
        pestName: result.pestName || 'None',
        recommendedAction: result.recommendations
      };
      
      // Dispatch event to update the prediction result component
      const event = new CustomEvent('prediction-complete', { 
        detail: predictionData
      });
      document.dispatchEvent(event);
      
      // Clean up the created URL
      URL.revokeObjectURL(imageUrl);
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" id="predict">
      <CardHeader>
        <CardTitle className="text-pest-700 flex items-center">
          <Leaf className="mr-2 h-5 w-5" />
          Leaf Health Analysis
        </CardTitle>
        <CardDescription>
          Upload a leaf image to check its health status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!modelLoaded && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 flex items-start">
            <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Leaf analysis model is loading. This may take a moment on first use.
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="leaf-image">Upload Leaf Image</Label>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                id="leaf-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="pest-input"
              />
            </div>
            
            {imagePreview && (
              <div className="mt-4 relative">
                <div className="rounded-md overflow-hidden border border-pest-100 max-h-[300px]">
                  <img 
                    src={imagePreview} 
                    alt="Leaf preview" 
                    className="w-full object-contain" 
                  />
                </div>
              </div>
            )}
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full bg-pest-600 hover:bg-pest-700"
              disabled={!selectedImage || isUploading || !modelLoaded}
            >
              {isUploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Leaf Health
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PestForm;
