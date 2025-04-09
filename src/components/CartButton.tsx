
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartButton: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);
  
  useEffect(() => {
    // Check localStorage for cart items
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setItemCount(cartItems.length);

    // Set up event listener for cart updates
    const handleCartUpdate = () => {
      const updatedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setItemCount(updatedCartItems.length);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);
  
  return (
    <Link to="/cart" className="relative">
      <button className="p-2 rounded-full text-gray-700 hover:bg-primary-light transition-colors">
        <ShoppingCart size={22} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </Link>
  );
};

export default CartButton;
