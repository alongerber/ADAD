import React from 'react';
import { Liquid } from './Liquid';

interface BeakerProps {
  fillPercentage: number;
}

export const Beaker: React.FC<BeakerProps> = ({ fillPercentage }) => {
  return (
    <div className="relative w-[30vmin] h-[50vmin] mx-auto">
      {/* Glass Container */}
      <div 
        className="relative w-full h-full rounded-b-[40px] rounded-t-[5px] border-4 border-t-0 border-white/30 overflow-hidden backdrop-blur-sm"
        style={{
          background: "linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
          boxShadow: `
            0 0 30px rgba(255, 255, 255, 0.1), 
            inset 0 0 20px rgba(255,255,255,0.1),
            inset 10px 0 10px rgba(255,255,255,0.05),
            inset -10px 0 10px rgba(255,255,255,0.05)
          `
        }}
      >
        {/* Measurement Markings */}
        <div className="absolute top-0 right-0 h-full w-full pointer-events-none z-20">
            {[0.25, 0.5, 0.75].map((mark) => (
                <div 
                    key={mark}
                    className="absolute right-0 w-8 h-[2px] bg-white/40"
                    style={{ bottom: `${mark * 100}%` }}
                />
            ))}
        </div>

        {/* Highlights/Reflections for glass effect */}
        <div className="absolute top-4 left-4 w-2 h-[80%] bg-gradient-to-b from-white/20 to-transparent rounded-full z-30" />
        
        {/* The Liquid Content */}
        <Liquid fillPercentage={fillPercentage} />
      </div>

      {/* Base/Stand */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[34vmin] h-4 bg-black/60 rounded-full shadow-lg border border-white/10" />
    </div>
  );
};
