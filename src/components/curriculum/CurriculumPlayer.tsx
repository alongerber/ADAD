import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronLeft, Lock, CheckCircle, BookOpen, Award, Play } from 'lucide-react';
import { LearningUnit, LearningStep, PracticeStep, MasteryStep, PracticeQuestion } from '../../types/curriculum';
import { LearningSlidePlayer } from './LearningSlidePlayer';
import { PracticeRouter } from '../practice/PracticeRouter';
import { MasteryTest } from '../practice/MasteryTest';
import { useUser } from '../../contexts/UserContext';
import { fractionsModule, getModuleStats as getFractionsStats, getUnitById as getFractionUnitById, isUnitAvailable as isFractionUnitAvailable } from '../../data/curriculum/fractions';
import { numbersModule, getModuleStats as getNumbersStats, getUnitById as getNumbersUnitById, isUnitAvailable as isNumbersUnitAvailable } from '../../data/curriculum/numbers';

// =============================================
// Helper functions for multi-module support
// =============================================
type ModuleType = 'fractions' | 'numbers';

const modules = {
  fractions: fractionsModule,
  numbers: numbersModule
};

const getModuleStats = (moduleType: ModuleType, completedUnits: string[]) => {
  return moduleType === 'fractions'
    ? getFractionsStats(completedUnits)
    : getNumbersStats(completedUnits);
};

const getUnitById = (moduleType: ModuleType, unitId: string) => {
  return moduleType === 'fractions'
    ? getFractionUnitById(unitId)
    : getNumbersUnitById(unitId);
};

const isUnitAvailable = (moduleType: ModuleType, unitId: string, completedUnits: string[]) => {
  return moduleType === 'fractions'
    ? isFractionUnitAvailable(unitId, completedUnits)
    : isNumbersUnitAvailable(unitId, completedUnits);
};

// =============================================
// מסך בחירת מודול
// =============================================
interface ModuleSelectProps {
  onSelectModule: (moduleType: ModuleType) => void;
  completedUnits: string[];
  onBack: () => void;
}

const ModuleSelect: React.FC<ModuleSelectProps> = ({ onSelectModule, completedUnits, onBack }) => {
  const fractionsStats = getFractionsStats(completedUnits);
  const numbersStats = getNumbersStats(completedUnits);

  const moduleOptions = [
    { type: 'fractions' as ModuleType, module: fractionsModule, stats: fractionsStats },
    { type: 'numbers' as ModuleType, module: numbersModule, stats: numbersStats }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex flex-col bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 overflow-y-auto"
      dir="rtl"
    >
      {/* רקע */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* כפתור חזרה */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
        >
          <Home size={24} />
        </button>
      </div>

      {/* כותרת */}
      <header className="relative z-10 w-full p-6 md:p-8 text-center pt-16">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-3xl md:text-4xl font-black text-white">בחר נושא ללמוד</h1>
          <p className="text-white/60 max-w-md">בחר את הנושא שתרצה ללמוד ולתרגל</p>
        </motion.div>
      </header>

      {/* כרטיסי מודולים */}
      <div className="relative z-10 flex-1 p-4 md:p-6">
        <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
          {moduleOptions.map(({ type, module, stats }, idx) => (
            <motion.button
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              onClick={() => onSelectModule(type)}
              className="relative flex flex-col items-center gap-4 p-6 md:p-8 rounded-3xl border-2 bg-white/5 border-white/20 hover:bg-white/10 hover:border-purple-500/50 hover:scale-[1.02] transition-all cursor-pointer text-center"
            >
              <div className="text-6xl md:text-7xl">{module.icon}</div>
              <h3 className="text-2xl md:text-3xl font-black text-white">{module.title}</h3>
              <p className="text-white/60 text-sm">{module.description}</p>

              {/* התקדמות */}
              <div className="w-full mt-4">
                <div className="flex justify-between text-xs text-white/50 mb-2">
                  <span>{stats.completedCount} / {stats.totalCount} יחידות</span>
                  <span>{stats.progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.progressPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  />
                </div>
              </div>

              {/* תג המשך/התחל */}
              {stats.progressPercent > 0 && stats.progressPercent < 100 && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold">
                  המשך
                </div>
              )}
              {stats.progressPercent === 100 && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle size={12} />
                  הושלם
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// =============================================
// מסך בחירת יחידה
// =============================================
interface UnitSelectProps {
  moduleType: ModuleType;
  onSelectUnit: (unitId: string) => void;
  completedUnits: string[];
  onBack: () => void;
}

const UnitSelect: React.FC<UnitSelectProps> = ({ moduleType, onSelectUnit, completedUnits, onBack }) => {
  const currentModule = modules[moduleType];
  const stats = getModuleStats(moduleType, completedUnits);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex flex-col bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 overflow-y-auto"
      dir="rtl"
    >
      {/* רקע */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* כפתור חזרה */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* כותרת */}
      <header className="relative z-10 w-full p-6 md:p-8 text-center">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="text-6xl">{currentModule.icon}</div>
          <h1 className="text-3xl md:text-4xl font-black text-white">{currentModule.title}</h1>
          <p className="text-white/60 max-w-md">{currentModule.description}</p>

          {/* התקדמות */}
          <div className="flex items-center gap-4 mt-4">
            <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${stats.progressPercent}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <span className="text-white/60 text-sm">
              {stats.completedCount}/{stats.totalCount} יחידות
            </span>
          </div>
        </motion.div>
      </header>

      {/* רשימת יחידות */}
      <div className="relative z-10 flex-1 p-4 md:p-6">
        <div className="max-w-2xl mx-auto grid gap-4">
          {currentModule.units.map((unit, idx) => {
            const isCompleted = completedUnits.includes(unit.id);
            const isAvailable = isUnitAvailable(moduleType, unit.id, completedUnits);
            const isNext = !isCompleted && isAvailable;

            return (
              <motion.button
                key={unit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => isAvailable && onSelectUnit(unit.id)}
                disabled={!isAvailable}
                className={`relative flex items-center gap-4 p-4 md:p-6 rounded-2xl border-2 transition-all text-right ${
                  isCompleted
                    ? 'bg-green-900/20 border-green-500/50'
                    : !isAvailable
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : isNext
                    ? 'bg-purple-900/30 border-purple-500 shadow-lg shadow-purple-500/20 hover:scale-[1.02] cursor-pointer'
                    : 'bg-white/5 border-white/20 hover:bg-white/10 cursor-pointer'
                }`}
              >
                {/* מספר/אייקון */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                  isCompleted
                    ? 'bg-green-500/20 text-green-400'
                    : !isAvailable
                    ? 'bg-white/5 text-white/30'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle size={28} />
                  ) : !isAvailable ? (
                    <Lock size={24} />
                  ) : (
                    unit.icon
                  )}
                </div>

                {/* פרטים */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">יחידה {unit.number}</span>
                    {isNext && (
                      <span className="px-2 py-0.5 bg-purple-500/30 rounded-full text-[10px] text-purple-300 font-bold">
                        הבא
                      </span>
                    )}
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${
                    isCompleted ? 'text-green-400' : !isAvailable ? 'text-white/40' : 'text-white'
                  }`}>
                    {unit.title}
                  </h3>
                  <p className="text-sm text-white/50 mt-1">{unit.description}</p>

                  {/* מטרות */}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-xs px-2 py-1 bg-white/10 rounded text-white/50">
                      {unit.steps.length} שלבים
                    </span>
                  </div>
                </div>

                {/* חץ */}
                {isAvailable && (
                  <ChevronLeft className={`shrink-0 ${isCompleted ? 'text-green-400' : 'text-white/40'}`} size={24} />
                )}

                {/* אינדיקטור הבא */}
                {isNext && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// =============================================
// מסך התחלת יחידה
// =============================================
interface UnitIntroProps {
  unit: LearningUnit;
  onStart: () => void;
  onBack: () => void;
}

const UnitIntro: React.FC<UnitIntroProps> = ({ unit, onStart, onBack }) => {
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg w-full"
      >
        {/* אייקון */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-500/50 flex items-center justify-center text-5xl"
        >
          {unit.icon}
        </motion.div>

        {/* כותרת */}
        <div className="text-center">
          <p className="text-purple-400 text-sm font-bold mb-2">יחידה {unit.number}</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{unit.title}</h1>
          <p className="text-white/60">{unit.description}</p>
        </div>

        {/* מטרות */}
        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-bold text-white/70 mb-3 flex items-center gap-2">
            <Award size={16} />
            מה נלמד:
          </h3>
          <ul className="space-y-2">
            {unit.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                <span className="text-purple-400 mt-1">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* מספר שלבים */}
        <div className="flex gap-4 text-center">
          <div className="px-4 py-2 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">{unit.steps.length}</div>
            <div className="text-xs text-white/50">שלבים</div>
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">80%</div>
            <div className="text-xs text-white/50">ציון מעבר</div>
          </div>
        </div>

        {/* כפתורים */}
        <div className="flex gap-4 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-6 py-3 rounded-xl font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            חזרה
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 flex items-center gap-2"
          >
            <Play size={20} />
            התחל ללמוד
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// =============================================
// מסך תרגול עם מספר שאלות
// =============================================
interface PracticeSessionProps {
  step: PracticeStep;
  onComplete: (correctCount: number, totalCount: number) => void;
  onBack: () => void;
}

const PracticeSession: React.FC<PracticeSessionProps> = ({ step, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = step.questions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const correctAnswers = answers.filter(a => a).length;

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setAnswers(prev => [...prev, isCorrect]);
    setIsAnswered(true);

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsAnswered(false);
      } else {
        // סיום
        const finalCorrect = [...answers, isCorrect].filter(a => a).length;
        onComplete(finalCorrect, totalQuestions);
      }
    }, 1500);
  }, [currentIndex, totalQuestions, answers, onComplete]);

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

      {/* כפתור חזרה */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
        >
          <Home size={24} />
        </button>
      </div>

      {/* כותרת */}
      <header className="relative z-10 w-full p-4 md:p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 md:p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
              <BookOpen size={24} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-cyan-400 font-bold">תרגול</div>
              <div className="text-lg md:text-xl font-bold text-white">{step.title}</div>
            </div>
          </div>

          {/* מונה */}
          <div className="text-white/60 text-sm">
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>

        {/* סרגל התקדמות */}
        <div className="max-w-2xl mx-auto mt-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
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
      </header>

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
              disabled={isAnswered}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// =============================================
// קומפוננטה ראשית
// =============================================
interface CurriculumPlayerProps {
  onBack: () => void;
  initialModule?: ModuleType; // אם מועבר, דולג על מסך בחירת המודול
}

type ViewState =
  | { type: 'module-select' }
  | { type: 'unit-select'; moduleType: ModuleType }
  | { type: 'unit-intro'; moduleType: ModuleType; unitId: string }
  | { type: 'learning'; moduleType: ModuleType; unitId: string; stepIndex: number }
  | { type: 'practice'; moduleType: ModuleType; unitId: string; stepIndex: number }
  | { type: 'mastery'; moduleType: ModuleType; unitId: string; stepIndex: number }
  | { type: 'step-complete'; moduleType: ModuleType; unitId: string; stepIndex: number }
  | { type: 'unit-complete'; moduleType: ModuleType; unitId: string };

export const CurriculumPlayer: React.FC<CurriculumPlayerProps> = ({ onBack, initialModule }) => {
  const { user, completeLevel } = useUser();
  const [viewState, setViewState] = useState<ViewState>(
    initialModule
      ? { type: 'unit-select', moduleType: initialModule }
      : { type: 'module-select' }
  );

  // רשימת יחידות שהושלמו
  const completedUnits = useMemo(() => {
    return user?.progress?.completedLevels?.filter(id => id.startsWith('unit_')) || [];
  }, [user?.progress?.completedLevels]);

  // --- Handlers ---

  const handleSelectModule = (moduleType: ModuleType) => {
    setViewState({ type: 'unit-select', moduleType });
  };

  const handleSelectUnit = (moduleType: ModuleType, unitId: string) => {
    setViewState({ type: 'unit-intro', moduleType, unitId });
  };

  const handleStartUnit = (moduleType: ModuleType, unitId: string) => {
    setViewState({ type: 'learning', moduleType, unitId, stepIndex: 0 });
    advanceStep(moduleType, unitId, 0);
  };

  const advanceStep = (moduleType: ModuleType, unitId: string, stepIndex: number) => {
    const unit = getUnitById(moduleType, unitId);
    if (!unit) return;

    const step = unit.steps[stepIndex];
    if (!step) {
      // יחידה הושלמה
      setViewState({ type: 'unit-complete', moduleType, unitId });
      return;
    }

    switch (step.type) {
      case 'learning':
        setViewState({ type: 'learning', moduleType, unitId, stepIndex });
        break;
      case 'practice':
        setViewState({ type: 'practice', moduleType, unitId, stepIndex });
        break;
      case 'mastery':
        setViewState({ type: 'mastery', moduleType, unitId, stepIndex });
        break;
    }
  };

  const handleLearningComplete = (moduleType: ModuleType, unitId: string, stepIndex: number) => {
    advanceStep(moduleType, unitId, stepIndex + 1);
  };

  const handlePracticeComplete = (moduleType: ModuleType, unitId: string, stepIndex: number, correct: number, total: number) => {
    const unit = getUnitById(moduleType, unitId);
    if (!unit) return;

    const step = unit.steps[stepIndex] as PracticeStep;
    const passed = correct >= step.requiredCorrect;

    if (passed) {
      advanceStep(moduleType, unitId, stepIndex + 1);
    } else {
      // נכשל - חוזר לתרגל (כרגע פשוט ממשיך)
      advanceStep(moduleType, unitId, stepIndex + 1);
    }
  };

  const handleMasteryComplete = (moduleType: ModuleType, unitId: string, stepIndex: number, passed: boolean, score: number) => {
    if (passed) {
      // עבר את המבחן - מסמן את היחידה כהושלמה
      completeLevel(unitId, score);
      advanceStep(moduleType, unitId, stepIndex + 1);
    } else {
      // נכשל - חוזר להתחלת היחידה
      setViewState({ type: 'unit-intro', moduleType, unitId });
    }
  };

  const handleUnitComplete = (moduleType: ModuleType, unitId: string) => {
    completeLevel(unitId, 100);
    setViewState({ type: 'unit-select', moduleType });
  };

  // --- Render ---

  const renderView = () => {
    switch (viewState.type) {
      case 'module-select':
        return (
          <ModuleSelect
            completedUnits={completedUnits}
            onSelectModule={handleSelectModule}
            onBack={onBack}
          />
        );

      case 'unit-select':
        return (
          <UnitSelect
            moduleType={viewState.moduleType}
            completedUnits={completedUnits}
            onSelectUnit={(unitId) => handleSelectUnit(viewState.moduleType, unitId)}
            onBack={() => setViewState({ type: 'module-select' })}
          />
        );

      case 'unit-intro': {
        const unit = getUnitById(viewState.moduleType, viewState.unitId);
        if (!unit) return null;
        return (
          <UnitIntro
            unit={unit}
            onStart={() => handleStartUnit(viewState.moduleType, viewState.unitId)}
            onBack={() => setViewState({ type: 'unit-select', moduleType: viewState.moduleType })}
          />
        );
      }

      case 'learning': {
        const unit = getUnitById(viewState.moduleType, viewState.unitId);
        if (!unit) return null;
        const step = unit.steps[viewState.stepIndex] as LearningStep;
        return (
          <LearningSlidePlayer
            slides={step.slides}
            stepTitle={step.title}
            onComplete={() => handleLearningComplete(viewState.moduleType, viewState.unitId, viewState.stepIndex)}
            onBack={onBack}
          />
        );
      }

      case 'practice': {
        const unit = getUnitById(viewState.moduleType, viewState.unitId);
        if (!unit) return null;
        const step = unit.steps[viewState.stepIndex] as PracticeStep;
        return (
          <PracticeSession
            step={step}
            onComplete={(correct, total) =>
              handlePracticeComplete(viewState.moduleType, viewState.unitId, viewState.stepIndex, correct, total)
            }
            onBack={onBack}
          />
        );
      }

      case 'mastery': {
        const unit = getUnitById(viewState.moduleType, viewState.unitId);
        if (!unit) return null;
        const step = unit.steps[viewState.stepIndex] as MasteryStep;
        return (
          <MasteryTest
            title={step.title}
            questions={step.questions}
            passingScore={step.passingScore}
            onComplete={(passed, score, attempts) =>
              handleMasteryComplete(viewState.moduleType, viewState.unitId, viewState.stepIndex, passed, score)
            }
            onReview={() => setViewState({ type: 'unit-intro', moduleType: viewState.moduleType, unitId: viewState.unitId })}
            onBack={onBack}
          />
        );
      }

      case 'unit-complete': {
        const unit = getUnitById(viewState.moduleType, viewState.unitId);
        if (!unit) return null;
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-4"
            dir="rtl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50 mb-6"
            >
              <Award size={64} className="text-white" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">סיימת את היחידה!</h1>
            <p className="text-white/60 text-lg mb-2">{unit.title}</p>

            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-4 my-6">
              <h3 className="text-sm font-bold text-green-400 mb-3">עכשיו אתה יודע:</h3>
              <ul className="space-y-2">
                {unit.masterySkills?.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle size={14} className="text-green-400" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUnitComplete(viewState.moduleType, viewState.unitId)}
              className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              <span>המשך ליחידה הבאה</span>
              <ChevronLeft size={24} />
            </motion.button>
          </motion.div>
        );
      }

      default:
        return null;
    }
  };

  return <>{renderView()}</>;
};

export default CurriculumPlayer;
