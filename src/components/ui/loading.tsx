import React from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardSkeletonProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({ 
  variant = 'default', 
  className 
}) => {
  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center space-x-4 p-4 border rounded-lg", className)}>
        <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <div className="h-48 bg-muted animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-4/5 animate-pulse" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-muted rounded w-20 animate-pulse" />
          <div className="h-8 bg-muted rounded w-24 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
