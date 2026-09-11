'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages as initialPackages, type Package, type Booking } from '@/lib/data';
import { useBookings } from '@/lib/BookingsContext';

type Tab = 'dashboard' | 'packages' | 'bookings';
type BookingStatus = Booking['status'];

const statusColor: Record<BookingStatus, { bg: string; text: string; dot: string }> = {
  pending:   { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
  confirmed: { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  rejected:  { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' },
  paid:      { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pkgs, setPkgs] = useState<Package[]>(initialPackages);
  const { bookings, updateBookingStatus: ctxUpdateStatus } = useBookings();
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [showPkgForm, setShowPkgForm] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [pkgForm, setPkgForm] = useState({
    nameEn: '', nameFr: '', nameAr: '', type: 'umrah' as 'umrah' | 'hajj',
    price: '', hotelMakkah: '', hotelMedina: '', hotelStars: 5, airline: '', durationNights: '',
    durationDays: '', departure: '', image: '',
  });

  const totalRevenue = bookings.filter(b => b.status === 'paid').reduce((s, b) => s + b.totalPrice, 0);
  const filteredBookings = statusFilter === 'all' ? bookings : bookings.filter(b => b.status === statusFilter);

  const updateBookingStatus = (id: string, status: BookingStatus) => ctxUpdateStatus(id, status);

  const deletePkg = (id: string) => setPkgs(ps => ps.filter(p => p.id !== id));

  const openEditForm = (pkg: Package) => {
    setEditingPkg(pkg);
    setPkgForm({
      nameEn: pkg.nameEn, nameFr: pkg.nameFr, nameAr: pkg.nameAr,
      type: pkg.type, price: String(pkg.price), hotelMakkah: pkg.hotelMakkah, hotelMedina: pkg.hotelMedina,
      hotelStars: pkg.hotelStars, airline: pkg.airline,
      durationNights: String(pkg.durationNights), durationDays: String(pkg.durationDays),
      departure: pkg.departure, image: pkg.image,
    });
    setShowPkgForm(true);
  };

  const savePkg = () => {
    const newPkg: Package = {
      id: editingPkg?.id || `pkg-${Date.now()}`,
      nameEn: pkgForm.nameEn, nameFr: pkgForm.nameFr, nameAr: pkgForm.nameAr,
      type: pkgForm.type, price: Number(pkgForm.price), currency: 'MAD',
      hotelMakkah: pkgForm.hotelMakkah, hotelMedina: pkgForm.hotelMedina, hotelStars: pkgForm.hotelStars, airline: pkgForm.airline,
      durationNights: Number(pkgForm.durationNights), durationDays: Number(pkgForm.durationDays),
      departure: pkgForm.departure, image: pkgForm.image, featured: true, includes: [],
    };
    if (editingPkg) setPkgs(ps => ps.map(p => p.id === editingPkg.id ? newPkg : p));
    else setPkgs(ps => [...ps, newPkg]);
    setShowPkgForm(false);
    setEditingPkg(null);
    setPkgForm({ nameEn: '', nameFr: '', nameAr: '', type: 'umrah', price: '', hotelMakkah: '', hotelMedina: '', hotelStars: 5, airline: '', durationNights: '', durationDays: '', departure: '', image: '' });
  };

  const navItems: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'packages', label: 'Packages', icon: '📦', count: pkgs.length },
    { id: 'bookings', label: 'Bookings', icon: '📋', count: bookings.filter(b => b.status === 'pending').length },
  ];

  const stats = [
    { label: 'Total Revenue', value: `${totalRevenue.toLocaleString()} MAD`, icon: '💰', color: '#d00000', bg: '#fff0f0', change: '+12%' },
    { label: 'Total Bookings', value: bookings.length, icon: '📋', color: '#3b82f6', bg: '#eff6ff', change: '+5%' },
    { label: 'Active Packages', value: pkgs.length, icon: '📦', color: '#b8960c', bg: '#fefce8', change: '0%' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: '⏳', color: '#f97316', bg: '#fff7ed', change: '' },
  ];

  const inputS: React.CSSProperties = {
    width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10,
    padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'Poppins, sans-serif',
    color: '#001d3d', background: '#fff', boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Poppins, sans-serif' }}>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          background: '#001d3d', color: '#fff', flexShrink: 0,
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 72 }}>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg, #d00000, #b8960c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700,
                }}>★</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>New Star</div>
                  <div style={{ fontSize: 11, color: '#b8960c', fontWeight: 500 }}>Admin Panel</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
            width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 12px', borderRadius: 12, border: 'none', cursor: 'pointer',
              textAlign: 'left', transition: 'all 0.2s', position: 'relative',
              background: tab === item.id ? '#d00000' : 'transparent',
              color: tab === item.id ? '#fff' : 'rgba(255,255,255,0.55)',
              fontFamily: 'Poppins, sans-serif',
            }}
              onMouseEnter={e => { if (tab !== item.id) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { if (tab !== item.id) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; } }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span style={{
                        background: tab === item.id ? 'rgba(255,255,255,0.25)' : '#d00000',
                        color: '#fff', borderRadius: 99, padding: '1px 7px', fontSize: 10, fontWeight: 700,
                      }}>{item.count}</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <a href="/" style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
            borderRadius: 12, textDecoration: 'none', color: 'rgba(255,255,255,0.45)',
            transition: 'all 0.2s', fontSize: 13,
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
          >
            <span style={{ fontSize: 18, flexShrink: 0 }}>🏠</span>
            <AnimatePresence>
              {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontFamily: 'Poppins, sans-serif' }}>View Site</motion.span>}
            </AnimatePresence>
          </a>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 28px' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#001d3d', margin: 0 }}>
                {tab === 'dashboard' ? 'Dashboard' : tab === 'packages' ? 'Packages' : 'Bookings'}
              </h1>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0' }}>New Star Travel · Admin Panel</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Live</span>
            </div>
          </div>

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 28 }}>
                {stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    style={{
                      background: '#fff', borderRadius: 18, padding: '22px 24px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    }}>
                    <div>
                      <p style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 8px' }}>{s.label}</p>
                      <p style={{ color: '#001d3d', fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1 }}>{s.value}</p>
                      {s.change && <p style={{ color: '#22c55e', fontSize: 11, fontWeight: 600, margin: '6px 0 0' }}>{s.change} this month</p>}
                    </div>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      {s.icon}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent bookings table */}
              <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#001d3d', margin: 0 }}>Recent Bookings</h2>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>Latest {Math.min(bookings.length, 5)} bookings</p>
                  </div>
                  <button onClick={() => setTab('bookings')} style={{
                    background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569',
                    borderRadius: 10, padding: '7px 14px', fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                  }}>View All →</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        {['Customer', 'Package', 'Travelers', 'Starting From', 'Status'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '12px 20px', color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((b, i) => (
                        <tr key={b.id} style={{ borderTop: '1px solid #f8fafc' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fafafa'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                        >
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ fontWeight: 600, color: '#001d3d', fontSize: 13 }}>{b.customerName}</div>
                            <div style={{ color: '#94a3b8', fontSize: 11 }}>{b.email}</div>
                          </td>
                          <td style={{ padding: '14px 20px', color: '#475569', fontSize: 12 }}>{b.packageName}</td>
                          <td style={{ padding: '14px 20px', color: '#475569' }}>{b.travelers}</td>
                          <td style={{ padding: '14px 20px', fontWeight: 700, color: '#001d3d' }}>{b.totalPrice.toLocaleString()} MAD</td>
                          <td style={{ padding: '14px 20px' }}>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              background: statusColor[b.status].bg, color: statusColor[b.status].text,
                              borderRadius: 99, padding: '4px 10px', fontSize: 11, fontWeight: 700,
                            }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[b.status].dot, display: 'inline-block' }} />
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PACKAGES ── */}
          {tab === 'packages' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>{pkgs.length} packages total</p>
                <button onClick={() => { setEditingPkg(null); setShowPkgForm(true); }} style={{
                  background: '#d00000', color: '#fff', border: 'none',
                  borderRadius: 12, padding: '11px 20px', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  boxShadow: '0 4px 16px rgba(208,0,0,0.3)', fontFamily: 'Poppins, sans-serif',
                }}>+ Add Package</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {pkgs.map((pkg, i) => (
                  <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
                    <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                      <img src={pkg.image} alt={pkg.nameEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }} />
                      <span style={{
                        position: 'absolute', top: 12, left: 12,
                        background: pkg.type === 'hajj' ? '#b8960c' : '#d00000',
                        color: '#fff', borderRadius: 99, padding: '4px 12px',
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                      }}>{pkg.type}</span>
                      <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                        <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>{pkg.nameEn}</p>
                      </div>
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Starting From</div>
                        <span style={{ color: '#d00000', fontWeight: 800, fontSize: 20 }}>{pkg.price.toLocaleString()} MAD</span>
                        <span style={{ color: '#94a3b8', fontSize: 12 }}>{pkg.durationNights} nights</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                        {[
                          { label: '🕋 Makkah', value: pkg.hotelMakkah },
                          { label: '🕌 Medina', value: pkg.hotelMedina },
                          { label: 'Airline', value: pkg.airline },
                          { label: 'Departure', value: pkg.departure },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 10px' }}>
                            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
                            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2, color: label === 'Stars' ? '#b8960c' : '#001d3d' }}>{value}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => openEditForm(pkg)} style={{
                          flex: 1, border: '1.5px solid #e2e8f0', background: '#fff', color: '#475569',
                          borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600,
                          cursor: 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#001d3d'; (e.currentTarget as HTMLElement).style.color = '#001d3d'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.color = '#475569'; }}
                        >✏️ Edit</button>
                        <button onClick={() => deletePkg(pkg.id)} style={{
                          flex: 1, border: '1.5px solid #fee2e2', background: '#fff', color: '#ef4444',
                          borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600,
                          cursor: 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fef2f2'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
                        >🗑️ Delete</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Package Form Modal */}
              <AnimatePresence>
                {showPkgForm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowPkgForm(false)} />
                    <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                      style={{
                        position: 'relative', background: '#fff', borderRadius: 24, padding: '32px 28px',
                        width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto',
                        boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
                      }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#001d3d', margin: '0 0 6px' }}>{editingPkg ? '✏️ Edit Package' : '+ New Package'}</h3>
                      <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 24px' }}>Fill in the package details below</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {[
                          { key: 'nameEn', label: 'Package Name (EN)', span: false },
                          { key: 'nameFr', label: 'Package Name (FR)', span: false },
                          { key: 'nameAr', label: 'Package Name (AR)', span: true },
                          { key: 'price', label: 'Starting From (MAD)', span: false },
                          { key: 'airline', label: 'Airline', span: false },
                          { key: 'hotelMakkah', label: '🕋 Makkah Hotel', span: false },
                          { key: 'hotelMedina', label: '🕌 Medina Hotel', span: false },
                          { key: 'durationNights', label: 'Nights', span: false },
                          { key: 'durationDays', label: 'Days', span: false },
                          { key: 'departure', label: 'Departure Date', span: false },
                          { key: 'image', label: 'Image URL', span: true },
                        ].map(({ key, label, span }) => (
                          <div key={key} style={{ gridColumn: span ? '1 / -1' : undefined }}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>{label}</label>
                            <input
                              type={['price', 'durationNights', 'durationDays'].includes(key) ? 'number' : key === 'departure' ? 'date' : 'text'}
                              value={pkgForm[key as keyof typeof pkgForm] as string}
                              onChange={e => setPkgForm({ ...pkgForm, [key]: e.target.value })}
                              style={inputS}
                              onFocus={e => e.currentTarget.style.borderColor = '#d00000'}
                              onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                            />
                          </div>
                        ))}
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Type</label>
                          <select value={pkgForm.type} onChange={e => setPkgForm({ ...pkgForm, type: e.target.value as any })} style={inputS}>
                            <option value="umrah">Umrah</option>
                            <option value="hajj">Hajj</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Hotel Stars</label>
                          <select value={pkgForm.hotelStars} onChange={e => setPkgForm({ ...pkgForm, hotelStars: Number(e.target.value) })} style={inputS}>
                            {[3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                        <button onClick={() => setShowPkgForm(false)} style={{
                          flex: 1, border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b',
                          borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 600,
                          cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                        }}>Cancel</button>
                        <button onClick={savePkg} style={{
                          flex: 1, background: '#d00000', color: '#fff', border: 'none',
                          borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 700,
                          cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                          boxShadow: '0 4px 16px rgba(208,0,0,0.3)',
                        }}>{editingPkg ? 'Save Changes' : 'Add Package'}</button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── BOOKINGS ── */}
          {tab === 'bookings' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

              {/* Status filter pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {(['all', 'pending', 'confirmed', 'paid', 'rejected'] as const).map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)} style={{
                    padding: '8px 18px', borderRadius: 99, fontSize: 12, fontWeight: 700,
                    border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                    textTransform: 'capitalize', transition: 'all 0.2s',
                    background: statusFilter === s ? '#d00000' : '#fff',
                    color: statusFilter === s ? '#fff' : '#64748b',
                    boxShadow: statusFilter === s ? '0 4px 14px rgba(208,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.07)',
                  }}>
                    {s === 'all' ? `All (${bookings.length})` : `${s} (${bookings.filter(b => b.status === s).length})`}
                  </button>
                ))}
              </div>

              {/* Bookings list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredBookings.map((b, i) => (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    style={{
                      background: '#fff', borderRadius: 18, padding: '20px 24px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 16, alignItems: 'center',
                    }}>
                    {/* Customer */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                        background: 'linear-gradient(135deg, #001d3d, #003870)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 16,
                      }}>{b.customerName[0]}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#001d3d', fontSize: 14 }}>{b.customerName}</div>
                        <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>{b.email}</div>
                        {b.phone && <div style={{ color: '#64748b', fontSize: 11 }}>{b.phone}</div>}
                      </div>
                    </div>

                    {/* Package + Date */}
                    <div>
                      <div style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>{b.packageName}</div>
                      <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>📅 {b.date} · 👥 {b.travelers} travelers</div>
                    </div>

                    {/* Price + Status */}
                    <div>
                      <div style={{ fontWeight: 800, color: '#001d3d', fontSize: 16 }}>{b.totalPrice.toLocaleString()} MAD</div>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 4,
                        background: statusColor[b.status].bg, color: statusColor[b.status].text,
                        borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[b.status].dot, display: 'inline-block' }} />
                        {b.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {b.status === 'pending' && (
                        <>
                          <button onClick={() => updateBookingStatus(b.id, 'confirmed')} style={{
                            background: '#f0fdf4', color: '#15803d', border: '1.5px solid #bbf7d0',
                            borderRadius: 8, padding: '7px 14px', fontSize: 11, fontWeight: 700,
                            cursor: 'pointer', fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap',
                          }}>✓ Confirm</button>
                          <button onClick={() => updateBookingStatus(b.id, 'rejected')} style={{
                            background: '#fef2f2', color: '#b91c1c', border: '1.5px solid #fecaca',
                            borderRadius: 8, padding: '7px 14px', fontSize: 11, fontWeight: 700,
                            cursor: 'pointer', fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap',
                          }}>✕ Reject</button>
                        </>
                      )}
                      {b.status === 'confirmed' && (
                        <button onClick={() => updateBookingStatus(b.id, 'paid')} style={{
                          background: '#eff6ff', color: '#1d4ed8', border: '1.5px solid #bfdbfe',
                          borderRadius: 8, padding: '7px 14px', fontSize: 11, fontWeight: 700,
                          cursor: 'pointer', fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap',
                        }}>💳 Mark Paid</button>
                      )}
                      {(b.status === 'paid' || b.status === 'rejected') && (
                        <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 500 }}>No actions</span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {filteredBookings.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                    <p style={{ fontSize: 15, fontWeight: 600 }}>No bookings found</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
