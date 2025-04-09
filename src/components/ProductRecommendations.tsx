
import React from 'react';
import { Product, getProductsByCategory } from '../data/products';
import ProductCard from './ProductCard';

interface ProductRecommendationsProps {
  product: Product;
  excludeId?: number;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ product, excludeId }) => {
  // Get similar products from the same category
  const similarProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== excludeId) // Exclude current product
    .slice(0, 4); // Show up to 4 recommendations
  
  if (similarProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">You might also like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {similarProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
