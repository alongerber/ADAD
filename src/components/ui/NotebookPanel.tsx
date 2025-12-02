import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotebookPanelProps {
  show: boolean;
  messages: string[];
  title?: string;
}

export const NotebookPanel: React.FC<NotebookPanelProps> = ({ show, messages, title = "מחברת חכמה" }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 500, rotate: 5 }}
          animate={{ x: 0, rotate: -2 }}
          exit={{ x: 600, rotate: 10 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed right-4 top-24 bottom-24 w-72 md:w-96 bg-[#f8fafc] shadow-2xl z-[9999] rounded-sm overflow-hidden transform origin-bottom-right"
          style={{
            // Graph Paper Pattern
            backgroundImage: `
              linear-gradient(#e2e8f0 1px, transparent 1px),
              linear-gradient(90deg, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            boxShadow: '-10px 10px 20px rgba(0,0,0,0.3)'
          }}
        >
          {/* Paper Header / Clip Area */}
          <div className="h-16 w-full border-b-2 border-red-200/50 flex items-center justify-center pt-4">
             <div className="w-32 h-8 bg-neutral-200 rounded-t-lg opacity-50 absolute -top-4 shadow-inner" /> {/* Clip */}
             <h2 className="font-handwriting text-3xl font-bold text-slate-600 tracking-wide">{title}</h2>
          </div>

          {/* Margins */}
          <div className="absolute top-0 bottom-0 left-8 w-[2px] bg-red-300/50" />

          {/* Content */}
          <div className="p-6 pt-8 pl-10 flex flex-col gap-6 h-full overflow-y-auto">
             {messages.map((msg, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 + (idx * 0.1) }}
                 className="flex gap-2 items-start"
               >
                 <span className="font-handwriting text-2xl text-blue-500 font-bold mt-1">.{(idx + 1).toLocaleString('he')}</span>
                 <p className="font-handwriting text-3xl text-slate-700 leading-snug">
                   {msg}
                 </p>
               </motion.div>
             ))}
             
             {/* Empty State / Hint */}
             {messages.length === 0 && (
                <div className="opacity-40 text-center font-handwriting text-2xl mt-10 transform -rotate-2">
                    המתן להוראות המורה...
                </div>
             )}
          </div>

          {/* Folded Corner Effect */}
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-slate-200 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[48px] border-r-[48px] border-t-white border-r-[#e2e8f0] drop-shadow-lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};