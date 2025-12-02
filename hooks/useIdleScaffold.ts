import { useState, useEffect, useCallback } from 'react';
import { IDLE_TIMEOUT_MS } from '../constants';

export const useIdleScaffold = () => {
  const [isIdle, setIsIdle] = useState(false);

  const resetTimer = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTimer = () => {
      timeoutId = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT_MS);
    };

    const handleUserActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      startTimer();
    };

    // Listen for basic interactions
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    startTimer(); // Initial start

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
  }, []);

  return { isIdle, resetTimer };
};