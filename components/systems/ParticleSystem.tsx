import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { THEME_CONFIG } from '../../constants';

interface ParticleSystemProps {
  active: boolean;
  count?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ active, count = 120 }) => {
  const { theme } = useUser();
  const particleColors = theme.particleColors || THEME_CONFIG.scifi.particleColors;

  // Generate physics data for the explosion
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Aggressive Spread
      const randomX = (Math.random() - 0.5) * 3000; 
      
      // Y: -300vh (up) to +100vh (down).
      const burstHeight = -1000 - Math.random() * 1500; 
      const fallDistance = 1500 + Math.random() * 1000;

      return {
        id: i,
        x: randomX,
        yBurst: burstHeight,
        yEnd: burstHeight + fallDistance,
        rotation: Math.random() * 1440 - 720,
        scale: Math.random() * 0.6 + 0.4,
        size: Math.random() > 0.7 ? 10 : Math.random() * 4 + 4, 
        color: particleColors[Math.floor(Math.random() * particleColors.length)], // Use theme colors
        delay: Math.random() * 0.1
      };
    });
  }, [count, particleColors]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-[9999] pointer-events-none overflow-visible">
      <AnimatePresence>
        {active && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0,
              opacity: 1 
            }}
            animate={{ 
              x: p.x, 
              y: [0, p.yBurst, p.yEnd],
              rotate: p.rotation,
              scale: [0, 1.2, p.scale],
              opacity: [1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.8,
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.4, 1],
              delay: p.delay
            }}
            style={{ 
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                position: 'absolute',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.2)' 
            }}
            className="rounded-[1px]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
