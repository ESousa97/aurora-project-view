// src/components/layout/AppLayout.tsx
import React, { useEffect } from 'react';
import { Header } from './Header';
import { ModernSidebar } from './Sidebar/ModernSidebar';
import { useUIStore, useSidebar, useResponsiveSidebar } from '@/stores/uiStore';
import { keepAliveService } from '@/services/api';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { theme, setTheme } = useUIStore();
  const {
    isHidden,
    isOpen,
    isMinimized,
    isOverlayMode,
  } = useSidebar();
  
  // Ajusta automaticamente a sidebar conforme o tamanho da tela
  useResponsiveSidebar();

  // Sincroniza tema na montagem
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Mantém o keep-alive ativo enquanto o layout existir
  useEffect(() => {
    const cleanup = keepAliveService.start();
    return cleanup;
  }, []);

  // Calcula largura da sidebar conforme estado
  const sidebarWidth = () => {
    if (isOverlayMode || isHidden) return 0;
    if (isMinimized) return 64;   // 4rem
    if (isOpen)      return 320;  // 20rem
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/50 dark:from-gray-950 dark:via-blue-900/10 dark:to-purple-900/60">
      {/* Fundo decorativo */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse"
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-blue-500/15 dark:from-emerald-500/25 dark:to-blue-600/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '4s' }}
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-950/50" />
      </div>

      {/* Header */}
      <Header />

      {/* Corpo principal */}
      <div className="relative">
        {/* Renderiza a Sidebar somente se não estiver oculta */}
        {!isHidden && <ModernSidebar />}

        {/* Área de conteúdo deslocada conforme a largura da sidebar */}
        <main
          className={cn(
            'min-h-screen pt-16 transition-all duration-300 ease-in-out',
            'relative z-10'
          )}
          style={{ marginLeft: `${sidebarWidth()}px` }}
        >
          <div className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
