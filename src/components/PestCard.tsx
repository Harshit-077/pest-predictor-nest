
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bug, Thermometer, Droplets, Leaf, AlertTriangle } from 'lucide-react';

interface PestCardProps {
  name: string;
  scientificName: string;
  description: string;
  preferredClimate: string;
  targetCrops: string[];
  threatLevel: 'low' | 'medium' | 'high';
  imageUrl: string;
}

const PestCard: React.FC<PestCardProps> = ({
  name,
  scientificName,
  description,
  preferredClimate,
  targetCrops,
  threatLevel,
  imageUrl
}) => {
  const threatColors = {
    low: "bg-green-100 text-green-800 hover:bg-green-200",
    medium: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    high: "bg-red-100 text-red-800 hover:bg-red-200"
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="h-48 overflow-hidden bg-pest-100">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-pest-700 flex items-center text-xl">
              <Bug className="mr-2 h-5 w-5 text-pest-600" />
              {name}
            </CardTitle>
            <CardDescription className="italic text-xs">
              {scientificName}
            </CardDescription>
          </div>
          <Badge className={threatColors[threatLevel]}>
            <AlertTriangle className="mr-1 h-3 w-3" />
            {threatLevel.charAt(0).toUpperCase() + threatLevel.slice(1)} Threat
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Thermometer className="h-4 w-4 text-pest-500 mr-1" />
            <span className="text-muted-foreground">
              {preferredClimate}
            </span>
          </div>
          <div className="flex items-center">
            <Leaf className="h-4 w-4 text-pest-500 mr-1" />
            <span className="text-muted-foreground">
              {targetCrops.join(', ')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PestCard;
