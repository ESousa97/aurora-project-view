// hooks/useWordRotation.ts
import { useState, useEffect } from 'react';

export const useWordRotation = (words: string[], interval: number = 3000): number => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [words.length, interval]);

  return currentWordIndex;
};
