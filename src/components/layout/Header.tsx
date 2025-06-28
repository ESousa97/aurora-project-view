// src/components/layout/Header.tsx
import React from 'react';
import { Menu, Sun, Moon, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore, useSidebar } from '@/stores/uiStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain } from '@/lib/languageColors/icons';

export const Header = () => {
  const { theme, setTheme } = useUIStore();
  const { 
    sidebarState, 
    sidebarMode, 
    isOpen, 
    isMinimized, 
    isHidden, 
    isOverlayMode,
    toggle, 
    expand, 
    hide 
  } = useSidebar();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Lógica inteligente para o botão da sidebar
  const handleSidebarToggle = () => {
    if (isHidden) {
      // Se estiver escondida, expandir
      expand();
    } else if (isOverlayMode) {
      // Em modo overlay, sempre esconder ao clicar
      hide();
    } else {
      // Em modo push, alternar entre open/minimized
      toggle();
    }
  };

  // Ícone dinâmico baseado no estado
  const getSidebarIcon = () => {
    if (isHidden) {
      return <Menu className="h-5 w-5" />;
    }
    
    if (isOverlayMode) {
      return <ChevronLeft className="h-5 w-5" />;
    }
    
    if (isMinimized) {
      return <ChevronRight className="h-5 w-5" />;
    }
    
    return <ChevronLeft className="h-5 w-5" />;
  };

  // Tooltip dinâmico
  const getSidebarTooltip = () => {
    if (isHidden) return 'Abrir menu';
    if (isOverlayMode) return 'Fechar menu';
    if (isMinimized) return 'Expandir sidebar';
    return 'Minimizar sidebar';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Menu button - agora inteligente */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSidebarToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            title={getSidebarTooltip()}
          >
            <motion.div
              key={`${sidebarState}-${sidebarMode}`} // Key para re-animar quando mudar
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-gray-700 dark:text-gray-300"
            >
              {getSidebarIcon()}
            </motion.div>
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
                
                {/* Indicador do modo da sidebar (debug - remover em produção) */}
                {process.env.NODE_ENV === 'development' && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                    {sidebarMode} • {sidebarState}
                  </span>
                )}
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
            title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
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
