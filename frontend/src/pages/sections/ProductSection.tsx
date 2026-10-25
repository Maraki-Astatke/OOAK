import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/ProductGrid';
import { getProducts } from '../../api/products';
import type { Product } from '../../types';

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Show only the first 3 products on the home page
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="shop" className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full bg-white">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-burgundy mb-4">The Collection</h2>
          <p className="text-brand-grey font-sans">Find your perfect everyday carry.</p>
        </div>
        <Link to="/shop" className="hidden md:block text-brand-burgundy font-elegant font-bold uppercase tracking-widest text-sm hover:text-brand-burgundy-dark border-b border-brand-burgundy pb-1 transition-colors">
          View All
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-brand-burgundy font-serif text-2xl animate-pulse">
          Loading Collection...
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}