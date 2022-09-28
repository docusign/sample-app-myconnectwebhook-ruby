import { useEffect, useRef } from 'react';

export const useTimer = (interval) => {
  const timerRef = useRef(null);

  const startTimer = (callback) => {
    timerRef.current = setInterval(callback, interval);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  useEffect(() => () => stopTimer(), []);

  return [startTimer, stopTimer];
};
