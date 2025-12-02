import React, { useRef, useEffect } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';

interface VerticalSliderProps {
  value: number; // 0 to 1
  onChange: (val: number) => void;
}

export const VerticalSlider: React.FC<VerticalSliderProps> = ({ 
  value, 
  onChange 
}) => {
  const { theme } = useUser();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Snap points for visual feedback
  const snapPoints = [0.25, 0.5, 0.75];
  const lastValue = useRef(value);

  // Trigger flash animation when crossing snap points
  useEffect(() => {
    const checkCrossing = (point: number) => {
      return (lastValue.current < point && value >= point) || 
             (lastValue.current > point && value <= point);
    };

    const crossed = snapPoints.some(checkCrossing);

    if (crossed) {
      // Trigger "Mechanical Click" Flash
      controls.start({
        boxShadow: [
          "inset 0 0 20px rgba(0,0,0,0.8)", 
          "inset 0 0 20px rgba(255, 255, 255, 0.6)", 
          "inset 0 0 20px rgba(0,0,0,0.8)"
        ],
        borderColor: ["#334155", theme.liquid, "#334155"],
        transition: { duration: 0.2 }
      });
    }
    
    lastValue.current = value;
  }, [value, controls, theme.liquid]);

  const handleDrag = (_: any, info: PanInfo) => {
    if (!constraintsRef.current) return;
    
    const height = constraintsRef.current.offsetHeight;
    const { y } = info.point;
    const rect = constraintsRef.current.getBoundingClientRect();
    
    let relativeY = (y - rect.top);
    relativeY = Math.max(0, Math.min(relativeY, height));
    
    const percentage = 1 - (relativeY / height);
    
    onChange(percentage);
  };

  return (
    <div className="relative flex items-center justify-center h-[260px] w-32 touch-none select-none">
      
      {/* Ticks (Clean - No Text) */}
      <div className="absolute right-0 h-full flex flex-col justify-between py-8 pr-6 border-r-2 border-white/10">
        {[100, 75, 50, 25, 0].map((tick) => (
          <div key={tick} className="flex items-center gap-2 justify-end">
            <div className={`h-[2px] rounded-full bg-white/20 ${tick % 50 === 0 ? 'w-6' : 'w-3'}`} />
          </div>
        ))}
      </div>

      {/* The Groove (Track) */}
      <motion.div 
        ref={constraintsRef}
        animate={controls}
        className="relative w-16 h-full bg-black/40 rounded-lg overflow-hidden border-2 border-white/10 shadow-[inset_0_4px_15px_rgba(0,0,0,1)]"
      >
        {/* Inner Glow (Active Level) */}
        <div 
          className="absolute bottom-0 w-full opacity-60"
          style={{ 
              height: `${value * 100}%`, 
              transition: 'height 0.05s linear',
              backgroundColor: theme.liquid,
              boxShadow: `0 -2px 10px ${theme.liquid}`
          }}
        >
             <div className="w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPjwvc3ZnPg==')] bg-repeat" />
        </div>
        
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/50" />
      </motion.div>

      {/* The Handle */}
      <motion.div
        drag="y"
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        className="absolute w-20 h-12 rounded-md shadow-2xl cursor-grab active:cursor-grabbing z-20 flex items-center justify-center group"
        style={{ 
            bottom: `${value * 100}%`,
            marginBottom: '-24px',
            background: 'linear-gradient(180deg, #475569 0%, #1e293b 50%, #0f172a 100%)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 rounded-md ring-1 ring-black/40" />
        
        {/* Grip Lines */}
        <div className="flex flex-col gap-[3px] w-full px-4 opacity-50">
            <div className="h-[2px] w-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)] rounded-full" />
            <div className="h-[2px] w-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)] rounded-full" />
            <div className="h-[2px] w-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)] rounded-full" />
        </div>

        {/* Indicator Light */}
        <div 
            className="absolute right-2 w-1.5 h-1.5 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)] animate-pulse"
            style={{ backgroundColor: theme.liquid }}
        />
      </motion.div>
    </div>
  );
};