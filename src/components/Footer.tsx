import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, Instagram, Linkedin, Twitter, Globe, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: t('support'), items: [t('help_center'), t('payment_support'), t('system_lock_info'), t('trial_details')] },
    { title: t('legal'), items: [t('terms_of_use'), t('privacy_policy'), t('cookie_policy'), t('security')] }
  ];

  return (
    <footer className="bg-[#050C14] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2">
            <h2 className="text-3xl font-black text-white mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent italic uppercase">
              ARIZ TECH
            </h2>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed font-medium">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Globe].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {footerLinks.map((col, i) => (
            <div key={i} className="col-span-1">
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {col.items.map((item, j) => (
                  <li key={j}>
                    <button className="text-gray-400 hover:text-white transition-colors text-sm font-bold">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-500 font-bold">
          <p>© {currentYear} ARIZ TECH. {t('footer_rights')}</p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-1.5">{t('footer_made_with')} <Heart size={14} className="text-red-500 fill-red-500" /> in Ethiopia</div>
             <div className="flex items-center gap-2">
                <Mail size={16} /> support@ariztech.com
             </div>
             <div className="flex items-center gap-2">
                <Phone size={16} /> +251 900 000 000
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;