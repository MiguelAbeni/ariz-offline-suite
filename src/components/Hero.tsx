import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-16 lg:pt-40">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8">
          <Sparkles size={16} />
          <span>{t('new_features')}</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight mb-6 uppercase">
          {t('hero_title')} <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent italic">
            Ariz Tech
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10 leading-relaxed">
          {t('hero_subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
            {t('get_started')} <ArrowRight size={20} />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-lg border border-white/10 transition-all">
            {t('view_pricing')}
          </button>
        </div>

        {/* Features grid removed from Hero and moved to Hamburger menu as requested */}
      </div>
    </div>
  );
};

export default Hero;