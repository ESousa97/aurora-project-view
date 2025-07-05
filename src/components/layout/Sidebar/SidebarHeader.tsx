// src/components/layout/Sidebar/SidebarHeader.tsx - Atualizado para usar novos hooks
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaBrain } from '@/lib/languageColors/icons';
import { ChevronLeft, X } from 'lucide-react';
import { useSidebar } from '@/stores/uiStore';

interface SidebarHeaderProps {
  onClose?: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
  const { sidebarMode, collapse, hideOverlay } = useSidebar();

  const handleMinimize = () => {
    if (sidebarMode === 'overlay') {
      // Em modo overlay, fechar completamente
      hideOverlay();
      onClose?.();
    } else {
      // Em modo push, minimizar
      collapse();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <Link to="/" className="flex items-center space-x-2">
        <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center">
          <FaBrain className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-primary">ProjPortfólio</span>
      </Link>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleMinimize}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        title={sidebarMode === 'overlay' ? 'Fechar menu' : 'Minimizar sidebar'}
      >
        {sidebarMode === 'overlay' ? (
          <X className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
