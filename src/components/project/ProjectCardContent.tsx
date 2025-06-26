// src/components/project/ProjectCardContent.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ProjectCard as ProjectCardType } from '@/types';
import { EnhancedProjectCard } from '@/types/enhanced';
import { LanguageColor, detectLanguage } from '@/lib/languageColors';
import { ProjectCardEngagement } from './ProjectCardEngagement';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';
import { HelpCircle } from 'lucide-react';

interface ProjectCardContentProps {
  project: ProjectCardType | EnhancedProjectCard;
  isRevealed: boolean;
  variant?: 'default' | 'compact';
  enhancedLanguage?: LanguageColor;
}

export const ProjectCardContent: React.FC<ProjectCardContentProps> = ({
  project,
  isRevealed,
  variant = 'default',
  enhancedLanguage
}) => {
  const detectedLanguage = React.useMemo(() => {
    if (enhancedLanguage) return enhancedLanguage;
    if ('detectedLanguage' in project && project.detectedLanguage) return project.detectedLanguage;
    return detectLanguage(project);
  }, [project, enhancedLanguage]);

  useProjectEngagement(project);

  const renderTitle = () =>
    isRevealed ? project.titulo || 'Projeto sem título' : 'Projeto Misterioso';

  const renderDescription = () => {
    if (!isRevealed) {
      return variant === 'compact'
        ? 'Clique para revelar as tecnologias utilizadas neste projeto...'
        : 'Este projeto esconde tecnologias interessantes esperando para serem descobertas. Clique para revelar as linguagens, frameworks e ferramentas utilizadas.';
    }
    const desc = project.descricao || 'Sem descrição disponível';
    return variant === 'compact' && desc.length > 75
      ? `${desc.substring(0, 75)}...`
      : desc;
  };

  const renderLanguageBadge = () => {
    if (!isRevealed) {
      return (
        <Badge
          variant="outline"
          className={`text-[10px] px-1 py-0.5 h-5 ${variant === 'compact' ? 'border-dashed' : ''}`}
        >
          <HelpCircle className="h-2 w-2 mr-0.5" />
          ???
        </Badge>
      );
    }

    return (
      <Badge
        variant="outline"
        className={variant === 'compact' ? 'text-[10px] px-1 py-0.5 h-5' : 'text-xs px-2 py-1 h-7 font-medium'}
        style={{
          color: detectedLanguage.color,
          borderColor: detectedLanguage.color + '40',
          backgroundColor: detectedLanguage.color + (variant === 'compact' ? '08' : '10')
        }}
        title={
          variant === 'compact'
            ? `${detectedLanguage.description} - ${detectedLanguage.category}`
            : `${detectedLanguage.description} | Categoria: ${detectedLanguage.category} | Dificuldade: ${detectedLanguage.difficulty}/5`
        }
      >
        <detectedLanguage.icon className={`mr-0.5 ${variant === 'compact' ? 'h-2 w-2' : 'h-3 w-3 mr-1'}`} />
        {detectedLanguage.displayName}
      </Badge>
    );
  };

  if (variant === 'compact') {
    return (
      <div className="flex-1 min-w-0">
        <Link to={`/projects/${project.id}`} className="block group">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate mb-1">
                {renderTitle()}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-[1.3] mb-2">
                {renderDescription()}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1">{renderLanguageBadge()}</div>
            {isRevealed && (
              <ProjectCardEngagement project={project} variant="compact" />
            )}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 flex-1 flex flex-col relative z-10">
      <Link to={`/projects/${project.id}`} className="block group flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {renderTitle()}
          </h3>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-[1.4] mb-3">
          {renderDescription()}
        </p>

        {isRevealed ? (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {renderLanguageBadge()}
            </div>
          </div>
        ) : (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              <Badge
                variant="outline"
                className="text-xs px-2 py-1 h-7 border-dashed border-muted-foreground/50 text-muted-foreground"
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Tecnologia Oculta
              </Badge>
              <Badge
                variant="outline"
                className="text-xs px-1.5 py-0.5 h-6 border-dashed border-muted-foreground/30 text-muted-foreground/70"
              >
                ???
              </Badge>
            </div>
          </div>
        )}

        {isRevealed && (
          <div className="mt-auto">
            <ProjectCardEngagement project={project} variant="default" />
          </div>
        )}
      </Link>
    </div>
  );
};
