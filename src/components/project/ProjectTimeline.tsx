import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { ProjectCard } from '@/types';
import { ProjectCardSkeleton } from '@/components/ui/loading';
import { formatProjectDate } from '@/utils/projectHelpers';
import { detectLanguage } from '@/lib/languageColors';

interface ProjectTimelineProps {
  projects: ProjectCard[];
  onProjectClick?: (project: ProjectCard) => void;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects, onProjectClick }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (projects && projects.length > 0) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [projects]);

  const renderProjectCard = (project: ProjectCard, index: number) => {
    const languageConfig = detectLanguage(project);
    const isEven = index % 2 === 0;
    const LanguageIcon = languageConfig.icon;

    return (
      <motion.div
        key={project.id}
        className={`flex ${isEven ? 'justify-start' : 'justify-end'} w-full`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <div className={`w-full max-w-md ${isEven ? 'mr-8' : 'ml-8'}`}>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 group"
            style={{ borderLeftColor: languageConfig.color }}
            onClick={() => onProjectClick?.(project)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageConfig.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <LanguageIcon className="h-6 w-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {project.titulo || 'Projeto sem título'}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {project.descricao || 'Sem descrição disponível'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline"
                      className="text-xs"
                      style={{ 
                        color: languageConfig.color, 
                        borderColor: languageConfig.color + '40' 
                      }}
                    >
                      {languageConfig.displayName}
                    </Badge>
                    
                    {project.data_modificacao && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatProjectDate(project.data_modificacao)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative py-16">
      {/* Linha vertical */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-muted" style={{ marginLeft: -2 }} />

      {/* Indicador de carregamento */}
      {loading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Projetos */}
      {!loading && projects && projects.length > 0 ? (
        <div className="space-y-12">
          {projects.map((project, index) => renderProjectCard(project, index))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum projeto disponível.</p>
          </div>
        )
      )}
    </div>
  );
};
