'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const icons = ['🏨', '💰', '🧭', '✈️', '📋', '🎧'];

export default function WhyUs() {
  const { t } = useLang();

  return (
    <section id="why-us" style={{ padding: '96px 0', background: '#001d3d', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(208,0,0,0.15), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,150,12,0.12), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 56 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: '#b8960c', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 8 }}>Excellence</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>{t.whyUs.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto' }}>{t.whyUs.subtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {t.whyUs.cards.map((card, i) => (
            <motion.div
              key={i}
              style={{
                borderRadius: 20,
                padding: '28px 28px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'default',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                background: 'rgba(208,0,0,0.12)',
                borderColor: 'rgba(208,0,0,0.4)',
                y: -4,
              }}
            >
              <motion.div
                style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(208,0,0,0.3), rgba(184,150,12,0.2))',
                  border: '1px solid rgba(184,150,12,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, marginBottom: 20,
                }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {icons[i]}
              </motion.div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

