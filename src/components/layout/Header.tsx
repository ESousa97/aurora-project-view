import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/uiStore';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const { theme, toggleSidebar, setTheme } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PP</span>
            </div>
            <span className="hidden font-bold text-lg sm:inline-block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ProjPortfólio
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Discovery Badge - só aparece na home */}
          {location.pathname === '/' && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Modo Descoberta</span>
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-xl">
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
