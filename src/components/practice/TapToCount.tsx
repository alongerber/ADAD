import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';

// =============================================
// קומפוננטת חלק בודד (פרוסה/חתיכה)
// =============================================
interface SliceProps {
  index: number;
  total: number;
  isSelected: boolean;
  onTap: () => void;
  disabled: boolean;
  type: 'pizza' | 'cake' | 'chocolate';
}

const Slice: React.FC<SliceProps> = ({
  index,
  total,
  isSelected,
  onTap,
  disabled,
  type
}) => {
  if (type === 'pizza') {
    // פיצה עגולה - כל פרוסה היא משולש
    const size = 200;
    const radius = size / 2 - 10;
    const center = size / 2;

    const startAngle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((index + 1) / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;
    const path = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;

    return (
      <motion.path
        d={path}
        fill={isSelected ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        onClick={disabled ? undefined : onTap}
        whileHover={disabled ? {} : { scale: 1.05, filter: 'brightness(1.2)' }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        animate={{
          fill: isSelected ? '#f59e0b' : 'rgba(255,255,255,0.1)',
          scale: isSelected ? 1.02 : 1
        }}
        transition={{ duration: 0.2 }}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      />
    );
  }

  // חלוקה מלבנית (עוגה/שוקולד)
  const cols = total <= 4 ? total : Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);
  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;

  return (
    <motion.div
      onClick={disabled ? undefined : onTap}
      whileHover={disabled ? {} : { scale: 1.1, zIndex: 10 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      animate={{
        backgroundColor: isSelected
          ? type === 'cake' ? '#ec4899' : '#92400e'
          : 'rgba(255,255,255,0.1)'
      }}
      className={`
        absolute border border-white/30 rounded-sm
        ${disabled ? '' : 'cursor-pointer'}
        transition-colors duration-200
      `}
      style={{
        width: `${cellWidth}%`,
        height: `${cellHeight}%`,
        left: `${col * cellWidth}%`,
        top: `${row * cellHeight}%`
      }}
    />
  );
};

// =============================================
// קומפוננטה ראשית - ספירת הקשות
// =============================================
interface TapToCountProps {
  question: string;
  narrative?: string;
  totalParts: number;
  targetCount: number;
  type?: 'pizza' | 'cake' | 'chocolate';
  onAnswer: (isCorrect: boolean, selectedCount: number) => void;
  disabled?: boolean;
}

export const TapToCount: React.FC<TapToCountProps> = ({
  question,
  narrative,
  totalParts,
  targetCount,
  type = 'pizza',
  onAnswer,
  disabled = false
}) => {
  const [selectedParts, setSelectedParts] = useState<Set<number>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const selectedCount = selectedParts.size;
  const isCorrect = selectedCount === targetCount;

  const handleTap = useCallback((index: number) => {
    if (disabled || isSubmitted) return;

    setSelectedParts(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, [disabled, isSubmitted]);

  const handleSubmit = () => {
    if (disabled || isSubmitted) return;

    setIsSubmitted(true);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(isCorrect, selectedCount);
    }, 1500);
  };

  const handleReset = () => {
    if (disabled || isSubmitted) return;
    setSelectedParts(new Set());
  };

  const renderShape = () => {
    if (type === 'pizza') {
      return (
        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
          {/* רקע העיגול */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          {/* הפרוסות */}
          {Array.from({ length: totalParts }).map((_, i) => (
            <Slice
              key={i}
              index={i}
              total={totalParts}
              isSelected={selectedParts.has(i)}
              onTap={() => handleTap(i)}
              disabled={disabled || isSubmitted}
              type="pizza"
            />
          ))}
          {/* נקודה מרכזית */}
          <circle cx="100" cy="100" r="5" fill="rgba(255,255,255,0.5)" />
        </svg>
      );
    }

    // צורה מלבנית
    const cols = totalParts <= 4 ? totalParts : Math.ceil(Math.sqrt(totalParts));
    const rows = Math.ceil(totalParts / cols);
    const width = cols * 50;
    const height = rows * 50;

    return (
      <div
        className="relative rounded-lg overflow-hidden border-2 border-white/30 bg-white/5"
        style={{ width, height }}
      >
        {Array.from({ length: totalParts }).map((_, i) => (
          <Slice
            key={i}
            index={i}
            total={totalParts}
            isSelected={selectedParts.has(i)}
            onTap={() => handleTap(i)}
            disabled={disabled || isSubmitted}
            type={type}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6" dir="rtl">
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

      {/* הוראה */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-amber-400 font-bold"
      >
        הקש על {targetCount} חלקים!
      </motion.p>

      {/* הצורה */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="relative"
      >
        {renderShape()}

        {/* אנימציית הצלחה */}
        <AnimatePresence>
          {showResult && isCorrect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-green-500/30 rounded-full"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Check size={32} className="text-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* מונה */}
      <div className="flex items-center gap-4">
        <div className={`
          px-6 py-3 rounded-xl border-2 transition-all duration-300
          ${selectedCount === targetCount
            ? 'bg-green-500/20 border-green-500 text-green-400'
            : selectedCount > targetCount
            ? 'bg-red-500/20 border-red-500 text-red-400'
            : 'bg-white/5 border-white/20 text-white'
          }
        `}>
          <span className="text-3xl font-mono font-black">{selectedCount}</span>
          <span className="text-lg opacity-60 mx-2">/</span>
          <span className="text-xl font-mono opacity-60">{totalParts}</span>
        </div>

        {/* כפתור איפוס */}
        {!isSubmitted && selectedCount > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="p-3 rounded-full bg-white/10 border border-white/20 text-white/60 hover:bg-white/20 hover:text-white transition-all"
          >
            <RotateCcw size={20} />
          </motion.button>
        )}
      </div>

      {/* כפתור אישור */}
      {!isSubmitted && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={selectedCount === 0}
          className={`
            px-8 py-3 rounded-xl font-bold text-lg transition-all
            ${selectedCount === 0
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : selectedCount === targetCount
              ? 'bg-green-600 text-white shadow-lg shadow-green-500/30 hover:bg-green-500'
              : 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 hover:bg-amber-500'
            }
          `}
        >
          {selectedCount === 0 ? 'בחר חלקים' : 'בדוק תשובה'}
        </motion.button>
      )}

      {/* משוב */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              px-6 py-3 rounded-xl font-bold text-lg
              ${isCorrect
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }
            `}
          >
            {isCorrect ? (
              <span>מדהים! בחרת בדיוק {targetCount} חלקים! 🎉</span>
            ) : (
              <span>
                בחרת {selectedCount} חלקים, אבל צריך {targetCount}.
                {selectedCount > targetCount ? ' יותר מדי!' : ' חסרים עוד!'}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TapToCount;
