// src/hooks/useResponsiveSidebar.ts
import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

export const useResponsiveSidebar = () => {
  const { setSidebarMode, sidebarState } = useUIStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const contentWidth = document.querySelector('main')?.offsetWidth || 0;
      const availableSpace = width - 320; // 320px = sidebar width
      
      // Mobile: sempre overlay
      if (width < 768) {
        setSidebarMode('overlay');
        return;
      }
      
      // Desktop: push se há espaço, overlay se não há
      if (availableSpace >= 800) { // Mínimo de 800px para o conteúdo
        setSidebarMode('push');
      } else {
        setSidebarMode('overlay');
      }
    };

    // Executar na inicialização
    handleResize();
    
    // Escutar mudanças de tamanho
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarMode, sidebarState]);

  return { sidebarState };
};
