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

  console.log('🎯 Mystery Card Click:', {
    projectId: project.id,
    title: project.titulo,
    variant,
    revealed,
    isDiscovered
  });

  // SEMPRE marcar como revelado no localStorage
  revealProject(project.id);

  if (variant === 'mystery' && !revealed) {
    // Apenas revela e salva
    setRevealed(true);
    toast.success(`🔓 Desbloqueado: ${project.titulo}!`, { 
      description: `Tecnologia: ${langConfig.displayName}`,
      duration: 3000 
    });
    onDiscover?.(project.id);
    console.log('🔍 Mystery project revealed via click:', project.id, project.titulo);

    // ⚠️ REMOVEMOS O NAVIGATE AQUI!
    return;
  }

  // Para cards já revelados ou outros variants, navegar
  navigate(`/projects/${project.id}`);
}, [project, revealed, navigate, onDiscover, revealProject, variant, langConfig.displayName, isDiscovered]);

  // Auto-reveal no viewport para TODOS os cards exceto mystery (sincronização entre seções)
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
      
      // Para mystery cards, NÃO auto-revelar no viewport - só por clique manual
      if (variant === 'mystery') {
        console.log('🔒 Mystery card in viewport but not auto-revealing:', project.id, project.titulo);
        return;
      }
    }
  }, [project, revealProject, variant]);

  const viewportRef = useViewportReveal({
    enabled: variant !== 'mystery', // DESABILITADO para mystery cards - só revelação manual por clique
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
