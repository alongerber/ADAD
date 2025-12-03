import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface VaultWheelProps {
  value: number;
  onChange: (newValue: number) => void;
  disabled?: boolean;
}

export const VaultWheel: React.FC<VaultWheelProps> = ({ value, onChange, disabled }) => {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 15; // Lower threshold for faster response

    if (info.offset.y < -threshold) {
      // Dragged Up -> Increase Number
      triggerSpin(1);
    } else if (info.offset.y > threshold) {
      // Dragged Down -> Decrease Number
      triggerSpin(-1);
    } else {
      // Snap back
      controls.start({ y: 0, transition: { duration: 0.05 } });
    }
  };

  const triggerSpin = async (direction: 1 | -1) => {
    // 1. Animate off screen (faster!)
    await controls.start({
      y: direction === 1 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.06, ease: "easeIn" }
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

    // 4. Animate back in (faster spring!)
    await controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.08, type: "spring", stiffness: 500, damping: 25 }
    });
  };

  // Handle tap on arrows
  const handleTapUp = () => {
    if (!disabled) triggerSpin(1);
  };

  const handleTapDown = () => {
    if (!disabled) triggerSpin(-1);
  };

  return (
    <div className={`relative flex flex-col items-center ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Up Arrow Button */}
      <button
        onClick={handleTapUp}
        className="w-14 md:w-20 h-6 md:h-8 flex items-center justify-center text-amber-500/60 hover:text-amber-400 active:scale-90 transition-all touch-manipulation"
        aria-label="הגדל מספר"
      >
        <ChevronUp size={24} strokeWidth={3} />
      </button>

      {/* Wheel Container */}
      <div className="relative w-14 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 md:border-4 border-neutral-800 shadow-[inset_0_0_20px_rgba(0,0,0,1)] bg-neutral-900 select-none">

        {/* Glossy Overlay (Cylinder effect) */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        {/* The Wheel Strip */}
        <motion.div
          drag={disabled ? false : "y"}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {/* Current Number (Active) */}
          <div className="text-4xl md:text-5xl font-mono font-black text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
            {value}
          </div>
        </motion.div>

        {/* Mechanical Gears decoration on sides */}
        <div className="absolute left-0 top-0 w-1 h-full bg-neutral-800 flex flex-col gap-1 z-20">
          {[...Array(6)].map((_, i) => <div key={i} className="w-full h-1 bg-black/50" />)}
        </div>
        <div className="absolute right-0 top-0 w-1 h-full bg-neutral-800 flex flex-col gap-1 z-20">
          {[...Array(6)].map((_, i) => <div key={i} className="w-full h-1 bg-black/50" />)}
        </div>
      </div>

      {/* Down Arrow Button */}
      <button
        onClick={handleTapDown}
        className="w-14 md:w-20 h-6 md:h-8 flex items-center justify-center text-amber-500/60 hover:text-amber-400 active:scale-90 transition-all touch-manipulation"
        aria-label="הקטן מספר"
      >
        <ChevronDown size={24} strokeWidth={3} />
      </button>
    </div>
  );
};