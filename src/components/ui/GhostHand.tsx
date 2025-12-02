import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand } from 'lucide-react';

interface GhostHandProps {
  show: boolean;
  targetPosition?: { x: number; y: number }; // Relative percentage
}

export const GhostHand: React.FC<GhostHandProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -20, 0], // Up and down motion
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="absolute z-50 pointer-events-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ top: '50%', left: '20%' }} // Positioned near the slider roughly
        >
          <Hand size={48} className="text-cyan-400 rotate-90" strokeWidth={2.5} />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-14 -left-8 whitespace-nowrap bg-black/80 px-3 py-1 rounded-full text-sm font-bold text-cyan-400 border border-cyan-500/30"
          >
            נסה לגרור כאן
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};