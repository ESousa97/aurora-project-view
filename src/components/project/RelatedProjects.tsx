
// src/components/project/RelatedProjects.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useRelatedProjects } from '@/hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import { ProjectCard as ProjectCardType } from '@/types';

interface RelatedProjectsProps {
  projectId: string;
  category: string;
  currentProjectTitle?: string;
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  projectId,
  category,
  currentProjectTitle,
}) => {
  const { data } = useRelatedProjects(projectId, category);

  if (!data?.length) {
    return <p className="text-center text-muted">Nenhum item relacionado.</p>;
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Projetos Relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((proj: ProjectCardType) => (
          <Link key={proj.id} to={`/projects/${proj.id}`}>
            <ProjectCard project={proj} compact />
          </Link>
        ))}
      </div>
    </section>
  );
};
