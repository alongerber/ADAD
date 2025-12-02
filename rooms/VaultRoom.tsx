import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomType } from '../types';
import { useUser } from '../contexts/UserContext';
import { Home, Lock, RefreshCw, Unlock, Star } from 'lucide-react';
import { VaultWheel } from '../components/vault/VaultWheel';
import { GhostHand } from '../components/ui/GhostHand';
import { useIdleScaffold } from '../hooks/useIdleScaffold';
import { ANIMATION_CONFIG } from '../constants';

interface VaultRoomProps {
    onNavigate: (room: RoomType) => void;
}

// Initial problem configuration
const INITIAL_PROBLEM = {
    top: [4, 5, 2],    // 452
    bottom: [1, 3, 8]  // 138
};

export const VaultRoom: React.FC<VaultRoomProps> = ({ onNavigate }) => {
    const { user, theme } = useUser();
    const { isIdle, resetTimer } = useIdleScaffold();

    // --- Logic State ---
    const [minuend, setMinuend] = useState([...INITIAL_PROBLEM.top]);
    const [userAnswers, setUserAnswers] = useState<number[]>([0, 0, 0]);
    const [isVaultOpen, setIsVaultOpen] = useState(false);
    
    // --- UI/Animation State ---
    const [hoveredCol, setHoveredCol] = useState<number | null>(null);
    const [borrowingState, setBorrowingState] = useState<{from: number, to: number} | null>(null);
    const [flashCol, setFlashCol] = useState<number | null>(null); // Visual flash on update

    // --- Helpers ---
    
    const handleWheelChange = (colIndex: number, val: number) => {
        resetTimer();
        const newAnswers = [...userAnswers];
        newAnswers[colIndex] = val;
        setUserAnswers(newAnswers);
    };

    const handleBorrow = (colIndex: number) => {
        resetTimer();
        
        // 1. Validation Logic
        if (isVaultOpen) return;
        if (colIndex >= minuend.length - 1) return; // Can't borrow from Ones (nothing to right)
        if (minuend[colIndex] <= 0) return; // Nothing to lend
        
        // 2. Trigger Animation
        setBorrowingState({ from: colIndex, to: colIndex + 1 });

        // 3. Execute Math Logic (Delayed for animation sync)
        setTimeout(() => {
            const newMinuend = [...minuend];
            newMinuend[colIndex] -= 1;      // Decrement source
            newMinuend[colIndex + 1] += 10; // Increment neighbor
            setMinuend(newMinuend);
            
            setBorrowingState(null);
            setFlashCol(colIndex + 1); // Flash the receiver
            setTimeout(() => setFlashCol(null), 500);
        }, 600); // Wait for particle to fly
    };

    const handleReset = () => {
        setMinuend([...INITIAL_PROBLEM.top]);
        setUserAnswers([0, 0, 0]);
        setIsVaultOpen(false);
    };

    const checkUnlock = () => {
        // Calculate expected result based on ORIGINAL problem (or current visual state? Math is math).
        // 452 - 138 = 314.
        const correctResult = [3, 1, 4];
        
        const isCorrect = userAnswers.every((val, i) => val === correctResult[i]);

        if (isCorrect) {
            setIsVaultOpen(true);
            // Play sound logic here in future
        } else {
            // Error shake/sound
            // Placeholder: console.log("Wrong combination");
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center bg-neutral-900 overflow-hidden select-none font-mono text-amber-500" dir="rtl">
            
            {/* --- LAYOUT: TREASURE LAYER (Behind Machine) --- */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="flex flex-col items-center gap-6 animate-pulse">
                     <div className="relative">
                        <div className="absolute inset-0 bg-amber-400 blur-[80px] opacity-40" />
                        <Star size={120} className="text-amber-300 fill-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,1)]" />
                     </div>
                     <h2 className="text-4xl font-black text-amber-200 uppercase tracking-widest drop-shadow-md">הכספת נפרצה!</h2>
                     <div className="bg-neutral-800/80 px-6 py-3 rounded-full border border-amber-500/50 text-amber-400 font-bold backdrop-blur-md">
                        כל הכבוד {user?.name || 'סוכן'}!
                     </div>
                </div>
            </div>

            {/* --- LAYOUT: MAIN MACHINE --- */}
            <motion.div 
                className="relative z-10 w-full h-full flex flex-col items-center"
                animate={isVaultOpen ? { x: "-100%", opacity: 0, rotateY: -20 } : { x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                {/* Background Ambience: Spotlight & Metal Texture */}
                <div className="absolute inset-0 bg-neutral-900 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.15),transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)` }} 
                />

                {/* Ghost Hand Scaffolding */}
                <GhostHand show={isIdle && !isVaultOpen} />

                {/* Header / Home Nav */}
                <div className="absolute top-6 left-6 z-50 flex gap-4">
                    <button 
                        onClick={handleReset}
                        className="p-3 rounded-full bg-neutral-800 border border-amber-500/20 text-amber-500/50 hover:bg-neutral-800 hover:text-amber-400 hover:rotate-180 transition-all shadow-lg"
                        title="אפס משחק"
                    >
                        <RefreshCw size={24} />
                    </button>
                    <button 
                        onClick={() => onNavigate(RoomType.LOBBY)}
                        className="p-3 rounded-full bg-neutral-800 border border-amber-500/20 text-amber-500/50 hover:bg-neutral-800 hover:text-amber-400 transition-all shadow-lg"
                    >
                        <Home size={24} />
                    </button>
                </div>

                {/* Main Content Container */}
                <div className="z-10 w-full max-w-lg h-full flex flex-col items-center justify-center p-6 gap-8">
                    
                    {/* Title Plate */}
                    <div className="flex flex-col items-center gap-2 mb-2 opacity-90 text-center">
                        <div className="text-amber-500/60 text-xs tracking-[0.3em] uppercase border-b border-amber-500/30 pb-1">Secure Vault Access</div>
                        <h1 className="text-amber-400 font-black text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                            חיסור במאונך: פריצת הכספת
                        </h1>
                        <p className="text-neutral-400 text-sm md:text-base font-bold mt-2 animate-pulse">
                            גרור את הגלגלים למטה כדי לפתור
                        </p>
                    </div>

                    {/* THE MACHINE (Equation Grid) */}
                    <div className="relative p-8 rounded-3xl bg-[#1a1a1a] border-4 border-neutral-700 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_60px_rgba(0,0,0,0.8)]">
                        
                        {/* Metallic Shine on edges */}
                        <div className="absolute inset-0 rounded-[20px] pointer-events-none border border-white/10 opacity-50" />
                        <div className="absolute -top-[2px] left-10 right-10 h-[2px] bg-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.8)]" />

                        {/* Columns Container */}
                        <div className="flex gap-4 md:gap-8 relative" dir="ltr">
                            
                            {/* Borrowing Particle Animation Layer */}
                            <AnimatePresence>
                                {borrowingState && (
                                    <motion.div 
                                        initial={{ 
                                            left: `${borrowingState.from * 33 + 16}%`, 
                                            top: '20%', 
                                            scale: 0.5,
                                            opacity: 1
                                        }}
                                        animate={{ 
                                            left: `${borrowingState.to * 33 + 16}%`, 
                                            top: '20%',
                                            scale: 1.5,
                                            rotate: 360
                                        }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute z-50 w-6 h-6 bg-amber-300 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)] pointer-events-none flex items-center justify-center text-[10px] font-black text-amber-900"
                                    >
                                        10
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Render Columns: Hundreds (0), Tens (1), Ones (2) */}
                            {[0, 1, 2].map((colIndex) => (
                                <div key={colIndex} className="flex flex-col items-center gap-4 relative w-[80px]">
                                    
                                    {/* Label (H/T/O) */}
                                    <div className="text-neutral-500 text-sm font-bold tracking-widest uppercase mb-2">
                                        {colIndex === 0 ? 'מאות' : colIndex === 1 ? 'עשרות' : 'אחדות'}
                                    </div>

                                    {/* Row 1: Top Number (Interactive) */}
                                    <div 
                                        className="relative w-full flex justify-center"
                                        onMouseEnter={() => setHoveredCol(colIndex)}
                                        onMouseLeave={() => setHoveredCol(null)}
                                    >
                                        <motion.button
                                            onClick={() => handleBorrow(colIndex)}
                                            animate={
                                                flashCol === colIndex 
                                                ? { scale: [1, 1.2, 1], color: ['#fbbf24', '#ffffff', '#fbbf24'] } 
                                                : { scale: 1, color: '#fbbf24' }
                                            }
                                            transition={{ duration: 0.3 }}
                                            disabled={colIndex >= 2 || minuend[colIndex] === 0}
                                            className={`
                                                w-16 h-16 rounded-xl bg-neutral-800 border-2 shadow-[inset_0_2px_5px_rgba(255,255,255,0.05)] flex items-center justify-center font-black text-amber-400 relative overflow-visible group transition-colors z-20
                                                ${colIndex < 2 && minuend[colIndex] > 0 ? 'border-neutral-700 hover:border-amber-500/50 cursor-pointer' : 'border-neutral-800 cursor-default opacity-80'}
                                            `}
                                        >
                                            {/* Pulse Ring (Only if borrowable) */}
                                            {colIndex < 2 && minuend[colIndex] > 0 && (
                                                <div className="absolute inset-0 rounded-xl ring-2 ring-amber-500/50 animate-ping opacity-0 group-hover:opacity-30" />
                                            )}
                                            
                                            <span className={`${minuend[colIndex] > 9 ? 'text-3xl tracking-tighter' : 'text-5xl'}`}>
                                                {minuend[colIndex]}
                                            </span>
                                            
                                            {/* Shine effect */}
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 pointer-events-none overflow-hidden rounded-t-lg" />
                                        </motion.button>

                                        {/* Tooltip */}
                                        <AnimatePresence>
                                            {hoveredCol === colIndex && colIndex < 2 && minuend[colIndex] > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: -45 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-amber-400 text-xs font-bold px-3 py-1 rounded border border-amber-500/30 z-30 pointer-events-none"
                                                >
                                                    לחץ לפריטה
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Row 2: Subtrahend (Static) */}
                                    <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold text-neutral-500 font-mono relative">
                                        {/* Operator */}
                                        {colIndex === 0 && (
                                            <span className="absolute -left-10 text-neutral-400 text-5xl font-black">-</span>
                                        )}
                                        {INITIAL_PROBLEM.bottom[colIndex]}
                                    </div>

                                    {/* Divider Line */}
                                    <div className="w-full h-1 bg-neutral-800 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.1)]" />

                                    {/* Row 3: Input Wheel */}
                                    <div className="pt-2">
                                        <VaultWheel 
                                            value={userAnswers[colIndex]} 
                                            onChange={(val) => handleWheelChange(colIndex, val)}
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit / Unlock Handle */}
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
        </div>
    );
};