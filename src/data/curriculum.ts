export type LevelMode = 'vertical_math' | 'number_input' | 'fraction_fill';

export interface BaseLevel {
  id: string;
  mode: LevelMode;
  difficulty: number;
}

// ========================================
// שברים - מעבדת השברים
// ========================================

export interface FractionLevel extends BaseLevel {
  mode: 'fraction_fill';
  targetNumerator: number;
  targetDenominator: number;
  title: string;
  narrative: string;
  explanation: string;
  tip: string;
  notebookHint: string;
}

export const LAB_CURRICULUM: FractionLevel[] = [
  // ========================================
  // שלב 1: הכרת שברים בסיסיים
  // ========================================
  {
    id: 'frac_half',
    mode: 'fraction_fill',
    difficulty: 1,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'חצי שיקוי',
    narrative: '🧪 המדען צריך בדיוק חצי בקבוק שיקוי!',
    explanation: 'חצי זה כשמחלקים משהו ל-2 חלקים שווים ולוקחים חלק אחד.',
    tip: 'חצי = ½ = חלק אחד מתוך שניים',
    notebookHint: 'מלא את הבקבוק עד לחצי!'
  },
  {
    id: 'frac_quarter',
    mode: 'fraction_fill',
    difficulty: 2,
    targetNumerator: 1,
    targetDenominator: 4,
    title: 'רבע שיקוי',
    narrative: '🔬 המתכון דורש רק רבע מהבקבוק!',
    explanation: 'רבע זה כשמחלקים משהו ל-4 חלקים שווים ולוקחים חלק אחד.',
    tip: 'רבע = ¼ = חלק אחד מתוך ארבעה',
    notebookHint: 'רבע זה פחות מחצי!'
  },
  {
    id: 'frac_three_quarters',
    mode: 'fraction_fill',
    difficulty: 3,
    targetNumerator: 3,
    targetDenominator: 4,
    title: 'שלושה רבעים',
    narrative: '⚗️ כמעט מלא! צריך שלושה רבעים!',
    explanation: 'שלושה רבעים זה 3 חלקים מתוך 4.',
    tip: '¾ = שלושה חלקים מתוך ארבעה = יותר מחצי!',
    notebookHint: 'שלושה רבעים זה יותר מחצי אבל פחות משלם.'
  },
  {
    id: 'frac_whole',
    mode: 'fraction_fill',
    difficulty: 4,
    targetNumerator: 1,
    targetDenominator: 1,
    title: 'שיקוי מלא!',
    narrative: '🌟 המשימה הגדולה: למלא את כל הבקבוק!',
    explanation: 'שלם זה כשלוקחים את הכל - כל החלקים.',
    tip: '1 שלם = כל הבקבוק מלא!',
    notebookHint: 'מלא עד הסוף!'
  },

  // ========================================
  // שלב 2: השוואת שברים
  // ========================================
  {
    id: 'frac_compare_half_quarter',
    mode: 'fraction_fill',
    difficulty: 5,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'מי יותר גדול?',
    narrative: '🤔 חצי או רבע - מה יותר?',
    explanation: 'כשהמכנה (למטה) יותר גדול, החלקים יותר קטנים!',
    tip: '½ > ¼ כי חצי יותר גדול מרבע',
    notebookHint: 'תחשוב: עוגה חתוכה ל-2 או ל-4?'
  },
  {
    id: 'frac_two_quarters',
    mode: 'fraction_fill',
    difficulty: 6,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'שברים שווים!',
    narrative: '🎯 גלה את הסוד: שני רבעים שווים ל...',
    explanation: '2/4 = 1/2 - שברים שונים יכולים להיות שווים!',
    tip: 'שני רבעים = חצי = ½ = 2/4',
    notebookHint: 'תמלא חצי - זה גם שני רבעים!'
  },

  // ========================================
  // שלב 3: חיבור שברים פשוט
  // ========================================
  {
    id: 'frac_add_quarters_1',
    mode: 'fraction_fill',
    difficulty: 7,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'חיבור רבעים',
    narrative: '➕ רבע ועוד רבע = ?',
    explanation: 'כשמחברים שברים עם אותו מכנה, מחברים רק את המונים!',
    tip: '¼ + ¼ = 2/4 = ½',
    notebookHint: 'רבע + רבע = שני רבעים = חצי!'
  },
  {
    id: 'frac_add_quarters_2',
    mode: 'fraction_fill',
    difficulty: 8,
    targetNumerator: 3,
    targetDenominator: 4,
    title: 'עוד חיבור!',
    narrative: '➕ חצי ועוד רבע = ?',
    explanation: '½ = 2/4, אז ½ + ¼ = 2/4 + 1/4 = 3/4',
    tip: 'קודם הופכים לאותו מכנה, אחר כך מחברים!',
    notebookHint: 'חצי = שני רבעים. שני רבעים + רבע = ?'
  }
];

// Topic descriptions for display
export const VAULT_TOPICS = [
  { icon: '🔢', title: 'כתיבת מספרים', levels: '1-6', description: 'ללמוד לכתוב מספרים במילים ובספרות' },
  { icon: '➖', title: 'חיסור במאונך', levels: '7-12', description: 'חיסור עם פריטה ובלי פריטה' }
];

export const LAB_TOPICS = [
  { icon: '½', title: 'הכרת שברים', levels: '1-4', description: 'חצי, רבע, שלושה רבעים ושלם' },
  { icon: '⚖️', title: 'השוואת שברים', levels: '5-6', description: 'מי יותר גדול? שברים שווים' },
  { icon: '➕', title: 'חיבור שברים', levels: '7-8', description: 'לחבר שברים עם אותו מכנה' }
];

export interface VerticalMathLevel extends BaseLevel {
  mode: 'vertical_math';
  top: number[];    // e.g., [4, 5, 2]
  bottom: number[]; // e.g., [1, 3, 8]
  notebookHint: string;
}

export interface NumberInputLevel extends BaseLevel {
  mode: 'number_input';
  instruction: string; // "Three thousand and fifty"
  target: number[];    // [3, 0, 5, 0]
  notebookHint: string;
}

export type Level = VerticalMathLevel | NumberInputLevel;

export const VAULT_CURRICULUM: Level[] = [
  // ========================================
  // חלק א: כתיבת מספרים (מהקל לקשה)
  // ========================================

  // שלב 1: מספרים פשוטים - 3 ספרות (כל הספרות קיימות)
  {
    id: 'lvl_num_simple_3',
    mode: 'number_input',
    difficulty: 1,
    instruction: 'ארבע מאות עשרים וחמש',
    target: [4, 2, 5],
    notebookHint: 'קרא את המספר לאט: מאות, עשרות, יחידות.'
  },

  // שלב 2: מספרים פשוטים - 4 ספרות (כל הספרות קיימות)
  {
    id: 'lvl_num_simple_4',
    mode: 'number_input',
    difficulty: 2,
    instruction: 'אלף שמונה מאות שלושים ושש',
    target: [1, 8, 3, 6],
    notebookHint: 'התחל מהאלפים, אחר כך מאות, עשרות, יחידות.'
  },

  // שלב 3: אפס בסוף (האפס "נשמע")
  {
    id: 'lvl_num_zero_end',
    mode: 'number_input',
    difficulty: 3,
    instruction: 'שלוש מאות וחמישים',
    target: [3, 5, 0],
    notebookHint: 'חמישים = חמש עשרות ואפס יחידות.'
  },

  // שלב 4: אפסים בסוף (האפסים "נשמעים")
  {
    id: 'lvl_num_zeros_end',
    mode: 'number_input',
    difficulty: 4,
    instruction: 'שבעת אלפים ומאתיים',
    target: [7, 2, 0, 0],
    notebookHint: 'מאתיים = 200. מה יש בעשרות וביחידות?'
  },

  // שלב 5: מלכודת האפס - בסיסי (אפס "שקט" אחד)
  {
    id: 'lvl_zero_trap_1',
    mode: 'number_input',
    difficulty: 5,
    instruction: 'שלושת אלפים וחמישים',
    target: [3, 0, 5, 0],
    notebookHint: 'שים לב: האם יש מאות במספר הזה?'
  },

  // שלב 6: מלכודת האפס - מתקדם (כמה אפסים "שקטים")
  {
    id: 'lvl_zero_trap_2',
    mode: 'number_input',
    difficulty: 6,
    instruction: 'ארבעים אלף וארבע',
    target: [4, 0, 0, 0, 4],
    notebookHint: 'ארבעים אלף = 40,000. וארבע = 4. מה באמצע?'
  },

  // ========================================
  // חלק ב: חיסור במאונך (מהקל לקשה)
  // ========================================

  // שלב 7: חיסור פשוט - 2 ספרות (בלי פריטה)
  {
    id: 'lvl_sub_simple_2',
    mode: 'vertical_math',
    difficulty: 7,
    top: [8, 9],
    bottom: [3, 4],
    notebookHint: 'חיסור פשוט! חסר כל ספרה בנפרד.'
  },

  // שלב 8: חיסור פשוט - 3 ספרות (בלי פריטה)
  {
    id: 'lvl_sub_simple_3',
    mode: 'vertical_math',
    difficulty: 8,
    top: [5, 6, 7],
    bottom: [2, 3, 4],
    notebookHint: 'אותו דבר! מתחילים מימין, ספרה ספרה.'
  },

  // שלב 9: פריטה אחת - באחדות
  {
    id: 'lvl_sub_borrow_1',
    mode: 'vertical_math',
    difficulty: 9,
    top: [4, 5, 2],
    bottom: [1, 3, 8],
    notebookHint: '2 פחות 8? צריך לפרוט! לחץ על העשרות.'
  },

  // שלב 10: פריטה אחת - בעשרות
  {
    id: 'lvl_sub_borrow_tens',
    mode: 'vertical_math',
    difficulty: 10,
    top: [5, 3, 4],
    bottom: [2, 7, 1],
    notebookHint: '3 פחות 7? צריך לפרוט מהמאות!'
  },

  // שלב 11: פריטה כפולה
  {
    id: 'lvl_sub_borrow_double',
    mode: 'vertical_math',
    difficulty: 11,
    top: [5, 2, 3],
    bottom: [1, 6, 8],
    notebookHint: 'פה צריך לפרוט פעמיים! קודם באחדות, אחר כך בעשרות.'
  },

  // שלב 12: פריטה מעבר לאפס
  {
    id: 'lvl_sub_borrow_zero',
    mode: 'vertical_math',
    difficulty: 12,
    top: [5, 0, 3],
    bottom: [1, 2, 7],
    notebookHint: 'אופס! יש 0 בעשרות. מאיפה נפרוט?'
  }
];
