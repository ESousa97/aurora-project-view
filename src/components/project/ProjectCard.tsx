// src/components/project/ProjectCard.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight, Code2 } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { detectLanguage } from '@/lib/languageColors';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectCardProps {
  project: ProjectCardType;
  variant?: 'default' | 'compact';
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'default',
  index = 0,
}) => {
  const languageConfig = React.useMemo(() => detectLanguage(project), [project]);
  const Icon = languageConfig.icon;

  const formattedDate = React.useMemo(() => {
    try {
      return format(new Date(project.data_modificacao), "dd 'de' MMM yyyy", { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  }, [project.data_modificacao]);

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.05, duration: 0.3 },
  };

  if (variant === 'compact') {
    return (
      <motion.div {...animationProps}>
        <Link to={`/projects/${project.id}`} className="block">
          <Card className="group card-surface hover-lift rounded-lg p-4 cursor-pointer flex items-start gap-4">
            {/* Tech Icon */}
            <div className="flex-shrink-0">
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface text-primary transition-colors group-hover:bg-accent"
                aria-label={languageConfig.displayName}
              >
                <Icon className="w-5 h-5" />
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary line-clamp-1 transition-colors group-hover:text-accent">
                {project.titulo}
              </h3>
              <p className="mt-1 text-sm text-muted line-clamp-2">
                {project.descricao || 'Sem descrição disponível.'}
              </p>

              {/* Metadata */}
              <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span>{formattedDate}</span>
                <Badge variant="outline" className="ml-auto">
                  {languageConfig.displayName}
                </Badge>
              </div>
            </div>

            {/* Hover Arrow */}
            <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div {...animationProps} className="h-full">
      <Link to={`/projects/${project.id}`} className="block h-full">
        <Card className="group card-surface hover-lift rounded-lg overflow-hidden h-full flex flex-col">
          {/* Image or Placeholder */}
          <div className="relative aspect-video bg-surface-variant">
            {project.imageurl ? (
              <img
                src={project.imageurl}
                alt={project.titulo}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <Code2 className="w-12 h-12 text-muted" />
              </div>
            )}

            {/* Language Badge Overlay */}
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-surface text-muted transition-opacity group-hover:opacity-100 opacity-90"
                aria-label={languageConfig.displayName}
              >
                <Icon className="w-4 h-4" style={{ color: languageConfig.color }} />
                <span className="text-xs font-medium" style={{ color: languageConfig.color }}>
                  {languageConfig.displayName}
                </span>
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="flex-1 p-5 flex flex-col">
            <h3 className="font-semibold text-lg line-clamp-2 transition-colors group-hover:text-accent text-primary">
              {project.titulo}
            </h3>
            <p className="mt-2 text-sm text-secondary flex-1 line-clamp-3">
              {project.descricao || 'Este projeto ainda não possui uma descrição.'}
            </p>

            {/* Footer Metadata & CTA */}
            <div className="mt-4 pt-4 border-t border-divider flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Ver projeto
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
