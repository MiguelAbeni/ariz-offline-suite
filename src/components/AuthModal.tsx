import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { X, Camera, Eye, EyeOff, User as UserIcon, ShieldCheck, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !username)) {
      toast.error("እባክዎ ሁሉንም አስፈላጊ መረጃዎች ያስገቡ።");
      return;
    }

    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        toast.success("እንኳን በደህና መጡ!");
        onClose();
      } else {
        toast.error("የገቡት መረጃ ትክክል አይደለም ወይም አካውንቱ የለም።");
      }
    } else {
      const success = await register({
        email,
        username,
        password,
        profilePhoto: profilePhoto || undefined,
        usePasswordForLogin: true,
      });
      if (success) {
        toast.success("በተሳካ ሁኔታ ተመዝግበዋል!");
        onClose();
      } else {
        toast.error("ይህ ኢሜይል አስቀድሞ ተመዝግቧል። እባክዎ በሌላ ኢሜይል ይሞክሩ።");
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        toast.success("ፕሮፋይል ፎቶ ተመርጧል።");
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#0B1B2B] border border-blue-900/40 rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-900/20">
          <div className="flex items-center gap-2">
            <img
              src="https://storage.googleapis.com/dala-prod-public-storage/attachments/38c0c20b-4760-4fae-857f-7538b60fa254/1773603926108_COV-removebg-preview.png"
              alt="Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-[10px] font-black tracking-widest text-cyan-500 uppercase italic">ARIZ SECURE</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">
              {isLogin ? "መግቢያ" : "መመዝገቢያ"}
            </h2>
            <p className="text-gray-500 text-xs font-bold">
              {isLogin ? "ደህንነቱ በተጠበቀ ሁኔታ ይግቡ" : "አዲስ አካውንት ይክፈቱ እና መረጃዎን ይጠብቁ"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="flex flex-col items-center mb-4">
                <label className="relative cursor-pointer group">
                  <div className="w-20 h-20 rounded-2xl bg-blue-900/20 border-2 border-dashed border-blue-800 flex items-center justify-center overflow-hidden group-hover:border-cyan-500 transition-all">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-blue-500" size={24} />
                    )}
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-lg p-1.5 text-white shadow-lg">
                    <Camera size={12} />
                  </div>
                </label>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-2">ፕሮፋይል ፎቶ</span>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest pl-1">የተጠቃሚ ስም</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={16} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-blue-950/20 border border-blue-900/30 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="ስምዎ"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest pl-1">ኢሜይል</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-blue-950/20 border border-blue-900/30 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="example@mail.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest pl-1">ፓስዎርድ</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-blue-950/20 border border-blue-900/30 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-950/50 text-sm uppercase tracking-widest mt-2"
            >
              {isLogin ? "ግባ" : "ተመዝገብ"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 hover:text-cyan-300 text-[11px] font-black transition-colors uppercase tracking-tight underline underline-offset-4"
            >
              {isLogin ? "አዲስ አካውንት መክፈት ይፈልጋሉ? ይመዝገቡ" : "አካውንት አለዎት? ይግቡ"}
            </button>
          </div>
        </div>

        <div className="bg-blue-950/20 p-4 border-t border-blue-900/20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-gray-500">
            <Cloud size={14} className="text-cyan-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secured by Cloudflare</span>
          </div>
          <p className="text-[8px] text-gray-600 uppercase font-black tracking-[0.2em] italic">
            Military-Grade Data Isolation Enabled
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;