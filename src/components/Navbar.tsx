import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext, AppSection } from '../context/AppContext';
import { User, LogOut, Settings, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout, isAuthenticated, setActiveSection, activeSection } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const services = [
    { name: t('nav.planner'), id: 'balegize' as AppSection },
    { name: t('nav.medication'), id: 'ayizony' as AppSection },
    { name: t('nav.habit'), id: 'arif' as AppSection },
    { name: t('nav.premium'), id: 'premium' as AppSection },
  ];

  const handleServiceSelect = (id: AppSection) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setActiveSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0B1B2B]/95 backdrop-blur-md border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Services and Language Selector */}
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar py-2 flex-1">
          <div className="flex items-center gap-1 sm:gap-4 shrink-0">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeSection === service.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-gray-400 hover:text-white hover:bg-blue-900/30'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-blue-900/40 shrink-0" />

          {/* Language Selector (Amharic/English Only) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setLanguage('am')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                language === 'am' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              አማ
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                language === 'en' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Right Side: Logo and Profile */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-cyan-500/30 overflow-hidden hover:border-cyan-400 transition-all"
              >
                <img
                  src={user?.profilePhoto || "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3fad734e-dd49-4ba4-a3d1-9ce2186cc2de/secure-user-profile-interface-19809b6e-1773600880940.webp"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 sm:w-56 bg-[#0B1B2B] border border-blue-900/50 rounded-2xl shadow-2xl p-2 z-[110]"
                  >
                    <div className="px-4 py-3 border-b border-blue-900/30 mb-2">
                      <p className="text-sm font-black text-white truncate">{user?.username}</p>
                      <p className="text-[10px] text-cyan-500 font-bold truncate tracking-wider">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => { setActiveSection('profile'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-blue-900/30 rounded-xl transition-colors"
                    >
                      <User size={16} className="text-blue-400" /> {t('profile')}
                    </button>
                    <button
                      onClick={() => { setActiveSection('settings'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-blue-900/30 rounded-xl transition-colors"
                    >
                      <Settings size={16} className="text-blue-400" /> {t('settings')}
                    </button>
                    <div className="h-px bg-blue-900/30 my-2 mx-2" />
                    <button
                      onClick={() => logout()}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs sm:text-sm text-red-400 hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <LogOut size={16} /> {t('logout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 sm:gap-2 group hover:opacity-90 transition-all"
          >
            <div className="flex flex-col items-end">
              <span className="text-[11px] sm:text-sm font-black text-white tracking-tighter uppercase italic leading-none group-hover:text-cyan-400 transition-colors">
                ARIZ TECH
              </span>
              <span className="text-[7px] sm:text-[9px] text-cyan-500 font-bold uppercase tracking-[0.2em] leading-none">
                PREMIUM
              </span>
            </div>
            <img
              src="https://storage.googleapis.com/dala-prod-public-storage/attachments/38c0c20b-4760-4fae-857f-7538b60fa254/1773603926108_COV-removebg-preview.png"
              alt="Ariz Tech Logo"
              className="w-7 h-7 sm:w-10 sm:h-10 object-contain brightness-110"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;