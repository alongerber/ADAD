import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, GraduationCap, Play, RotateCcw } from 'lucide-react';

interface LearningSlide {
  id: string;
  title: string;
  content: React.ReactNode;
  interactive?: boolean;
}

interface LearningModeProps {
  topicId: string;
  topicTitle: string;
  topicIcon: string;
  slides: LearningSlide[];
  onComplete: () => void;
  onSkip: () => void;
}

export const LearningMode: React.FC<LearningModeProps> = ({
  topicId,
  topicTitle,
  topicIcon,
  slides,
  onComplete,
  onSkip
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const slide = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 overflow-hidden"
      dir="rtl"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="w-full flex items-center justify-between p-4 md:p-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-xl bg-white/10 border border-white/20">
            <span className="text-2xl md:text-3xl">{topicIcon}</span>
          </div>
          <div>
            <div className="text-xs md:text-sm text-purple-300 font-bold">מצב למידה</div>
            <div className="text-lg md:text-xl font-bold text-white">{topicTitle}</div>
          </div>
        </div>

        <button
          onClick={onSkip}
          className="p-2 md:p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
        >
          <X size={20} />
        </button>
      </header>

      {/* Progress bar */}
      <div className="w-full max-w-2xl px-4 relative z-10">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/50">
          <span>שלב {currentSlide + 1} מתוך {slides.length}</span>
          <span>{slide.title}</span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 w-full max-w-3xl px-4 py-4 md:py-6 relative z-10 overflow-y-auto flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center">
              {slide.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <footer className="w-full max-w-2xl px-4 pb-6 md:pb-8 relative z-10">
        <div className="flex items-center justify-between gap-4">
          {/* Previous button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
              currentSlide === 0
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ChevronRight size={20} />
            <span className="hidden md:inline">הקודם</span>
          </motion.button>

          {/* Slide dots */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'bg-purple-400 scale-125'
                    : idx < currentSlide
                    ? 'bg-purple-400/50'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Next/Complete button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              isLastSlide
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
            }`}
          >
            <span>{isLastSlide ? 'בוא נתרגל!' : 'הבא'}</span>
            {isLastSlide ? <Play size={20} fill="currentColor" /> : <ChevronLeft size={20} />}
          </motion.button>
        </div>
      </footer>
    </motion.div>
  );
};

// =============================================
// Animated Visual Components for Learning
// =============================================

interface AnimatedBeakerProps {
  fillLevel: number;
  showDivisions?: number;
  highlightPart?: number;
  animate?: boolean;
}

export const AnimatedBeaker: React.FC<AnimatedBeakerProps> = ({
  fillLevel,
  showDivisions = 0,
  highlightPart = 0,
  animate = true
}) => {
  return (
    <div className="relative w-24 h-36 md:w-32 md:h-48">
      {/* Beaker outline */}
      <svg viewBox="0 0 100 140" className="w-full h-full">
        {/* Beaker body */}
        <path
          d="M15 20 L15 120 Q15 130 25 130 L75 130 Q85 130 85 120 L85 20"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Division lines */}
        {showDivisions > 0 && Array.from({ length: showDivisions - 1 }).map((_, i) => {
          const y = 120 - ((i + 1) / showDivisions) * 100;
          return (
            <line
              key={i}
              x1="20"
              y1={y}
              x2="80"
              y2={y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Fill */}
        <motion.rect
          x="17"
          y={120 - fillLevel * 100}
          width="66"
          height={fillLevel * 100}
          rx="2"
          fill="url(#liquidGradient)"
          initial={animate ? { height: 0, y: 120 } : {}}
          animate={{ height: fillLevel * 100, y: 120 - fillLevel * 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Highlight indicator */}
      {highlightPart > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -right-8 top-1/2 -translate-y-1/2 text-4xl"
        >
          👈
        </motion.div>
      )}
    </div>
  );
};

interface AnimatedPizzaProps {
  slices: number;
  filledSlices: number;
  animate?: boolean;
}

export const AnimatedPizza: React.FC<AnimatedPizzaProps> = ({
  slices,
  filledSlices,
  animate = true
}) => {
  const radius = 60;
  const center = 70;

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
    <div className="relative w-28 h-28 md:w-36 md:h-36">
      <svg viewBox="0 0 140 140" className="w-full h-full">
        {/* Pizza slices */}
        {Array.from({ length: slices }).map((_, i) => (
          <motion.path
            key={i}
            d={createSlicePath(i, slices)}
            fill={i < filledSlices ? "#f59e0b" : "rgba(255,255,255,0.1)"}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            initial={animate ? { opacity: 0, scale: 0.8 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}

        {/* Center dot */}
        <circle cx={center} cy={center} r="5" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  );
};

interface FractionDisplayProps {
  numerator: number;
  denominator: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
}

export const FractionDisplay: React.FC<FractionDisplayProps> = ({
  numerator,
  denominator,
  label,
  size = 'md',
  highlight = false
}) => {
  const sizes = {
    sm: { num: 'text-xl md:text-2xl', denom: 'text-xl md:text-2xl', line: 'w-6 md:w-8 h-0.5', label: 'text-xs', padding: 'p-2 md:p-3' },
    md: { num: 'text-2xl md:text-4xl', denom: 'text-2xl md:text-4xl', line: 'w-8 md:w-12 h-0.5 md:h-1', label: 'text-sm', padding: 'p-3 md:p-4' },
    lg: { num: 'text-3xl md:text-5xl', denom: 'text-3xl md:text-5xl', line: 'w-10 md:w-14 h-0.5 md:h-1', label: 'text-base', padding: 'p-4 md:p-5' }
  };

  const s = sizes[size];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex flex-col items-center gap-1 ${s.padding} rounded-xl border ${
        highlight
          ? 'bg-purple-500/20 border-purple-500/50'
          : 'bg-white/5 border-white/10'
      }`}
    >
      {label && <span className={`${s.label} text-white/60 mb-1`}>{label}</span>}
      <div className="flex flex-col items-center">
        <span className={`${s.num} font-mono font-black text-white`}>{numerator}</span>
        <div className={`${s.line} bg-white/50 rounded-full my-1`} />
        <span className={`${s.denom} font-mono font-black text-white`}>{denominator}</span>
      </div>
    </motion.div>
  );
};

// =============================================
// Pre-built Learning Content for Fractions
// =============================================

export const createFractionLearningSlides = (topicNumber: number): LearningSlide[] => {
  switch (topicNumber) {
    case 1: // הכרת שברים בסיסיים
      return [
        {
          id: 'intro',
          title: 'מה זה שבר?',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl"
              >
                🍕
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">מה זה שבר?</h2>
              <p className="text-lg text-white/80 max-w-md">
                שבר הוא דרך לתאר <span className="text-amber-400 font-bold">חלק</span> ממשהו שלם.
              </p>
              <p className="text-base text-white/60">
                למשל: חצי פיצה, רבע עוגה, שלושה רבעים מכוס מיץ...
              </p>
            </div>
          )
        },
        {
          id: 'parts',
          title: 'חלקים שווים',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">חלקים שווים</h2>
              <p className="text-lg text-white/80 max-w-md">
                כשמחלקים משהו לשבר, כל החלקים צריכים להיות <span className="text-purple-400 font-bold">שווים בגודל!</span>
              </p>
              <div className="flex gap-8 items-center mt-4">
                <div className="flex flex-col items-center gap-2">
                  <AnimatedPizza slices={4} filledSlices={0} />
                  <span className="text-sm text-white/60">4 חלקים שווים</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AnimatedPizza slices={2} filledSlices={0} />
                  <span className="text-sm text-white/60">2 חלקים שווים</span>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'numerator',
          title: 'המונה',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-8">
                <AnimatedPizza slices={4} filledSlices={1} />
                <FractionDisplay numerator={1} denominator={4} size="lg" />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-purple-400 mb-2">המונה (המספר למעלה)</h3>
                <p className="text-white/80">
                  המונה אומר לנו <span className="text-amber-400 font-bold">כמה חלקים לקחנו</span>.
                </p>
                <p className="text-white/60 text-sm mt-2">
                  פה לקחנו חלק 1, אז המונה הוא 1.
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'denominator',
          title: 'המכנה',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-8">
                <AnimatedPizza slices={4} filledSlices={1} />
                <FractionDisplay numerator={1} denominator={4} size="lg" />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">המכנה (המספר למטה)</h3>
                <p className="text-white/80">
                  המכנה אומר לנו <span className="text-amber-400 font-bold">לכמה חלקים חילקנו</span> את השלם.
                </p>
                <p className="text-white/60 text-sm mt-2">
                  פה חילקנו ל-4 חלקים, אז המכנה הוא 4.
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'half',
          title: 'חצי - ½',
          content: (
            <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">חצי = ½</h2>
              <div className="flex items-center gap-4 md:gap-8">
                <FractionDisplay numerator={1} denominator={2} size="md" highlight />
                <AnimatedBeaker fillLevel={0.5} showDivisions={2} />
              </div>
              <p className="text-sm md:text-base text-white/80 max-w-sm">
                <span className="text-amber-400 font-bold">חצי</span> זה כשמחלקים משהו ל-<span className="text-cyan-400">2</span> חלקים שווים ולוקחים <span className="text-purple-400">1</span>.
              </p>
            </div>
          )
        },
        {
          id: 'quarter',
          title: 'רבע - ¼',
          content: (
            <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">רבע = ¼</h2>
              <div className="flex items-center gap-4 md:gap-8">
                <FractionDisplay numerator={1} denominator={4} size="md" highlight />
                <AnimatedPizza slices={4} filledSlices={1} />
              </div>
              <p className="text-sm md:text-base text-white/80 max-w-sm">
                <span className="text-amber-400 font-bold">רבע</span> זה כשמחלקים משהו ל-<span className="text-cyan-400">4</span> חלקים שווים ולוקחים <span className="text-purple-400">1</span>.
              </p>
              <p className="text-xs md:text-sm text-white/60">רבע קטן מחצי!</p>
            </div>
          )
        },
        {
          id: 'three_quarters',
          title: 'שלושה רבעים - ¾',
          content: (
            <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">שלושה רבעים = ¾</h2>
              <div className="flex items-center gap-4 md:gap-8">
                <FractionDisplay numerator={3} denominator={4} size="md" highlight />
                <AnimatedPizza slices={4} filledSlices={3} />
              </div>
              <p className="text-sm md:text-base text-white/80 max-w-sm">
                <span className="text-amber-400 font-bold">שלושה רבעים</span> זה <span className="text-purple-400">3</span> חלקים מתוך <span className="text-cyan-400">4</span>.
              </p>
              <p className="text-xs md:text-sm text-white/60">זה יותר מחצי, אבל פחות משלם!</p>
            </div>
          )
        },
        {
          id: 'summary',
          title: 'סיכום',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl"
              >
                🎓
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">מעולה! למדת את הבסיס!</h2>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl">
                  <FractionDisplay numerator={1} denominator={2} size="sm" />
                  <span className="text-xs text-white/60 mt-2">חצי</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl">
                  <FractionDisplay numerator={1} denominator={4} size="sm" />
                  <span className="text-xs text-white/60 mt-2">רבע</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl">
                  <FractionDisplay numerator={3} denominator={4} size="sm" />
                  <span className="text-xs text-white/60 mt-2">שלושה רבעים</span>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-4">
                עכשיו בוא נתרגל במעבדה!
              </p>
            </div>
          )
        }
      ];

    case 2: // תרגול והשוואה
      return [
        {
          id: 'intro',
          title: 'השוואת שברים',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl"
              >
                ⚖️
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">איזה שבר גדול יותר?</h2>
              <p className="text-lg text-white/80 max-w-md">
                עכשיו נלמד איך להשוות בין שברים ולהבין מי גדול יותר!
              </p>
            </div>
          )
        },
        {
          id: 'compare_visual',
          title: 'השוואה ויזואלית',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">מה גדול יותר: ½ או ¼?</h2>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <AnimatedBeaker fillLevel={0.5} showDivisions={2} />
                  <FractionDisplay numerator={1} denominator={2} size="sm" />
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl text-amber-400"
                >
                  &gt;
                </motion.span>
                <div className="flex flex-col items-center">
                  <AnimatedBeaker fillLevel={0.25} showDivisions={4} />
                  <FractionDisplay numerator={1} denominator={4} size="sm" />
                </div>
              </div>
              <p className="text-white/80">
                <span className="text-amber-400 font-bold">חצי גדול מרבע!</span> אפשר לראות את זה בבקבוקים.
              </p>
            </div>
          )
        },
        {
          id: 'rule',
          title: 'הכלל החשוב',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="p-6 bg-purple-500/20 rounded-2xl border-2 border-purple-500/50">
                <h2 className="text-xl md:text-2xl font-bold text-purple-300 mb-4">כלל זהב!</h2>
                <p className="text-lg text-white">
                  כשהמונה שווה (למעלה),<br/>
                  <span className="text-amber-400 font-bold">המכנה הגדול יותר = השבר הקטן יותר!</span>
                </p>
              </div>
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <FractionDisplay numerator={1} denominator={2} size="md" />
                  <div className="text-green-400 font-bold mt-2">גדול</div>
                </div>
                <div className="text-center">
                  <FractionDisplay numerator={1} denominator={4} size="md" />
                  <div className="text-red-400 font-bold mt-2">קטן</div>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                כי ככל שמחלקים ליותר חלקים, כל חלק קטן יותר!
              </p>
            </div>
          )
        },
        {
          id: 'equivalent',
          title: 'שברים שווים',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">שברים שונים, אותו ערך!</h2>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <AnimatedBeaker fillLevel={0.5} showDivisions={2} />
                  <FractionDisplay numerator={1} denominator={2} size="sm" />
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl text-green-400"
                >
                  =
                </motion.span>
                <div className="flex flex-col items-center">
                  <AnimatedBeaker fillLevel={0.5} showDivisions={4} />
                  <FractionDisplay numerator={2} denominator={4} size="sm" />
                </div>
              </div>
              <p className="text-lg text-white/80">
                <span className="text-amber-400">½ = 2/4</span> - שניהם חצי!
              </p>
            </div>
          )
        },
        {
          id: 'summary',
          title: 'סיכום',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="text-5xl">✨</span>
              <h2 className="text-2xl font-bold text-white">נהדר!</h2>
              <div className="text-right space-y-3 bg-white/5 p-4 rounded-xl">
                <p className="text-white/80">✓ ½ &gt; ¼ (חצי גדול מרבע)</p>
                <p className="text-white/80">✓ ¾ &gt; ½ (שלושה רבעים גדול מחצי)</p>
                <p className="text-white/80">✓ ½ = 2/4 (שברים שווים!)</p>
              </div>
              <p className="text-white/60 text-sm">בוא נתרגל!</p>
            </div>
          )
        }
      ];

    case 3: // חיבור שברים
      return [
        {
          id: 'story',
          title: 'סיפור הפיצה',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-5xl"
              >
                🍕
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-white">מסיבת פיצה!</h2>
              <div className="bg-white/5 p-4 rounded-xl max-w-sm text-right leading-relaxed">
                <p className="text-white/90 text-base md:text-lg">
                  הזמנתם פיצה גדולה למסיבה.
                  <br/>
                  <span className="text-amber-400">חתכו אותה ל-4 משולשים שווים.</span>
                  <br/><br/>
                  לקחת משולש אחד. 🍕
                  <br/>
                  החבר הכי טוב שלך נתן לך עוד משולש! 🍕
                </p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-amber-400 font-bold"
              >
                כמה משולשים יש לך עכשיו?
              </motion.p>
            </div>
          )
        },
        {
          id: 'counting',
          title: 'סופרים חלקים!',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">בוא נספור!</h2>
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-4xl">🍕</div>
                  <span className="text-amber-400 font-bold">1</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-white/50"
                >+</motion.span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-4xl">🍕</div>
                  <span className="text-amber-400 font-bold">1</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-white/50"
                >=</motion.span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-4xl">🍕🍕</div>
                  <span className="text-green-400 font-bold text-xl">2!</span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="p-4 bg-green-500/20 rounded-xl border border-green-500/30 max-w-sm"
              >
                <p className="text-green-300 text-lg">
                  זה פשוט <span className="font-bold">לספור</span>!
                  <br/>
                  משולש אחד + עוד משולש = <span className="text-xl font-bold">2 משולשים</span>
                </p>
              </motion.div>
            </div>
          )
        },
        {
          id: 'insight',
          title: 'הגילוי הגדול!',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-4xl"
              >
                🤔
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-white">רגע, אבל מה זה "רבע"?</h2>
              <div className="flex items-center gap-4">
                <AnimatedPizza slices={4} filledSlices={1} />
                <div className="text-right">
                  <p className="text-white/80">
                    הפיצה חתוכה ל-<span className="text-cyan-400 font-bold">4</span> חלקים.
                    <br/>
                    לקחנו <span className="text-amber-400 font-bold">1</span> חלק.
                  </p>
                  <p className="text-lg text-white mt-2">
                    זה נקרא: <span className="text-xl font-bold text-amber-400">רבע</span> = ¼
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30"
              >
                <p className="text-purple-300">
                  "רבע" אומר: <span className="font-bold">חלק 1 מתוך 4 חלקים שווים</span>
                </p>
              </motion.div>
            </div>
          )
        },
        {
          id: 'connection',
          title: 'עכשיו הכל מתחבר!',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-amber-400">אז מה עשינו?</h2>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={4} filledSlices={1} />
                  <span className="text-sm text-white/60">רבע</span>
                  <span className="text-xs text-cyan-400">(1 מתוך 4)</span>
                </div>
                <span className="text-2xl text-amber-400">+</span>
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={4} filledSlices={1} />
                  <span className="text-sm text-white/60">רבע</span>
                  <span className="text-xs text-cyan-400">(1 מתוך 4)</span>
                </div>
                <span className="text-2xl text-white">=</span>
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={4} filledSlices={2} />
                  <span className="text-sm text-green-400 font-bold">2 רבעים!</span>
                  <span className="text-xs text-cyan-400">(2 מתוך 4)</span>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl max-w-sm text-right">
                <p className="text-white/80">
                  פשוט <span className="text-green-400 font-bold">ספרנו את החלקים</span>:
                  <br/>
                  1 חלק + 1 חלק = 2 חלקים
                  <br/><br/>
                  <span className="text-amber-400">והחלקים נשארו באותו גודל!</span>
                  <br/>
                  (עדיין מתוך 4)
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'half_discovery',
          title: 'גילוי מפתיע!',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-4xl"
              >
                ✨
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-white">2 מתוך 4 - זה משהו מוכר!</h2>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={4} filledSlices={2} />
                  <span className="text-white/60">2 מתוך 4</span>
                </div>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl text-green-400"
                >=</motion.span>
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={2} filledSlices={1} />
                  <span className="text-amber-400 font-bold">חצי!</span>
                </div>
              </div>
              <div className="p-4 bg-amber-500/20 rounded-xl border border-amber-500/30 max-w-sm">
                <p className="text-amber-300 text-lg">
                  <span className="font-bold">2 הוא חצי מ-4!</span>
                  <br/>
                  אז 2 רבעים = חצי פיצה 🎉
                </p>
              </div>
              <p className="text-white/60 text-sm">
                רבע + רבע = שני רבעים = <span className="text-amber-400">חצי!</span>
              </p>
            </div>
          )
        },
        {
          id: 'beaker_practice',
          title: 'עכשיו בבקבוק!',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">אותו רעיון עם שיקוי!</h2>
              <p className="text-white/70 text-sm max-w-sm">
                בתרגול, תראו תרגיל חיבור ותצטרכו למלא את הבקבוק לתשובה.
              </p>
              <div className="flex items-center gap-4">
                <AnimatedBeaker fillLevel={0.5} showDivisions={2} />
                <span className="text-2xl text-amber-400">+</span>
                <AnimatedBeaker fillLevel={0.5} showDivisions={2} />
                <span className="text-2xl text-white">=</span>
                <AnimatedBeaker fillLevel={1} showDivisions={2} />
              </div>
              <div className="p-4 bg-green-500/20 rounded-xl border border-green-500/30 max-w-sm text-right">
                <p className="text-green-300 font-bold mb-2">הטריק:</p>
                <p className="text-green-200">
                  1️⃣ קראו את התרגיל
                  <br/>
                  2️⃣ <span className="text-amber-400">ספרו כמה חלקים יש ביחד</span>
                  <br/>
                  3️⃣ מלאו את הבקבוק לתשובה!
                </p>
              </div>
            </div>
          )
        }
      ];

    case 4: // אתגרים - חיסור
      return [
        {
          id: 'story',
          title: 'סיפור המסיבה',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-5xl"
              >
                🎂
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-white">יום הולדת!</h2>
              <div className="bg-white/5 p-4 rounded-xl max-w-sm text-right leading-relaxed">
                <p className="text-white/90 text-base md:text-lg">
                  אפית עוגה ליום ההולדת שלך.
                  <br/>
                  <span className="text-amber-400">חתכת אותה ל-4 חלקים שווים.</span>
                  <br/><br/>
                  היו לך 3 חתיכות. 🍰🍰🍰
                  <br/>
                  נתת חתיכה אחת לחבר. 🍰
                </p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-amber-400 font-bold"
              >
                כמה חתיכות נשארו לך?
              </motion.p>
            </div>
          )
        },
        {
          id: 'counting_back',
          title: 'סופרים אחורה!',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">בוא נספור!</h2>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-3xl">🍰🍰🍰</div>
                  <span className="text-amber-400 font-bold">3 חתיכות</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl text-red-400"
                >−</motion.span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-3xl">🍰</div>
                  <span className="text-red-400 font-bold">נתת 1</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-white/50"
                >=</motion.span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-3xl">🍰🍰</div>
                  <span className="text-green-400 font-bold text-xl">נשארו 2!</span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30 max-w-sm"
              >
                <p className="text-purple-300 text-lg">
                  חיסור זה פשוט <span className="font-bold">לספור כמה נשאר</span>!
                  <br/>
                  היו 3, נתנו 1, נשארו <span className="text-xl font-bold">2</span>
                </p>
              </motion.div>
            </div>
          )
        },
        {
          id: 'pizza_visual',
          title: 'רואים את זה בפיצה',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">3 רבעים פחות רבע</h2>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={4} filledSlices={3} />
                  <span className="text-sm text-white/60">3 מתוך 4</span>
                </div>
                <span className="text-2xl text-red-400">−</span>
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={4} filledSlices={1} />
                  <span className="text-sm text-white/60">1 מתוך 4</span>
                </div>
                <span className="text-2xl text-white">=</span>
                <div className="flex flex-col items-center">
                  <AnimatedPizza slices={4} filledSlices={2} />
                  <span className="text-sm text-green-400 font-bold">2 מתוך 4</span>
                </div>
              </div>
              <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/30 max-w-sm">
                <p className="text-amber-300">
                  <span className="font-bold">3 - 1 = 2</span>
                  <br/>
                  ו-2 מתוך 4 זה... <span className="text-xl">חצי! 🎉</span>
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'whole_question',
          title: 'שאלה מעניינת',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-4xl"
              >
                🤔
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-white">מה אם יש לנו עוגה שלמה?</h2>
              <div className="bg-white/5 p-4 rounded-xl max-w-sm text-right">
                <p className="text-white/80">
                  עוגה שלמה = <span className="text-cyan-400 font-bold">4 חתיכות</span>
                  <br/><br/>
                  אם נותנים 3 חתיכות...
                  <br/>
                  <span className="text-amber-400">כמה נשאר?</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <AnimatedPizza slices={4} filledSlices={4} />
                <span className="text-xl text-red-400">− 3</span>
                <span className="text-xl text-white">=</span>
                <AnimatedPizza slices={4} filledSlices={1} />
              </div>
              <p className="text-green-400 font-bold">4 - 3 = 1. נשאר רבע אחד!</p>
            </div>
          )
        },
        {
          id: 'ready',
          title: 'מוכנים לאתגר!',
          content: (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-5xl">🏆</span>
              <h2 className="text-2xl font-bold text-amber-400">הגעת לשלב האתגרים!</h2>
              <div className="p-4 bg-white/5 rounded-xl max-w-sm text-right">
                <p className="text-white/80 mb-3">
                  עכשיו את/ה יודע/ת:
                </p>
                <p className="text-green-400">✓ לחבר שברים (לספור כמה ביחד)</p>
                <p className="text-green-400">✓ לחסר שברים (לספור כמה נשאר)</p>
              </div>
              <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30 max-w-sm">
                <p className="text-purple-300 font-bold mb-2">הטריק לכל תרגיל:</p>
                <p className="text-purple-200">
                  1️⃣ תבינו מה קורה בסיפור
                  <br/>
                  2️⃣ <span className="text-amber-400">ספרו את החלקים</span>
                  <br/>
                  3️⃣ מלאו את הבקבוק!
                </p>
              </div>
            </div>
          )
        }
      ];

    default:
      return [];
  }
};

// =============================================
// Pre-built Learning Content for Vault (Numbers & Subtraction)
// =============================================

// Animated number display component
const AnimatedNumber: React.FC<{ number: string; highlight?: number[] }> = ({ number, highlight = [] }) => {
  return (
    <div className="flex gap-1 justify-center" dir="ltr">
      {number.split('').map((digit, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
          className={`w-12 h-14 md:w-16 md:h-18 flex items-center justify-center rounded-lg text-3xl md:text-4xl font-mono font-black ${
            highlight.includes(i)
              ? 'bg-amber-500/30 border-2 border-amber-500 text-amber-400'
              : 'bg-white/10 border-2 border-white/20 text-white'
          }`}
        >
          {digit}
        </motion.div>
      ))}
    </div>
  );
};

// Place value labels
const PlaceValueLabels: React.FC<{ length: number }> = ({ length }) => {
  const labels = ['יחידות', 'עשרות', 'מאות', 'אלפים', 'עשרות אלפים'];
  const relevantLabels = labels.slice(0, length).reverse();

  return (
    <div className="flex gap-1 justify-center text-xs text-white/50" dir="ltr">
      {relevantLabels.map((label, i) => (
        <div key={i} className="w-12 md:w-16 text-center">
          {label}
        </div>
      ))}
    </div>
  );
};

// Subtraction visualization
const SubtractionDisplay: React.FC<{ top: number[]; bottom: number[]; result?: number[]; borrowFrom?: number }> = ({
  top, bottom, result, borrowFrom
}) => {
  return (
    <div className="flex flex-col items-center gap-2 font-mono" dir="ltr">
      {/* Top number */}
      <div className="flex gap-1">
        {top.map((digit, i) => (
          <motion.div
            key={`top-${i}`}
            className={`w-10 h-12 flex items-center justify-center rounded-lg text-2xl font-black ${
              borrowFrom === i
                ? 'bg-red-500/30 border-2 border-red-500 text-red-400'
                : 'bg-white/10 border border-white/20 text-white'
            }`}
          >
            {digit}
          </motion.div>
        ))}
      </div>

      {/* Minus sign and bottom number */}
      <div className="flex gap-1 items-center">
        <span className="text-2xl text-white/50 w-6">−</span>
        {bottom.map((digit, i) => (
          <div
            key={`bottom-${i}`}
            className="w-10 h-12 flex items-center justify-center rounded-lg text-2xl font-black bg-white/5 border border-white/10 text-white/80"
          >
            {digit}
          </div>
        ))}
      </div>

      {/* Line */}
      <div className="w-full h-0.5 bg-white/30 my-1" />

      {/* Result */}
      {result && (
        <div className="flex gap-1">
          <span className="w-6" />
          {result.map((digit, i) => (
            <motion.div
              key={`result-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-10 h-12 flex items-center justify-center rounded-lg text-2xl font-black bg-green-500/30 border-2 border-green-500 text-green-400"
            >
              {digit}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export const createVaultLearningSlides = (topicNumber: number): LearningSlide[] => {
  switch (topicNumber) {
    case 1: // כתיבת מספרים
      return [
        {
          id: 'intro',
          title: 'מספרים מסביבנו',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl"
              >
                🔢
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">מספרים מסביבנו</h2>
              <p className="text-lg text-white/80 max-w-md">
                מספרים נמצאים בכל מקום! בטלפון, בכתובת, במחיר של ממתק...
              </p>
              <p className="text-base text-white/60">
                בוא נלמד איך לכתוב מספרים בספרות!
              </p>
            </div>
          )
        },
        {
          id: 'place_value',
          title: 'ערך מקום',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">כל ספרה יושבת במקום שלה</h2>
              <AnimatedNumber number="425" />
              <PlaceValueLabels length={3} />
              <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                <div className="p-2 bg-white/5 rounded-lg">
                  <div className="text-amber-400 font-bold">4</div>
                  <div className="text-white/60">מאות</div>
                </div>
                <div className="p-2 bg-white/5 rounded-lg">
                  <div className="text-amber-400 font-bold">2</div>
                  <div className="text-white/60">עשרות</div>
                </div>
                <div className="p-2 bg-white/5 rounded-lg">
                  <div className="text-amber-400 font-bold">5</div>
                  <div className="text-white/60">יחידות</div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'reading',
          title: 'קוראים מילים',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">איך כותבים "ארבע מאות עשרים וחמש"?</h2>
              <div className="space-y-4 text-right max-w-md">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 bg-white/5 rounded-lg flex items-center gap-3"
                >
                  <span className="text-2xl font-mono font-bold text-amber-400">4</span>
                  <span className="text-white/80">← ארבע מאות</span>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-3 bg-white/5 rounded-lg flex items-center gap-3"
                >
                  <span className="text-2xl font-mono font-bold text-amber-400">2</span>
                  <span className="text-white/80">← עשרים</span>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="p-3 bg-white/5 rounded-lg flex items-center gap-3"
                >
                  <span className="text-2xl font-mono font-bold text-amber-400">5</span>
                  <span className="text-white/80">← וחמש</span>
                </motion.div>
              </div>
              <AnimatedNumber number="425" />
            </div>
          )
        },
        {
          id: 'thousands',
          title: 'אלפים',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">מספרים גדולים יותר!</h2>
              <p className="text-white/80">עכשיו יש לנו גם אלפים:</p>
              <AnimatedNumber number="1836" />
              <PlaceValueLabels length={4} />
              <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <p className="text-purple-300 text-sm">
                  <span className="font-bold">אלף שמונה מאות שלושים ושש</span><br/>
                  1 אלף + 8 מאות + 3 עשרות + 6 יחידות
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'zero_trap',
          title: 'מלכודת האפס!',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-5xl"
              >
                ⚠️
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">זהירות מהאפס!</h2>
              <p className="text-white/80 max-w-md">
                כשאין ספרה במקום מסוים, שמים <span className="text-amber-400 font-bold">0</span>!
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 justify-center">
                  <span className="text-white/60">שלושת אלפים וחמישים =</span>
                  <AnimatedNumber number="3050" highlight={[1, 3]} />
                </div>
                <p className="text-amber-400 text-sm">
                  אין מאות! אין יחידות! שמים 0 במקומם.
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'summary',
          title: 'סיכום',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="text-5xl">🎓</span>
              <h2 className="text-2xl font-bold text-white">מעולה!</h2>
              <div className="text-right space-y-2 bg-white/5 p-4 rounded-xl max-w-md">
                <p className="text-white/80">✓ כל ספרה יושבת במקום שלה</p>
                <p className="text-white/80">✓ קוראים מימין לשמאל: אלפים → מאות → עשרות → יחידות</p>
                <p className="text-white/80">✓ אין ספרה? שמים 0!</p>
              </div>
              <p className="text-amber-400 font-bold">בוא נתרגל בכספת!</p>
            </div>
          )
        }
      ];

    case 2: // חיסור במאונך
      return [
        {
          id: 'intro',
          title: 'חיסור במאונך',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl"
              >
                ➖
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">חיסור במאונך</h2>
              <p className="text-lg text-white/80 max-w-md">
                נלמד לחסר מספרים גדולים בעזרת טכניקה מיוחדת!
              </p>
            </div>
          )
        },
        {
          id: 'simple',
          title: 'חיסור פשוט',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">מתחילים פשוט</h2>
              <SubtractionDisplay
                top={[8, 9]}
                bottom={[3, 4]}
                result={[5, 5]}
              />
              <div className="p-4 bg-green-500/20 rounded-xl border border-green-500/30 max-w-md">
                <p className="text-green-300">
                  מחסרים כל עמודה בנפרד!<br/>
                  <span className="font-mono">9 - 4 = 5</span> ואז <span className="font-mono">8 - 3 = 5</span>
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'problem',
          title: 'בעיה...',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">אבל מה עושים פה?</h2>
              <SubtractionDisplay
                top={[4, 3]}
                bottom={[1, 5]}
                borrowFrom={1}
              />
              <div className="p-4 bg-red-500/20 rounded-xl border border-red-500/30 max-w-md">
                <p className="text-red-300">
                  <span className="font-mono">3 - 5 = ?</span><br/>
                  אי אפשר! 3 קטן מ-5!<br/>
                  <span className="text-amber-300 font-bold">מה עושים?</span>
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'borrowing',
          title: 'פריטה!',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-5xl"
              >
                💡
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400">פריטה!</h2>
              <p className="text-white/80 max-w-md">
                "לווים" 10 מהשכן השמאלי!
              </p>
              <div className="space-y-2 text-right bg-white/5 p-4 rounded-xl max-w-md">
                <p className="text-white/80">
                  <span className="text-red-400">4</span>3 פחות 15
                </p>
                <p className="text-white/80">
                  לוקחים 1 מה-4 (נשאר <span className="text-amber-400">3</span>)
                </p>
                <p className="text-white/80">
                  נותנים 10 ל-3 (הופך ל-<span className="text-green-400">13</span>)
                </p>
                <p className="text-amber-400 font-bold mt-2">
                  עכשיו: 13 - 5 = 8 ✓
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'result',
          title: 'התוצאה',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">43 - 15 = ?</h2>
              <div className="space-y-3 text-right max-w-md">
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-white/80">שלב 1: </span>
                  <span className="text-amber-400">פורטים - 4 הופך ל-3, 3 הופך ל-13</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-white/80">שלב 2: </span>
                  <span className="text-green-400">13 - 5 = 8</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-white/80">שלב 3: </span>
                  <span className="text-green-400">3 - 1 = 2</span>
                </div>
              </div>
              <SubtractionDisplay
                top={[4, 3]}
                bottom={[1, 5]}
                result={[2, 8]}
              />
            </div>
          )
        },
        {
          id: 'summary',
          title: 'סיכום',
          content: (
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="text-5xl">🏆</span>
              <h2 className="text-2xl font-bold text-white">למדת פריטה!</h2>
              <div className="text-right space-y-2 bg-white/5 p-4 rounded-xl max-w-md">
                <p className="text-white/80">✓ מחסרים עמודה עמודה מימין לשמאל</p>
                <p className="text-white/80">✓ אם לא מספיק - פורטים מהשכן!</p>
                <p className="text-white/80">✓ השכן נותן 10 ומאבד 1</p>
              </div>
              <p className="text-amber-400 font-bold">בוא נתרגל בכספת!</p>
            </div>
          )
        }
      ];

    default:
      return [];
  }
};
