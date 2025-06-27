// src/components/project/ProjectCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BaseCard } from '@/components/ui/BaseCard';
import { Calendar, ArrowRight, Code2 } from 'lucide-react';
import { detectLanguage } from '@/lib/languageColors';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ProjectCard as ProjectCardType } from '@/types';

interface ProjectCardProps {
  project: ProjectCardType;
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact }) => {
  const lang = detectLanguage(project);
  const date = React.useMemo(() => {
    try {
      return format(new Date(project.data_modificacao), "dd 'de' MMM yyyy", { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  }, [project.data_modificacao]);

  return (
    <Link to={`/projects/${project.id}`}>
      <BaseCard className={compact ? 'p-4 flex items-center gap-4' : 'flex flex-col'}>
        {compact ? (
          <>
            <div
              className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${lang.gradient}`}
            >
              <lang.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{project.titulo}</h3>
              <p className="text-sm text-muted line-clamp-2 mt-1">
                {project.descricao || '—'}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted" />
          </>
        ) : (
          <>
            <div className="aspect-video bg-surface-variant flex items-center justify-center overflow-hidden">
              {project.imageurl ? (
                <img
                  src={project.imageurl}
                  alt={project.titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Code2 className="w-10 h-10 text-muted" />
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg line-clamp-2">{project.titulo}</h3>
              <p className="text-sm text-muted flex-1 line-clamp-3 mt-2">
                {project.descricao || '—'}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {date}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </>
        )}
      </BaseCard>
    </Link>
  );
};
