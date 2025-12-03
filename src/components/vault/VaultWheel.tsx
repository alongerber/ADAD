import React, { useRef, useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';

interface VaultWheelProps {
  value: number;
  onChange: (newValue: number) => void;
  disabled?: boolean;
}

export const VaultWheel: React.FC<VaultWheelProps> = ({ value, onChange, disabled }) => {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  
  // Create an array of numbers to simulate the wheel strip
  // We show previous, current, next for visual context
  const prev = (value - 1 + 10) % 10;
  const next = (value + 1) % 10;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 30; // Pixel drag distance to trigger change
    
    if (info.offset.y < -threshold) {
      // Dragged Up -> Increase Number
      triggerSpin(1);
    } else if (info.offset.y > threshold) {
      // Dragged Down -> Decrease Number
      triggerSpin(-1);
    } else {
      // Snap back
      controls.start({ y: 0 });
    }
  };

  const triggerSpin = async (direction: 1 | -1) => {
    // 1. Animate off screen
    await controls.start({ 
      y: direction === 1 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" }
    });

    // 2. Logic Update
    let nextVal = value + direction;
    if (nextVal > 9) nextVal = 0;
    if (nextVal < 0) nextVal = 9;
    onChange(nextVal);

    // 3. Reset position instantly (invisible)
    controls.set({ 
      y: direction === 1 ? 60 : -60,
      opacity: 0
    });

    // 4. Animate back in
    await controls.start({ 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.2, type: "spring", stiffness: 300, damping: 20 } 
    });
  };

  return (
    <div className={`relative w-14 h-24 md:w-20 md:h-32 rounded-lg overflow-hidden border-2 md:border-4 border-neutral-800 shadow-[inset_0_0_20px_rgba(0,0,0,1)] bg-neutral-900 select-none ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}>
      
      {/* Glossy Overlay (Cylinder effect) */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-amber-500/20 z-10 pointer-events-none" />

      {/* The Wheel Strip */}
      <motion.div 
        drag={disabled ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        {/* Previous Number (Faded) */}
        <div className={`absolute -top-8 md:-top-12 text-2xl md:text-4xl font-mono font-bold text-amber-700/30 blur-[1px] transform scale-75`}>
          {prev}
        </div>

        {/* Current Number (Active) */}
        <div className="text-4xl md:text-6xl font-mono font-black text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
          {value}
        </div>

        {/* Next Number (Faded) */}
        <div className={`absolute -bottom-8 md:-bottom-12 text-2xl md:text-4xl font-mono font-bold text-amber-700/30 blur-[1px] transform scale-75`}>
          {next}
        </div>
      </motion.div>

      {/* Mechanical Gears decoration on sides */}
      <div className="absolute left-0 top-0 w-1 h-full bg-neutral-800 flex flex-col gap-1 z-20">
        {[...Array(10)].map((_, i) => <div key={i} className="w-full h-1 bg-black/50" />)}
      </div>
      <div className="absolute right-0 top-0 w-1 h-full bg-neutral-800 flex flex-col gap-1 z-20">
        {[...Array(10)].map((_, i) => <div key={i} className="w-full h-1 bg-black/50" />)}
      </div>

    </div>
  );
};