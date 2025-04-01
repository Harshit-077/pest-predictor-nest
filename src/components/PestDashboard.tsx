
import React from 'react';
import PestCard from './PestCard';

const PestDashboard: React.FC = () => {
  const pests = [
    {
      name: "Aphids",
      scientificName: "Aphidoidea",
      description: "Small sap-sucking insects that can cause significant damage to crops by transmitting plant diseases and stunting growth.",
      preferredClimate: "Warm, humid",
      targetCrops: ["Wheat", "Barley"],
      threatLevel: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1626170733247-9f1d1716069a?q=80&w=500&auto=format&fit=crop"
    },
    {
      name: "Corn Borer",
      scientificName: "Ostrinia nubilalis",
      description: "Moths whose larvae bore into corn stalks, causing significant crop losses by weakening plant structure and disrupting growth.",
      preferredClimate: "Temperate",
      targetCrops: ["Corn", "Peppers"],
      threatLevel: "high" as const,
      imageUrl: "https://images.unsplash.com/photo-1591101046235-a887d20aab65?q=80&w=500&auto=format&fit=crop"
    },
    {
      name: "Spider Mites",
      scientificName: "Tetranychidae",
      description: "Tiny arachnids that feed on plant juices, causing yellowing of leaves and reduced crop yields in hot, dry conditions.",
      preferredClimate: "Hot, dry",
      targetCrops: ["Soybeans", "Cotton"],
      threatLevel: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1598640464567-eb403d8b582f?q=80&w=500&auto=format&fit=crop"
    },
    {
      name: "Grasshoppers",
      scientificName: "Caelifera",
      description: "Herbivorous insects that can consume large amounts of plant material, particularly damaging during population outbreaks.",
      preferredClimate: "Dry, warm",
      targetCrops: ["Wheat", "Corn"],
      threatLevel: "low" as const,
      imageUrl: "https://images.unsplash.com/photo-1618333258404-f509733839c4?q=80&w=500&auto=format&fit=crop"
    },
    {
      name: "Cabbage Looper",
      scientificName: "Trichoplusia ni",
      description: "Caterpillars that create holes in leaves of cruciferous vegetables, reducing yield and marketability of crops.",
      preferredClimate: "Cool, moderate",
      targetCrops: ["Cabbage", "Broccoli"],
      threatLevel: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1595084921981-a5c2f2fc46cb?q=80&w=500&auto=format&fit=crop"
    },
    {
      name: "Colorado Potato Beetle",
      scientificName: "Leptinotarsa decemlineata",
      description: "Beetles that can completely defoliate potato plants if left unchecked, severely impacting tuber development.",
      preferredClimate: "Warm",
      targetCrops: ["Potato", "Tomato"],
      threatLevel: "high" as const,
      imageUrl: "https://images.unsplash.com/photo-1543260775-945c562403b3?q=80&w=500&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-16 container mx-auto px-4" id="pests">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-pest-700 mb-3">Common Agricultural Pests</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn about common pests that affect crops and how our prediction system helps identify risk factors for infestation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pests.map((pest, index) => (
          <PestCard key={index} {...pest} />
        ))}
      </div>
    </section>
  );
};

export default PestDashboard;
