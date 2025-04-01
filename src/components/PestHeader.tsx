
import React from 'react';
import { Bug, Database, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PestHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-pest-100 py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bug className="h-8 w-8 text-pest-600" />
          <h1 className="text-2xl font-bold text-pest-700">PestPredictor</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-pest-700 hover:text-pest-500 transition-colors">
            Features
          </a>
          <a href="#predict" className="text-pest-700 hover:text-pest-500 transition-colors">
            Predict
          </a>
          <a href="#pests" className="text-pest-700 hover:text-pest-500 transition-colors">
            Pest Library
          </a>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden md:flex items-center space-x-2">
            <Database className="h-4 w-4 mr-2" />
            <span>Data Upload</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-pest-600 hover:bg-pest-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Analyze</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PestHeader;
