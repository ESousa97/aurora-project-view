// src/components/layout/Sidebar/SidebarNavigation.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarNavItem } from './SidebarNavItem';
import { navItems } from './constants';

interface SidebarNavigationProps {
  onNavClick: (href: string) => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ onNavClick }) => {
  const location = useLocation();

  return (
    <nav className="space-y-1 p-4">
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.href;
        return (
          <SidebarNavItem
            key={item.name}
            item={item}
            isActive={isActive}
            index={idx}
            onClick={onNavClick}
          />
        );
      })}
    </nav>
  );
};
