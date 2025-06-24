// src/components/project/ProjectTimeline.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaEye, 
  FaArrowRight, 
  FaStar,
  FaBolt,
  FaRocket,
  FaFire,
  FaMagic,
  FaBook,
  FaCalendarDay
} from 'react-icons/fa';
import { format, isWithinInterval, subDays, subMonths, subYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { detectLanguage } from '@/lib/languageColors';

interface ProjectTimelineProps {
  projects: ProjectCardType[];
  isLoading?: boolean;
}

interface TimelinePeriod {
  label: string;
  projects: ProjectCardType[];
  period: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'older';
  color: string;
  iconElement: React.ReactElement;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ 
  projects, 
  isLoading = false 
}) => {
  const timelineData = React.useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const now = new Date();
    const periods: TimelinePeriod[] = [
      { 
        label: 'Hoje', 
        projects: [], 
        period: 'today', 
        color: 'from-green-500 to-emerald-500', 
        iconElement: <FaStar className="w-5 h-5" />
      },
      { 
        label: 'Esta Semana', 
        projects: [], 
        period: 'week', 
        color: 'from-blue-500 to-cyan-500', 
        iconElement: <FaBolt className="w-5 h-5" />
      },
      { 
        label: 'Este Mês', 
        projects: [], 
        period: 'month', 
        color: 'from-purple-500 to-pink-500', 
        iconElement: <FaRocket className="w-5 h-5" />
      },
      { 
        label: 'Últimos 3 Meses', 
        projects: [], 
        period: 'quarter', 
        color: 'from-orange-500 to-red-500', 
        iconElement: <FaFire className="w-5 h-5" />
      },
      { 
        label: 'Este Ano', 
        projects: [], 
        period: 'year', 
        color: 'from-indigo-500 to-purple-500', 
        iconElement: <FaMagic className="w-5 h-5" />
      },
      { 
        label: 'Mais Antigos', 
        projects: [], 
        period: 'older', 
        color: 'from-slate-500 to-slate-600', 
        iconElement: <FaBook className="w-5 h-5" />
      },
    ];

    projects.forEach(project => {
      const projectDate = new Date(project.data_modificacao);
      
      if (isWithinInterval(projectDate, { start: new Date(now.setHours(0, 0, 0, 0)), end: now })) {
        periods[0].projects.push(project);
      } else if (isWithinInterval(projectDate, { start: subDays(now, 7), end: now })) {
        periods[1].projects.push(project);
      } else if (isWithinInterval(projectDate, { start: subMonths(now, 1), end: now })) {
        periods[2].projects.push(project);
      } else if (isWithinInterval(projectDate, { start: subMonths(now, 3), end: now })) {
        periods[3].projects.push(project);
      } else if (isWithinInterval(projectDate, { start: subYears(now, 1), end: now })) {
        periods[4].projects.push(project);
      } else {
        periods[5].projects.push(project);
      }
    });

    // Sort projects within each period by date (newest first)
    periods.forEach(period => {
      period.projects.sort((a, b) => 
        new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime()
      );
    });

    // Filter out empty periods
    return periods.filter(period => period.projects.length > 0);
  }, [projects]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const formatRelativeDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Hoje';
      if (diffInDays === 1) return 'Ontem';
      if (diffInDays < 7) return `${diffInDays} dias atrás`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semanas atrás`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} meses atrás`;
      return `${Math.floor(diffInDays / 365)} anos atrás`;
    } catch {
      return 'Data inválida';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i} 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            <div className="space-y-3">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="h-24 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (timelineData.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-4 text-muted-foreground flex justify-center">
          <FaCalendarDay />
        </div>
        <h3 className="text-lg font-semibold mb-2">Nenhum projeto na timeline</h3>
        <p className="text-muted-foreground">
          Os projetos aparecerão organizados por data de modificação.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {timelineData.map((period, periodIndex) => (
        <motion.div 
          key={period.period} 
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: periodIndex * 0.1 }}
        >
          {/* Period Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${period.color} shadow-lg`} />
              <h2 className="text-xl font-semibold">{period.label}</h2>
              <div className="text-lg text-muted-foreground">
                {period.iconElement}
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            <Badge 
              variant="secondary"
              className="shadow-sm"
              style={{ backgroundColor: `${period.color.split(' ')[1].replace('to-', '').replace('500', '100')}` }}
            >
              {period.projects.length} projeto{period.projects.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {/* Period Projects */}
          <div className="space-y-3 ml-6 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[-1.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-border to-transparent" />
            
            {period.projects.map((project, index) => {
              const languageConfig = detectLanguage(project);
              const isNew = isWithinInterval(new Date(project.data_modificacao), {
                start: subDays(new Date(), 2),
                end: new Date()
              });

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (periodIndex * 0.1) + (index * 0.05) }}
                >
                  <Card 
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer relative border-l-4"
                    style={{ borderLeftColor: languageConfig.color }}
                  >
                    {/* Timeline Connector */}
                    {index < period.projects.length - 1 && (
                      <div className="absolute left-[-1.5rem] top-16 w-px h-8 bg-border" />
                    )}
                    
                    {/* Timeline Dot */}
                    <div 
                      className="absolute left-[-1.8rem] top-6 w-3 h-3 rounded-full shadow-lg bg-gradient-to-br"
                      style={{ background: `linear-gradient(to bottom right, ${languageConfig.color}, ${languageConfig.color}90)` }}
                    />
                    
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Project Image/Icon */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 shadow-md">
                          {project.imageurl ? (
                            <img
                              src={project.imageurl}
                              alt={project.titulo}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=64&h=64&fit=crop&crop=entropy&auto=format&q=60`;
                              }}
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${languageConfig.gradient} flex items-center justify-center`}>
                              <span className="text-xl opacity-80">
                                {languageConfig.icon}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <Link 
                              to={`/projects/${project.id}`}
                              className="block group-hover:text-primary transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg line-clamp-1">
                                  {project.titulo}
                                </h3>
                                {isNew && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                                    <FaStar className="h-3 w-3 mr-1" />
                                    Novo
                                  </Badge>
                                )}
                              </div>
                            </Link>
                            <Badge 
                              variant="outline" 
                              className="shrink-0 border-current"
                              style={{ color: languageConfig.color }}
                            >
                              {languageConfig.icon} {project.categoria}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.descricao}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <FaCalendarAlt className="h-3 w-3" />
                                <span>{formatRelativeDate(project.data_modificacao)}</span>
                              </div>
                              <span>•</span>
                              <span>{formatDate(project.data_modificacao)}</span>
                            </div>

                            <Button 
                              size="sm" 
                              variant="ghost" 
                              asChild
                              className="group/btn hover:bg-current hover:bg-opacity-10"
                              style={{ color: languageConfig.color }}
                            >
                              <Link to={`/projects/${project.id}`}>
                                <FaEye className="h-3 w-3 mr-1" />
                                Ver
                                <FaArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Timeline Summary */}
      <motion.div 
        className="border-t pt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Timeline mostrando {projects.length} projeto{projects.length !== 1 ? 's' : ''} 
            organizados por data de modificação
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Recente</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Última semana</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Último mês</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
