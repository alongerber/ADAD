import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, GenderType } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';

// =============================================
// שלבי ה-Onboarding
// =============================================
type OnboardingStep = 'welcome' | 'name' | 'gender' | 'grade' | 'ready';

export const OnboardingWizard: React.FC = () => {
  const { updateUser } = useUser();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<GenderType | null>(null);
  const [grade, setGrade] = useState<number | null>(null);

  // התחלת המשחק
  const handleStart = () => {
    updateUser({
      name: name.trim() || 'שחקן',
      gender: gender || 'boy',
      theme: 'scifi',
      grade: grade || 4,
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

  // מעבר לשלב הבא
  const nextStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'name', 'gender', 'grade', 'ready'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  // חזרה לשלב קודם
  const prevStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'name', 'gender', 'grade', 'ready'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  // האם אפשר להמשיך
  const canContinue = () => {
    switch (step) {
      case 'welcome': return true;
      case 'name': return true; // שם אופציונלי
      case 'gender': return gender !== null;
      case 'grade': return grade !== null;
      case 'ready': return true;
      default: return false;
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden" dir="rtl">
      {/* רקע */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* תוכן */}
      <AnimatePresence mode="wait">
        {/* שלב 1: ברוכים הבאים */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="p-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
            >
              <Sparkles size={40} className="text-white" />
            </motion.div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                ברוכים הבאים!
              </h1>
              <p className="text-white/60 text-lg">
                מתמטי-ביס
              </p>
              <p className="text-white/40 text-sm mt-2">
                לומדים מתמטיקה בביסים קטנים 🎯
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="w-full py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 mt-4"
            >
              <span>בואו נתחיל!</span>
              <ChevronLeft size={24} />
            </motion.button>
          </motion.div>
        )}

        {/* שלב 2: שם */}
        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md"
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                איך קוראים לך?
              </h2>
              <p className="text-white/50 text-sm">
                (אפשר לדלג)
              </p>
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && nextStep()}
              placeholder="השם שלי..."
              className="w-full bg-white/5 border-2 border-white/20 text-white text-center text-2xl font-bold py-4 rounded-xl outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all placeholder:text-white/30"
              autoFocus
            />

            <div className="flex gap-3 w-full">
              <button
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl font-bold bg-white/10 text-white/70 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <ChevronRight size={20} />
                <span>חזרה</span>
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="flex-[2] py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex items-center justify-center gap-2"
              >
                <span>המשך</span>
                <ChevronLeft size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* שלב 3: מגדר */}
        {step === 'gender' && (
          <motion.div
            key="gender"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md"
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {name ? `היי ${name}!` : 'היי!'} 👋
              </h2>
              <p className="text-white/60">
                איך לפנות אליך?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGender('girl')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                  gender === 'girl'
                    ? 'bg-pink-500/20 border-pink-400 shadow-lg shadow-pink-500/20'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
              >
                <span className="text-5xl">👧</span>
                <span className={`text-lg font-bold ${gender === 'girl' ? 'text-pink-300' : 'text-white'}`}>
                  בת
                </span>
                {gender === 'girl' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center"
                  >
                    <Check size={14} className="text-white" />
                  </motion.div>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGender('boy')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                  gender === 'boy'
                    ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
              >
                <span className="text-5xl">👦</span>
                <span className={`text-lg font-bold ${gender === 'boy' ? 'text-blue-300' : 'text-white'}`}>
                  בן
                </span>
                {gender === 'boy' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Check size={14} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl font-bold bg-white/10 text-white/70 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <ChevronRight size={20} />
                <span>חזרה</span>
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                disabled={!gender}
                className={`flex-[2] py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  gender
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                <span>המשך</span>
                <ChevronLeft size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* שלב 4: כיתה */}
        {step === 'grade' && (
          <motion.div
            key="grade"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md"
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                באיזו כיתה {gender === 'girl' ? 'את' : 'אתה'}?
              </h2>
              <p className="text-white/50 text-sm">
                נתאים את התוכן בשבילך
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">
              {[3, 4, 5, 6].map((g) => (
                <motion.button
                  key={g}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGrade(g)}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                    grade === g
                      ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className={`text-2xl font-black ${grade === g ? 'text-purple-300' : 'text-white'}`}>
                    {g === 3 ? "ג'" : g === 4 ? "ד'" : g === 5 ? "ה'" : "ו'"}
                  </span>
                  <span className="text-xs text-white/50">כיתה</span>
                </motion.button>
              ))}
            </div>

            <p className="text-white/40 text-xs text-center">
              כרגע התוכן מותאם בעיקר לכיתה ד', אבל עובד לכולם! 😊
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl font-bold bg-white/10 text-white/70 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <ChevronRight size={20} />
                <span>חזרה</span>
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                disabled={!grade}
                className={`flex-[2] py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  grade
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                <span>המשך</span>
                <ChevronLeft size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* שלב 5: מוכנים! */}
        {step === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="text-7xl"
            >
              🚀
            </motion.div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {gender === 'girl' ? 'מוכנה' : 'מוכן'}?
              </h2>
              <p className="text-white/60">
                {name ? `${name}, ` : ''}
                {gender === 'girl' ? 'את עומדת' : 'אתה עומד'} להתחיל מסע מתמטי מדהים!
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 w-full">
              <div className="flex items-center justify-center gap-4 text-white/70">
                <div className="text-center">
                  <div className="text-2xl">{gender === 'girl' ? '👧' : '👦'}</div>
                  <div className="text-xs mt-1">{name || 'שחקן'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">📚</div>
                  <div className="text-xs mt-1">כיתה {grade === 3 ? "ג'" : grade === 4 ? "ד'" : grade === 5 ? "ה'" : "ו'"}</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <span>יאללה! 🎮</span>
            </motion.button>

            <button
              onClick={prevStep}
              className="text-white/40 text-sm hover:text-white/60 transition-colors"
            >
              ← חזרה לשנות משהו
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* אינדיקטור שלבים */}
      <div className="absolute bottom-8 flex gap-2">
        {['welcome', 'name', 'gender', 'grade', 'ready'].map((s, i) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-all ${
              step === s
                ? 'bg-cyan-400 w-6'
                : ['welcome', 'name', 'gender', 'grade', 'ready'].indexOf(step) > i
                ? 'bg-cyan-400/50'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
