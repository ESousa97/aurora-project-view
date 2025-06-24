
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Zap, Eye, Calendar } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';
import { formatProjectDate, isProjectRecent } from '@/utils/projectHelpers';

interface ProjectCardEngagementProps {
  project: ProjectCardType;
  variant?: 'default' | 'compact';
}

export const ProjectCardEngagement: React.FC<ProjectCardEngagementProps> = ({
  project,
  variant = 'default'
}) => {
  const engagement = useProjectEngagement(project);
  const isRecent = isProjectRecent(project.data_modificacao);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>{engagement.viewCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatProjectDate(project.data_modificacao)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
      <div className="flex items-center gap-1">
        <Users className="h-3 w-3" />
        <span>Visualizações: {engagement.viewCount}</span>
      </div>
      {isRecent && (
        <Badge variant="outline" className="text-xs border-green-500 text-green-600">
          <TrendingUp className="h-3 w-3 mr-1" />
          Atualizado
        </Badge>
      )}
      {engagement.trending && (
        <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
          <Zap className="h-3 w-3 mr-1" />
          Trending
        </Badge>
      )}
    </div>
  );
};
