// src/pages/Projects.tsx - Versão Simplificada e Corrigida
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectGrid } from '@/components/project/ProjectGrid';
import { useProjects } from '@/hooks/useProjects';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortAsc, SortDesc, X, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Projects = () => {
  const { data: projects, isLoading, refetch } = useProjects();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useUIStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Estados locais para ordenação
  const [sortBy, setSortBy] = React.useState<'date' | 'title' | 'category'>('date');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

  // Sincronizar com URL params apenas no mount
  React.useEffect(() => {
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');
    
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
    if (queryParam && queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    }
  }, []); // Apenas no mount para evitar loops

  // Atualizar URL quando filtros mudam (debounced)
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      
      if (selectedCategory) {
        params.set('category', selectedCategory);
      }
      if (searchQuery) {
        params.set('q', searchQuery);
      }
      
      setSearchParams(params, { replace: true });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery, setSearchParams]);

  // Filtrar e ordenar projetos
  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    // Filtro por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.titulo.toLowerCase().includes(query) ||
        project.descricao.toLowerCase().includes(query) ||
        project.categoria.toLowerCase().includes(query) ||
        project.conteudo?.toLowerCase().includes(query)
      );
    }

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(project => 
        project.categoria === selectedCategory
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.data_modificacao).getTime() - new Date(b.data_modificacao).getTime();
          break;
        case 'title':
          comparison = a.titulo.localeCompare(b.titulo, 'pt-BR');
          break;
        case 'category':
          comparison = a.categoria.localeCompare(b.categoria, 'pt-BR');
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, searchQuery, selectedCategory, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projetos</h1>
            <p className="text-muted-foreground">
              {isLoading ? (
                'Carregando projetos...'
              ) : (
                <>
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
                  {projects && filteredProjects.length !== projects.length && (
                    <span className="text-primary"> de {projects.length} total</span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Filtrar projetos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-[200px]"
              />
            </div>

            <Select value={sortBy} onValueChange={(value: 'date' | 'title' | 'category') => setSortBy(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="title">Título</SelectItem>
                <SelectItem value="category">Categoria</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={toggleSortOrder}>
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="icon" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filtros Ativos */}
        {hasActiveFilters && (
          <div className="flex gap-2 items-center flex-wrap p-4 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground font-medium">Filtros ativos:</span>
            
            {searchQuery && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Search className="h-3 w-3" />
                <span>"{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  aria-label="Remover filtro de busca"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {selectedCategory && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Filter className="h-3 w-3" />
                <span>{selectedCategory}</span>
                <button 
                  onClick={() => setSelectedCategory('')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  aria-label="Remover filtro de categoria"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="ml-2"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar Tudo
            </Button>
          </div>
        )}

        {/* Estado Vazio */}
        {!isLoading && filteredProjects.length === 0 && hasActiveFilters && (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl">🔍</div>
            <h3 className="text-lg font-semibold">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Não encontramos projetos que correspondam aos seus filtros atuais. 
              Tente ajustar os termos de busca ou explorar outras categorias.
            </p>
            <Button variant="outline" onClick={clearAllFilters}>
              <X className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Grid de Projetos */}
        <ProjectGrid 
          projects={filteredProjects} 
          isLoading={isLoading}
        />

        {/* Info de Ordenação */}
        {filteredProjects.length > 0 && (
          <div className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Ordenado por {sortBy === 'date' ? 'data' : sortBy === 'title' ? 'título' : 'categoria'} 
              ({sortOrder === 'asc' ? 'crescente' : 'decrescente'})
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Projects;
