// src/components/layout/Sidebar.tsx
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
import { SiRocket, SiCompass, SiBarChart, SiGlobe } from '@/lib/languageColors/icons';
import { FolderOpen, X } from 'lucide-react';

const navItems = [
  { name: 'Base de Operações', href: '/', icon: SiRocket, gradient: 'from-blue-600 to-purple-600' },
  { name: 'Explorar Territórios', href: '/projects', icon: SiCompass, gradient: 'from-emerald-600 to-blue-600' },
  { name: 'Centro de Comando', href: '/dashboard', icon: SiBarChart, gradient: 'from-purple-600 to-pink-600' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, selectedCategory, setSelectedCategory, setSidebarOpen } = useUIStore();
  const { data: categories = [], isLoading } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  const onNavClick = (href: string) => {
    navigate(href);
    setSelectedCategory('');
    setSidebarOpen(false); // Fecha sidebar ao navegar
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          className="fixed top-16 left-0 z-50 w-80 h-[calc(100vh-4rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="flex flex-col h-full">
            {/* Header da sidebar com botão de fechar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setSidebarOpen(false)}>
                <SiRocket className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-primary">Aurora</span>
              </Link>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              {/* Navigation */}
              <nav className="space-y-1 p-4">
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
                          'w-full justify-start space-x-3 py-3',
                          active
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
                            : 'text-muted-foreground hover:bg-muted/10'
                        )}
                        onClick={() => onNavClick(item.href)}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="flex-1 text-left font-medium truncate">
                          {item.name}
                        </span>
                      </Button>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="p-4">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center space-x-1">
                  <SiGlobe className="h-4 w-4" />
                  <span>Territórios</span>
                  <Badge variant="outline" className="ml-auto">{categories.length}</Badge>
                </h3>

                <Button
                  variant={selectedCategory === '' ? 'secondary' : 'ghost'}
                  className="w-full justify-start space-x-3 py-2 mb-3"
                  onClick={() => onNavClick('/projects')}
                >
                  <FolderOpen className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Todos</span>
                  <Badge variant="outline">{categories.reduce((sum, c) => sum + c.count, 0)}</Badge>
                </Button>

                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-10 bg-muted/20 rounded animate-pulse mb-2" />
                    ))
                  : categories.slice(0, 12).map((cat, i) => {
                      const active = selectedCategory === cat.name;
                      const { gradient, icon: Icon } = getCategoryColor(cat.name);
                      return (
                        <motion.div
                          key={cat.name}
                          className="mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Button
                            variant={active ? 'default' : 'ghost'}
                            className={cn(
                              'w-full justify-between space-x-3 py-2 relative overflow-hidden',
                              active
                                ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                                : 'text-muted-foreground hover:bg-muted/10'
                            )}
                            onClick={() => {
                              setSelectedCategory(cat.name);
                              navigate('/projects');
                              setSidebarOpen(false); // Fecha sidebar ao selecionar categoria
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-surface">
                                <Icon className="h-4 w-4" style={{ color: active ? '#fff' : gradient.split(' ')[0] }} />
                              </span>
                              <span className="flex-1 truncate font-medium">{cat.name}</span>
                            </div>
                            <Badge variant="outline" className="flex-shrink-0">{cat.count}</Badge>
                          </Button>
                        </motion.div>
                      );
                    })}

                {categories.length > 12 && (
                  <Button
                    variant="ghost"
                    className="w-full justify-center py-2 mt-2"
                    onClick={() => {
                      navigate('/projects');
                      setSidebarOpen(false);
                    }}
                  >
                    Ver mais...
                  </Button>
                )}
              </div>
            </ScrollArea>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
