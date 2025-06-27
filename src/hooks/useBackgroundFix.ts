// src/hooks/useBackgroundFix.ts - Hook para corrigir background e sidebar
import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

export const useBackgroundFix = () => {
  const { theme } = useUIStore();

  useEffect(() => {
    const applyCorrectBackground = () => {
      // Remove qualquer classe de background amarela/laranja
      const yellowOrangeClasses = [
        'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200',
        'bg-orange-50', 'bg-orange-100', 'bg-orange-200',
        'bg-amber-50', 'bg-amber-100', 'bg-amber-200'
      ];
      
      yellowOrangeClasses.forEach(className => {
        document.body.classList.remove(className);
        document.documentElement.classList.remove(className);
      });

      // Força o background correto
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        // Modo escuro: azul escuro
        document.body.style.setProperty('background-color', 'rgb(4, 13, 32)', 'important');
        document.body.style.setProperty('color', 'rgb(248, 250, 252)', 'important');
      } else {
        // Modo claro: cinza claro
        document.body.style.setProperty('background-color', 'rgb(248, 250, 252)', 'important');
        document.body.style.setProperty('color', 'rgb(30, 41, 59)', 'important');
      }

      // Força o #root também
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.backgroundColor = 'inherit';
        rootElement.style.minHeight = '100vh';
      }
    };

    // Aplica imediatamente
    applyCorrectBackground();

    // Observa mudanças no tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          applyCorrectBackground();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [theme]);

  // Função para verificar e corrigir background manualmente
  const checkAndFixBackground = () => {
    const currentBg = window.getComputedStyle(document.body).backgroundColor;
    
    // Verifica se tem cor amarela/laranja
    const isYellowish = currentBg.includes('255, 255, 0') || // yellow
                       currentBg.includes('255, 165, 0') || // orange  
                       currentBg.includes('255, 193, 7') || // amber
                       currentBg.includes('252, 211, 77'); // yellow-300
    
    if (isYellowish) {
      console.warn('🟡 Background amarelo/laranja detectado! Corrigindo...');
      
      const isDark = document.documentElement.classList.contains('dark');
      document.body.style.setProperty(
        'background-color', 
        isDark ? 'rgb(4, 13, 32)' : 'rgb(248, 250, 252)', 
        'important'
      );
    }
    
    // Também verifica a sidebar se estiver aberta
    const sidebarElement = document.querySelector('aside');
    if (sidebarElement) {
      const sidebarBg = window.getComputedStyle(sidebarElement).backgroundColor;
      const isDark = document.documentElement.classList.contains('dark');
      const expectedSidebarBg = isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)';
      
      if (sidebarBg !== expectedSidebarBg) {
        console.warn('🔧 Sidebar com background incorreto, corrigindo...');
        sidebarElement.style.setProperty('background-color', expectedSidebarBg, 'important');
      }
    }
  };

  return { checkAndFixBackground };
};
