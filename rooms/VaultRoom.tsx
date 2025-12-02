import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomType } from '../types';
import { useUser } from '../contexts/UserContext';
import { Home, Lock, RefreshCw, Unlock, Star, ArrowLeft } from 'lucide-react';
import { VaultWheel } from '../components/vault/VaultWheel';
import { GhostHand } from '../components/ui/GhostHand';
import { useIdleScaffold } from '../hooks/useIdleScaffold';
import { VAULT_CURRICULUM, Level } from '../data/curriculum';
import { NotebookBridge } from '../components/vault/NotebookBridge';
import { LessonIntro } from '../components/ui/LessonIntro';

interface VaultRoomProps {
    onNavigate: (room: RoomType) => void;
}

const LEVEL_INTROS: Record<string, { title: string; explanation: string; exampleBefore: string; exampleAfter: string; tip: string }> = {
    'lvl_zero_1': {
        title: 'מלכודת האפס',
        explanation: 'כשכותבים מספר, כל ספרה יושבת במקום שלה. אם אין מאות - שמים אפס!',
        exampleBefore: 'שלושת אלפים וחמישים',
        exampleAfter: '3050',
        tip: 'שים לב: "חמישים" זה 50. האפס במאות שומר על המקום!'
    },
    'lvl_zero_2': {
        title: 'מלכודת האפס - שלב 2',
        explanation: 'עכשיו עם מספרים יותר גדולים! כל מקום ריק צריך אפס.',
        exampleBefore: 'ארבעים אלף וארבע',
        exampleAfter: '40004',
        tip: 'ספור את האפסים באמצע - יש שלושה!'
    },
    'lvl_sub_1': {
        title: 'חיסור עם פריטה',
        explanation: 'כשהספרה למעלה קטנה מלמטה - לוחצים עליה כדי לפרוט מהשכן.',
        exampleBefore: '452 - 138',
        exampleAfter: '314',
        tip: 'לחץ על הספרה כדי לפרוט - היא תיתן 10 לשכן!'
    }
};

export const VaultRoom: React.FC<VaultRoomProps> = ({ onNavigate }) => {
    const { user } = useUser();
    const { isIdle, resetTimer } = useIdleScaffold();

    const [levelIndex, setLevelIndex] = useState(0);
    const currentLevel: Level = VAULT_CURRICULUM[levelIndex];

    const [minuend, setMinuend] = useState<number[]>([]);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [isVaultOpen, setIsVaultOpen] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    const [borrowingState, setBorrowingState] = useState<{from: number, to: number} | null>(null);
    const [flashCol, setFlashCol] = useState<number | null>(null);

    useEffect(() => {
        initializeLevel(currentLevel);
    }, [currentLevel]);

    const initializeLevel = (level: Level) => {
        setIsVaultOpen(false);
        setShowIntro(true);

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
        }, 600);
    };

    const handleReset = () => initializeLevel(currentLevel);

    const nextLevel = () => {
        if (levelIndex < VAULT_CURRICULUM.length - 1) {
            setLevelIndex(prev => prev + 1);
        } else {
            onNavigate(RoomType.LOBBY);
        }
    };

    const checkUnlock = () => {
        let isCorrect = false;

        if (currentLevel.mode === 'vertical_math') {
            const topVal = parseInt(currentLevel.top.join(''));
            const botVal = parseInt(currentLevel.bottom.join(''));
            isCorrect = parseInt(userAnswers.join('')) === (topVal - botVal);
        } else if (currentLevel.mode === 'number_input') {
            isCorrect = userAnswers.every((val, i) => val === currentLevel.target[i]);
        }

        if (isCorrect) setIsVaultOpen(true);
    };

    const getColumnLabel = (totalCols: number, index: number) => {
        const labels = ['אחדות', 'עשרות', 'מאות', 'אלפים', 'ע.אלפים'];
        return labels[totalCols - 1 - index] || '';
    };

    const introData = LEVEL_INTROS[currentLevel.id] || {
        title: 'שלב חדש', explanation: '', exampleBefore: '', exampleAfter: '', tip: ''
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center bg-neutral-900 overflow-hidden select-none font-mono text-amber-500" dir="rtl">

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

            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="flex flex-col items-center gap-6 animate-pulse">
                    <Star size={120} className="text-amber-300 fill-amber-400" />
                    <h2 className="text-4xl font-black text-amber-200">הכספת נפרצה!</h2>
                    <button onClick={nextLevel} className="bg-neutral-800 px-8 py-4 rounded-full border border-amber-500 text-amber-400 font-bold flex gap-2 items-center">
                        <span>לשלב הבא</span>
                        <ArrowLeft />
                    </button>
                </div>
            </div>

            <motion.div
                className="relative z-10 w-full h-full flex flex-col items-center"
                animate={isVaultOpen ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                <div className="absolute inset-0 bg-neutral-900 pointer-events-none" />

                <GhostHand show={isIdle && !isVaultOpen && !showIntro} />

                <div className="absolute top-6 left-6 z-50 flex gap-4">
                    <button onClick={handleReset} className="p-3 rounded-full bg-neutral-800 border border-amber-500/20 text-amber-500/50 hover:text-amber-400">
                        <RefreshCw size={24} />
                    </button>
                    <button onClick={() => onNavigate(RoomType.LOBBY)} className="p-3 rounded-full bg-neutral-800 border border-amber-500/20 text-amber-500/50 hover:text-amber-400">
                        <Home size={24} />
                    </button>
                </div>

                <div className="z-10 w-full max-w-4xl h-full flex flex-col items-center justify-center p-6 gap-8">

                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="text-amber-500/60 text-xs tracking-widest uppercase">Level {levelIndex + 1}</div>
                        {currentLevel.mode === 'number_input' ? (
                            <div className="bg-amber-800 border-4 border-amber-600 rounded-xl px-12 py-6">
                                <h1 className="text-white font-bold text-5xl">"{currentLevel.instruction}"</h1>
                            </div>
                        ) : (
                            <h1 className="text-amber-400 font-black text-4xl">חיסור במאונך</h1>
                        )}
                    </div>

                    <div className="relative p-8 rounded-3xl bg-[#1a1a1a] border-4 border-neutral-700">
                        <div className="flex gap-6 justify-center" dir="ltr">
                            {userAnswers.map((_, colIndex) => {
                                const isVertical = currentLevel.mode === 'vertical_math';
                                const originalValue = isVertical ? currentLevel.top[colIndex] : 0;

                                return (
                                    <div key={colIndex} className="flex flex-col items-center gap-4 w-[80px]">
                                        <div className="text-neutral-500 text-sm font-bold">{getColumnLabel(userAnswers.length, colIndex)}</div>

                                        {isVertical && (
                                            <>
                                                <motion.button
                                                    onClick={() => handleBorrow(colIndex)}
                                                    animate={flashCol === colIndex ? { scale: [1, 1.2, 1] } : {}}
                                                    disabled={colIndex >= userAnswers.length - 1 || minuend[colIndex] === 0}
                                                    className="w-16 h-16 rounded-xl bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center font-black text-amber-400 text-5xl"
                                                >
                                                    {minuend[colIndex]}
                                                </motion.button>
                                                <div className="w-16 h-16 flex items-center justify-center text-4xl text-neutral-500">
                                                    {colIndex === 0 && <span className="absolute -left-10 text-5xl">-</span>}
                                                    {currentLevel.bottom[colIndex]}
                                                </div>
                                                <div className="w-full h-1 bg-neutral-700" />
                                            </>
                                        )}

                                        <VaultWheel value={userAnswers[colIndex]} onChange={(val) => handleWheelChange(colIndex, val)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={checkUnlock}
                        className="w-[200px] h-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center gap-3 text-amber-950 font-black text-xl"
                    >
                        <Lock size={24} />
                        <span>פתח כספת</span>
                    </motion.button>
                </div>
            </motion.div>

            <NotebookBridge
                problem={{ top: currentLevel.mode === 'vertical_math' ? currentLevel.top : [], bottom: currentLevel.mode === 'vertical_math' ? currentLevel.bottom : [] }}
                currentMinuend={currentLevel.mode === 'vertical_math' ? minuend : []}
                borrowingEvent={borrowingState}
                userAnswers={userAnswers}
                show={currentLevel.mode === 'vertical_math' && !showIntro}
            />
        </div>
    );
};