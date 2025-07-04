import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { EnhancedProjectCard } from '@/components/project/EnhancedProjectCard';
import { ProjectCardSkeleton } from '@/components/ui/loading';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { useUIStore } from '@/stores/uiStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Projects = () => {
  const { data: projects, isLoading } = useProjects();
  const { data: categories } = useCategories();
  const { viewMode, setViewMode, selectedCategory, setSelectedCategory } = useUIStore();

  const filtered = React.useMemo(() => {
    if (!projects) return [];
    return selectedCategory ? projects.filter(p => p.categoria === selectedCategory) : projects;
  }, [projects, selectedCategory]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Projetos</h1>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              {categories?.map(cat => (
                <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <ProjectCardSkeleton key={i} variant={viewMode === 'list' ? 'compact' : 'default'} />
            ))
          ) : (
            filtered.map((project, index) => (
              <EnhancedProjectCard key={project.id} project={project} variant={viewMode === 'list' ? 'compact' : 'default'} index={index} />
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Projects;
