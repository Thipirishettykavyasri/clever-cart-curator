
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  isFeatured: boolean;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smart Home Hub",
    category: "Smart Home",
    price: 199.99,
    discountPrice: 149.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Smart+Hub",
    rating: 4.5,
    isFeatured: true,
    description: "Control all your smart home devices from one central hub. Compatible with most smart devices.",
    features: ["Voice Control", "Touchscreen Display", "Wi-Fi & Bluetooth", "Works with 1000+ devices"]
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    category: "Audio",
    price: 129.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Earbuds",
    rating: 4.7,
    isFeatured: true,
    description: "Premium wireless earbuds with noise cancellation and crystal clear sound quality.",
    features: ["Active Noise Cancellation", "8hr Battery Life", "Wireless Charging", "Water Resistant"]
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    category: "Wearables",
    price: 299.99,
    discountPrice: 249.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Smart+Watch",
    rating: 4.6,
    isFeatured: true,
    description: "Track your fitness, receive notifications, and more with this advanced smartwatch.",
    features: ["Heart Rate Monitor", "GPS", "Water Resistant", "7-day Battery Life"]
  },
  {
    id: 4,
    name: "4K Smart TV 55\"",
    category: "Home Entertainment",
    price: 699.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Smart+TV",
    rating: 4.4,
    isFeatured: false,
    description: "Crystal clear 4K resolution with smart features and voice control.",
    features: ["4K UHD", "HDR", "Voice Remote", "Built-in Streaming Apps"]
  },
  {
    id: 5,
    name: "Smart Security Camera",
    category: "Security",
    price: 79.99,
    discountPrice: 59.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Security+Camera",
    rating: 4.2,
    isFeatured: false,
    description: "Keep your home safe with this HD security camera with motion detection and night vision.",
    features: ["1080p HD", "Night Vision", "Two-way Audio", "Cloud Storage"]
  },
  {
    id: 6,
    name: "Robot Vacuum Cleaner",
    category: "Smart Home",
    price: 349.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Robot+Vacuum",
    rating: 4.3,
    isFeatured: true,
    description: "Automated cleaning with smart mapping and voice control compatibility.",
    features: ["Smart Mapping", "HEPA Filter", "Voice Control", "Auto-Charging"]
  },
  {
    id: 7,
    name: "Smart Thermostat",
    category: "Smart Home",
    price: 129.99,
    discountPrice: 99.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Thermostat",
    rating: 4.8,
    isFeatured: false,
    description: "Save energy and control your home temperature remotely.",
    features: ["Energy Saving", "Learning Algorithm", "Remote Control", "Easy Installation"]
  },
  {
    id: 8,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Audio",
    price: 249.99,
    image: "https://placehold.co/300x300/E5DEFF/7E69AB?text=Headphones",
    rating: 4.6,
    isFeatured: false,
    description: "Premium sound quality with advanced noise cancellation technology.",
    features: ["40hr Battery Life", "Premium Sound", "Comfortable Design", "Quick Charge"]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
};
