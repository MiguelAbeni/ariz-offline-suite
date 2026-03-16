import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'am' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLanguageSet: boolean;
  setIsLanguageSet: (set: boolean) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  am: {
    welcome: "እንኳን በደህና መጡ",
    welcome_to_ariz: "እንኳን ወደ አሪዝ በደህና መጡ",
    selectLanguage: "ቋንቋ ይምረጡ",
    balegize: "ባለ ጊዜ",
    ayizony: "አይዞኝ",
    arifAychekulm: "አሪፍ አይቸኩልም",
    arizSheqay: "አሪዝ ሸቃይ",
    premium: "ፕሪሚየም",
    premium_badge: "አሪዝ ሸቃይ ፕሪሚየም",
    services: "አገልግሎቶች",
    login: "ይግቡ",
    register: "ይመዝገቡ",
    login_register: "ይመዝገቡ / ይግቡ",
    profile: "ፕሮፋይል",
    settings: "ሴቲንግ",
    logout: "ውጣ",
    auth_required_msg: "አገልግሎቶችን ለማግኘት መጀመሪያ ይመዝገቡ እና ይግቡ። የእርስዎ መረጃ በከፍተኛ ጥበቃ የተጠበቀ ነው።",
    military_grade: "የውሂብ ጥበቃ አገልግሎት በርቷል",
    get_started: "በነፃ ይጀምሩ",
    view_pricing: "ዋጋዎችን ይመልከቱ",
    open_now: "አሁን ይክፈቱ",
    planName: "የእቅድ ስም",
    time: "ሰዓት",
    add: "ጨምር",
    status: "ሁኔታ",
    success: "ተሳክቷል",
    fail: "አልተሳካም",
    streak: "ተከታታይ ስኬት",
    medName: "የመድኃኒት ስም",
    remindMe: "አስታውሰኝ",
    habitChallenge: "የ90 ቀን ቻሌንጅ",
    subscriptionInfo: "የ7 ቀን ነፃ ሙከራ አሎት። ከዚያ በኋላ በወር 2000 ETB።",
    paymentCBE: "የኢትዮጵያ ንግድ ባንክ",
    paymentTele: "ቴሌብር",
    paymentMpesa: "M-PESA",
    trialActive: "የ7 ቀን ሙከራ በርቷል",
    locked: "ሲስተሙ ተቆልፏል - እባክዎ ክፍያ ይፈጽሙ",
    share: "አጋራ",
    medals: "ሜዳሊያዎች",
    adminPanel: "የአስተዳዳሪ ፓናል",
    hero_title: "ህይወትዎን በ አሪዝ ያሳድጉ",
    hero_subtitle: "ለእቅድ፣ ለጤና ማሳሰቢያዎች እና ለልምድ ግንባታ የመጨረሻው ረዳት። የወደፊቱን የግል አስተዳደር በድምፅ አገልግሎት ይለማመዱ።",
    new_features: "አዲስ ፕሪሚየም ባሕርያት ተጨምረዋል",
    "nav.planner": "ባለ ጊዜ",
    "nav.medication": "አይዞኝ",
    "nav.habit": "አሪፍ አይቸኩልም",
    "nav.premium": "አሪዝ ሸቃይ",
    footer_desc: "የእለት ተእለት ጉዞዎን በዘመናዊ እቅድ፣ በጤና አያያዝ እና በልምድ ግንባታ በቴክኖሎጂ የታገዘ አገልግሎት እናቀርባለን።",
    footer_rights: "መብቱ በህግ የተጠበቀ ነው።",
    footer_made_with: "የተሰራው በኢትዮጵያ በ",
    support: "ድጋፍ",
    legal: "ህጋዊ",
    help_center: "የእርዳታ ማዕከል",
    payment_support: "የክፍያ ድጋፍ",
    system_lock_info: "ስለ ሲስተም መቆለፍ",
    trial_details: "የሙከራ ዝርዝሮች",
    terms_of_use: "የአጠቃቀም ደንቦች",
    privacy_policy: "የግላዊነት ፖሊሲ",
    cookie_policy: "የኩኪ ፖሊሲ",
    security: "ደህንነት",
    secure_tag: "ሴኩር",
  },
  en: {
    welcome: "Welcome",
    welcome_to_ariz: "Welcome to ARIZ",
    selectLanguage: "Select Language",
    balegize: "Balegize",
    ayizony: "Ayizony",
    arifAychekulm: "Arif Aychekulm",
    arizSheqay: "Ariz Sheqay",
    premium: "Premium",
    premium_badge: "Ariz Sheqay Premium",
    services: "Services",
    login: "Login",
    register: "Register",
    login_register: "Login / Register",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    auth_required_msg: "You need to register and login first to access the services. Your data is protected by ARIZ Security.",
    military_grade: "Data Isolation Enabled",
    get_started: "Get Started Free",
    view_pricing: "View Pricing",
    open_now: "Open Now",
    planName: "Plan Name",
    time: "Time",
    add: "Add",
    status: "Status",
    success: "Success",
    fail: "Failed",
    streak: "Streak",
    medName: "Medication Name",
    remindMe: "Remind Me",
    habitChallenge: "90-Day Habit Challenge",
    subscriptionInfo: "7-day free trial. Then 2000 ETB/month.",
    paymentCBE: "Commercial Bank of Ethiopia",
    paymentTele: "Telebirr",
    paymentMpesa: "M-PESA",
    trialActive: "Trial Active",
    locked: "System Locked - Please Pay",
    share: "Share",
    medals: "Medals",
    adminPanel: "Admin Panel",
    hero_title: "Elevate Your Life with ARIZ",
    hero_subtitle: "The ultimate companion for planning, health reminders, and habit building. Experience the future of personal management with voice services.",
    new_features: "New Premium Features Available",
    "nav.planner": "Balegize",
    "nav.medication": "Ayizony",
    "nav.habit": "Arif Aychekulm",
    "nav.premium": "Ariz Sheqay",
    footer_desc: "Empowering your daily journey through advanced planning, health management, and habit building with next-gen technology.",
    footer_rights: "All rights reserved.",
    footer_made_with: "Made with",
    support: "Support",
    legal: "Legal",
    help_center: "Help Center",
    payment_support: "Payment Support",
    system_lock_info: "System Lock Info",
    trial_details: "Trial Details",
    terms_of_use: "Terms of Use",
    privacy_policy: "Privacy Policy",
    cookie_policy: "Cookie Policy",
    security: "Security",
    secure_tag: "SECURE",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved as Language) === 'en' ? 'en' : 'am';
  });
  const [isLanguageSet, setIsLanguageSet] = useState(() => {
    return !!localStorage.getItem('app_lang_set');
  });

  useEffect(() => {
    localStorage.setItem('app_lang', language);
    if (isLanguageSet) {
      localStorage.setItem('app_lang_set', 'true');
    }
  }, [language, isLanguageSet]);

  const t = (key: string) => {
    if (!translations[language]) return translations['en'][key] || key;
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLanguageSet, setIsLanguageSet, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};