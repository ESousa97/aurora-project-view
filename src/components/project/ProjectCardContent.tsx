import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ProjectCard as ProjectCardType } from '@/types';
import { ProjectCardEngagement } from './ProjectCardEngagement';
import { detectProjectTechnologies } from '@/utils/projectHelpers';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';

interface ProjectCardContentProps {
  project: ProjectCardType;
  isRevealed: boolean;
  variant?: 'default' | 'compact';
}

export const ProjectCardContent: React.FC<ProjectCardContentProps> = ({
  project,
  isRevealed,
  variant = 'default'
}) => {
  const detectedTechnologies = detectProjectTechnologies(project);
  const engagement = useProjectEngagement(project);
  const isMultiTech = detectedTechnologies.length > 1;

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
          
          {/* Tecnologias e Engagement na mesma linha para economizar espaço */}
          <div className="flex items-center justify-between gap-2">
            {isMultiTech && detectedTechnologies.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {detectedTechnologies.slice(0, 2).map((tech) => (
                  <Badge 
                    key={tech.name}
                    variant="outline"
                    className="text-[10px] px-1 py-0.5 h-5"
                    style={{ 
                      color: tech.color, 
                      borderColor: tech.color + '40',
                      backgroundColor: tech.color + '08'
                    }}
                    title={tech.description}
                  >
                    <tech.icon className="h-2 w-2 mr-0.5" />
                    {tech.displayName}
                  </Badge>
                ))}
                {detectedTechnologies.length > 2 && (
                  <Badge variant="outline" className="text-[10px] px-1 py-0.5 h-5 text-muted-foreground">
                    +{detectedTechnologies.length - 2}
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
        
        {/* Descrição mais compacta */}
        <p className="text-muted-foreground line-clamp-2 text-sm leading-[1.4] mb-3">
          {isRevealed 
            ? (project.descricao || 'Sem descrição disponível')
            : 'Este projeto esconde tecnologias interessantes esperando para serem descobertas. Clique para revelar as linguagens, frameworks e ferramentas utilizadas.'
          }
        </p>

        {/* Tecnologias otimizadas */}
        {isRevealed && isMultiTech && detectedTechnologies.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {detectedTechnologies.slice(0, 5).map((tech) => (
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
              {detectedTechnologies.length > 5 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-6 text-muted-foreground">
                  +{detectedTechnologies.length - 5}
                </Badge>
              )}
            </div>
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
