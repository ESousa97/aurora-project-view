
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectGrid } from '@/components/project/ProjectGrid';
import { useProjects } from '@/hooks/useProjects';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

const Projects = () => {
  const { data: projects, isLoading } = useProjects();
  const { searchQuery, selectedCategory, setSearchQuery } = useUIStore();
  const [sortBy, setSortBy] = React.useState<'date' | 'title' | 'category'>('date');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

  // Filter and sort projects
  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];

    let filtered = projects;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project => 
        project.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.categoria.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(project => 
        project.categoria === selectedCategory
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.data_modificacao).getTime() - new Date(b.data_modificacao).getTime();
          break;
        case 'title':
          comparison = a.titulo.localeCompare(b.titulo);
          break;
        case 'category':
          comparison = a.categoria.localeCompare(b.categoria);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, searchQuery, selectedCategory, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projetos</h1>
            <p className="text-muted-foreground">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar projetos..."
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
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory) && (
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-muted-foreground">Filtros ativos:</span>
            {searchQuery && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <Search className="h-3 w-3" />
                <span>"{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <Filter className="h-3 w-3" />
                <span>{selectedCategory}</span>
                <button 
                  onClick={() => useUIStore.getState().setSelectedCategory('')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        {/* Projects Grid */}
        <ProjectGrid 
          projects={filteredProjects} 
          isLoading={isLoading}
        />
      </div>
    </AppLayout>
  );
};

export default Projects;
