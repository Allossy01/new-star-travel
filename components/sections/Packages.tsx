'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { type Package } from '@/lib/data';
import { usePackages } from '@/lib/PackagesContext';
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

function PackageCard({ pkg, t, lang, onBook, onDetails }: { pkg: Package; t: any; lang: string; onBook: (name: string) => void; onDetails: (pkg: Package) => void }) {
  const name = lang === 'ar' ? pkg.nameAr : lang === 'fr' ? pkg.nameFr : pkg.nameEn;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
      whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(0,0,0,0.18)' }}
    >
      <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
        <img src={pkg.image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: pkg.type === 'hajj' ? '#b8960c' : '#d00000',
          color: '#fff', borderRadius: 99, padding: '4px 12px',
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
        }}>{pkg.type === 'hajj' ? t.packages.hajj : t.packages.umrah}</span>
        <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
          <StarRating stars={pkg.hotelStars} />
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <h3 style={{ fontWeight: 700, color: '#001d3d', fontSize: 17, marginBottom: 16, lineHeight: 1.3 }}>{name}</h3>

        <div style={{ marginBottom: 16 }}>
          {[
            { label: t.packages.makkahHotel, value: pkg.hotelMakkah },
            { label: t.packages.medinaHotel, value: pkg.hotelMedina },
            { label: t.packages.airline, value: pkg.airline },
            { label: t.packages.duration, value: `${pkg.durationNights} ${t.packages.nights}` },
            { label: t.packages.departure, value: pkg.departure },
            { label: t.packages.return, value: pkg.returnDate },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
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
          <button
            onClick={() => onDetails(pkg)}
            style={{
              flex: 1, border: '2px solid #d00000', color: '#d00000', background: 'transparent',
              borderRadius: 12, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#d00000'; (e.target as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = '#d00000'; }}
          >{t.packages.viewDetails}</button>
          <motion.button
            onClick={() => onBook(name)}
            style={{
              flex: 1, background: '#d00000', color: '#fff', border: 'none',
              borderRadius: 12, padding: '11px 0', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(208,0,0,0.35)', fontFamily: 'inherit',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >{t.packages.bookNow}</motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function DetailsModal({ pkg, lang, t, onClose, onBook }: { pkg: Package; lang: string; t: any; onClose: () => void; onBook: () => void }) {
  const name = lang === 'ar' ? pkg.nameAr : lang === 'fr' ? pkg.nameFr : pkg.nameEn;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#fff', borderRadius: 24, overflow: 'hidden',
            width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          }}>
          {/* Image header */}
          <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
            <img src={pkg.image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,29,61,0.85), transparent 50%)' }} />
            <button onClick={onClose} style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff',
              width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
            <span style={{
              position: 'absolute', top: 14, left: 14,
              background: pkg.type === 'hajj' ? '#b8960c' : '#d00000',
              color: '#fff', borderRadius: 99, padding: '4px 14px',
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            }}>{pkg.type}</span>
            <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: 0 }}>{name}</h2>
              <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
                {[...Array(pkg.hotelStars)].map((_, i) => <span key={i} style={{ color: '#b8960c', fontSize: 16 }}>★</span>)}
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '24px 28px' }}>
            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '16px 20px', background: '#fff8f8', borderRadius: 14, border: '1.5px solid #fee2e2' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.packages.startingFrom}</div>
                <div style={{ color: '#d00000', fontWeight: 900, fontSize: 28, lineHeight: 1.1 }}>{pkg.price.toLocaleString()} MAD</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.packages.duration}</div>
                <div style={{ color: '#001d3d', fontWeight: 700, fontSize: 16 }}>{pkg.durationNights} {t.packages.nights}</div>
              </div>
            </div>

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {[
                { icon: '🕋', label: t.packages.makkahHotel.replace(/^[^\s]+\s/, ''), value: pkg.hotelMakkah },
                { icon: '🕌', label: t.packages.medinaHotel.replace(/^[^\s]+\s/, ''), value: pkg.hotelMedina },
                { icon: '✈️', label: t.packages.airline, value: pkg.airline },
                { icon: '📅', label: t.packages.departure, value: pkg.departure },
                { icon: '🔙', label: t.packages.return, value: pkg.returnDate },
                { icon: '🌙', label: t.packages.duration, value: `${pkg.durationNights} ${t.packages.nights} / ${pkg.durationDays} ${t.packages.days}` },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ background: '#f8fafc', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
                  <div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</div>
                  <div style={{ color: '#001d3d', fontSize: 13, fontWeight: 600, marginTop: 3 }}>{value}</div>
                </div>
              ))}
            </div>

            {/* What's included */}
            {pkg.includes && pkg.includes.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ color: '#001d3d', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{t.packages.whatsIncluded}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {pkg.includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✓</span>
                      <span style={{ color: '#475569', fontSize: 13 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <motion.button onClick={onBook}
              style={{
                width: '100%', background: '#d00000', color: '#fff', border: 'none',
                borderRadius: 14, padding: '16px 0', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 4px 20px rgba(208,0,0,0.35)', fontFamily: 'inherit',
              }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {t.packages.bookThisPackage} →
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Packages() {
  const { t, lang } = useLang();
  const { packages } = usePackages();
  const [filter, setFilter] = useState<'all' | 'umrah' | 'hajj'>('all');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [detailsPkg, setDetailsPkg] = useState<Package | null>(null);

  const filtered = filter === 'all' ? packages : packages.filter(p => p.type === filter);
  const handleBook = (name: string) => { setSelectedPackage(name); setBookingOpen(true); };
  const handleDetails = (pkg: Package) => setDetailsPkg(pkg);

  return (
    <section id="packages" style={{ padding: '96px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#d00000', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 8 }}>Our Offers</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#001d3d', marginBottom: 12 }}>{t.packages.title}</h2>
          <p style={{ color: '#888', maxWidth: 520, margin: '0 auto 32px' }}>{t.packages.subtitle}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {(['all', 'umrah', 'hajj'] as const).map((f) => (
              <motion.button key={f} onClick={() => setFilter(f)}
                style={{
                  padding: '10px 24px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                  border: filter === f ? 'none' : '1px solid #e0e0e0',
                  background: filter === f ? '#d00000' : '#fff',
                  color: filter === f ? '#fff' : '#555',
                  cursor: 'pointer', boxShadow: filter === f ? '0 4px 16px rgba(208,0,0,0.3)' : 'none',
                  textTransform: 'capitalize', fontFamily: 'inherit',
                }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {f === 'all' ? t.packages.all : f === 'umrah' ? t.packages.umrah : t.packages.hajj}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} t={t} lang={lang} onBook={handleBook} onDetails={handleDetails} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {detailsPkg && (
        <DetailsModal
          pkg={detailsPkg}
          lang={lang}
          t={t}
          onClose={() => setDetailsPkg(null)}
          onBook={() => {
            const name = lang === 'ar' ? detailsPkg.nameAr : lang === 'fr' ? detailsPkg.nameFr : detailsPkg.nameEn;
            setDetailsPkg(null);
            handleBook(name);
          }}
        />
      )}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} packageName={selectedPackage} />
    </section>
  );
}
