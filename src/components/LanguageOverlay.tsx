import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export const LanguageOverlay = () => {
  const { setLanguage, setIsLanguageSet, isLanguageSet, t } = useLanguage();

  if (isLanguageSet) return null;

  const langs = [
    { code: 'am', label: 'አማርኛ', subtitle: 'Amharic' },
    { code: 'en', label: 'English', subtitle: 'English' },
    { code: 'ar', label: 'العربية', subtitle: 'Arabic' },
    { code: 'fr', label: 'Français', subtitle: 'French' },
  ];

  const handleSelect = (code: any) => {
    setLanguage(code);
    setIsLanguageSet(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B1B2B] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-12"
      >
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center border border-blue-500/30">
            <Globe size={40} className="text-blue-500" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">{t('selectLanguage')}</h1>
          <p className="text-white/60">Choose your preferred language to continue</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className="bg-white/5 border border-white/10 hover:border-blue-500 hover:bg-blue-600/10 p-6 rounded-2xl transition-all text-center group"
            >
              <p className="text-xl font-bold text-white group-hover:text-blue-400">{l.label}</p>
              <p className="text-sm text-white/40">{l.subtitle}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};