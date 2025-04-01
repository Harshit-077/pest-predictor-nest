
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Leaf, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

interface PredictionData {
  pestRisk: string;
  confidence: string;
  pestName: string;
  recommendedAction: string;
}

const PredictionResult: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePrediction = (event: CustomEvent) => {
      setLoading(true);
      setTimeout(() => {
        setPrediction(event.detail);
        setLoading(false);
      }, 800);
    };

    document.addEventListener(
      'prediction-complete',
      handlePrediction as EventListener
    );

    return () => {
      document.removeEventListener(
        'prediction-complete',
        handlePrediction as EventListener
      );
    };
  }, []);

  if (!prediction && !loading) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-pest-700 flex items-center">
          <Leaf className="mr-2 h-5 w-5" />
          Leaf Health Analysis Results
        </CardTitle>
        <CardDescription>
          AI-powered leaf health assessment and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 py-8">
            <div className="text-center text-muted-foreground">
              Analyzing leaf image with our AI model...
            </div>
            <Progress value={65} className="h-2 bg-pest-100" />
          </div>
        ) : prediction ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Health Status</div>
                <div className={`text-xl font-bold capitalize ${prediction.pestRisk === 'high' ? 'text-red-600' : 'text-green-600'}`}>
                  {prediction.pestRisk === 'high' ? 'Unhealthy' : 'Healthy'}
                </div>
              </div>
              
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Confidence</div>
                <div className="text-xl font-bold text-pest-700">{prediction.confidence}%</div>
              </div>
              
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Issue Detected</div>
                <div className="text-xl font-bold text-pest-700 capitalize">
                  {prediction.pestRisk === 'high' ? prediction.pestName : 'None'}
                </div>
              </div>
            </div>
            
            <Alert className={
              prediction.pestRisk === 'high' 
                ? "border-amber-500 bg-amber-50" 
                : "border-green-500 bg-green-50"
            }>
              {prediction.pestRisk === 'high' ? (
                <>
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Action Required</AlertTitle>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Healthy Leaf Detected</AlertTitle>
                </>
              )}
              <AlertDescription className={
                prediction.pestRisk === 'high' 
                  ? "text-amber-700" 
                  : "text-green-700"
              }>
                {prediction.recommendedAction}
              </AlertDescription>
            </Alert>
            
            <div className="bg-pest-50 rounded-lg p-4 border border-pest-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-pest-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-pest-700">Analysis Insights</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This analysis is based on visual patterns in your leaf image. For more accurate results, ensure images are well-lit and clearly show any problem areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
