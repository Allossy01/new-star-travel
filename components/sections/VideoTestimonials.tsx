'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { useVideoTestimonials } from '@/lib/VideoTestimonialsContext';

function getEmbedUrl(url: string): string | null {
  try {
    // YouTube standard & short links
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`;
    // YouTube shorts
    const yts = url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/);
    if (yts) return `https://www.youtube.com/embed/${yts[1]}?rel=0&modestbranding=1`;
    // Already an embed URL
    if (url.includes('youtube.com/embed/')) return url;
    return url; // fallback — try as-is
  } catch {
    return null;
  }
}

export default function VideoTestimonialsSection() {
  const { videos } = useVideoTestimonials();
  const { t, lang } = useLang();
  const isRtl = lang === 'ar';
  const [active, setActive] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <section id="video-reviews" style={{ padding: '96px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)' }} dir={isRtl ? 'rtl' : 'ltr'}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 56 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: '#d00000', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 8 }}>
            {t.videos.tag}
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#001d3d', marginBottom: 12 }}>{t.videos.title}</h2>
          <p style={{ color: '#888', margin: 0, fontSize: 16 }}>{t.videos.subtitle}</p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
          {videos.map((v, i) => {
            const embedUrl = getEmbedUrl(v.videoUrl);
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: '#fff', borderRadius: 20,
                  boxShadow: '0 8px 40px rgba(0,29,61,0.1)',
                  overflow: 'hidden', border: '1px solid rgba(0,29,61,0.06)',
                }}
              >
                {/* Video */}
                <div style={{ position: 'relative', paddingTop: '56.25%', background: '#001d3d' }}>
                  {embedUrl && embedUrl.includes('youtube.com/embed') ? (
                    // YouTube
                    active === v.id ? (
                      <iframe src={embedUrl + '&autoplay=1'}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                        allow="autoplay; encrypted-media" allowFullScreen />
                    ) : (
                      <div onClick={() => setActive(v.id)}
                        style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,29,61,0.85)' }}>
                        <iframe src={embedUrl}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                          allow="encrypted-media" />
                        <motion.div whileHover={{ scale: 1.1 }}
                          style={{ position: 'relative', zIndex: 2, width: 60, height: 60, borderRadius: '50%', background: '#d00000', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(208,0,0,0.5)' }}>
                          <span style={{ fontSize: 22, marginLeft: 4 }}>▶</span>
                        </motion.div>
                      </div>
                    )
                  ) : (
                    // Direct video file
                    <video controls style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                      <source src={v.videoUrl} />
                    </video>
                  )}
                </div>

                {/* Feedback */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#b8960c', fontSize: 14 }}>★</span>)}
                  </div>
                  {(() => {
                    const fb = lang === 'ar' ? (v.feedbackAr || v.feedback) : lang === 'fr' ? (v.feedbackFr || v.feedback) : v.feedback;
                    const name = lang === 'ar' ? (v.clientNameAr || v.clientName) : lang === 'fr' ? (v.clientNameFr || v.clientName) : v.clientName;
                    return (
                      <>
                        {fb && (
                          <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px', fontStyle: 'italic', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                            "{fb}"
                          </p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #d00000, #b8960c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                            {name?.[0]?.toUpperCase() || '👤'}
                          </div>
                          <span style={{ fontWeight: 700, color: '#001d3d', fontSize: 15 }}>{name}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
