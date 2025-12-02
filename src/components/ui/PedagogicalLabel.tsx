import React from 'react';
import { motion } from 'framer-motion';

interface PedagogicalLabelProps {
  text: string;
  color?: string; // Tailwind text color class
  position: string; // Tailwind positioning classes (e.g., "top-0 left-full")
  delay?: number;
  arrowDirection?: 'left' | 'right' | 'top' | 'bottom';
}

export const PedagogicalLabel: React.FC<PedagogicalLabelProps> = ({ 
  text, 
  color = "text-cyan-400", 
  position, 
  delay = 0,
  arrowDirection = 'right'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: arrowDirection === 'right' ? 10 : -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${position} flex items-center gap-2 pointer-events-none z-40 whitespace-nowrap`}
      style={{ direction: 'rtl' }}
    >
      {/* Line/Arrow */}
      <div className={`w-8 h-[1px] bg-white/30 ${arrowDirection === 'left' ? 'order-last' : 'order-first'}`} />
      
      {/* Label Badge */}
      <div className={`
        px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md shadow-lg
        text-xs font-bold tracking-wide ${color}
      `}>
        {text}
      </div>
    </motion.div>
  );
};
