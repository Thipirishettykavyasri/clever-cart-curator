
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartButton: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);
  
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
