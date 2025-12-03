import { GenderType } from '../types';

// Gendered success messages
export const getSuccessMessage = (gender: GenderType, name?: string): string => {
  const messages = {
    boy: [
      'מצוין!',
      'יופי!',
      'נהדר!',
      'אלוף!',
      'וואו!',
      'בול!',
    ],
    girl: [
      'מצוינת!',
      'יופי!',
      'נהדרת!',
      'אלופה!',
      'וואו!',
      'בול!',
    ]
  };

  const baseMessage = messages[gender][Math.floor(Math.random() * messages[gender].length)];
  return name ? `${baseMessage} ${name}!` : `${baseMessage}!`;
};

// Gendered encouragement messages
export const getEncouragementMessage = (gender: GenderType, name?: string): string => {
  const messages = {
    boy: [
      'אתה יכול!',
      'נסה שוב!',
      'כמעט!',
      'אל תוותר!',
      'אתה בדרך הנכונה!',
    ],
    girl: [
      'את יכולה!',
      'נסי שוב!',
      'כמעט!',
      'אל תוותרי!',
      'את בדרך הנכונה!',
    ]
  };

  const baseMessage = messages[gender][Math.floor(Math.random() * messages[gender].length)];
  return name ? `${name}, ${baseMessage}` : baseMessage;
};

// Gendered "try again" messages
export const getTryAgainMessage = (gender: GenderType): string => {
  const messages = {
    boy: [
      'בדוק שוב',
      'נסה פעם נוספת',
      'חשוב רגע',
      'תסתכל שוב',
    ],
    girl: [
      'בדקי שוב',
      'נסי פעם נוספת',
      'חשבי רגע',
      'תסתכלי שוב',
    ]
  };

  return messages[gender][Math.floor(Math.random() * messages[gender].length)];
};

// Time-based greeting
export const getTimeGreeting = (gender: GenderType, name: string): string => {
  const hour = new Date().getHours();

  let greeting: string;
  if (hour >= 5 && hour < 12) {
    greeting = 'בוקר טוב';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'צהריים טובים';
  } else if (hour >= 17 && hour < 21) {
    greeting = 'ערב טוב';
  } else {
    greeting = 'לילה טוב';
  }

  const suffix = gender === 'boy' ? 'מוכן ללמוד?' : 'מוכנה ללמוד?';

  return `${greeting} ${name}! ${suffix}`;
};

// Gendered "well done, code cracked" message
export const getCodeCrackedMessage = (gender: GenderType, name?: string): string => {
  const messages = {
    boy: [
      'הקוד פוצח!',
      'פצחת את הכספת!',
      'עשית את זה!',
    ],
    girl: [
      'הקוד פוצח!',
      'פצחת את הכספת!',
      'עשית את זה!',
    ]
  };

  const baseMessage = messages[gender][Math.floor(Math.random() * messages[gender].length)];
  const successWord = gender === 'boy' ? 'מצוין' : 'מצוינת';

  return name ? `${successWord} ${name}! ${baseMessage}` : `${successWord}! ${baseMessage}`;
};

// Gendered hint prefix
export const getHintPrefix = (gender: GenderType): string => {
  return gender === 'boy' ? 'שים לב' : 'שימי לב';
};

// Gendered "read the number" instruction
export const getReadAgainMessage = (gender: GenderType): string => {
  return gender === 'boy' ? 'קרא שוב את המספר' : 'קראי שוב את המספר';
};
