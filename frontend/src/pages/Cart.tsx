import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCart, updateCartItem, removeCartItem } from '../api/cart';
import { useAuth } from '../context/AuthContext';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    images: string[];
    isPreOrder: boolean;
  };
}

export default function Cart() {
  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, newQuantity);
      fetchCart(); // Refresh the cart
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeCartItem(itemId);
      fetchCart(); // Refresh the cart
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-silver">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-brand-burgundy mb-4">Please log in to view your cart</h1>
            <Link to="/login" className="bg-brand-burgundy text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest">
              Go to Login
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-silver">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-serif text-brand-burgundy mb-10 text-center">Your Cart</h1>

        {loading ? (
          <p className="text-center text-brand-burgundy font-serif text-2xl animate-pulse">Loading Cart...</p>
        ) : !cart || cart.items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-brand-grey font-serif mb-6">Your cart is empty.</p>
            <Link to="/shop" className="bg-brand-burgundy text-white px-8 py-4 rounded-sm font-elegant font-bold uppercase tracking-widest hover:bg-brand-burgundy-dark transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-sm shadow-sm border border-gray-100">
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/product/${item.product.id}`} className="text-xl font-serif text-brand-burgundy hover:underline">
                      {item.product.name}
                    </Link>
                    <p className="text-brand-grey mt-1">${item.product.price}</p>
                    {item.product.isPreOrder && (
                      <span className="inline-block mt-2 bg-brand-burgundy/10 text-brand-burgundy text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                        Pre-Order
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-brand-grey/30 rounded-sm">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 text-brand-burgundy hover:bg-gray-50">-</button>
                    <span className="w-8 text-center font-bold text-brand-burgundy">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 text-brand-burgundy hover:bg-gray-50">+</button>
                  </div>

                  {/* Remove Button */}
                  <button onClick={() => handleRemove(item.id)} className="text-red-400 hover:text-red-600 text-sm font-bold uppercase tracking-wider">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100">
                <h2 className="text-2xl font-serif text-brand-burgundy mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                
                <div className="flex justify-between mb-4 text-brand-grey font-sans">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-6 text-brand-grey font-sans">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-8">
                  <div className="flex justify-between font-bold text-xl text-brand-burgundy font-serif">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-burgundy text-white py-4 rounded-sm font-elegant font-bold uppercase tracking-widest hover:bg-brand-burgundy-dark transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}