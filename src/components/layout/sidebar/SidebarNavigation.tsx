
// src/components/layout/sidebar/SidebarNavigation.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { SiRocket, SiCompass, SiBarChart } from '@/lib/languageColors/icons';
import { useUIStore } from '@/stores/uiStore';

const navItems = [
  { name: 'Início', href: '/', icon: SiRocket, gradient: 'from-blue-600 to-purple-600' },
  { name: 'Projetos', href: '/projects', icon: SiCompass, gradient: 'from-emerald-600 to-blue-600' },
  { name: 'Dashboard', href: '/dashboard', icon: SiBarChart, gradient: 'from-purple-600 to-pink-600' },
];

export const SidebarNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedCategory } = useUIStore();

  const onNavClick = (href: string) => {
    navigate(href);
    setSelectedCategory('');
  };

  return (
    <nav className="space-y-2 mb-8">
      <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3 tracking-wider">
        Navegação
      </h3>
      {navItems.map((item, idx) => {
        const active = location.pathname === item.href;
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Button
              variant={active ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3 h-11 font-medium',
                active
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
              )}
              onClick={() => onNavClick(item.href)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Button>
          </motion.div>
        );
      })}
    </nav>
  );
};
