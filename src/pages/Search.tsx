// src/pages/Search.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectGrid } from '@/components/project/ProjectGrid';
import { useSearchProjects, useCategories } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Filter, X, TrendingUp } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export const Search = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useUIStore();
  const { data: searchResults, isLoading } = useSearchProjects(searchQuery);
  const { data: categories } = useCategories();
  const [localQuery, setLocalQuery] = React.useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setLocalQuery('');
  };

  const popularCategories = categories?.slice(0, 8) || [];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Buscar Projetos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre projetos específicos usando palavras-chave ou navegue por categorias
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite sua busca... (ex: React, TypeScript, API)"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
                {(searchQuery || selectedCategory) && (
                  <Button type="button" variant="outline" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Limpar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {(searchQuery || selectedCategory) && (
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <span className="text-sm text-muted-foreground">Filtros ativos:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                <SearchIcon className="h-3 w-3" />
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="ml-1 hover:bg-muted rounded">×</button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                <Filter className="h-3 w-3" />
                {selectedCategory}
                <button onClick={() => setSelectedCategory('')} className="ml-1 hover:bg-muted rounded">×</button>
              </Badge>
            )}
          </div>
        )}

        {/* Popular Categories */}
        {!searchQuery && popularCategories.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <TrendingUp className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Categorias Populares</h2>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className="rounded-full"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {searchQuery && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {isLoading 
                  ? 'Buscando...' 
                  : `${searchResults?.length || 0} resultado${(searchResults?.length || 0) !== 1 ? 's' : ''} encontrado${(searchResults?.length || 0) !== 1 ? 's' : ''}`
                }
              </h2>
            </div>
            <ProjectGrid projects={searchResults || []} isLoading={isLoading} />
          </div>
        )}

        {/* No Query State */}
        {!searchQuery && !selectedCategory && (
          <div className="text-center py-12 space-y-4">
            <SearchIcon className="mx-auto h-16 w-16 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Pronto para buscar?</h3>
              <p className="text-muted-foreground">
                Digite uma palavra-chave ou selecione uma categoria para começar
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
