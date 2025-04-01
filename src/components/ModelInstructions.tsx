
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ModelInstructions: React.FC = () => {
  return (
    <Alert className="max-w-2xl mx-auto mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Model Setup Instructions</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">To use your own .h5 model for leaf health analysis, follow these steps:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Convert your .h5 model to TensorFlow.js format using the tfjs-converter:</li>
          <code className="block bg-muted p-2 rounded text-sm my-2">
            tensorflowjs_converter --input_format keras path/to/your/model.h5 public/models/leaf_health_model
          </code>
          <li>This will create model.json and binary weight files in the public/models/leaf_health_model directory</li>
          <li>Make sure your public folder contains this structure:</li>
          <pre className="bg-muted p-2 rounded text-sm my-2">
            public/
            └── models/
                └── leaf_health_model/
                    ├── model.json
                    └── group1-shard1of1.bin
          </pre>
          <li>Adjust the preprocessing and prediction logic in modelService.ts to match your model's input requirements and output format</li>
        </ol>
      </AlertDescription>
    </Alert>
  );
};

export default ModelInstructions;
