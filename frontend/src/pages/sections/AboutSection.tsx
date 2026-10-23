import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full bg-brand-silver">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Left Side: Video */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="aspect-[9/16] md:aspect-video lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-sm overflow-hidden shadow-2xl relative bg-black">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-[url('/video-placeholder.png')] bg-cover bg-center">
              <span className="text-4xl mb-2">▶</span>
              <span className="font-elegant tracking-widest text-sm uppercase">Play Video</span>
            </div>
            <div className="absolute inset-4 border border-white/20 pointer-events-none"></div>
          </div>
        </motion.div>

        {/* Right Side: Brand Story */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 flex flex-col justify-center text-left"
        >
          <h1 className="text-brand-burgundy font-elegant text-sm tracking-[0.3em] uppercase mb-4">
            Our Story
          </h1>
          <h2 className="text-5xl md:text-7xl font-serif text-brand-burgundy mb-8 leading-tight">
            Crafting <br />
            <span className="italic">One Of A Kind.</span>
          </h2>
          <div className="space-y-6 text-brand-grey font-sans text-base md:text-lg leading-relaxed">
            <p>
              At <strong className="text-brand-burgundy">OOAK</strong>, we believe that what you carry should be as unique as you are. Born from a passion for minimalist design and timeless craftsmanship.
            </p>
            <p>
              Every bag in our collection is thoughtfully designed, rigorously tested, and crafted with premium materials. We don't believe in fast fashion; we believe in creating pieces that tell a story.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}