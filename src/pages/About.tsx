
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About SmartShop</h1>
              <p className="text-lg text-gray-700 mb-8">
                Your trusted destination for cutting-edge smart technology and devices
                that transform everyday living into extraordinary experiences.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2020, SmartShop began with a simple mission: to make smart 
                  technology accessible, affordable, and easy to understand for everyone.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a small online store has grown into a comprehensive 
                  platform offering the latest in smart home devices, wearables, audio 
                  equipment, and more.
                </p>
                <p className="text-gray-700">
                  We carefully curate our selection to ensure we only offer products that 
                  meet our high standards for quality, functionality, and value.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="SmartShop Team" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Quality</h3>
                <p className="text-gray-700 text-center">
                  We rigorously test all products to ensure they meet our high standards before 
                  adding them to our catalog.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Innovation</h3>
                <p className="text-gray-700 text-center">
                  We constantly seek out the latest technology to bring innovative solutions 
                  to our customers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Customer Focus</h3>
                <p className="text-gray-700 text-center">
                  We put our customers first, providing exceptional service and support 
                  before, during, and after purchase.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Our Location</h3>
                <p className="text-gray-700">123 Smart Street, Tech City, TECH 5678</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <Phone className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Phone</h3>
                <p className="text-gray-700">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p className="text-gray-700">support@smartshop.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
