'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const { t, lang } = useLang();
  const [current, setCurrent] = useState(0);

  const getName = (item: typeof testimonials[0]) =>
    lang === 'ar' ? item.nameAr : item.nameEn;
  const getReview = (item: typeof testimonials[0]) =>
    lang === 'ar' ? item.reviewAr : lang === 'fr' ? item.reviewFr : item.reviewEn;

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" style={{ padding: '96px 0', background: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 56 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: '#d00000', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 8 }}>Testimonials</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#001d3d', marginBottom: 12 }}>{t.testimonials.title}</h2>
          <p style={{ color: '#888', margin: 0 }}>{t.testimonials.subtitle}</p>
        </motion.div>

        {/* Carousel */}
        <div style={{ position: 'relative', minHeight: 300 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, #001d3d, #001a38)',
                borderRadius: 24,
                padding: '48px 48px 40px',
                border: '1px solid rgba(184,150,12,0.2)',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,29,61,0.3)',
              }}
            >
              {/* Quote */}
              <div style={{ fontSize: 72, color: 'rgba(184,150,12,0.25)', lineHeight: 0.8, marginBottom: 24, fontFamily: 'Georgia, serif' }}>"</div>

              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, lineHeight: 1.8, maxWidth: 680, margin: '0 auto 32px', fontStyle: 'italic' }}>
                {getReview(testimonials[current])}
              </p>

              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <span key={i} style={{ color: '#b8960c', fontSize: 22 }}>★</span>
                ))}
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #d00000, #b8960c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 20, flexShrink: 0,
                }}>
                  {testimonials[current].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{getName(testimonials[current])}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{testimonials[current].city}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 32 }}>
            <button
              onClick={prev}
              style={{
                width: 42, height: 42, borderRadius: '50%', border: '2px solid rgba(208,0,0,0.4)',
                background: 'transparent', color: '#d00000', fontSize: 22, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d00000'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#d00000'; }}
            >‹</button>

            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    height: 10, width: i === current ? 32 : 10,
                    borderRadius: 99, border: 'none', cursor: 'pointer',
                    background: i === current ? '#d00000' : '#ddd',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: 42, height: 42, borderRadius: '50%', border: '2px solid rgba(208,0,0,0.4)',
                background: 'transparent', color: '#d00000', fontSize: 22, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d00000'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#d00000'; }}
            >›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

