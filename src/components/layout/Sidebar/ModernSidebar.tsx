// src/components/layout/Sidebar/ModernSidebar.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/lib/languageColors';
import { 
  Home, 
  FolderOpen, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Grid3X3,
  Search,
  BarChart3
} from 'lucide-react';

const mainNavItems = [
  { 
    icon: Home, 
    label: 'Início', 
    href: '/',
    description: 'Página inicial'
  },
  { 
    icon: Grid3X3, 
    label: 'Projetos', 
    href: '/projects',
    description: 'Todos os projetos'
  },
  { 
    icon: Search, 
    label: 'Buscar', 
    href: '/search',
    description: 'Buscar projetos'
  },
  { 
    icon: BarChart3, 
    label: 'Dashboard', 
    href: '/dashboard',
    description: 'Estatísticas'
  },
  { 
    icon: Settings, 
    label: 'Configurações', 
    href: '/settings',
    description: 'Configurações'
  }
];

interface ModernSidebarProps {
  className?: string;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ className }) => {
  const { 
    collapsed, 
    toggleSidebar, 
    selectedCategory, 
    setSelectedCategory 
  } = useUIStore();
  
  const { data: categories = [] } = useCategories();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? '' : categoryName);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: collapsed ? 80 : 280,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] z-40",
        "bg-card/95 backdrop-blur-xl border-r border-border/50",
        "overflow-hidden shadow-lg",
        className
      )}
    >
      {/* Header com toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <AnimatePresence>
          {!collapsed && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Navegação
            </motion.h2>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {/* Navegação principal */}
      <div className="px-3 py-4">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
                Principal
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg transition-all duration-200",
                  "hover:bg-muted/50 focus:bg-muted/50 focus:outline-none",
                  collapsed ? "p-3 justify-center" : "p-3",
                  active && "bg-primary/10 text-primary border border-primary/20"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )} />
                
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 flex-1 min-w-0"
                    >
                      <span className={cn(
                        "text-sm font-medium truncate",
                        active ? "text-primary" : "text-foreground"
                      )}>
                        {item.label}
                      </span>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Categorias / Filtros */}
      {categories.length > 0 && (
        <div className="px-3 py-4 border-t border-border/30">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4"
              >
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
                  Categorias
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={cn(
            "space-y-1 max-h-[300px] overflow-y-auto scrollbar-thin",
            collapsed && "space-y-2"
          )}>
            {categories.slice(0, 8).map((category) => {
              const categoryConfig = getCategoryColor(category.name);
              const isSelected = selectedCategory === category.name;
              
              return (
                <motion.button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={cn(
                    "flex items-center w-full rounded-lg transition-all duration-200",
                    "hover:bg-muted/50 focus:bg-muted/50 focus:outline-none",
                    collapsed ? "p-2 justify-center" : "p-3",
                    isSelected && "bg-accent/10 border border-accent/20"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={collapsed ? category.name : undefined}
                >
                  {/* Ícone da categoria */}
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center",
                    categoryConfig?.color && `bg-[${categoryConfig.color}]/20`
                  )}>
                    {React.createElement(categoryConfig?.icon || FolderOpen, {
                      className: cn(
                        "h-4 w-4",
                        isSelected ? "text-accent" : "text-muted-foreground"
                      ),
                      style: categoryConfig?.color ? { color: categoryConfig.color } : undefined
                    })}
                  </div>

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 flex-1 min-w-0 text-left"
                      >
                        <span className={cn(
                          "text-sm font-medium truncate block",
                          isSelected ? "text-accent" : "text-foreground"
                        )}>
                          {category.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {category.count} projeto{category.count !== 1 ? 's' : ''}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Badge com contagem */}
                  {collapsed && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {category.count}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </motion.aside>
  );
};