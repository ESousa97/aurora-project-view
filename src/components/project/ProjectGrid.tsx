// src/components/project/ProjectGrid.tsx - Versão Atualizada
import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectCard as ProjectCardType } from '@/types';
import { useUIStore } from '@/stores/uiStore';

interface ProjectGridProps {
  projects: ProjectCardType[];
  isLoading?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects, 
  isLoading = false 
}) => {
  const { viewMode } = useUIStore();

  if (isLoading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : viewMode === 'list'
          ? 'grid-cols-1'
          : 'grid-cols-1' // timeline loading
      }`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className={`bg-muted rounded-lg ${
              viewMode === 'timeline' ? 'h-24' : 'h-64'
            }`}></div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
        <p className="text-muted-foreground">
          Tente ajustar seus filtros de busca ou explorar outras categorias.
        </p>
      </div>
    );
  }

  // Timeline view
  if (viewMode === 'timeline') {
    return <ProjectTimeline projects={projects} isLoading={isLoading} />;
  }

  // Grid and List views
  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project}
          variant={viewMode === 'grid' ? 'default' : 'compact'}
        />
      ))}
    </div>
  );
};
