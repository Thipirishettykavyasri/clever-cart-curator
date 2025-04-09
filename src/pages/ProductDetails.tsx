
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import ProductRecommendations from '../components/ProductRecommendations';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(getProductById(parseInt(id || '0')));

  useEffect(() => {
    if (!product) {
      navigate('/products');
      toast({
        variant: "destructive",
        title: "Product not found",
        description: "The product you're looking for doesn't exist.",
      });
    }
  }, [product, navigate, toast]);

  const addToCart = () => {
    if (!product) return;
    
    // Get existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product is already in cart
    const existingProduct = cartItems.find((item: any) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
      toast({
        title: "Updated cart",
        description: `Increased ${product.name} quantity to ${existingProduct.quantity}`,
      });
    } else {
      // Add product to cart
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.image,
        quantity: 1
      });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Dispatch event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const addToWishlist = () => {
    if (!product) return;
    
    // Get existing wishlist items from localStorage
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    
    // Check if product is already in wishlist
    const existingProduct = wishlistItems.find((item: any) => item.id === product.id);
    
    if (existingProduct) {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist`,
      });
      return;
    }
    
    // Add product to wishlist
    wishlistItems.push({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image
    });
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              {product.discountPrice && (
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full font-semibold">
                  SALE
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.rating} rating)</span>
                </div>
                <div className="mb-4">
                  {product.discountPrice ? (
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-800">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                      <span className="ml-2 bg-green-100 text-green-800 text-sm px-2 py-1 rounded-md">
                        {Math.round(100 - (product.discountPrice / product.price * 100))}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button 
                  onClick={addToCart} 
                  className="flex-1 flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  onClick={addToWishlist}
                  className="flex items-center justify-center"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Category</h3>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
          
          {/* Product Recommendations */}
          <ProductRecommendations product={product} excludeId={product.id} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
