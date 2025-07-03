// src/hooks/useResponsiveSidebar.ts
import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

export const useResponsiveSidebar = () => {
  const { setSidebarMode, sidebarState, setSidebarState } = useUIStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Mobile: sempre overlay e esconder sidebar por padrão
      if (width < 768) {
        setSidebarMode('overlay');
        // Em mobile, esconder a sidebar se estiver aberta
        if (sidebarState === 'open') {
          setSidebarState('hidden');
        }
        return;
      }
      
      // Desktop: determinar modo baseado no espaço disponível
      // Para sidebar aberta (320px) + conteúdo mínimo (600px) = 920px total necessário
      // Para sidebar minimizada (64px) + conteúdo mínimo (600px) = 664px total necessário
      
      const sidebarWidth = sidebarState === 'minimized' ? 64 : 320;
      const minContentWidth = 600;
      const requiredWidth = sidebarWidth + minContentWidth;
      
      if (width >= requiredWidth) {
        // Espaço suficiente para modo push
        setSidebarMode('push');
        // Se estava hidden, mostrar novamente
        if (sidebarState === 'hidden') {
          setSidebarState('open');
        }
      } else {
        // Não há espaço suficiente, usar overlay
        setSidebarMode('overlay');
      }
    };

    // Executar na inicialização
    handleResize();
    
    // Escutar mudanças de tamanho
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarMode, sidebarState, setSidebarState]);

  return { sidebarState };
};
