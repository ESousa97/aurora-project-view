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
  
  // LÓGICA CORRIGIDA: Cards normais (não mystery) SEMPRE revelados
  const [revealed, setRevealed] = useState(() => {
    if (variant === 'mystery') {
      return isDiscovered ?? false; // Mystery só revelado se já foi descoberto
    }
    return true; // Todos os outros variants sempre revelados
  });

  // Sincronizar apenas para mystery cards
  useEffect(() => {
    if (variant === 'mystery' && isDiscovered !== undefined) {
      console.log(`🔍 Mystery Project ${project?.titulo} - Setting revealed to:`, isDiscovered);
      setRevealed(isDiscovered);
    }
  }, [isDiscovered, project?.titulo, variant]);

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

  // Auto-reveal no viewport para TODOS os cards (sincronização entre seções)
  const handleViewportReveal = useCallback(() => {
    if (project?.id) {
      // SEMPRE marcar como revelado quando visualizado, independente da seção
      revealProject(project.id);
      console.log('👁️ Project viewed in viewport:', {
        id: project.id,
        title: project.titulo,
        variant,
        section: variant === 'mystery' ? 'Mystery' : variant === 'compact' ? 'Exploração Completa' : 'Território'
      });
      
      // Para mystery cards, também mostrar toast e disparar onDiscover
      if (variant === 'mystery' && !revealed) {
        setRevealed(true);
        onDiscover?.(project.id);
        toast.success(`Descobriu ${project.titulo}!`, { duration: 2000 });
        console.log('🔍 Auto-revealed mystery project:', project.id, project.titulo);
      }
    }
  }, [project, revealProject, variant, revealed, onDiscover]);

  const viewportRef = useViewportReveal({
    enabled: variant !== 'mystery', // DESABILITADO para mystery cards - só revelação manual
    onReveal: handleViewportReveal,
    threshold: 0.3, // Threshold otimizado para melhor UX
    debounceMs: 300, // Debounce para evitar múltiplas chamadas
    projectId: project?.id // Para debugging e tracking
  });

  return {
    revealed,
    langConfig,
    handleClick,
    ProjectIcon: langConfig.icon,
    viewportRef,
  };
};
