import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useVelocity } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';

interface LiquidProps {
  fillPercentage: number; // 0 to 1
}

export const Liquid: React.FC<LiquidProps> = ({ fillPercentage }) => {
  const { theme } = useUser();
  const liquidColor = theme.liquid;

  // 1. Spring physics for height (The "Fill" motion)
  const heightMv = useMotionValue(fillPercentage * 100);
  const heightSpring = useSpring(heightMv, {
    stiffness: 120, // Slightly stiffer for water-like response
    damping: 15,
    mass: 1
  });

  // Sync motion value with prop
  useEffect(() => {
    heightMv.set(fillPercentage * 100);
  }, [fillPercentage, heightMv]);

  // 2. React to velocity (The "Turbulence")
  const velocity = useVelocity(heightSpring);
  const waveScaleY = useTransform(velocity, [-200, 0, 200], [2.0, 0.7, 2.0]);
  
  const wavePath = "M0,10 Q25,18 50,10 T100,10 V20 H0 Z";
  const wavePathBack = "M0,10 Q25,2 50,10 T100,10 V20 H0 Z";

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 w-full z-10"
      style={{ height: useTransform(heightSpring, h => `${h}%`) }}
    >
      <motion.div
        className="absolute left-0 w-full h-[16px]"
        style={{ 
          top: -15, 
          scaleY: waveScaleY, 
          originY: 1 // Scale from bottom anchor
        }}
      >
        {/* Back Wave (Darker, Parallax) */}
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-full flex opacity-70"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        >
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
            <path d={wavePathBack} fill={liquidColor} style={{ filter: 'brightness(0.7)' }} />
          </svg>
        </motion.div>

        {/* Front Wave (Main Color) */}
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-full flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
            <path d={wavePath} fill={liquidColor} />
            <path d="M0,10 Q25,18 50,10 T100,10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Main Body */}
      <div 
        className="w-full h-full relative overflow-hidden" 
        style={{ 
          backgroundColor: liquidColor,
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.2)"
        }} 
      >
        {/* Bubbles */}
        {[...Array(6)].map((_, i) => (
             <Bubble key={i} />
        ))}
      </div>
    </motion.div>
  );
};

const Bubble = () => {
  const randomDelay = Math.random() * 5;
  const randomDuration = Math.random() * 3 + 2;
  const randomLeft = Math.random() * 80 + 10;
  const size = Math.random() * 6 + 2;
  
  return (
    <motion.div 
      className="absolute bg-white/30 rounded-full"
      style={{
          width: size,
          height: size,
          left: `${randomLeft}%`,
          bottom: -10
      }}
      animate={{ 
          y: -400, 
          x: Math.random() * 20 - 10,
          opacity: [0, 1, 0] 
      }}
      transition={{ 
          repeat: Infinity, 
          duration: randomDuration, 
          delay: randomDelay,
          ease: "easeIn" 
      }}
    />
  );
};