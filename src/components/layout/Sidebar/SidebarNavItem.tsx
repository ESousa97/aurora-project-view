// src/components/layout/Sidebar/SidebarNavItem.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavItem } from './types';

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  index: number;
  onClick: (href: string) => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isActive,
  index,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
          'w-full justify-start space-x-3 py-3',
          isActive
            ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
            : 'text-muted-foreground hover:bg-muted/10'
        )}
        onClick={() => onClick(item.href)}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <span className="flex-1 text-left font-medium truncate">
          {item.name}
        </span>
      </Button>
    </motion.div>
  );
};
