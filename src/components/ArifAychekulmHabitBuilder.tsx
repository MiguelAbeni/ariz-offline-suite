import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Target, 
  BookOpen, 
  ShieldAlert, 
  Dna, 
  Trophy, 
  Frown, 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Activity, 
  Flame,
  User,
  Phone,
  Eye,
  Hand,
  Ear,
  Wind,
  Utensils,
  ChevronRight,
  Info,
  ExternalLink,
  Brain,
  Smile,
  Zap,
  Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface DailyLog {
  status: 'won' | 'lost' | null;
  photo?: string;
  timestamp: number;
}

interface RootCause {
  id: number;
  text: string;
}

type ChallengeType = 'addiction' | 'sega' | 'depression' | 'new_habit' | 'sports';

const ArifAychekulmHabitBuilder = () => {
  const { language } = useLanguage();
  const [activeChallenge, setActiveChallenge] = useState<ChallengeType>('addiction');
  const [history, setHistory] = useState<Record<string, Record<number, DailyLog>>>(() => {
    const saved = localStorage.getItem('arif_aychekulm_history_90_v2');
    return saved ? JSON.parse(saved) : {
      addiction: {},
      sega: {},
      depression: {},
      new_habit: {},
      sports: {}
    };
  });
  
  const [rootCauses, setRootCauses] = useState<Record<string, RootCause[]>>(() => {
    const saved = localStorage.getItem('arif_aychekulm_roots_90_v2');
    return saved ? JSON.parse(saved) : {
      addiction: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, text: '' })),
      sega: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, text: '' })),
      depression: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, text: '' })),
      new_habit: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, text: '' })),
      sports: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, text: '' }))
    };
  });

  const [showShield, setShowShield] = useState(false);
  const [shieldCategory, setShieldCategory] = useState<'sega' | 'addiction' | 'depression' | null>(null);
  const [streaks, setStreaks] = useState<Record<string, number>>({
    addiction: 0,
    sega: 0,
    depression: 0,
    new_habit: 0,
    sports: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('arif_aychekulm_history_90_v2', JSON.stringify(history));
    calculateStreaks();
  }, [history]);

  useEffect(() => {
    localStorage.setItem('arif_aychekulm_roots_90_v2', JSON.stringify(rootCauses));
  }, [rootCauses]);

  const calculateStreaks = () => {
    const newStreaks: Record<string, number> = {};
    Object.keys(history).forEach(challenge => {
      let currentStreak = 0;
      const logs = history[challenge];
      const days = Object.keys(logs).map(Number).sort((a, b) => b - a);
      for (const d of days) {
        if (logs[d].status === 'won') {
          currentStreak++;
        } else if (logs[d].status === 'lost') {
          break;
        }
      }
      newStreaks[challenge] = currentStreak;
    });
    setStreaks(newStreaks);
  };

  const handleDayAction = (dayNum: number, status: 'won' | 'lost') => {
    const updatedHistory = { ...history };
    if (!updatedHistory[activeChallenge]) updatedHistory[activeChallenge] = {};
    
    updatedHistory[activeChallenge][dayNum] = { 
      ...updatedHistory[activeChallenge][dayNum], 
      status, 
      timestamp: Date.now() 
    };
    setHistory(updatedHistory);
    
    if (status === 'won') {
      toast.success(language === 'am' ? 'ድንቅ ነው! ዛሬ አሸንፈዋል 🏆' : 'Amazing! You won today 🏆');
    } else {
      toast.error(language === 'am' ? 'አይዞዎት፤ ነገ የተሻለ ቀን ይሆናል ☹️' : "Don't worry, tomorrow will be better ☹️");
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, dayNum: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedHistory = { ...history };
        if (!updatedHistory[activeChallenge]) updatedHistory[activeChallenge] = {};
        
        updatedHistory[activeChallenge][dayNum] = { 
          ...updatedHistory[activeChallenge][dayNum], 
          photo: reader.result as string,
          timestamp: Date.now()
        };
        setHistory(updatedHistory);
        toast.success(language === 'am' ? 'ፎቶው በተሳካ ሁኔታ ተቀምጧል' : 'Photo saved successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const updateRootCause = (id: number, text: string) => {
    const updated = { ...rootCauses };
    updated[activeChallenge] = updated[activeChallenge].map(rc => rc.id === id ? { ...rc, text } : rc);
    setRootCauses(updated);
  };

  const amContent = {
    title: "አሪፍ አይቸኩልም",
    subtitle: "የ90 ቀን ራስን የመቀየር ጉዞ",
    dnsInfo: "ማሳሰቢያ: ስልክዎ ላይ የወሲብ ምስሎችን ለመዝጋት 'Private DNS' ን ይጠቀሙ።",
    dnsSetting: "መቼት (Settings) > Private DNS > Active > adult-filter-cleanbrowsing.org",
    emergencyShield: "የድንገተኛ ጊዜ ጋሻ",
    won: "ዛሬ አሸንፌአለሁ! 🏆",
    lost: "ዛሬ ተሸንፌአለሁ ☹️",
    process: "ሂደት",
    rootCausesTitle: "ወደ ሚጎትቱኝ 5 ነገሮች ምን እንደሆኑ መፃፊያ",
    sportsTitle: "የስፖርት ቻሌንጅ",
    sportsDesc: "የየቀኑን ለውጥ በፎቶ ይመዝግቡ",
    streak: "ተከታታይ ስኬት",
    challenges: {
      addiction: "ሱስ ማቆሚያ",
      sega: "ሴጋ/ራስን ማርካት ማቆም",
      depression: "ከድብርት መውጫ",
      new_habit: "አዲስ ነገር ለማሳካት",
      sports: "ስፖርት/ሰውነት ግንባታ"
    },
    segaBookButton: "የወሲብ ቪዲዮ ማየት ማቆም እና ራስን በራስ ማርካትን ዛሬ ማቆም ሚረዳ መፅሐፍ ለማግኘት",
    shieldOptions: {
      sega: {
        title: "የሴጋ/ራስን የማርካት ስሜት ሲመጣ",
        advice: [
          "ወዲያውኑ አካባቢ ለውጥ።",
          "ከክፍል ውጣ።",
          "ስልክህን ትተኸው ወደ ሳሎን ወይም ወደ ውጭ ሂድ።"
        ]
      },
      addiction: {
        title: "የሱስ ስሜት ሲመጣ",
        advice: [
          "አእምሮዎን በሌላ ነገር ይጠምዱ።",
          "ጥልቅ ትንፋሽ ይውሰዱና ለምን ማቆም እንደፈለጉ ያስቡ።",
          "ውሃ ይጠጡና ለ 5 ደቂቃ ያህል ይንቀሳቀሱ።",
          "የድንገተኛ ጊዜ ጋሻዎን ይጠቀሙ።"
        ]
      },
      depression: {
        title: "ድብርት/ጭንቀትን መቆጣጠር",
        advice: [
          "የ 5-4-3-2-1 ቴክኒክን ይጠቀሙ።",
          "ብቻህን አትሁን: ለሚያምንህ ሰው ደውል ወይም ከቤተሰብ ጋር ጊዜ አሳልፍ።"
        ],
        technique: [
          "5 የሚታዩ ነገሮች ተመልከት",
          "4 የሚዳሰሱ ነገሮች ንካ",
          "3 ድምፆች አድምጥ",
          "2 ሽቶ አሽት",
          "1 የሚቀመስ ነገር ቅመስ"
        ]
      }
    }
  };

  const enContent = {
    title: "Arif Aychekulm",
    subtitle: "90-Day Self-Transformation Journey",
    dnsInfo: "Note: Use Private DNS to filter adult content.",
    dnsSetting: "Settings > Private DNS > Active > adult-filter-cleanbrowsing.org",
    emergencyShield: "Emergency Shield",
    won: "Today I won! 🏆",
    lost: "Today I lost ☹️",
    process: "Process",
    rootCausesTitle: "5 Triggers/Root Causes",
    sportsTitle: "Sports Challenge",
    sportsDesc: "Track your daily physical progress with photos",
    streak: "Current Streak",
    challenges: {
      addiction: "Stop Addiction",
      sega: "Stop Self-Gratification",
      depression: "Overcome Depression",
      new_habit: "Start New Habit",
      sports: "Sports/Fitness Progress"
    },
    segaBookButton: "Get the book to stop watching porn and self-gratification today",
    shieldOptions: {
      sega: {
        title: "When Urge Strikes",
        advice: [
          "Change environment immediately.",
          "Leave the room.",
          "Leave your phone and go to the living room or outside."
        ]
      },
      addiction: {
        title: "When Addiction Calls",
        advice: [
          "Distract your mind immediately.",
          "Breathe deeply and recall your 'Why'.",
          "Drink water and move for 5 minutes.",
          "Activate your emergency shield."
        ]
      },
      depression: {
        title: "Managing Depression/Anxiety",
        advice: [
          "Use the 5-4-3-2-1 Technique.",
          "Don't be alone: Call someone you trust or spend time with family."
        ],
        technique: [
          "5 things you see",
          "4 things you can touch",
          "3 sounds you hear",
          "2 things you can smell",
          "1 thing you can taste"
        ]
      }
    }
  };

  const content = language === 'am' ? amContent : enContent;
  const currentHistory = history[activeChallenge] || {};
  const currentDay = Math.min(90, Object.keys(currentHistory).length + 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-20">
      {/* Header & Challenge Selector */}
      <div className="bg-[#0B1B2B] p-6 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-blue-500" size={32} />
              {content.title}
            </h1>
            <p className="text-gray-400 mt-1">{content.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-full font-black flex items-center gap-2 border border-orange-500/30">
               <Flame size={20} />
               <span>{streaks[activeChallenge]} {language === 'am' ? 'ቀናት' : 'Days'}</span>
            </div>
            <button 
              onClick={() => setShowShield(true)}
              className="bg-red-600 hover:bg-red-700 p-2.5 rounded-full transition-all text-white shadow-lg active:scale-95 border border-red-400/30"
            >
              <ShieldAlert size={24} />
            </button>
          </div>
        </div>

        {/* Challenge Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(content.challenges).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveChallenge(key as ChallengeType)}
              className={`p-3 rounded-xl text-[12px] md:text-xs font-black transition-all border uppercase tracking-tighter ${
                activeChallenge === key 
                ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                : 'bg-black/40 border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Progress & Action Card */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-white font-black text-6xl italic">Day {currentDay}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-8 text-center relative z-10 flex items-center justify-center gap-2">
               {activeChallenge === 'sports' ? <Dumbbell className="text-blue-500" /> : <Target className="text-blue-500" />}
               {language === 'am' ? 'የዕለት ውሳኔ/ድርጊት' : 'Daily Decision/Action'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <button 
                onClick={() => handleDayAction(currentDay, 'won')}
                className={`flex flex-col items-center gap-4 p-8 rounded-3xl border-2 transition-all group ${
                  currentHistory[currentDay]?.status === 'won' 
                  ? 'border-green-500 bg-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]' 
                  : 'border-white/10 hover:border-green-500/40 bg-black/40'
                }`}
              >
                <div className={`p-4 rounded-full ${currentHistory[currentDay]?.status === 'won' ? 'bg-green-500' : 'bg-gray-800 group-hover:bg-green-500/50'} transition-colors shadow-lg`}>
                  <Trophy size={40} className="text-white" />
                </div>
                <span className="font-black text-xl text-center">{content.won}</span>
              </button>

              <button 
                onClick={() => handleDayAction(currentDay, 'lost')}
                className={`flex flex-col items-center gap-4 p-8 rounded-3xl border-2 transition-all group ${
                  currentHistory[currentDay]?.status === 'lost' 
                  ? 'border-red-500 bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]' 
                  : 'border-white/10 hover:border-red-500/40 bg-black/40'
                }`}
              >
                <div className={`p-4 rounded-full ${currentHistory[currentDay]?.status === 'lost' ? 'bg-red-500' : 'bg-gray-800 group-hover:bg-red-500/50'} transition-colors shadow-lg`}>
                  <Frown size={40} className="text-white" />
                </div>
                <span className="font-black text-xl text-center">{content.lost}</span>
              </button>
            </div>

            {/* Photo Upload (Explicit for Sports, but optional for others) */}
            {(activeChallenge === 'sports' || activeChallenge === 'new_habit') && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-black text-lg flex items-center gap-2">
                      <Camera className="text-blue-500" /> {content.sportsTitle}
                    </h4>
                    <p className="text-sm text-gray-400">{content.sportsDesc}</p>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                  >
                    <Camera size={18} /> {language === 'am' ? 'ፎቶ አንሳ' : 'Capture'}
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, currentDay)}
                />
                
                {currentHistory[currentDay]?.photo ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                    <img src={currentHistory[currentDay].photo} alt="Daily progress" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button onClick={() => fileInputRef.current?.click()} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold text-white border border-white/30">Change Photo</button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 bg-black/20 text-gray-500">
                    <Camera size={48} className="opacity-20" />
                    <p className="text-sm font-bold">{language === 'am' ? 'የዛሬ ፎቶ አልተጫነም' : 'No photo uploaded for today'}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dashbaord Grid (90 Days) */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="text-green-500" /> {content.process} (90 Days)
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-10 gap-2">
              {Array.from({ length: 90 }).map((_, i) => {
                const dayNum = i + 1;
                const log = currentHistory[dayNum];
                const isCurrent = dayNum === currentDay;
                
                return (
                  <div 
                    key={dayNum}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center border transition-all text-[8px] font-black relative overflow-hidden ${
                      log?.status === 'won' ? 'bg-green-500/20 border-green-500 text-green-500' :
                      log?.status === 'lost' ? 'bg-red-500/20 border-red-500 text-red-500' :
                      isCurrent ? 'bg-blue-500/20 border-blue-500 text-blue-500 animate-pulse' :
                      'bg-black/40 border-white/5 text-gray-700'
                    }`}
                  >
                    {log?.photo && (
                       <div className="absolute inset-0 opacity-20">
                          <img src={log.photo} className="w-full h-full object-cover" alt="" />
                       </div>
                    )}
                    {log?.status === 'won' ? <CheckCircle2 size={12} className="relative z-10" /> : 
                     log?.status === 'lost' ? <XCircle size={12} className="relative z-10" /> : 
                     <span className="relative z-10">{dayNum}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Sega Specific: Book Button & DNS */}
          {activeChallenge === 'sega' && (
            <div className="space-y-4">
              <a 
                href="https://forms.gle/xq5fUcDhxosbEHxG6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-500 hover:via-purple-500 hover:to-blue-500 p-6 rounded-2xl border border-white/20 text-center shadow-2xl transition-all active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                    <BookOpen className="text-white group-hover:scale-110 transition-transform" size={40} />
                  </div>
                </div>
                <span className="font-black text-sm leading-relaxed block text-white drop-shadow-md">
                  {content.segaBookButton}
                </span>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-xs font-bold text-white border border-white/30 backdrop-blur-sm">
                  ሊንኩን ይክፈቱ <ExternalLink size={14} />
                </div>
              </a>

              <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-xl shadow-inner">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Dna size={18} />
                  <span className="font-black text-[10px] tracking-widest uppercase">Privacy Protection</span>
                </div>
                <p className="text-xs text-blue-100 mb-3 leading-relaxed font-bold">{content.dnsInfo}</p>
                <div className="bg-black/60 p-3 rounded-lg border border-white/10 group cursor-help">
                  <code className="text-[10px] text-blue-300 break-all font-mono block">
                    {content.dnsSetting}
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* Root Causes Section */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Target className="text-orange-500" /> {content.rootCausesTitle}
            </h3>
            <div className="space-y-3">
              {rootCauses[activeChallenge].map((rc) => (
                <div key={rc.id} className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/10 font-black group-focus-within:text-blue-500/50 transition-colors">{rc.id}</span>
                  <input 
                    type="text"
                    value={rc.text}
                    onChange={(e) => updateRootCause(rc.id, e.target.value)}
                    placeholder={language === 'am' ? 'እዚህ ጋር ይፃፉ...' : 'Write here...'}
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all focus:bg-black/60 shadow-inner"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Advice based on challenge */}
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-blue-400 mb-4">
              <Brain size={20} />
              <span className="font-black uppercase text-[10px] tracking-widest">Technique & Advice</span>
            </div>
            {activeChallenge === 'depression' ? (
              <div className="space-y-4">
                <p className="font-bold text-white text-sm leading-relaxed">የ 5-4-3-2-1 ቴክኒክ:</p>
                <div className="space-y-2">
                   {content.shieldOptions.depression.technique.map((t, i) => (
                     <div key={i} className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-[10px]">{5-i}</div>
                        <span className="font-medium">{t}</span>
                     </div>
                   ))}
                </div>
              </div>
            ) : activeChallenge === 'sega' ? (
              <div className="space-y-4">
                <p className="font-bold text-white text-sm leading-relaxed">{content.shieldOptions.sega.title}:</p>
                <div className="space-y-3">
                   {content.shieldOptions.sega.advice.map((a, i) => (
                     <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <Zap size={14} className="text-orange-400 mt-1 flex-shrink-0" />
                        <span className="leading-relaxed">{a}</span>
                     </div>
                   ))}
                </div>
              </div>
            ) : activeChallenge === 'addiction' ? (
              <div className="space-y-4">
                 <p className="font-bold text-white text-sm">የድንገተኛ ጊዜ ጋሻ:</p>
                 <div className="space-y-2">
                    <p className="text-xs text-gray-300 leading-relaxed italic">"ሱስን ለማሸነፍ የመጀመሪያው እርምጃ አካባቢን መቀየር ነው። ስሜቱ ሲመጣ ቢያንስ ለ 5 ደቂቃ ያህል ቦታዎን ይለቁ።"</p>
                 </div>
              </div>
            ) : (
              <div className="space-y-4">
                 <p className="text-sm text-gray-300 italic leading-relaxed">"ትልቅ ለውጥ የሚመጣው ትናንሽ ድሎችን በማከማቸት ነው። ዛሬን አሸንፍ፤ ነገ ሌላ ድል ነው!"</p>
                 <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                    <Smile size={16} /> አሸናፊ ነዎት!
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Shield Modal */}
      <AnimatePresence>
        {showShield && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-[#0B1B2B]/95 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#152A3E] w-full max-w-lg rounded-3xl overflow-hidden border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.3)]"
            >
              <div className="bg-red-600 p-6 flex justify-between items-center">
                <h3 className="text-xl font-black flex items-center gap-2 text-white">
                  <ShieldAlert /> {content.emergencyShield}
                </h3>
                <button onClick={() => { setShowShield(false); setShieldCategory(null); }} className="hover:bg-black/20 p-2 rounded-full transition-colors text-white">
                  <XCircle />
                </button>
              </div>

              <div className="p-8 space-y-4">
                {!shieldCategory ? (
                  <div className="space-y-3">
                    <button 
                      onClick={() => setShieldCategory('sega')}
                      className="w-full p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-4 text-white">
                        <div className="bg-red-500/20 p-3 rounded-xl"><User className="text-red-500" /></div>
                        <span className="font-black text-lg">{language === 'am' ? 'የራስ እርካታ (ሴጋ)' : 'Self-Satisfaction'}</span>
                      </div>
                      <ChevronRight className="group-hover:translate-x-2 transition-transform text-gray-400" />
                    </button>
                    <button 
                      onClick={() => setShieldCategory('addiction')}
                      className="w-full p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-4 text-white">
                        <div className="bg-orange-500/20 p-3 rounded-xl"><Activity className="text-orange-500" /></div>
                        <span className="font-black text-lg">{language === 'am' ? 'የሱስ ስሜት' : 'Addiction Urge'}</span>
                      </div>
                      <ChevronRight className="group-hover:translate-x-2 transition-transform text-gray-400" />
                    </button>
                    <button 
                      onClick={() => setShieldCategory('depression')}
                      className="w-full p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-4 text-white">
                        <div className="bg-blue-500/20 p-3 rounded-xl"><Frown className="text-blue-500" /></div>
                        <span className="font-black text-lg">{language === 'am' ? 'ድብርት / ጭንቀት' : 'Depression / Anxiety'}</span>
                      </div>
                      <ChevronRight className="group-hover:translate-x-2 transition-transform text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <button 
                      onClick={() => setShieldCategory(null)}
                      className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
                    >
                      <ChevronRight className="rotate-180" size={16} /> Back
                    </button>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 shadow-inner">
                      <h4 className="text-2xl font-black text-white mb-6">
                        {content.shieldOptions[shieldCategory].title}
                      </h4>
                      
                      {shieldCategory === 'depression' ? (
                        <div className="space-y-6">
                           <div className="space-y-3">
                              {content.shieldOptions.depression.advice.map((a, i) => (
                                <p key={i} className="flex items-start gap-3 text-lg text-white/90 leading-relaxed font-medium">
                                  <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span> {a}
                                </p>
                              ))}
                           </div>
                           
                           <div className="bg-blue-600/10 border border-blue-500/30 p-5 rounded-xl space-y-4 shadow-lg">
                              <p className="font-black text-blue-400 flex items-center gap-2 text-sm uppercase tracking-widest">
                                <Activity size={18} /> 5-4-3-2-1 Technique
                              </p>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white/80 font-medium"><Eye size={18} className="text-blue-400" /> {content.shieldOptions.depression.technique[0]}</div>
                                <div className="flex items-center gap-3 text-white/80 font-medium"><Hand size={18} className="text-blue-400" /> {content.shieldOptions.depression.technique[1]}</div>
                                <div className="flex items-center gap-3 text-white/80 font-medium"><Ear size={18} className="text-blue-400" /> {content.shieldOptions.depression.technique[2]}</div>
                                <div className="flex items-center gap-3 text-white/80 font-medium"><Wind size={18} className="text-blue-400" /> {content.shieldOptions.depression.technique[3]}</div>
                                <div className="flex items-center gap-3 text-white/80 font-medium"><Utensils size={18} className="text-blue-400" /> {content.shieldOptions.depression.technique[4]}</div>
                              </div>
                           </div>

                           <div className="p-4 bg-green-600/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                              <Phone className="text-green-500" />
                              <span className="font-black text-green-100">{language === 'am' ? 'ብቻህን አትሁን - ለሚያምንህ ሰው ደውል' : "Don't be alone - Call someone you trust"}</span>
                           </div>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {content.shieldOptions[shieldCategory].advice.map((adv, i) => (
                            <div key={i} className="flex items-start gap-4 text-lg text-white/90 leading-relaxed font-medium">
                               <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-black text-sm">{i+1}</span>
                               <p className="mt-1">{adv}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setShowShield(false)}
                      className="w-full bg-white text-[#0B1B2B] py-4 rounded-xl font-black shadow-2xl hover:bg-gray-200 transition-all active:scale-95 text-lg"
                    >
                      {language === 'am' ? 'ተረድቻለሁ (አሁን እወጣለሁ)' : 'I Understand (Taking action now)'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArifAychekulmHabitBuilder;