// src/components/layout/AppLayout.tsx
import React, { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/stores/uiStore';
import { keepAliveService } from '@/services/api';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout usando CSS Grid e fundo full-bleed com gradients dinâmicos.
 * Sidebar e Header com fundo translúcido + blur para aproveitar o background.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { sidebarOpen, theme, setTheme } = useUIStore();

  // Sincroniza tema na montagem
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Keep-alive
  useEffect(() => {
    const cleanup = keepAliveService.start();
    return cleanup;
  }, []);

  return (
    <div
      className={cn(
        'relative min-h-screen grid transition-all duration-200 ease-in-out',
        'grid-cols-[auto_1fr] grid-rows-[auto_1fr]'
      )}
    >
      {/* Fundo full-bleed com gradients dinâmicos */}
      <div className="absolute inset-0 -z-10">
        {/* Background base */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/50 dark:from-gray-950 dark:via-blue-950/40 dark:to-purple-950/60" />
        
        {/* Elementos decorativos animados */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-blue-500/15 dark:from-emerald-500/25 dark:to-blue-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-400/15 to-cyan-500/15 dark:from-indigo-500/25 dark:to-cyan-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }} />
        
        {/* Overlay sutil para unificar */}
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-950/50" />
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'row-span-2 transition-transform ease-in-out duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // fundo translúcido e blur mais suave
          'fixed z-30 top-0 left-0 h-full w-80',
          'bg-white/70 dark:bg-black/70 backdrop-blur-xl',
          'shadow-2xl lg:shadow-none border-r border-white/20 dark:border-gray-800/50'
        )}
      >
        <Sidebar />
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 dark:bg-white/10 backdrop-blur-sm lg:hidden"
          onClick={() => useUIStore.getState().setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header
        className={cn(
          'col-span-2 row-start-1 z-10 flex items-center',
          // fundo translúcido e blur mais suave
          'bg-white/70 dark:bg-black/70 backdrop-blur-xl',
          'shadow-lg border-b border-white/20 dark:border-gray-800/50'
        )}
      >
        <Header />
      </header>

      {/* Conteúdo principal */}
      {/* Conteúdo principal full-bleed */}
      <main className="col-start-2 row-start-2 overflow-auto w-full h-full p-6">
        {children}
      </main>
    </div>
  );
};
