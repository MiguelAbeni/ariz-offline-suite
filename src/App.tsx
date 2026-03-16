import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Clock from './components/Clock';
import BalegizePlanner from './components/BalegizePlanner';
import AyizonyMedicationReminder from './components/AyizonyMedicationReminder';
import ArifAychekulmHabitBuilder from './components/ArifAychekulmHabitBuilder';
import ArizSheqayPremium from './components/ArizSheqayPremium';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AccountPanel from './components/AccountPanel';
import { AdminPanel } from './components/AdminPanel';
import { Toaster } from 'sonner';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, activeSection, setActiveSection } = useAppContext();
  const { t } = useLanguage();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1B2B] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
        <style>{`
          html, body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
          }
        `}</style>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[100px]" />

        <div className="max-w-md w-full relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="mb-8 p-8 bg-blue-900/10 border border-blue-800/40 rounded-[2.5rem] backdrop-blur-xl shadow-2xl shadow-blue-950/50"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-900/40 relative">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/attachments/38c0c20b-4760-4fae-857f-7538b60fa254/1773603926108_COV-removebg-preview.png" 
                alt="Ariz" 
                className="w-12 h-12 object-contain"
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8px] border-2 border-dashed border-cyan-500/30 rounded-[2.5rem]"
              />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tighter italic uppercase">ARIZ <span className="text-cyan-400">TECH</span></h1>
            <p className="text-gray-400 mb-10 leading-relaxed font-medium">
              {t('auth_required_msg')}
            </p>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-2xl font-black tracking-widest text-lg flex items-center justify-center gap-4 group transition-all shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95"
            >
              {t('login_register')}
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="flex items-center justify-center gap-2 text-blue-500/50">
             <ShieldCheck size={16} />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('military_grade')}</span>
          </div>
        </div>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <Toaster position="top-center" theme="dark" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-12 py-12">
            <Hero />
            <Clock />
          </div>
        );
      case 'balegize':
        return <div className="max-w-7xl mx-auto px-4 py-12"><BalegizePlanner /></div>;
      case 'ayizony':
        return <div className="max-w-7xl mx-auto px-4 py-12"><AyizonyMedicationReminder /></div>;
      case 'arif':
        return <div className="max-w-7xl mx-auto px-4 py-12"><ArifAychekulmHabitBuilder /></div>;
      case 'premium':
        return <div className="max-w-7xl mx-auto px-4 py-12"><ArizSheqayPremium /></div>;
      case 'profile':
      case 'settings':
        return <AccountPanel />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1B2B] text-white selection:bg-blue-500/30 overflow-x-hidden w-full relative">
      <style>{`
        html, body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
          margin: 0;
          padding: 0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <Navbar />
      <Ticker />
      <main className="pt-16 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {activeSection === 'hero' && user?.email === 'admin@ariz.com' && (
          <div className="max-w-7xl mx-auto px-4 border-t border-blue-900/50 mt-24 pt-24 pb-24">
            <div className="bg-blue-600/5 p-8 rounded-[3rem] border border-blue-500/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-cyan-500" size={32} />
                <h2 className="text-4xl font-black tracking-tight italic uppercase">System Admin</h2>
              </div>
              <AdminPanel />
            </div>
          </div>
        )}
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Toaster position="top-center" theme="dark" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
};

export default App;