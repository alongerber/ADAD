import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomType } from '../types';
import { useUser } from '../contexts/UserContext';
import { Home, Lock, RefreshCw, Unlock, Star, ArrowLeft } from 'lucide-react';
import { VaultWheel } from '../components/vault/VaultWheel';
import { GhostHand } from '../components/ui/GhostHand';
import { useIdleScaffold } from '../hooks/useIdleScaffold';
import { VAULT_CURRICULUM, Level } from '../data/curriculum';
import { PedagogicalLabel } from '../components/ui/PedagogicalLabel';
import { useNotebook } from '../contexts/NotebookContext';
import { NotebookBridge } from '../components/vault/NotebookBridge';
import { LessonIntro } from '../components/ui/LessonIntro';

interface VaultRoomProps {
    onNavigate: (room: RoomType) => void;
}

export const VaultRoom: React.FC<VaultRoomProps> = ({ onNavigate }) => {
    const { user } = useUser();
    const { isIdle, resetTimer } = useIdleScaffold();
    const { addMessage, setMessages, setIsOpen } = useNotebook();

    const [levelIndex, setLevelIndex] = useState(0);
    const currentLevel: Level = VAULT_CURRICULUM[levelIndex];

    const [minuend, setMinuend] = useState<number[]>([]);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [isVaultOpen, setIsVaultOpen] = useState(false);
    
    // Intro State
    const [showIntro, setShowIntro] = useState(true);

    const [hoveredCol, setHoveredCol] = useState<number | null>(null);
    const [borrowingState, setBorrowingState] = useState<{from: number, to: number} | null>(null);
    const [flashCol, setFlashCol] = useState<number | null>(null);

    // Level-specific educational content
    const LEVEL_INTROS: Record<string, { title: string; explanation: string; exampleBefore: string; exampleAfter: string; tip: string }> = {
        'lvl_zero_1': {
            title: 'מלכודת האפס',
            explanation: 'כשכותבים מספר, כל ספרה יושבת במקום שלה. אם אין עשרות או מאות - שמים אפס!',
            exampleBefore: 'שלושת אלפים וחמישים',
            exampleAfter: '3050',
            tip: 'שים לב: "חמישים" זה 50, לא 500. האפס במאות שומר על המקום!'
        },
        'lvl_zero_2': {
            title: 'מלכודת האפס - שלב 2',
            explanation: 'עכשיו עם מספרים יותר גדולים! זכור - כל מקום ריק צריך אפס.',
            exampleBefore: 'ארבעים אלף וארבע',
            exampleAfter: '40004',
            tip: 'ספור את האפסים באמצע - יש שלושה!'
        },
        'lvl_sub_1': {
            title: 'חיסור עם פריטה',
            explanation: 'כשהספרה למעלה קטנה מהספרה למטה - צריך "לשאול" מהשכן.',
            exampleBefore: '452 - 138',
            exampleAfter: '314',
            tip: 'לחץ על הספרה כדי לפרוט - היא תיתן 10 לשכן!'
        }
    };

    useEffect(() => {
        initializeLevel(currentLevel);
    }, [currentLevel]);

    const initializeLevel = (level: Level) => {
        setIsVaultOpen(false);
        setMessages([level.notebookHint]);
        setIsOpen(true);
        setShowIntro(true); // Trigger intro on level load

        if (level.mode === 'vertical_math') {
            setMinuend([...level.top]);
            setUserAnswers(new Array(level.top.length).fill(0));
        } else if (level.mode === 'number_input') {
            setUserAnswers(new Array(level.target.length).fill(0));
            setMinuend([]); 
        }
    };

    const handleWheelChange = (colIndex: number, val: number) => {
        resetTimer();
        const newAnswers = [...userAnswers];
        newAnswers[colIndex] = val;
        setUserAnswers(newAnswers);
    };

    const handleBorrow = (colIndex: number) => {
        resetTimer();
        if (currentLevel.mode !== 'vertical_math') return;
        if (isVaultOpen) return;
        if (colIndex >= minuend.length - 1) return; 
        if (minuend[colIndex] <= 0) return; 
        
        setBorrowingState({ from: colIndex, to: colIndex + 1 });

        setTimeout(() => {
            const newMinuend = [...minuend];
            newMinuend[colIndex] -= 1;      
            newMinuend[colIndex + 1] += 10; 
            setMinuend(newMinuend);
            
            setBorrowingState(null);
            setFlashCol(colIndex + 1);
            setTimeout(() => setFlashCol(null), 500);
            addMessage(`פרטנו ${1} מאות ל-${10} עשרות`);
        }, 600); 
    };

    const handleReset = () => {
        initializeLevel(currentLevel);
    };

    const nextLevel = () => {
        if (levelIndex < VAULT_CURRICULUM.length - 1) {
            setLevelIndex(prev => prev + 1);
            // Intro is triggered by useEffect when currentLevel changes
        } else {
            onNavigate(RoomType.LOBBY);
        }
    };

    const checkUnlock = () => {
        let isCorrect = false;

        if (currentLevel.mode === 'vertical_math') {
            const topVal = parseInt(currentLevel.top.join(''));
            const botVal = parseInt(currentLevel.bottom.join(''));
            const userStr = userAnswers.join('');
            isCorrect = parseInt(userStr) === (topVal - botVal);
        } 
        else if (currentLevel.mode === 'number_input') {
            isCorrect = userAnswers.every((val, i) => val === currentLevel.target[i]);

            if (!isCorrect) {
                const targetDigits = currentLevel.target.filter(d => d !== 0);
                const userDigits = userAnswers.filter(d => d !== 0);
                
                if (targetDigits.join('') === userDigits.join('')) {
                     addMessage("אופס! נראה ששכחת אפס שומר מקום.");
                } else {
                     addMessage("נסה לקרוא את המספר בקול רם.");
                }
            }
        }

        if (isCorrect) {
            setIsVaultOpen(true);
            addMessage("מצוין! הקוד פוצח.");
        }
    };

    const getColumnLabel = (totalCols: number, index: number) => {
        const power = totalCols - 1 - index;
        switch(power) {
            case 0: return 'אחדות';
            case 1: return 'עשרות';
            case 2: return 'מאות';
            case 3: return 'אלפים';
            case 4: return 'ע.אלפים';
            default: return '';
        }
    };

    const getColumnPower = (totalCols: number, index: number) => {
        return totalCols - 1 - index;
    }

    // Prepare safe props for NotebookBridge
    const notebookProblem = {
        top: currentLevel.mode === 'vertical_math' ? currentLevel.top : [],
        bottom: currentLevel.mode === 'vertical_math' ? currentLevel.bottom : []
    };

    // Safe access for Intro Data
    const introData = LEVEL_INTROS[currentLevel.id] || {
        title: currentLevel.mode === 'number_input' ? 'כתיבת מספרים' : 'חיסור במאונך',
        explanation: 'בוא נלמד משהו חדש!',
        exampleBefore: 'Start',
        exampleAfter: 'End',
        tip: 'בהצלחה!'
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center bg-neutral-900 overflow-hidden select-none font-mono text-amber-500" dir="rtl">
            
            {/* --- LESSON INTRO OVERLAY --- */}
            <AnimatePresence>
                {showIntro && (
                    <LessonIntro
                        levelType={currentLevel.mode}
                        levelTitle={introData.title}
                        explanation={introData.explanation}
                        exampleBefore={introData.exampleBefore}
                        exampleAfter={introData.exampleAfter}
                        tip={introData.tip}
                        onStart={() => setShowIntro(false)}
                    />
                )}
            </AnimatePresence>

            {/* TREASURE LAYER */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="flex flex-col items-center gap-6 animate-pulse">
                     <div className="relative">
                        <div className="absolute inset-0 bg-amber-400 blur-[80px] opacity-40" />
                        <Star size={120} className="text-amber-300 fill-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,1)]" />
                     </div>
                     <h2 className="text-4xl font-black text-amber-200 uppercase tracking-widest drop-shadow-md">הכספת נפרצה!</h2>
                     <button 
                        onClick={nextLevel}
                        className="bg-neutral-800/80 hover:bg-neutral-700 px-8 py-4 rounded-full border border-amber-500 text-amber-400 font-bold backdrop-blur-md flex gap-2 items-center transition-all"
                     >
                        <span>לשלב הבא</span>
                        <ArrowLeft />
                     </button>
                </div>
            </div>

            {/* MAIN MACHINE */}
            <motion.div 
                className="relative z-10 w-full h-full flex flex-col items-center"
                animate={isVaultOpen ? { x: "-100%", opacity: 0, rotateY: -20 } : { x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 bg-neutral-900 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.15),transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)` }} 
                />

                <GhostHand show={isIdle && !isVaultOpen && !showIntro} />

                {/* Header Nav */}
                <div className="absolute top-6 left-6 z-50 flex gap-4">
                    <button onClick={handleReset} className="p-3 rounded-full bg-neutral-800 border border-amber-500/20 text-amber-500/50 hover:bg-neutral-800 hover:text-amber-400 hover:rotate-180 transition-all shadow-lg">
                        <RefreshCw size={24} />
                    </button>
                    <button onClick={() => onNavigate(RoomType.LOBBY)} className="p-3 rounded-full bg-neutral-800 border border-amber-500/20 text-amber-500/50 hover:bg-neutral-800 hover:text-amber-400 transition-all shadow-lg">
                        <Home size={24} />
                    </button>
                </div>

                {/* Main Content */}
                <div className="z-10 w-full max-w-4xl h-full flex flex-col items-center justify-center p-6 gap-8">
                    
                    <div className="flex flex-col items-center gap-2 mb-2 opacity-90 text-center w-full">
                        <div className="text-amber-500/60 text-xs tracking-[0.3em] uppercase border-b border-amber-500/30 pb-1">Secure Vault Access - Level {levelIndex + 1}</div>
                        
                        {currentLevel.mode === 'number_input' ? (
                            <div className="bg-gradient-to-b from-amber-700 to-amber-900 border-4 border-amber-600 rounded-xl px-12 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -rotate-1 max-w-2xl">
                                <h1 className="text-white font-handwriting font-bold text-5xl md:text-6xl drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] text-center leading-tight">
                                    "{currentLevel.instruction}"
                                </h1>
                            </div>
                        ) : (
                            <h1 className="text-amber-400 font-black text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                                חיסור במאונך
                            </h1>
                        )}
                    </div>

                    {/* MACHINE GRID */}
                    <div className="relative p-8 rounded-3xl bg-[#1a1a1a] border-4 border-neutral-700 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_60px_rgba(0,0,0,0.8)]">
                        <div className="absolute inset-0 rounded-[20px] pointer-events-none border border-white/10 opacity-50" />
                        <div className="absolute -top-[2px] left-10 right-10 h-[2px] bg-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.8)]" />

                        <div className="flex gap-4 md:gap-6 relative justify-center" dir="ltr">
                            
                            <AnimatePresence>
                                {borrowingState && (
                                    <motion.div 
                                        initial={{ left: `${borrowingState.from * 20}%`, top: '20%', scale: 0.5, opacity: 1 }} 
                                        animate={{ left: `${borrowingState.to * 20}%`, top: '20%', scale: 1.5, rotate: 360 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute z-50 w-6 h-6 bg-amber-300 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)] pointer-events-none flex items-center justify-center text-[10px] font-black text-amber-900"
                                    >
                                        10
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {userAnswers.map((_, colIndex) => {
                                let originalValue = 0;
                                let currentValue = 0;
                                let isLender = false;
                                let isBorrower = false;

                                if (currentLevel.mode === 'vertical_math') {
                                    originalValue = currentLevel.top[colIndex];
                                    currentValue = minuend[colIndex];
                                    isLender = currentValue < originalValue; 
                                    isBorrower = currentValue > originalValue;
                                }

                                return (
                                <div key={colIndex} className="flex flex-col items-center gap-4 relative w-[80px]">
                                    
                                    <div className="text-neutral-500 text-sm font-bold tracking-widest uppercase mb-2">
                                        {getColumnLabel(userAnswers.length, colIndex)}
                                    </div>

                                    {currentLevel.mode === 'vertical_math' && (
                                        <>
                                            <div 
                                                className="relative w-full flex justify-center"
                                                onMouseEnter={() => setHoveredCol(colIndex)}
                                                onMouseLeave={() => setHoveredCol(null)}
                                            >
                                                <motion.button
                                                    onClick={() => handleBorrow(colIndex)}
                                                    animate={flashCol === colIndex ? { scale: [1, 1.2, 1], color: ['#fbbf24', '#ffffff', '#fbbf24'] } : { scale: 1, color: '#fbbf24' }}
                                                    transition={{ duration: 0.3 }}
                                                    disabled={colIndex >= userAnswers.length - 1 || minuend[colIndex] === 0}
                                                    className={`
                                                        w-16 h-16 rounded-xl bg-neutral-800 border-2 shadow-[inset_0_2px_5px_rgba(255,255,255,0.05)] flex items-center justify-center font-black text-amber-400 relative overflow-visible group transition-colors z-20
                                                        ${colIndex < userAnswers.length - 1 && minuend[colIndex] > 0 ? 'border-neutral-700 hover:border-amber-500/50 cursor-pointer' : 'border-neutral-800 cursor-default opacity-80'}
                                                    `}
                                                >
                                                    {colIndex < userAnswers.length - 1 && minuend[colIndex] > 0 && !isLender && (
                                                        <div className="absolute inset-0 rounded-xl ring-2 ring-amber-500/50 animate-ping opacity-0 group-hover:opacity-30" />
                                                    )}
                                                    
                                                    <span className={`${originalValue > 9 ? 'text-3xl tracking-tighter' : 'text-5xl'} ${isLender ? 'opacity-50' : 'opacity-100'}`}>
                                                        {originalValue}
                                                    </span>
                                                </motion.button>
                                            </div>

                                            <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold text-neutral-500 font-mono relative">
                                                {colIndex === 0 && <span className="absolute -left-10 text-neutral-400 text-5xl font-black">-</span>}
                                                {currentLevel.bottom[colIndex]}
                                            </div>

                                            <div className="w-full h-1 bg-neutral-800 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
                                        </>
                                    )}

                                    <div className="pt-2 relative overflow-visible">
                                        {userAnswers[colIndex] > 0 && (
                                            <PedagogicalLabel 
                                                text={(userAnswers[colIndex] * Math.pow(10, getColumnPower(userAnswers.length, colIndex))).toString()} 
                                                position="top-[-20px] left-1/2 -translate-x-1/2" 
                                                color="text-amber-200"
                                                arrowDirection="bottom"
                                            />
                                        )}
                                        {userAnswers[colIndex] === 0 && (
                                            <PedagogicalLabel 
                                                text="שומר מקום" 
                                                position="bottom-[-30px] left-1/2 -translate-x-1/2" 
                                                color="text-white/50" 
                                                arrowDirection="top"
                                            />
                                        )}

                                        <VaultWheel value={userAnswers[colIndex]} onChange={(val) => handleWheelChange(colIndex, val)} />
                                    </div>

                                </div>
                                );
                            })}
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={checkUnlock}
                        className="mt-4 w-full max-w-[200px] h-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 shadow-[0_5px_0_#92400e,0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 text-amber-950 font-black text-xl tracking-wider uppercase border-t border-amber-400 hover:brightness-110 active:shadow-none active:translate-y-[5px] transition-all"
                    >
                        {isVaultOpen ? <Unlock size={24} strokeWidth={2.5} /> : <Lock size={24} strokeWidth={2.5} />}
                        <span>פתח כספת</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* NOTEBOOK BRIDGE - Only visible in vertical math mode */}
            <NotebookBridge 
                problem={notebookProblem}
                currentMinuend={currentLevel.mode === 'vertical_math' ? minuend : []}
                borrowingEvent={borrowingState}
                userAnswers={userAnswers}
                show={currentLevel.mode === 'vertical_math'}
            />
        </div>
    );
};