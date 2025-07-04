import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { HeroSection } from '@/components';
import { Link } from 'react-router-dom';
import { ProjectCard } from '@/components/project/ProjectCard';

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const stats = {
    total: projects?.length || 0,
    categories: categories?.length || 0,
    languages: 5,
    recent: 2,
  };

  if (projectsLoading || categoriesLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-20">
        <HeroSection stats={stats} />

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Projetos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Ver Todos os Projetos
            </Link>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Explore por Categoria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.map(category => (
              <Link
                key={category.name}
                to={`/projects?category=${category.name}`}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-muted-foreground">{category.count} projetos</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
