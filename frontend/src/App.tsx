import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-silver">
      <Navbar />
      
      {/* HERO SECTION */}
      <main className="flex-grow relative w-full h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center">
        
        {/* 1. THE FULL-SCREEN BAG IMAGE */}
        <motion.div
          initial={{ y: "-100vh", scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, duration: 1.2 }}
          className="absolute inset-0 w-full h-full bg-gray-400 z-0"
        >
          <div className="w-full h-full flex items-center justify-center text-brand-burgundy text-2xl font-bold opacity-50">
             [ FULL-SCREEN HIGH-QUALITY BAG IMAGE GOES HERE ]
          </div>
          
          {/* Dark Overlay (necessary so white text is readable over any image) */}
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        {/* 2. THE TEXT & BUTTONS */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
          >
            Define Your <br />
         <span className="text-brand-burgundy-dark italic font-serif">Elegance.</span>
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
            {/* Primary Button - Burgundy */}
            <button className="bg-brand-burgundy text-white px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-[#360f1a] transition-all shadow-xl">
              Shop Collection
            </button>
            
            {/* Secondary Button - Cream/Silver with Burgundy Text */}
            <button className="bg-brand-silver text-brand-burgundy px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-white transition-all shadow-xl">
              View Lookbook
            </button>
          </motion.div>

        </div>

      </main>
    </div>
  );
}

function Login() {
  return <div className="text-brand-burgundy font-serif text-center mt-20 text-4xl">Login Page (Coming Soon)</div>;
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