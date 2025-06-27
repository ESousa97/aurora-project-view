
// src/components/layout/Header.tsx - Header minimalista e moderno
import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/uiStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain } from '@/lib/languageColors/icons';

export const Header = () => {
  const { theme, toggleSidebar, setTheme } = useUIStore();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 w-full nav-modern">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Left section */}
        <div className="flex items-center gap-6">
          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover-scale"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo minimalista */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="h-10 w-10 rounded-xl gradient-primary shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                <FaBrain className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="hidden sm:block">
              <span className="font-bold text-xl gradient-text">
                Portfolio
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right section - Minimalista */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme} 
            className="relative group hover-scale"
          >
            <div className="relative w-5 h-5">
              <Sun className={`h-5 w-5 absolute transition-all duration-300 ${
                theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
              }`} />
              <Moon className={`h-5 w-5 absolute transition-all duration-300 ${
                theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
              }`} />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};
