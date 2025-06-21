// src/components/project/ProjectTimeline.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { format, isWithinInterval, subDays, subMonths, subYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectTimelineProps {
  projects: ProjectCardType[];
  isLoading?: boolean;
}

interface TimelinePeriod {
  label: string;
  projects: ProjectCardType[];
  period: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'older';
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ 
  projects, 
  isLoading = false 
}) => {
  const timelineData = React.useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const now = new Date();
    const periods: TimelinePeriod[] = [
      { label: 'Hoje', projects: [], period: 'today' },
      { label: 'Esta Semana', projects: [], period: 'week' },
      { label: 'Este Mês', projects: [], period: 'month' },
      { label: 'Últimos 3 Meses', projects: [], period: 'quarter' },
      { label: 'Este Ano', projects: [], period: 'year' },
      { label: 'Mais Antigos', projects: [], period: 'older' },
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
          <div key={i} className="space-y-4">
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            <div className="space-y-3">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="h-24 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (timelineData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-lg font-semibold mb-2">Nenhum projeto na timeline</h3>
        <p className="text-muted-foreground">
          Os projetos aparecerão organizados por data de modificação.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {timelineData.map((period) => (
        <div key={period.period} className="space-y-4">
          {/* Period Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <h2 className="text-xl font-semibold">{period.label}</h2>
            </div>
            <div className="flex-1 h-px bg-border" />
            <Badge variant="secondary">
              {period.projects.length} projeto{period.projects.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {/* Period Projects */}
          <div className="space-y-3 ml-6">
            {period.projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="group hover:shadow-md transition-all duration-200 relative"
              >
                {/* Timeline Connector */}
                {index < period.projects.length - 1 && (
                  <div className="absolute left-[-1.5rem] top-16 w-px h-8 bg-border" />
                )}
                
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Project Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
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
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary/50">
                            {project.titulo.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <Link 
                          to={`/projects/${project.id}`}
                          className="block group-hover:text-primary transition-colors"
                        >
                          <h3 className="font-semibold text-base line-clamp-1">
                            {project.titulo}
                          </h3>
                        </Link>
                        <Badge variant="outline" className="shrink-0">
                          {project.categoria}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.descricao}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatRelativeDate(project.data_modificacao)}</span>
                          <span>•</span>
                          <span>{formatDate(project.data_modificacao)}</span>
                        </div>

                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/projects/${project.id}`}>
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Timeline Summary */}
      <div className="border-t pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Timeline mostrando {projects.length} projeto{projects.length !== 1 ? 's' : ''} 
          organizados por data de modificação
        </p>
      </div>
    </div>
  );
};
