
import React from 'react';
import PestHeader from '@/components/PestHeader';
import FeatureSection from '@/components/FeatureSection';
import PestForm from '@/components/PestForm';
import PredictionResult from '@/components/PredictionResult';
import PestDashboard from '@/components/PestDashboard';
import { ScrollArea } from "@/components/ui/scroll-area";

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
                Intelligent Pest Prediction & Management
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Harness the power of machine learning to predict pest outbreaks before they damage your crops
              </p>
              <div className="flex justify-center space-x-4">
                <a href="#predict" className="bg-pest-600 text-white px-6 py-3 rounded-md hover:bg-pest-700 transition-colors">
                  Get Prediction
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
              <h2 className="text-3xl font-bold text-pest-700 mb-3">Pest Outbreak Prediction</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Enter your farm's data below to receive a real-time prediction of pest outbreak risk and targeted management recommendations.
              </p>
            </div>
            
            <PestForm />
            <PredictionResult />
          </section>
          
          {/* Pest Information Dashboard */}
          <PestDashboard />
          
          {/* Footer */}
          <footer className="bg-pest-700 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">PestPredictor</h3>
                  <p className="text-pest-100">
                    Advanced pest management powered by machine learning to protect your crops and optimize yield.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#features" className="text-pest-100 hover:text-white transition-colors">Features</a></li>
                    <li><a href="#predict" className="text-pest-100 hover:text-white transition-colors">Prediction Tool</a></li>
                    <li><a href="#pests" className="text-pest-100 hover:text-white transition-colors">Pest Library</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact</h3>
                  <p className="text-pest-100">
                    Questions or feedback about our pest prediction system? Reach out to our team for assistance.
                  </p>
                  <a href="#" className="text-white underline mt-2 inline-block hover:text-pest-200 transition-colors">
                    info@pestpredictor.com
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-pest-600 text-center text-pest-100">
                <p>&copy; {new Date().getFullYear()} PestPredictor. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </main>
      </ScrollArea>
    </div>
  );
};

export default Index;
