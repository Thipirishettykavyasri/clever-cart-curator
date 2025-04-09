
import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import CartButton from './CartButton';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            SmartShop
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-primary transition-colors">
              Deals
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-primary transition-colors">
              Account
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 flex-grow mx-4 max-w-md">
            <Search size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent border-none outline-none flex-grow text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cart Button */}
          <div className="flex items-center space-x-2">
            <CartButton />

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 animate-fade-in">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-3">
              <Search size={20} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-transparent border-none outline-none flex-grow text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-primary py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/deals" 
                className="text-gray-700 hover:text-primary py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link 
                to="/account" 
                className="text-gray-700 hover:text-primary py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
