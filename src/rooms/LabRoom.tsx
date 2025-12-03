import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker } from '../components/lab/Beaker';
import { VerticalSlider } from '../components/ui/VerticalSlider';
import { useIdleScaffold } from '../hooks/useIdleScaffold';
import { GhostHand } from '../components/ui/GhostHand';
import { ParticleSystem } from '../components/systems/ParticleSystem';
import { LabState, RoomType } from '../types';
import { X, Home } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { PedagogicalLabel } from '../components/ui/PedagogicalLabel';
import { useSound } from '../hooks/useSound';

interface LabRoomProps {
    onNavigate: (room: RoomType) => void;
}

// Game Constants
const TARGETS = [
  { n: 1, d: 4, val: 0.25 },
  { n: 1, d: 2, val: 0.5 },
  { n: 3, d: 4, val: 0.75 },
  { n: 1, d: 1, val: 1.0 },
];

const SNAP_TOLERANCE = 0.05; // 5% tolerance for "Radio Tuning"

export const LabRoom: React.FC<LabRoomProps> = ({ onNavigate }) => {
  const { user, theme } = useUser();
  const { playSuccess, playError, playTick, playClick } = useSound();

  // --- Game State ---
  const [target, setTarget] = useState(() => TARGETS[Math.floor(Math.random() * TARGETS.length)]);
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

  // --- Discrete Fraction State ---
  const [labState, setLabState] = useState<LabState>({
    numerator: 0,
    denominator: 0,
    isCorrect: false
  });

  const { isIdle, resetTimer } = useIdleScaffold();

  // --- Logic ---

  const generateNewTarget = useCallback(() => {
    setTarget(prev => {
      let newTarget;
      // Ensure we pick a different target
      do {
        newTarget = TARGETS[Math.floor(Math.random() * TARGETS.length)];
      } while (newTarget.val === prev.val);
      return newTarget;
    });
    setMissionStatus('idle');
    setShowParticles(false);
  }, []);

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
      setTimeout(() => {
        generateNewTarget();
      }, 2000);

    } else {
      playError();
      setShake(prev => prev + 1);
      setMissionStatus('error');
      setShowErrorTooltip(true);
      setTimeout(() => setMissionStatus('idle'), 1000);
      setShowErrorTooltip(false);
    }
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

  return (
    <div className={`relative w-full h-full flex flex-col items-center p-6 overflow-hidden select-none ${theme.bg} transition-colors duration-500`}>
      
      {/* --- GLOBAL OVERLAYS --- */}
      <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] opacity-20 rounded-full blur-[100px] pointer-events-none ${theme.bg === 'bg-fuchsia-950' ? 'bg-pink-500' : 'bg-blue-500'}`} />
      
      {/* Particle System (Root Level) */}
      <ParticleSystem active={showParticles} />

      <GhostHand show={isIdle} />
      
      {/* Home Button */}
      <div className="absolute top-6 left-6 z-50">
          <button 
            onClick={() => onNavigate(RoomType.LOBBY)}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all shadow-lg backdrop-blur-md"
          >
             <Home size={24} />
          </button>
      </div>

      {/* --- Header --- */}
      <header className="w-full max-w-5xl flex justify-between items-start z-10 mb-2 shrink-0 h-[80px] pt-8">
        
        {/* Score */}
        <div className="flex flex-col items-start gap-1">
           <div className={`font-mono text-xs tracking-widest opacity-60 ${theme.textSecondary}`}>ציון</div>
           <div className="text-2xl font-black text-white font-mono">{score.toString().padStart(4, '0')}</div>
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

        <div className="w-16" />
      </header>

      {/* --- Main Game Area --- */}
      <div className="w-full max-w-5xl flex-1 flex flex-row items-center justify-center gap-16 relative z-0 h-full overflow-hidden">
        
        {/* --- RIGHT COL: Beaker --- */}
        <motion.div 
            className="flex-[2] flex justify-center items-center h-full relative"
            animate={{ x: shake % 2 === 0 ? 0 : [-8, 8, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
        >
            <div className="relative">
                <PedagogicalLabel 
                    text="שלם (1)" 
                    position="top-[-10px] right-[-80px]" 
                    arrowDirection="left"
                    color="text-white"
                    delay={1.5}
                />
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
        <div className={`flex-1 flex flex-col items-center justify-center py-4 gap-6 pl-8 border-l border-white/10 h-full relative z-30`}>
            
            {/* Display Screen */}
            <div className="w-full max-w-[180px] bg-black/40 rounded-xl border-2 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-visible group min-h-[140px] flex flex-col items-center justify-center py-4 shrink-0">
                 <div className="absolute top-3 left-0 w-full text-xs font-bold tracking-widest text-center uppercase opacity-50 text-white">מד גובה</div>
                 
                 {/* Pedagogical Labels for Fractions */}
                 {isSnapped && labState.denominator !== 0 && (
                     <>
                        <PedagogicalLabel 
                            text="החלקים שלקחתי" 
                            position="top-[35%] right-[-140px]" 
                            arrowDirection="left"
                            color="text-cyan-400"
                            delay={0.2}
                        />
                        <PedagogicalLabel 
                            text="לכמה חילקתי?" 
                            position="bottom-[20%] right-[-130px]" 
                            arrowDirection="left"
                            color="text-white"
                            delay={0.4}
                        />
                     </>
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
          className={`absolute bottom-8 left-12 w-[160px] py-4 rounded-xl bg-slate-800 border-4 ${theme.border} ${theme.textMain} font-black text-xl shadow-[0_4px_0_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all z-50`}
      >
          בדוק
      </motion.button>

    </div>
  );
};