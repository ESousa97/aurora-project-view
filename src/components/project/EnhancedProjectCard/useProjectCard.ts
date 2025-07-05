// src/components/project/EnhancedProjectCard/useProjectCard.ts
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { LANGUAGE_COLORS, LanguageColor } from '@/lib/languageColors';
import type { EnhancedProjectCard as EnhancedProjectCardType } from '@/types/enhanced';

interface UseProjectCardProps {
  project: EnhancedProjectCardType | null | undefined;
  variant: string;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export const useProjectCard = ({ project, variant, onDiscover, isDiscovered }: UseProjectCardProps) => {
  const navigate = useNavigate();
  // Usar isDiscovered do localStorage se disponível, senão usar a lógica padrão
  const [revealed, setRevealed] = useState(isDiscovered ?? (variant !== 'mystery'));

  // Sincronizar com isDiscovered quando ele mudar (importante para localStorage)
  useEffect(() => {
    if (isDiscovered !== undefined) {
      console.log(`🔍 Project ${project?.titulo} - Setting revealed to:`, isDiscovered);
      setRevealed(isDiscovered);
    }
  }, [isDiscovered, project?.titulo]);

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
      toast.success(`Descobriu ${project.titulo}!`, { duration: 2000 });
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
