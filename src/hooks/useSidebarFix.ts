// src/hooks/useSidebarFix.ts - Hook para corrigir cores da sidebar
import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

export const useSidebarFix = () => {
  const { theme, sidebarOpen } = useUIStore();

  useEffect(() => {
    if (!sidebarOpen) return;

    const applyCorrectSidebarColors = () => {
      const sidebarElement = document.querySelector('aside');
      if (!sidebarElement) return;

      const isDark = document.documentElement.classList.contains('dark');
      
      // Cores corretas para sidebar
      const sidebarBg = isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)';
      const sidebarColor = isDark ? 'rgb(248, 250, 252)' : 'rgb(30, 41, 59)';
      const sidebarBorder = isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)';

      // Força cores corretas
      sidebarElement.style.setProperty('background-color', sidebarBg, 'important');
      sidebarElement.style.setProperty('color', sidebarColor, 'important');
      sidebarElement.style.setProperty('border-right', `1px solid ${sidebarBorder}`, 'important');

      // Corrige categorias com cores problemáticas
      const categoryButtons = sidebarElement.querySelectorAll('button');
      categoryButtons.forEach((button) => {
        // Procura por elementos com cores inline problemáticas
        const coloredElements = button.querySelectorAll('[style*="color"], [style*="background"]');
        
        coloredElements.forEach((element) => {
          const currentStyle = element.getAttribute('style') || '';
          
          // Lista de cores problemáticas para substituir
          const problematicColors = [
            '#F7DF1E', // JavaScript yellow
            '#FFCA28', // Firebase yellow
            '#FFC107', // Amber
            '#FF9800', // Orange
            '#FFB300', // Yellow
            'rgb(247, 223, 30)', // JavaScript RGB
            'rgb(255, 202, 40)', // Firebase RGB
          ];
          
          // Cores de substituição seguras
          const safeColors = [
            '#3B82F6', // blue-500
            '#10B981', // emerald-500
            '#8B5CF6', // violet-500
            '#06B6D4', // cyan-500
            '#F59E0B', // amber-500 (suave)
            '#EF4444', // red-500
          ];
          
          let newStyle = currentStyle;
          let colorChanged = false;
          
          problematicColors.forEach((problemColor, index) => {
            if (currentStyle.includes(problemColor)) {
              const safeColor = safeColors[index % safeColors.length];
              newStyle = newStyle.replace(new RegExp(problemColor, 'g'), safeColor);
              colorChanged = true;
            }
          });
          
          if (colorChanged) {
            element.setAttribute('style', newStyle);
            console.log('🎨 Cor corrigida na sidebar:', {
              elemento: element.tagName,
              antes: currentStyle,
              depois: newStyle
            });
          }
        });
      });
    };

    // Aplica imediatamente
    applyCorrectSidebarColors();

    // Observa mudanças na sidebar
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          // Pequeno delay para permitir que React termine as atualizações
          setTimeout(applyCorrectSidebarColors, 100);
        }
      });
    });

    const sidebarElement = document.querySelector('aside');
    if (sidebarElement) {
      observer.observe(sidebarElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [theme, sidebarOpen]);

  // Função para verificar e corrigir manualmente
  const checkAndFixSidebar = () => {
    const sidebarElement = document.querySelector('aside');
    if (!sidebarElement) return false;

    const currentBg = window.getComputedStyle(sidebarElement).backgroundColor;
    const isDark = document.documentElement.classList.contains('dark');
    const expectedBg = isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)';

    if (currentBg !== expectedBg) {
      console.warn('🔧 Sidebar com background incorreto, corrigindo...', {
        atual: currentBg,
        esperado: expectedBg
      });
      
      sidebarElement.style.setProperty('background-color', expectedBg, 'important');
      return true;
    }

    return false;
  };

  return { checkAndFixSidebar };
};
