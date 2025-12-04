// =============================================
// טיפוסים למערכת הלמידה החדשה - שברים כיתה ד'
// =============================================

// --- סוגי התרגול (6 סוגים) ---
export type PracticeType =
  | 'beaker'      // מילוי כוסית (קיים)
  | 'choice'      // בחירה מרובה
  | 'tap'         // ספירת הקשות
  | 'match'       // התאמה בגרירה
  | 'truefalse'   // נכון/לא נכון
  | 'sort';       // סידור בסדר

// --- סוגי שלבים ---
export type StepType =
  | 'learning'    // שלב למידה (סיפור, גילוי, הסבר)
  | 'practice'    // שלב תרגול
  | 'mastery';    // מבחן שליטה

// --- סוגי שקפי למידה ---
export type LearningSlideType =
  | 'story'       // סיפור פתיחה - למה צריך את זה?
  | 'discovery'   // גילוי מודרך - שאלות מנחות
  | 'visual'      // הדגמה ויזואלית
  | 'summary';    // סיכום

// =============================================
// מבנה שקף למידה
// =============================================
export interface LearningSlide {
  id: string;
  type: LearningSlideType;
  title: string;
  // תוכן דינמי - יכול להיות טקסט, שאלה, או ויזואל
  content: {
    text?: string;           // טקסט ראשי
    subtext?: string;        // טקסט משני
    question?: string;       // שאלה מנחה (לגילוי)
    visual?: VisualContent;  // תוכן ויזואלי
    highlight?: string;      // טקסט מודגש
    emoji?: string;          // אימוג'י מרכזי
  };
  // אנימציה
  animation?: 'fade' | 'slide' | 'bounce' | 'pulse';
  // השהיה לפני הצגת אלמנטים (ms)
  delay?: number;
}

// =============================================
// תוכן ויזואלי
// =============================================
export interface VisualContent {
  type: 'pizza' | 'beaker' | 'cake' | 'chocolate' | 'fraction' | 'comparison' | 'custom';
  // פרמטרים לפי סוג
  props?: {
    slices?: number;           // כמה חלקים
    filled?: number;           // כמה מלאים
    numerator?: number;        // מונה
    denominator?: number;      // מכנה
    showLabels?: boolean;      // להציג תוויות
    animate?: boolean;         // אנימציה
    comparison?: {             // להשוואה
      left: { n: number; d: number };
      right: { n: number; d: number };
      operator?: '>' | '<' | '=' | '?';
    };
  };
}

// =============================================
// מבנה שאלת תרגול
// =============================================
export interface PracticeQuestion {
  id: string;
  type: PracticeType;
  difficulty: number; // 1-5

  // תוכן השאלה
  question: string;           // שאלה בטקסט
  narrative?: string;         // סיפור קצר (אופציונלי)
  visual?: VisualContent;     // ויזואל (אופציונלי)

  // תשובה
  answer: PracticeAnswer;

  // עזרה
  hint?: string;              // רמז
  explanation?: string;       // הסבר לאחר תשובה
}

// --- סוגי תשובות לפי סוג תרגול ---
export type PracticeAnswer =
  | BeakerAnswer
  | ChoiceAnswer
  | TapAnswer
  | MatchAnswer
  | TrueFalseAnswer
  | SortAnswer;

export interface BeakerAnswer {
  type: 'beaker';
  numerator?: number;
  denominator?: number;
  targetFill?: { n: number; d: number };
}

export interface ChoiceAnswer {
  type: 'choice';
  correctIndex: number;      // אינדקס התשובה הנכונה
  options: ChoiceOption[];   // אפשרויות
}

export interface ChoiceOption {
  text?: string;             // טקסט
  fraction?: { n: number; d: number }; // שבר
  visual?: VisualContent;    // ויזואל
  isCorrect?: boolean;       // האם נכון (לצורך הצגה)
}

export interface TapAnswer {
  type: 'tap';
  targetCount: number;       // כמה צריך להקיש
  totalParts: number;        // סה"כ חלקים
}

export interface MatchAnswer {
  type: 'match';
  pairs: MatchPair[];        // זוגות להתאמה
}

export interface MatchPair {
  left: string | { n: number; d: number };   // צד שמאל (שבר או טקסט)
  right: VisualContent | string | { n: number; d: number };  // צד ימין (ויזואל, טקסט או שבר)
}

export interface TrueFalseAnswer {
  type: 'truefalse';
  isTrue: boolean;           // האם הטענה נכונה
  statement: string;         // הטענה
}

export interface SortItem {
  id: string;
  fraction: { n: number; d: number };
  value: number;
  text?: string;  // תווית טקסט אופציונלית
}

export interface SortAnswer {
  type: 'sort';
  correctOrder?: (string | { n: number; d: number })[]; // הסדר הנכון (deprecated)
  items: SortItem[] | (string | { n: number; d: number })[];  // פריטים לסידור
  direction?: 'ascending' | 'descending';  // כיוון המיון
}

// =============================================
// מבנה שלב בודד
// =============================================
export interface LearningStep {
  id: string;
  type: 'learning';
  title: string;
  slides: LearningSlide[];
}

export interface PracticeStep {
  id: string;
  type: 'practice';
  title: string;
  practiceType: PracticeType;
  questions: PracticeQuestion[];
  // כמה תשובות נכונות נדרשות לעבור
  requiredCorrect?: number;
}

export interface MasteryStep {
  id: string;
  type: 'mastery';
  title: string;
  questions: PracticeQuestion[]; // מיקס של סוגי שאלות
  passingScore: number;          // אחוז מינימלי (ברירת מחדל 80)
  // מה קורה אם נכשלים
  onFail: 'retry' | 'review';    // לנסות שוב או לחזור ללמוד
}

export type UnitStep = LearningStep | PracticeStep | MasteryStep;

// =============================================
// מבנה יחידת לימוד
// =============================================
export interface LearningUnit {
  id: string;
  number: number;              // מספר היחידה (1-8)
  title: string;               // כותרת היחידה
  description: string;         // תיאור קצר
  icon: string;                // אייקון/אימוג'י

  // מטרות למידה
  objectives: string[];        // מה הילד ילמד

  // דרישות קדם
  prerequisites?: string[];    // יחידות קודמות נדרשות

  // שלבי היחידה
  steps: UnitStep[];

  // ידע נדרש בסיום
  masterySkills: string[];     // מה צריך לדעת בסוף
}

// =============================================
// מבנה קוריקולום מלא
// =============================================
export interface Curriculum {
  id: string;
  subject: string;             // נושא (שברים)
  grade: number;               // כיתה
  title: string;               // כותרת
  description: string;         // תיאור

  units: LearningUnit[];       // יחידות הלימוד

  // מטא-דאטה
  totalSteps: number;          // סה"כ שלבים
  estimatedMinutes: number;    // זמן משוער
}

// =============================================
// מצב התקדמות משתמש
// =============================================
export interface UnitProgress {
  unitId: string;
  currentStepIndex: number;    // באיזה שלב נמצא
  completedSteps: string[];    // שלבים שהושלמו
  masteryPassed: boolean;      // האם עבר מבחן שליטה
  masteryScore?: number;       // ציון במבחן
  attempts: number;            // ניסיונות
}

export interface CurriculumProgress {
  curriculumId: string;
  units: Record<string, UnitProgress>;
  currentUnitId: string;
  overallProgress: number;     // אחוז כללי
}
