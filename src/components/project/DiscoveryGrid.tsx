// src/components/project/DiscoveryGrid.tsx
import React from 'react';
import { useUIStore } from '@/stores/uiStore';
import { ProjectCard } from './ProjectCard';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectCard as ProjectCardType } from '@/types';

interface DiscoveryGridProps {
  projects: ProjectCardType[];
  mode?: 'timeline';
}

export const DiscoveryGrid: React.FC<DiscoveryGridProps> = ({ projects, mode }) => {
  const { viewMode } = useUIStore();

  if (mode === 'timeline' || viewMode === 'timeline') {
    return <ProjectTimeline projects={projects} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((proj: ProjectCardType) => (
        <ProjectCard key={proj.id} project={proj} />
      ))}
    </div>
  );
};
