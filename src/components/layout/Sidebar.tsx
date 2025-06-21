// src/components/layout/Sidebar.tsx - Versão Exploração
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
  AlertCircle,
  ChevronRight,
  MapPin,
  Star,
  Zap
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navigationItems = [
  { name: 'Base de Operações', href: '/', icon: Home, description: 'Início da jornada' },
  { name: 'Território de Exploração', href: '/projects', icon: Compass, description: 'Projetos para descobrir' },
  { name: 'Centro de Comando', href: '/dashboard', icon: BarChart3, description: 'Visão geral das descobertas' },
  { name: 'Configurações', href: '/settings', icon: Settings, description: 'Ajustes da expedição' },
];

const viewModes = [
  { id: 'grid', name: 'Exploração Visual', icon: Grid3X3, description: 'Ver em cards' },
  { id: 'list', name: 'Lista Compacta', icon: List, description: 'Ver em lista' },
  { id: 'timeline', name: 'Linha do Tempo', icon: Clock, description: 'Em breve' },
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
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  // Handle category selection with navigation
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    
    // Navigate to projects page if not already there
    if (location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  // Handle "All Categories" selection
  const handleAllTerritories = () => {
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
        <div className="space-y-2">
          <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Navegação
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start group"
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-3 h-4 w-4" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* View Modes - Only show on projects page */}
        {location.pathname === '/projects' && (
          <div className="mt-8 space-y-2">
            <h3 className="mb-4 px-4 text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Modo de Exploração
            </h3>
            <div className="space-y-1">
              {viewModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={viewMode === mode.id ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-start group"
                  onClick={() => setViewMode(mode.id)}
                  disabled={mode.id === 'timeline'} // Timeline em desenvolvimento
                >
                  <mode.icon className="mr-3 h-4 w-4" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{mode.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {mode.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Territories (Categories) */}
        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Territórios
            </h3>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAllTerritories}
                className="h-6 px-2 text-xs hover:bg-primary/10"
              >
                Todos
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            <Button
              variant={selectedCategory === '' ? 'secondary' : 'ghost'}
              size="sm"
              className="w-full justify-start group"
              onClick={handleAllTerritories}
            >
              <Compass className="mr-3 h-4 w-4" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Todos os Territórios</div>
                {categories && (
                  <div className="text-xs text-muted-foreground">
                    {categories.reduce((total, cat) => total + cat.count, 0)} projetos total
                  </div>
                )}
              </div>
            </Button>
            
            {categoriesLoading ? (
              <div className="space-y-2 px-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : categoriesError ? (
              <div className="px-4 py-3 text-center">
                <div className="flex flex-col items-center gap-2 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Territórios Indisponíveis</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Problema na comunicação com a base
                </p>
              </div>
            ) : categories && categories.length > 0 ? (
              categories.slice(0, 8).map((category, index) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-between group"
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <div className="flex items-center gap-3 flex-1 text-left min-w-0">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                      ['from-red-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 
                       'from-purple-500 to-pink-500', 'from-orange-500 to-red-500', 'from-indigo-500 to-purple-500',
                       'from-teal-500 to-blue-500', 'from-yellow-500 to-orange-500'][index % 8]
                    } shrink-0`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.count} projeto{category.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {category.count}
                    </Badge>
                    {selectedCategory !== category.name && (
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </Button>
              ))
            ) : (
              <div className="px-4 py-3 text-center">
                <div className="flex flex-col items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Explorando Territórios</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Mapeamento em andamento...
                </p>
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

        {/* Quick Discovery Actions */}
        <div className="mt-8 space-y-2">
          <h3 className="mb-4 px-4 text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Ações Rápidas
          </h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start group"
              onClick={() => {
                setSelectedCategory('');
                navigate('/projects');
              }}
            >
              <FolderOpen className="mr-3 h-4 w-4" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Explorar Tudo</div>
                <div className="text-xs text-muted-foreground">
                  Ver todos os projetos
                </div>
              </div>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start group"
              onClick={() => {
                // Randomizar categoria
                if (categories && categories.length > 0) {
                  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                  handleCategorySelect(randomCategory.name);
                }
              }}
            >
              <Compass className="mr-3 h-4 w-4" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Território Aleatório</div>
                <div className="text-xs text-muted-foreground">
                  Surpreenda-se!
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* Explorer Stats */}
        {categories && categories.length > 0 && (
          <div className="mt-8 p-4 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg border border-primary/10">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Status do Explorador
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Territórios Mapeados:</span>
                <span className="font-medium">{categories.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Projetos Descobertos:</span>
                <span className="font-medium">
                  {categories.reduce((total, cat) => total + cat.count, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Território Atual:</span>
                <span className="font-medium truncate ml-2">
                  {selectedCategory || 'Explorando Tudo'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-3 bg-muted/30 rounded-lg text-xs">
            <div className="font-medium mb-2">🔧 Debug</div>
            <div className="space-y-1 text-muted-foreground">
              <div>Rota: {location.pathname}</div>
              <div>Territórios: {categories?.length || 0}</div>
              <div>Selecionado: {selectedCategory || 'Nenhum'}</div>
              <div>Vista: {viewMode}</div>
              <div>Carregando: {categoriesLoading ? 'Sim' : 'Não'}</div>
              {categoriesError && (
                <div className="text-red-500">Erro: {categoriesError.message}</div>
              )}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
