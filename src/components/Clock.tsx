import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock as ClockIcon } from 'lucide-react';

const Clock = () => {
  const { language } = useLanguage();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'am' ? 'am-ET' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md max-w-sm mx-auto shadow-2xl">
      <div className="bg-blue-600/20 p-4 rounded-full mb-4">
        <ClockIcon className="text-blue-400" size={32} />
      </div>
      <div className="text-5xl font-black text-white tracking-tighter mb-2 font-mono">
        {formatTime(time)}
      </div>
      <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default Clock;