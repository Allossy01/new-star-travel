'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { useFAQ } from '@/lib/FAQContext';

export default function FAQ() {
  const { t, lang } = useLang();
  const { faqs } = useFAQ();
  const [openId, setOpenId] = useState<string | null>(null);

  type FAQItem = (typeof faqs)[0];
  const getQ = (faq: FAQItem) => {
    if (lang === 'ar') return faq.questionAr;
    if (lang === 'fr') return faq.questionFr;
    return faq.questionEn;
  };
  const getA = (faq: FAQItem) => {
    if (lang === 'ar') return faq.answerAr;
    if (lang === 'fr') return faq.answerFr;
    return faq.answerEn;
  };

  const isRtl = lang === 'ar';

  return (
    <section id="faq" style={{ padding: '96px 0', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, background: 'radial-gradient(circle at 80% 20%, #d00000, transparent 50%), radial-gradient(circle at 20% 80%, #b8960c, transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 56 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: '#d00000', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 8 }}>FAQ</span>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: '#001d3d', marginBottom: 12 }}>{t.faq.title}</h2>
          <p style={{ color: '#64748b', margin: 0 }}>{t.faq.subtitle}</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} dir={isRtl ? 'rtl' : 'ltr'}>
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: '#fff',
                borderRadius: 16,
                border: openId === faq.id ? '1.5px solid #d00000' : '1.5px solid #e2e8f0',
                boxShadow: openId === faq.id ? '0 4px 20px rgba(208,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 16, padding: '20px 24px', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: isRtl ? 'right' : 'left',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: '#001d3d', lineHeight: 1.4 }}>
                  {getQ(faq)}
                </span>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: openId === faq.id ? '#d00000' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: openId === faq.id ? '#fff' : '#64748b',
                  fontSize: 18, fontWeight: 700, transition: 'all 0.25s',
                }}>
                  {openId === faq.id ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 24px 20px',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: 16,
                      color: '#475569',
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}>
                      {getA(faq)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
