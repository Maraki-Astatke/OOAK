import { motion } from 'framer-motion';
import BagCinematic from '../../components/BagCinematic';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f2f4 40%, #ffffff 100%)' }}
      className="py-24 px-6 max-w-screen-xl mx-auto w-full"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-20">

        {/* ── Left Side: Cinematic Bag Animation ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 relative"
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
              aspectRatio: '4/5',
              maxWidth: '100%',
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
          className="w-full lg:w-1/2 flex flex-col justify-center text-left"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '11px',
              letterSpacing: '0.35em',
              color: '#d4af37',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
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
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              color: '#4A1525',
              lineHeight: 1.1,
              marginBottom: '32px',
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
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, #d4af37, #b8860b)',
              marginBottom: '28px',
              transformOrigin: 'left',
            }}
          />

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.8 }}>
              At <strong style={{ color: '#4A1525' }}>OOAK</strong>, we believe that what you carry should be as
              unique as you are. Born from a passion for minimalist design and timeless craftsmanship,
              every piece we create is infused with intention and artistry.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.8 }}>
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
              gap: '32px',
              marginTop: '40px',
              paddingTop: '32px',
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
                  fontSize: '1.8rem',
                  color: '#4A1525',
                  lineHeight: 1,
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '9px',
                  letterSpacing: '0.25em',
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