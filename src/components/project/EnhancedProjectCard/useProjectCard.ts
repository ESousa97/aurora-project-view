// src/components/project/EnhancedProjectCard/useProjectCard.ts
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGE_COLORS, LanguageColor } from '@/lib/languageColors';
import type { EnhancedProjectCard as EnhancedProjectCardType } from '@/types/enhanced';

interface UseProjectCardProps {
  project: EnhancedProjectCardType | null | undefined;
  variant: string;
  onDiscover?: (id: number) => void;
}

export const useProjectCard = ({ project, variant, onDiscover }: UseProjectCardProps) => {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(variant !== 'mystery');

  // Detect language config
  const langConfig: LanguageColor = useMemo(
    () => project?.detectedLanguage ?? LANGUAGE_COLORS.default,
    [project]
  );

  // Unified click handler: reveal then navigate
  const handleClick = useCallback(() => {
    if (!project?.id) return;
    
    if (!revealed) {
      setRevealed(true);
      onDiscover?.(project.id);
      return;
    }
    
    navigate(`/projects/${project.id}`);
  }, [project, revealed, navigate, onDiscover]);

  return {
    revealed,
    langConfig,
    handleClick,
    ProjectIcon: langConfig.icon,
  };
};
