import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: string;
  isPreOrder: boolean;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-brand-grey py-10">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}