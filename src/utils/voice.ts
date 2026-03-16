export const speakEnglish = (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  // Try to find a nice English voice
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith('en-'));
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const scheduleVoiceReminder = (name: string, planName: string, time: string, type: 'plan' | 'med' | 'work') => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hours, minutes, 0, 0);

  if (scheduledTime < now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const delay = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    let message = '';
    if (type === 'plan') {
      message = `Dear ${name}, your goal ${planName} has been reached. Have a great life movement.`;
    } else if (type === 'med') {
      message = `Dear ${name}, your medication time for ${planName} has arrived. Please take it. I wish you health, God bless you.`;
    } else if (type === 'work') {
       message = `Dear ${name}, wake up, next work time for ${planName} has arrived.`;
    }
    speakEnglish(message);
  }, delay);
};