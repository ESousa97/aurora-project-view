
// src/components/layout/Sidebar.tsx - Sidebar com ícones do sistema languageColors
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, FolderOpen
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCategoryColor } from '@/lib/languageColors';
import { motion, AnimatePresence } from 'framer-motion';

// Importar ícones do sistema languageColors
import { 
  SiRocket, SiCompass, SiBarChart, SiGlobe 
} from '@/lib/languageColors/icons';

const navigationItems = [
  { 
    name: 'Base de Operações', 
    href: '/', 
    icon: SiRocket,
    description: 'Central de comando',
    gradient: 'from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'
  },
  { 
    name: 'Explorar Territórios', 
    href: '/projects', 
    icon: SiCompass,
    description: 'Descobrir projetos',
    gradient: 'from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400'
  },
  { 
    name: 'Centro de Comando', 
    href: '/dashboard', 
    icon: SiBarChart,
    description: 'Analytics e métricas',
    gradient: 'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400'
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    sidebarOpen, 
    selectedCategory, 
    setSelectedCategory 
  } = useUIStore();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  const handleAllCategories = () => {
    setSelectedCategory('');
    if (location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-30 flex h-full w-80 flex-col border-r bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <ScrollArea className="flex-1 px-4 py-6">
        {/* Navigation */}
        <div className="space-y-2 mb-8">
          <h2 className="mb-4 px-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase flex items-center gap-2">
            <SiRocket className="h-4 w-4" />
            Navegação
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      "w-full justify-start h-12 group relative overflow-hidden",
                      isActive && `bg-gradient-to-r ${item.gradient} bg-opacity-10 border border-opacity-20`
                    )}
                    asChild
                  >
                    <Link to={item.href}>
                      <div className="flex items-center gap-3 w-full">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                          isActive 
                            ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg`
                            : "bg-muted group-hover:bg-primary/20"
                        )}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full animate-pulse" />
                        )}
                      </div>
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase flex items-center gap-2">
              <SiGlobe className="h-4 w-4" />
              Territórios
              <Badge variant="outline" className="text-xs">
                {categories?.length || 0}
              </Badge>
            </h3>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAllCategories}
                className="h-6 px-2 text-xs"
              >
                <span>Limpar</span>
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            <Button
              variant={selectedCategory === '' ? 'secondary' : 'ghost'}
              size="sm"
              className="w-full justify-start h-10 group"
              onClick={handleAllCategories}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                  selectedCategory === '' 
                    ? "bg-gradient-to-br from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 text-white shadow-lg"
                    : "bg-muted group-hover:bg-primary/20"
                )}>
                  <FolderOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">Todos os Projetos</div>
                  <div className="text-xs text-muted-foreground">
                    {categories ? categories.reduce((total, cat) => total + cat.count, 0) : 0} projetos
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {categories ? categories.reduce((total, cat) => total + cat.count, 0) : 0}
                </Badge>
              </div>
            </Button>
            
            {categoriesLoading ? (
              <div className="space-y-2 px-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : categories && categories.length > 0 ? (
              <AnimatePresence>
                {categories.slice(0, 12).map((category, index) => {
                  const colorConfig = getCategoryColor(category.name);
                  const CategoryIcon = colorConfig.icon;
                  const isSelected = selectedCategory === category.name;
                  
                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Button
                        variant={isSelected ? 'secondary' : 'ghost'}
                        size="sm"
                        className="w-full justify-between h-12 group relative overflow-hidden"
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        {/* Background gradient effect */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-r ${colorConfig.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                        />
                        
                        <div className="flex items-center gap-3 flex-1 text-left min-w-0 relative z-10">
                          <div 
                            className={cn(
                              "w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                              isSelected 
                                ? "text-white shadow-lg" 
                                : "text-white"
                            )}
                            style={{ 
                              background: isSelected 
                                ? `linear-gradient(135deg, ${colorConfig.color}, ${colorConfig.color}CC)`
                                : `linear-gradient(135deg, ${colorConfig.color}CC, ${colorConfig.color}AA)`
                            }}
                          >
                            <CategoryIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-sm">{category.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {category.count} projeto{category.count !== 1 ? 's' : ''}
                              {colorConfig.trending && (
                                <span className="ml-1">🔥</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0 relative z-10">
                          <Badge 
                            variant="outline" 
                            className="text-xs border-current"
                            style={{ color: colorConfig.color }}
                          >
                            {category.count}
                          </Badge>
                          {!isSelected && (
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            ) : (
              <div className="px-4 py-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <SiGlobe className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Explorando Territórios</h4>
                    <p className="text-xs text-muted-foreground">
                      Mapeamento em andamento...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {categories && categories.length > 12 && (
              <div className="px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground hover:text-foreground justify-center"
                  onClick={() => navigate('/projects')}
                >
                  <span>+{categories.length - 12} territórios adicionais</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
