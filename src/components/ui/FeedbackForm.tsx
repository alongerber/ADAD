import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Star, CheckCircle, AlertCircle, Loader, Heart, Bug, HelpCircle, Lightbulb, TrendingUp, ChevronDown } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

// =============================================
// EmailJS Configuration
// =============================================
const EMAILJS_CONFIG = {
  serviceId: 'service_apf7xlf',
  templateId: 'template_XXXXXX', // TODO: Replace with your Template ID from EmailJS
  publicKey: 'XXXXXXXXXXXXXX',   // TODO: Replace with your Public Key from EmailJS
};

// =============================================
// קטגוריות משוב מוכנות
// =============================================
interface FeedbackCategory {
  id: string;
  label: string;
  emoji: string;
  icon: React.ReactNode;
  color: string;
}

const FEEDBACK_CATEGORIES: FeedbackCategory[] = [
  { id: 'love', label: 'אהבתי!', emoji: '💜', icon: <Heart size={16} />, color: 'bg-pink-500/20 border-pink-500/50 text-pink-400' },
  { id: 'bug', label: 'נתקלתי בבאג', emoji: '🐛', icon: <Bug size={16} />, color: 'bg-red-500/20 border-red-500/50 text-red-400' },
  { id: 'confused', label: 'לא הבנתי משהו', emoji: '😕', icon: <HelpCircle size={16} />, color: 'bg-amber-500/20 border-amber-500/50 text-amber-400' },
  { id: 'idea', label: 'יש לי רעיון', emoji: '💡', icon: <Lightbulb size={16} />, color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' },
  { id: 'difficulty', label: 'קשה/קל מדי', emoji: '📊', icon: <TrendingUp size={16} />, color: 'bg-blue-500/20 border-blue-500/50 text-blue-400' },
];

// =============================================
// טופס משוב - מאפשר למשתמשים לשלוח פידבק
// =============================================
interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackStatus = 'idle' | 'sending' | 'success' | 'error';

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [showDetails, setShowDetails] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FeedbackStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // בדיקה שיש לפחות קטגוריה אחת או טקסט
    if (selectedCategories.length === 0 && !message.trim() && rating === 0) {
      setErrorMessage('נא לבחור לפחות קטגוריה אחת או לכתוב משוב');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // בניית תוכן ההודעה
    const categoryLabels = selectedCategories.map(id => {
      const cat = FEEDBACK_CATEGORIES.find(c => c.id === id);
      return cat ? `${cat.emoji} ${cat.label}` : id;
    });

    const title = rating > 0
      ? `משוב (${rating}/5 כוכבים) - ${categoryLabels.join(', ') || 'כללי'}`
      : `משוב - ${categoryLabels.join(', ') || 'כללי'}`;

    const fullMessage = `
דירוג: ${rating > 0 ? '⭐'.repeat(rating) + ` (${rating}/5)` : 'לא דורג'}

קטגוריות: ${categoryLabels.length > 0 ? categoryLabels.join(', ') : 'לא נבחרו'}

${message ? `הודעה:\n${message}` : '(לא נכתבה הודעה נוספת)'}

---
פרטים נוספים:
- שם: ${name || 'לא צוין'}
- מייל: ${email || 'לא צוין'}
- שם משתמש באפליקציה: ${user?.name || 'לא מחובר'}
- גרסת דפדפן: ${navigator.userAgent}
- תאריך: ${new Date().toLocaleString('he-IL')}
    `.trim();

    try {
      // Dynamic import of EmailJS to reduce initial bundle size
      const emailjs = await import('@emailjs/browser');

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: name || user?.name || 'משתמש אנונימי',
          email: email || 'לא צוין',
          title: title,
          message: fullMessage,
        },
        EMAILJS_CONFIG.publicKey
      );

      setStatus('success');

      // Reset form after success
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Failed to send feedback:', error);
      setStatus('error');
      setErrorMessage('שליחת המשוב נכשלה. נסה שוב מאוחר יותר.');
    }
  };

  const resetForm = () => {
    setSelectedCategories([]);
    setMessage('');
    setRating(0);
    setShowDetails(false);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleClose = () => {
    if (status !== 'sending') {
      resetForm();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div
              className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden my-auto"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">מה דעתך? 💬</h2>
                <button
                  onClick={handleClose}
                  disabled={status === 'sending'}
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-50"
                  aria-label="סגור"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Success State */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 flex flex-col items-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle size={40} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">תודה רבה! 🎉</h3>
                  <p className="text-white/60 text-center">המשוב שלך חשוב לנו מאוד!</p>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="p-4 space-y-5">
                  {/* Quick Rating */}
                  <div className="space-y-2">
                    <label className="text-sm text-white/70 block text-center">איך היה?</label>
                    <div className="flex gap-1 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(rating === star ? 0 : star)}
                          className={`p-1 transition-all ${
                            star <= rating
                              ? 'text-amber-400 scale-110'
                              : 'text-white/20 hover:text-white/40'
                          }`}
                          aria-label={`${star} כוכבים`}
                        >
                          <Star
                            size={28}
                            fill={star <= rating ? 'currentColor' : 'none'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Chips */}
                  <div className="space-y-2">
                    <label className="text-sm text-white/70 block">על מה תרצה לספר?</label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {FEEDBACK_CATEGORIES.map((category) => {
                        const isSelected = selectedCategories.includes(category.id);
                        return (
                          <motion.button
                            key={category.id}
                            type="button"
                            onClick={() => toggleCategory(category.id)}
                            whileTap={{ scale: 0.95 }}
                            className={`
                              px-3 py-2 rounded-full border-2 text-sm font-medium
                              flex items-center gap-1.5 transition-all
                              ${isSelected
                                ? category.color + ' scale-105'
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                              }
                            `}
                          >
                            <span>{category.emoji}</span>
                            <span>{category.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div className="space-y-1">
                    <label htmlFor="feedback-message" className="text-sm text-white/70">
                      רוצה להוסיף עוד משהו? (אופציונלי)
                    </label>
                    <textarea
                      id="feedback-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="ספר לנו עוד..."
                      rows={3}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none"
                    />
                  </div>

                  {/* Expandable Details */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors mx-auto"
                    >
                      <span>פרטי קשר (אופציונלי)</span>
                      <motion.div
                        animate={{ rotate: showDetails ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="שם (אופציונלי)"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/50"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="אימייל - אם תרצה שנחזור אליך"
                            dir="ltr"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/50"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm"
                    >
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        <span>שולח...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>שלח משוב</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/40 text-center">
                    לוקח שנייה וממש עוזר לנו! 💜
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FeedbackForm;
