
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Brain, Layers, Code2 } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { isProjectNew, detectProjectTechnologies } from '@/utils/projectHelpers';
import { detectLanguage } from '@/lib/languageColors';

interface ProjectCardBadgesProps {
  project: ProjectCardType;
  isRevealed: boolean;
  variant?: 'default' | 'compact';
  trending?: boolean;
}

export const ProjectCardBadges: React.FC<ProjectCardBadgesProps> = ({
  project,
  isRevealed,
  variant = 'default',
  trending = false
}) => {
  const detectedTechnologies = detectProjectTechnologies(project);
  const languageConfig = detectLanguage(project);
  const isNew = isProjectNew(project.data_modificacao);
  const isMultiTech = detectedTechnologies.length > 1;

  if (!isRevealed && variant !== 'compact') return null;

  return (
    <div className="flex items-center gap-2">
      {/* New Badge */}
      {isNew && (
        <Badge className="bg-green-500 text-white border-0 shadow-lg animate-pulse">
          <Sparkles className="h-3 w-3 mr-1" />
          Novo
        </Badge>
      )}

      {/* Trending Badge */}
      {trending && (
        <Badge className="bg-orange-500 text-white border-0 animate-pulse">
          <TrendingUp className="h-3 w-3 mr-1" />
          {variant === 'compact' ? 'Trending' : 'HOT'}
        </Badge>
      )}

      {/* Expert Badge */}
      {languageConfig.difficulty >= 4 && variant !== 'compact' && (
        <Badge className="bg-red-500 text-white border-0 shadow-lg">
          <Brain className="h-3 w-3 mr-1" />
          Expert
        </Badge>
      )}

      {/* Technology Badge */}
      {variant === 'compact' ? (
        <Badge 
          variant="outline" 
          className="text-xs border-current max-w-[120px] truncate"
          style={{ color: languageConfig.color }}
          title={isMultiTech ? detectedTechnologies.map(t => t.displayName).join(', ') : languageConfig.displayName}
        >
          {isMultiTech ? (
            <>
              <Layers className="h-3 w-3 mr-1" />
              Multi-Tech
            </>
          ) : (
            <>
              <Code2 className="h-3 w-3 mr-1" />
              {languageConfig.displayName}
            </>
          )}
        </Badge>
      ) : (
        <Badge 
          className="shadow-lg border-0 max-w-[140px] truncate backdrop-blur-sm"
          style={{ 
            backgroundColor: `${languageConfig.color}E6`,
            color: languageConfig.textColor.includes('yellow-900') ? '#000' : '#fff'
          }}
          title={isMultiTech ? detectedTechnologies.map(t => t.displayName).join(', ') : languageConfig.displayName}
        >
          <Code2 className="h-3 w-3 mr-1" />
          {isMultiTech ? 'Multi-Tech' : project.categoria}
        </Badge>
      )}
    </div>
  );
};
