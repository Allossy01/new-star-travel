'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
    color: '#fff', borderRadius: 12, padding: '13px 16px', fontSize: 14,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.55)', fontSize: 12, display: 'block', marginBottom: 6,
  };

  return (
    <section id="contact" style={{ padding: '96px 0', background: '#001d3d', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, background: 'radial-gradient(circle at 20% 50%, #d00000, transparent 50%), radial-gradient(circle at 80% 50%, #b8960c, transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: '#b8960c', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 8 }}>Get In Touch</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>{t.contact.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', margin: 0 }}>{t.contact.subtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {[
              { field: 'name', label: t.contact.name, type: 'text' },
              { field: 'email', label: t.contact.email, type: 'email' },
              { field: 'phone', label: t.contact.phone, type: 'tel' },
            ].map(({ field, label, type }) => (
              <div key={field}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={type}
                  value={form[field as keyof typeof form]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  required
                  placeholder={label}
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
                />
              </div>
            ))}
            <div>
              <label style={labelStyle}>{t.contact.message}</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                placeholder={t.contact.message}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.currentTarget.style.borderColor = '#b8960c'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
              />
            </div>
            <motion.button
              type="submit"
              style={{
                background: sent ? '#27ae60' : '#d00000', color: '#fff', border: 'none',
                borderRadius: 12, padding: '15px 0', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 4px 24px rgba(208,0,0,0.35)',
                transition: 'background 0.3s', fontFamily: 'inherit',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sent ? '✓ Message Sent!' : t.contact.send}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Contact info cards */}
            {[
              { icon: '📍', label: 'Address', value: t.contact.address },
              { icon: '📞', label: 'Phone', value: t.contact.phone2 },
              { icon: '📧', label: 'Email', value: t.contact.email2 },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px',
                background: 'rgba(255,255,255,0.04)', borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(208,0,0,0.2)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{icon}</div>
                <div>
                  <div style={{ color: '#b8960c', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: 14 }}>{value}</div>
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/212781350699"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '16px 0', borderRadius: 14, fontWeight: 700, color: '#fff',
                background: 'linear-gradient(135deg, #25d366, #1aaf54)',
                textDecoration: 'none', fontSize: 15,
                boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
            >
              <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: '#fff' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.contact.whatsapp}
            </a>

            {/* Social */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { name: 'Instagram', color: '#E1306C', icon: '📷' },
                { name: 'Facebook', color: '#1877F2', icon: '👤' },
              ].map(({ name, color, icon }) => (
                <a key={name} href="#" style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 8, padding: '13px 0', borderRadius: 12, color: '#fff',
                  textDecoration: 'none', fontSize: 14, fontWeight: 600,
                  background: color + '22', border: `1px solid ${color}44`,
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                >
                  <span>{icon}</span> {name}
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              borderRadius: 16, height: 160, overflow: 'hidden',
              background: 'linear-gradient(135deg, #001a38, #001d3d)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 32, marginBottom: 8 }}>📍</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Algiers, Algeria</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

