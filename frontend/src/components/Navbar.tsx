import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
      {/* Logo - Navy */}
      <Link to="/" className="text-3xl font-serif tracking-tight text-brand-navy">
        OOAK
      </Link>

      {/* Links - Navy with Gold Hover */}
      <div className="hidden md:flex space-x-8 font-medium text-brand-navy">
        <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <Link to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
        <Link to="/lookbook" className="hover:text-brand-gold transition-colors">Lookbook</Link>
        <Link to="/gifts" className="hover:text-brand-gold transition-colors">Gifts</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        <Link to="/cart" className="hover:text-brand-gold transition-colors text-brand-navy">
          🛒 Cart
        </Link>
        {/* Login Button - Gold with Navy Text */}
        <Link 
          to="/login" 
          className="bg-brand-gold text-brand-navy px-5 py-2 rounded-sm hover:bg-[#b08d4a] transition-all font-elegant font-bold uppercase tracking-wide shadow-md"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}