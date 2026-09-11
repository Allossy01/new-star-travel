'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import type { Language } from '@/lib/translations';

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.umrah, href: '#packages' },
    { label: t.nav.hajj, href: '#packages' },
    { label: t.nav.destinations, href: '#packages' },
    { label: t.nav.about, href: '#why-us' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s',
        background: scrolled ? 'rgba(0,29,61,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.3)' : 'none',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo.png" alt="New Star Travel" style={{ height: 52, width: 'auto', objectFit: 'contain', display: 'block' }} />
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden-mobile">
            {links.map((link) => (
              <a key={link.label} href={link.href} style={{
                color: 'rgba(255,255,255,0.82)', fontSize: 14, fontWeight: 500,
                textDecoration: 'none', position: 'relative', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#b8960c'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Lang switcher */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 2,
              background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '3px 4px',
            }}>
              {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: lang === l ? '#d00000' : 'transparent',
                  color: lang === l ? '#fff' : 'rgba(255,255,255,0.65)',
                  textTransform: 'uppercase',
                }}>
                  {l}
                </button>
              ))}
            </div>

            <a href="#contact" style={{
              display: 'none',
              background: '#d00000', color: '#fff', padding: '9px 20px',
              borderRadius: 99, fontSize: 13, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(208,0,0,0.4)', transition: 'all 0.2s',
            }}
              className="book-btn"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#b00000'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#d00000'}
            >{t.nav.bookNow}</a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}
              className="hamburger"
            >
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 22, height: 2, background: '#fff', marginBottom: i < 2 ? 5 : 0,
                  borderRadius: 2, transition: 'all 0.3s',
                  transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(0,29,61,0.98)', borderTop: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}
          >
            <div style={{ padding: '20px 32px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{
                  color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 500,
                  textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>{link.label}</a>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {(['en', 'fr', 'ar'] as Language[]).map(l => (
                  <button key={l} onClick={() => { setLang(l); setMenuOpen(false); }} style={{
                    padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700,
                    border: lang === l ? 'none' : '1px solid rgba(255,255,255,0.25)',
                    background: lang === l ? '#d00000' : 'transparent',
                    color: '#fff', cursor: 'pointer', textTransform: 'uppercase',
                  }}>{l}</button>
                ))}
              </div>
              <a href="#contact" onClick={() => setMenuOpen(false)} style={{
                marginTop: 12, textAlign: 'center', background: '#d00000', color: '#fff',
                padding: '13px 0', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 14,
              }}>{t.nav.bookNow}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .hidden-mobile { display: flex !important; }
          .book-btn { display: block !important; }
          .hamburger { display: none !important; }
        }
        @media (max-width: 899px) {
          .hidden-mobile { display: none !important; }
          .book-btn { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
