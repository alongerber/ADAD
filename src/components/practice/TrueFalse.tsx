import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

// =============================================
// קומפוננטת תצוגת שבר
// =============================================
interface FractionDisplayProps {
  n: number;
  d: number;
  size?: 'sm' | 'md' | 'lg';
}

const FractionDisplay: React.FC<FractionDisplayProps> = ({ n, d, size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  if (d === 1) {
    return <span className={`${sizes[size]} font-mono font-black text-white ltr-nums`}>{n}</span>;
  }

  return (
    <span className={`${sizes[size]} font-mono font-black text-white ltr-nums`}>
      {n}/{d}
    </span>
  );
};

// =============================================
// קומפוננטה ראשית - נכון/לא נכון
// =============================================
interface TrueFalseProps {
  statement: string;
  isTrue: boolean;
  narrative?: string;
  // אפשרויות ויזואליות
  visual?: {
    left?: { n: number; d: number };
    right?: { n: number; d: number };
    operator?: '>' | '<' | '=' | '+' | '-';
    result?: { n: number; d: number };
  };
  onAnswer: (isCorrect: boolean, userAnswer: boolean) => void;
  disabled?: boolean;
}

export const TrueFalse: React.FC<TrueFalseProps> = ({
  statement,
  isTrue,
  narrative,
  visual,
  onAnswer,
  disabled = false
}) => {
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { playSuccess, playError, playClick } = useSound();

  const handleAnswer = (answer: boolean) => {
    if (disabled || userAnswer !== null) return;

    playClick();
    setUserAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === isTrue;

    setTimeout(() => {
      if (isCorrect) {
        playSuccess();
      } else {
        playError();
      }
    }, 200);

    setTimeout(() => {
      onAnswer(isCorrect, answer);
    }, 1500);
  };

  const isCorrect = userAnswer === isTrue;

  const renderVisual = () => {
    if (!visual) return null;

    const { left, right, operator, result } = visual;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 mb-4"
        dir="ltr"
      >
        {left && <FractionDisplay n={left.n} d={left.d} size="lg" />}

        {operator && (
          <span className="text-3xl font-bold text-amber-400 mx-2">
            {operator}
          </span>
        )}

        {right && <FractionDisplay n={right.n} d={right.d} size="lg" />}

        {result && (
          <>
            <span className="text-3xl font-bold text-white/50 mx-2">=</span>
            <FractionDisplay n={result.n} d={result.d} size="lg" />
          </>
        )}
      </motion.div>
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

      {/* ויזואל */}
      {renderVisual()}

      {/* הטענה */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          relative p-6 rounded-2xl border-2 text-center transition-all duration-300
          ${showResult
            ? isCorrect
              ? 'bg-green-500/10 border-green-500/50'
              : 'bg-red-500/10 border-red-500/50'
            : 'bg-white/5 border-white/20'
          }
        `}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          {statement}
        </h2>

        {/* סימן שאלה אנימטיבי */}
        {!showResult && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 -right-3 text-3xl"
          >
            🤔
          </motion.div>
        )}
      </motion.div>

      {/* כפתורי תשובה */}
      <div className="flex gap-4 w-full max-w-sm">
        {/* כפתור נכון */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={!disabled && userAnswer === null ? { scale: 0.95 } : {}}
          onClick={() => handleAnswer(true)}
          disabled={disabled || userAnswer !== null}
          className={`
            flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300
            flex items-center justify-center gap-2
            ${userAnswer === null
              ? 'bg-green-600/20 border-2 border-green-500/50 text-green-400 hover:bg-green-600/40 hover:scale-105'
              : userAnswer === true
              ? isTrue
                ? 'bg-green-600 border-2 border-green-400 text-white scale-105'
                : 'bg-red-600 border-2 border-red-400 text-white'
              : 'bg-white/5 border-2 border-white/10 text-white/30'
            }
            ${disabled || userAnswer !== null ? 'cursor-default' : 'cursor-pointer'}
          `}
        >
          <ThumbsUp size={24} />
          <span>נכון!</span>
        </motion.button>

        {/* כפתור לא נכון */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={!disabled && userAnswer === null ? { scale: 0.95 } : {}}
          onClick={() => handleAnswer(false)}
          disabled={disabled || userAnswer !== null}
          className={`
            flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300
            flex items-center justify-center gap-2
            ${userAnswer === null
              ? 'bg-red-600/20 border-2 border-red-500/50 text-red-400 hover:bg-red-600/40 hover:scale-105'
              : userAnswer === false
              ? !isTrue
                ? 'bg-green-600 border-2 border-green-400 text-white scale-105'
                : 'bg-red-600 border-2 border-red-400 text-white'
              : 'bg-white/5 border-2 border-white/10 text-white/30'
            }
            ${disabled || userAnswer !== null ? 'cursor-default' : 'cursor-pointer'}
          `}
        >
          <ThumbsDown size={24} />
          <span>לא נכון!</span>
        </motion.button>
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
              ${isCorrect
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }
            `}
          >
            {isCorrect ? (
              <>
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <Check size={28} />
                </motion.div>
                <span>נכון מאוד! 🎉</span>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <X size={28} />
                </motion.div>
                <span>
                  {isTrue
                    ? 'למעשה, הטענה הזו נכונה!'
                    : 'למעשה, הטענה הזו לא נכונה!'
                  }
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* הסבר אחרי תשובה */}
      <AnimatePresence>
        {showResult && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
          >
            <p className="text-white/70 text-sm">
              {isTrue
                ? 'הטענה נכונה - נסה לחשוב למה!'
                : 'הטענה לא נכונה - בדוק שוב את המספרים.'
              }
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrueFalse;
