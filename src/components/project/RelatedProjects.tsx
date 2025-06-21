// src/components/project/RelatedProjects.tsx
import React from 'react';
import { useRelatedProjects } from '@/hooks/useProjects';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Compass } from 'lucide-react';

interface RelatedProjectsProps {
  projectId: string;
  category: string;
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({ projectId, category }) => {
  const { data: relatedProjects, isLoading } = useRelatedProjects(projectId, category);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projetos Relacionados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!relatedProjects || relatedProjects.length === 0) {
    return (
       <Card>
        <CardHeader>
          <CardTitle>Projetos Relacionados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-muted-foreground py-4">
            <Compass className="h-8 w-8 mx-auto mb-2" />
            <p>Nenhum outro projeto neste território foi encontrado.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projetos Relacionados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedProjects.map((project: ProjectCardType) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block p-2 rounded-lg hover:bg-accent group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm truncate group-hover:text-primary">{project.titulo}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-muted-foreground">{project.descricao.substring(0, 50)}...</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
