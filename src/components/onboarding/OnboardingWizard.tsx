import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, GenderType, ThemeType, GradeType } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { THEME_CONFIG } from '../../constants';
import { User, Sparkles, Rocket, Trophy, Check, GraduationCap, TreePine, Fish, Candy, Lock } from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { updateUser } = useUser();
  const [step, setStep] = useState(0);

  // Temporary state before saving
  const [tempProfile, setTempProfile] = useState<UserProfile>({
    name: '',
    gender: 'boy', // Default
    theme: 'scifi', // Default
    grade: 4, // Default - only grade 4 available for now
    progress: {
      completedLevels: [],
      currentVaultLevel: 0,
      totalScore: 0,
      streak: 0,
      maxStreak: 0,
      lastPlayedAt: null,
      unlockedAchievements: [],
      daysPlayed: 0,
      lastPlayDate: null,
      learnedTopics: [],
    }
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const finishSetup = () => {
    updateUser(tempProfile);
  };

  // Get current active styles for the wizard preview
  const activeTheme = THEME_CONFIG[tempProfile.theme];

  return (
    <div className={`fixed inset-0 w-full h-full ${activeTheme.bg} transition-colors duration-700 overflow-y-auto flex flex-col items-center justify-start md:justify-center p-4 pt-16 pb-8`} dir="rtl">
      
      {/* Background Ambience */}
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${activeTheme.bgGradient} opacity-50 pointer-events-none`} />
      
      {/* Progress Bar */}
      <div className="absolute top-10 w-64 h-2 bg-black/30 rounded-full overflow-hidden z-20">
        <motion.div
          className={`h-full ${tempProfile.theme === 'scifi' ? 'bg-cyan-400' : tempProfile.theme === 'pop' ? 'bg-yellow-400' : 'bg-green-400'}`}
          initial={{ width: "0%" }}
          animate={{ width: `${((step + 1) / 4) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">

        {/* STEP 0: GRADE SELECTION */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="z-10 flex flex-col items-center gap-6 md:gap-10 w-full max-w-4xl"
          >
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight">באיזו כיתה את/ה?</h1>
              <p className="text-white/60 mt-2 text-sm md:text-base">בחר/י את הכיתה שלך כדי לקבל תוכן מותאם</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full px-2">
              <GradeCard
                grade={3}
                label="כיתה ג׳"
                selected={tempProfile.grade === 3}
                available={false}
                onClick={() => {}}
              />
              <GradeCard
                grade={4}
                label="כיתה ד׳"
                selected={tempProfile.grade === 4}
                available={true}
                onClick={() => setTempProfile(p => ({ ...p, grade: 4 }))}
              />
              <GradeCard
                grade={5}
                label="כיתה ה׳"
                selected={tempProfile.grade === 5}
                available={false}
                onClick={() => {}}
              />
              <GradeCard
                grade={6}
                label="כיתה ו׳"
                selected={tempProfile.grade === 6}
                available={false}
                onClick={() => {}}
              />
            </div>

            <div className="w-full max-w-md mt-2 md:mt-4 px-2">
              <NavButton onClick={handleNext} active={tempProfile.grade === 4} theme={tempProfile.theme} label="המשך" />
            </div>
          </motion.div>
        )}

        {/* STEP 1: GENDER */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="z-10 flex flex-col items-center gap-6 md:gap-10 w-full max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight">מי משחק?</h1>

            <div className="flex flex-col gap-4 md:flex-row md:gap-8 w-full justify-center px-2">
              <GenderCard
                label="אני תלמיד"
                icon={<User strokeWidth={1.5} />}
                selected={tempProfile.gender === 'boy'}
                onClick={() => setTempProfile(p => ({ ...p, gender: 'boy' }))}
                variant="cyan"
              />
              <GenderCard
                label="אני תלמידה"
                icon={<User strokeWidth={1.5} />}
                selected={tempProfile.gender === 'girl'}
                onClick={() => setTempProfile(p => ({ ...p, gender: 'girl' }))}
                variant="fuchsia"
              />
            </div>

            <div className="flex gap-4 w-full max-w-md mt-2 md:mt-4 px-2">
              <NavButton onClick={handleBack} active={true} theme={tempProfile.theme} label="חזור" secondary />
              <NavButton onClick={handleNext} active={true} theme={tempProfile.theme} label="המשך" />
            </div>
          </motion.div>
        )}

        {/* STEP 2: NAME */}
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="z-10 flex flex-col items-center gap-8 w-full max-w-md"
          >
            <h1 className="text-4xl font-black text-white drop-shadow-lg">איך לקרוא לך?</h1>
            
            <div className="relative w-full">
              <input 
                type="text"
                value={tempProfile.name}
                onChange={(e) => setTempProfile(p => ({ ...p, name: e.target.value }))}
                placeholder="הקלד שם כאן..."
                className={`w-full bg-black/30 border-2 ${activeTheme.border} text-white text-center text-3xl font-bold py-6 rounded-2xl outline-none focus:bg-black/50 transition-all placeholder:text-white/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}
                autoFocus
              />
            </div>

            <div className="flex gap-4 w-full">
                <NavButton onClick={handleBack} active={true} theme={tempProfile.theme} label="חזור" secondary />
                <NavButton onClick={handleNext} active={tempProfile.name.length >= 2} theme={tempProfile.theme} label="המשך" />
            </div>
          </motion.div>
        )}

        {/* STEP 3: THEME */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="z-10 flex flex-col items-center gap-6 w-full max-w-4xl"
          >
            <h1 className="text-4xl font-black text-white drop-shadow-lg">מה הסטייל שלך?</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <ThemeCard
                id="scifi"
                label={THEME_CONFIG.scifi.label}
                icon={<Rocket size={32} />}
                colors="from-slate-800 to-cyan-900 border-cyan-500"
                selected={tempProfile.theme === 'scifi'}
                onClick={() => setTempProfile(p => ({ ...p, theme: 'scifi' }))}
              />
              <ThemeCard
                id="pop"
                label={THEME_CONFIG.pop.label}
                icon={<Sparkles size={32} />}
                colors="from-purple-800 to-pink-600 border-pink-400"
                selected={tempProfile.theme === 'pop'}
                onClick={() => setTempProfile(p => ({ ...p, theme: 'pop' }))}
              />
              <ThemeCard
                id="sports"
                label={THEME_CONFIG.sports.label}
                icon={<Trophy size={32} />}
                colors="from-emerald-800 to-green-600 border-green-400"
                selected={tempProfile.theme === 'sports'}
                onClick={() => setTempProfile(p => ({ ...p, theme: 'sports' }))}
              />
              <ThemeCard
                id="nature"
                label={THEME_CONFIG.nature.label}
                icon={<TreePine size={32} />}
                colors="from-amber-800 to-lime-700 border-lime-400"
                selected={tempProfile.theme === 'nature'}
                onClick={() => setTempProfile(p => ({ ...p, theme: 'nature' }))}
              />
              <ThemeCard
                id="ocean"
                label={THEME_CONFIG.ocean.label}
                icon={<Fish size={32} />}
                colors="from-sky-800 to-blue-600 border-sky-400"
                selected={tempProfile.theme === 'ocean'}
                onClick={() => setTempProfile(p => ({ ...p, theme: 'ocean' }))}
              />
              <ThemeCard
                id="candy"
                label={THEME_CONFIG.candy.label}
                icon={<Candy size={32} />}
                colors="from-rose-800 to-pink-600 border-rose-400"
                selected={tempProfile.theme === 'candy'}
                onClick={() => setTempProfile(p => ({ ...p, theme: 'candy' }))}
              />
            </div>

            <div className="flex gap-4 w-full mt-4 justify-center">
                <NavButton onClick={handleBack} active={true} theme={tempProfile.theme} label="חזור" secondary />
                <NavButton onClick={finishSetup} active={true} theme={tempProfile.theme} label="בוא נתחיל!" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub Components ---

interface GenderCardProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  variant: 'cyan' | 'fuchsia';
}

const GenderCard: React.FC<GenderCardProps> = ({ label, icon, selected, onClick, variant }) => {
  const isCyan = variant === 'cyan';
  
  // Dynamic Styles based on variant
  const borderColor = isCyan ? 'border-cyan-500/50' : 'border-fuchsia-500/50';
  const glowColor = isCyan ? 'shadow-[0_0_40px_rgba(34,211,238,0.2)]' : 'shadow-[0_0_40px_rgba(232,121,249,0.2)]';
  const selectedBorder = isCyan ? 'border-cyan-400' : 'border-fuchsia-400';
  const selectedGlow = isCyan ? 'shadow-[0_0_50px_rgba(34,211,238,0.4),inset_0_0_20px_rgba(34,211,238,0.1)]' : 'shadow-[0_0_50px_rgba(232,121,249,0.4),inset_0_0_20px_rgba(232,121,249,0.1)]';
  const textColor = isCyan ? 'text-cyan-400' : 'text-fuchsia-400';
  const iconDropShadow = isCyan ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]' : 'drop-shadow-[0_0_15px_rgba(232,121,249,0.6)]';

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative flex-1 flex flex-col items-center justify-center gap-3 md:gap-6 p-5 md:p-10 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 backdrop-blur-md overflow-hidden group min-w-[140px] md:min-w-[200px]
        bg-slate-900/40
        ${selected ? `${selectedBorder} ${selectedGlow} bg-slate-900/60` : `border-white/5 hover:${borderColor} hover:${glowColor} hover:bg-slate-900/50`}
      `}
    >
      {/* Background Grid Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0iI2ZmZiIgLz4KPC9zdmc+')] z-0 pointer-events-none" />

      {/* Icon Container */}
      <div className={`
        relative z-10 p-3 md:p-6 rounded-full bg-black/40 border border-white/10 transition-all duration-500
        ${selected ? 'scale-110 border-white/30' : 'group-hover:scale-110 group-hover:border-white/20'}
      `}>
         <div className={`w-12 h-12 md:w-24 md:h-24 ${textColor} ${iconDropShadow} transition-all duration-300`}>
             {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-full h-full' })}
         </div>

         {/* Animated Scan Line */}
         {selected && (
            <motion.div
                className={`absolute inset-0 w-full h-[20%] bg-white/20 blur-md`}
                animate={{ top: ['0%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
         )}
      </div>

      {/* Label */}
      <div className="z-10 flex flex-col items-center gap-1 md:gap-2">
          <span className={`text-lg md:text-2xl font-black tracking-wider uppercase transition-colors duration-300 ${selected ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
            {label}
          </span>
          <div className={`h-1 w-8 md:w-12 rounded-full transition-all duration-300 ${selected ? (isCyan ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]' : 'bg-fuchsia-500 shadow-[0_0_10px_rgba(232,121,249,1)]') : 'bg-slate-700 w-2'}`} />
      </div>

      {/* Selection Checkmark */}
      {selected && (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute top-2 right-2 md:top-4 md:right-4 p-1 rounded-full ${isCyan ? 'bg-cyan-500 text-slate-900' : 'bg-fuchsia-500 text-slate-900'}`}
        >
            <Check size={16} className="md:w-5 md:h-5" strokeWidth={4} />
        </motion.div>
      )}
    </motion.button>
  );
};

const ThemeCard = ({ id, label, icon, colors, selected, onClick }: any) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative h-48 rounded-2xl border-4 flex flex-col items-center justify-center gap-3 overflow-hidden transition-all duration-300
        bg-gradient-to-br ${colors}
        ${selected ? 'scale-105 shadow-[0_0_25px_rgba(255,255,255,0.4)] border-white' : 'border-transparent opacity-60 grayscale-[0.6] hover:grayscale-0 hover:opacity-100'}
      `}
    >
      <div className="text-white drop-shadow-md transform scale-125">{icon}</div>
      <span className="text-white font-bold text-lg drop-shadow-md mt-2">{label}</span>
      {selected && (
        <motion.div layoutId="selection-ring" className="absolute inset-0 border-4 border-white rounded-xl" />
      )}
    </motion.button>
  );
};

interface GradeCardProps {
  grade: number;
  label: string;
  selected: boolean;
  available: boolean;
  onClick: () => void;
}

const GradeCard: React.FC<GradeCardProps> = ({ grade, label, selected, available, onClick }) => {
  return (
    <motion.button
      whileHover={available ? { scale: 1.05 } : {}}
      whileTap={available ? { scale: 0.95 } : {}}
      onClick={available ? onClick : undefined}
      className={`
        relative h-32 md:h-40 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-300
        ${available
          ? selected
            ? 'bg-gradient-to-br from-amber-600 to-orange-600 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]'
            : 'bg-slate-800/60 border-white/20 hover:border-amber-500/50 hover:bg-slate-700/60 cursor-pointer'
          : 'bg-slate-900/60 border-white/5 opacity-50 cursor-not-allowed'
        }
      `}
    >
      {/* Grade Number */}
      <div className={`text-4xl md:text-5xl font-black ${available ? 'text-white' : 'text-white/30'}`}>
        {grade}
      </div>

      {/* Label */}
      <span className={`text-sm md:text-base font-bold ${available ? 'text-white/90' : 'text-white/30'}`}>
        {label}
      </span>

      {/* Coming Soon Badge */}
      {!available && (
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-slate-700/80 rounded-full">
          <Lock size={12} className="text-white/50" />
          <span className="text-[10px] text-white/50 font-bold">בקרוב</span>
        </div>
      )}

      {/* Selection Checkmark */}
      {selected && available && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 left-2 p-1 rounded-full bg-white text-amber-600"
        >
          <Check size={16} strokeWidth={4} />
        </motion.div>
      )}
    </motion.button>
  );
};

const NavButton = ({ onClick, active, theme, label, secondary }: any) => {
  // const config = THEME_CONFIG[theme]; // Unused currently, using generic white/slate
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={!active}
      className={`
        py-4 px-8 rounded-xl font-bold text-xl transition-all duration-300 w-full shadow-lg border-2
        ${!active ? 'opacity-50 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-500' : ''}
        ${secondary 
            ? 'bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40' 
            : `bg-white border-white text-slate-900 hover:bg-slate-200 hover:border-slate-200` 
        }
      `}
    >
      {label}
    </motion.button>
  );
};