import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';

function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <main
        className="relative w-full"
        style={{
          height: '90vh',
          backgroundImage: 'url(/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle overlay so text is readable */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-start justify-center text-left px-12 md:px-20 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight tracking-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            Define Your <br />
            <span className="italic">Elegance.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-white/90 mb-10 mx-auto max-w-2xl"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}
          >
            Discover our exclusive collection of handcrafted bags.{' '}
            Premium quality, minimalist design, made for your everyday journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <button className="bg-brand-burgundy text-white px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-brand-burgundy-dark transition-all shadow-xl cursor-pointer">
              Shop Collection
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-white/30 transition-all shadow-md cursor-pointer">
              View Lookbook
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function Login() {
  return (
    <div className="text-brand-burgundy font-serif text-center mt-20 text-4xl">
      Login Page (Coming Soon)
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;