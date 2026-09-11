'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages as initialPackages, sampleBookings, type Package, type Booking } from '@/lib/data';

type Tab = 'dashboard' | 'packages' | 'bookings';
type BookingStatus = Booking['status'];

const statusColor: Record<BookingStatus, string> = {
  pending: '#f59e0b',
  confirmed: '#10b981',
  rejected: '#ef4444',
  paid: '#3b82f6',
};

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-[#001d3d]">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: color + '20' }}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pkgs, setPkgs] = useState<Package[]>(initialPackages);
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [showPkgForm, setShowPkgForm] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [pkgForm, setPkgForm] = useState({
    nameEn: '', nameFr: '', nameAr: '', type: 'umrah' as 'umrah' | 'hajj',
    price: '', hotel: '', hotelStars: 5, airline: '', durationNights: '',
    durationDays: '', departure: '', image: '',
  });

  const totalRevenue = bookings.filter(b => b.status === 'paid').reduce((s, b) => s + b.totalPrice, 0);

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));
  };

  const deletePkg = (id: string) => setPkgs(ps => ps.filter(p => p.id !== id));

  const openEditForm = (pkg: Package) => {
    setEditingPkg(pkg);
    setPkgForm({
      nameEn: pkg.nameEn, nameFr: pkg.nameFr, nameAr: pkg.nameAr,
      type: pkg.type, price: String(pkg.price), hotel: pkg.hotel,
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
      hotel: pkgForm.hotel, hotelStars: pkgForm.hotelStars, airline: pkgForm.airline,
      durationNights: Number(pkgForm.durationNights), durationDays: Number(pkgForm.durationDays),
      departure: pkgForm.departure, image: pkgForm.image, featured: true, includes: [],
    };
    if (editingPkg) {
      setPkgs(ps => ps.map(p => p.id === editingPkg.id ? newPkg : p));
    } else {
      setPkgs(ps => [...ps, newPkg]);
    }
    setShowPkgForm(false);
    setEditingPkg(null);
    setPkgForm({ nameEn: '', nameFr: '', nameAr: '', type: 'umrah', price: '', hotel: '', hotelStars: 5, airline: '', durationNights: '', durationDays: '', departure: '', image: '' });
  };

  const filteredBookings = statusFilter === 'all' ? bookings : bookings.filter(b => b.status === statusFilter);

  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'packages', label: 'Packages', icon: '📦' },
    { id: 'bookings', label: 'Bookings', icon: '📋' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-[Poppins,sans-serif]">
      {/* Sidebar */}
      <motion.aside
        className="bg-[#001d3d] text-white flex-shrink-0 overflow-hidden"
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d00000] to-[#b8960c] flex items-center justify-center text-sm font-bold">★</div>
                <div>
                  <div className="text-xs font-bold leading-none">New Star</div>
                  <div className="text-[#b8960c] text-xs">Admin</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/50 hover:text-white p-1">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="p-3 space-y-1 mt-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                tab === item.id
                  ? 'bg-[#d00000] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <a href="/" className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/10 transition-all`}>
            <span className="text-lg flex-shrink-0">🏠</span>
            <AnimatePresence>{sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>View Site</motion.span>}</AnimatePresence>
          </a>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 sm:p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#001d3d] capitalize">{tab === 'dashboard' ? 'Dashboard' : tab === 'packages' ? 'Packages Management' : 'Bookings Management'}</h1>
            <p className="text-gray-400 text-sm mt-1">New Star Travel Admin Panel</p>
          </div>

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                <StatCard label="Total Revenue" value={`${totalRevenue.toLocaleString()} MAD`} icon="💰" color="#d00000" />
                <StatCard label="Total Bookings" value={bookings.length} icon="📋" color="#3b82f6" />
                <StatCard label="Active Packages" value={pkgs.length} icon="📦" color="#b8960c" />
                <StatCard label="Total Customers" value={bookings.length} icon="👥" color="#10b981" />
              </div>

              {/* Recent bookings */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-[#001d3d]">Recent Bookings</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {['ID', 'Customer', 'Package', 'Travelers', 'Total', 'Status'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-gray-400">{b.id}</td>
                          <td className="px-4 py-3 font-medium text-[#001d3d]">{b.customerName}</td>
                          <td className="px-4 py-3 text-gray-600">{b.packageName}</td>
                          <td className="px-4 py-3 text-gray-600">{b.travelers}</td>
                          <td className="px-4 py-3 font-semibold text-[#001d3d]">{b.totalPrice.toLocaleString()} MAD</td>
                          <td className="px-4 py-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize text-white" style={{ backgroundColor: statusColor[b.status] }}>
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

          {/* Packages */}
          {tab === 'packages' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500 text-sm">{pkgs.length} packages</p>
                <button
                  onClick={() => { setEditingPkg(null); setShowPkgForm(true); }}
                  className="bg-[#d00000] text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#b00000] transition-colors"
                >
                  + Add Package
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {pkgs.map(pkg => (
                  <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-36 relative">
                      <img src={pkg.image} alt={pkg.nameEn} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold text-white uppercase ${pkg.type === 'hajj' ? 'bg-[#b8960c]' : 'bg-[#d00000]'}`}>
                        {pkg.type}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#001d3d] text-sm mb-2">{pkg.nameEn}</h3>
                      <div className="text-[#d00000] font-bold text-lg mb-3">{pkg.price.toLocaleString()} MAD</div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditForm(pkg)}
                          className="flex-1 border border-gray-200 text-gray-600 hover:border-[#d00000] hover:text-[#d00000] rounded-lg py-2 text-xs font-medium transition-colors">
                          Edit
                        </button>
                        <button onClick={() => deletePkg(pkg.id)}
                          className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg py-2 text-xs font-medium transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Package Form Modal */}
              <AnimatePresence>
                {showPkgForm && (
                  <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPkgForm(false)} />
                    <motion.div
                      className="relative bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                    >
                      <h3 className="font-bold text-[#001d3d] text-lg mb-5">{editingPkg ? 'Edit Package' : 'Add New Package'}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { key: 'nameEn', label: 'Name (EN)' },
                          { key: 'nameFr', label: 'Name (FR)' },
                          { key: 'nameAr', label: 'Name (AR)' },
                          { key: 'price', label: 'Price (USD)' },
                          { key: 'hotel', label: 'Hotel Name' },
                          { key: 'airline', label: 'Airline' },
                          { key: 'durationNights', label: 'Nights' },
                          { key: 'durationDays', label: 'Days' },
                          { key: 'departure', label: 'Departure Date' },
                          { key: 'image', label: 'Image URL' },
                        ].map(({ key, label }) => (
                          <div key={key} className={key === 'image' ? 'sm:col-span-2' : ''}>
                            <label className="text-gray-500 text-xs mb-1 block">{label}</label>
                            <input
                              type={['price', 'durationNights', 'durationDays'].includes(key) ? 'number' : key === 'departure' ? 'date' : 'text'}
                              value={pkgForm[key as keyof typeof pkgForm] as string}
                              onChange={e => setPkgForm({ ...pkgForm, [key]: e.target.value })}
                              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#d00000] transition-colors"
                            />
                          </div>
                        ))}
                        <div>
                          <label className="text-gray-500 text-xs mb-1 block">Type</label>
                          <select value={pkgForm.type} onChange={e => setPkgForm({ ...pkgForm, type: e.target.value as any })}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#d00000]">
                            <option value="umrah">Umrah</option>
                            <option value="hajj">Hajj</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-500 text-xs mb-1 block">Hotel Stars</label>
                          <select value={pkgForm.hotelStars} onChange={e => setPkgForm({ ...pkgForm, hotelStars: Number(e.target.value) })}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#d00000]">
                            {[3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button onClick={() => setShowPkgForm(false)}
                          className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                        <button onClick={savePkg}
                          className="flex-1 bg-[#d00000] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#b00000] transition-colors">
                          {editingPkg ? 'Save Changes' : 'Add Package'}
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Bookings */}
          {tab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Status filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['all', 'pending', 'confirmed', 'paid', 'rejected'] as const).map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                      statusFilter === s ? 'bg-[#d00000] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#d00000] hover:text-[#d00000]'
                    }`}>
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[700px]">
                    <thead className="bg-gray-50">
                      <tr>
                        {['ID', 'Customer', 'Package', 'Travelers', 'Total', 'Date', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredBookings.map(b => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-gray-400">{b.id}</td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-[#001d3d]">{b.customerName}</div>
                            <div className="text-gray-400 text-xs">{b.email}</div>
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{b.packageName}</td>
                          <td className="px-4 py-3 text-gray-600">{b.travelers}</td>
                          <td className="px-4 py-3 font-semibold text-[#001d3d]">{b.totalPrice.toLocaleString()} MAD</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{b.date}</td>
                          <td className="px-4 py-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize text-white" style={{ backgroundColor: statusColor[b.status] }}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1.5">
                              {b.status === 'pending' && (
                                <>
                                  <button onClick={() => updateBookingStatus(b.id, 'confirmed')}
                                    className="px-2.5 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors">
                                    Confirm
                                  </button>
                                  <button onClick={() => updateBookingStatus(b.id, 'rejected')}
                                    className="px-2.5 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors">
                                    Reject
                                  </button>
                                </>
                              )}
                              {b.status === 'confirmed' && (
                                <button onClick={() => updateBookingStatus(b.id, 'paid')}
                                  className="px-2.5 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors">
                                  Mark Paid
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}



