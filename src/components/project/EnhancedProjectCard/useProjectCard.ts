// src/components/project/EnhancedProjectCard/useProjectCard.ts
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { LANGUAGE_COLORS, LanguageColor } from '@/lib/languageColors';
import { useRevealedProjects } from '@/hooks/useRevealedProjects';
import { useViewportReveal } from '@/hooks/useViewportReveal';
import type { EnhancedProjectCard as EnhancedProjectCardType } from '@/types/enhanced';

interface UseProjectCardProps {
  project: EnhancedProjectCardType | null | undefined;
  variant: string;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export const useProjectCard = ({ project, variant, onDiscover, isDiscovered }: UseProjectCardProps) => {
  const navigate = useNavigate();
  const { revealProject } = useRevealedProjects();
  
  // APENAS cards mystery começam não revelados
  const [revealed, setRevealed] = useState(variant !== 'mystery' ? true : (isDiscovered ?? false));

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
    
    // SEMPRE marcar como revelado no localStorage quando clicado
    revealProject(project.id);
    console.log('🎯 EnhancedProjectCard: Marking project as revealed:', project.id, project.titulo);
    
    if (!revealed) {
      setRevealed(true);
      toast.success(`Descobriu ${project.titulo}!`, { duration: 2000 });
      onDiscover?.(project.id);
      return;
    }
    
    navigate(`/projects/${project.id}`);
  }, [project, revealed, navigate, onDiscover, revealProject]);

  // Auto-reveal no viewport para cards mystery
  const handleViewportReveal = useCallback(() => {
    if (variant === 'mystery' && !revealed && project?.id) {
      setRevealed(true);
      revealProject(project.id);
      onDiscover?.(project.id);
      toast.success(`Descobriu ${project.titulo}!`, { duration: 2000 });
      console.log('🔍 Auto-revealed project via viewport:', project.id, project.titulo);
    }
  }, [variant, revealed, project, revealProject, onDiscover]);

  const viewportRef = useViewportReveal({
    enabled: variant === 'mystery' && !revealed,
    onReveal: handleViewportReveal,
    threshold: 0.4
  });

  return {
    revealed,
    langConfig,
    handleClick,
    ProjectIcon: langConfig.icon,
    viewportRef,
  };
};
