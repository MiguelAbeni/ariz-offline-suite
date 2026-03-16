import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { speakEnglish, scheduleVoiceReminder } from '../utils/voice';
import { CheckCircle, XCircle, Clock, Plus, Flame, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  time: string;
  status: 'pending' | 'success' | 'failed';
  date: string;
}

const BalegizePlanner = () => {
  const { t } = useLanguage();
  const [plans, setPlans] = useState<Plan[]>(() => {
    const saved = localStorage.getItem('balegize_plans');
    return saved ? JSON.parse(saved) : [];
  });
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('balegize_streak');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('balegize_plans', JSON.stringify(plans));
    localStorage.setItem('balegize_streak', streak.toString());
  }, [plans, streak]);

  const addPlan = () => {
    if (!newName || !newTime) return;
    const newPlan: Plan = {
      id: Date.now().toString(),
      name: newName,
      time: newTime,
      status: 'pending',
      date: new Date().toLocaleDateString(),
    };
    setPlans([newPlan, ...plans]);
    scheduleVoiceReminder('User', newName, newTime, 'plan');
    setNewName('');
    setNewTime('');
    toast.success('Plan added! English voice notification scheduled.');
  };

  const updateStatus = (id: string, status: 'success' | 'failed') => {
    setPlans(plans.map(p => p.id === id ? { ...p, status } : p));
    if (status === 'success') {
      setStreak(s => s + 1);
      toast.success('Streak increased!');
    } else {
      setStreak(0);
      toast.info('Streak reset.');
    }
  };

  return (
    <div className="bg-[#0B1B2B] text-white p-6 rounded-xl border border-white/10 max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="text-blue-400" /> {t('balegize')}
        </h2>
        <div className="bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full flex items-center gap-2">
          <Flame size={16} /> {streak} {t('streak')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder={t('planName')}
          className="bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-blue-500"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="time"
          className="bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-blue-500"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button
          onClick={addPlan}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} /> {t('add')}
        </button>
      </div>

      <div className="space-y-4">
        {plans.map(plan => (
          <div key={plan.id} className="bg-white/5 p-4 rounded-lg flex items-center justify-between border border-white/10">
            <div>
              <p className="font-semibold text-lg">{plan.name}</p>
              <p className="text-gray-400 text-sm">{plan.time} - {plan.date}</p>
            </div>
            
            {plan.status === 'pending' ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => updateStatus(plan.id, 'success')}
                  className="p-2 hover:bg-green-500/20 text-green-400 rounded-full"
                >
                  <CheckCircle size={24} />
                </button>
                <button 
                  onClick={() => updateStatus(plan.id, 'failed')}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-full"
                >
                  <XCircle size={24} />
                </button>
              </div>
            ) : (
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${plan.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {plan.status === 'success' ? t('success') : t('fail')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalegizePlanner;