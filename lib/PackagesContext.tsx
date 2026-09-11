'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { packages as initialPackages, type Package } from './data';
import { supabase } from './supabase';

interface PackagesContextType {
  packages: Package[];
  addPackage: (pkg: Package) => void;
  updatePackage: (pkg: Package) => void;
  deletePackage: (id: string) => void;
}

const PackagesContext = createContext<PackagesContextType | null>(null);

export function PackagesProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(initialPackages);

  // Load from Supabase on mount — shared across all devices
  useEffect(() => {
    supabase
      .from('packages')
      .select('data')
      .order('created_at')
      .then(({ data, error }) => {
        if (error || !data) return;
        if (data.length === 0) {
          // Seed database with default packages on first run
          const rows = initialPackages.map(pkg => ({ id: pkg.id, data: pkg }));
          supabase.from('packages').insert(rows).then(() => {
            setPackages(initialPackages);
          });
        } else {
          setPackages(data.map((row: { data: Package }) => row.data));
        }
      });
  }, []);

  const addPackage = (pkg: Package) => {
    const updated = [...packages, pkg];
    setPackages(updated);
    supabase.from('packages').insert({ id: pkg.id, data: pkg });
  };

  const updatePackage = (pkg: Package) => {
    const updated = packages.map(p => p.id === pkg.id ? pkg : p);
    setPackages(updated);
    supabase.from('packages').update({ data: pkg }).eq('id', pkg.id);
  };

  const deletePackage = (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    supabase.from('packages').delete().eq('id', id);
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
