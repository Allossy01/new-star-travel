'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function QuickSearch() {
  const { t } = useLang();
  const [travelType, setTravelType] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('');

  const selectStyle: React.CSSProperties = {
    width: '100%',
    background: '#fff',
    border: '2px solid #e8ecf0',
    color: '#001d3d',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 14,
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    appearance: 'none',
  };

  const labelStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    display: 'block',
    marginBottom: 8,
  };

  return (
    <section style={{ position: 'relative', zIndex: 20, marginTop: -64, padding: '0 32px' }}>
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <motion.div
          style={{
            borderRadius: 20,
            padding: '28px 32px',
            background: 'rgba(0,29,61,0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 12px 60px rgba(0,0,0,0.45)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#d00000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🔍</span>
            {t.search.title}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {/* Travel Type */}
            <div>
              <label style={labelStyle}>{t.search.travelType}</label>
              <div style={{ position: 'relative' }}>
                <select value={travelType} onChange={e => setTravelType(e.target.value)} style={selectStyle}>
                  <option value="">— Select —</option>
                  <option value="umrah">{t.search.umrah}</option>
                  <option value="hajj">{t.search.hajj}</option>
                </select>
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#001d3d', pointerEvents: 'none', fontSize: 11 }}>▼</span>
              </div>
            </div>

            {/* Date */}
            <div>
              <label style={labelStyle}>{t.search.departureDate}</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ ...selectStyle, colorScheme: 'light' }}
              />
            </div>

            {/* Travelers */}
            <div>
              <label style={labelStyle}>{t.search.travelers}</label>
              <div style={{ position: 'relative' }}>
                <select value={travelers} onChange={e => setTravelers(e.target.value)} style={selectStyle}>
                  <option value="">— Select —</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#001d3d', pointerEvents: 'none', fontSize: 11 }}>▼</span>
              </div>
            </div>

            {/* Search button */}
            <div>
              <label style={{ ...labelStyle, color: 'transparent' }}>.</label>
              <motion.button
                style={{
                  width: '100%', background: '#d00000', color: '#fff', border: 'none',
                  borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', boxShadow: '0 4px 20px rgba(208,0,0,0.4)',
                  fontFamily: 'inherit',
                }}
                whileHover={{ scale: 1.03, background: '#b00000' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.search.search}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
