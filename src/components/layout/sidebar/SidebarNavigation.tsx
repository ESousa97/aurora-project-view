// src/components/layout/sidebar/SidebarNavigation.tsx - Cores seguras
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { SiRocket, SiCompass, SiBarChart } from '@/lib/languageColors/icons';
import { useUIStore } from '@/stores/uiStore';

// GRADIENTES SEGUROS - SEM AMARELO/LARANJA
const navItems = [
  { 
    name: 'Início', 
    href: '/', 
    icon: SiRocket, 
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', // blue-500 to violet-500
    shadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
  },
  { 
    name: 'Projetos', 
    href: '/projects', 
    icon: SiCompass, 
    gradient: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)', // emerald-500 to blue-500
    shadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
  },
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: SiBarChart, 
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', // violet-500 to pink-500
    shadow: '0 4px 16px rgba(139, 92, 246, 0.3)'
  },
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
                'w-full justify-start gap-3 h-11 font-medium transition-all duration-200 border-0',
                active
                  ? 'text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
              style={active ? {
                background: item.gradient,
                boxShadow: item.shadow
              } : {}}
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
