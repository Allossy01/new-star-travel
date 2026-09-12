'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { useBookings } from '@/lib/BookingsContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
}

export default function BookingModal({ isOpen, onClose, packageName }: BookingModalProps) {
  const { t } = useLang();
  const { addBooking } = useBookings();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', nationality: '',
    adults: '1', children: '0', packageType: packageName || '',
    departureDate: '', returnDate: '', roomType: 'double',
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)',
    color: '#fff', borderRadius: 10, padding: '12px 14px', fontSize: 14,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.2s',
  };
  const labelStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 6,
  };
  const selectStyle: React.CSSProperties = {
    ...inputStyle, cursor: 'pointer', appearance: 'none' as any,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23ffffff88' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36,
  };

  const handleSubmit = () => {
    addBooking({
      id: `BK-${Date.now()}`,
      customerName: form.fullName,
      email: form.email,
      packageName: form.packageType || packageName || 'General Inquiry',
      travelers: Number(form.adults) + Number(form.children),
      totalPrice: 0,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setForm({ fullName: '', phone: '', email: '', nationality: '', adults: '1', children: '0', packageType: packageName || '', departureDate: '', returnDate: '', roomType: 'double' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  const b = t.booking;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, backdropFilter: 'blur(4px)' }} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, pointerEvents: 'none' }}
          >
            <div style={{
              pointerEvents: 'all', width: '94%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto',
              background: 'linear-gradient(135deg, #001d3d, #001530)', borderRadius: 24, padding: '36px 32px',
              border: '1px solid rgba(184,150,12,0.2)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)', position: 'relative',
            }}>
              <button onClick={onClose} style={{
                position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.08)', border: 'none',
                color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>

              <div style={{ marginBottom: 28 }}>
                <span style={{ color: '#b8960c', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>{t.hero.badge}</span>
                <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '6px 0 4px' }}>
                  {submitted ? b.received : b.title}
                </h2>
                {packageName && !submitted && (
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: 0 }}>{packageName}</p>
                )}
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                  <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{b.thankYou}, {form.fullName}!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7 }}>{b.confirmMsg}</p>
                </motion.div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                    {[1, 2].map(s => (
                      <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: s <= step ? '#d00000' : 'rgba(255,255,255,0.12)', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginBottom: 20, marginTop: -18 }}>
                    {b.stepOf} {step} {b.of} 2 — {step === 1 ? b.personalInfo : b.tripDetails}
                  </p>

                  {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div>
                        <label style={labelStyle}>{b.fullName} *</label>
                        <input style={inputStyle} value={form.fullName} onChange={e => update('fullName', e.target.value)}
                          onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'} />
                      </div>
                      <div>
                        <label style={labelStyle}>{b.phoneNumber} *</label>
                        <input style={inputStyle} value={form.phone} onChange={e => update('phone', e.target.value)}
                          type="tel"
                          onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'} />
                      </div>
                      <div>
                        <label style={labelStyle}>{b.emailAddress} *</label>
                        <input style={inputStyle} value={form.email} onChange={e => update('email', e.target.value)}
                          type="email"
                          onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'} />
                      </div>
                      <div>
                        <label style={labelStyle}>{b.nationality} *</label>
                        <input style={inputStyle} value={form.nationality} onChange={e => update('nationality', e.target.value)}
                          onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'} />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div>
                        <label style={labelStyle}>{b.packageType}</label>
                        <div style={{
                          ...inputStyle, display: 'flex', alignItems: 'center', gap: 8,
                          background: 'rgba(184,150,12,0.1)', border: '1px solid rgba(184,150,12,0.35)',
                        }}>
                          <span style={{ color: '#b8960c', fontSize: 16 }}>✈️</span>
                          <span style={{ color: '#fff', fontWeight: 600 }}>{packageName || form.packageType}</span>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                          <label style={labelStyle}>{b.adults} *</label>
                          <select style={selectStyle} value={form.adults} onChange={e => update('adults', e.target.value)}>
                            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} style={{ background: '#001d3d' }}>{n} {n > 1 ? b.adults : b.adult}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>{b.children}</label>
                          <select style={selectStyle} value={form.children} onChange={e => update('children', e.target.value)}>
                            {[0,1,2,3,4,5].map(n => <option key={n} value={n} style={{ background: '#001d3d' }}>{n} {n !== 1 ? b.children : b.child}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>{b.roomType}</label>
                        <select style={selectStyle} value={form.roomType} onChange={e => update('roomType', e.target.value)}>
                          <option value="single" style={{ background: '#001d3d' }}>{b.singleRoom}</option>
                          <option value="double" style={{ background: '#001d3d' }}>{b.doubleRoom}</option>
                          <option value="triple" style={{ background: '#001d3d' }}>{b.tripleRoom}</option>
                          <option value="quad" style={{ background: '#001d3d' }}>{b.quadRoom}</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    {step > 1 && (
                      <button onClick={() => setStep(s => s - 1)} style={{
                        flex: 1, background: 'rgba(255,255,255,0.08)', color: '#fff',
                        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12,
                        padding: '14px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                      }}>{b.back}</button>
                    )}
                    {step < 2 ? (
                      <motion.button
                        onClick={() => setStep(s => s + 1)}
                        disabled={!form.fullName || !form.phone || !form.email}
                        style={{
                          flex: 1, background: '#d00000', color: '#fff', border: 'none',
                          borderRadius: 12, padding: '14px 0', fontSize: 14, fontWeight: 700,
                          cursor: 'pointer', boxShadow: '0 4px 20px rgba(208,0,0,0.4)', fontFamily: 'inherit',
                          opacity: (!form.fullName || !form.phone || !form.email) ? 0.5 : 1,
                        }}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >{b.continue}</motion.button>
                    ) : (
                      <motion.button onClick={handleSubmit} style={{
                        flex: 1, background: 'linear-gradient(135deg, #d00000, #a00000)',
                        color: '#fff', border: 'none', borderRadius: 12, padding: '14px 0',
                        fontSize: 14, fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(208,0,0,0.4)', fontFamily: 'inherit',
                      }}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >{b.confirmBooking}</motion.button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
