import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, RotateCcw, ChevronLeft, Check, X, BookOpen, Home, Pause } from 'lucide-react';
import { PracticeQuestion } from '../../types/curriculum';
import { PracticeRouter } from './PracticeRouter';
import { PauseOverlay } from '../ui/PauseOverlay';
import { SaveIndicator } from '../ui/SaveIndicator';
import { useAutoSave } from '../../hooks/useSessionSave';

// =============================================
// קומפוננטת מבחן שליטה
// =============================================
interface MasteryTestProps {
  title: string;
  questions: PracticeQuestion[];
  passingScore: number; // אחוז מינימלי (0-100)
  onComplete: (passed: boolean, score: number, attempts: number) => void;
  onReview: () => void; // חזרה ללמוד
  onBack?: () => void; // חזרה הביתה
  moduleType?: string;
  unitId?: string;
  stepIndex?: number;
}

export const MasteryTest: React.FC<MasteryTestProps> = ({
  title,
  questions,
  passingScore = 80,
  onComplete,
  onReview,
  onBack,
  moduleType,
  unitId,
  stepIndex
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const sessionStartRef = useRef<number>(Date.now());

  const totalQuestions = questions.length;
  const correctAnswers = answers.filter(a => a).length;
  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const passed = score >= passingScore;

  // שמירה אוטומטית
  const { lastSaved, isSaving, clearSession } = useAutoSave({
    moduleType,
    unitId,
    stepIndex,
    questionIndex: currentIndex,
    answers,
    enabled: !showResult, // לא לשמור כשמוצגות תוצאות
  });

  // מעקב זמן סשן (עוצר כשמושהה)
  useEffect(() => {
    if (isPaused || showResult) return;
    const interval = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - sessionStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, showResult]);

  // תמיכה בלחיצת Escape להשהייה
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isQuestionAnswered && !showResult) {
        setIsPaused(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuestionAnswered, showResult]);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isPaused) return; // לא לאפשר תשובה בזמן השהייה

    setAnswers(prev => [...prev, isCorrect]);
    setIsQuestionAnswered(true);

    // מעבר לשאלה הבאה או לתוצאות
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsQuestionAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  }, [currentIndex, totalQuestions, isPaused]);

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setShowResult(false);
    setIsQuestionAnswered(false);
    setAttempts(prev => prev + 1);
  };

  const handleFinish = () => {
    clearSession(); // מחיקת סשן שמור
    onComplete(passed, score, attempts);
  };

  // מסך תוצאות
  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-4"
        dir="rtl"
      >
        {/* רקע */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center gap-6 max-w-md w-full"
        >
          {/* אייקון */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className={`
              w-24 h-24 rounded-full flex items-center justify-center
              ${passed
                ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50'
                : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/50'
              }
            `}
          >
            {passed ? (
              <Award size={48} className="text-white" />
            ) : (
              <BookOpen size={48} className="text-white" />
            )}
          </motion.div>

          {/* כותרת */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black text-white text-center"
          >
            {passed ? 'כל הכבוד! עברת!' : 'כמעט שם!'}
          </motion.h1>

          {/* ציון */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`
              text-6xl font-mono font-black
              ${passed ? 'text-green-400' : 'text-amber-400'}
            `}>
              {score}%
            </div>
            <div className="text-white/60">
              {correctAnswers} מתוך {totalQuestions} תשובות נכונות
            </div>
            <div className="text-white/40 text-sm">
              נדרש: {passingScore}% לפחות
            </div>
          </motion.div>

          {/* פירוט תשובות */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-2 flex-wrap justify-center"
          >
            {answers.map((isCorrect, idx) => (
              <div
                key={idx}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${isCorrect
                    ? 'bg-green-500/30 border border-green-500'
                    : 'bg-red-500/30 border border-red-500'
                  }
                `}
              >
                {isCorrect ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <X size={16} className="text-red-400" />
                )}
              </div>
            ))}
          </motion.div>

          {/* הודעה */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-center max-w-xs"
          >
            {passed
              ? 'הוכחת שליטה מצוינת בחומר! אפשר להמשיך הלאה.'
              : 'כדאי לחזור על החומר ולנסות שוב. אתה יכול!'
            }
          </motion.p>

          {/* כפתורים */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 mt-4"
          >
            {passed ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleFinish}
                className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 flex items-center gap-2"
              >
                <span>המשך ליחידה הבאה</span>
                <ChevronLeft size={24} />
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onReview}
                  className="px-6 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 flex items-center gap-2"
                >
                  <BookOpen size={20} />
                  <span>חזור ללמוד</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  className="px-6 py-4 rounded-xl font-bold text-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  <span>נסה שוב</span>
                </motion.button>
              </>
            )}
          </motion.div>

          {/* מספר ניסיונות */}
          {attempts > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 text-sm"
            >
              ניסיון מספר {attempts}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // מסך שאלות
  const currentQuestion = questions[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex flex-col bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 overflow-hidden"
      dir="rtl"
    >
      {/* רקע */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* PauseOverlay */}
      <PauseOverlay
        isOpen={isPaused}
        onResume={() => setIsPaused(false)}
        onQuit={onBack || (() => {})}
        sessionTime={sessionTime}
        showBreakSuggestion={sessionTime >= 900} // 15 דקות
      />

      {/* כפתורי ניווט */}
      <div className="absolute top-6 left-6 z-50 flex gap-2">
        {/* כפתור השהייה */}
        <button
          onClick={() => setIsPaused(true)}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
          aria-label="השהה"
          title="השהה (Escape)"
        >
          <Pause size={24} />
        </button>
        {/* כפתור בית */}
        {onBack && (
          <button
            onClick={onBack}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
            aria-label="חזרה הביתה"
          >
            <Home size={24} />
          </button>
        )}
      </div>

      {/* כותרת */}
      <header className="relative z-10 w-full p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
            <Award size={24} className="text-amber-400" />
          </div>
          <div>
            <div className="text-xs md:text-sm text-amber-400 font-bold">מבחן שליטה</div>
            <div className="text-lg md:text-xl font-bold text-white">{title}</div>
          </div>
        </div>

        {/* התקדמות + זמן + שמירה */}
        <div className="text-left flex flex-col items-end gap-1">
          <div className="text-white/60 text-sm">
            שאלה {currentIndex + 1} מתוך {totalQuestions}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">
              {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
            </span>
            <SaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
          </div>
        </div>
      </header>

      {/* סרגל התקדמות */}
      <div className="relative z-10 w-full px-4 md:px-6">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + (isQuestionAnswered ? 1 : 0)) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {/* נקודות תשובות */}
          <div className="flex gap-1">
            {answers.map((isCorrect, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-green-400' : 'bg-red-400'}`}
              />
            ))}
            {Array.from({ length: totalQuestions - answers.length }).map((_, idx) => (
              <div key={`empty-${idx}`} className="w-2 h-2 rounded-full bg-white/20" />
            ))}
          </div>
          <div className="text-xs text-white/40">
            {correctAnswers} נכונות
          </div>
        </div>
      </div>

      {/* תוכן השאלה */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-2xl"
          >
            <PracticeRouter
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={isQuestionAnswered || isPaused}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MasteryTest;
