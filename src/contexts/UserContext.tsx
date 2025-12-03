import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, ThemeType, UserProgress } from '../types';
import { THEME_CONFIG } from '../constants';
import { checkNewAchievements, Achievement, AchievementStats } from '../data/achievements';

const DEFAULT_PROGRESS: UserProgress = {
  completedLevels: [],
  currentVaultLevel: 0,
  totalScore: 0,
  streak: 0,
  maxStreak: 0,
  lastPlayedAt: null,
  unlockedAchievements: [],
  daysPlayed: 0,
  lastPlayDate: null,
};

interface UserContextType {
  user: UserProfile | null;
  updateUser: (profile: UserProfile) => void;
  updateProgress: (updates: Partial<UserProgress>) => void;
  completeLevel: (levelId: string, score?: number) => void;
  clearUser: () => void;
  theme: typeof THEME_CONFIG['scifi']; // Helper to get current theme config
  newlyUnlockedAchievements: Achievement[];
  clearNewAchievements: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('biss_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: add progress if missing (for existing users)
        if (!parsed.progress) {
          parsed.progress = DEFAULT_PROGRESS;
        }
        // Migration: add new fields if missing
        if (!parsed.progress.maxStreak) parsed.progress.maxStreak = parsed.progress.streak || 0;
        if (!parsed.progress.unlockedAchievements) parsed.progress.unlockedAchievements = [];
        if (!parsed.progress.daysPlayed) parsed.progress.daysPlayed = 0;
        if (!parsed.progress.lastPlayDate) parsed.progress.lastPlayDate = null;
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
  }, []);

  const clearNewAchievements = useCallback(() => {
    setNewlyUnlockedAchievements([]);
  }, []);

  const updateUser = (profile: UserProfile) => {
    // Ensure progress exists
    const profileWithProgress = {
      ...profile,
      progress: profile.progress || DEFAULT_PROGRESS,
    };
    setUser(profileWithProgress);
    localStorage.setItem('biss_user_profile', JSON.stringify(profileWithProgress));
  };

  const updateProgress = (updates: Partial<UserProgress>) => {
    if (!user) return;

    const newProgress: UserProgress = {
      ...user.progress,
      ...updates,
      lastPlayedAt: new Date().toISOString(),
    };

    const newUser = { ...user, progress: newProgress };
    setUser(newUser);
    localStorage.setItem('biss_user_profile', JSON.stringify(newUser));
  };

  const completeLevel = (levelId: string, score: number = 10) => {
    if (!user) return;

    const alreadyCompleted = user.progress.completedLevels.includes(levelId);
    const newCompletedLevels = alreadyCompleted
      ? user.progress.completedLevels
      : [...user.progress.completedLevels, levelId];

    const newStreak = user.progress.streak + 1;
    const newMaxStreak = Math.max(user.progress.maxStreak || 0, newStreak);
    const newTotalScore = user.progress.totalScore + (alreadyCompleted ? 0 : score);

    // Check for new day
    const today = new Date().toISOString().split('T')[0];
    const isNewDay = user.progress.lastPlayDate !== today;
    const newDaysPlayed = isNewDay ? (user.progress.daysPlayed || 0) + 1 : (user.progress.daysPlayed || 0);

    // Calculate stats for achievement checking
    const labLevels = newCompletedLevels.filter(id => id.startsWith('frac_'));
    const vaultLevels = newCompletedLevels.filter(id => id.startsWith('lvl_'));

    const stats: AchievementStats = {
      totalLevelsCompleted: newCompletedLevels.length,
      labLevelsCompleted: labLevels.length,
      vaultLevelsCompleted: vaultLevels.length,
      totalScore: newTotalScore,
      currentStreak: newStreak,
      maxStreak: newMaxStreak,
      daysPlayed: newDaysPlayed,
    };

    // Check for new achievements
    const existingAchievements = user.progress.unlockedAchievements || [];
    const newAchievements = checkNewAchievements(stats, existingAchievements);

    if (newAchievements.length > 0) {
      setNewlyUnlockedAchievements(prev => [...prev, ...newAchievements]);
    }

    const newUnlockedAchievements = [
      ...existingAchievements,
      ...newAchievements.map(a => a.id)
    ];

    updateProgress({
      completedLevels: newCompletedLevels,
      totalScore: newTotalScore,
      streak: newStreak,
      maxStreak: newMaxStreak,
      unlockedAchievements: newUnlockedAchievements,
      daysPlayed: newDaysPlayed,
      lastPlayDate: today,
    });
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('biss_user_profile');
  };

  // Default to SciFi if no user or weird state
  const currentThemeConfig = user && THEME_CONFIG[user.theme] ? THEME_CONFIG[user.theme] : THEME_CONFIG['scifi'];

  return (
    <UserContext.Provider value={{ user, updateUser, updateProgress, completeLevel, clearUser, theme: currentThemeConfig, newlyUnlockedAchievements, clearNewAchievements }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};