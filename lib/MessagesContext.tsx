'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

interface MessagesContextType {
  messages: ContactMessage[];
  addMessage: (name: string, phone: string, message: string) => Promise<void>;
  markRead: (id: string) => Promise<void>;
}

const MessagesContext = createContext<MessagesContextType | null>(null);
const LS_KEY = 'nst_messages';

function lsSave(m: ContactMessage[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(m)); } catch { }
}
function lsLoad(): ContactMessage[] {
  try {
    const s = localStorage.getItem(LS_KEY);
    if (s) { const p = JSON.parse(s); if (Array.isArray(p)) return p; }
  } catch { }
  return [];
}

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    supabase.from('contact_messages').select('data').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) { setMessages(lsLoad()); return; }
        if (data && data.length > 0) {
          const items = data.map((row: { data: ContactMessage }) => row.data);
          setMessages(items);
          lsSave(items);
        } else {
          setMessages(lsLoad());
        }
      });
  }, []);

  const addMessage = async (name: string, phone: string, message: string) => {
    const msg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name, phone, message,
      date: new Date().toISOString().slice(0, 10),
      read: false,
    };
    const updated = [msg, ...messages];
    setMessages(updated);
    lsSave(updated);
    const { error } = await supabase.from('contact_messages').insert({ id: msg.id, data: msg });
    if (error) console.error('Message save error:', error.message);
  };

  const markRead = async (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(updated);
    lsSave(updated);
    const msg = updated.find(m => m.id === id);
    if (msg) {
      const { error } = await supabase.from('contact_messages').update({ data: msg }).eq('id', id);
      if (error) console.error('Mark read error:', error.message);
    }
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage, markRead }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error('useMessages must be used inside MessagesProvider');
  return ctx;
}
