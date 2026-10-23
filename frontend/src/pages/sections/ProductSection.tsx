import { Link } from 'react-router-dom';
import ProductGrid from '../../components/ProductGrid'; // Note the ../../

const dummyProducts = [
  { id: '1', name: 'The Urban Backpack', price: '59.99', isPreOrder: false },
  { id: '2', name: 'Minimalist Tote', price: '45.00', isPreOrder: false },
  { id: '3', name: 'Limited Leather Crossbody', price: '75.00', isPreOrder: true },
];

export default function ProductSection() {
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

      <ProductGrid products={dummyProducts} />
    </section>
  );
}