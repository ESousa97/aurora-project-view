import React, { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { Navigate } from 'react-router-dom';
import { keepAliveService } from '@/services/api';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { sidebarOpen, theme, setTheme } = useUIStore();
  const { isAuthenticated } = useAuthStore();

  // Initialize theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Initialize keep-alive service
  useEffect(() => {
    const cleanup = keepAliveService.start();
    return cleanup;
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => useUIStore.getState().setSidebarOpen(false)}
        />
      )}
      
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-200 ease-in-out",
        "lg:ml-72"
      )}>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
