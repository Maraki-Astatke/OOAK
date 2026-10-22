import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Shop',     to: '/shop' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'Gifts',    to: '/gifts' },
  { label: 'Cart',     to: '/cart' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,21,37,0.5), 0 0 12px 2px rgba(74,21,37,0.2); }
          50%       { box-shadow: 0 0 0 4px rgba(74,21,37,0.15), 0 0 22px 6px rgba(74,21,37,0.35); }
        }
        .login-btn-animated {
          animation: borderPulse 2.4s ease-in-out infinite;
        }
      `}</style>

      <nav
        className="bg-brand-silver sticky top-0 z-50 px-6 py-2 flex justify-between items-center"
        style={{
          borderBottom: '1px solid rgba(74, 21, 37, 0.15)',
          boxShadow: '0 2px 10px rgba(74, 21, 37, 0.05)',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="OOAK – One Of A Kind"
            style={{ height: '100px', width: 'auto', margin: '-21px -10px' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8 font-medium text-brand-burgundy">
          {navLinks.slice(0, 4).map(({ label, to }) => (
            <Link key={to} to={to} className="hover:text-brand-burgundy-dark transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/cart" className="hover:text-brand-burgundy-dark transition-colors text-brand-burgundy font-medium">
            🛒 Cart
          </Link>
          <Link
            to="/login"
            className="group relative overflow-hidden border border-brand-burgundy text-brand-burgundy px-5 py-2 rounded-full font-elegant font-bold uppercase tracking-wide transition-all duration-300 hover:text-white login-btn-animated"
          >
            <span className="absolute inset-0 bg-brand-burgundy translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
            <span className="relative z-10">Login</span>
          </Link>
        </div>

        {/* Mobile: Hamburger only */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
          >
            <span className="block w-6 h-0.5 bg-brand-burgundy rounded-full" />
            <span className="block w-6 h-0.5 bg-brand-burgundy rounded-full" />
            <span className="block w-4 h-0.5 bg-brand-burgundy rounded-full self-end" />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay + left-slide drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Left panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs z-50 flex flex-col md:hidden"
              style={{
                background: '#EBEBEB',
                boxShadow: '6px 0 40px rgba(74,21,37,0.18)',
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(74,21,37,0.12)' }}
              >
                <Link to="/" onClick={() => setOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="OOAK"
                    style={{ height: '70px', width: 'auto', margin: '-10px -6px' }}
                  />
                </Link>
                {/* Close ✕ */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-brand-burgundy hover:bg-brand-burgundy/10 transition-colors cursor-pointer text-xl font-light"
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-6 py-6 gap-1 flex-1">
                {navLinks.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 py-4 text-xl font-serif text-brand-burgundy hover:text-brand-burgundy-dark tracking-wide border-b border-brand-burgundy/10 transition-colors group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy/30 group-hover:bg-brand-burgundy transition-colors" />
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Login button – pinned to bottom */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="px-6 pb-10 pt-4"
                style={{ borderTop: '1px solid rgba(74,21,37,0.10)' }}
              >
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="group relative overflow-hidden flex items-center justify-center w-full border-2 border-brand-burgundy text-brand-burgundy py-3.5 rounded-full font-elegant font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:text-white login-btn-animated"
                >
                  <span className="absolute inset-0 bg-brand-burgundy translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
                  <span className="relative z-10">Login</span>
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}