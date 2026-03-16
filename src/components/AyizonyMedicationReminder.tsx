import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { scheduleVoiceReminder } from '../utils/voice';
import { Pill, Plus, Clock, HeartPulse } from 'lucide-react';
import { toast } from 'sonner';

interface Med {
  id: string;
  name: string;
  time: string;
}

const AyizonyMedicationReminder = () => {
  const { t } = useLanguage();
  const [meds, setMeds] = useState<Med[]>(() => {
    const saved = localStorage.getItem('ayizony_meds');
    return saved ? JSON.parse(saved) : [];
  });
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    localStorage.setItem('ayizony_meds', JSON.stringify(meds));
  }, [meds]);

  const addMed = () => {
    if (!newName || !newTime) return;
    const newMed: Med = {
      id: Date.now().toString(),
      name: newName,
      time: newTime,
    };
    setMeds([newMed, ...meds]);
    scheduleVoiceReminder('User', newName, newTime, 'med');
    setNewName('');
    setNewTime('');
    toast.success('Medication scheduled with English voice notification.');
  };

  const removeMed = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  return (
    <div className="bg-[#0B1B2B] text-white p-6 rounded-xl border border-white/10 max-w-2xl mx-auto mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-500/20 p-2 rounded-lg">
          <HeartPulse className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold">{t('ayizony')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-3">
          <Pill className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder={t('medName')}
            className="bg-transparent outline-none flex-1"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-3">
          <Clock className="text-gray-400 mr-2" size={18} />
          <input
            type="time"
            className="bg-transparent outline-none flex-1"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </div>
        <button
          onClick={addMed}
          className="bg-red-600 hover:bg-red-700 p-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} /> {t('add')}
        </button>
      </div>

      <div className="space-y-4">
        {meds.map(med => (
          <div key={med.id} className="bg-white/5 p-4 rounded-lg flex items-center justify-between border border-white/10">
            <div>
              <p className="font-semibold text-lg">{med.name}</p>
              <p className="text-gray-400 flex items-center gap-1"><Clock size={14} /> {med.time}</p>
            </div>
            <button 
              onClick={() => removeMed(med.id)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
        {meds.length === 0 && <p className="text-center text-gray-500">No medications scheduled.</p>}
      </div>
    </div>
  );
};

export default AyizonyMedicationReminder;