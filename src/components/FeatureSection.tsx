
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Database, Award, Zap, BrainCircuit, ShieldCheck } from 'lucide-react';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-pest-600" />,
      title: "ML-Powered Prediction",
      description: "Our advanced machine learning algorithms analyze environmental data to predict pest outbreaks before they occur."
    },
    {
      icon: <Database className="h-10 w-10 text-pest-600" />,
      title: "Data-Driven Insights",
      description: "Upload your farm data and receive customized insights based on historical patterns and current conditions."
    },
    {
      icon: <BarChart className="h-10 w-10 text-pest-600" />,
      title: "Visual Analytics",
      description: "Visualize pest trends, risk levels, and effectiveness of treatment methods through intuitive dashboards."
    },
    {
      icon: <Zap className="h-10 w-10 text-pest-600" />,
      title: "Real-time Alerts",
      description: "Get immediate notifications when environmental conditions favor pest development in your region."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-pest-600" />,
      title: "Treatment Recommendations",
      description: "Receive targeted treatment suggestions optimized for your specific pests, crops and conditions."
    },
    {
      icon: <Award className="h-10 w-10 text-pest-600" />,
      title: "Sustainable Practices",
      description: "Our system prioritizes eco-friendly pest management approaches to protect your crops and the environment."
    }
  ];

  return (
    <section className="py-16 bg-pest-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-pest-700 mb-3">Intelligent Pest Management</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our system combines cutting-edge machine learning with agricultural expertise to help you manage pests more effectively and sustainably.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-t-4 border-t-pest-500">
              <CardHeader>
                <div className="mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-pest-700">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
