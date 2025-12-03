export enum RoomType {
  LOBBY = 'LOBBY',
  LAB = 'LAB',
  VAULT = 'VAULT',
  COCKPIT = 'COCKPIT'
}

export interface GameState {
  currentRoom: RoomType;
  score: number;
}

export interface LabState {
  numerator: number;
  denominator: number;
  isCorrect: boolean;
}

export type ThemeType = 'scifi' | 'pop' | 'sports' | 'nature' | 'ocean' | 'candy';
export type GenderType = 'boy' | 'girl';

export interface UserProgress {
  completedLevels: string[];     // Array of completed level IDs
  currentVaultLevel: number;     // Current level index in vault
  totalScore: number;            // Accumulated score
  streak: number;                // Current streak (consecutive correct answers)
  maxStreak: number;             // Highest streak achieved
  lastPlayedAt: string | null;   // ISO date string
  unlockedAchievements: string[]; // Array of unlocked achievement IDs
  daysPlayed: number;            // Number of unique days played
  lastPlayDate: string | null;   // Last play date (YYYY-MM-DD)
  learnedTopics: string[];       // Array of topics that have been learned (e.g., 'lab_topic_1')
}

export interface UserProfile {
  name: string;
  gender: GenderType;
  theme: ThemeType;
  progress: UserProgress;
}