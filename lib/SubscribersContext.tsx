'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

interface SubscribersContextType {
  subscribers: Subscriber[];
  addSubscriber: (email: string) => Promise<void>;
}

const SubscribersContext = createContext<SubscribersContextType | null>(null);
const LS_KEY = 'nst_subscribers';

function lsSave(s: Subscriber[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch { }
}
function lsLoad(): Subscriber[] {
  try {
    const s = localStorage.getItem(LS_KEY);
    if (s) { const p = JSON.parse(s); if (Array.isArray(p)) return p; }
  } catch { }
  return [];
}

export function SubscribersProvider({ children }: { children: ReactNode }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    supabase.from('subscribers').select('data').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setSubscribers(lsLoad());
          return;
        }
        if (data && data.length > 0) {
          const items = data.map((row: { data: Subscriber }) => row.data);
          setSubscribers(items);
          lsSave(items);
        } else {
          setSubscribers(lsLoad());
        }
      });
  }, []);

  const addSubscriber = async (email: string) => {
    const already = subscribers.find(s => s.email === email);
    if (already) return;
    const sub: Subscriber = { id: `sub-${Date.now()}`, email, date: new Date().toISOString().slice(0, 10) };
    const updated = [sub, ...subscribers];
    setSubscribers(updated);
    lsSave(updated);
    const { error } = await supabase.from('subscribers').insert({ id: sub.id, data: sub });
    if (error) console.error('Subscriber save error:', error.message);
  };

  return (
    <SubscribersContext.Provider value={{ subscribers, addSubscriber }}>
      {children}
    </SubscribersContext.Provider>
  );
}

export function useSubscribers() {
  const ctx = useContext(SubscribersContext);
  if (!ctx) throw new Error('useSubscribers must be used inside SubscribersProvider');
  return ctx;
}
