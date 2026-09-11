'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&q=90')`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
      }} />
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,29,61,0.82) 0%, rgba(0,29,61,0.65) 50%, rgba(0,29,61,0.92) 100%)' }} />
      {/* Subtle red tint */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(208,0,0,0.12), transparent 60%)' }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} style={{
          position: 'absolute', width: 4, height: 4, borderRadius: '50%',
          background: 'rgba(184,150,12,0.7)',
          left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 22}%`,
        }}
          animate={{ y: [-18, 18, -18], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}

      {/* Content — fully centered */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 860,
        margin: '0 auto',
        padding: '0 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(184,150,12,0.18)', border: '1px solid rgba(184,150,12,0.4)',
            borderRadius: 99, padding: '7px 18px', marginBottom: 28,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#b8960c', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#b8960c', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>New Star Travel Agency</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            fontSize: 'clamp(32px, 5.5vw, 66px)',
            fontWeight: 900, color: '#fff', lineHeight: 1.15,
            margin: '0 0 12px', width: '100%',
          }}
        >
          {t.hero.headline.split(' ').slice(0, 6).join(' ')}{' '}
          <span style={{
            background: 'linear-gradient(135deg, #b8960c, #d4af37, #b8960c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t.hero.headline.split(' ').slice(6).join(' ')}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(15px, 1.8vw, 19px)',
            maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.75,
          }}
        >
          {t.hero.subheadline}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}
        >
          <motion.a
            href="#contact"
            style={{
              background: '#d00000', color: '#fff', padding: '15px 36px',
              borderRadius: 99, fontWeight: 700, fontSize: 16, textDecoration: 'none',
              boxShadow: '0 6px 28px rgba(208,0,0,0.45)', display: 'inline-block',
            }}
            whileHover={{ scale: 1.05, background: '#b00000' }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.bookNow}
          </motion.a>
          <motion.a
            href="#packages"
            style={{
              border: '2px solid rgba(184,150,12,0.6)', color: '#fff',
              padding: '15px 36px', borderRadius: 99, fontWeight: 700,
              fontSize: 16, textDecoration: 'none', display: 'inline-block',
              backdropFilter: 'blur(8px)',
            }}
            whileHover={{ scale: 1.05, borderColor: '#b8960c', color: '#b8960c' }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.explorePackages}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, marginTop: 64 }}
        >
          {[
            { num: '15+', label: 'Years Experience' },
            { num: '10K+', label: 'Happy Pilgrims' },
            { num: '50+', label: 'Packages' },
            { num: '4.9★', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 26, fontWeight: 800,
                background: 'linear-gradient(135deg, #b8960c, #d4af37)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{stat.num}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div style={{ width: 24, height: 40, border: '2px solid rgba(255,255,255,0.25)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <motion.div
            style={{ width: 4, height: 8, background: '#b8960c', borderRadius: 2 }}
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
