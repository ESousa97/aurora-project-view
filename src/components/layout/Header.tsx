
// src/components/layout/Header.tsx
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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Menu hambúrguer */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </Button>
          
          {/* Logo e brand */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                <FaBrain className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  ProjPortfólio
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right section - Theme toggle */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme} 
            className="relative group p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="relative w-5 h-5">
              <Sun className={`h-5 w-5 absolute transition-all duration-300 text-gray-700 dark:text-gray-300 ${
                theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
              }`} />
              <Moon className={`h-5 w-5 absolute transition-all duration-300 text-gray-700 dark:text-gray-300 ${
                theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
              }`} />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};
