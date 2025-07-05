// src/hooks/useViewportReveal.ts
import { useEffect, useRef, useCallback } from 'react';

interface UseViewportRevealProps {
  enabled: boolean;
  onReveal: () => void;
  threshold?: number;
  debounceMs?: number;
  projectId?: number; // Para debugging
}

export const useViewportReveal = ({ 
  enabled, 
  onReveal, 
  threshold = 0.3, 
  debounceMs = 500,
  projectId 
}: UseViewportRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const hasRevealedRef = useRef(false);

  // Debounced reveal function
  const debouncedReveal = useCallback(() => {
    if (hasRevealedRef.current) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      hasRevealedRef.current = true;
      console.log('👁️ Card viewport reveal (debounced):', projectId || 'unknown');
      onReveal();
    }, debounceMs);
  }, [onReveal, debounceMs, projectId]);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    // Reset reveal state when enabled changes
    hasRevealedRef.current = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            console.log('🔍 Card entered viewport threshold:', {
              projectId: projectId || 'unknown',
              ratio: entry.intersectionRatio,
              threshold
            });
            debouncedReveal();
          }
        });
      },
      {
        threshold,
        rootMargin: '20px 0px', // Menor margem para melhor precisão
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, debouncedReveal, threshold, projectId]);

  return elementRef;
};