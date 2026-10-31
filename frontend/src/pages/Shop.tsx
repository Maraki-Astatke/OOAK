import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../api/products';
import type { Product } from '../types';
import { useSearchParams } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get search term from URL (e.g., /shop?search=tote)
  const searchTerm = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(searchTerm);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(searchTerm);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay (debounce) so we don't spam the backend on every keystroke
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-silver">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-serif text-brand-burgundy mb-2">The Collection</h1>
            <p className="text-brand-grey font-sans">Discover your perfect everyday carry.</p>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-auto flex">
            <input 
              type="text" 
              placeholder="Search bags..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full md:w-64 border border-brand-grey/30 p-3 rounded-l-sm focus:outline-none focus:border-brand-burgundy"
            />
            <button 
              type="submit"
              className="bg-brand-burgundy text-white px-6 rounded-r-sm font-bold uppercase tracking-widest hover:bg-brand-burgundy-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-brand-burgundy font-serif text-2xl animate-pulse">
            Loading Collection...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-brand-grey font-serif mb-4">No bags found matching "{searchTerm}"</p>
            <button 
              onClick={() => { setSearchInput(''); setSearchParams({}); }}
              className="text-brand-burgundy font-bold underline uppercase text-sm tracking-widest"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
        
      </main>
    </div>
  );
}