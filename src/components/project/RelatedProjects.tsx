// src/components/project/RelatedProjects.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProjectCardSkeleton } from '@/components/ui/loading';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard, Category } from '@/types';
import { formatProjectDate } from '@/utils/projectHelpers';
import { motion } from 'framer-motion';
import { useRelatedProjects } from '@/hooks/useProjects';
import { Badge } from '@/components/ui/badge';
import { detectLanguage } from '@/lib/languageColors';

interface RelatedProjectsProps {
  projectId: string;
  category: string;
  currentProjectTitle?: string;
  limit?: number;
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({ 
  projectId, 
  category, 
  currentProjectTitle,
  limit = 4 
}) => {
  const { data: relatedProjects, isLoading } = useRelatedProjects(projectId, category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Projetos Relacionados</h2>
          <p className="text-muted-foreground">
            Outros projetos na categoria "{category}"
          </p>
        </div>
        {relatedProjects && relatedProjects.length > limit && (
          <Button variant="outline" size="sm" asChild>
            <Link to={`/projects?category=${encodeURIComponent(category)}`}>
              Ver todos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProjectCardSkeleton key={i} variant="compact" />
          ))}
        </div>
      ) : relatedProjects && relatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProjects.slice(0, limit).map((project, index) => {
            const languageConfig = detectLanguage(project);
            const LanguageIcon = languageConfig.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <Link to={`/projects/${project.id}`} className="block h-full">
                    <CardContent className="p-4 h-full flex flex-col">
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${languageConfig.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          <LanguageIcon className="h-5 w-5 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {project.titulo || 'Projeto sem título'}
                          </h3>
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
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-3 flex-1">
                        {project.descricao || 'Sem descrição disponível'}
                      </p>
                      
                      {project.data_modificacao && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3 pt-3 border-t">
                          <Calendar className="h-3 w-3" />
                          <span>{formatProjectDate(project.data_modificacao)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h4 className="text-lg font-semibold">Nenhum projeto relacionado encontrado</h4>
          <p className="text-muted-foreground">
            Não há projetos relacionados a "{currentProjectTitle}" nesta categoria.
          </p>
        </div>
      )}
    </motion.div>
  );
};
