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
  // SINCRONIZAÇÃO: Usar a linguagem passada ou detectar de forma consistente
  const detectedLanguage = React.useMemo(() => {
    if (enhancedLanguage) {
      return enhancedLanguage;
    }

    // Se é um EnhancedProjectCard, usar a linguagem já detectada
    if ('detectedLanguage' in project && project.detectedLanguage) {
      return project.detectedLanguage;
    }

    // Senão, detectar usando a função padrão
    return detectLanguage(project);
  }, [project, enhancedLanguage]);

  const engagement = useProjectEngagement(project);

  if (variant === 'compact') {
    return (
      <div className="flex-1 min-w-0">
        <Link to={`/projects/${project.id}`} className="block group">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate mb-1">
                {isRevealed ? (project.titulo || 'Projeto sem título') : 'Projeto Misterioso'}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-[1.3] mb-2">
                {isRevealed 
                  ? (project.descricao && project.descricao.length > 75 
                      ? `${project.descricao.substring(0, 75)}...` 
                      : project.descricao || 'Sem descrição disponível')
                  : 'Clique para revelar as tecnologias utilizadas neste projeto...'
                }
              </p>
            </div>
          </div>
          
          {/* Tecnologias e Engagement na mesma linha */}
          <div className="flex items-center justify-between gap-2">
            {isRevealed ? (
              <div className="flex gap-1">
                <Badge 
                  variant="outline"
                  className="text-[10px] px-1 py-0.5 h-5"
                  style={{ 
                    color: detectedLanguage.color, 
                    borderColor: detectedLanguage.color + '40',
                    backgroundColor: detectedLanguage.color + '08'
                  }}
                  title={`${detectedLanguage.description} - ${detectedLanguage.category}`}
                >
                  <detectedLanguage.icon className="h-2 w-2 mr-0.5" />
                  {detectedLanguage.displayName}
                </Badge>
              </div>
            ) : (
              <div className="flex gap-1">
                <Badge 
                  variant="outline"
                  className="text-[10px] px-1 py-0.5 h-5 border-dashed"
                >
                  <HelpCircle className="h-2 w-2 mr-0.5" />
                  ???
                </Badge>
              </div>
            )}
            
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
        {/* Header com título */}
        <div className="mb-2">
          <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {isRevealed ? (project.titulo || 'Projeto sem título') : 'Projeto Misterioso'}
          </h3>
        </div>
        
        {/* Descrição */}
        <p className="text-muted-foreground line-clamp-2 text-sm leading-[1.4] mb-3">
          {isRevealed 
            ? (project.descricao || 'Sem descrição disponível')
            : 'Este projeto esconde tecnologias interessantes esperando para serem descobertas. Clique para revelar as linguagens, frameworks e ferramentas utilizadas.'
          }
        </p>

        {/* SINCRONIZAÇÃO: Tecnologias com linguagem principal destacada - SOMENTE se revelado */}
        {isRevealed && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              <Badge 
                variant="outline"
                className="text-xs px-2 py-1 h-7 border-current font-medium"
                style={{ 
                  color: detectedLanguage.color,
                  borderColor: detectedLanguage.color + '40',
                  backgroundColor: detectedLanguage.color + '10'
                }}
                title={`${detectedLanguage.description} | Categoria: ${detectedLanguage.category} | Dificuldade: ${detectedLanguage.difficulty}/5`}
              >
                <detectedLanguage.icon className="h-3 w-3 mr-1" />
                {detectedLanguage.displayName}
                {detectedLanguage.trending && <span className="ml-1">🔥</span>}
              </Badge>
              
              {/* Badge adicional se houver categoria diferente */}
              {project.categoria && project.categoria !== detectedLanguage.displayName && (
                <Badge 
                  variant="outline"
                  className="text-xs px-1.5 py-0.5 h-6"
                  title={`Categoria: ${project.categoria}`}
                >
                  {project.categoria}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Mostrar badge de mistério quando não revelado */}
        {!isRevealed && (
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

        {/* Engagement no final - SOMENTE se revelado */}
        {isRevealed && (
          <div className="mt-auto">
            <ProjectCardEngagement project={project} variant="default" />
          </div>
        )}
      </Link>
    </div>
  );
};
