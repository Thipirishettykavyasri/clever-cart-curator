
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, CreditCard, LogOut, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '@/components/ui/use-toast';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      setUserEmail(localStorage.getItem('userEmail') || '');
      
      // Get wishlist from localStorage
      const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
      setWishlist(storedWishlist);
      
      // Get orders from localStorage or create sample data if none exists
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (storedOrders.length === 0) {
        // Create sample order data for demo
        const sampleOrders = [
          {
            id: 'ORD-2025-001',
            date: '2025-04-05',
            total: 349.97,
            status: 'Delivered',
            items: 3
          },
          {
            id: 'ORD-2025-002',
            date: '2025-04-01',
            total: 199.99,
            status: 'Processing',
            items: 1
          }
        ];
        localStorage.setItem('orders', JSON.stringify(sampleOrders));
        setOrders(sampleOrders);
      } else {
        setOrders(storedOrders);
      }
    } else {
      // Redirect to login if not logged in
      navigate('/login');
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Please log in to view your account.",
      });
    }
  }, [navigate, toast]);
  
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
  
  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <User size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
                <p className="text-gray-600">{userEmail}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="orders" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Payment Methods</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Your Orders ({orders.length})</h2>
              {orders.length > 0 ? (
                orders.map(order => (
                  <Card key={order.id} className="mb-4">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <CardDescription>{order.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Items: {order.items}</span>
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        View Order Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-xl font-medium text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-gray-500">Start shopping to see your orders here.</p>
                  <div className="mt-6">
                    <Button onClick={() => navigate('/products')}>Browse Products</Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="wishlist" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Your Wishlist ({wishlist.length})</h2>
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wishlist.map((item: any) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between p-4 pt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <Heart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-xl font-medium text-gray-900">Your wishlist is empty</h3>
                  <p className="mt-1 text-gray-500">Save items you like to your wishlist.</p>
                  <div className="mt-6">
                    <Button onClick={() => navigate('/products')}>Browse Products</Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bank Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary text-white p-2 rounded-full mr-3">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-medium">SmartShop Financial</p>
                        <p className="text-gray-500 text-sm">**** **** **** 4567</p>
                      </div>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <h3 className="text-md font-medium">Billing Address</h3>
                    <address className="not-italic text-gray-600">
                      123 Smart Street<br />
                      Tech City, TC 98765<br />
                      United States
                    </address>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Add New Payment Method</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
