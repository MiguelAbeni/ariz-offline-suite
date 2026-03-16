import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  User, Settings, Camera, Lock, Eye, EyeOff, 
  ShieldCheck, Loader2, Save, Trash2, ArrowLeft, 
  Mail, Edit3, KeyRound, Globe, BellRing, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const AccountPanel: React.FC = () => {
  const { user, activeSection, setActiveSection, updateUserProfile } = useAppContext();
  const [passwordInput, setPasswordInput] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handlePasswordVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    setTimeout(() => {
      if (passwordInput === user?.password) {
        setIsPasswordVerified(true);
        toast.success("መግቢያ ፓስወርድ ትክክለኛ ነው። መለወጥ ይችላሉ።");
      } else {
        toast.error("የሰጡት ፓስወርድ አልተስተካከለም።");
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile({ profilePhoto: reader.result as string });
        toast.success("ፕሮፋይል ፎቶ በተሳካ ሁኔታ ተቀይሯል።");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateUserProfile({ username, email });
    toast.success("ፕሮፋይል መረጃ ተስተካክሏል።");
  };

  if (activeSection === 'settings' && !isPasswordVerified) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-900/10 border border-blue-800/50 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-cyan-400" size={32} />
          </div>
          <h2 className="text-2xl font-black text-white text-center mb-2">የሴቲንግ ጥበቃ</h2>
          <p className="text-gray-400 text-center text-sm mb-8">ሴቲንግ ለመክፈት እባክዎ ፓስወርድ ያስገቡ።</p>
          
          <form onSubmit={handlePasswordVerify} className="space-y-4">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-blue-950/50 border border-blue-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="ፓስወርድ"
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}\
              </button>
            </div>

            <button 
              type="submit"
              disabled={isVerifying}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
            >
              {isVerifying ? <Loader2 className="animate-spin" /> : <KeyRound size={20} />}
              ግባ
            </button>

            <button 
              type="button"
              onClick={() => setActiveSection('hero')}
              className="w-full text-gray-500 hover:text-white text-sm font-bold transition-colors"
            >
              ተመለስ
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 overflow-x-hidden">
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setActiveSection('hero')}
          className="p-2 bg-blue-900/30 rounded-xl text-blue-400 hover:bg-blue-900/50 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
          {activeSection === 'profile' ? 'ፕሮፋይል' : 'ሴቲንግ'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-blue-900/10 border border-blue-800/40 rounded-[2rem] p-8 text-center sticky top-24">
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <div className="w-full h-full rounded-full border-4 border-cyan-500/30 overflow-hidden shadow-2xl">
                <img 
                  src={user?.profilePhoto || "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3fad734e-dd49-4ba4-a3d1-9ce2186cc2de/secure-user-profile-interface-19809b6e-1773600880940.webp"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-2xl cursor-pointer shadow-xl transition-transform hover:scale-110">
                <Camera size={20} />
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
            <h3 className="text-2xl font-black text-white mb-6">{user?.username}</h3>
            
            <div className="space-y-2">
              <button 
                onClick={() => setActiveSection('profile')} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeSection === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-blue-900/20'}`}
              >
                <User size={18} /> ፕሮፋይል
              </button>
              <button 
                onClick={() => setActiveSection('settings')} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeSection === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-blue-900/20'}`}
              >
                <Settings size={18} /> ሴቲንግ
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {activeSection === 'profile' ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blue-900/5 border border-blue-900/20 rounded-[2.5rem] p-8 space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-4">
                  <Info className="text-cyan-400" size={24} />
                  የተመዝጋቢ መረጃዎች
                </h2>
                
                <ol className="space-y-4 list-decimal list-inside text-gray-300">
                  <li className="p-4 bg-blue-950/30 rounded-2xl border border-blue-900/40">
                    <span className="font-black text-blue-400 uppercase tracking-widest text-[10px] block mb-1">የተጠቃሚ ስም</span>
                    <span className="text-lg font-bold">{user?.username}</span>
                  </li>
                  <li className="p-4 bg-blue-950/30 rounded-2xl border border-blue-900/40">
                    <span className="font-black text-blue-400 uppercase tracking-widest text-[10px] block mb-1">ኢሜይል</span>
                    <span className="text-lg font-bold">{user?.email}</span>
                  </li>
                  <li className="p-4 bg-blue-950/30 rounded-2xl border border-blue-900/40">
                    <span className="font-black text-blue-400 uppercase tracking-widest text-[10px] block mb-1">የምዝገባ መለያ (ID)</span>
                    <span className="text-lg font-bold">{user?.id}</span>
                  </li>
                </ol>

                <div className="mt-12 pt-8 border-t border-blue-900/30">
                  <h3 className="text-lg font-black text-white mb-6 uppercase italic tracking-tighter">መረጃን ማስተካከያ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-blue-400 uppercase tracking-widest pl-2">የተጠቃሚ ስም</label>
                      <div className="relative">
                        <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={18} />
                        <input 
                          type="text" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-blue-950/30 border border-blue-900/40 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-blue-400 uppercase tracking-widest pl-2">ኢሜይል</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50" size={18} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-blue-950/30 border border-blue-900/40 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-600/5 border border-blue-500/10 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldCheck className="text-cyan-400" size={16} />
                    Ariz Secure Data Isolation
                  </h4>
                  <p className="text-xs text-gray-500">
                    የእርስዎ መረጃ በከፍተኛ ጥበቃ (Dodos Protection) የተለየ ነው። አድሚኑ እና ሌሎች ተጠቃሚዎች የእርስዎን ጥቅም መረጃ ማየት አይችሉም።
                  </p>
                </div>
              </div>

              <button 
                onClick={handleSaveProfile}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Save size={20} /> ለውጡን አስቀምጥ
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blue-900/5 border border-blue-900/20 rounded-[2.5rem] p-8 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-blue-950/30 rounded-3xl border border-blue-900/40">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-2xl">
                      <BellRing className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-white">ማሳሰቢያዎች</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">የድምፅ እና የጽሁፍ ማሳሰቢያዎች</p>
                    </div>
                  </div>
                  <div className="w-14 h-8 bg-blue-600 rounded-full flex items-center px-1">
                    <div className="w-6 h-6 bg-white rounded-full shadow-lg ml-auto" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-blue-950/30 rounded-3xl border border-blue-900/40">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-2xl">
                      <Globe className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-white">የቋንቋ ምርጫ</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">ይዘቱን አሁን በአማርኛ ይመልከቱ</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-900/50 rounded-xl text-xs font-black text-blue-400 border border-blue-800">
                    ለውጥ
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-blue-950/30 rounded-3xl border border-blue-900/40">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600/20 rounded-2xl">
                      <Trash2 className="text-red-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-white">አካውንት ይሰርዙ</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">ሁሉም የእርስዎ መረጃዎች ይጠፋሉ</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-900/20 rounded-xl text-xs font-black text-red-400 border border-red-900/30 hover:bg-red-900/40 transition-all">
                    አአሁን ሰርዝ
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPanel;