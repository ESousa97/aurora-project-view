// src/components/layout/Sidebar.tsx - Versão Melhorada
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  FolderOpen, 
  Search, 
  BarChart3, 
  Settings,
  Grid3X3,
  List,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navigationItems = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'Projetos', href: '/projects', icon: FolderOpen },
  { name: 'Busca', href: '/search', icon: Search },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

const viewModes = [
  { id: 'grid', name: 'Grade', icon: Grid3X3 },
  { id: 'list', name: 'Lista', icon: List },
  { id: 'timeline', name: 'Timeline', icon: Clock },
] as const;

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    sidebarOpen, 
    viewMode, 
    selectedCategory, 
    setViewMode, 
    setSelectedCategory,
    setSearchQuery 
  } = useUIStore();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  // Log para debug
  React.useEffect(() => {
    if (categories) {
      console.log('📋 Sidebar received categories:', categories.length);
      console.log('📊 Categories data:', categories.map(c => `${c.name}: ${c.count}`));
    }
    if (categoriesError) {
      console.error('❌ Sidebar categories error:', categoriesError);
    }
  }, [categories, categoriesError]);

  // Handle category selection with navigation
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery(''); // Clear search when selecting category
    
    // Navigate to projects page if not already there
    if (location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  // Handle "All Categories" selection
  const handleAllCategories = () => {
    setSelectedCategory('');
    setSearchQuery('');
    
    if (location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-30 flex h-full w-72 flex-col border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <ScrollArea className="flex-1 px-3 py-4">
        {/* Navigation */}
        <div className="space-y-2">
          <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">
            Navegação
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* View Modes - Only show on projects page */}
        {location.pathname === '/projects' && (
          <div className="mt-8 space-y-2">
            <h3 className="mb-4 px-4 text-sm font-medium text-muted-foreground">
              Modo de Visualização
            </h3>
            <div className="space-y-1">
              {viewModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={viewMode === mode.id ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setViewMode(mode.id)}
                  // Timeline is now implemented!
                >
                  <mode.icon className="mr-2 h-4 w-4" />
                  {mode.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Categorias
            </h3>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAllCategories}
                className="h-6 px-2 text-xs"
              >
                Limpar
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            <Button
              variant={selectedCategory === '' ? 'secondary' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={handleAllCategories}
            >
              Todas as Categorias
              {categories && (
                <Badge variant="secondary" className="ml-auto">
                  {categories.reduce((total, cat) => total + cat.count, 0)}
                </Badge>
              )}
            </Button>
            
            {categoriesLoading ? (
              <div className="space-y-2 px-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : categoriesError ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Erro ao carregar categorias</span>
                </div>
                <p className="text-xs mt-1">
                  Verifique a conexão com o servidor
                </p>
              </div>
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-between group"
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <span className="truncate flex-1 text-left">{category.name}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                    {selectedCategory !== category.name && (
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </Button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Nenhuma categoria encontrada</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-2">
          <h3 className="mb-4 px-4 text-sm font-medium text-muted-foreground">
            Ações Rápidas
          </h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                navigate('/projects');
              }}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Ver Todos os Projetos
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/search">
                <Search className="mr-2 h-4 w-4" />
                Busca Avançada
              </Link>
            </Button>
          </div>
        </div>

        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-3 bg-muted/30 rounded-lg text-xs">
            <div className="font-medium mb-2">Debug Info</div>
            <div className="space-y-1 text-muted-foreground">
              <div>Path: {location.pathname}</div>
              <div>Categories: {categories?.length || 0}</div>
              <div>Selected: {selectedCategory || 'None'}</div>
              <div>View: {viewMode}</div>
              <div>Loading: {categoriesLoading ? 'Yes' : 'No'}</div>
              {categoriesError && (
                <div className="text-red-500">Error: {categoriesError.message}</div>
              )}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
