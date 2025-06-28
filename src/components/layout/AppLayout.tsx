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

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { sidebarOpen, theme, setTheme, setSidebarOpen } = useUIStore();

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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/50 dark:from-gray-950 dark:via-blue-950/40 dark:to-purple-950/60">
      {/* Fundo decorativo animado */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-blue-500/15 dark:from-emerald-500/25 dark:to-blue-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Overlay sutil para unificar */}
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-950/50" />
      </div>

      {/* Header fixo */}
      <Header />

      {/* Overlay acrílico - só aparece quando sidebar está aberta */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-all duration-300 ease-in-out"
          style={{ top: '64px' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar como overlay */}
      <Sidebar />

      {/* Conteúdo principal - sempre ocupa toda a largura */}
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};
