import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface LanguageSelectionOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LanguageSelectionOverlay: React.FC<LanguageSelectionOverlayProps> = ({ isOpen, onClose }) => {
  const { setLanguage, setIsLanguageSet, t } = useLanguage();

  const handleSelect = (lang: 'am' | 'en') => {
    setLanguage(lang);
    setIsLanguageSet(true);
    if (onClose) onClose();
  };

  const langs = [
    { code: 'am', name: 'አማርኛ', native: 'Amharic' },
    { code: 'en', name: 'English', native: 'English' },
  ];

  if (onClose && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[110] bg-[#0B1B2B] flex items-center justify-center p-6 ${onClose ? 'bg-black/80 backdrop-blur-md' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-w-md w-full bg-blue-900/10 border border-blue-800/40 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl text-center relative"
      >
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        )}

        <h1 className="text-3xl font-black text-white mb-8 tracking-tighter italic uppercase">
          {t('selectLanguage')}
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code as 'am' | 'en')}
              className="bg-blue-600/5 hover:bg-blue-600/20 transition-all p-6 rounded-3xl border border-blue-900/30 group flex flex-col items-center justify-center gap-2"
            >
              <div className="text-xl font-black text-white group-hover:scale-110 transition-transform">
                {l.name}
              </div>
              <div className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">
                {l.native}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelectionOverlay;