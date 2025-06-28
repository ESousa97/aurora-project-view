// src/components/layout/Sidebar/SidebarMinimized.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, FolderOpen } from 'lucide-react';
import { SiRocket } from '@/lib/languageColors/icons';
import { navItems } from './constants';
import { getCategoryColor } from '@/lib/languageColors';

export const SidebarMinimized: React.FC = () => {
  const { expandSidebar, selectedCategory, setSelectedCategory } = useUIStore();
  const { data: categories = [] } = useCategories();
  const location = useLocation();

  return (
    <motion.aside
      className="fixed top-16 left-0 z-40 w-16 h-[calc(100vh-4rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-r border-gray-200/50 dark:border-gray-700/50"
      initial={{ x: -64 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="flex flex-col h-full p-2 space-y-2">
        {/* Logo */}
        <Link to="/" className="flex justify-center p-2">
          <SiRocket className="h-6 w-6 text-primary" />
        </Link>

        {/* Expand button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={expandSidebar}
          className="w-full h-10 p-0 hover:bg-muted/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-2">
          {/* Navigation items */}
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full h-10 p-0 mb-1 ${
                    active ? 'bg-primary/10 text-primary' : 'hover:bg-muted/20'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            );
          })}

          {/* All projects */}
          <Button
            variant="ghost"
            size="sm"
            className={`w-full h-10 p-0 mb-1 ${
              selectedCategory === '' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/20'
            }`}
            onClick={() => setSelectedCategory('')}
          >
            <FolderOpen className="h-5 w-5" />
          </Button>

          {/* Categories (first 8) */}
          {categories.slice(0, 8).map((category) => {
            const active = selectedCategory === category.name;
            const { icon: Icon } = getCategoryColor(category.name);
            
            return (
              <Button
                key={category.name}
                variant="ghost"
                size="sm"
                className={`w-full h-10 p-0 mb-1 ${
                  active ? 'bg-primary/10 text-primary' : 'hover:bg-muted/20'
                }`}
                onClick={() => setSelectedCategory(category.name)}
                title={category.name}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};
