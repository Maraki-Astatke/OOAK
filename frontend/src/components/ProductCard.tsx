import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BACKEND_URL = 'http://localhost:5004';
function resolveImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BACKEND_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

interface Product {
  id: string;
  name: string;
  price: string;
  isPreOrder: boolean;
  images?: string[];
}

export default function ProductCard({ product, index = 0 }: { product: Product, index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="relative w-full h-80 bg-white overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={resolveImageUrl(product.images[0])}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
              [ No Image ]
            </div>
          )}
          {product.isPreOrder && (
            <span className="absolute top-4 left-4 bg-brand-burgundy text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-md z-10">
              Pre-Order
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}