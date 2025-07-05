// src/hooks/useResponsiveSidebar.ts
import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

export const useResponsiveSidebar = () => {
  const { setSidebarMode, collapsed, collapseSidebar, expandSidebar } = useUIStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Mobile: sempre overlay e manter fechada
      if (width < 768) {
        setSidebarMode('overlay');
        return;
      }
      
      // Desktop: determinar modo baseado no espaço disponível
      // Para sidebar aberta (320px) + conteúdo mínimo (600px) = 920px total necessário
      // Para sidebar minimizada (64px) + conteúdo mínimo (600px) = 664px total necessário
      
      const sidebarWidth = collapsed ? 64 : 320;
      const minContentWidth = 600;
      const requiredWidth = sidebarWidth + minContentWidth;
      
      if (width >= requiredWidth) {
        // Espaço suficiente para modo push
        setSidebarMode('push');
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
  }, [setSidebarMode, collapsed, collapseSidebar, expandSidebar]);

  return { collapsed };
};
