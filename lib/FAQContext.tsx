'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';

export interface FAQItem {
  id: string;
  questionEn: string;
  questionFr: string;
  questionAr: string;
  answerEn: string;
  answerFr: string;
  answerAr: string;
  order: number;
}

interface FAQContextType {
  faqs: FAQItem[];
  addFAQ: (faq: FAQItem) => Promise<void>;
  updateFAQ: (faq: FAQItem) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;
}

const FAQContext = createContext<FAQContextType | null>(null);
const LS_KEY = 'nst_faqs';

const defaultFAQs: FAQItem[] = [
  {
    id: 'faq-1', order: 1,
    questionEn: 'How do I apply for an Umrah visa?',
    questionFr: 'Comment faire une demande de visa Omra ?',
    questionAr: 'كيف أتقدم بطلب تأشيرة العمرة؟',
    answerEn: 'We handle the entire visa process for you. Simply provide your passport and photos, and our team will submit and track your application.',
    answerFr: 'Nous gérons tout le processus de visa pour vous. Fournissez simplement votre passeport et vos photos.',
    answerAr: 'نحن نتولى عملية التأشيرة بالكامل نيابةً عنك. فقط قدم جواز سفرك والصور.',
  },
  {
    id: 'faq-2', order: 2,
    questionEn: 'Are flights included in the packages?',
    questionFr: 'Les vols sont-ils inclus dans les forfaits ?',
    questionAr: 'هل الرحلات الجوية مشمولة في الباقات؟',
    answerEn: 'Yes, most of our packages include round-trip flights. You can also book a land-only package if you prefer.',
    answerFr: 'Oui, la plupart de nos forfaits incluent des vols aller-retour.',
    answerAr: 'نعم، معظم باقاتنا تشمل رحلات جوية ذهاباً وإياباً.',
  },
  {
    id: 'faq-3', order: 3,
    questionEn: 'How far in advance should I book?',
    questionFr: 'Combien de temps à l\'avance dois-je réserver ?',
    questionAr: 'كم مبكراً يجب أن أحجز؟',
    answerEn: 'We recommend booking at least 2-3 months in advance for Umrah and 6-12 months for Hajj.',
    answerFr: 'Nous recommandons de réserver au moins 2-3 mois à l\'avance pour l\'Omra et 6-12 mois pour le Hajj.',
    answerAr: 'نوصي بالحجز قبل 2-3 أشهر على الأقل للعمرة و6-12 شهراً للحج.',
  },
  {
    id: 'faq-4', order: 4,
    questionEn: 'Do you offer installment payment plans?',
    questionFr: 'Proposez-vous des plans de paiement échelonné ?',
    questionAr: 'هل تقدمون خطط تقسيط؟',
    answerEn: 'Yes! We offer flexible installment plans with 0% interest for up to 6 months.',
    answerFr: 'Oui ! Nous offrons des plans d\'acompte flexibles sans intérêt jusqu\'à 6 mois.',
    answerAr: 'نعم! نقدم خطط تقسيط مرنة بدون فوائد لمدة تصل إلى 6 أشهر.',
  },
];

function lsSave(faqs: FAQItem[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(faqs)); } catch { }
}
function lsLoad(): FAQItem[] | null {
  try {
    const s = localStorage.getItem(LS_KEY);
    if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p; }
  } catch { }
  return null;
}

export function FAQProvider({ children }: { children: ReactNode }) {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFAQs);

  useEffect(() => {
    supabase.from('faqs').select('data').order('created_at')
      .then(({ data, error }) => {
        if (error) {
          const ls = lsLoad();
          if (ls) setFaqs(ls);
          return;
        }
        if (!data || data.length === 0) {
          const rows = defaultFAQs.map(faq => ({ id: faq.id, data: faq }));
          supabase.from('faqs').insert(rows).then(({ error: e }) => {
            if (e) console.error('FAQ seed error:', e.message);
          });
          setFaqs(defaultFAQs);
          lsSave(defaultFAQs);
        } else {
          const items = data.map((row: { data: FAQItem }) => row.data);
          setFaqs(items);
          lsSave(items);
        }
      });
  }, []);

  const addFAQ = async (faq: FAQItem) => {
    const updated = [...faqs, faq];
    setFaqs(updated);
    lsSave(updated);
    const { error } = await supabase.from('faqs').insert({ id: faq.id, data: faq });
    if (error) console.error('FAQ add error:', error.message);
  };

  const updateFAQ = async (faq: FAQItem) => {
    const updated = faqs.map(f => f.id === faq.id ? faq : f);
    setFaqs(updated);
    lsSave(updated);
    const { error } = await supabase.from('faqs').update({ data: faq }).eq('id', faq.id);
    if (error) console.error('FAQ update error:', error.message);
  };

  const deleteFAQ = async (id: string) => {
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    lsSave(updated);
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) console.error('FAQ delete error:', error.message);
  };

  return (
    <FAQContext.Provider value={{ faqs, addFAQ, updateFAQ, deleteFAQ }}>
      {children}
    </FAQContext.Provider>
  );
}

export function useFAQ() {
  const ctx = useContext(FAQContext);
  if (!ctx) throw new Error('useFAQ must be used inside FAQProvider');
  return ctx;
}
