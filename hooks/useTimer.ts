
import { useState, useRef, useCallback, useEffect } from 'react';

export const useTimer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (!isActive) {
      const now = Date.now();
      setStartTime(now);
      setIsActive(true);
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }
  }, [isActive]);

  const stopTimer = useCallback(() => {
    if (isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      const finalElapsedTime = elapsedTime;
      setElapsedTime(0);
      return finalElapsedTime;
    }
    return 0;
  }, [isActive, elapsedTime]);

  const resetTimer = useCallback(() => {
    if (!isActive) {
      setElapsedTime(0);
      setStartTime(null);
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { elapsedTime, isActive, startTime, startTimer, stopTimer, resetTimer };
};
