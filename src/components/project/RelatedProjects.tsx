// src/components/project/RelatedProjects.tsx
import React from 'react';
import { useRelatedProjects } from '@/hooks/useProjects';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  FaArrowRight, 
  FaCompass, 
  FaEye, 
  FaStar, 
  FaBolt, 
  FaCrosshairs,
  FaGlobe
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { detectLanguage, getCategoryColor } from '@/lib/languageColors';

interface RelatedProjectsProps {
  projectId: string;
  category: string;
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({ projectId, category }) => {
  const { data: relatedProjects, isLoading } = useRelatedProjects(projectId, category);
  const [hoveredProject, setHoveredProject] = React.useState<number | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCompass className="h-5 w-5" />
            Projetos Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!relatedProjects || relatedProjects.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <FaCompass className="h-5 w-5" />
            Projetos Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-center py-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl flex justify-center"
            >
              <FaGlobe />
            </motion.div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300">
                Território Inexplorado
              </h4>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Nenhum outro projeto neste território foi encontrado ainda. 
                Seja o pioneiro desta categoria!
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="border-orange-300 text-orange-700 hover:bg-orange-100">
              <Link to="/projects">
                <FaCrosshairs className="mr-2 h-4 w-4" />
                Explorar Outros Territórios
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  const categoryColor = getCategoryColor(category);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColor.gradient}`} />
            <span>Projetos Relacionados</span>
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs"
            style={{ backgroundColor: `${categoryColor.color}20`, color: categoryColor.color }}
          >
            {relatedProjects.length}
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Outros projetos em <span className="font-semibold" style={{ color: categoryColor.color }}>{category}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <AnimatePresence>
          {relatedProjects.slice(0, 5).map((project: ProjectCardType, index) => {
            const languageConfig = detectLanguage(project);
            const isHovered = hoveredProject === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="block group"
                >
                  <motion.div
                    className="p-3 rounded-lg border border-transparent hover:border-current hover:shadow-md transition-all duration-200 relative overflow-hidden"
                    style={{ 
                      borderColor: isHovered ? languageConfig.color : 'transparent',
                      backgroundColor: isHovered ? `${languageConfig.color}05` : 'transparent'
                    }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Language indicator line */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                      style={{ backgroundColor: languageConfig.color }}
                    />
                    
                    <div className="flex items-start gap-3 ml-2">
                      {/* Project thumbnail/icon */}
                      <div className="flex-shrink-0">
                        {project.imageurl ? (
                          <motion.img
                            src={project.imageurl}
                            alt={project.titulo}
                            className="w-10 h-10 rounded-lg object-cover"
                            whileHover={{ scale: 1.1 }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop&crop=entropy&auto=format&q=60`;
                            }}
                          />
                        ) : (
                          <div 
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${languageConfig.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                          >
                            {languageConfig.icon}
                          </div>
                        )}
                      </div>

                      {/* Project info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                            {project.titulo}
                          </h4>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                          </motion.div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {project.descricao.length > 60 
                            ? `${project.descricao.substring(0, 60)}...` 
                            : project.descricao}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs border-current px-2 py-0.5"
                            style={{ color: languageConfig.color }}
                          >
                            {languageConfig.name}
                          </Badge>
                          
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-1"
                            >
                              <FaEye className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Ver projeto</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{ 
                        background: `linear-gradient(90deg, transparent, ${languageConfig.color}10, transparent)`,
                        opacity: isHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* View all button */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-3 border-t border-muted"
          >
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center group"
              asChild
            >
              <Link to={`/projects?category=${encodeURIComponent(category)}`}>
                <FaStar className="mr-2 h-4 w-4" />
                Ver todos em {category}
                <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Discovery encouragement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-2"
        >
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <FaStar className="h-3 w-3" />
              <span>Cada projeto é uma nova descoberta</span>
            </div>
            
            {relatedProjects.length > 3 && (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <FaBolt className="h-3 w-3 text-amber-500" />
                <span>+{relatedProjects.length - 3} projetos adicionais nesta categoria</span>
              </div>
            )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
