import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

// Custom Logo Component - Circle with bite and ½
const BiteLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="splashBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#ea580c' }} />
      </linearGradient>
      <linearGradient id="splashShineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0 }} />
      </linearGradient>
      <mask id="splashBiteMask">
        <rect width="100" height="100" fill="white" />
        <circle cx="85" cy="15" r="18" fill="black" />
      </mask>
    </defs>
    <g mask="url(#splashBiteMask)">
      <circle cx="50" cy="50" r="45" fill="url(#splashBgGrad)" />
      <ellipse cx="35" cy="35" rx="20" ry="15" fill="url(#splashShineGrad)" opacity="0.5" />
    </g>
    <path d="M 70 5 Q 67 15, 72 28" stroke="#fcd34d" strokeWidth="2" fill="none" strokeLinecap="round" />
    <g fill="#1e1b4b" fontFamily="Arial, sans-serif" fontWeight="bold">
      <text x="50" y="42" fontSize="24" textAnchor="middle">1</text>
      <line x1="35" y1="50" x2="65" y2="50" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
      <text x="50" y="72" fontSize="24" textAnchor="middle">2</text>
    </g>
    <circle cx="78" cy="8" r="2" fill="#fef3c7" />
    <circle cx="92" cy="22" r="1.5" fill="#fef3c7" />
    <circle cx="88" cy="32" r="1" fill="#fef3c7" />
  </svg>
);

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Enable skip after 500ms (so logo animation starts)
    const skipTimer = setTimeout(() => setCanSkip(true), 500);

    // Auto-dismiss after 1.5 seconds (reduced from 3.5s)
    const autoTimer = setTimeout(onComplete, 1500);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (canSkip) onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-900 flex flex-col items-center justify-center cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleSkip}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px]" />
      </div>

      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="relative z-10"
      >
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
          >
            <BiteLogo className="w-full h-full drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
      >
        מתמטי-ביס
      </motion.h1>

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: canSkip ? 0.5 : 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-white/50"
      >
        הקש להמשך
      </motion.p>
    </motion.div>
  );
};
