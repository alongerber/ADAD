// Achievement definitions for מתמטי-ביס

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  condition: (stats: AchievementStats) => boolean;
  secret?: boolean; // Hidden until unlocked
}

export interface AchievementStats {
  totalLevelsCompleted: number;
  labLevelsCompleted: number;
  vaultLevelsCompleted: number;
  totalScore: number;
  currentStreak: number;
  maxStreak: number;
  daysPlayed: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ========================================
  // הישגים ראשונים (התחלה)
  // ========================================
  {
    id: 'first_step',
    icon: '🎯',
    title: 'צעד ראשון!',
    description: 'השלמת את השלב הראשון',
    condition: (s) => s.totalLevelsCompleted >= 1
  },
  {
    id: 'getting_started',
    icon: '🌟',
    title: 'מתחילים!',
    description: 'השלמת 5 שלבים',
    condition: (s) => s.totalLevelsCompleted >= 5
  },
  {
    id: 'on_a_roll',
    icon: '🔥',
    title: 'ברצף!',
    description: '3 תשובות נכונות ברצף',
    condition: (s) => s.currentStreak >= 3
  },

  // ========================================
  // הישגי מעבדת השברים
  // ========================================
  {
    id: 'fraction_explorer',
    icon: '🧪',
    title: 'חוקר שברים',
    description: 'השלמת 6 שלבים במעבדה',
    condition: (s) => s.labLevelsCompleted >= 6
  },
  {
    id: 'fraction_master',
    icon: '⚗️',
    title: 'מומחה שברים',
    description: 'השלמת 12 שלבים במעבדה',
    condition: (s) => s.labLevelsCompleted >= 12
  },
  {
    id: 'fraction_wizard',
    icon: '🧙',
    title: 'קוסם השברים',
    description: 'השלמת את כל שלבי המעבדה!',
    condition: (s) => s.labLevelsCompleted >= 24
  },

  // ========================================
  // הישגי הכספת
  // ========================================
  {
    id: 'vault_breaker',
    icon: '🔓',
    title: 'פורץ כספות',
    description: 'השלמת 6 שלבים בכספת',
    condition: (s) => s.vaultLevelsCompleted >= 6
  },
  {
    id: 'vault_expert',
    icon: '🔐',
    title: 'מומחה כספות',
    description: 'השלמת 12 שלבים בכספת',
    condition: (s) => s.vaultLevelsCompleted >= 12
  },
  {
    id: 'vault_master',
    icon: '🏆',
    title: 'אלוף הכספות',
    description: 'השלמת את כל שלבי הכספת!',
    condition: (s) => s.vaultLevelsCompleted >= 24
  },

  // ========================================
  // הישגי רצף
  // ========================================
  {
    id: 'streak_5',
    icon: '🔥',
    title: 'רצף חם!',
    description: '5 תשובות נכונות ברצף',
    condition: (s) => s.currentStreak >= 5 || s.maxStreak >= 5
  },
  {
    id: 'streak_10',
    icon: '💥',
    title: 'רצף מדהים!',
    description: '10 תשובות נכונות ברצף',
    condition: (s) => s.currentStreak >= 10 || s.maxStreak >= 10
  },
  {
    id: 'streak_20',
    icon: '⚡',
    title: 'בלתי ניתן לעצירה!',
    description: '20 תשובות נכונות ברצף',
    condition: (s) => s.currentStreak >= 20 || s.maxStreak >= 20
  },

  // ========================================
  // הישגי ניקוד
  // ========================================
  {
    id: 'score_100',
    icon: '💯',
    title: 'מאה!',
    description: 'צברת 100 נקודות',
    condition: (s) => s.totalScore >= 100
  },
  {
    id: 'score_250',
    icon: '🌟',
    title: 'כוכב עולה!',
    description: 'צברת 250 נקודות',
    condition: (s) => s.totalScore >= 250
  },
  {
    id: 'score_500',
    icon: '👑',
    title: 'מלך המתמטיקה!',
    description: 'צברת 500 נקודות',
    condition: (s) => s.totalScore >= 500
  },

  // ========================================
  // הישגי כלליים
  // ========================================
  {
    id: 'well_rounded',
    icon: '🎨',
    title: 'מגוון!',
    description: 'השלמת לפחות 3 שלבים בכל מודול',
    condition: (s) => s.labLevelsCompleted >= 3 && s.vaultLevelsCompleted >= 3
  },
  {
    id: 'half_way',
    icon: '🛤️',
    title: 'באמצע הדרך!',
    description: 'השלמת 24 שלבים סה"כ',
    condition: (s) => s.totalLevelsCompleted >= 24
  },
  {
    id: 'completionist',
    icon: '🎓',
    title: 'סיימת הכל!',
    description: 'השלמת את כל 48 השלבים!',
    condition: (s) => s.totalLevelsCompleted >= 48
  },

  // ========================================
  // הישגים סודיים
  // ========================================
  {
    id: 'persistent',
    icon: '💪',
    title: 'עקשן!',
    description: 'חזרת ללמוד יום נוסף',
    condition: (s) => s.daysPlayed >= 2,
    secret: true
  },
  {
    id: 'dedicated',
    icon: '📅',
    title: 'מסור!',
    description: 'למדת במשך 5 ימים',
    condition: (s) => s.daysPlayed >= 5,
    secret: true
  }
];

// Helper to check which achievements are newly unlocked
export function checkNewAchievements(
  stats: AchievementStats,
  existingAchievements: string[]
): Achievement[] {
  return ACHIEVEMENTS.filter(
    achievement =>
      !existingAchievements.includes(achievement.id) &&
      achievement.condition(stats)
  );
}
