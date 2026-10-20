import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-silver">
      <Navbar />
      
      {/* HERO SECTION - Relative wrapper so everything stacks on top of each other */}
      <main className="flex-grow relative w-full h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center">
        
        {/* 1. THE FULL-SCREEN BAG IMAGE */}
        <motion.div
          // Starts high up (-100vh) and scaled down slightly
          initial={{ y: "-100vh", scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 60, 
            damping: 15, 
            duration: 1.2 
          }}
          className="absolute inset-0 w-full h-full bg-gray-300 z-0"
        >
          {/* Placeholder for your bag image. Later, use <img src="..." className="w-full h-full object-cover" /> */}
          <div className="w-full h-full flex items-center justify-center text-brand-emerald text-2xl font-bold opacity-50">
             [ FULL-SCREEN HIGH-QUALITY BAG IMAGE GOES HERE ]
          </div>
          
          {/* Dark overlay to make the white/gold text readable */}
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>

        {/* 2. THE TEXT & BUTTONS (Appears AFTER the bag lands) */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          
          <motion.h1 
            // Starts invisible and slightly lower
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            // Delay of 1.5 seconds to wait for the bag to drop!
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
          >
            Define Your <br />
            <span className="text-brand-gold italic">Elegance.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-200 mb-10 mx-auto max-w-2xl drop-shadow-md"
          >
            Discover our exclusive collection of handcrafted bags. 
            Premium quality, minimalist design, made for your everyday journey.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            {/* Primary Button - Emerald */}
            <button className="bg-brand-emerald text-white px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-[#0a2e22] transition-all shadow-xl">
              Shop Collection
            </button>
            
            {/* Secondary Button - Gold */}
            <button className="bg-brand-gold text-brand-emerald px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-[#b08d4a] transition-all shadow-xl">
              View Lookbook
            </button>
          </motion.div>

        </div>

      </main>
    </div>
  );
}

function Login() {
  return <div className="text-brand-emerald font-serif text-center mt-20 text-4xl">Login Page (Coming Soon)</div>;
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