
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product, getProductById } from '../data/products';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, discountPrice, image, rating } = product;
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const hasDiscount = discountPrice !== undefined;
  
  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation();
    
    // Get existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product is already in cart
    const existingProduct = cartItems.find((item: any) => item.id === id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
      toast({
        title: "Updated cart",
        description: `Increased ${name} quantity to ${existingProduct.quantity}`,
      });
    } else {
      // Add product to cart
      cartItems.push({
        id,
        name,
        price: discountPrice || price,
        image,
        quantity: 1
      });
      
      // Show recommendations in a toast
      sonnerToast(
        "Added to cart",
        `${name} has been added to your cart. Check out similar products!`,
        {
          action: {
            label: "View Similar",
            onClick: () => navigate(`/product/${id}`),
          },
        }
      );
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Dispatch event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden animate-fade-in group cursor-pointer"
      onClick={handleCardClick}
    >
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
          <button 
            onClick={addToCart}
            className="p-2 rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
