import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
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
}) => {
  const { data: projects } = useProjects();

  const related = React.useMemo(() => {
    if (!projects) return [];
    return projects.filter(
      p => p.categoria === category && p.id.toString() !== projectId
    ).slice(0, 5);
  }, [projects, category, projectId]);

  if (!related.length) {
    return <p className="text-center text-muted">Nenhum item relacionado.</p>;
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Projetos Relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((proj: ProjectCardType) => (
          <Link key={proj.id} to={`/projects/${proj.id}`}>
            <ProjectCard project={proj} compact />
          </Link>
        ))}
      </div>
    </section>
  );
};
