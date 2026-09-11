'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { packages as initialPackages, type Package } from './data';

interface PackagesContextType {
  packages: Package[];
  addPackage: (pkg: Package) => void;
  updatePackage: (pkg: Package) => void;
  deletePackage: (id: string) => void;
}

const PackagesContext = createContext<PackagesContextType | null>(null);

export function PackagesProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(initialPackages);

  // Load from server API on mount (works across all devices)
  useEffect(() => {
    fetch('/api/packages')
      .then(r => r.json())
      .then((data: Package[]) => {
        if (Array.isArray(data) && data.length > 0) setPackages(data);
      })
      .catch(() => {
        // fallback: try localStorage
        try {
          const stored = localStorage.getItem('nst_packages');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.length > 0) setPackages(parsed);
          }
        } catch { /* keep initialPackages */ }
      });
  }, []);

  const addPackage = (pkg: Package) => {
    const updated = [...packages, pkg];
    setPackages(updated);
    fetch('/api/packages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pkg) }).catch(() => {});
    try { localStorage.setItem('nst_packages', JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const updatePackage = (pkg: Package) => {
    const updated = packages.map(p => p.id === pkg.id ? pkg : p);
    setPackages(updated);
    fetch('/api/packages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pkg) }).catch(() => {});
    try { localStorage.setItem('nst_packages', JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const deletePackage = (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    fetch('/api/packages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }).catch(() => {});
    try { localStorage.setItem('nst_packages', JSON.stringify(updated)); } catch { /* ignore */ }
  };

  return (
    <PackagesContext.Provider value={{ packages, addPackage, updatePackage, deletePackage }}>
      {children}
    </PackagesContext.Provider>
  );
}

export function usePackages() {
  const ctx = useContext(PackagesContext);
  if (!ctx) throw new Error('usePackages must be used inside PackagesProvider');
  return ctx;
}
