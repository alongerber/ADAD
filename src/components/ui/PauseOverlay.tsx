import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Home, Clock, Coffee, Sparkles } from 'lucide-react';

// =============================================
// קומפוננטת השהייה - מותאמת ל-ADHD
// =============================================
interface PauseOverlayProps {
  isOpen: boolean;
  onResume: () => void;
  onQuit: () => void;
  sessionTime?: number; // זמן בשניות
  showBreakSuggestion?: boolean;
}

// טיפים מעודדים בזמן הפסקה
const pauseTips = [
  { emoji: '💧', text: 'שתה קצת מים!' },
  { emoji: '🧘', text: 'קח נשימה עמוקה' },
  { emoji: '👀', text: 'הסתכל לרחוק לרגע' },
  { emoji: '🙆', text: 'מתח קצת את הגוף' },
  { emoji: '😊', text: 'אתה עושה עבודה מעולה!' },
];

export const PauseOverlay: React.FC<PauseOverlayProps> = ({
  isOpen,
  onResume,
  onQuit,
  sessionTime = 0,
  showBreakSuggestion = false
}) => {
  // בחר טיפ רנדומלי
  const randomTip = pauseTips[Math.floor(Math.random() * pauseTips.length)];

  // המרת זמן לדקות
  const minutes = Math.floor(sessionTime / 60);
  const seconds = sessionTime % 60;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          dir="rtl"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="relative max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            {/* כוכבים מאנימציה */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-6 -right-6"
            >
              <Sparkles size={48} className="text-amber-400/50" />
            </motion.div>

            {/* אייקון השהייה */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-500/50 flex items-center justify-center"
            >
              <Coffee size={36} className="text-purple-300" />
            </motion.div>

            {/* כותרת */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-black text-white text-center mb-2"
            >
              הפסקה קטנה
            </motion.h2>

            {/* טיפ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <span className="text-3xl">{randomTip.emoji}</span>
              <p className="text-white/70 mt-2">{randomTip.text}</p>
            </motion.div>

            {/* זמן משחק */}
            {sessionTime > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 mb-6 text-white/50 text-sm"
              >
                <Clock size={14} />
                <span>זמן למידה: {minutes}:{seconds.toString().padStart(2, '0')}</span>
              </motion.div>
            )}

            {/* הודעת הפסקה מומלצת */}
            {showBreakSuggestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mb-6 text-center"
              >
                <p className="text-amber-300 text-sm font-bold mb-1">
                  🎉 עבדת כבר {minutes} דקות!
                </p>
                <p className="text-amber-200/70 text-xs">
                  מומלץ לקחת הפסקה קצרה. המשך כשתרגיש מוכן!
                </p>
              </motion.div>
            )}

            {/* כפתורים */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3"
            >
              {/* כפתור המשך */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onResume}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 flex items-center justify-center gap-3"
                aria-label="המשך לשחק"
              >
                <Play size={24} />
                <span>המשך לשחק</span>
              </motion.button>

              {/* כפתור יציאה */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onQuit}
                className="w-full py-3 px-6 rounded-xl font-bold bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white flex items-center justify-center gap-2 transition-all"
                aria-label="חזרה לדף הבית"
              >
                <Home size={18} />
                <span>חזרה הביתה</span>
              </motion.button>
            </motion.div>

            {/* הודעה */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-white/40 text-xs mt-4"
            >
              ההתקדמות שלך נשמרת! 💾
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PauseOverlay;
