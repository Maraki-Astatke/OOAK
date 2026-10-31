import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { addToCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import type { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      // If not logged in, send to login
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      await addToCart(product!.id, quantity);
      alert('Added to cart successfully!');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-silver flex items-center justify-center">
        <p className="text-brand-burgundy font-serif text-2xl animate-pulse">Loading bag...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-silver flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif text-brand-burgundy mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-brand-grey hover:text-brand-burgundy underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-silver">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-brand-grey font-sans">
          <Link to="/" className="hover:text-brand-burgundy">Home</Link> / 
          <Link to="/shop" className="hover:text-brand-burgundy mx-1">Shop</Link> / 
          <span className="text-brand-burgundy font-bold">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 md:p-10 rounded-sm shadow-xl">
          
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden relative">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
              )}
              {product.isPreOrder && (
                <span className="absolute top-4 left-4 bg-brand-burgundy text-white text-xs font-bold px-4 py-2 rounded-sm uppercase tracking-widest shadow-md">
                  Pre-Order
                </span>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-burgundy mb-4">{product.name}</h1>
            <p className="text-3xl font-sans text-brand-grey mb-6">${product.price}</p>
            
            <div className="h-px w-full bg-brand-burgundy/10 mb-6"></div>
            
            <p className="text-brand-grey font-sans leading-relaxed mb-8">
              {product.description || 'No description available for this product.'}
            </p>

            {/* Stock Status */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <p className="text-green-600 font-bold text-sm tracking-widest uppercase">In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-brand-cuivre font-bold text-sm tracking-widest uppercase">Currently Out of Stock</p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-brand-grey/30 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-brand-burgundy hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-brand-burgundy">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-brand-burgundy hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={adding || product.stock === 0}
                className="flex-grow bg-brand-burgundy text-white px-8 py-4 rounded-sm font-elegant font-bold uppercase tracking-widest hover:bg-brand-burgundy-dark transition-colors disabled:opacity-50"
              >
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            {/* Pre-Order Notice */}
            {product.isPreOrder && (
              <div className="mt-6 p-4 bg-brand-silver border border-brand-burgundy/20 rounded-sm text-sm text-brand-burgundy font-sans">
                <strong>Pre-Order Notice:</strong> This item is currently on pre-order. You will pay a 50% deposit today, and the remaining balance when the item is ready to ship.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}