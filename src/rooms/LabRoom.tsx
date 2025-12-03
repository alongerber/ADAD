import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker } from '../components/lab/Beaker';
import { VerticalSlider } from '../components/ui/VerticalSlider';
import { useIdleScaffold } from '../hooks/useIdleScaffold';
import { GhostHand } from '../components/ui/GhostHand';
import { ParticleSystem } from '../components/systems/ParticleSystem';
import { LabState, RoomType } from '../types';
import { X, Home, Beaker as BeakerIcon, Lock, CheckCircle, Play } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { PedagogicalLabel } from '../components/ui/PedagogicalLabel';
import { useSound } from '../hooks/useSound';
import { LAB_CURRICULUM, FractionLevel, LAB_TOPICS } from '../data/curriculum';
import { LessonIntro } from '../components/ui/LessonIntro';

interface LabRoomProps {
    onNavigate: (room: RoomType) => void;
}

const SNAP_TOLERANCE = 0.05; // 5% tolerance for "Radio Tuning"

export const LabRoom: React.FC<LabRoomProps> = ({ onNavigate }) => {
  const { user, theme, completeLevel } = useUser();
  const { playSuccess, playError, playTick, playClick } = useSound();

  // --- Level Selection State ---
  const [showLevelSelect, setShowLevelSelect] = useState(true);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [showLessonIntro, setShowLessonIntro] = useState(false);

  // Get completed levels from user progress (persisted in localStorage)
  // Filter to only include lab levels (those starting with 'frac_')
  const allCompletedLevels = user?.progress?.completedLevels || [];
  const completedLabLevels = allCompletedLevels.filter(id => id.startsWith('frac_'));

  // Get current level from curriculum
  const currentLevel = LAB_CURRICULUM[currentLevelIndex];
  const target = {
    n: currentLevel.targetNumerator,
    d: currentLevel.targetDenominator,
    val: currentLevel.targetDenominator === 0 ? 0 : currentLevel.targetNumerator / currentLevel.targetDenominator
  };

  // --- Game State ---
  const [score, setScore] = useState(0);
  const [missionStatus, setMissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // --- Physics/Visual State ---
  const [fillLevel, setFillLevel] = useState(0.5); 
  const [feedbackScale, setFeedbackScale] = useState(1);
  const [shake, setShake] = useState(0); 
  const [showParticles, setShowParticles] = useState(false);
  const [showErrorTooltip, setShowErrorTooltip] = useState(false);

  // --- Tuning State ---
  const [isSnapped, setIsSnapped] = useState(false);

  // --- Feedback Modal State ---
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    userAnswer: { n: number; d: number };
    correctAnswer: { n: number; d: number };
    hint: string;
  } | null>(null); 

  // --- Discrete Fraction State ---
  const [labState, setLabState] = useState<LabState>({
    numerator: 0,
    denominator: 0,
    isCorrect: false
  });

  const { isIdle, resetTimer } = useIdleScaffold();

  // --- Logic ---

  const handleLevelComplete = useCallback(() => {
    // Mark level as completed in global context (saves to localStorage)
    completeLevel(currentLevel.id, 10);

    // Check if there's a next level
    if (currentLevelIndex < LAB_CURRICULUM.length - 1) {
      // Move to next level after delay
      setTimeout(() => {
        setCurrentLevelIndex(prev => prev + 1);
        setShowLessonIntro(true);
        setMissionStatus('idle');
        setShowParticles(false);
        setFillLevel(0.5);
        setIsSnapped(false);
        setLabState({ numerator: 0, denominator: 0, isCorrect: false });
      }, 2500);
    } else {
      // All levels complete - return to level select
      setTimeout(() => {
        setShowLevelSelect(true);
        setMissionStatus('idle');
        setShowParticles(false);
      }, 2500);
    }
  }, [currentLevelIndex, currentLevel.id, completeLevel]);

  const selectLevel = (index: number) => {
    setCurrentLevelIndex(index);
    setShowLevelSelect(false);
    setShowLessonIntro(true);
    setFillLevel(0.5);
    setIsSnapped(false);
    setLabState({ numerator: 0, denominator: 0, isCorrect: false });
    setMissionStatus('idle');
  };

  const startLevel = () => {
    setShowLessonIntro(false);
    playClick();
  };

  const handleSliderChange = (val: number) => {
    resetTimer();
    setShowErrorTooltip(false); 
    if (missionStatus === 'success') return; 
    
    setFillLevel(val);
    
    // --- Radio Tuning Logic ---
    let foundSnap = false;
    let nextNum = 0;
    let nextDenom = 0;

    const snaps = [
        { val: 0.0, n: 0, d: 0 },
        { val: 0.25, n: 1, d: 4 },
        { val: 0.50, n: 1, d: 2 },
        { val: 0.75, n: 3, d: 4 },
        { val: 1.00, n: 1, d: 1 },
    ];

    for (const snap of snaps) {
        if (Math.abs(val - snap.val) <= SNAP_TOLERANCE) {
            foundSnap = true;
            nextNum = snap.n;
            nextDenom = snap.d;
            break;
        }
    }

    if (foundSnap) {
        if (!isSnapped || nextNum !== labState.numerator || nextDenom !== labState.denominator) {
            playTick();
            setLabState(prev => ({ ...prev, numerator: nextNum, denominator: nextDenom }));
            setFeedbackScale(1.3);
            setTimeout(() => setFeedbackScale(1), 150);
        }
        setIsSnapped(true);
    } else {
        setIsSnapped(false);
    }
  };

  const checkAnswer = () => {
    if (missionStatus === 'success') return;
    playClick();

    if (!isSnapped) {
        playError();
        setShake(prev => prev + 1);
        setMissionStatus('error');
        setShowErrorTooltip(true);
        setTimeout(() => setMissionStatus('idle'), 1000);
        return;
    }

    const currentVal = labState.denominator === 0 ? 0 : labState.numerator / labState.denominator;
    const isCorrect = Math.abs(currentVal - target.val) < 0.01;

    if (isCorrect) {
      playSuccess();
      setMissionStatus('success');
      setShowParticles(true);
      setScore(s => s + 10);
      handleLevelComplete();

    } else {
      playError();
      setShake(prev => prev + 1);
      setMissionStatus('error');

      // Show educational feedback modal
      const hint = getErrorHint(labState.numerator, labState.denominator, target.n, target.d);
      setFeedbackData({
        userAnswer: { n: labState.numerator, d: labState.denominator },
        correctAnswer: { n: target.n, d: target.d },
        hint
      });
      setShowFeedback(true);
    }
  };

  const closeFeedback = () => {
    setShowFeedback(false);
    setFeedbackData(null);
    setMissionStatus('idle');
  };

  // Styles for Mission Display based on status
  const getMissionStyles = () => {
    switch (missionStatus) {
      case 'success':
        return "border-green-400 bg-green-900/40 shadow-[0_0_40px_rgba(74,222,128,0.5)]";
      case 'error':
        return "border-orange-500 bg-orange-900/40 shadow-[0_0_40px_rgba(249,115,22,0.5)]";
      default:
        // Use theme-specific accent color for default state
        return `border-white/10 bg-black/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] ${theme.border}`;
    }
  };

  // Gendered success message
  const getSuccessMessage = () => {
    if (user?.gender === 'girl') return "כל הכבוד, את אלופה!";
    return "כל הכבוד, אתה אלוף!";
  };

  // Generate helpful hint based on error type
  const getErrorHint = (userN: number, userD: number, targetN: number, targetD: number): string => {
    const userVal = userD === 0 ? 0 : userN / userD;
    const targetVal = targetD === 0 ? 0 : targetN / targetD;

    // User chose less than target
    if (userVal < targetVal) {
      const diff = targetVal - userVal;
      if (diff >= 0.5) return '↑ צריך הרבה יותר! הזז את הסליידר למעלה.';
      if (diff >= 0.25) return '↑ קרוב! אבל צריך קצת יותר.';
      return '↑ כמעט! רק קצת יותר למעלה.';
    }

    // User chose more than target
    if (userVal > targetVal) {
      const diff = userVal - targetVal;
      if (diff >= 0.5) return '↓ יותר מדי! הזז את הסליידר למטה.';
      if (diff >= 0.25) return '↓ קרוב! אבל שמת יותר מדי.';
      return '↓ כמעט! רק קצת פחות.';
    }

    return 'נסה שוב!';
  };

  // Format fraction for display
  const formatFraction = (n: number, d: number): string => {
    if (n === 0 && d === 0) return '0';
    if (n === 1 && d === 1) return '1';
    if (d === 1) return String(n);
    return `${n}/${d}`;
  };

  // Level Selection Screen
  if (showLevelSelect) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center p-4 md:p-8 overflow-y-auto select-none ${theme.bg} transition-colors duration-500`} dir="rtl">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-60 pointer-events-none`} />

        {/* Home Button */}
        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => onNavigate(RoomType.LOBBY)}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all shadow-lg backdrop-blur-md"
          >
            <Home size={24} />
          </button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 w-full max-w-3xl flex flex-col items-center mt-8 md:mt-12 mb-6 md:mb-10"
        >
          <div className="p-4 md:p-6 rounded-full bg-white/10 border border-white/20 text-cyan-400 mb-4">
            <BeakerIcon size={36} className="md:w-12 md:h-12" />
          </div>
          <h1 className={`text-3xl md:text-5xl font-black text-white mb-2`}>מעבדת השברים</h1>
          <p className="text-white/60 text-sm md:text-base">בחר שלב להתחיל</p>
        </motion.div>

        {/* Topics Overview */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 md:gap-4 mb-6 w-full max-w-3xl px-2">
          {LAB_TOPICS.map((topic, idx) => (
            <div key={idx} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xl md:text-2xl">{topic.icon}</span>
              <div className="text-xs text-white/70 mt-1">{topic.title}</div>
              <div className="text-[10px] text-white/40">שלבים {topic.levels}</div>
            </div>
          ))}
        </div>

        {/* Level Grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl px-2">
          {LAB_CURRICULUM.map((level, idx) => {
            const isCompleted = completedLabLevels.includes(level.id);
            const isLocked = idx > 0 && !completedLabLevels.includes(LAB_CURRICULUM[idx - 1].id) && idx > completedLabLevels.length;
            const isNext = idx === completedLabLevels.length;

            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !isLocked && selectLevel(idx)}
                disabled={isLocked}
                className={`relative p-4 md:p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  isCompleted
                    ? 'bg-green-900/30 border-green-500/50 text-green-400'
                    : isLocked
                    ? 'bg-black/20 border-white/5 text-white/30 cursor-not-allowed'
                    : isNext
                    ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 cursor-pointer'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:scale-105 cursor-pointer'
                }`}
              >
                <div className="text-2xl md:text-3xl font-black">{idx + 1}</div>
                <div className="text-xs md:text-sm font-bold text-center leading-tight">{level.title}</div>
                {isCompleted && <CheckCircle size={16} className="absolute top-2 right-2 text-green-400" />}
                {isLocked && <Lock size={14} className="absolute top-2 right-2 text-white/30" />}
                {isNext && !isCompleted && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mt-8 text-center text-white/50 text-sm"
        >
          {completedLabLevels.length} / {LAB_CURRICULUM.length} שלבים הושלמו
        </motion.div>
      </div>
    );
  }

  // Lesson Intro Screen
  if (showLessonIntro) {
    return (
      <LessonIntro
        levelType="fraction"
        levelTitle={currentLevel.title}
        narrative={currentLevel.narrative}
        explanation={currentLevel.explanation}
        exampleBefore={`מלא ${currentLevel.targetNumerator}/${currentLevel.targetDenominator} מהבקבוק`}
        exampleAfter={currentLevel.targetDenominator === 1 ? '1' : `${currentLevel.targetNumerator}/${currentLevel.targetDenominator}`}
        tip={currentLevel.tip}
        onStart={startLevel}
      />
    );
  }

  return (
    <div className={`relative w-full h-full flex flex-col items-center p-3 md:p-6 overflow-y-auto md:overflow-hidden select-none ${theme.bg} transition-colors duration-500`}>

      {/* --- GLOBAL OVERLAYS --- */}
      <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] opacity-20 rounded-full blur-[100px] pointer-events-none ${theme.bg === 'bg-fuchsia-950' ? 'bg-pink-500' : 'bg-blue-500'}`} />

      {/* Particle System (Root Level) */}
      <ParticleSystem active={showParticles} />

      <GhostHand show={isIdle} />

      {/* Educational Feedback Modal */}
      <AnimatePresence>
        {showFeedback && feedbackData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeFeedback}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-gradient-to-br from-orange-900/95 to-red-900/95 border-2 border-orange-500/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              dir="rtl"
            >
              {/* Header */}
              <div className="text-center mb-4">
                <span className="text-4xl">🤔</span>
                <h3 className="text-xl font-bold text-white mt-2">לא בדיוק...</h3>
              </div>

              {/* Comparison */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {/* User's answer */}
                <div className="flex flex-col items-center p-3 bg-red-950/50 rounded-xl border border-red-500/30">
                  <span className="text-xs text-red-300 mb-1">בחרת</span>
                  <span className="text-2xl font-mono font-bold text-red-400">
                    {formatFraction(feedbackData.userAnswer.n, feedbackData.userAnswer.d)}
                  </span>
                </div>

                <span className="text-2xl text-white/50">→</span>

                {/* Correct answer */}
                <div className="flex flex-col items-center p-3 bg-green-950/50 rounded-xl border border-green-500/30">
                  <span className="text-xs text-green-300 mb-1">צריך</span>
                  <span className="text-2xl font-mono font-bold text-green-400">
                    {formatFraction(feedbackData.correctAnswer.n, feedbackData.correctAnswer.d)}
                  </span>
                </div>
              </div>

              {/* Hint */}
              <div className="bg-amber-950/50 border border-amber-500/30 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 text-amber-300 text-sm font-bold mb-1">
                  <span>💡</span>
                  <span>טיפ:</span>
                </div>
                <p className="text-amber-100 text-sm">{feedbackData.hint}</p>
              </div>

              {/* Level tip reminder */}
              <div className="bg-white/5 rounded-lg p-2 mb-4 text-center">
                <span className="text-white/60 text-xs">{currentLevel.tip}</span>
              </div>

              {/* Try Again Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={closeFeedback}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                הבנתי, ננסה שוב! 💪
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Button */}
      <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => setShowLevelSelect(true)}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all shadow-lg backdrop-blur-md"
          >
             <Home size={24} />
          </button>
      </div>

      {/* --- Header --- */}
      <header className="w-full max-w-5xl flex justify-between items-start z-10 mb-2 shrink-0 min-h-[60px] md:h-[80px] pt-4 md:pt-8" dir="rtl">

        {/* Level Info */}
        <div className="flex flex-col items-start gap-1">
           <div className={`font-mono text-xs tracking-widest opacity-60 ${theme.textSecondary}`}>שלב {currentLevelIndex + 1}</div>
           <div className="text-lg md:text-xl font-black text-white">{currentLevel.title}</div>
        </div>

        {/* Mission Display */}
        <motion.div 
            animate={{ scale: missionStatus === 'success' ? 1.1 : 1 }}
            className={`relative backdrop-blur-md border px-6 py-2 rounded-xl flex flex-col items-center gap-1 overflow-hidden min-w-[140px] transition-all duration-300 ${getMissionStyles()}`}
        >
            <div className={`absolute top-0 left-0 w-full h-[2px] opacity-50 bg-gradient-to-r from-transparent to-transparent ${missionStatus === 'success' ? 'via-green-400' : 'via-white'}`} />
            
            <div className={`text-[10px] font-bold tracking-wide uppercase mb-1 ${missionStatus === 'success' ? 'text-green-300' : theme.textMain}`}>
                {missionStatus === 'success' ? getSuccessMessage() : "המשימה שלך"}
            </div>
            
            <div className="flex items-center gap-3" dir="ltr">
               <span className={`text-sm opacity-60 ${theme.textSecondary}`}>מלא</span>
               
               <div className={`px-3 py-1 bg-black/40 rounded-lg border shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[3rem] transition-colors duration-300 ${missionStatus === 'success' ? 'border-green-500/30 text-green-400' : `border-white/10 ${theme.textMain}`}`}>
                  {target.val === 1 ? (
                       <span className="text-2xl font-mono font-black leading-none">1</span>
                  ) : (
                      <>
                        <span className="text-xl font-mono font-black leading-none">{target.n}</span>
                        <div className={`w-full h-[2px] my-[2px] rounded-full ${missionStatus === 'success' ? 'bg-green-400/50' : 'bg-white/50'}`} />
                        <span className="text-xl font-mono font-black leading-none">{target.d}</span>
                      </>
                  )}
               </div>
            </div>
        </motion.div>
      </header>

      {/* --- Main Game Area --- */}
      <div className="w-full max-w-5xl flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-16 relative z-0 min-h-0 overflow-visible md:overflow-hidden">
        
        {/* --- RIGHT COL: Beaker --- */}
        <motion.div 
            className="flex-[2] flex justify-center items-center h-full relative"
            animate={{ x: shake % 2 === 0 ? 0 : [-8, 8, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
        >
            <div className="relative scale-75 md:scale-100">
                <div className="hidden md:block">
                    <PedagogicalLabel
                        text="שיקוי מלא"
                        position="top-[-10px] right-[-90px]"
                        arrowDirection="left"
                        color="text-white"
                        delay={1.5}
                    />
                </div>
                <Beaker fillPercentage={fillLevel} />
            </div>
            
            {/* Error Tooltip */}
            <AnimatePresence>
              {showErrorTooltip && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-10 bg-rose-500/90 text-white px-4 py-2 rounded-lg font-bold shadow-xl backdrop-blur-sm border border-rose-400/50 flex items-center gap-2 z-50"
                >
                  <X size={16} />
                  <span>{!isSnapped ? "דייק את הגובה..." : "נסה שוב!"}</span>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.div>

        {/* --- LEFT COL: Controls --- */}
        <div className={`flex-1 flex flex-col items-center justify-center py-2 md:py-4 gap-4 md:gap-6 md:pl-8 md:border-l border-white/10 w-full md:w-auto md:h-full relative z-30`}>
            
            {/* Display Screen */}
            <div className="w-full max-w-[180px] bg-black/40 rounded-xl border-2 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-visible group min-h-[140px] flex flex-col items-center justify-center py-4 shrink-0">
                 <div className="absolute top-3 left-0 w-full text-xs font-bold tracking-widest text-center uppercase opacity-50 text-white">מידת השיקוי</div>
                 
                 {/* Pedagogical Labels for Fractions - Hidden on mobile */}
                 {isSnapped && labState.denominator !== 0 && (
                     <div className="hidden md:block">
                        <PedagogicalLabel
                            text="כמות השיקוי"
                            position="top-[35%] right-[-120px]"
                            arrowDirection="left"
                            color="text-cyan-400"
                            delay={0.2}
                        />
                        <PedagogicalLabel
                            text="מתוך כמה?"
                            position="bottom-[20%] right-[-100px]"
                            arrowDirection="left"
                            color="text-white"
                            delay={0.4}
                        />
                     </div>
                 )}

                 <motion.div 
                   className="flex flex-col items-center justify-center z-10 w-full"
                   animate={{ scale: feedbackScale }}
                 >
                    {!isSnapped ? (
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            className={`text-6xl font-mono font-black ${theme.textMain}`}
                        >
                            ?
                        </motion.span>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center"
                        >
                             {labState.numerator === 0 && labState.denominator === 0 ? (
                                <span className={`text-6xl font-mono font-black ${theme.textMain} drop-shadow-md`}>0</span>
                             ) : labState.numerator === 1 && labState.denominator === 1 ? (
                                <span className={`text-6xl font-mono font-black ${theme.textMain} drop-shadow-md`}>1</span>
                             ) : (
                                <div className="flex flex-col items-center gap-1">
                                    <span className={`text-5xl font-mono font-black ${theme.textMain} drop-shadow-md leading-none`}>{labState.numerator}</span>
                                    <div className={`w-12 h-[3px] rounded-full shadow-md ${theme.textMain === 'text-white' ? 'bg-white' : 'bg-current text-current'}`} />
                                    <span className={`text-5xl font-mono font-black ${theme.textMain} drop-shadow-md leading-none`}>{labState.denominator}</span>
                                </div>
                             )}
                        </motion.div>
                    )}
                 </motion.div>
            </div>

            {/* Slider */}
            <div className="relative pt-2 shrink-0">
                <VerticalSlider value={fillLevel} onChange={handleSliderChange} />
            </div>

        </div>
      </div>

      {/* --- TEST BUTTON --- */}
      <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
          disabled={missionStatus === 'success'}
          className={`relative md:absolute md:bottom-8 md:left-12 w-full max-w-[200px] md:w-[160px] py-3 md:py-4 mt-4 md:mt-0 rounded-xl bg-slate-800 border-4 ${theme.border} ${theme.textMain} font-black text-lg md:text-xl shadow-[0_4px_0_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all z-50`}
      >
          בדוק
      </motion.button>

    </div>
  );
};