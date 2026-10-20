import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-brand-white sticky top-0 z-50 shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
      {/* Logo - Burgundy */}
      <Link to="/" className="text-3xl font-serif tracking-tight text-brand-burgundy">
        OOAK
      </Link>

      {/* Links - Burgundy */}
      <div className="hidden md:flex space-x-8 font-medium text-brand-burgundy">
        <Link to="/" className="hover:text-[#8a2b42] transition-colors">Home</Link>
        <Link to="/shop" className="hover:text-[#8a2b42] transition-colors">Shop</Link>
        <Link to="/lookbook" className="hover:text-[#8a2b42] transition-colors">Lookbook</Link>
        <Link to="/gifts" className="hover:text-[#8a2b42] transition-colors">Gifts</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        <Link to="/cart" className="hover:text-[#8a2b42] transition-colors text-brand-burgundy font-medium">
          🛒 Cart
        </Link>
        {/* Login Button - Burgundy Background, White Text */}
        <Link 
          to="/login" 
          className="bg-brand-burgundy text-white px-5 py-2 rounded-sm hover:bg-[#360f1a] transition-all font-elegant font-bold uppercase tracking-wide shadow-md"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}