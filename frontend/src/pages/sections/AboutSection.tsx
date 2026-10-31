import { motion } from 'framer-motion';
import BagCinematic from '../../components/BagCinematic';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f2f4 40%, #ffffff 100%)' }}
      className="py-16 px-6 max-w-screen-xl mx-auto w-full"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-16">

        {/* ── Left Side: Cinematic Bag Animation ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-5/12 relative"
        >
          {/* Outer glow frame */}
          <div style={{
            position: 'relative',
            borderRadius: '6px',
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.6) 0%, rgba(139,26,46,0.3) 50%, rgba(212,175,55,0.6) 100%)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.35), 0 0 60px rgba(212,175,55,0.15)',
          }}>
            <div style={{
              borderRadius: '4px',
              overflow: 'hidden',
              aspectRatio: '3/3.5',
              maxWidth: '340px',
              margin: '0 auto',
            }}>
              <BagCinematic />
            </div>
          </div>

          {/* Decorative floating label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '-18px',
              right: '16px',
              background: 'linear-gradient(135deg, #4A1525, #6b2038)',
              color: '#d4af37',
              fontFamily: 'Cinzel, serif',
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              padding: '8px 18px',
              borderRadius: '2px',
              boxShadow: '0 8px 30px rgba(74,21,37,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            Handcrafted · Limited Edition
          </motion.div>
        </motion.div>

        {/* ── Right Side: Brand Story ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-7/12 flex flex-col justify-center text-left"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#d4af37',
              textTransform: 'uppercase',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#d4af37', flexShrink: 0 }} />
            Our Story
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.45 }}
            style={{
              fontFamily: 'Balthazar, serif',
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              color: '#4A1525',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            Crafting <br />
            <em style={{ fontStyle: 'italic', color: '#6b2038' }}>One Of A Kind.</em>
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              width: '44px',
              height: '1.5px',
              background: 'linear-gradient(90deg, #d4af37, #b8860b)',
              marginBottom: '16px',
              transformOrigin: 'left',
            }}
          />

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.75 }}>
              At <strong style={{ color: '#4A1525' }}>OOAK</strong>, we believe that what you carry should be as
              unique as you are. Born from a passion for minimalist design and timeless craftsmanship,
              every piece we create is infused with intention and artistry.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.75 }}>
              Every bag in our collection is thoughtfully designed, rigorously tested, and crafted
              with premium materials. We don't believe in fast fashion — we believe in creating
              pieces that tell a story and outlive every season.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '22px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(74,21,37,0.12)',
            }}
          >
            {[
              { value: '100%', label: 'Handcrafted' },
              { value: '1/1', label: 'Unique Pieces' },
              { value: '∞', label: 'Love & Care' },
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: 'Balthazar, serif',
                  fontSize: '1.35rem',
                  color: '#4A1525',
                  lineHeight: 1,
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  color: '#d4af37',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}