import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import BalegizePlanner from './BalegizePlanner';
import AyizonyMedicationReminder from './AyizonyMedicationReminder';
import ArifAychekulmHabitBuilder from './ArifAychekulmHabitBuilder';
import ArizSheqayPremium from './ArizSheqayPremium';
import Hero from './Hero';

interface ContentSectionsProps {
  activeSection: string;
}

const ContentSections: React.FC<ContentSectionsProps> = ({ activeSection }) => {
  // Check if the user is authenticated for some sections if needed, 
  // but for now we follow the routing logic provided.
  
  switch (activeSection) {
    case 'balegize':
      return <BalegizePlanner />;
    case 'ayizony':
      return <AyizonyMedicationReminder />;
    case 'arif':
      return <ArifAychekulmHabitBuilder />;
    case 'premium':
      return <ArizSheqayPremium />;
    default:
      return <Hero />;
  }
};

export default ContentSections;