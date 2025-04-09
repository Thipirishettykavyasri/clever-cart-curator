
import React from 'react';
import Navbar from '../components/Navbar';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import { ShoppingCart, ZapIcon, TruckIcon, HeadphonesIcon } from 'lucide-react';
import { getCategories } from '../data/products';

const Index = () => {
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-light to-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-up">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Smart Technology for a <span className="text-primary">Smarter Life</span>
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                Discover the latest smart devices that make everyday living more convenient, efficient, and enjoyable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors">
                  Shop Now
                </button>
                <button className="px-6 py-3 bg-white text-primary font-medium rounded-lg border border-primary hover:bg-primary-light transition-colors">
                  View Deals
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://placehold.co/600x400/E5DEFF/7E69AB?text=Smart+Home+Devices" 
                alt="Smart Home Devices" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-gray-600 mb-6">Browse our wide range of smart products</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={24} className="text-primary" />
                </div>
                <h3 className="font-medium text-gray-800">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Benefits Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <ZapIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Get your smart devices delivered quickly with our express shipping options.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Returns</h3>
              <p className="text-gray-600">Not satisfied? Return your purchase within 30 days for a full refund.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay Updated</h2>
            <p className="text-white/80 mb-6">Subscribe to our newsletter for the latest product updates and exclusive offers.</p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg flex-grow"
              />
              <button className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
