import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { useResponsiveSidebar } from '@/hooks/useResponsiveSidebar';
import { SidebarHeader } from './Sidebar/SidebarHeader';
import { SidebarNavigation } from './Sidebar/SidebarNavigation';
import { SidebarCategories } from './Sidebar/SidebarCategories';
import { SidebarMinimized } from './Sidebar/SidebarMinimized';

export const Sidebar: React.FC = () => {
  const { sidebarState, sidebarMode, setSelectedCategory, hideSidebar } = useUIStore();
  const { data: categories = [], isLoading } = useCategories();
  const navigate = useNavigate();
  
  // Hook para gerenciar responsividade
  useResponsiveSidebar();

  const handleNavClick = (href: string) => {
    navigate(href);
    setSelectedCategory('');
    
    // Em mobile/overlay, fechar ao navegar
    if (sidebarMode === 'overlay') {
      hideSidebar();
    }
  };

  const handleClose = () => {
    hideSidebar();
  };

  // Renderizar sidebar minimizada
  if (sidebarState === 'minimized' && sidebarMode === 'push') {
    return <SidebarMinimized />;
  }

  // Não renderizar se estiver hidden
  if (sidebarState === 'hidden') {
    return null;
  }

  const isOverlay = sidebarMode === 'overlay';

  return (
    <AnimatePresence>
      <motion.aside
        className={`
          fixed top-16 left-0 z-50 w-80 h-[calc(100vh-4rem)] 
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl 
          border-r border-gray-200/50 dark:border-gray-700/50
          ${isOverlay ? '' : 'relative'}
        `}
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Overlay background para mobile */}
        {isOverlay && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}

        <div className="relative z-50 flex flex-col h-full bg-white dark:bg-gray-900">
          <SidebarHeader onClose={handleClose} />
          
          <ScrollArea className="flex-1">
            <SidebarNavigation onNavClick={handleNavClick} />
            <SidebarCategories 
              categories={categories}
              isLoading={isLoading}
              onClose={handleClose}
            />
          </ScrollArea>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};