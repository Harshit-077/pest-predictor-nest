
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Thermometer, Droplets, Wind, Calendar, Bug } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PestForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: '',
    crop: '',
    temperature: 25,
    humidity: 60,
    rainfall: 5,
    pestType: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here is where you would normally send the data to your prediction model
    console.log("Form submitted with data:", formData);
    
    toast({
      title: "Data submitted",
      description: "Your pest data is being analyzed by our ML model.",
    });
    
    // For demo purposes, we'll simulate a prediction
    setTimeout(() => {
      const event = new CustomEvent('prediction-complete', { 
        detail: {
          pestRisk: Math.random() > 0.5 ? 'high' : 'low',
          confidence: (Math.random() * 30 + 70).toFixed(1),
          pestName: formData.pestType || 'Unknown',
          recommendedAction: Math.random() > 0.5 ? 
            'Apply organic pesticide within 48 hours' : 
            'Monitor closely, no immediate action required'
        }
      });
      document.dispatchEvent(event);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" id="predict">
      <CardHeader>
        <CardTitle className="text-pest-700 flex items-center">
          <Bug className="mr-2 h-5 w-5" />
          Pest Prediction Input
        </CardTitle>
        <CardDescription>
          Enter environmental and crop data to predict pest outbreaks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="Enter your farm location" 
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="pest-input"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crop">Crop Type</Label>
              <Select onValueChange={(value) => handleChange('crop', value)}>
                <SelectTrigger id="crop" className="pest-input">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="soybean">Soybean</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature" className="flex items-center">
                  <Thermometer className="mr-2 h-4 w-4" />
                  Temperature (°C)
                </Label>
                <span className="text-sm text-pest-700 font-medium">{formData.temperature}°C</span>
              </div>
              <Slider 
                id="temperature"
                min={-10} 
                max={50} 
                step={1}
                value={[formData.temperature]}
                onValueChange={(value) => handleChange('temperature', value[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="humidity" className="flex items-center">
                  <Droplets className="mr-2 h-4 w-4" />
                  Humidity (%)
                </Label>
                <span className="text-sm text-pest-700 font-medium">{formData.humidity}%</span>
              </div>
              <Slider 
                id="humidity"
                min={0} 
                max={100} 
                step={1} 
                value={[formData.humidity]}
                onValueChange={(value) => handleChange('humidity', value[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="rainfall" className="flex items-center">
                  <Wind className="mr-2 h-4 w-4" />
                  Rainfall (mm/day)
                </Label>
                <span className="text-sm text-pest-700 font-medium">{formData.rainfall} mm</span>
              </div>
              <Slider 
                id="rainfall"
                min={0} 
                max={50} 
                step={1}
                value={[formData.rainfall]}
                onValueChange={(value) => handleChange('rainfall', value[0])}
                className="py-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pest-type">Observed Pest (if any)</Label>
              <Select onValueChange={(value) => handleChange('pestType', value)}>
                <SelectTrigger id="pest-type" className="pest-input">
                  <SelectValue placeholder="Select pest type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aphids">Aphids</SelectItem>
                  <SelectItem value="grasshoppers">Grasshoppers</SelectItem>
                  <SelectItem value="beetles">Beetles</SelectItem>
                  <SelectItem value="caterpillars">Caterpillars</SelectItem>
                  <SelectItem value="mites">Mites</SelectItem>
                  <SelectItem value="none">None observed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Observation Date
              </Label>
              <Input 
                id="date" 
                type="date" 
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="pest-input"
              />
            </div>
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full bg-pest-600 hover:bg-pest-700">
              Generate Prediction
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PestForm;
