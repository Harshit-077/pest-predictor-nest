
import React from 'react';
import { AlertCircle, FileCode, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ModelInstructions: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert className="max-w-3xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Using Your Custom .h5 Model</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-2">Our application is pre-configured to work with your custom .h5 model for leaf health analysis. Follow these simple steps to integrate your model:</p>
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-pest-100 text-pest-700 flex items-center justify-center mb-2">
              <FileCode className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Step 1</CardTitle>
            <CardDescription>Convert Your Model</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Convert your .h5 model to TensorFlow.js format using:</p>
            <div className="mt-2 bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
              tensorflowjs_converter --input_format keras path/to/your/model.h5 public/models/leaf_health_model
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-pest-100 text-pest-700 flex items-center justify-center mb-2">
              <ArrowRight className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Step 2</CardTitle>
            <CardDescription>Place Your Files</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Ensure your converted files are in this structure:</p>
            <pre className="mt-2 bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
{`public/
└── models/
    └── leaf_health_model/
        ├── model.json
        └── group1-shard1of1.bin`}
            </pre>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-pest-100 text-pest-700 flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Step 3</CardTitle>
            <CardDescription>Model Configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our app is already configured to use a model that classifies leaves as healthy or unhealthy with these classes:
            </p>
            <ul className="list-disc pl-5 mt-2 text-xs space-y-1 text-muted-foreground">
              <li>Class 0: Healthy</li>
              <li>Class 1+: Various disease types (Leaf Blight, Powdery Mildew, etc.)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Separator className="my-6" />
        
        <div className="bg-pest-50 p-4 rounded-lg border border-pest-100">
          <h3 className="font-medium text-pest-700 mb-2">Troubleshooting Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium">Input shape mismatch:</span> Ensure your model expects 224x224 RGB images. If not, update the targetSize parameter in modelService.ts.
            </li>
            <li>
              <span className="font-medium">Class mapping:</span> If your model uses different class indices, update the pestTypes array in modelService.ts.
            </li>
            <li>
              <span className="font-medium">Model loading errors:</span> Check browser console for detailed error messages.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelInstructions;
