import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { speakEnglish, scheduleVoiceReminder } from '../utils/voice';
import { 
  ShieldCheck, Lock, Share2, Award, Calendar, 
  Settings, Users, ToggleLeft, ToggleRight, 
  Bell, CheckSquare, XSquare, Plus, Clock 
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface PremiumPlan {
  id: string;
  name: string;
  time: string;
  category: 'Work' | 'Personal' | 'Family' | 'Marriage';
  frequency: 'Daily' | 'Weekly' | '15 Days' | 'Monthly' | '6 Months' | 'Yearly';
  status: 'pending' | 'completed' | 'canceled';
}

const ArizSheqayPremium = () => {
  const { t } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => localStorage.getItem('ariz_sheqay_paid') === 'true');
  const [isTrial, setIsTrial] = useState(() => {
    const trialStart = localStorage.getItem('ariz_trial_start');
    if (!trialStart) {
      localStorage.setItem('ariz_trial_start', Date.now().toString());
      return true;
    }
    const daysSince = (Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24);
    return daysSince < 7;
  });
  
  const [plans, setPlans] = useState<PremiumPlan[]>(() => {
    const saved = localStorage.getItem('premium_plans');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [streaks, setStreaks] = useState(12);
  const [goldMedals, setGoldMedals] = useState(2);
  const [bronzeMedals, setBronzeMedals] = useState(5);

  const categories = ['Work', 'Personal', 'Family', 'Marriage'];
  const frequencies = ['Daily', 'Weekly', '15 Days', 'Monthly', '6 Months', 'Yearly'];

  const [formData, setFormData] = useState({
    name: '',
    time: '',
    category: 'Work' as any,
    frequency: 'Daily' as any
  });

  useEffect(() => {
    localStorage.setItem('premium_plans', JSON.stringify(plans));
    localStorage.setItem('ariz_sheqay_paid', isSubscribed.toString());
  }, [plans, isSubscribed]);

  const handleAddPlan = () => {
    if (!formData.name || !formData.time) return;
    const newPlan: PremiumPlan = {
      id: Date.now().toString(),
      name: formData.name,
      time: formData.time,
      category: formData.category,
      frequency: formData.frequency,
      status: 'pending'
    };
    setPlans([newPlan, ...plans]);
    
    scheduleVoiceReminder('Premium User', formData.name, formData.time, 'work');
    toast.success('Premium plan scheduled with advance voice notifications.');
    
    speakEnglish("Wake up, next work time has arrived. Today is a great day for progress.");
  };

  const updateStatus = (id: string, status: 'completed' | 'canceled') => {
    setPlans(plans.map(p => p.id === id ? { ...p, status } : p));
    if (status === 'completed') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setStreaks(s => s + 1);
      if (streaks > 10) setGoldMedals(g => g + 1);
    }
  };

  const sharePlan = (plan: PremiumPlan) => {
    const mailto = `mailto:?subject=Ariz Tech Plan: ${plan.name}&body=Category: ${plan.category}%0D%0ATime: ${plan.time}%0D%0AFrequency: ${plan.frequency}`;
    window.location.href = mailto;
    toast.success(`Opening email client to share ${plan.name}`);
  };

  const adminToggle = () => {
     setIsSubscribed(!isSubscribed);
     toast.success(`User Subscription set to ${!isSubscribed ? 'ON' : 'OFF'}`);
  };

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc5iPSMtgIaFwe4vKOZ197hG3gGdVxaJbLJXtswA10Z8Du0Gw/viewform?usp=dialog";

  const introductoryText = (
    <div className="mb-10 text-left space-y-6 bg-[#1a2b3c]/50 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-md shadow-2xl">
      <p className="text-blue-400 font-bold text-2xl leading-relaxed">
        ይሕ ወርሐዊ የክፍያ ደንበኝነት አግልግሎት መዘመኛ ነው አግልግሎቱን በማስጀመርዎ የእለት፣የሳምንት ፣የወር፣የ6 ወር እና የአመት እቅዶችዎን በቋሚነት ሚመዘግብበት ነው
      </p>
      
      <div className="space-y-4 text-gray-200 text-lg">
        <div className="flex items-start gap-3">
          <span className="text-blue-400 font-bold text-xl mt-1">=</span>
          <p>ማስታወሻ የድምፅ መልዕክት እቅድዎ ሠዐት ሲደርስ ያሳውቅዎታል።</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 font-bold text-xl mt-1">=</span>
          <p>የስራ የቤተሰብ እቅዶችዎን በጥራት ይመዘግብልዎታል።</p>
        </div>
        <div className="flex items-start gap-3 pl-6">
          <p>ካስገቡት እቅዶች ጋር አብረው እንዲሔዱ ያበረታታዎታል።</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-6">
        <a 
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-5 px-8 rounded-2xl border-2 border-blue-500/50 bg-blue-500/5 text-blue-400 hover:bg-blue-500 hover:text-white transition-all font-extrabold text-center text-xl shadow-lg shadow-blue-500/10 active:scale-95"
        >
          ለመመዝገብ
        </a>
        <a 
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-5 px-8 rounded-2xl border-2 border-blue-500/50 bg-blue-500/5 text-blue-400 hover:bg-blue-500 hover:text-white transition-all font-extrabold text-center text-xl shadow-lg shadow-blue-500/10 active:scale-95"
        >
          ወርሐዊ ደንበኝነት
        </a>
      </div>
    </div>
  );

  if (!isSubscribed && !isTrial) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <div className="bg-[#0f172a]/40 border border-white/10 p-10 rounded-3xl text-center backdrop-blur-xl">
          {introductoryText}

          <div className="bg-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-blue-500/20">
            <Lock className="text-blue-400" size={48} />
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Ariz Sheqay Premium</h2>
          <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Your free trial has ended. To continue using the advanced planning system, medication reminders, and motivational voice calls, please subscribe.
          </p>
          
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 p-8 rounded-2xl mb-10 transform hover:scale-[1.02] transition-transform">
            <p className="text-3xl font-bold text-white mb-2">2000 ETB / Month</p>
            <p className="text-blue-400 font-medium">Includes all premium features + 24/7 Voice Support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center hover:border-blue-500/40 transition-all cursor-pointer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xN8SgI_k8YmR0-l0yP7D9D8O9u_C0X_N_g&s" alt="CBE" className="h-20 w-20 rounded-2xl mb-4 shadow-lg shadow-black/20" />
                <span className="font-bold text-white text-lg">CBE</span>
                <span className="text-sm text-gray-400 font-mono">1000563986558</span>
             </div>
             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center hover:border-blue-500/40 transition-all cursor-pointer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08zE6F6p7A4R4q-oY4k_L7-Y8L9L9P9O9S9w&s" alt="Telebirr" className="h-20 w-20 rounded-2xl mb-4 shadow-lg shadow-black/20" />
                <span className="font-bold text-white text-lg">Telebirr</span>
                <span className="text-sm text-gray-400 font-mono">+251970025517</span>
             </div>
             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center hover:border-blue-500/40 transition-all cursor-pointer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9u_X7p7_Z7z7z7z7z7z7z7z7z7z7z7z7z7w&s" alt="MPESA" className="h-20 w-20 rounded-2xl mb-4 shadow-lg shadow-black/20" />
                <span className="font-bold text-white text-lg">M-PESA</span>
                <span className="text-sm text-gray-400 font-mono">+251706243720</span>
             </div>
          </div>

          <button 
            onClick={() => window.open(googleFormUrl, '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/30 transform hover:-translate-y-1 active:translate-y-0 text-xl"
          >
            Proceed to Payment Form
          </button>
          
          <div className="mt-12 pt-8 border-t border-white/10">
             <button 
               onClick={() => setIsAdmin(!isAdmin)}
               className="text-gray-600 text-sm hover:text-gray-400 transition-colors"
             >
               Demo: Access Admin Panel Simulation
             </button>
             {isAdmin && (
               <div className="mt-6 p-6 bg-red-900/20 border border-red-500/30 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-red-400" />
                    <span className="text-lg font-bold text-red-100">Admin: User Status</span>
                  </div>
                  <button onClick={adminToggle} className="flex items-center gap-3 text-red-400 font-extrabold hover:text-red-300 transition-all">
                    {isSubscribed ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                    {isSubscribed ? 'Active' : 'Locked'}
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      {/* Show introduction at the top even for subscribers/trial users for context */}
      {introductoryText}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0f172a]/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-extrabold text-2xl flex items-center gap-3 text-white">
                <ShieldCheck className="text-blue-400" /> Dashboard
              </h3>
              <div className="text-sm font-bold bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full border border-green-500/30 uppercase tracking-widest">ACTIVE</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-500/10 p-5 rounded-2xl border border-orange-500/20 text-center shadow-lg">
                <Award className="text-orange-400 mx-auto mb-2" size={28} />
                <p className="text-3xl font-black text-white">{streaks}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{t('streak')}</p>
              </div>
              <div className="bg-yellow-500/10 p-5 rounded-2xl border border-yellow-500/20 text-center shadow-lg">
                <Award className="text-yellow-400 mx-auto mb-2" size={28} />
                <p className="text-3xl font-black text-white">{goldMedals + bronzeMedals}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{t('medals')}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a]/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
            <h4 className="font-extrabold text-xl mb-6 flex items-center gap-3 text-white"><Plus className="text-blue-400" size={24} /> Add Advanced Plan</h4>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Plan description..."
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="time" 
                  className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
                <select 
                  className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-sm text-white"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                >
                  {categories.map(c => <option key={c} value={c} className="bg-[#0B1B2B]">{c}</option>)}
                </select>
              </div>
              <select 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white"
                value={formData.frequency}
                onChange={e => setFormData({...formData, frequency: e.target.value as any})}
              >
                {frequencies.map(f => <option key={f} value={f} className="bg-[#0B1B2B]">{f}</option>)}
              </select>
              <button 
                onClick={handleAddPlan}
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-extrabold transition-all text-white shadow-lg shadow-blue-500/20 transform active:scale-95"
              >
                Create Premium Plan
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20 shadow-lg">
             <div className="flex items-center gap-3 text-blue-400 mb-3">
                <Bell size={22} />
                <span className="font-extrabold text-base">Notifications Active</span>
             </div>
             <p className="text-sm text-gray-400 leading-relaxed font-medium">You will receive voice alerts 30 mins before each plan and a motivational call at 12 AM.</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-3xl text-white tracking-tight">My Schedules</h3>
            <div className="flex gap-3">
              <button className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all border border-white/10">
                <Settings size={22} />
              </button>
              <button 
                onClick={() => setIsAdmin(!isAdmin)}
                className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all border border-white/10"
              >
                <Users size={22} />
              </button>
            </div>
          </div>

          {isAdmin && (
             <div className="mb-8 p-6 bg-red-900/20 border border-red-500/30 rounded-2xl flex items-center justify-between animate-pulse">
                <span className="text-base font-black text-red-400 uppercase tracking-widest">Admin Mode: Subscription Toggle</span>
                <button onClick={adminToggle} className="flex items-center gap-3 text-red-400 font-black">
                  {isSubscribed ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                  {isSubscribed ? 'Subscribed' : 'Locked'}
                </button>
             </div>
          )}

          <div className="space-y-6">
            {plans.map(plan => (
              <div key={plan.id} className="bg-[#0f172a]/40 border border-white/10 p-6 rounded-3xl flex items-center justify-between group hover:border-blue-500/40 transition-all text-white backdrop-blur-sm shadow-xl">
                <div className="flex gap-6 items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    plan.category === 'Work' ? 'bg-blue-500/20 text-blue-400' :
                    plan.category === 'Personal' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    <Calendar size={28} />
                  </div>
                  <div>
                    <h5 className="font-black text-xl mb-1">{plan.name}</h5>
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                      <span className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> {plan.time}</span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs uppercase font-bold border border-white/5 tracking-wider">{plan.category}</span>
                      <span className="text-blue-400 font-bold">{plan.frequency}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                   {plan.status === 'pending' ? (
                     <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateStatus(plan.id, 'completed')}
                          className="p-3 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500/20 transition-all border border-green-500/20"
                        >
                          <CheckSquare size={22} />
                        </button>
                        <button 
                          onClick={() => updateStatus(plan.id, 'canceled')}
                          className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"
                        >
                          <XSquare size={22} />
                        </button>
                     </div>
                   ) : (
                     <span className={`text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest ${plan.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                       {plan.status}
                     </span>
                   )}
                   
                   <div className="h-10 w-[1px] bg-white/10 mx-2" />
                   <button 
                     onClick={() => sharePlan(plan)}
                     className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all border border-white/10"
                   >
                     <Share2 size={20} />
                   </button>
                </div>
              </div>
            ))}

            {plans.length === 0 && (
              <div className="text-center py-24 bg-[#0f172a]/20 border border-dashed border-white/10 rounded-3xl backdrop-blur-sm">
                <p className="text-gray-500 font-bold text-xl">No premium plans yet. Start by adding one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArizSheqayPremium;