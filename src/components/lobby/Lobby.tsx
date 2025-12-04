import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { RoomType } from '../../types';
import { Beaker, Lock, Calculator, Component, LogOut, Star, Flame, Trophy, Volume2, VolumeX, BarChart3, GraduationCap, MessageCircle } from 'lucide-react';
import { getTimeGreeting } from '../../utils/messages';
import { VAULT_CURRICULUM, VAULT_TOPICS, LAB_TOPICS, LAB_CURRICULUM } from '../../data/curriculum';
import { fractionsModule, getModuleStats as getFractionsStats } from '../../data/curriculum/fractions';
import { numbersModule, getModuleStats as getNumbersStats } from '../../data/curriculum/numbers';
import { ParentDashboard } from '../dashboard/ParentDashboard';

interface LobbyProps {
  onNavigate: (room: RoomType) => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onNavigate }) => {
  const { user, theme, clearUser, isMuted, toggleMute } = useUser();
  const [showDashboard, setShowDashboard] = useState(false);

  // Dynamic Styles based on theme
  const getHeaderStyle = () => {
    switch (user?.theme) {
      case 'pop':
        return 'font-sans text-yellow-300 drop-shadow-[0_4px_0_rgba(236,72,153,0.8)]';
      case 'sports':
        return 'font-sans font-black italic text-white drop-shadow-md';
      case 'nature':
        return 'font-sans text-lime-300 drop-shadow-[0_0_15px_rgba(163,230,53,0.6)]';
      case 'ocean':
        return 'font-sans text-sky-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]';
      case 'candy':
        return 'font-sans text-rose-300 drop-shadow-[0_0_15px_rgba(251,113,133,0.6)]';
      case 'scifi':
      default:
        return 'font-mono text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]';
    }
  };

  const getCardStyle = (isActive: boolean) => {
    const base = "relative overflow-hidden rounded-2xl md:rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-6 h-44 md:h-64 w-full";

    if (!isActive) {
      return `${base} bg-black/40 border-white/5 opacity-50 grayscale cursor-not-allowed`;
    }

    // Active styles per theme
    switch (user?.theme) {
      case 'pop':
        return `${base} bg-fuchsia-900/40 border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:scale-105 hover:bg-fuchsia-800/60 cursor-pointer`;
      case 'sports':
        return `${base} bg-emerald-900/40 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:scale-105 hover:bg-emerald-800/60 cursor-pointer`;
      case 'nature':
        return `${base} bg-amber-900/40 border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.3)] hover:scale-105 hover:bg-amber-800/60 cursor-pointer`;
      case 'ocean':
        return `${base} bg-sky-900/40 border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:scale-105 hover:bg-sky-800/60 cursor-pointer`;
      case 'candy':
        return `${base} bg-rose-900/40 border-rose-400 shadow-[0_0_30px_rgba(251,113,133,0.3)] hover:scale-105 hover:bg-rose-800/60 cursor-pointer`;
      case 'scifi':
      default:
        return `${base} bg-slate-800/40 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-105 hover:bg-slate-700/60 cursor-pointer`;
    }
  };

  // Specific style overrides for the Vault card (Gold/Amber theme)
  const getVaultCardStyle = () => {
    const base = "relative overflow-hidden rounded-2xl md:rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-6 h-44 md:h-64 w-full";
    // Always Amber/Gold regardless of user theme, or blend it?
    // Let's stick to the prompt's implied "Vault" aesthetic but keep it cohesive. 
    // Actually, making it "Gold" distincts it as a special room.
    return `${base} bg-neutral-900/80 border-amber-500 shadow-[0_0_30px_rgba(251,191,36,0.2)] hover:scale-105 hover:bg-neutral-800 cursor-pointer`;
  };

  return (
    <div className={`w-full h-full flex flex-col items-center p-4 md:p-8 overflow-y-auto ${theme.bg} transition-colors duration-700`} dir="rtl">
      
      {/* Background Ambience */}
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${theme.bgGradient} opacity-60 pointer-events-none`} />
      
      {/* Top Controls */}
      <div className="absolute top-6 left-6 z-50 flex gap-2">
        {/* Parent Dashboard Button */}
        <button
          onClick={() => setShowDashboard(true)}
          className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5 hover:border-white/20"
          title="לוח הורים"
        >
          <BarChart3 size={20} />
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full transition-all border ${
            isMuted
              ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
              : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white hover:border-white/20'
          }`}
          title={isMuted ? 'הפעל צלילים' : 'השתק צלילים'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Logout / Reset Profile */}
        <button
          onClick={clearUser}
          className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5 hover:border-white/20"
        >
          <LogOut size={20} />
        </button>

        {/* Feedback Button */}
        <a
          href="mailto:feedback@matemati-bis.co.il?subject=פידבק על מתמטי-ביס"
          className="p-3 bg-white/5 rounded-full hover:bg-amber-500/20 text-white/40 hover:text-amber-400 transition-all border border-white/5 hover:border-amber-500/30"
          title="שלח פידבק"
        >
          <MessageCircle size={20} />
        </a>
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-start mt-4 md:mt-8 mb-6 md:mb-12"
      >
        <h2 className={`text-lg md:text-2xl text-white/60 mb-1 md:mb-2 font-bold`}>
          {user ? getTimeGreeting(user.gender, user.name) : 'שלום!'}
        </h2>
        <h1 className={`text-3xl md:text-6xl font-bold ${getHeaderStyle()}`}>
          לאן ממשיכים?
        </h1>
      </motion.div>

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-5xl">

        {/* CARD 1: FRACTIONS (Active) */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => onNavigate(RoomType.FRACTIONS)}
          className={getCardStyle(true)}
        >
           <div className={`p-3 md:p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 ${
             user?.theme === 'pop' ? 'text-yellow-300' :
             user?.theme === 'sports' ? 'text-white' :
             user?.theme === 'nature' ? 'text-lime-300' :
             user?.theme === 'ocean' ? 'text-sky-300' :
             user?.theme === 'candy' ? 'text-rose-300' :
             'text-cyan-400'
           }`}>
              <span className="text-3xl md:text-5xl">{fractionsModule.icon}</span>
           </div>
           <h3 className={`text-lg md:text-2xl font-bold text-white`}>{fractionsModule.title}</h3>
           <p className="text-xs text-white/50 text-center px-2">{fractionsModule.description}</p>
           {/* Progress bar */}
           {(() => {
             const completedUnits = user?.progress?.completedLevels?.filter(id => id.startsWith('unit_')) || [];
             const stats = getFractionsStats(completedUnits);
             return (
               <div className="w-full max-w-[180px] flex flex-col items-center gap-1">
                 <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${stats.progressPercent}%` }}
                     transition={{ delay: 0.5, duration: 0.8 }}
                     className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                   />
                 </div>
                 <div className="text-xs text-white/70">
                   {stats.completedCount} / {stats.totalCount} יחידות
                 </div>
               </div>
             );
           })()}
        </motion.button>

        {/* CARD 2: NUMBERS (Active) */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onNavigate(RoomType.NUMBERS)}
          className={getVaultCardStyle()}
        >
           <div className="p-3 md:p-6 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-3xl md:text-5xl">{numbersModule.icon}</span>
           </div>
           <h3 className="text-lg md:text-2xl font-bold text-amber-100">{numbersModule.title}</h3>
           <p className="text-xs text-amber-400/70 text-center px-2">{numbersModule.description}</p>
           {/* Progress bar */}
           {(() => {
             const completedUnits = user?.progress?.completedLevels?.filter(id => id.startsWith('unit_')) || [];
             const stats = getNumbersStats(completedUnits);
             return (
               <div className="w-full max-w-[180px] flex flex-col items-center gap-1">
                 <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${stats.progressPercent}%` }}
                     transition={{ delay: 0.5, duration: 0.8 }}
                     className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                   />
                 </div>
                 <div className="text-xs text-amber-400/70">
                   {stats.completedCount} / {stats.totalCount} יחידות
                 </div>
               </div>
             );
           })()}
        </motion.button>

        {/* CARD 3: GEOMETRY (Coming Soon) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={getCardStyle(false)}
        >
           <div className="p-4 md:p-6 rounded-full bg-black/20 border border-white/5 text-white/20">
              <span className="text-3xl md:text-5xl opacity-40">📐</span>
           </div>
           <h3 className="text-lg md:text-2xl font-bold text-white/40">גיאומטריה</h3>
           <div className="px-3 py-1 rounded-full text-xs font-bold bg-black/20 text-white/30">בקרוב</div>
        </motion.div>

      </div>

      {/* Stats Bar */}
      {(user?.progress?.totalScore || user?.progress?.streak) ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mt-6 md:mt-12 flex flex-wrap gap-3 md:gap-6 items-center justify-center px-2"
        >
          {/* Total Score */}
          {user?.progress?.totalScore > 0 && (
            <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-1.5 md:p-2 rounded-full bg-amber-500/20">
                <Star size={20} className="md:w-6 md:h-6 text-amber-400 fill-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/50 text-[10px] md:text-xs">ניקוד</span>
                <span className="text-white font-bold text-lg md:text-xl">{user.progress.totalScore}</span>
              </div>
            </div>
          )}

          {/* Streak */}
          {user?.progress?.streak > 0 && (
            <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 backdrop-blur-sm">
              <div className="p-1.5 md:p-2 rounded-full bg-orange-500/20">
                <Flame size={20} className="md:w-6 md:h-6 text-orange-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-orange-300/70 text-[10px] md:text-xs">רצף</span>
                <span className="text-orange-300 font-bold text-lg md:text-xl">{user.progress.streak} 🔥</span>
              </div>
            </div>
          )}

          {/* Completed Levels Badge */}
          {user?.progress?.completedLevels.length >= VAULT_CURRICULUM.length && (
            <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 backdrop-blur-sm">
              <div className="p-1.5 md:p-2 rounded-full bg-emerald-500/20">
                <Trophy size={20} className="md:w-6 md:h-6 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-300/70 text-[10px] md:text-xs">סיימת!</span>
                <span className="text-emerald-300 font-bold text-lg md:text-xl">🏆</span>
              </div>
            </div>
          )}
        </motion.div>
      ) : null}

      {/* Parent Dashboard Modal */}
      <AnimatePresence>
        {showDashboard && (
          <ParentDashboard onClose={() => setShowDashboard(false)} />
        )}
      </AnimatePresence>

    </div>
  );
};