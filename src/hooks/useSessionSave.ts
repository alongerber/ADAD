import { useEffect, useRef, useCallback, useState } from 'react';

// =============================================
// מנהל שמירת סשן - לשמירת התקדמות אמצע-תרגיל
// =============================================

export interface SessionState {
  moduleType?: string;
  unitId?: string;
  stepIndex?: number;
  questionIndex?: number;
  answers?: boolean[];
  sessionStartTime?: number;
  lastSaveTime: number;
}

const SESSION_KEY = 'biss_session_state';
const SAVE_INTERVAL = 30000; // 30 שניות

// שמירת מצב סשן
export const saveSessionState = (state: Partial<SessionState>) => {
  try {
    const existing = loadSessionState();
    const newState: SessionState = {
      ...existing,
      ...state,
      lastSaveTime: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newState));
    return true;
  } catch (e) {
    console.error('Failed to save session state:', e);
    return false;
  }
};

// טעינת מצב סשן
export const loadSessionState = (): SessionState | null => {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load session state:', e);
  }
  return null;
};

// מחיקת מצב סשן (אחרי סיום מוצלח)
export const clearSessionState = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('Failed to clear session state:', e);
  }
};

// בדיקה אם יש סשן שמור
export const hasUnfinishedSession = (): boolean => {
  const state = loadSessionState();
  if (!state) return false;

  // בדיקה שהסשן לא ישן מדי (יותר מ-24 שעות)
  const hoursSinceLastSave = (Date.now() - state.lastSaveTime) / (1000 * 60 * 60);
  return hoursSinceLastSave < 24;
};

// =============================================
// Hook לשמירה אוטומטית
// =============================================
interface UseAutoSaveOptions {
  moduleType?: string;
  unitId?: string;
  stepIndex?: number;
  questionIndex: number;
  answers: boolean[];
  enabled?: boolean;
}

export const useAutoSave = ({
  moduleType,
  unitId,
  stepIndex,
  questionIndex,
  answers,
  enabled = true
}: UseAutoSaveOptions) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartRef = useRef<number>(Date.now());

  // שמירה ידנית
  const save = useCallback(() => {
    if (!enabled) return false;

    setIsSaving(true);
    const success = saveSessionState({
      moduleType,
      unitId,
      stepIndex,
      questionIndex,
      answers,
      sessionStartTime: sessionStartRef.current,
    });

    if (success) {
      setLastSaved(new Date());
    }
    setIsSaving(false);
    return success;
  }, [moduleType, unitId, stepIndex, questionIndex, answers, enabled]);

  // שמירה אוטומטית כל 30 שניות
  useEffect(() => {
    if (!enabled) return;

    // שמירה ראשונית
    save();

    // שמירה תקופתית
    intervalRef.current = setInterval(() => {
      save();
    }, SAVE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [save, enabled]);

  // שמירה בכל שינוי שאלה
  useEffect(() => {
    if (!enabled) return;
    save();
  }, [questionIndex, answers.length, save, enabled]);

  return {
    lastSaved,
    isSaving,
    save,
    clearSession: clearSessionState,
  };
};

export default useAutoSave;
