import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotebookBridgeProps {
  problem: {
    top: number[];    // e.g., [4, 5, 2]
    bottom: number[]; // e.g., [1, 3, 8]
  };
  currentMinuend: number[]; // The live state (e.g., [4, 4, 12] after borrow)
  borrowingEvent: { from: number; to: number } | null;
  userAnswers: number[];
  show: boolean;
}

export const NotebookBridge: React.FC<NotebookBridgeProps> = ({
  problem,
  currentMinuend,
  borrowingEvent,
  userAnswers,
  show,
}) => {
  
  // Create a grid of columns based on the problem length
  const columns = useMemo(() => {
    return problem.top.map((_, index) => index);
  }, [problem.top]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 100, opacity: 0, rotate: 0 }}
          animate={{ x: 0, opacity: 1, rotate: -2 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-64 md:w-80 h-96 z-40 origin-bottom-right pointer-events-none hidden md:block"
        >
          {/* --- PAPER CONTAINER --- */}
          <div 
            className="w-full h-full bg-[#fdfbf7] shadow-2xl relative overflow-hidden rounded-sm"
            style={{
              // CSS Graph Paper Pattern (Israeli Standard)
              backgroundImage: `
                linear-gradient(#e5e7eb 1px, transparent 1px),
                linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
              boxShadow: '2px 4px 15px rgba(0,0,0,0.15)'
            }}
          >
            {/* Red Margin (RTL - Right Side) */}
            <div className="absolute top-0 bottom-0 right-8 w-[2px] bg-red-300/60 h-full border-r border-red-400/20" />

            {/* Header / Title */}
            <div className="absolute top-4 right-12 text-slate-400 font-handwriting text-sm -rotate-1">
              תרגיל חיסור
            </div>

            {/* --- MATH CONTENT --- */}
            <div className="flex flex-row justify-center items-center h-full gap-6 pr-4 pl-4" dir="ltr">
              
              {/* Operator */}
              <div className="mt-8 text-4xl font-handwriting text-slate-600 font-bold">-</div>

              {/* Columns Container */}
              <div className="flex gap-4">
                {columns.map((colIndex) => {
                  const originalTop = problem.top[colIndex];
                  const currentTop = currentMinuend[colIndex];
                  const bottomVal = problem.bottom[colIndex];
                  const answerVal = userAnswers[colIndex];

                  // Determine States
                  const isCrossedOut = currentTop < originalTop;
                  const isRecipient = currentTop > originalTop; // Has received a borrow

                  return (
                    <div key={colIndex} className="flex flex-col items-center gap-2 relative">
                      
                      {/* 1. TOP ROW (Minuend) with Annotations */}
                      <div className="relative w-10 h-16 flex items-end justify-center">
                        
                        {/* The Original Number */}
                        <span className={`text-5xl font-handwriting font-bold text-slate-800 transition-opacity duration-500 ${isCrossedOut ? 'opacity-40' : 'opacity-100'}`}>
                          {originalTop}
                        </span>

                        {/* ANIMATION: Strikethrough (If Borrowed From) */}
                        {isCrossedOut && (
                          <motion.div
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          >
                            <svg width="40" height="40" viewBox="0 0 40 40">
                              <motion.line 
                                x1="5" y1="35" x2="35" y2="5" 
                                stroke="#ef4444" // Red pen
                                strokeWidth="3" 
                                strokeLinecap="round"
                              />
                            </svg>
                          </motion.div>
                        )}

                        {/* ANIMATION: New Value Superscript (If Borrowed From) */}
                        <AnimatePresence>
                          {isCrossedOut && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: -45 }}
                              className="absolute top-0 text-slate-600 font-handwriting text-2xl font-bold bg-[#fdfbf7]/80 rounded-full px-1"
                            >
                              {currentTop}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* ANIMATION: The "+10" Helper (If Recipient) */}
                        <AnimatePresence>
                          {isRecipient && (
                            <motion.div
                              initial={{ opacity: 0, y: -20, scale: 0.5 }}
                              animate={{ opacity: 1, y: -40, scale: 1 }}
                              transition={{ duration: 0.4, type: 'spring' }}
                              className="absolute top-0 text-gray-400 font-handwriting text-sm font-bold tracking-tighter"
                            >
                              +10
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* The '1' visually joining the number (e.g., making 2 look like 12) */}
                        <AnimatePresence>
                           {isRecipient && (
                             <motion.span 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               className="absolute left-[-8px] bottom-[2px] text-4xl font-handwriting font-bold text-slate-800"
                             >
                               1
                             </motion.span>
                           )}
                        </AnimatePresence>
                      </div>

                      {/* 2. BOTTOM ROW (Subtrahend) */}
                      <div className="w-10 h-12 flex items-center justify-center text-5xl font-handwriting font-bold text-slate-800">
                        {bottomVal}
                      </div>

                      {/* 3. SEPARATOR LINE */}
                      <div className="w-16 h-[2px] bg-slate-800 rounded-full my-1 transform -rotate-1" />

                      {/* 4. ANSWER ROW (User Input) */}
                      <div className="w-10 h-12 flex items-center justify-center">
                         <AnimatePresence mode="popLayout">
                           <motion.span 
                             key={answerVal}
                             initial={{ opacity: 0, y: -5 }}
                             animate={{ opacity: 1, y: 0 }}
                             className={`text-5xl font-handwriting font-bold ${answerVal === 0 ? 'text-slate-300' : 'text-blue-600'}`}
                           >
                             {answerVal}
                           </motion.span>
                         </AnimatePresence>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Bottom Fold Effect */}
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-slate-200 to-transparent" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[48px] border-r-[48px] border-t-white border-r-[#e5e7eb] drop-shadow-md" />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};