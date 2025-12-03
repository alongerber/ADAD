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
  lastPlayedAt: string | null;   // ISO date string
}

export interface UserProfile {
  name: string;
  gender: GenderType;
  theme: ThemeType;
  progress: UserProgress;
}