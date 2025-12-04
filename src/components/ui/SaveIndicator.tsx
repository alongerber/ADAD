import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudOff, Check } from 'lucide-react';

// =============================================
// אינדיקטור שמירה - מראה שההתקדמות נשמרת
// =============================================
interface SaveIndicatorProps {
  lastSaved: Date | null;
  isSaving?: boolean;
  className?: string;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({
  lastSaved,
  isSaving = false,
  className = ''
}) => {
  // חישוב זמן מאז השמירה האחרונה
  const getTimeSinceSave = (): string => {
    if (!lastSaved) return '';
    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
    if (seconds < 60) return 'עכשיו';
    const minutes = Math.floor(seconds / 60);
    return `לפני ${minutes} דק׳`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-center gap-1.5 text-xs ${className}`}
      >
        {isSaving ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Cloud size={14} className="text-white/40" />
            </motion.div>
            <span className="text-white/40">שומר...</span>
          </>
        ) : lastSaved ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Check size={12} className="text-green-400" />
            </motion.div>
            <span className="text-white/40">נשמר {getTimeSinceSave()}</span>
          </>
        ) : (
          <>
            <CloudOff size={14} className="text-white/30" />
            <span className="text-white/30">לא נשמר</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SaveIndicator;
