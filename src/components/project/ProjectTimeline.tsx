// src/components/project/ProjectTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, GitBranch } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectTimelineProps {
  projects: ProjectCardType[];
  isLoading?: boolean;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  projects,
  isLoading = false,
}) => {
  const displayProjects = projects
    .filter(p => p.data_modificacao)
    .sort((a, b) => new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime())
    .slice(0, 10);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Timeline de Projetos
        </h3>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Timeline de Projetos
      </h3>
      <div className="space-y-3">
        {displayProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{project.titulo}</p>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Calendar className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(project.data_modificacao), { addSuffix: true, locale: ptBR })}</span>
                <GitBranch className="w-4 h-4 ml-2" />
                <span>{project.categoria}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
