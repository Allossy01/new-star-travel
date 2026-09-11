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
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nst_packages');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPackages(parsed.length > 0 ? parsed : initialPackages);
      } else {
        setPackages(initialPackages);
      }
    } catch {
      setPackages(initialPackages);
    }
  }, []);

  const save = (updated: Package[]) => {
    setPackages(updated);
    localStorage.setItem('nst_packages', JSON.stringify(updated));
  };

  const addPackage = (pkg: Package) => save([...packages, pkg]);
  const updatePackage = (pkg: Package) => save(packages.map(p => p.id === pkg.id ? pkg : p));
  const deletePackage = (id: string) => save(packages.filter(p => p.id !== id));

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
