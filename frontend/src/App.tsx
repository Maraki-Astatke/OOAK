import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-silver">
      <Navbar />
      
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-12 gap-12">
        
        {/* Left Side: Text */}
        <div className="w-full md:w-1/2 text-left">
          
          {/* Headline uses Balthazar (font-serif) */}
          <h1 className="text-6xl md:text-8xl font-serif text-brand-navy mb-6 leading-tight tracking-tight">
            Define Your <br />
            <span className="text-brand-gold italic">Elegance.</span>
          </h1>
          
          {/* Paragraph uses Inter (default font-sans) */}
          <p className="text-lg md:text-xl text-brand-grey-text mb-10 max-w-lg">
            Discover our exclusive collection of handcrafted bags. 
            Premium quality, minimalist design, made for your everyday journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Primary Button: Gold Background, Navy Text */}
            <button className="bg-brand-gold text-brand-navy px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-[#b08d4a] transition-all shadow-lg">
              Shop Collection
            </button>
            
            {/* Secondary Button: Navy Border, Navy Text */}
            <button className="bg-transparent border border-brand-navy text-brand-navy px-8 py-4 rounded-sm text-sm font-elegant font-bold tracking-widest uppercase hover:bg-brand-navy hover:text-white transition-all shadow-sm">
              View Lookbook
            </button>
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="w-full md:w-1/2 h-[500px] bg-white rounded-xl overflow-hidden shadow-2xl relative border border-gray-200">
           <div className="absolute inset-0 flex items-center justify-center text-brand-grey-text font-medium text-lg opacity-40">
              [ High-Quality Bag Image Goes Here ]
           </div>
        </div>

      </main>
    </div>
  );
}

function Login() {
  return <div className="text-brand-navy font-serif text-center mt-20 text-4xl">Login Page (Coming Soon)</div>;
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