// src/components/project/ProjectCardEngagement.tsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { formatProjectDate } from '@/utils/projectHelpers';

interface ProjectCardEngagementProps {
  project: ProjectCardType;
  variant?: 'default' | 'compact';
}

export const ProjectCardEngagement: React.FC<ProjectCardEngagementProps> = ({
  project,
  variant = 'default'
}) => {
  const formattedDate = formatProjectDate(project.data_modificacao);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>{formattedDate}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
      <Calendar className="h-3 w-3" />
      <span>Modificado: {formattedDate}</span>
    </div>
  );
};
