// Server-side data fetching for GREAN WORLD Energy Technology

export type EnergySolution = {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
};

export type ProductInfo = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
};

// This data can be fetched from a database in the future
// For now, we're defining it statically to be used by server components
export async function getEnergySolutions(): Promise<EnergySolution[]> {
  // Simulate a database fetch with a small delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: "solar-energy",
      title: "Solar Energy Solutions",
      description: "Harness the power of the sun with our cutting-edge solar panel systems.",
      icon: "sun",
      benefits: [
        "Reduce electricity bills by up to 70%",
        "Zero emissions renewable energy",
        "25+ year lifespan with minimal maintenance",
        "Government incentives available"
      ]
    },
    {
      id: "energy-storage",
      title: "Energy Storage Systems",
      description: "Store excess energy for use when you need it most with our advanced battery solutions.",
      icon: "battery",
      benefits: [
        "Backup power during outages",
        "Maximize self-consumption of solar energy",
        "Smart energy management system included",
        "Scalable to meet your needs"
      ]
    },
    {
      id: "biomass",
      title: "Biomass Energy",
      description: "Convert organic waste into valuable energy with our biomass solutions.",
      icon: "leaf",
      benefits: [
        "Waste-to-energy conversion",
        "Reduce landfill waste",
        "Carbon-neutral energy production",
        "Suitable for rural communities"
      ]
    },
    {
      id: "training",
      title: "Energy Training Programs",
      description: "Comprehensive training for professionals and communities on renewable energy technologies.",
      icon: "graduation-cap",
      benefits: [
        "Hands-on technical training",
        "Certification programs available",
        "Community education workshops",
        "Custom training for organizations"
      ]
    }
  ];
}

export async function getProductInfo(): Promise<ProductInfo[]> {
  // Simulate a database fetch with a small delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: "solar-panel-mono",
      name: "Monocrystalline Solar Panel",
      category: "Solar",
      description: "High-efficiency monocrystalline solar panels for maximum energy production.",
      imageUrl: "/images/products/solar-panel-mono.webp"
    },
    {
      id: "lithium-battery",
      name: "Lithium Battery Storage",
      category: "Storage",
      description: "Advanced lithium battery storage system with smart management.",
      imageUrl: "/images/products/lithium-battery.webp"
    },
    {
      id: "biomass-converter",
      name: "Biomass Converter",
      category: "Biomass",
      description: "Convert organic waste into usable energy with our efficient converter.",
      imageUrl: "/images/products/biomass-converter.webp"
    },
    {
      id: "solar-inverter",
      name: "Solar Inverter",
      category: "Solar",
      description: "High-performance inverter for solar energy systems.",
      imageUrl: "/images/products/solar-inverter.webp"
    }
  ];
}

export async function getCompanyStats() {
  // Simulate a database fetch with a small delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    projectsCompleted: 250,
    clientsSatisfied: 200,
    energySavedKWh: 5000000,
    co2ReducedTons: 3500
  };
} 