
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, discountPrice, image, rating } = product;
  
  const hasDiscount = discountPrice !== undefined;
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden animate-fade-in group">
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <div className="absolute top-0 left-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-br">
              SALE
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{name}</h3>
          <div className="flex items-center mb-2">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {hasDiscount ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-gray-800">${discountPrice?.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-800">${price.toFixed(2)}</span>
              )}
            </div>
            <button className="p-2 rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
