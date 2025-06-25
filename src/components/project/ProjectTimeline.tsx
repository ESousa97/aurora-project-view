
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, GitBranch } from 'lucide-react';
import { ProjectCard } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectTimelineProps {
  projects: ProjectCard[];
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects }) => {
  const sortedProjects = [...projects]
    .filter(p => p.data_modificacao)
    .sort((a, b) => new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Timeline de Projetos
      </h3>
      
      <div className="space-y-3">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{project.titulo}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(project.data_modificacao), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </span>
                <GitBranch className="h-3 w-3 ml-2" />
                <span>{project.categoria}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
