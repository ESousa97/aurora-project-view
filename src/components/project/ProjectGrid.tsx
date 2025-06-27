// src/components/project/ProjectGrid.tsx
import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectTimeline } from './ProjectTimeline';
import { useUIStore } from '@/stores/uiStore';
import { ProjectCard as ProjectCardType } from '@/types';

interface ProjectGridProps {
  projects: ProjectCardType[];
  compact?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, compact }) => {
  const { viewMode } = useUIStore();

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
