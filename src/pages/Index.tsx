
import React from 'react';
import PestHeader from '@/components/PestHeader';
import FeatureSection from '@/components/FeatureSection';
import PestForm from '@/components/PestForm';
import PredictionResult from '@/components/PredictionResult';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PestHeader />
      
      <ScrollArea className="flex-grow">
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-b from-white to-pest-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-pest-700 mb-4">
                AI-Powered Leaf Health Analysis
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Upload photos of your plant leaves to instantly detect diseases and get treatment recommendations
              </p>
              <div className="flex justify-center space-x-4">
                <a href="#predict" className="bg-pest-600 text-white px-6 py-3 rounded-md hover:bg-pest-700 transition-colors">
                  Analyze My Leaf
                </a>
                <a href="#features" className="bg-white text-pest-700 border border-pest-200 px-6 py-3 rounded-md hover:bg-pest-50 transition-colors">
                  Learn More
                </a>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <FeatureSection />
          
          {/* Prediction Form Section */}
          <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pest-700 mb-3">Leaf Health Analysis</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Upload a photo of your plant's leaf and get instant AI assessment of its health status and treatment recommendations.
              </p>
            </div>
            
            <div className="mb-8 max-w-2xl mx-auto p-4 bg-pest-50 rounded-lg border border-pest-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-pest-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-pest-700 mb-1">About Our Plant Analysis Model</h3>
                  <p className="text-sm text-muted-foreground">
                    Our application uses a Vision Transformer (ViT) model to analyze your plant leaf images.
                    The model examines visual patterns to identify signs of common plant diseases like leaf spots,
                    powdery mildew, rust, and other conditions. For best results, upload a clear, well-lit image
                    showing the entire leaf.
                  </p>
                </div>
              </div>
            </div>
            
            <PestForm />
            <PredictionResult />
          </section>
          
          {/* Footer */}
          <footer className="bg-pest-700 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">LeafHealth</h3>
                  <p className="text-pest-100">
                    Advanced plant health monitoring powered by machine learning to help you maintain healthy plants.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#features" className="text-pest-100 hover:text-white transition-colors">Features</a></li>
                    <li><a href="#predict" className="text-pest-100 hover:text-white transition-colors">Analysis Tool</a></li>
                    <li><a href="#about" className="text-pest-100 hover:text-white transition-colors">About</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact</h3>
                  <p className="text-pest-100">
                    Questions or feedback about our leaf health analysis system? Reach out to our team for assistance.
                  </p>
                  <a href="#" className="text-white underline mt-2 inline-block hover:text-pest-200 transition-colors">
                    info@leafhealth.com
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-pest-600 text-center text-pest-100">
                <p>&copy; {new Date().getFullYear()} LeafHealth. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </main>
      </ScrollArea>
    </div>
  );
};

export default Index;
