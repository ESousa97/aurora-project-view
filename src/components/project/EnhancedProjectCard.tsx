// src/components/project/EnhancedProjectCard/EnhancedProjectCard.tsx
import React from 'react';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';
import { useProjectCard } from './EnhancedProjectCard/useProjectCard';
import { ModernCard } from './EnhancedProjectCard/ModernCard';
import { EnhancedProjectCardProps } from './EnhancedProjectCard/types';

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = React.memo(({ 
  project,
  variant = 'default',
  index = 0,
  onDiscover,
  isDiscovered = false
}) => {
  // Custom hooks
  useProjectEngagement(project);
  const { revealed, langConfig, handleClick } = useProjectCard({
    project,
    variant,
    onDiscover,
  });

  // Early return if no project
  if (!project?.id) return null;

  return (
    <ModernCard
      project={project}
      variant={variant}
      index={index}
      onClick={handleClick}
    />
  );
});

EnhancedProjectCard.displayName = 'EnhancedProjectCard';
