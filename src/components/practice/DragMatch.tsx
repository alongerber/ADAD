import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

// =============================================
// טיפוסים
// =============================================
interface MatchPair {
  id: string;
  left: {
    type: 'fraction' | 'text';
    fraction?: { n: number; d: number };
    text?: string;
  };
  right: {
    type: 'visual' | 'text';
    visual?: { slices: number; filled: number };
    text?: string;
  };
}

// =============================================
// קומפוננטת פיצה קטנה
// =============================================
const MiniPizza: React.FC<{ slices: number; filled: number; size?: number }> = ({
  slices,
  filled,
  size = 60
}) => {
  const radius = size / 2 - 4;
  const center = size / 2;

  const createSlicePath = (index: number, total: number) => {
    const startAngle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((index + 1) / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;
    return `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: slices }).map((_, i) => (
        <path
          key={i}
          d={createSlicePath(i, slices)}
          fill={i < filled ? '#f59e0b' : 'rgba(255,255,255,0.15)'}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
      ))}
      <circle cx={center} cy={center} r="2" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
};

// =============================================
// קומפוננטה ראשית - התאמה בגרירה
// =============================================
interface DragMatchProps {
  question: string;
  narrative?: string;
  pairs: MatchPair[];
  onAnswer: (isCorrect: boolean, matches: Record<string, string>) => void;
  disabled?: boolean;
}

export const DragMatch: React.FC<DragMatchProps> = ({
  question,
  narrative,
  pairs,
  onAnswer,
  disabled = false
}) => {
  const { playSuccess, playError, playClick, playTick } = useSound();

  // מערבבים את הצד הימני
  const [shuffledRight] = useState<MatchPair[]>(() => {
    const shuffled = [...pairs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleLeftClick = (leftId: string) => {
    if (disabled || showResult || matches[leftId]) return;
    playClick();
    setSelectedLeft(leftId === selectedLeft ? null : leftId);
  };

  const handleRightClick = (rightId: string) => {
    if (disabled || showResult || !selectedLeft) return;

    // בדיקה אם הימני כבר תפוס
    if (Object.values(matches).includes(rightId)) return;

    playTick();
    setMatches(prev => ({ ...prev, [selectedLeft]: rightId }));
    setSelectedLeft(null);
  };

  const handleReset = () => {
    if (disabled || showResult) return;
    setMatches({});
    setSelectedLeft(null);
  };

  const checkAnswer = useCallback(() => {
    playClick();
    const resultMap: Record<string, boolean> = {};
    let allCorrect = true;

    pairs.forEach(pair => {
      const userMatch = matches[pair.id];
      const isCorrect = userMatch === pair.id;
      resultMap[pair.id] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setResults(resultMap);
    setShowResult(true);

    setTimeout(() => {
      if (allCorrect) {
        playSuccess();
      } else {
        playError();
      }
    }, 200);

    setTimeout(() => {
      onAnswer(allCorrect, matches);
    }, 1500);
  }, [pairs, matches, onAnswer, playClick, playSuccess, playError]);

  const allMatched = Object.keys(matches).length === pairs.length;

  const renderLeftItem = (pair: MatchPair) => {
    const isSelected = selectedLeft === pair.id;
    const isMatched = !!matches[pair.id];
    const result = results[pair.id];

    return (
      <motion.button
        key={pair.id}
        whileTap={!disabled && !showResult && !isMatched ? { scale: 0.95 } : {}}
        onClick={() => handleLeftClick(pair.id)}
        disabled={disabled || showResult || isMatched}
        className={`
          relative p-4 rounded-xl border-2 transition-all min-w-[80px]
          flex items-center justify-center
          ${showResult
            ? result
              ? 'bg-green-500/20 border-green-500 text-green-400'
              : 'bg-red-500/20 border-red-500 text-red-400'
            : isMatched
            ? 'bg-purple-500/20 border-purple-500 text-purple-400'
            : isSelected
            ? 'bg-amber-500/20 border-amber-500 text-amber-400 scale-105'
            : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
          }
          ${disabled || showResult || isMatched ? 'cursor-default' : 'cursor-pointer'}
        `}
      >
        {pair.left.type === 'fraction' && pair.left.fraction && (
          <div className="flex flex-col items-center ltr-nums">
            {pair.left.fraction.d === 1 ? (
              <span className="text-2xl font-mono font-black">{pair.left.fraction.n}</span>
            ) : (
              <>
                <span className="text-xl font-mono font-black leading-none">
                  {pair.left.fraction.n}
                </span>
                <div className="w-6 h-0.5 bg-current my-0.5 rounded-full" />
                <span className="text-xl font-mono font-black leading-none">
                  {pair.left.fraction.d}
                </span>
              </>
            )}
          </div>
        )}
        {pair.left.type === 'text' && (
          <span className="text-lg font-bold">{pair.left.text}</span>
        )}

        {/* קו מחבר */}
        {isMatched && !showResult && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 30 }}
            className="absolute left-full h-0.5 bg-purple-500"
          />
        )}
      </motion.button>
    );
  };

  const renderRightItem = (pair: MatchPair) => {
    const isMatched = Object.values(matches).includes(pair.id);
    const matchedLeftId = Object.entries(matches).find(([_, v]) => v === pair.id)?.[0];
    const result = matchedLeftId ? results[matchedLeftId] : undefined;

    return (
      <motion.button
        key={pair.id}
        whileTap={!disabled && !showResult && selectedLeft && !isMatched ? { scale: 0.95 } : {}}
        onClick={() => handleRightClick(pair.id)}
        disabled={disabled || showResult || !selectedLeft || isMatched}
        className={`
          relative p-3 rounded-xl border-2 transition-all
          flex items-center justify-center
          ${showResult
            ? result
              ? 'bg-green-500/20 border-green-500'
              : result === false
              ? 'bg-red-500/20 border-red-500'
              : 'bg-white/5 border-white/20'
            : isMatched
            ? 'bg-purple-500/20 border-purple-500'
            : selectedLeft && !isMatched
            ? 'bg-white/10 border-white/40 hover:border-amber-500 hover:bg-amber-500/10'
            : 'bg-white/5 border-white/20'
          }
          ${disabled || showResult || isMatched ? 'cursor-default' : selectedLeft ? 'cursor-pointer' : 'cursor-default'}
        `}
      >
        {pair.right.type === 'visual' && pair.right.visual && (
          <MiniPizza
            slices={pair.right.visual.slices}
            filled={pair.right.visual.filled}
            size={60}
          />
        )}
        {pair.right.type === 'text' && (
          <span className="text-lg font-bold text-white">{pair.right.text}</span>
        )}
      </motion.button>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6" dir="rtl">
      {/* נרטיב */}
      {narrative && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-sm text-center"
        >
          {narrative}
        </motion.p>
      )}

      {/* שאלה */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-xl md:text-2xl font-bold text-white text-center"
      >
        {question}
      </motion.h2>

      {/* הוראה */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-amber-400 text-sm font-bold"
      >
        {selectedLeft
          ? 'עכשיו בחר את התמונה המתאימה'
          : 'בחר שבר ואז בחר את התמונה שמתאימה לו'
        }
      </motion.div>

      {/* אזור ההתאמה */}
      <div className="flex gap-8 items-start justify-center w-full">
        {/* צד שמאל - שברים */}
        <div className="flex flex-col gap-3">
          <div className="text-xs text-white/40 text-center mb-1">שברים</div>
          {pairs.map(renderLeftItem)}
        </div>

        {/* קווים מחברים */}
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-full flex flex-col items-center justify-center gap-4">
            {pairs.map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-white/10" />
            ))}
          </div>
        </div>

        {/* צד ימין - תמונות */}
        <div className="flex flex-col gap-3">
          <div className="text-xs text-white/40 text-center mb-1">תמונות</div>
          {shuffledRight.map(pair => renderRightItem(pair))}
        </div>
      </div>

      {/* כפתורים */}
      <div className="flex gap-3">
        {/* איפוס */}
        {!showResult && Object.keys(matches).length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="p-3 rounded-xl bg-white/10 border border-white/20 text-white/60 hover:bg-white/20 hover:text-white transition-all"
          >
            <RotateCcw size={20} />
          </motion.button>
        )}

        {/* בדיקה */}
        {!showResult && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={allMatched ? { scale: 0.95 } : {}}
            onClick={checkAnswer}
            disabled={!allMatched}
            className={`
              px-8 py-3 rounded-xl font-bold text-lg transition-all
              ${allMatched
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
              }
            `}
          >
            {allMatched ? 'בדוק התאמות' : `חיבר ${Object.keys(matches).length}/${pairs.length}`}
          </motion.button>
        )}
      </div>

      {/* משוב */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`
              flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-lg
              ${Object.values(results).every(r => r)
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }
            `}
          >
            {Object.values(results).every(r => r) ? (
              <>
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <Check size={28} />
                </motion.div>
                <span>מעולה! כל ההתאמות נכונות! 🎉</span>
              </>
            ) : (
              <>
                <X size={28} />
                <span>
                  {Object.values(results).filter(r => r).length} מתוך {pairs.length} נכונים
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DragMatch;
