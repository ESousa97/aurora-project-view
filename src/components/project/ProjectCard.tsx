
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, ExternalLink } from 'lucide-react';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectCardProps {
  project: ProjectCardType;
  variant?: 'default' | 'compact';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'default' 
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Link 
                to={`/projects/${project.id}`}
                className="block group"
              >
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                  {project.titulo}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {project.descricao}
                </p>
              </Link>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Badge variant="outline" className="text-xs">
                {project.categoria}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDate(project.data_modificacao)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        {project.imageurl ? (
          <img
            src={project.imageurl}
            alt={project.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=entropy&auto=format&q=60`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <div className="text-4xl font-bold text-primary/30">
              {project.titulo.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/90">
            {project.categoria}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <Link 
          to={`/projects/${project.id}`}
          className="block group"
        >
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
            {project.titulo}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-3">
            {project.descricao}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(project.data_modificacao)}</span>
        </div>
        
        <Button asChild size="sm" variant="outline">
          <Link to={`/projects/${project.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Ver Projeto
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
