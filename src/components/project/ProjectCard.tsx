// src/components/project/ProjectCard.tsx
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Lock, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { format, isWithinInterval, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { detectLanguage, getCategoryColor } from '@/lib/languageColors';

interface ProjectCardProps {
  project: ProjectCardType | null | undefined;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'default',
  index = 0,
  onDiscover,
  isDiscovered = false
}) => {
  const [isRevealed, setIsRevealed] = React.useState(variant !== 'mystery');
  const [isHovered, setIsHovered] = React.useState(false);

  // Verificação de segurança para projeto
  if (!project || !project.id) {
    return (
      <div className="border rounded-lg p-4 bg-muted/50 text-center">
        <p className="text-muted-foreground">Projeto não disponível</p>
      </div>
    );
  }

  // Detecta a linguagem e obtém a configuração de cores
  const languageConfig = detectLanguage(project);
  const categoryConfig = getCategoryColor(project.categoria);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  // Verifica se é recente (últimos 7 dias)
  const isRecent = project.data_modificacao ? 
    isWithinInterval(new Date(project.data_modificacao), {
      start: subDays(new Date(), 7),
      end: new Date()
    }) : false;

  // Verifica se é muito recente (últimos 2 dias) para mostrar "Novo"
  const isNew = project.data_modificacao ? 
    isWithinInterval(new Date(project.data_modificacao), {
      start: subDays(new Date(), 2),
      end: new Date()
    }) : false;

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      if (onDiscover && project.id) {
        onDiscover(project.id);
      }
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ x: 4 }}
      >
        <Card className="hover:shadow-md transition-all duration-300 group cursor-pointer border-l-4"
              style={{ borderLeftColor: languageConfig.color }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
          <CardContent className="p-4 flex items-center gap-4">
            {/* Language Indicator */}
            <div className={`w-3 h-12 rounded-full bg-gradient-to-b ${languageConfig.gradient} shrink-0`} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link to={`/projects/${project.id}`} className="block group">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                        {project.titulo || 'Projeto sem título'}
                      </h3>
                      {isNew && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Novo
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.descricao && project.descricao.length > 80 
                        ? `${project.descricao.substring(0, 80)}...` 
                        : project.descricao || 'Sem descrição disponível'}
                    </p>
                  </Link>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge 
                    variant="outline" 
                    className="text-xs border-current"
                    style={{ color: languageConfig.color }}
                  >
                    {languageConfig.icon} {project.categoria || 'Sem categoria'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(project.data_modificacao)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card 
        className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col" 
        onClick={handleReveal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          {isRevealed ? (
            project.imageurl ? (
              <img 
                src={project.imageurl} 
                alt={project.titulo || 'Projeto'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { 
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=entropy&auto=format&q=60`; 
                }}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${languageConfig.gradient} flex items-center justify-center`}>
                <div className="text-5xl opacity-60">{languageConfig.icon}</div>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center cursor-pointer">
              <div className="text-center space-y-3">
                <Lock className="h-8 w-8 mx-auto text-primary/50" />
                <p className="text-sm font-medium text-primary/70">Clique para Revelar</p>
              </div>
            </div>
          )}
          
          {isRevealed && (
            <>
              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <Badge 
                  className="shadow-lg border-0"
                  style={{ 
                    backgroundColor: languageConfig.color,
                    color: languageConfig.textColor === 'text-yellow-900' ? '#000' : '#fff'
                  }}
                >
                  {languageConfig.icon} {project.categoria || 'Sem categoria'}
                </Badge>
              </div>

              {/* New Badge - Only for very recent projects */}
              {isNew && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-500 text-white border-0 shadow-lg animate-pulse">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Novo
                  </Badge>
                </div>
              )}
            </>
          )}

          {/* Language Indicator */}
          <div className="absolute bottom-3 left-3">
            <div 
              className={`w-4 h-4 rounded-full shadow-lg bg-gradient-to-br ${languageConfig.gradient}`}
              title={`Projeto ${languageConfig.name}`}
            />
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <Link to={`/projects/${project.id}`} className="block group flex-1">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {project.titulo || 'Projeto sem título'}
            </h3>
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {project.descricao || 'Sem descrição disponível'}
            </p>
          </Link>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{isRevealed ? formatDate(project.data_modificacao) : '...'}</span>
            {isRecent && isRevealed && (
              <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                Recente
              </Badge>
            )}
          </div>
          
          <Button 
            asChild 
            size="sm" 
            variant="outline" 
            disabled={!isRevealed}
            className="group/btn hover:border-current"
            style={isRevealed ? { color: languageConfig.color } : undefined}
          >
            <Link to={`/projects/${project.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Ver Projeto
              <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
