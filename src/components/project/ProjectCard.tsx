
// src/components/project/ProjectCard.tsx - Card minimalista e moderno
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
    transition: { delay: index * 0.03, duration: 0.4 },
  };

  if (variant === 'compact') {
    return (
      <motion.div {...animationProps}>
        <Link to={`/projects/${project.id}`} className="block">
          <Card className="group card-modern hover-lift p-5 cursor-pointer">
            <div className="flex items-start gap-4">
              {/* Tech Icon minimalista */}
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-xl surface-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                  style={{ backgroundColor: `${languageConfig.color}10` }}
                >
                  <Icon className="w-6 h-6" style={{ color: languageConfig.color }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground line-clamp-1 mb-2 group-hover:gradient-text transition-all duration-200">
                  {project.titulo}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {project.descricao || 'Sem descrição disponível.'}
                </p>

                {/* Metadata minimalista */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="text-xs font-medium"
                    style={{ 
                      borderColor: `${languageConfig.color}30`,
                      color: languageConfig.color,
                      backgroundColor: `${languageConfig.color}05`
                    }}
                  >
                    {languageConfig.displayName}
                  </Badge>
                </div>
              </div>

              {/* Hover indicator */}
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }

  // Default variant - mais minimalista
  return (
    <motion.div {...animationProps} className="h-full">
      <Link to={`/projects/${project.id}`} className="block h-full">
        <Card className="group card-modern hover-lift overflow-hidden h-full flex flex-col">
          {/* Image ou placeholder minimalista */}
          <div className="relative aspect-video surface-secondary">
            {project.imageurl ? (
              <img
                src={project.imageurl}
                alt={project.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${languageConfig.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: languageConfig.color }} />
                </div>
              </div>
            )}

            {/* Badge overlay minimalista */}
            <div className="absolute top-4 right-4">
              <Badge
                className="text-xs font-medium border-0 shadow-sm"
                style={{
                  backgroundColor: `${languageConfig.color}20`,
                  color: languageConfig.color,
                  backdropFilter: 'blur(8px)'
                }}
              >
                {languageConfig.displayName}
              </Badge>
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-6 flex flex-col">
            <h3 className="font-semibold text-xl line-clamp-2 mb-3 group-hover:gradient-text transition-all duration-300">
              {project.titulo}
            </h3>
            <p className="text-sm text-muted-foreground flex-1 line-clamp-3 leading-relaxed mb-4">
              {project.descricao || 'Este projeto ainda não possui uma descrição.'}
            </p>

            {/* Footer minimalista */}
            <div className="flex items-center justify-between pt-4 border-t border-divider">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-200">
                <span>Ver projeto</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
