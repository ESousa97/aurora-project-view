
// src/components/layout/Sidebar.tsx - Sidebar minimalista e moderna
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryColor } from '@/lib/languageColors';
import { SiRocket, SiCompass, SiBarChart } from '@/lib/languageColors/icons';
import { FolderOpen, Hash } from 'lucide-react';

const navItems = [
  { name: 'Início', href: '/', icon: SiRocket, gradient: 'gradient-primary' },
  { name: 'Projetos', href: '/projects', icon: SiCompass, gradient: 'gradient-secondary' },
  { name: 'Dashboard', href: '/dashboard', icon: SiBarChart, gradient: 'gradient-accent' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, selectedCategory, setSelectedCategory } = useUIStore();
  const { data: categories = [], isLoading } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  const onNavClick = (href: string) => {
    navigate(href);
    setSelectedCategory('');
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          className="fixed inset-y-0 left-0 z-40 w-80 surface-primary border-r border-divider flex flex-col"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          <ScrollArea className="flex-1 p-6">
            {/* Logo section */}
            <div className="mb-8">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                  <SiRocket className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Portfolio</span>
              </Link>
            </div>

            {/* Navigation principal */}
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
                          ? `${item.gradient} text-white shadow-md hover-lift`
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

            {/* Categorias */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Categorias
                </h3>
                <Badge variant="outline" className="text-xs">
                  {categories.length}
                </Badge>
              </div>

              {/* Todos os projetos */}
              <Button
                variant={selectedCategory === '' ? 'secondary' : 'ghost'}
                className="w-full justify-between h-10 mb-3 font-medium"
                onClick={() => onNavClick('/projects')}
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-4 w-4 flex-shrink-0" />
                  <span>Todos</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {categories.reduce((sum, c) => sum + c.count, 0)}
                </Badge>
              </Button>

              {/* Lista de categorias */}
              <div className="space-y-1">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-10 skeleton rounded-lg" />
                    ))
                  : categories.slice(0, 12).map((cat, i) => {
                      const active = selectedCategory === cat.name;
                      const { color, icon: Icon } = getCategoryColor(cat.name);
                      return (
                        <motion.div
                          key={cat.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Button
                            variant={active ? 'secondary' : 'ghost'}
                            className={cn(
                              'w-full justify-between h-10 font-medium',
                              active 
                                ? 'bg-surface-hover border-divider-strong'
                                : 'hover:bg-surface-hover'
                            )}
                            onClick={() => {
                              setSelectedCategory(cat.name);
                              navigate('/projects');
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-sm flex items-center justify-center"
                                style={{ backgroundColor: `${color}20` }}
                              >
                                <Hash className="h-3 w-3" style={{ color }} />
                              </div>
                              <span className="truncate text-sm">{cat.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {cat.count}
                            </Badge>
                          </Button>
                        </motion.div>
                      );
                    })}

                {categories.length > 12 && (
                  <Button
                    variant="ghost"
                    className="w-full justify-center h-10 text-sm text-muted-foreground mt-2"
                    onClick={() => navigate('/projects')}
                  >
                    Ver mais categorias...
                  </Button>
                )}
              </div>
            </div>
          </ScrollArea>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
