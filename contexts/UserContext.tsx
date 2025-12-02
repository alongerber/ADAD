import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ThemeType } from '../types';
import { THEME_CONFIG } from '../constants';

interface UserContextType {
  user: UserProfile | null;
  updateUser: (profile: UserProfile) => void;
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
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
  }, []);

  const updateUser = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('biss_user_profile', JSON.stringify(profile));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('biss_user_profile');
  };

  // Default to SciFi if no user or weird state
  const currentThemeConfig = user && THEME_CONFIG[user.theme] ? THEME_CONFIG[user.theme] : THEME_CONFIG['scifi'];

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, theme: currentThemeConfig }}>
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
