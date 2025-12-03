import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { Award } from 'lucide-react';

export const AchievementToast: React.FC = () => {
  const { newlyUnlockedAchievements, clearNewAchievements } = useUser();

  // Auto-dismiss after showing all achievements
  useEffect(() => {
    if (newlyUnlockedAchievements.length > 0) {
      const timer = setTimeout(() => {
        clearNewAchievements();
      }, 4000 * newlyUnlockedAchievements.length);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlockedAchievements, clearNewAchievements]);

  return (
    <div className="fixed top-4 right-4 z-[2000] flex flex-col gap-3 pointer-events-none" dir="rtl">
      <AnimatePresence mode="popLayout">
        {newlyUnlockedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: index * 0.2
            }}
            className="pointer-events-auto"
          >
            <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-2xl p-4 shadow-[0_10px_40px_rgba(251,146,60,0.4)] border border-amber-400/30 backdrop-blur-sm min-w-[280px] max-w-[320px]">
              {/* Sparkle effect */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-2 -right-2 text-2xl"
              >
                ✨
              </motion.div>

              <div className="flex items-center gap-3">
                {/* Icon */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="text-4xl"
                >
                  {achievement.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={14} className="text-amber-200" />
                    <span className="text-amber-200 text-xs font-bold uppercase tracking-wider">
                      הישג חדש!
                    </span>
                  </div>
                  <h3 className="text-white font-black text-lg leading-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-amber-100/80 text-sm mt-0.5">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Progress bar animation */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-1 bg-white/30 rounded-full mt-3"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
