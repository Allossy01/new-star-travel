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
    departureDate: '', returnDate: '', roomType: 'double', specialRequests: '',
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)',
    color: '#fff', borderRadius: 10, padding: '12px 14px', fontSize: 14,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };
  const labelStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 6,
  };
  const selectStyle: React.CSSProperties = {
    ...inputStyle, cursor: 'pointer',
    appearance: 'none' as any,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23ffffff88' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    paddingRight: 36,
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setForm({ fullName: '', phone: '', email: '', nationality: '', adults: '1', children: '0', packageType: packageName || '', departureDate: '', returnDate: '', roomType: 'double', specialRequests: '' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
              zIndex: 1000, backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1001, pointerEvents: 'none',
            }}
          >
            <div style={{
              pointerEvents: 'all', width: '94%', maxWidth: 560,
              maxHeight: '90vh', overflowY: 'auto',
              background: 'linear-gradient(135deg, #001d3d, #001530)',
              borderRadius: 24, padding: '36px 32px',
              border: '1px solid rgba(184,150,12,0.2)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              position: 'relative',
            }}>
            {/* Close */}
            <button onClick={onClose} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.08)', border: 'none',
              color: '#fff', width: 36, height: 36, borderRadius: '50%',
              cursor: 'pointer', fontSize: 18, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>×</button>

            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <span style={{ color: '#b8960c', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>New Star Travel</span>
              <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '6px 0 4px' }}>
                {submitted ? '🎉 Booking Received!' : 'Book Your Journey'}
              </h2>
              {packageName && !submitted && (
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: 0 }}>{packageName}</p>
              )}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Thank you, {form.fullName}!</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7 }}>
                  Your booking request has been received. Our team will contact you at <strong style={{ color: '#b8960c' }}>{form.phone}</strong> within 24 hours.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Step indicator */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                  {[1, 2].map(s => (
                    <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: s <= step ? '#d00000' : 'rgba(255,255,255,0.12)', transition: 'background 0.3s' }} />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginBottom: 20, marginTop: -18 }}>
                  Step {step} of 2 — {step === 1 ? 'Personal Info' : 'Trip Details'}
                </p>

                {/* Step 1 — Personal Info */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input style={inputStyle} value={form.fullName} onChange={e => update('fullName', e.target.value)}
                        placeholder="Ahmed El Mansouri"
                        onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number *</label>
                      <input style={inputStyle} value={form.phone} onChange={e => update('phone', e.target.value)}
                        placeholder="+212 6XX XXX XXX" type="tel"
                        onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input style={inputStyle} value={form.email} onChange={e => update('email', e.target.value)}
                        placeholder="ahmed@example.com" type="email"
                        onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Nationality *</label>
                      <input style={inputStyle} value={form.nationality} onChange={e => update('nationality', e.target.value)}
                        placeholder="Moroccan"
                        onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 — Trip Details */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Package Type *</label>
                      <select style={selectStyle} value={form.packageType} onChange={e => update('packageType', e.target.value)}>
                        <option value="" style={{ background: '#001d3d' }}>Select a package</option>
                        <option value="Umrah Economy" style={{ background: '#001d3d' }}>Umrah Economy</option>
                        <option value="Umrah Premium" style={{ background: '#001d3d' }}>Umrah Premium</option>
                        <option value="Hajj Package" style={{ background: '#001d3d' }}>Hajj Package</option>
                      </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={labelStyle}>Adults *</label>
                        <select style={selectStyle} value={form.adults} onChange={e => update('adults', e.target.value)}>
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} style={{ background: '#001d3d' }}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Children</label>
                        <select style={selectStyle} value={form.children} onChange={e => update('children', e.target.value)}>
                          {[0,1,2,3,4,5].map(n => <option key={n} value={n} style={{ background: '#001d3d' }}>{n} Child{n !== 1 ? 'ren' : ''}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={labelStyle}>Departure Date *</label>
                        <input style={inputStyle} type="date" value={form.departureDate} onChange={e => update('departureDate', e.target.value)}
                          onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Return Date</label>
                        <input style={inputStyle} type="date" value={form.returnDate} onChange={e => update('returnDate', e.target.value)}
                          onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Room Type</label>
                      <select style={selectStyle} value={form.roomType} onChange={e => update('roomType', e.target.value)}>
                        <option value="single" style={{ background: '#001d3d' }}>Single Room</option>
                        <option value="double" style={{ background: '#001d3d' }}>Double Room</option>
                        <option value="triple" style={{ background: '#001d3d' }}>Triple Room</option>
                        <option value="quad" style={{ background: '#001d3d' }}>Quad Room</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                  {step > 1 && (
                    <button onClick={() => setStep(s => s - 1)} style={{
                      flex: 1, background: 'rgba(255,255,255,0.08)', color: '#fff',
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12,
                      padding: '14px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    }}>← Back</button>
                  )}
                  {step < 2 ? (
                    <motion.button
                      onClick={() => setStep(s => s + 1)}
                      disabled={!form.fullName || !form.phone || !form.email}
                      style={{
                        flex: 1, background: '#d00000', color: '#fff', border: 'none',
                        borderRadius: 12, padding: '14px 0', fontSize: 14, fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 4px 20px rgba(208,0,0,0.4)',
                        opacity: (!form.fullName || !form.phone || !form.email) ? 0.5 : 1,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue →
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      style={{
                        flex: 1, background: 'linear-gradient(135deg, #d00000, #a00000)',
                        color: '#fff', border: 'none', borderRadius: 12,
                        padding: '14px 0', fontSize: 14, fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 4px 20px rgba(208,0,0,0.4)',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ✓ Confirm Booking
                    </motion.button>
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
