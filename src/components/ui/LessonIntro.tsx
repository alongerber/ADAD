import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Hash, Calculator, Play } from 'lucide-react';

interface LessonIntroProps {
  levelType: 'number_input' | 'vertical_math';
  levelTitle: string;
  explanation: string;
  exampleBefore: string;
  exampleAfter: string;
  tip: string;
  onStart: () => void;
}

export const LessonIntro: React.FC<LessonIntroProps> = ({
  levelType,
  levelTitle,
  explanation,
  exampleBefore,
  exampleAfter,
  tip,
  onStart
}) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    },
    exit: { opacity: 0, y: -50 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-neutral-900/95 backdrop-blur-md"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      dir="rtl"
    >
      <div className="w-full max-w-2xl flex flex-col items-center gap-8 text-center select-none">
        
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm tracking-wider uppercase">
             {levelType === 'number_input' ? <Hash size={16} /> : <Calculator size={16} />}
             <span>{levelType === 'number_input' ? 'כתיבת מספרים' : 'חיסור במאונך'}</span>
          </div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] leading-tight"
        >
          {levelTitle}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-lg font-medium"
        >
          {explanation}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="w-full bg-black/40 border-2 border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-6 relative overflow-hidden"
        >
          <div className="z-10 flex flex-col items-center">
            <span className="text-sm text-neutral-500 mb-1 font-bold">המשימה</span>
            <span className="text-2xl font-bold text-white">{exampleBefore}</span>
          </div>

          <ArrowLeft className="text-amber-500 hidden md:block" size={32} strokeWidth={3} />
          <div className="w-full h-[2px] bg-neutral-700 md:hidden" />

          <div className="z-10 flex flex-col items-center">
            <span className="text-sm text-neutral-500 mb-1 font-bold">התשובה</span>
            <span className="text-3xl font-mono font-black text-amber-400 tracking-wider bg-neutral-900 px-4 py-2 rounded-lg border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              {exampleAfter}
            </span>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex items-start gap-4 bg-amber-900/20 border border-amber-500/20 p-4 rounded-xl text-amber-200 text-lg text-right w-full"
        >
          <div className="p-2 bg-amber-500/20 rounded-lg shrink-0">
            <Lightbulb size={24} className="text-amber-400" />
          </div>
          <div>
            <span className="block font-bold text-amber-500 text-sm mb-1">טיפ של אלופים:</span>
            {tip}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4 w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full font-black text-2xl text-white shadow-[0_6px_0_#9a3412,0_15px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_0_#9a3412,0_20px_25px_rgba(251,191,36,0.2)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 border-t border-white/20 cursor-pointer"
          >
            <Play fill="currentColor" />
            בוא נתחיל!
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
};
