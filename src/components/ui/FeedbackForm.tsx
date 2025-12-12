import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Star, CheckCircle, AlertCircle, Loader } from 'lucide-react';
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
// טופס משוב - מאפשר למשתמשים לשלוח פידבק
// =============================================
interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackStatus = 'idle' | 'sending' | 'success' | 'error';

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [status, setStatus] = useState<FeedbackStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setErrorMessage('נא לכתוב משוב');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // בניית תוכן ההודעה
    const title = rating > 0 ? `משוב (${rating}/5 כוכבים)` : 'משוב מהאפליקציה';
    const fullMessage = `
דירוג: ${rating > 0 ? '⭐'.repeat(rating) : 'לא דורג'}

${message}

---
פרטים נוספים:
- שם: ${name || 'לא צוין'}
- מייל: ${email || 'לא צוין'}
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
          name: name || 'משתמש אנונימי',
          email: email || 'לא צוין',
          title: title,
          message: fullMessage,
        },
        EMAILJS_CONFIG.publicKey
      );

      setStatus('success');

      // Reset form after success
      setTimeout(() => {
        setMessage('');
        setRating(0);
        setStatus('idle');
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Failed to send feedback:', error);
      setStatus('error');
      setErrorMessage('שליחת המשוב נכשלה. נסה שוב מאוחר יותר.');
    }
  };

  const handleClose = () => {
    if (status !== 'sending') {
      setStatus('idle');
      setErrorMessage('');
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">שלח לנו משוב 💬</h2>
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
                  <p className="text-white/60 text-center">המשוב שלך נשלח בהצלחה. אנחנו מעריכים את הזמן שלך!</p>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">איך היית מדרג את החוויה?</label>
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 transition-all ${
                            star <= rating
                              ? 'text-amber-400 scale-110'
                              : 'text-white/20 hover:text-white/40'
                          }`}
                          aria-label={`${star} כוכבים`}
                        >
                          <Star
                            size={32}
                            fill={star <= rating ? 'currentColor' : 'none'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name (optional) */}
                  <div className="space-y-1">
                    <label htmlFor="feedback-name" className="text-sm text-white/70">
                      שם (אופציונלי)
                    </label>
                    <input
                      id="feedback-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="השם שלך"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                    />
                  </div>

                  {/* Email (optional) */}
                  <div className="space-y-1">
                    <label htmlFor="feedback-email" className="text-sm text-white/70">
                      אימייל (אופציונלי - אם תרצה שנחזור אליך)
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      dir="ltr"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="feedback-message" className="text-sm text-white/70">
                      המשוב שלך *
                    </label>
                    <textarea
                      id="feedback-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="מה אהבת? מה אפשר לשפר? נתקלת בבאג?"
                      rows={4}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none"
                    />
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
                    המשוב שלך עוזר לנו להפוך את האפליקציה לטובה יותר! 💜
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
