import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Check, X, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

// =============================================
// טיפוס לפריט לסידור
// =============================================
interface SortItem {
  id: string;
  fraction?: { n: number; d: number };
  text?: string;
  value: number; // ערך מספרי להשוואה
}

// =============================================
// קומפוננטת פריט בודד
// =============================================
interface SortableItemProps {
  item: SortItem;
  index: number;
  total: number;
  isCorrectPosition?: boolean;
  showResult: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  disabled: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({
  item,
  index,
  total,
  isCorrectPosition,
  showResult,
  onMoveUp,
  onMoveDown,
  disabled
}) => {
  const renderContent = () => {
    if (item.fraction) {
      const { n, d } = item.fraction;
      if (d === 1) {
        return <span className="text-2xl font-mono font-black ltr-nums">{n}</span>;
      }
      return (
        <div className="flex flex-col items-center ltr-nums">
          <span className="text-xl font-mono font-black leading-none">{n}</span>
          <div className="w-6 h-0.5 bg-current my-0.5 rounded-full" />
          <span className="text-xl font-mono font-black leading-none">{d}</span>
        </div>
      );
    }
    return <span className="text-xl font-bold">{item.text}</span>;
  };

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      className={`
        relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all
        ${showResult
          ? isCorrectPosition
            ? 'bg-green-500/20 border-green-500 text-green-400'
            : 'bg-red-500/20 border-red-500 text-red-400'
          : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
        }
        ${disabled ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}
      `}
      whileDrag={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
    >
      {/* אייקון גרירה */}
      {!disabled && !showResult && (
        <GripVertical size={20} className="text-white/40 shrink-0" />
      )}

      {/* תוכן */}
      <div className="flex-1 flex justify-center">
        {renderContent()}
      </div>

      {/* כפתורי הזזה למובייל */}
      {!disabled && !showResult && (
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className={`p-1 rounded transition-all ${
              index === 0
                ? 'text-white/20'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <ArrowUp size={16} />
          </button>
          <button
            onClick={onMoveDown}
            disabled={index === total - 1}
            className={`p-1 rounded transition-all ${
              index === total - 1
                ? 'text-white/20'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <ArrowDown size={16} />
          </button>
        </div>
      )}

      {/* אייקון תוצאה */}
      {showResult && (
        <div className={`
          absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
          ${isCorrectPosition ? 'bg-green-500' : 'bg-red-500'}
        `}>
          {isCorrectPosition ? <Check size={14} /> : <X size={14} />}
        </div>
      )}
    </Reorder.Item>
  );
};

// =============================================
// קומפוננטה ראשית - סידור בסדר
// =============================================
interface SortOrderProps {
  question: string;
  narrative?: string;
  items: SortItem[];
  direction: 'ascending' | 'descending'; // מהקטן לגדול או להפך
  onAnswer: (isCorrect: boolean, userOrder: SortItem[]) => void;
  disabled?: boolean;
}

export const SortOrder: React.FC<SortOrderProps> = ({
  question,
  narrative,
  items: initialItems,
  direction,
  onAnswer,
  disabled = false
}) => {
  const { playSuccess, playError, playClick, playTick } = useSound();

  // ערבוב התחלתי של הפריטים
  const [items, setItems] = useState<SortItem[]>(() => {
    const shuffled = [...initialItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [showResult, setShowResult] = useState(false);
  const [correctPositions, setCorrectPositions] = useState<boolean[]>([]);

  // חישוב הסדר הנכון
  const getCorrectOrder = useCallback(() => {
    const sorted = [...initialItems].sort((a, b) =>
      direction === 'ascending' ? a.value - b.value : b.value - a.value
    );
    return sorted;
  }, [initialItems, direction]);

  // בדיקת תשובה
  const checkAnswer = () => {
    playClick();
    const correctOrder = getCorrectOrder();
    const positions = items.map((item, idx) => item.id === correctOrder[idx].id);
    setCorrectPositions(positions);
    setShowResult(true);

    const isAllCorrect = positions.every(p => p);

    setTimeout(() => {
      if (isAllCorrect) {
        playSuccess();
      } else {
        playError();
      }
    }, 200);

    setTimeout(() => {
      onAnswer(isAllCorrect, items);
    }, 1500);
  };

  // הזזה ידנית
  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;

    playTick();
    setItems(prev => {
      const newItems = [...prev];
      const [moved] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, moved);
      return newItems;
    });
  };

  const isAllCorrect = correctPositions.length > 0 && correctPositions.every(p => p);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6" dir="rtl">
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
        className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl"
      >
        <span className="text-amber-400 text-sm font-bold">
          {direction === 'ascending'
            ? 'סדר מהקטן לגדול ⬆️'
            : 'סדר מהגדול לקטן ⬇️'
          }
        </span>
      </motion.div>

      {/* רשימת הפריטים */}
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={disabled || showResult ? () => {} : setItems}
        className="w-full space-y-2"
      >
        <AnimatePresence>
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              item={item}
              index={index}
              total={items.length}
              isCorrectPosition={correctPositions[index]}
              showResult={showResult}
              onMoveUp={() => moveItem(index, index - 1)}
              onMoveDown={() => moveItem(index, index + 1)}
              disabled={disabled || showResult}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* כפתור בדיקה */}
      {!showResult && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
          disabled={disabled}
          className="px-8 py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
        >
          בדוק סדר
        </motion.button>
      )}

      {/* משוב */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`
              flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-lg
              ${isAllCorrect
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }
            `}
          >
            {isAllCorrect ? (
              <>
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <Check size={28} />
                </motion.div>
                <span>מושלם! הסדר נכון! 🎉</span>
              </>
            ) : (
              <>
                <X size={28} />
                <span>
                  כמעט! {correctPositions.filter(p => p).length} מתוך {items.length} במקום הנכון
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* הצגת הסדר הנכון אם טעו */}
      <AnimatePresence>
        {showResult && !isAllCorrect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            <p className="text-white/60 text-sm mb-3 text-center">הסדר הנכון:</p>
            <div className="flex justify-center gap-2 flex-wrap" dir="ltr">
              {getCorrectOrder().map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg"
                >
                  <span className="text-xs text-green-400/60">{idx + 1}.</span>
                  {item.fraction ? (
                    <span className="text-green-400 font-mono font-bold ltr-nums">
                      {item.fraction.d === 1 ? item.fraction.n : `${item.fraction.n}/${item.fraction.d}`}
                    </span>
                  ) : (
                    <span className="text-green-400 font-bold">{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortOrder;
