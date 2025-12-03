import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ThemeType, UserProgress } from '../types';
import { THEME_CONFIG } from '../constants';

const DEFAULT_PROGRESS: UserProgress = {
  completedLevels: [],
  currentVaultLevel: 0,
  totalScore: 0,
  streak: 0,
  lastPlayedAt: null,
};

interface UserContextType {
  user: UserProfile | null;
  updateUser: (profile: UserProfile) => void;
  updateProgress: (updates: Partial<UserProgress>) => void;
  completeLevel: (levelId: string, score?: number) => void;
  clearUser: () => void;
  theme: typeof THEME_CONFIG['scifi']; // Helper to get current theme config
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

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
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
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

    updateProgress({
      completedLevels: newCompletedLevels,
      totalScore: user.progress.totalScore + (alreadyCompleted ? 0 : score),
      streak: user.progress.streak + 1,
    });
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('biss_user_profile');
  };

  // Default to SciFi if no user or weird state
  const currentThemeConfig = user && THEME_CONFIG[user.theme] ? THEME_CONFIG[user.theme] : THEME_CONFIG['scifi'];

  return (
    <UserContext.Provider value={{ user, updateUser, updateProgress, completeLevel, clearUser, theme: currentThemeConfig }}>
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