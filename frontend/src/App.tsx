import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navbar from './components/Navbar';

function Home() {
  // Step 1 → 2: bag has landed (triggers swap + text phase)
  const [isLanded, setIsLanded] = useState(false);
  // Step 3: open-bag has been visible briefly → slide text up & fade bag out
  const [showText, setShowText] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-brand-silver overflow-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <main className="flex-grow relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-brand-silver">

        {/* ── TEXT BLOCK  (starts below centre, slides up when showText=true) ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex flex-col items-center justify-start pt-16 px-6 z-20 text-center pointer-events-none"
          initial={{ opacity: 0, y: "40vh" }}
          animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: "40vh" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            // re-enable pointer events once text has arrived
          }}
          style={{ pointerEvents: showText ? "auto" : "none" }}
        >
          <h1 className="text-6xl md:text-8xl font-serif text-brand-burgundy mb-6 leading-tight tracking-tight">
            Define Your <br />
            <span className="text-brand-burgundy-dark italic font-serif">Elegance.</span>
          </h1>

          <p className="text-lg md:text-xl text-brand-grey mb-10 mx-auto max-w-2xl">
            Discover our exclusive collection of handcrafted bags.{" "}
            Premium quality, minimalist design, made for your everyday journey.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-brand-burgundy text-white px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-brand-burgundy-dark transition-all shadow-xl cursor-pointer">
              Shop Collection
            </button>
            <button className="bg-white text-brand-burgundy border border-brand-burgundy/20 px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-gray-50 transition-all shadow-md cursor-pointer">
              View Lookbook
            </button>
          </div>
        </motion.div>

        {/* ── BAG  (drops from top, then swaps closed→open, then fades out) ── */}
        <motion.div
          /* STEP 1 – THE DROP */
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 55, damping: 14 }}
          onAnimationComplete={() => setIsLanded(true)}   /* → STEP 2 */
          className="relative z-10 w-full max-w-2xl flex items-center justify-center"
          style={{ aspectRatio: "1 / 1" }}
        >
          {/* STEP 4 – fade bag out once text starts sliding */}
          <motion.div
            className="w-full h-full relative"
            animate={showText ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {!isLanded ? (
                /* CLOSED BAG */
                <motion.img
                  key="closed"
                  src="/bag-closed.png"
                  alt="Closed Bag"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.05 }}          /* near-instant swap */
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                />
              ) : (
                /* STEP 2 – OPEN BAG (instant appear, same position) */
                <motion.img
                  key="open"
                  src="/bag-open.png"
                  alt="Open Bag"
                  initial={{ opacity: 1 }}                 /* no fade-in — seamless swap */
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                  /* STEP 3 – after a short pause, trigger text slide + bag fade */
                  onAnimationComplete={() => {
                    setTimeout(() => setShowText(true), 400);
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

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