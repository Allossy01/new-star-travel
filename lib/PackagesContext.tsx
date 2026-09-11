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

const STORAGE_KEY = 'nst_packages';

export function PackagesProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Package[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPackages(parsed);
        }
      }
    } catch { /* keep initialPackages */ }
    setLoaded(true);
  }, []);

  const save = (updated: Package[]) => {
    setPackages(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const addPackage = (pkg: Package) => save([...packages, pkg]);
  const updatePackage = (pkg: Package) => save(packages.map(p => p.id === pkg.id ? pkg : p));
  const deletePackage = (id: string) => save(packages.filter(p => p.id !== id));

  return (
    <PackagesContext.Provider value={{ packages, addPackage, updatePackage, deletePackage }}>
      {loaded ? children : children}
    </PackagesContext.Provider>
  );
}

export function usePackages() {
  const ctx = useContext(PackagesContext);
  if (!ctx) throw new Error('usePackages must be used inside PackagesProvider');
  return ctx;
}
