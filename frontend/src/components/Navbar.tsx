import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav 
      className="bg-brand-silver sticky top-0 z-50 px-6 py-2 flex justify-between items-center" 
      style={{ 
        borderBottom: '1px solid rgba(74, 21, 37, 0.15)', 
        boxShadow: '0 2px 10px rgba(74, 21, 37, 0.05)' 
      }}
    >
      {/* Logo - Burgundy */}
      <Link to="/" className="flex items-center">
        <img
          src="/logo.png"
          alt="OOAK – One Of A Kind"
          style={{ height: '100px', width: 'auto', margin: '-21px -10px' }}
        />
      </Link>

      {/* Links - Burgundy */}
      <div className="hidden md:flex space-x-8 font-medium text-brand-burgundy">
        <Link to="/" className="hover:text-brand-burgundy-dark transition-colors">Home</Link>
        <Link to="/shop" className="hover:text-brand-burgundy-dark transition-colors">Shop</Link>
        <Link to="/lookbook" className="hover:text-brand-burgundy-dark transition-colors">Lookbook</Link>
        <Link to="/gifts" className="hover:text-brand-burgundy-dark transition-colors">Gifts</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        <Link to="/cart" className="hover:text-brand-burgundy-dark transition-colors text-brand-burgundy font-medium">
          🛒 Cart
        </Link>
        
        {/* Login Button - Burgundy Background, White Text */}
        <Link
          to="/login"
          className="bg-brand-burgundy text-white px-5 py-2 rounded-sm hover:bg-brand-burgundy-dark transition-all font-elegant font-bold uppercase tracking-wide shadow-md"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}