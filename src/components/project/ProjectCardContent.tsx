
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
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
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                  {project.titulo || 'Projeto sem título'}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {project.descricao && project.descricao.length > 80 
                  ? `${project.descricao.substring(0, 80)}...` 
                  : project.descricao || 'Sem descrição disponível'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <ProjectCardEngagement project={project} variant="compact" />
          </div>

          {isMultiTech && detectedTechnologies.length > 1 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {detectedTechnologies.slice(0, 3).map((tech) => (
                <Badge 
                  key={tech.name}
                  variant="outline"
                  className="text-xs px-1.5 py-0.5"
                  style={{ 
                    color: tech.color, 
                    borderColor: tech.color + '40',
                    backgroundColor: tech.color + '10'
                  }}
                  title={tech.description}
                >
                  <tech.icon className="h-2.5 w-2.5 mr-1" />
                  {tech.displayName}
                </Badge>
              ))}
            </div>
          )}
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 flex-1 flex flex-col relative z-10">
      <Link to={`/projects/${project.id}`} className="block group flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {isRevealed ? (project.titulo || 'Projeto sem título') : 'Projeto Misterioso'}
          </h3>
          
          {isRevealed && (
            <div className="flex items-center gap-1 ml-2 shrink-0">
              <div className="text-xs text-muted-foreground">{engagement.viewCount}</div>
              <Eye className="h-3 w-3 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-4">
          {isRevealed 
            ? (project.descricao || 'Sem descrição disponível')
            : 'Este projeto esconde tecnologias interessantes esperando para serem descobertas. Clique para revelar as linguagens, frameworks e ferramentas utilizadas.'
          }
        </p>

        {isRevealed && (
          <ProjectCardEngagement project={project} variant="default" />
        )}
      </Link>

      {isRevealed && isMultiTech && detectedTechnologies.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1">
          {detectedTechnologies.slice(0, 4).map((tech) => (
            <Badge 
              key={tech.name}
              variant="outline"
              className="text-xs px-2 py-1 border-current"
              style={{ color: tech.color }}
              title={tech.description}
            >
              <tech.icon className="h-3 w-3 mr-1" />
              {tech.displayName}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
