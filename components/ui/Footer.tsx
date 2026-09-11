'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ background: '#000f22', color: '#fff', paddingTop: 72, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, #d00000, #b8960c)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: '#fff', fontWeight: 700,
              }}>★</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>New Star</div>
                <div style={{ color: '#b8960c', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>Travel</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>{t.footer.tagline}</p>
            {/* Rating */}
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#b8960c', fontSize: 16 }}>★</span>)}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>4.9/5 · 10,000+ Pilgrims</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#b8960c', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>{t.footer.quickLinks}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[t.nav.home, t.nav.umrah, t.nav.hajj, t.nav.destinations, t.nav.about, t.nav.contact].map((link) => (
                <li key={link}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ color: '#b8960c', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>{t.footer.followUs}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'WhatsApp', href: 'https://wa.me/213555123456', dot: '#25d366' },
                { name: 'Instagram', href: '#', dot: '#E1306C' },
                { name: 'Facebook', href: '#', dot: '#1877F2' },
              ].map(({ name, href, dot }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, display: 'inline-block', flexShrink: 0 }} />
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#b8960c', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>{t.footer.newsletter}</h4>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>Stay updated with our latest packages and travel tips.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                style={{
                  flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)', color: '#fff',
                  borderRadius: 10, padding: '10px 14px', fontSize: 13,
                  outline: 'none', fontFamily: 'inherit',
                }}
              />
              <motion.button
                onClick={() => { setEmail(''); setSubscribed(true); setTimeout(() => setSubscribed(false), 2000); }}
                style={{
                  background: '#d00000', color: '#fff', border: 'none',
                  borderRadius: 10, padding: '10px 16px', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {subscribed ? '✓' : t.footer.subscribe}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 13, margin: 0 }}>{t.footer.rights}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27ae60', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

