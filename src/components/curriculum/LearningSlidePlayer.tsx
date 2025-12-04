import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lightbulb, HelpCircle, Sparkles, Home } from 'lucide-react';
import { LearningSlide } from '../../types/curriculum';

// =============================================
// תצוגת ויזואל (פיצה/השוואה)
// =============================================
interface VisualDisplayProps {
  visual: LearningSlide['content']['visual'];
}

const VisualDisplay: React.FC<VisualDisplayProps> = ({ visual }) => {
  if (!visual) return null;

  if (visual.type === 'pizza') {
    const { slices, filled, showLabels } = visual.props;
    const size = 180;
    const radius = size / 2 - 10;
    const center = size / 2;

    return (
      <div className="flex flex-col items-center gap-3">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
          {/* רקע */}
          <circle cx={center} cy={center} r={radius} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

          {/* פרוסות */}
          {Array.from({ length: slices }).map((_, i) => {
            const startAngle = (i / slices) * 2 * Math.PI - Math.PI / 2;
            const endAngle = ((i + 1) / slices) * 2 * Math.PI - Math.PI / 2;
            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);
            const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;
            const path = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;

            return (
              <path
                key={i}
                d={path}
                fill={i < filled ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
            );
          })}

          {/* נקודה מרכזית */}
          <circle cx={center} cy={center} r="4" fill="rgba(255,255,255,0.5)" />
        </svg>

        {showLabels && (
          <div className="text-center">
            <span className="text-2xl font-mono font-black text-amber-400">
              {filled}/{slices}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (visual.type === 'comparison' && visual.props.comparison) {
    const { left, right, operator } = visual.props.comparison;

    const renderFraction = (f: { n: number; d: number }, color: string) => (
      <div className={`flex flex-col items-center p-4 bg-white/10 rounded-xl border border-white/20`}>
        <span className={`text-4xl font-mono font-black ${color}`}>{f.n}</span>
        <div className="w-10 h-1 bg-white/50 rounded my-1" />
        <span className={`text-4xl font-mono font-black ${color}`}>{f.d}</span>
      </div>
    );

    return (
      <div className="flex items-center gap-4" dir="ltr">
        {renderFraction(left, 'text-cyan-400')}
        <span className="text-4xl font-bold text-amber-400">{operator}</span>
        {renderFraction(right, 'text-pink-400')}
      </div>
    );
  }

  return null;
};

// =============================================
// קומפוננטה ראשית - נגן שקופיות
// =============================================
interface LearningSlidePlayerProps {
  slides: LearningSlide[];
  onComplete: () => void;
  stepTitle: string;
  onBack?: () => void;
}

export const LearningSlidePlayer: React.FC<LearningSlidePlayerProps> = ({
  slides,
  onComplete,
  stepTitle,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];
  const isLast = currentIndex === slides.length - 1;
  const isFirst = currentIndex === 0;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const getSlideIcon = () => {
    switch (currentSlide.type) {
      case 'story': return '📖';
      case 'discovery': return <HelpCircle className="text-amber-400" size={28} />;
      case 'visual': return <Sparkles className="text-purple-400" size={28} />;
      case 'summary': return <Lightbulb className="text-yellow-400" size={28} />;
      default: return '📝';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex flex-col bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900"
      dir="rtl"
    >
      {/* רקע */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* כפתור חזרה */}
      {onBack && (
        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={onBack}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
          >
            <Home size={24} />
          </button>
        </div>
      )}

      {/* כותרת */}
      <header className="relative z-10 w-full p-4 md:p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 md:p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
              {typeof getSlideIcon() === 'string' ? (
                <span className="text-2xl">{getSlideIcon()}</span>
              ) : getSlideIcon()}
            </div>
            <div>
              <div className="text-xs md:text-sm text-purple-400 font-bold">{stepTitle}</div>
              <div className="text-lg md:text-xl font-bold text-white">{currentSlide.title}</div>
            </div>
          </div>

          {/* מונה שקופיות */}
          <div className="text-white/60 text-sm">
            {currentIndex + 1} / {slides.length}
          </div>
        </div>

        {/* סרגל התקדמות */}
        <div className="max-w-2xl mx-auto mt-4">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* תוכן */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-xl flex flex-col items-center gap-6"
          >
            {/* אמוג'י */}
            {currentSlide.content.emoji && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="text-6xl md:text-8xl"
              >
                {currentSlide.content.emoji}
              </motion.div>
            )}

            {/* ויזואל */}
            {currentSlide.content.visual && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VisualDisplay visual={currentSlide.content.visual} />
              </motion.div>
            )}

            {/* שאלה */}
            {currentSlide.content.question && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-6 py-3 bg-amber-500/20 border border-amber-500/30 rounded-xl"
              >
                <p className="text-xl md:text-2xl font-bold text-amber-300 text-center">
                  {currentSlide.content.question}
                </p>
              </motion.div>
            )}

            {/* טקסט ראשי */}
            {currentSlide.content.text && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-white/90 text-center leading-relaxed"
              >
                {currentSlide.content.text}
              </motion.p>
            )}

            {/* הדגשה */}
            {currentSlide.content.highlight && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50 rounded-2xl"
              >
                <p className="text-xl md:text-2xl font-black text-white text-center">
                  {currentSlide.content.highlight}
                </p>
              </motion.div>
            )}

            {/* טקסט משני */}
            {currentSlide.content.subtext && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-lg text-white/60 text-center"
              >
                {currentSlide.content.subtext}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* כפתורי ניווט */}
      <footer className="relative z-10 w-full p-4 md:p-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          {/* כפתור הקודם */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={isFirst}
            className={`p-3 md:p-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
              isFirst
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ChevronRight size={24} />
            <span className="hidden md:inline">הקודם</span>
          </motion.button>

          {/* נקודות */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-purple-400 w-6'
                    : idx < currentIndex
                    ? 'bg-purple-400/50'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* כפתור הבא */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${
              isLast
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
            }`}
          >
            <span>{isLast ? 'בוא נתרגל!' : 'הבא'}</span>
            <ChevronLeft size={24} />
          </motion.button>
        </div>
      </footer>
    </motion.div>
  );
};

export default LearningSlidePlayer;
