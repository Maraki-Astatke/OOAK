import { useEffect, useRef, useState } from 'react';
import peachImg from '../assets/peach.png';

/* ─────────────────────────────────────────────
   Seeded deterministic random helpers
───────────────────────────────────────────── */
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  type: 'sparkle' | 'mist' | 'petal';
  rotation: number;
}

function generateParticles(): Particle[] {
  const particles: Particle[] = [];

  // Golden sparkles
  for (let i = 0; i < 30; i++) {
    particles.push({
      id: i,
      x: 25 + seededRand(i * 7) * 50,
      y: 55 + seededRand(i * 3) * 30,
      size: 3 + seededRand(i * 11) * 8,
      duration: 2.5 + seededRand(i * 5) * 3,
      delay: seededRand(i * 13) * 4,
      drift: (seededRand(i * 17) - 0.5) * 60,
      opacity: 0.7 + seededRand(i * 19) * 0.3,
      type: 'sparkle',
      rotation: seededRand(i * 23) * 360,
    });
  }

  // White mist clouds
  for (let i = 0; i < 12; i++) {
    const idx = i + 30;
    particles.push({
      id: idx,
      x: 20 + seededRand(idx * 7) * 60,
      y: 50 + seededRand(idx * 3) * 30,
      size: 30 + seededRand(idx * 11) * 60,
      duration: 4 + seededRand(idx * 5) * 4,
      delay: seededRand(idx * 13) * 5,
      drift: (seededRand(idx * 17) - 0.5) * 80,
      opacity: 0.12 + seededRand(idx * 19) * 0.18,
      type: 'mist',
      rotation: seededRand(idx * 23) * 360,
    });
  }

  // Rose petals
  for (let i = 0; i < 10; i++) {
    const idx = i + 42;
    particles.push({
      id: idx,
      x: 5 + seededRand(idx * 7) * 90,
      y: 10 + seededRand(idx * 3) * 60,
      size: 8 + seededRand(idx * 11) * 12,
      duration: 6 + seededRand(idx * 5) * 5,
      delay: seededRand(idx * 13) * 6,
      drift: (seededRand(idx * 17) - 0.5) * 120,
      opacity: 0.6 + seededRand(idx * 19) * 0.4,
      type: 'petal',
      rotation: seededRand(idx * 23) * 720,
    });
  }

  return particles;
}

const PARTICLES = generateParticles();

export default function BagCinematic() {
  const [phase, setPhase] = useState<'intro' | 'pan' | 'open' | 'magic'>('intro');
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase('pan'), 300);
    const t2 = setTimeout(() => setPhase('open'), 2000);
    const t3 = setTimeout(() => setPhase('magic'), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isInView]);

  // Reset animation when out of view (loop-friendly)
  useEffect(() => {
    if (!isInView) {
      setPhase('intro');
    }
  }, [isInView]);

  const isAnimating = phase !== 'intro';
  const hasMagic = phase === 'magic';
  const hasOpen = phase === 'open' || hasMagic;

  return (
    <div
      ref={containerRef}
      className="bag-cinematic-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '500px',
        background: 'radial-gradient(ellipse at 50% 60%, #1a0a0f 0%, #0d0508 55%, #000000 100%)',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes cameraPan {
          0%   { transform: scale(0.85) translateX(30px) rotate(-1deg); }
          40%  { transform: scale(1.05) translateX(-15px) rotate(0.5deg); }
          70%  { transform: scale(1.0) translateX(10px) rotate(-0.3deg); }
          100% { transform: scale(1.0) translateX(0px) rotate(0deg); }
        }

        @keyframes flapOpen {
          0%   { transform: perspective(600px) rotateX(0deg); }
          100% { transform: perspective(600px) rotateX(-35deg); }
        }

        @keyframes sparkleFloat {
          0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0.5) rotate(0deg); }
          15%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-180px) translateX(var(--drift)) scale(1.2) rotate(var(--rot)); }
        }

        @keyframes mistFloat {
          0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0.6); }
          20%  { opacity: var(--base-opacity); }
          80%  { opacity: var(--base-opacity); }
          100% { opacity: 0; transform: translateY(-200px) translateX(var(--drift)) scale(2.5); }
        }

        @keyframes petalFall {
          0%   { opacity: 0; transform: translateY(-30px) translateX(0) rotate(0deg); }
          10%  { opacity: var(--base-opacity); }
          90%  { opacity: var(--base-opacity); }
          100% { opacity: 0; transform: translateY(120px) translateX(var(--drift)) rotate(var(--rot)); }
        }

        @keyframes shimmer {
          0%   { opacity: 0.3; }
          50%  { opacity: 0.9; }
          100% { opacity: 0.3; }
        }

        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.15), inset 0 0 20px rgba(212,175,55,0.1); }
          50%       { box-shadow: 0 0 50px rgba(212,175,55,0.6), 0 0 100px rgba(212,175,55,0.3), inset 0 0 30px rgba(212,175,55,0.2); }
        }

        @keyframes groundLight {
          0%, 100% { opacity: 0.15; transform: scaleX(0.8); }
          50%       { opacity: 0.35; transform: scaleX(1.1); }
        }

        @keyframes studioBrightness {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50%       { opacity: 1; transform: scale(1.3) rotate(180deg); }
        }

        @keyframes vignettePulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 0.45; }
        }

        @keyframes mistGlow {
          0%   { opacity: 0; transform: scale(0.8) translateY(0); }
          30%  { opacity: 0.7; }
          100% { opacity: 0; transform: scale(2.5) translateY(-80px); }
        }

        .sparkle-star {
          position: absolute;
          pointer-events: none;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        .petal-shape {
          position: absolute;
          pointer-events: none;
          border-radius: 0 80% 0 80%;
          background: radial-gradient(ellipse at 30% 30%, #ff6b8a, #8b1a2e);
        }

        .mist-blob {
          position: absolute;
          pointer-events: none;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(220,200,255,0.4) 40%, transparent 70%);
          filter: blur(8px);
        }
      `}</style>

      {/* ── Studio backdrop gradient ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(50,20,30,0.8) 0%, transparent 70%)',
        zIndex: 1,
      }} />

      {/* ── Animated vignette ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
        zIndex: 2,
        animation: hasMagic ? 'vignettePulse 3s ease-in-out infinite' : undefined,
      }} />

      {/* ── Ground reflection light ── */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '55%',
        height: '20px',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%)',
        filter: 'blur(12px)',
        zIndex: 3,
        animation: hasMagic ? 'groundLight 2.5s ease-in-out infinite' : undefined,
        opacity: isAnimating ? 0.2 : 0,
        transition: 'opacity 1s ease',
      }} />

      {/* ── Main bag container ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '75%',
        maxWidth: '360px',
        animation: isAnimating ? 'cameraPan 2.5s cubic-bezier(0.22,1,0.36,1) forwards' : undefined,
        filter: isAnimating
          ? 'drop-shadow(0 20px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 30px rgba(212,175,55,0.25))'
          : 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
        transition: 'filter 1.5s ease',
      }}>

        {/* ── Bag glow ring ── */}
        {hasMagic && (
          <div style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '8px',
            animation: 'goldGlow 2s ease-in-out infinite',
            zIndex: -1,
          }} />
        )}

        {/* ── Bag image with "flap open" illusion via clip ── */}
        <div style={{ position: 'relative', width: '100%' }}>

          {/* Bag body (full image, always shown) */}
          <img
            src={peachImg}
            alt="OOAK Peach Luxury Bag"
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'contain',
              userSelect: 'none',
              transition: 'filter 1s ease',
              filter: hasMagic
                ? 'brightness(1.15) contrast(1.05) saturate(1.1)'
                : 'brightness(1.0)',
            }}
          />

          {/* Flap highlight overlay — simulates flap opening by brightening top */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '55%',
            background: hasOpen
              ? 'linear-gradient(180deg, rgba(255,240,200,0.18) 0%, rgba(212,175,55,0.08) 60%, transparent 100%)'
              : 'transparent',
            transition: 'background 1.2s ease',
            borderRadius: '4px 4px 0 0',
            pointerEvents: 'none',
          }} />

          {/* Magic glow from bag opening */}
          {hasMagic && (
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '40%',
              background: 'radial-gradient(ellipse, rgba(255,245,180,0.5) 0%, rgba(212,175,55,0.2) 40%, transparent 70%)',
              filter: 'blur(15px)',
              animation: 'mistGlow 2.5s ease-in-out infinite',
              zIndex: 5,
            }} />
          )}
        </div>
      </div>

      {/* ── Particle layer (above bag) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 15,
        pointerEvents: 'none',
        opacity: hasMagic ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}>
        {PARTICLES.map((p) => {
          if (p.type === 'sparkle') {
            return (
              <div
                key={p.id}
                className="sparkle-star"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: `radial-gradient(circle, #fff8d0 0%, #d4af37 40%, #b8860b 100%)`,
                  animation: `sparkleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                  ['--drift' as string]: `${p.drift}px`,
                  ['--rot' as string]: `${p.rotation}deg`,
                } as React.CSSProperties}
              />
            );
          }
          if (p.type === 'mist') {
            return (
              <div
                key={p.id}
                className="mist-blob"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animation: `mistFloat ${p.duration}s ease-out ${p.delay}s infinite`,
                  ['--drift' as string]: `${p.drift}px`,
                  ['--base-opacity' as string]: `${p.opacity}`,
                } as React.CSSProperties}
              />
            );
          }
          if (p.type === 'petal') {
            return (
              <div
                key={p.id}
                className="petal-shape"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size * 0.65}px`,
                  animation: `petalFall ${p.duration}s ease-in-out ${p.delay}s infinite`,
                  ['--drift' as string]: `${p.drift}px`,
                  ['--rot' as string]: `${p.rotation}deg`,
                  ['--base-opacity' as string]: `${p.opacity}`,
                  filter: 'drop-shadow(0 2px 4px rgba(139,26,46,0.4))',
                } as React.CSSProperties}
              />
            );
          }
          return null;
        })}
      </div>

      {/* ── Studio spotlight top ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
        height: '60%',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,245,220,0.12) 0%, transparent 70%)',
        zIndex: 4,
        pointerEvents: 'none',
        animation: hasMagic ? 'shimmer 3s ease-in-out infinite' : undefined,
      }} />

      {/* ── Cinematic bars (top/bottom letterbox) ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '6%',
        background: 'rgba(0,0,0,0.85)',
        zIndex: 20,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '6%',
        background: 'rgba(0,0,0,0.85)',
        zIndex: 20,
        pointerEvents: 'none',
      }} />

      {/* ── 4K badge ── */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
        opacity: isAnimating ? 0.7 : 0,
        transition: 'opacity 1s ease 1s',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '9px',
          letterSpacing: '0.25em',
          color: 'rgba(212,175,55,0.8)',
          textTransform: 'uppercase',
        }}>4K · 60fps</span>
      </div>

      {/* ── OOAK watermark ── */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 25,
        fontFamily: 'Cinzel, serif',
        fontSize: '11px',
        letterSpacing: '0.5em',
        color: 'rgba(212,175,55,0.5)',
        textTransform: 'uppercase',
        opacity: hasMagic ? 0.8 : 0,
        transition: 'opacity 1.5s ease',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        O O A K
      </div>
    </div>
  );
}
