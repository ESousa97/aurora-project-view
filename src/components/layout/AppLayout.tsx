// src/components/layout/AppLayout.tsx - Background e Sidebar corrigidos
import React, { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/stores/uiStore';
import { keepAliveService } from '@/services/api';
import { cn } from '@/lib/utils';
import { useSidebarFix } from '@/hooks/useSidebarFix';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { sidebarOpen, theme, setTheme, setSidebarOpen } = useUIStore();
  
  // Hooks para corrigir cores
  const { checkAndFixSidebar } = useSidebarFix();

  // Initialize theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Initialize keep-alive service
  useEffect(() => {
    const cleanup = keepAliveService.start();
    return cleanup;
  }, []);

  // Force clean background on mount
  useEffect(() => {
    // Remove any potential yellow/orange background classes
    document.body.classList.remove('bg-yellow-50', 'bg-orange-50', 'bg-amber-50');
    document.body.classList.remove('bg-yellow-100', 'bg-orange-100', 'bg-amber-100');
    
    // Force correct background based on theme
    if (document.documentElement.classList.contains('dark')) {
      document.body.style.backgroundColor = 'rgb(4, 13, 32)'; // Azul escuro
    } else {
      document.body.style.backgroundColor = 'rgb(248, 250, 252)'; // Cinza claro
    }
    
    // Also fix sidebar if open
    if (sidebarOpen) {
      setTimeout(() => checkAndFixSidebar(), 200);
    }
  }, [theme, sidebarOpen, checkAndFixSidebar]);

  return (
    <div className="min-h-screen flex w-full" style={{ background: 'inherit' }}>
      <Sidebar />
      
      {/* Overlay para mobile - SEM gradientes amarelos */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 backdrop-blur-sm lg:hidden"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.2)' // Preto transparente
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300 ease-out",
        sidebarOpen ? "lg:ml-80" : "ml-0"
      )}>
        <Header />
        
        {/* Main content - background limpo */}
        <main 
          className="flex-1 overflow-auto"
          style={{ 
            background: 'inherit' // Herda do body
          }}
        >
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
