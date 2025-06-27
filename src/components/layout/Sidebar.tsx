// src/components/layout/Sidebar.tsx - Sidebar com background corrigido
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUIStore } from '@/stores/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarCategories } from './sidebar/SidebarCategories';

export const Sidebar: React.FC = () => {
  const { sidebarOpen } = useUIStore();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          className="fixed inset-y-0 left-0 z-40 w-80 flex flex-col"
          style={{
            // Force clean background - inherit from CSS variables
            backgroundColor: 'hsl(var(--sidebar-background))',
            borderRight: '1px solid hsl(var(--sidebar-border))',
            color: 'hsl(var(--sidebar-foreground))'
          }}
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          <ScrollArea className="flex-1 p-6">
            <SidebarLogo />
            <SidebarNavigation />
            <SidebarCategories />
          </ScrollArea>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
