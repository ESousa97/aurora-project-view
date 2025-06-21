import React from 'react';
import { Search, Menu, Sun, Moon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUIStore } from '@/stores/uiStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const Header = () => {
  const { theme, toggleSidebar, setTheme, searchQuery, setSearchQuery } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: projects } = useProjects();
  
  const [showResults, setShowResults] = React.useState(false);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Filtrar projetos em tempo real
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || !projects) return [];
    
    const query = searchQuery.toLowerCase();
    return projects
      .filter(project => 
        project.titulo.toLowerCase().includes(query) ||
        project.descricao.toLowerCase().includes(query) ||
        project.categoria.toLowerCase().includes(query) ||
        project.conteudo?.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limite de 5 resultados na busca rápida
  }, [searchQuery, projects]);

  // Mostrar/esconder resultados baseado no foco e query
  React.useEffect(() => {
    setShowResults(isInputFocused && searchQuery.trim().length > 0);
  }, [isInputFocused, searchQuery]);

  // Fechar resultados quando clicar fora
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      setIsInputFocused(false);
      navigate(`/projects?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleResultClick = (projectId: number) => {
    setShowResults(false);
    setIsInputFocused(false);
    navigate(`/projects/${projectId}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      setIsInputFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PP</span>
            </div>
            <span className="hidden font-bold text-lg sm:inline-block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ProjPortfólio
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Buscar projetos..."
                className={cn(
                  "pl-8 pr-8 sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-xl border-2 transition-all",
                  isInputFocused ? "border-primary/50 ring-2 ring-primary/20" : "focus:border-primary/50"
                )}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onKeyDown={handleKeyDown}
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted"
                  onClick={clearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </form>

            {/* Resultados da busca em tempo real */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50">
                <Card className="shadow-lg border-2">
                  <CardContent className="p-0">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="p-3 border-b bg-muted/30">
                          <span className="text-sm font-medium text-muted-foreground">
                            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {searchResults.map((project) => (
                            <div
                              key={project.id}
                              className="p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0 transition-colors"
                              onClick={() => handleResultClick(project.id)}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm line-clamp-1">
                                    {project.titulo}
                                  </h4>
                                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                    {project.descricao}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs shrink-0">
                                  {project.categoria}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t bg-muted/30">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => {
                              setShowResults(false);
                              navigate(`/projects?q=${encodeURIComponent(searchQuery)}`);
                            }}
                          >
                            Ver todos os resultados ({projects?.filter(p => 
                              p.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
                            ).length || 0})
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center">
                        <div className="text-4xl mb-2">🔍</div>
                        <p className="text-sm text-muted-foreground">
                          Nenhum projeto encontrado para "{searchQuery}"
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => navigate('/search')}
                        >
                          Tentar busca avançada
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-xl">
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Overlay para fechar busca */}
      {showResults && (
        <div 
          className="fixed inset-0 z-30 bg-black/20" 
          onClick={() => {
            setShowResults(false);
            setIsInputFocused(false);
          }}
        />
      )}
    </header>
  );
};
