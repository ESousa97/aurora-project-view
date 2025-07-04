// src/pages/Index.tsx (versão atualizada com indicador)
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useProjectsWithLanguage, useCategories } from '@/hooks/useCategories';
import { StaticModeIndicator } from '@/components/StaticModeIndicator';
import { isWithinInterval, subDays } from 'date-fns';

// Importações dos componentes modulares
import {
  HeroSection,
  StatsSection,
  FeaturedProjectsSection,
  MysteryProjectsSection,
  CategoriesSection,
  CallToActionSection,
  LoadingState,
  EmptyState
} from './components';

// Types
import { ProjectType } from './types';

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjectsWithLanguage();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [discoveredProjects, setDiscoveredProjects] = React.useState<Set<number>>(new Set());

  // Projetos em destaque (mais recentes e interessantes)
  const featuredProjects = React.useMemo(() => {
    if (!projects) return [];
    
    const recentProjects = projects.filter(project => 
      project.data_modificacao && isWithinInterval(new Date(project.data_modificacao), {
        start: subDays(new Date(), 14),
        end: new Date()
      })
    );

    const sourceProjects = recentProjects.length > 0 ? recentProjects : projects;

    return sourceProjects
      .sort((a, b) => new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime())
      .slice(0, 3) as ProjectType[];
  }, [projects]);

  // Projetos mistério para descoberta
  const mysteryProjects = React.useMemo(() => {
    if (!projects) return [];
    return projects
      .filter(p => !featuredProjects.some(fp => fp.id === p.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3) as ProjectType[];
  }, [projects, featuredProjects]);

  // Estatísticas dinâmicas
  const stats = React.useMemo(() => {
    if (!projects || !categories) {
      return { total: 0, categories: 0, languages: 0, recent: 0 };
    }

    const uniqueLanguages = new Set();
    let recentCount = 0;

    projects.forEach(project => {
      const language = project.detectedLanguage;
      uniqueLanguages.add(language.name);
      
      if (project.data_modificacao && isWithinInterval(new Date(project.data_modificacao), {
        start: subDays(new Date(), 7),
        end: new Date()
      })) {
        recentCount++;
      }
    });

    return {
      total: projects.length,
      categories: categories.length,
      languages: uniqueLanguages.size,
      recent: recentCount
    };
  }, [projects, categories]);

  const handleProjectReveal = React.useCallback((projectId: number) => {
    setDiscoveredProjects(prev => new Set([...prev, projectId]));
  }, []);

  // Estados de carregamento e vazio
  if (projectsLoading || categoriesLoading) {
    return <LoadingState />;
  }

  if (!projects || !categories || projects.length === 0) {
    return <EmptyState />;
  }

  return (
    <AppLayout>
      <div className="">
        <div className="space-y-20">
          <HeroSection stats={stats} />
          
          <StatsSection stats={stats} />
          
          <FeaturedProjectsSection 
            projects={featuredProjects}
          />
          
          <MysteryProjectsSection
            projects={mysteryProjects}
            discoveredProjects={discoveredProjects}
            onProjectReveal={handleProjectReveal}
          />
          
          <CategoriesSection categories={categories} />
          
          <CallToActionSection />
        </div>
      </div>
      
      {/* Indicador de Modo Estático */}
      <StaticModeIndicator />
    </AppLayout>
  );
};

export default Index;
