'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations['en'];
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations['en'],
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  const applyLang = (l: Language) => {
    if (typeof document === 'undefined') return;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
    let style = document.getElementById('ar-font-override');
    if (l === 'ar') {
      if (!style) {
        style = document.createElement('style');
        style.id = 'ar-font-override';
        document.head.appendChild(style);
      }
      style.textContent = `* { font-family: 'Tajawal', sans-serif !important; font-weight: 700; }`;
    } else {
      if (style) style.textContent = '';
    }
  };

  const setLang = (l: Language) => {
    setLangState(l);
    applyLang(l);
  };

  useEffect(() => { applyLang(lang); }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
