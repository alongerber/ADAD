import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { Rocket, Sparkles, Play } from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { updateUser } = useUser();
  const [name, setName] = useState('');

  // Quick start with default profile
  const handleQuickStart = () => {
    updateUser({
      name: 'שחקן',
      gender: 'boy',
      theme: 'scifi',
      grade: 4,
      progress: {
        completedLevels: [],
        currentVaultLevel: 0,
        totalScore: 0,
        streak: 0,
        maxStreak: 0,
        lastPlayedAt: null,
        unlockedAchievements: [],
        daysPlayed: 0,
        lastPlayDate: null,
        learnedTopics: [],
      }
    });
  };

  // Start with name
  const handleStartWithName = () => {
    if (name.trim().length < 1) {
      handleQuickStart();
      return;
    }

    updateUser({
      name: name.trim(),
      gender: 'boy',
      theme: 'scifi',
      grade: 4,
      progress: {
        completedLevels: [],
        currentVaultLevel: 0,
        totalScore: 0,
        streak: 0,
        maxStreak: 0,
        lastPlayedAt: null,
        unlockedAchievements: [],
        daysPlayed: 0,
        lastPlayDate: null,
        learnedTopics: [],
      }
    });
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-900 flex flex-col items-center justify-center p-4" dir="rtl">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="p-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
        >
          <Sparkles size={40} className="text-white" />
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            ברוכים הבאים!
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            מתמטי-ביס - לומדים בביסים קטנים
          </p>
        </div>

        {/* Name Input */}
        <div className="w-full">
          <label className="block text-white/70 text-sm mb-2 text-center">
            איך קוראים לך? (אופציונלי)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStartWithName()}
            placeholder="הקלד שם..."
            className="w-full bg-white/5 border-2 border-white/20 text-white text-center text-xl font-bold py-4 rounded-xl outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all placeholder:text-white/30"
            autoFocus
          />
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartWithName}
          className="w-full py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-3 mt-2"
        >
          <Play size={24} fill="white" />
          <span>בוא נתחיל!</span>
        </motion.button>

        {/* Quick Start */}
        <button
          onClick={handleQuickStart}
          className="text-white/40 text-sm hover:text-white/60 transition-colors"
        >
          דלג והתחל מיד →
        </button>
      </motion.div>
    </div>
  );
};
