import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Star, Flame, Trophy, Calendar, Target, Beaker, Lock,
  TrendingUp, Award, Clock, CheckCircle, AlertCircle,
  MessageCircle, RotateCcw, HelpCircle, ExternalLink
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { LAB_CURRICULUM, VAULT_CURRICULUM, LAB_TOPICS, VAULT_TOPICS } from '../../data/curriculum';
import { ACHIEVEMENTS } from '../../data/achievements';

interface ParentDashboardProps {
  onClose: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onClose }) => {
  const { user, resetProgress } = useUser();
  const progress = user?.progress;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  if (!progress) {
    return null;
  }

  // Calculate stats
  const labLevels = progress.completedLevels.filter(id => id.startsWith('frac_'));
  const vaultLevels = progress.completedLevels.filter(id => id.startsWith('lvl_'));

  const labProgress = (labLevels.length / LAB_CURRICULUM.length) * 100;
  const vaultProgress = (vaultLevels.length / VAULT_CURRICULUM.length) * 100;
  const totalProgress = (progress.completedLevels.length / (LAB_CURRICULUM.length + VAULT_CURRICULUM.length)) * 100;

  const unlockedAchievements = ACHIEVEMENTS.filter(a =>
    progress.unlockedAchievements.includes(a.id)
  );

  // Format last played date
  const formatLastPlayed = () => {
    if (!progress.lastPlayedAt) return 'לא שיחק עדיין';
    const date = new Date(progress.lastPlayedAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'עכשיו';
    if (diffMins < 60) return `לפני ${diffMins} דקות`;
    if (diffHours < 24) return `לפני ${diffHours} שעות`;
    if (diffDays === 1) return 'אתמול';
    return `לפני ${diffDays} ימים`;
  };

  // Find struggling areas (levels attempted but not completed would need tracking)
  // For now, show next recommended levels
  const nextLabLevel = LAB_CURRICULUM.find(l => !labLevels.includes(l.id));
  const nextVaultLevel = VAULT_CURRICULUM.find(l => !vaultLevels.includes(l.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-slate-900/98 backdrop-blur-md overflow-y-auto"
      dir="rtl"
    >
      <div className="min-h-full p-4 md:p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">לוח הורים</h1>
              <p className="text-white/60 text-sm mt-1">מעקב התקדמות של {user?.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {/* Total Progress */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Target size={18} className="text-cyan-400" />
                </div>
                <span className="text-cyan-300 text-xs font-bold">התקדמות כללית</span>
              </div>
              <div className="text-3xl font-black text-white">{Math.round(totalProgress)}%</div>
              <div className="text-xs text-white/50 mt-1">
                {progress.completedLevels.length} / {LAB_CURRICULUM.length + VAULT_CURRICULUM.length} שלבים
              </div>
            </div>

            {/* Total Score */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Star size={18} className="text-amber-400" />
                </div>
                <span className="text-amber-300 text-xs font-bold">ניקוד כולל</span>
              </div>
              <div className="text-3xl font-black text-white">{progress.totalScore}</div>
              <div className="text-xs text-white/50 mt-1">נקודות</div>
            </div>

            {/* Max Streak */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Flame size={18} className="text-orange-400" />
                </div>
                <span className="text-orange-300 text-xs font-bold">רצף שיא</span>
              </div>
              <div className="text-3xl font-black text-white">{progress.maxStreak}</div>
              <div className="text-xs text-white/50 mt-1">רצף נוכחי: {progress.streak}</div>
            </div>

            {/* Days Played */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Calendar size={18} className="text-green-400" />
                </div>
                <span className="text-green-300 text-xs font-bold">ימי פעילות</span>
              </div>
              <div className="text-3xl font-black text-white">{progress.daysPlayed}</div>
              <div className="text-xs text-white/50 mt-1">ימים שונים</div>
            </div>
          </div>

          {/* Module Progress */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Lab Progress */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                  <Beaker size={24} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">מעבדת השברים</h3>
                  <p className="text-xs text-white/50">{labLevels.length} / {LAB_CURRICULUM.length} שלבים הושלמו</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 bg-black/40 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${labProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                />
              </div>

              {/* Topics Breakdown */}
              <div className="space-y-2">
                {LAB_TOPICS.map((topic, idx) => {
                  const [start, end] = topic.levels.split('-').map(Number);
                  const topicLevels = LAB_CURRICULUM.slice(start - 1, end);
                  const completed = topicLevels.filter(l => labLevels.includes(l.id)).length;
                  return (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{topic.icon} {topic.title}</span>
                      <span className={completed === topicLevels.length ? 'text-green-400' : 'text-white/50'}>
                        {completed}/{topicLevels.length}
                      </span>
                    </div>
                  );
                })}
              </div>

              {nextLabLevel && (
                <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <div className="text-xs text-cyan-300 font-bold mb-1">השלב הבא:</div>
                  <div className="text-sm text-white">{nextLabLevel.title}</div>
                </div>
              )}
            </div>

            {/* Vault Progress */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                  <Lock size={24} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">הכספת</h3>
                  <p className="text-xs text-white/50">{vaultLevels.length} / {VAULT_CURRICULUM.length} שלבים הושלמו</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 bg-black/40 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vaultProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                />
              </div>

              {/* Topics Breakdown */}
              <div className="space-y-2">
                {VAULT_TOPICS.map((topic, idx) => {
                  const [start, end] = topic.levels.split('-').map(Number);
                  const topicLevels = VAULT_CURRICULUM.slice(start - 1, end);
                  const completed = topicLevels.filter(l => vaultLevels.includes(l.id)).length;
                  return (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{topic.icon} {topic.title}</span>
                      <span className={completed === topicLevels.length ? 'text-green-400' : 'text-white/50'}>
                        {completed}/{topicLevels.length}
                      </span>
                    </div>
                  );
                })}
              </div>

              {nextVaultLevel && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <div className="text-xs text-amber-300 font-bold mb-1">השלב הבא:</div>
                  <div className="text-sm text-white">{nextVaultLevel.title}</div>
                </div>
              )}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <Trophy size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">הישגים</h3>
                <p className="text-xs text-white/50">
                  {unlockedAchievements.length} / {ACHIEVEMENTS.filter(a => !a.secret).length} הישגים נפתחו
                </p>
              </div>
            </div>

            {unlockedAchievements.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {unlockedAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="text-xs text-white font-bold mt-1">{achievement.title}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-white/40">
                <Award size={32} className="mx-auto mb-2 opacity-50" />
                <p>עוד לא נפתחו הישגים</p>
              </div>
            )}
          </div>

          {/* Activity Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <Clock size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">פעילות אחרונה</h3>
                <p className="text-xs text-white/50">{formatLastPlayed()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-xs text-white/50 mb-1">תאריך משחק אחרון</div>
                <div className="text-sm text-white font-bold">
                  {progress.lastPlayDate || 'לא זמין'}
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-xs text-white/50 mb-1">רצף נוכחי</div>
                <div className="text-sm text-white font-bold flex items-center gap-1">
                  {progress.streak > 0 ? (
                    <>
                      <CheckCircle size={14} className="text-green-400" />
                      {progress.streak} ברצף
                    </>
                  ) : (
                    <>
                      <AlertCircle size={14} className="text-yellow-400" />
                      צריך להתחיל רצף חדש
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tips for Parents */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl">
            <h4 className="font-bold text-indigo-300 mb-2">טיפים להורים</h4>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• עודדו את הילד לשחק מספר דקות כל יום לשמירה על רצף</li>
              <li>• חגגו יחד כשנפתחים הישגים חדשים</li>
              <li>• אם הילד נתקע בשלב מסוים, נסו לעבור לנושא אחר ולחזור מאוחר יותר</li>
              <li>• השתמשו בכפתור ההשתקה אם יש צורך בסביבה שקטה</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* How to Use */}
            <button
              onClick={() => setShowHowToUse(true)}
              className="flex items-center justify-center gap-3 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all"
            >
              <HelpCircle size={20} className="text-blue-400" />
              <span className="text-blue-300 font-bold">איך משתמשים?</span>
            </button>

            {/* Feedback Button */}
            <a
              href="mailto:feedback@matmati-bis.app?subject=משוב על מתמטי-ביס"
              className="flex items-center justify-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all"
            >
              <MessageCircle size={20} className="text-green-400" />
              <span className="text-green-300 font-bold">שלח משוב</span>
              <ExternalLink size={14} className="text-green-400/50" />
            </a>

            {/* Reset Progress */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center justify-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all"
            >
              <RotateCcw size={20} className="text-red-400" />
              <span className="text-red-300 font-bold">אפס התקדמות</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 border border-red-500/30 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-red-500/20">
                  <AlertCircle size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">לאפס התקדמות?</h3>
              </div>
              <p className="text-white/70 mb-6">
                פעולה זו תמחק את כל ההתקדמות, הניקוד וההישגים של {user?.name}.
                <br />
                <span className="text-red-400 font-bold">לא ניתן לבטל פעולה זו!</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
                >
                  ביטול
                </button>
                <button
                  onClick={() => {
                    resetProgress();
                    setShowResetConfirm(false);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all"
                >
                  כן, אפס הכל
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How to Use Modal */}
      <AnimatePresence>
        {showHowToUse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowHowToUse(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 border border-blue-500/30 rounded-2xl p-6 max-w-lg w-full my-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-blue-500/20">
                    <HelpCircle size={24} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">איך משתמשים?</h3>
                </div>
                <button
                  onClick={() => setShowHowToUse(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="space-y-4 text-white/80">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-bold text-cyan-300 mb-2 flex items-center gap-2">
                    <Beaker size={18} /> מעבדת השברים
                  </h4>
                  <p className="text-sm">
                    תרגול שברים עם כלי מעבדה חזותי. הילד לומד על ידי מילוי כוס מדידה
                    ומסדר ספרות לתוך תשובות. יש לימוד מונפש לפני כל נושא חדש.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-bold text-amber-300 mb-2 flex items-center gap-2">
                    <Lock size={18} /> הכספת
                  </h4>
                  <p className="text-sm">
                    תרגול מספרים גדולים וחיסור עם פריטה. הילד פותח כספת על ידי
                    הכנסת ספרות בסדר הנכון. מאתגר את הזיכרון והבנת ערך המקום.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-bold text-purple-300 mb-2">טיפים חשובים</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <span className="text-green-400">לימוד מונפש</span> - לפני כל נושא חדש יש הסבר חזותי. מומלץ לצפות יחד!</li>
                    <li>• <span className="text-amber-400">רצף יומי</span> - עודדו משחק של כמה דקות כל יום</li>
                    <li>• <span className="text-cyan-400">הישגים</span> - חגגו יחד כשנפתחים הישגים</li>
                    <li>• <span className="text-red-400">השתקה</span> - לחצו על כפתור הרמקול בפינה למצב שקט</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl">
                  <h4 className="font-bold text-pink-300 mb-2">מתקשים? נתקעים?</h4>
                  <p className="text-sm">
                    אם הילד מתקשה בשלב מסוים, אל דאגה! עברו לנושא אחר וחזרו מאוחר יותר.
                    ניתן גם לאפס התקדמות ולהתחיל מחדש בכל עת.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHowToUse(false)}
                className="w-full mt-6 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all"
              >
                הבנתי!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
