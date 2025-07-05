// src/hooks/useViewportReveal.ts
import { useEffect, useRef } from 'react';

interface UseViewportRevealProps {
  enabled: boolean;
  onReveal: () => void;
  threshold?: number;
}

export const useViewportReveal = ({ enabled, onReveal, threshold = 0.3 }: UseViewportRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('🔍 Card entered viewport, revealing...');
            onReveal();
          }
        });
      },
      {
        threshold,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onReveal, threshold]);

  return elementRef;
};