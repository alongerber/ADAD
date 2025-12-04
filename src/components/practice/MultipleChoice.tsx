import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { ChoiceOption, VisualContent } from '../../types/curriculum';
import { useSound } from '../../hooks/useSound';

// =============================================
// קומפוננטת ויזואל לשבר (פיצה/כוסית)
// =============================================
interface FractionVisualProps {
  type: 'pizza' | 'beaker' | 'chocolate';
  slices: number;
  filled: number;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const FractionVisual: React.FC<FractionVisualProps> = ({
  type,
  slices,
  filled,
  size = 'md',
  animate = true
}) => {
  const sizes = {
    sm: 60,
    md: 80,
    lg: 100
  };
  const s = sizes[size];

  if (type === 'pizza') {
    const radius = s / 2 - 5;
    const center = s / 2;

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
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {Array.from({ length: slices }).map((_, i) => (
          <motion.path
            key={i}
            d={createSlicePath(i, slices)}
            fill={i < filled ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            initial={animate ? { opacity: 0, scale: 0.8 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
          />
        ))}
        <circle cx={center} cy={center} r="3" fill="rgba(255,255,255,0.5)" />
      </svg>
    );
  }

  if (type === 'beaker' || type === 'chocolate') {
    const fillHeight = (filled / slices) * (s - 20);
    return (
      <svg width={s * 0.6} height={s} viewBox="0 0 40 60">
        <rect
          x="5"
          y="5"
          width="30"
          height="50"
          rx="3"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
        {/* Division lines */}
        {Array.from({ length: slices - 1 }).map((_, i) => {
          const y = 55 - ((i + 1) / slices) * 50;
          return (
            <line
              key={i}
              x1="8"
              y1={y}
              x2="32"
              y2={y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          );
        })}
        {/* Fill */}
        <motion.rect
          x="7"
          width="26"
          rx="2"
          fill="url(#fillGradient)"
          initial={animate ? { height: 0, y: 53 } : { height: fillHeight, y: 53 - fillHeight }}
          animate={{ height: fillHeight, y: 53 - fillHeight }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return null;
};

// =============================================
// קומפוננטת תצוגת שבר
// =============================================
interface FractionDisplayProps {
  numerator: number;
  denominator: number;
  size?: 'sm' | 'md' | 'lg';
}

const FractionDisplay: React.FC<FractionDisplayProps> = ({
  numerator,
  denominator,
  size = 'md'
}) => {
  const sizes = {
    sm: { text: 'text-lg', line: 'w-4 h-0.5' },
    md: { text: 'text-2xl', line: 'w-6 h-0.5' },
    lg: { text: 'text-3xl', line: 'w-8 h-1' }
  };
  const s = sizes[size];

  if (denominator === 1) {
    return <span className={`${s.text} font-mono font-black text-white ltr-nums`}>{numerator}</span>;
  }

  return (
    <div className="flex flex-col items-center ltr-nums">
      <span className={`${s.text} font-mono font-black text-white leading-none`}>{numerator}</span>
      <div className={`${s.line} bg-white/70 rounded-full my-0.5`} />
      <span className={`${s.text} font-mono font-black text-white leading-none`}>{denominator}</span>
    </div>
  );
};

// =============================================
// קומפוננטה ראשית - בחירה מרובה
// =============================================
interface MultipleChoiceProps {
  question: string;
  narrative?: string;
  options: ChoiceOption[];
  correctIndex: number;
  onAnswer: (isCorrect: boolean, selectedIndex: number) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  narrative,
  options,
  correctIndex,
  onAnswer,
  disabled = false,
  showFeedback = true
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [answered, setAnswered] = useState(false);
  const { playSuccess, playError, playClick } = useSound();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // פוקוס ראשוני על האפשרות הראשונה
  useEffect(() => {
    if (!disabled && !answered && optionRefs.current[0]) {
      optionRefs.current[0]?.focus();
    }
  }, [disabled, answered]);

  // ניווט מקלדת
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (disabled || answered) return;

    let nextIndex = index;
    const numOptions = options.length;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + 1) % numOptions;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - 1 + numOptions) % numOptions;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelect(index);
        return;
      default:
        return;
    }

    setFocusedIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  }, [disabled, answered, options.length]);

  const handleSelect = (index: number) => {
    if (disabled || answered) return;

    playClick();
    setSelectedIndex(index);
    setAnswered(true);

    const isCorrect = index === correctIndex;

    // Play sound after short delay for feedback
    setTimeout(() => {
      if (isCorrect) {
        playSuccess();
      } else {
        playError();
      }
    }, 200);

    // Delay callback to show feedback animation
    setTimeout(() => {
      onAnswer(isCorrect, index);
    }, showFeedback ? 1500 : 500);
  };

  // יצירת תיאור נגיש לאפשרות
  const getOptionAriaLabel = (option: ChoiceOption, index: number): string => {
    if (option.text) return `אפשרות ${index + 1}: ${option.text}`;
    if (option.fraction) return `אפשרות ${index + 1}: ${option.fraction.n} חלקי ${option.fraction.d}`;
    if (option.visual) return `אפשרות ${index + 1}: איור ויזואלי`;
    return `אפשרות ${index + 1}`;
  };

  const getOptionStyle = (index: number) => {
    if (!answered) {
      return 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 hover:scale-105';
    }

    if (index === correctIndex) {
      return 'bg-green-500/20 border-green-500 scale-105';
    }

    if (index === selectedIndex && index !== correctIndex) {
      return 'bg-red-500/20 border-red-500 scale-95 opacity-70';
    }

    return 'bg-white/5 border-white/10 opacity-50';
  };

  const renderOptionContent = (option: ChoiceOption) => {
    // אם יש ויזואל
    if (option.visual) {
      const v = option.visual;
      return (
        <FractionVisual
          type={v.type as 'pizza' | 'beaker' | 'chocolate'}
          slices={v.props?.slices || 4}
          filled={v.props?.filled || 0}
          size="md"
          animate={!answered}
        />
      );
    }

    // אם יש שבר
    if (option.fraction) {
      return (
        <FractionDisplay
          numerator={option.fraction.n}
          denominator={option.fraction.d}
          size="lg"
        />
      );
    }

    // אם יש טקסט
    if (option.text) {
      return (
        <span className="text-xl font-bold text-white">{option.text}</span>
      );
    }

    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6" dir="rtl">
      {/* שאלה */}
      <div className="text-center">
        {narrative && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/60 text-sm mb-2"
          >
            {narrative}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl md:text-2xl font-bold text-white"
        >
          {question}
        </motion.h2>
      </div>

      {/* אפשרויות */}
      <div
        className="grid grid-cols-2 gap-3 md:gap-4 w-full"
        role="radiogroup"
        aria-label="אפשרויות תשובה"
      >
        {options.map((option, index) => (
          <motion.button
            key={index}
            ref={(el) => { optionRefs.current[index] = el; }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={!disabled && !answered ? { scale: 0.95 } : {}}
            onClick={() => handleSelect(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={disabled || answered}
            role="radio"
            aria-checked={selectedIndex === index}
            aria-label={getOptionAriaLabel(option, index)}
            tabIndex={focusedIndex === index ? 0 : -1}
            className={`
              relative p-4 md:p-6 rounded-xl border-2 transition-all duration-300
              flex flex-col items-center justify-center gap-2 min-h-[100px] md:min-h-[140px]
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900
              ${getOptionStyle(index)}
              ${!disabled && !answered ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            {renderOptionContent(option)}

            {/* תווית טקסט מתחת לויזואל */}
            {option.visual && option.text && (
              <span className="text-sm text-white/70 mt-1">{option.text}</span>
            )}

            {/* אייקון משוב */}
            <AnimatePresence>
              {answered && showFeedback && (
                <>
                  {index === correctIndex && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Check size={20} className="text-white" />
                    </motion.div>
                  )}
                  {index === selectedIndex && index !== correctIndex && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <X size={20} className="text-white" />
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* משוב */}
      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {answered && showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className={`
                px-6 py-3 rounded-xl font-bold text-lg
                ${selectedIndex === correctIndex
                  ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                  : 'bg-red-500/20 border border-red-500/50 text-red-400'
                }
              `}
            >
              {selectedIndex === correctIndex ? (
                <span>מעולה! תשובה נכונה! 🎉</span>
              ) : (
                <span>לא בדיוק... התשובה הנכונה מסומנת בירוק</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultipleChoice;
