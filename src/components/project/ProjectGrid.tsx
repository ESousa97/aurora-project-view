
// src/components/project/ProjectGrid.tsx
import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectTimeline } from './ProjectTimeline';
import { useUIStore } from '@/stores/uiStore';
import { ProjectCard as ProjectCardType } from '@/types';

interface ProjectGridProps {
  projects: ProjectCardType[];
  compact?: boolean;
  isLoading?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, compact, isLoading }) => {
  const { viewMode } = useUIStore();

  if (isLoading) {
    return (
      <div className="grid gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'timeline') {
    return <ProjectTimeline projects={projects} />;
  }

  return (
    <div className="grid gap-6">
      {projects.map((proj) => (
        <ProjectCard
          key={proj.id}
          project={proj}
          compact={compact}
        />
      ))}
    </div>
  );
};
