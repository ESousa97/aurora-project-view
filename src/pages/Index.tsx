// src/pages/Index.tsx (versão atualizada com indicador)
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useProjectsWithLanguage, useCategories } from '@/hooks/useCategories';
import { StaticModeIndicator } from '@/components/StaticModeIndicator';
import { useRevealedProjects } from '@/hooks/useRevealedProjects';
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
  const { revealedProjects, revealProject, isProjectRevealed } = useRevealedProjects();

  // Debug logs
  console.log('🏠 Index: projects data:', projects?.length || 0, projects);
  console.log('🏠 Index: projectsLoading:', projectsLoading);
  console.log('🏠 Index: categories data:', categories?.length || 0);
  console.log('🏠 Index: React Query state check');

  // Force render log
  React.useEffect(() => {
    console.log('🏠 Index: Effect - projects changed:', projects?.length || 0);
    console.log('🏠 Index: Effect - categories changed:', categories?.length || 0);
  }, [projects, categories]);

  // Projetos em destaque (mais recentes e interessantes)
  const featuredProjects = React.useMemo(() => {
    if (!projects) return [];
    
    console.log('⭐ Computing featuredProjects, total projects:', projects.length);
    
    const recentProjects = projects.filter(project => 
      project.data_modificacao && isWithinInterval(new Date(project.data_modificacao), {
        start: subDays(new Date(), 14),
        end: new Date()
      })
    );

    console.log('⭐ Recent projects (last 14 days):', recentProjects.length);

    const sourceProjects = recentProjects.length > 0 ? recentProjects : projects;
    console.log('⭐ Source projects for featured selection:', sourceProjects.length);

    // Limitar a apenas 1 projeto featured para deixar outros para mystery
    const featured = sourceProjects
      .sort((a, b) => new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime())
      .slice(0, 1) as ProjectType[];
      
    console.log('⭐ Final featured projects:', featured.length, featured.map(p => p.titulo));
    return featured;
  }, [projects]);

  // Projetos mistério para descoberta - todos os projetos, mas mostrados como revelados ou não baseado no localStorage
  const mysteryProjects = React.useMemo(() => {
    console.log('🔮 Computing mysteryProjects, projects:', projects?.length || 0);
    if (!projects) {
      console.log('🔮 No projects available for mystery');
      return [];
    }
    
    // Mostrar todos os projetos como mystery (alguns já revelados, outros não)
    const mystery = projects
      .sort(() => Math.random() - 0.5)
      .slice(0, 6) as ProjectType[]; // Máximo 6 projetos na seção mistério
    
    console.log('🔮 Final mystery projects:', mystery.length, mystery.map(p => p.titulo));
    console.log('🔮 Revealed status:', mystery.map(p => `${p.titulo}: ${isProjectRevealed(p.id) ? 'REVEALED' : 'HIDDEN'}`));
    return mystery;
  }, [projects, isProjectRevealed]);

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
    revealProject(projectId);
  }, [revealProject]);

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
            revealedProjects={revealedProjects}
            onProjectReveal={handleProjectReveal}
            isProjectRevealed={isProjectRevealed}
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
