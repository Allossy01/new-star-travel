'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { packages, type Package } from '@/lib/data';
import BookingModal from '@/components/ui/BookingModal';

function StarRating({ stars }: { stars: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < stars ? '#b8960c' : '#ddd', fontSize: 13 }}>★</span>
      ))}
    </div>
  );
}

function PackageCard({ pkg, t, lang, onBook }: { pkg: Package; t: any; lang: string; onBook: (name: string) => void }) {
  const name = lang === 'ar' ? pkg.nameAr : lang === 'fr' ? pkg.nameFr : pkg.nameEn;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(0,0,0,0.18)' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
        <img
          src={pkg.image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: pkg.type === 'hajj' ? '#b8960c' : '#d00000',
          color: '#fff', borderRadius: 99, padding: '4px 12px',
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
        }}>
          {pkg.type === 'hajj' ? t.packages.hajj : t.packages.umrah}
        </span>
        <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
          <StarRating stars={pkg.hotelStars} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontWeight: 700, color: '#001d3d', fontSize: 17, marginBottom: 16, lineHeight: 1.3 }}>{name}</h3>

        <div style={{ marginBottom: 16 }}>
          {[
            { label: t.packages.hotel, value: pkg.hotel },
            { label: t.packages.airline, value: pkg.airline },
            { label: t.packages.duration, value: `${pkg.durationNights} ${t.packages.nights}` },
            { label: t.packages.departure, value: pkg.departure },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0', borderBottom: '1px solid #f0f0f0',
            }}>
              <span style={{ color: '#b8960c', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, flexShrink: 0 }}>{label}</span>
              <span style={{ color: '#001d3d', fontSize: 12, fontWeight: 500, textAlign: 'right', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <span style={{ color: '#aaa', fontSize: 11, display: 'block' }}>{t.packages.from}</span>
            <span style={{ color: '#d00000', fontWeight: 800, fontSize: 26, lineHeight: 1.1 }}>{pkg.price.toLocaleString()} MAD</span>
          </div>
          <StarRating stars={pkg.hotelStars} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, border: '2px solid #d00000', color: '#d00000', background: 'transparent',
            borderRadius: 12, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#d00000'; (e.target as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = '#d00000'; }}
          >
            {t.packages.viewDetails}
          </button>
          <motion.button
            onClick={() => onBook(name)}
            style={{
              flex: 1, background: '#d00000', color: '#fff', border: 'none',
              borderRadius: 12, padding: '11px 0', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(208,0,0,0.35)',
            }}
            whileHover={{ scale: 1.03, background: '#b00000' }}
            whileTap={{ scale: 0.97 }}
          >
            {t.packages.bookNow}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<'all' | 'umrah' | 'hajj'>('all');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const filtered = filter === 'all' ? packages : packages.filter(p => p.type === filter);

  const handleBook = (name: string) => { setSelectedPackage(name); setBookingOpen(true); };

  return (
    <section id="packages" style={{ padding: '96px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#d00000', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 8 }}>Our Offers</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#001d3d', marginBottom: 12 }}>{t.packages.title}</h2>
          <p style={{ color: '#888', maxWidth: 520, margin: '0 auto 32px' }}>{t.packages.subtitle}</p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {(['all', 'umrah', 'hajj'] as const).map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 24px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                  border: filter === f ? 'none' : '1px solid #e0e0e0',
                  background: filter === f ? '#d00000' : '#fff',
                  color: filter === f ? '#fff' : '#555',
                  cursor: 'pointer',
                  boxShadow: filter === f ? '0 4px 16px rgba(208,0,0,0.3)' : 'none',
                  textTransform: 'capitalize',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {f === 'all' ? t.packages.all : f === 'umrah' ? t.packages.umrah : t.packages.hajj}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} t={t} lang={lang} onBook={handleBook} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} packageName={selectedPackage} />
    </section>
  );
}


