export type LevelMode = 'vertical_math' | 'number_input';

export interface BaseLevel {
  id: string;
  mode: LevelMode;
  difficulty: number;
}

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
