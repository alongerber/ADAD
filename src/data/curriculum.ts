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
  // נושא 1: הכרת שברים בסיסיים (שלבים 1-6)
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
    id: 'frac_half_2',
    mode: 'fraction_fill',
    difficulty: 2,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'עוד חצי!',
    narrative: '⚗️ עוד ניסוי! המדען צריך שוב חצי בקבוק!',
    explanation: 'חצי זה כשמחלקים לשני חלקים שווים ולוקחים חלק אחד.',
    tip: 'חצי = 1 מתוך 2',
    notebookHint: 'חצי מהבקבוק - בדיוק באמצע!'
  },
  {
    id: 'frac_quarter',
    mode: 'fraction_fill',
    difficulty: 3,
    targetNumerator: 1,
    targetDenominator: 4,
    title: 'רבע שיקוי',
    narrative: '🔬 המתכון דורש רק רבע מהבקבוק!',
    explanation: 'רבע זה כשמחלקים משהו ל-4 חלקים שווים ולוקחים חלק אחד.',
    tip: 'רבע = ¼ = חלק אחד מתוך ארבעה',
    notebookHint: 'רבע זה פחות מחצי!'
  },
  {
    id: 'frac_two_quarters',
    mode: 'fraction_fill',
    difficulty: 4,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'שני רבעים',
    narrative: '🎯 כמה זה שני רבעים?',
    explanation: 'שני רבעים = 2/4 = חצי!',
    tip: '2/4 = 1/2 - שברים שונים יכולים להיות שווים!',
    notebookHint: 'שני רבעים = חצי!'
  },
  {
    id: 'frac_three_quarters',
    mode: 'fraction_fill',
    difficulty: 5,
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
    difficulty: 6,
    targetNumerator: 1,
    targetDenominator: 1,
    title: 'שיקוי מלא!',
    narrative: '🌟 המשימה הגדולה: למלא את כל הבקבוק!',
    explanation: 'שלם זה כשלוקחים את הכל - כל החלקים.',
    tip: '1 שלם = כל הבקבוק מלא!',
    notebookHint: 'מלא עד הסוף!'
  },

  // ========================================
  // נושא 2: תרגול וחזרה (שלבים 7-12)
  // ========================================
  {
    id: 'frac_practice_half',
    mode: 'fraction_fill',
    difficulty: 7,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'חזרה: חצי',
    narrative: '📝 בוא נתרגל! מלא חצי בקבוק.',
    explanation: 'חצי = חלק אחד מתוך שניים.',
    tip: 'חצי = ½',
    notebookHint: 'כבר למדנו! חצי = באמצע.'
  },
  {
    id: 'frac_practice_quarter',
    mode: 'fraction_fill',
    difficulty: 8,
    targetNumerator: 1,
    targetDenominator: 4,
    title: 'חזרה: רבע',
    narrative: '📝 תרגול! מלא רבע בקבוק.',
    explanation: 'רבע = חלק אחד מתוך ארבעה.',
    tip: 'רבע = ¼ = פחות מחצי!',
    notebookHint: 'רבע קטן מחצי.'
  },
  {
    id: 'frac_practice_3q',
    mode: 'fraction_fill',
    difficulty: 9,
    targetNumerator: 3,
    targetDenominator: 4,
    title: 'חזרה: ¾',
    narrative: '📝 תרגול אחרון! מלא שלושה רבעים.',
    explanation: 'שלושה רבעים = 3 חלקים מתוך 4.',
    tip: '¾ = קרוב לשלם!',
    notebookHint: 'שלושה רבעים - כמעט מלא!'
  },
  {
    id: 'frac_compare_1',
    mode: 'fraction_fill',
    difficulty: 10,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'מי גדול יותר?',
    narrative: '🤔 ½ או ¼ - מה גדול יותר? מלא את הגדול!',
    explanation: 'כשהמכנה גדול יותר, החלקים קטנים יותר!',
    tip: '½ > ¼ כי חצי גדול מרבע',
    notebookHint: 'חצי גדול יותר מרבע!'
  },
  {
    id: 'frac_compare_2',
    mode: 'fraction_fill',
    difficulty: 11,
    targetNumerator: 3,
    targetDenominator: 4,
    title: 'עוד השוואה!',
    narrative: '🤔 ¾ או ½ - מי מנצח? מלא את הגדול!',
    explanation: 'שלושה רבעים גדולים מחצי!',
    tip: '¾ > ½ כי שלושה רבעים = 75% וחצי = 50%',
    notebookHint: 'שלושה רבעים גדולים מחצי!'
  },
  {
    id: 'frac_equal_1',
    mode: 'fraction_fill',
    difficulty: 12,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'שברים שווים',
    narrative: '🎯 2/4 שווה ל...? מלא את השבר השווה!',
    explanation: '2/4 = 1/2 - אפשר לצמצם שברים!',
    tip: 'שני רבעים = חצי אחד',
    notebookHint: '2/4 = 1/2'
  },

  // ========================================
  // נושא 3: חיבור שברים (שלבים 13-18)
  // ========================================
  {
    id: 'frac_add_1',
    mode: 'fraction_fill',
    difficulty: 13,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'חיבור פשוט',
    narrative: '➕ רבע + רבע = ?',
    explanation: 'כשמחברים שברים עם אותו מכנה, מחברים רק את המונים!',
    tip: '¼ + ¼ = 2/4 = ½',
    notebookHint: 'רבע + רבע = שני רבעים = חצי!'
  },
  {
    id: 'frac_add_2',
    mode: 'fraction_fill',
    difficulty: 14,
    targetNumerator: 3,
    targetDenominator: 4,
    title: 'עוד חיבור',
    narrative: '➕ ½ + ¼ = ?',
    explanation: '½ = 2/4, אז ½ + ¼ = 2/4 + 1/4 = 3/4',
    tip: 'קודם הופכים לאותו מכנה!',
    notebookHint: 'חצי = שני רבעים. עכשיו חבר!'
  },
  {
    id: 'frac_add_3',
    mode: 'fraction_fill',
    difficulty: 15,
    targetNumerator: 1,
    targetDenominator: 1,
    title: 'חיבור לשלם',
    narrative: '➕ ½ + ½ = ?',
    explanation: 'חצי + חצי = שלם!',
    tip: '½ + ½ = 1',
    notebookHint: 'שני חצאים = אחד שלם!'
  },
  {
    id: 'frac_add_4',
    mode: 'fraction_fill',
    difficulty: 16,
    targetNumerator: 1,
    targetDenominator: 1,
    title: 'ארבעה רבעים',
    narrative: '➕ ¼ + ¼ + ¼ + ¼ = ?',
    explanation: 'ארבעה רבעים = שלם!',
    tip: '4/4 = 1',
    notebookHint: 'ארבעה רבעים = אחד שלם!'
  },
  {
    id: 'frac_add_5',
    mode: 'fraction_fill',
    difficulty: 17,
    targetNumerator: 3,
    targetDenominator: 4,
    title: 'חיבור מתקדם',
    narrative: '➕ ¼ + ½ = ?',
    explanation: 'קודם הופכים ל-¼ + 2/4 = 3/4',
    tip: 'חצי = שני רבעים!',
    notebookHint: 'רבע + שני רבעים = שלושה רבעים!'
  },
  {
    id: 'frac_add_6',
    mode: 'fraction_fill',
    difficulty: 18,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'תרגיל סיום',
    narrative: '➕ ¼ + ¼ = ?',
    explanation: 'רבע + רבע = שני רבעים = חצי!',
    tip: '1/4 + 1/4 = 2/4 = 1/2',
    notebookHint: 'שני רבעים = חצי!'
  },

  // ========================================
  // נושא 4: אתגרים (שלבים 19-24)
  // ========================================
  {
    id: 'frac_challenge_1',
    mode: 'fraction_fill',
    difficulty: 19,
    targetNumerator: 1,
    targetDenominator: 4,
    title: 'אתגר 1',
    narrative: '🏆 חצי פחות רבע = ?',
    explanation: '½ - ¼ = 2/4 - 1/4 = 1/4',
    tip: 'חצי = שני רבעים. שני רבעים פחות רבע = רבע!',
    notebookHint: '2/4 - 1/4 = 1/4'
  },
  {
    id: 'frac_challenge_2',
    mode: 'fraction_fill',
    difficulty: 20,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'אתגר 2',
    narrative: '🏆 ¾ פחות ¼ = ?',
    explanation: '¾ - ¼ = 2/4 = ½',
    tip: 'שלושה רבעים פחות רבע = שני רבעים = חצי!',
    notebookHint: '3/4 - 1/4 = 2/4 = 1/2'
  },
  {
    id: 'frac_challenge_3',
    mode: 'fraction_fill',
    difficulty: 21,
    targetNumerator: 1,
    targetDenominator: 4,
    title: 'אתגר 3',
    narrative: '🏆 שלם פחות ¾ = ?',
    explanation: '1 - ¾ = 4/4 - 3/4 = 1/4',
    tip: 'שלם = ארבעה רבעים!',
    notebookHint: '4/4 - 3/4 = 1/4'
  },
  {
    id: 'frac_challenge_4',
    mode: 'fraction_fill',
    difficulty: 22,
    targetNumerator: 1,
    targetDenominator: 2,
    title: 'אתגר 4',
    narrative: '🏆 שלם פחות ½ = ?',
    explanation: '1 - ½ = ½',
    tip: 'חצי מחצי = חצי!',
    notebookHint: 'אחד פחות חצי = חצי!'
  },
  {
    id: 'frac_challenge_5',
    mode: 'fraction_fill',
    difficulty: 23,
    targetNumerator: 3,
    targetDenominator: 4,
    title: 'אתגר 5',
    narrative: '🏆 ¼ + ¼ + ¼ = ?',
    explanation: 'שלושה רבעים!',
    tip: '1/4 + 1/4 + 1/4 = 3/4',
    notebookHint: 'רבע + רבע + רבע = שלושה רבעים!'
  },
  {
    id: 'frac_master',
    mode: 'fraction_fill',
    difficulty: 24,
    targetNumerator: 1,
    targetDenominator: 1,
    title: '🎓 מאסטר!',
    narrative: '🎓 השלב האחרון! ½ + ¼ + ¼ = ?',
    explanation: 'חצי = שני רבעים. 2/4 + 1/4 + 1/4 = 4/4 = 1!',
    tip: 'הכל ביחד = שלם!',
    notebookHint: 'חצי + רבע + רבע = שלם!'
  }
];

// Topic descriptions for display
export const VAULT_TOPICS = [
  { icon: '🔢', title: 'כתיבת מספרים', levels: '1-12', description: 'ללמוד לכתוב מספרים במילים ובספרות' },
  { icon: '➖', title: 'חיסור במאונך', levels: '13-24', description: 'חיסור עם פריטה ובלי פריטה' }
];

export const LAB_TOPICS = [
  { icon: '½', title: 'הכרת שברים', levels: '1-6', description: 'חצי, רבע, שלושה רבעים ושלם' },
  { icon: '📝', title: 'תרגול והשוואה', levels: '7-12', description: 'חזרה והשוואת שברים' },
  { icon: '➕', title: 'חיבור שברים', levels: '13-18', description: 'לחבר שברים עם אותו מכנה' },
  { icon: '🏆', title: 'אתגרים', levels: '19-24', description: 'חיסור שברים ותרגילים מתקדמים' }
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
  // נושא 1: כתיבת מספרים בסיסי (שלבים 1-6)
  // ========================================
  {
    id: 'lvl_num_simple_3',
    mode: 'number_input',
    difficulty: 1,
    instruction: 'ארבע מאות עשרים וחמש',
    target: [4, 2, 5],
    notebookHint: 'קרא את המספר לאט: מאות, עשרות, יחידות.'
  },
  {
    id: 'lvl_num_simple_3b',
    mode: 'number_input',
    difficulty: 2,
    instruction: 'שש מאות שבעים ושמונה',
    target: [6, 7, 8],
    notebookHint: 'מאות, עשרות, יחידות - פשוט!'
  },
  {
    id: 'lvl_num_simple_4',
    mode: 'number_input',
    difficulty: 3,
    instruction: 'אלף שמונה מאות שלושים ושש',
    target: [1, 8, 3, 6],
    notebookHint: 'התחל מהאלפים, אחר כך מאות, עשרות, יחידות.'
  },
  {
    id: 'lvl_num_simple_4b',
    mode: 'number_input',
    difficulty: 4,
    instruction: 'שלושת אלפים חמש מאות שישים ושתיים',
    target: [3, 5, 6, 2],
    notebookHint: 'אלפים, מאות, עשרות, יחידות.'
  },
  {
    id: 'lvl_num_zero_end',
    mode: 'number_input',
    difficulty: 5,
    instruction: 'שלוש מאות וחמישים',
    target: [3, 5, 0],
    notebookHint: 'חמישים = חמש עשרות ואפס יחידות.'
  },
  {
    id: 'lvl_num_zeros_end',
    mode: 'number_input',
    difficulty: 6,
    instruction: 'שבעת אלפים ומאתיים',
    target: [7, 2, 0, 0],
    notebookHint: 'מאתיים = 200. מה יש בעשרות וביחידות?'
  },

  // ========================================
  // נושא 2: מלכודות האפס (שלבים 7-12)
  // ========================================
  {
    id: 'lvl_zero_trap_1',
    mode: 'number_input',
    difficulty: 7,
    instruction: 'שלושת אלפים וחמישים',
    target: [3, 0, 5, 0],
    notebookHint: 'שים לב: האם יש מאות במספר הזה?'
  },
  {
    id: 'lvl_zero_trap_1b',
    mode: 'number_input',
    difficulty: 8,
    instruction: 'אלפיים ושבע',
    target: [2, 0, 0, 7],
    notebookHint: 'אלפיים = 2000. ושבע = 7. מה באמצע?'
  },
  {
    id: 'lvl_zero_trap_2',
    mode: 'number_input',
    difficulty: 9,
    instruction: 'ארבעים אלף וארבע',
    target: [4, 0, 0, 0, 4],
    notebookHint: 'ארבעים אלף = 40,000. וארבע = 4. מה באמצע?'
  },
  {
    id: 'lvl_zero_trap_2b',
    mode: 'number_input',
    difficulty: 10,
    instruction: 'עשרת אלפים ומאה',
    target: [1, 0, 1, 0, 0],
    notebookHint: 'עשרת אלפים = 10,000. מאה = 100.'
  },
  {
    id: 'lvl_zero_trap_3',
    mode: 'number_input',
    difficulty: 11,
    instruction: 'חמישים אלף ושלוש מאות',
    target: [5, 0, 3, 0, 0],
    notebookHint: 'חמישים אלף = 50,000. שלוש מאות = 300.'
  },
  {
    id: 'lvl_zero_trap_4',
    mode: 'number_input',
    difficulty: 12,
    instruction: 'שישים ואחד אלף ושבע עשרה',
    target: [6, 1, 0, 1, 7],
    notebookHint: 'שישים ואחד אלף = 61,000. שבע עשרה = 17.'
  },

  // ========================================
  // נושא 3: חיסור בסיסי (שלבים 13-18)
  // ========================================
  {
    id: 'lvl_sub_simple_2',
    mode: 'vertical_math',
    difficulty: 13,
    top: [8, 9],
    bottom: [3, 4],
    notebookHint: 'חיסור פשוט! חסר כל ספרה בנפרד.'
  },
  {
    id: 'lvl_sub_simple_2b',
    mode: 'vertical_math',
    difficulty: 14,
    top: [7, 6],
    bottom: [2, 3],
    notebookHint: '6-3=3, 7-2=5. קל!'
  },
  {
    id: 'lvl_sub_simple_3',
    mode: 'vertical_math',
    difficulty: 15,
    top: [5, 6, 7],
    bottom: [2, 3, 4],
    notebookHint: 'אותו דבר! מתחילים מימין, ספרה ספרה.'
  },
  {
    id: 'lvl_sub_simple_3b',
    mode: 'vertical_math',
    difficulty: 16,
    top: [9, 8, 5],
    bottom: [4, 2, 3],
    notebookHint: 'חסר מימין לשמאל: 5-3, 8-2, 9-4.'
  },
  {
    id: 'lvl_sub_borrow_intro',
    mode: 'vertical_math',
    difficulty: 17,
    top: [4, 3],
    bottom: [1, 5],
    notebookHint: '3 פחות 5? אי אפשר! צריך לפרוט.'
  },
  {
    id: 'lvl_sub_borrow_1',
    mode: 'vertical_math',
    difficulty: 18,
    top: [4, 5, 2],
    bottom: [1, 3, 8],
    notebookHint: '2 פחות 8? צריך לפרוט! לחץ על העשרות.'
  },

  // ========================================
  // נושא 4: פריטה מתקדמת (שלבים 19-24)
  // ========================================
  {
    id: 'lvl_sub_borrow_tens',
    mode: 'vertical_math',
    difficulty: 19,
    top: [5, 3, 4],
    bottom: [2, 7, 1],
    notebookHint: '3 פחות 7? צריך לפרוט מהמאות!'
  },
  {
    id: 'lvl_sub_borrow_tens_b',
    mode: 'vertical_math',
    difficulty: 20,
    top: [7, 2, 6],
    bottom: [3, 8, 4],
    notebookHint: '2 פחות 8? פרוט מהמאות!'
  },
  {
    id: 'lvl_sub_borrow_double',
    mode: 'vertical_math',
    difficulty: 21,
    top: [5, 2, 3],
    bottom: [1, 6, 8],
    notebookHint: 'פה צריך לפרוט פעמיים! קודם באחדות, אחר כך בעשרות.'
  },
  {
    id: 'lvl_sub_borrow_double_b',
    mode: 'vertical_math',
    difficulty: 22,
    top: [6, 1, 4],
    bottom: [2, 7, 9],
    notebookHint: 'פריטה כפולה! קודם 4-9, אחר כך 1-7.'
  },
  {
    id: 'lvl_sub_borrow_zero',
    mode: 'vertical_math',
    difficulty: 23,
    top: [5, 0, 3],
    bottom: [1, 2, 7],
    notebookHint: 'אופס! יש 0 בעשרות. מאיפה נפרוט?'
  },
  {
    id: 'lvl_sub_master',
    mode: 'vertical_math',
    difficulty: 24,
    top: [8, 0, 0],
    bottom: [2, 4, 5],
    notebookHint: '🎓 שלב אתגר! שני אפסים באמצע. בהצלחה!'
  }
];
