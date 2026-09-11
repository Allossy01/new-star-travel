'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { packages as initialPackages, type Package } from './data';
import { supabase } from './supabase';

interface PackagesContextType {
  packages: Package[];
  addPackage: (pkg: Package) => Promise<void>;
  updatePackage: (pkg: Package) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
}

const PackagesContext = createContext<PackagesContextType | null>(null);
const LS_KEY = 'nst_packages';

function lsSave(pkgs: Package[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(pkgs)); } catch { }
}
function lsLoad(): Package[] | null {
  try {
    const s = localStorage.getItem(LS_KEY);
    if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p; }
  } catch { }
  return null;
}

export function PackagesProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(initialPackages);

  useEffect(() => {
    supabase.from('packages').select('data').order('created_at')
      .then(({ data, error }) => {
        if (error) {
          console.error('Supabase fetch error:', error.message);
          const ls = lsLoad();
          if (ls) setPackages(ls);
          return;
        }
        if (!data || data.length === 0) {
          // Seed with defaults
          const rows = initialPackages.map(pkg => ({ id: pkg.id, data: pkg }));
          supabase.from('packages').insert(rows).then(({ error: e }) => {
            if (e) console.error('Seed error:', e.message);
          });
          setPackages(initialPackages);
          lsSave(initialPackages);
        } else {
          const pkgs = data.map((row: { data: Package }) => row.data);
          setPackages(pkgs);
          lsSave(pkgs);
        }
      });
  }, []);

  const addPackage = async (pkg: Package) => {
    const updated = [...packages, pkg];
    setPackages(updated);
    lsSave(updated);
    const { error } = await supabase.from('packages').insert({ id: pkg.id, data: pkg });
    if (error) console.error('Add error:', error.message);
  };

  const updatePackage = async (pkg: Package) => {
    const updated = packages.map(p => p.id === pkg.id ? pkg : p);
    setPackages(updated);
    lsSave(updated);
    const { error } = await supabase.from('packages').update({ data: pkg }).eq('id', pkg.id);
    if (error) console.error('Update error:', error.message);
  };

  const deletePackage = async (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    lsSave(updated);
    const { error } = await supabase.from('packages').delete().eq('id', id);
    if (error) console.error('Delete error:', error.message);
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
