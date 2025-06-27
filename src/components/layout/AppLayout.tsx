// src/components/layout/AppLayout.tsx - Layout minimalista otimizado
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

  // Initialize theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Initialize keep-alive service
  useEffect(() => {
    const cleanup = keepAliveService.start();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      
      {/* Overlay minimalista para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300 ease-out",
        sidebarOpen ? "lg:ml-80" : "ml-0"
      )}>
        <Header />
        <main className="flex-1 overflow-auto bg-background">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
