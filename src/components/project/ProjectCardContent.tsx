
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ProjectCard as ProjectCardType } from '@/types';
import { EnhancedProjectCard } from '@/types/enhanced';
import { LanguageColor } from '@/lib/languageColors';
import { ProjectCardEngagement } from './ProjectCardEngagement';
import { detectProjectTechnologies } from '@/utils/projectHelpers';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';

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
  // Usar linguagem detectada se disponível, senão fazer detecção
  const detectedTechnologies = React.useMemo(() => {
    if (enhancedLanguage) {
      return [enhancedLanguage];
    }
    return detectProjectTechnologies(project);
  }, [project, enhancedLanguage]);

  const engagement = useProjectEngagement(project);
  const isMultiTech = detectedTechnologies.length > 1;
  const mainLanguage = enhancedLanguage || detectedTechnologies[0];

  if (variant === 'compact') {
    return (
      <div className="flex-1 min-w-0">
        <Link to={`/projects/${project.id}`} className="block group">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate mb-1">
                {project.titulo || 'Projeto sem título'}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-[1.3] mb-2">
                {project.descricao && project.descricao.length > 75 
                  ? `${project.descricao.substring(0, 75)}...` 
                  : project.descricao || 'Sem descrição disponível'}
              </p>
            </div>
          </div>
          
          {/* Tecnologias e Engagement na mesma linha */}
          <div className="flex items-center justify-between gap-2">
            {mainLanguage && (
              <div className="flex gap-1">
                <Badge 
                  variant="outline"
                  className="text-[10px] px-1 py-0.5 h-5"
                  style={{ 
                    color: mainLanguage.color, 
                    borderColor: mainLanguage.color + '40',
                    backgroundColor: mainLanguage.color + '08'
                  }}
                  title={`${mainLanguage.description} - ${mainLanguage.category}`}
                >
                  <mainLanguage.icon className="h-2 w-2 mr-0.5" />
                  {mainLanguage.displayName}
                </Badge>
                
                {/* Indicador de confiança se disponível */}
                {'languageMetadata' in project && project.languageMetadata.confidence < 70 && (
                  <Badge variant="outline" className="text-[10px] px-1 py-0.5 h-5 text-yellow-600 border-yellow-300">
                    ?
                  </Badge>
                )}
              </div>
            )}
            <ProjectCardEngagement project={project} variant="compact" />
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

        {/* Tecnologias com linguagem principal destacada */}
        {isRevealed && mainLanguage && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              <Badge 
                variant="outline"
                className="text-xs px-2 py-1 h-7 border-current font-medium"
                style={{ 
                  color: mainLanguage.color,
                  borderColor: mainLanguage.color + '40',
                  backgroundColor: mainLanguage.color + '10'
                }}
                title={`${mainLanguage.description} | Categoria: ${mainLanguage.category} | Dificuldade: ${mainLanguage.difficulty}/5`}
              >
                <mainLanguage.icon className="h-3 w-3 mr-1" />
                {mainLanguage.displayName}
                {mainLanguage.trending && <span className="ml-1">🔥</span>}
              </Badge>
              
              {/* Badges adicionais para múltiplas tecnologias */}
              {isMultiTech && detectedTechnologies.slice(1, 3).map((tech) => (
                <Badge 
                  key={tech.name}
                  variant="outline"
                  className="text-xs px-1.5 py-0.5 h-6 border-current"
                  style={{ 
                    color: tech.color,
                    borderColor: tech.color + '30',
                    backgroundColor: tech.color + '08'
                  }}
                  title={tech.description}
                >
                  <tech.icon className="h-2.5 w-2.5 mr-1" />
                  {tech.displayName}
                </Badge>
              ))}
              
              {detectedTechnologies.length > 3 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-6 text-muted-foreground">
                  +{detectedTechnologies.length - 3}
                </Badge>
              )}
            </div>
            
            {/* Metadata de confiança na detecção */}
            {'languageMetadata' in project && (
              <div className="mt-2 text-xs text-muted-foreground">
                Confiança na detecção: {project.languageMetadata.confidence}%
                {project.languageMetadata.confidence < 70 && (
                  <span className="text-yellow-600 ml-1">⚠️ Baixa confiança</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Engagement no final */}
        {isRevealed && (
          <div className="mt-auto">
            <ProjectCardEngagement project={project} variant="default" />
          </div>
        )}
      </Link>
    </div>
  );
};
