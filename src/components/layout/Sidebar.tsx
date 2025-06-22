import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  FolderOpen, 
  Compass,
  BarChart3, 
  Settings,
  Grid3X3,
  List,
  Clock,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCategoryColor } from '@/lib/languageColors';

const navigationItems = [
  { name: 'Base de Operações', href: '/', icon: Home },
  { name: 'Explorar Projetos', href: '/projects', icon: Compass },
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
        "fixed inset-y-0 z-30 flex h-full w-72 flex-col border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <ScrollArea className="flex-1 px-3 py-4">
        {/* Navigation */}
        <div className="space-y-2 mb-8">
          <h2 className="mb-4 px-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase">
            Navegação
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start h-11"
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* View Modes - Only show on projects page */}
        {location.pathname === '/projects' && (
          <div className="space-y-2 mb-8">
            <h3 className="mb-4 px-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase">
              Visualização
            </h3>
            <div className="space-y-1">
              {viewModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={viewMode === mode.id ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-start h-9"
                  onClick={() => setViewMode(mode.id)}
                >
                  <mode.icon className="mr-3 h-4 w-4" />
                  <span className="text-sm">{mode.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">
              Territórios
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
              className="w-full justify-start h-9"
              onClick={handleAllCategories}
            >
              <FolderOpen className="mr-3 h-4 w-4" />
              <span className="text-sm">Todos os Projetos</span>
              {categories && (
                <Badge variant="outline" className="ml-auto">
                  {categories.reduce((total, cat) => total + cat.count, 0)}
                </Badge>
              )}
            </Button>
            
            {categoriesLoading ? (
              <div className="space-y-2 px-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-9 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : categories && categories.length > 0 ? (
              categories.slice(0, 8).map((category) => {
                const colorConfig = getCategoryColor(category.name);
                
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'secondary' : 'ghost'}
                    size="sm"
                    className="w-full justify-between h-9 group"
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    <div className="flex items-center gap-3 flex-1 text-left min-w-0">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorConfig.gradient} shrink-0`} />
                      <span className="text-sm font-medium truncate">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                      {selectedCategory !== category.name && (
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </Button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Explorando Territórios</span>
                  <p className="text-xs text-muted-foreground">
                    Mapeamento em andamento...
                  </p>
                </div>
              </div>
            )}

            {categories && categories.length > 8 && (
              <div className="px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/projects')}
                >
                  +{categories.length - 8} territórios adicionais
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
