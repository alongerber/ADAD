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
  // Level 1: The Zero Trap (Thousands)
  {
    id: 'lvl_zero_1',
    mode: 'number_input',
    difficulty: 1,
    instruction: 'שלושת אלפים וחמישים', // 3050
    target: [3, 0, 5, 0],
    notebookHint: 'שים לב: האם יש מאות במספר?'
  },
  // Level 2: The Zero Trap (Ten Thousands)
  {
    id: 'lvl_zero_2',
    mode: 'number_input',
    difficulty: 2,
    instruction: 'ארבעים אלף וארבע', // 40004
    target: [4, 0, 0, 0, 4],
    notebookHint: 'טיפ: לכל ספרה יש "חדר" משלה.'
  },
  // Level 3: Vertical Math (Borrowing)
  {
    id: 'lvl_sub_1',
    mode: 'vertical_math',
    difficulty: 3,
    top: [4, 5, 2],
    bottom: [1, 3, 8],
    notebookHint: 'אם הספרה למעלה קטנה מדי, צריך לפרוט.'
  }
];