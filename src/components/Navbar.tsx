
import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import CartButton from './CartButton';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      setUserEmail(localStorage.getItem('userEmail') || '');
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${searchQuery}"`,
      });
      // In a real app, we would navigate to search results
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

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
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-primary transition-colors">
              Account
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 flex-grow mx-4 max-w-md">
            <Search size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent border-none outline-none flex-grow text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Auth Buttons and Cart */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center">
                  <User size={18} className="text-gray-700 mr-2" />
                  <span className="text-sm text-gray-700 font-semibold">Hi, {userEmail.split('@')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

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
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-3">
              <Search size={20} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-transparent border-none outline-none flex-grow text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
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
                to="/about" 
                className="text-gray-700 hover:text-primary py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/account" 
                className="text-gray-700 hover:text-primary py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              
              {isLoggedIn ? (
                <>
                  <div className="flex items-center py-2">
                    <User size={18} className="text-gray-700 mr-2" />
                    <span className="text-sm text-gray-700 font-semibold">Hi, {userEmail.split('@')[0]}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="flex items-center justify-center"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
