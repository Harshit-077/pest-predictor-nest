
import React from 'react';
import { AlertCircle, FileCode, ArrowRight, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ModelInstructions: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert className="max-w-3xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Using Your Custom .h5 Model</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-2">Our application is pre-configured to work with your custom .h5 model for leaf health analysis. Follow these steps to integrate your model located at <code className="bg-muted px-1 py-0.5 rounded text-xs">/Users/apple/Downloads/ML-main/ML training code and model/pest_management_model.h5</code></p>
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-pest-100 text-pest-700 flex items-center justify-center mb-2">
              <Terminal className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Step 1</CardTitle>
            <CardDescription>Install TensorFlow.js Converter</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">If not already installed, install the TensorFlow.js converter:</p>
            <div className="mt-2 bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
              pip install tensorflowjs
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-pest-100 text-pest-700 flex items-center justify-center mb-2">
              <FileCode className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Step 2</CardTitle>
            <CardDescription>Convert Your Model</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Convert your pest_management_model.h5 to TensorFlow.js format:</p>
            <div className="mt-2 bg-muted p-2 rounded text-xs font-mono overflow-x-auto whitespace-normal">
              tensorflowjs_converter --input_format keras /Users/apple/Downloads/ML-main/ML\ training\ code\ and\ model/pest_management_model.h5 public/models/leaf_health_model
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-pest-100 text-pest-700 flex items-center justify-center mb-2">
              <ArrowRight className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Step 3</CardTitle>
            <CardDescription>Verify Files</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">After conversion, verify that these files exist:</p>
            <pre className="mt-2 bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
{`public/
└── models/
    └── leaf_health_model/
        ├── model.json
        └── group1-shard1of1.bin`}
            </pre>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Separator className="my-6" />
        
        <div className="bg-pest-50 p-4 rounded-lg border border-pest-100">
          <h3 className="font-medium text-pest-700 mb-2">Important Configuration Notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium">Model Input Shape:</span> Ensure your model expects 224x224 RGB images. If not, update the targetSize parameter in modelService.ts.
            </li>
            <li>
              <span className="font-medium">Class Mapping:</span> The application expects the following class mapping:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Class 0: Healthy</li>
                <li>Other classes: Various disease types</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">Application Path:</span> The application expects your converted model at <code className="bg-muted px-1 py-0.5 rounded text-xs">/public/models/leaf_health_model/model.json</code>
            </li>
          </ul>
        </div>
        
        <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="font-medium text-green-700 mb-2">Troubleshooting Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium">Conversion Error:</span> If you encounter "GPU with CUDA not available" error, add <code className="bg-muted px-1 py-0.5 rounded text-xs">--quantize_float16 false</code> to the conversion command.
            </li>
            <li>
              <span className="font-medium">Model loading errors:</span> Check browser console for detailed error messages.
            </li>
            <li>
              <span className="font-medium">If all else fails:</span> The application will automatically fall back to a pre-trained Hugging Face model if your custom model isn't available or fails to load.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelInstructions;
