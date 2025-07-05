// src/pages/Index.tsx (versão refatorada sem duplicação)
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
  MysteryCompletedSection,
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
  const { revealedProjects, revealProject, isProjectRevealed, clearRevealedProjects } = useRevealedProjects();

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

  // Projetos mistério - LÓGICA ATUALIZADA com timer de 5 minutos
  const mysteryProjects = React.useMemo(() => {
    console.log('🔮 Computing mysteryProjects with 5min timer, projects:', projects?.length || 0);
    if (!projects) {
      console.log('🔮 No projects available for mystery');
      return [];
    }
    
    console.log('🔮 Current revealed projects state:', Array.from(revealedProjects));
    
    // NOVA LÓGICA: Separar projetos em categorias
    const allProjects = projects.map(project => {
      const isCurrentlyRevealed = isProjectRevealed(project.id); // Considera o timer de 5min
      const wasEverRevealed = revealedProjects.has(project.id); // Verifica se já foi revelado alguma vez
      
      console.log(`🔮 Project ${project.id} (${project.titulo}):`, {
        isCurrentlyRevealed,
        wasEverRevealed,
        status: isCurrentlyRevealed ? 'REVEALED ✅' : wasEverRevealed ? 'EXPIRED ⏰' : 'UNREVEALED 🔒'
      });
      
      return {
        ...project,
        isCurrentlyRevealed,
        wasEverRevealed
      };
    });
    
    // Prioridade 1: Projetos atualmente revelados (dentro dos 5 minutos) - SEMPRE mostrar
    const currentlyRevealed = allProjects.filter(p => p.isCurrentlyRevealed);
    
    // Prioridade 2: Projetos nunca revelados - candidatos a mystery
    const neverRevealed = allProjects.filter(p => !p.wasEverRevealed);
    
    // Prioridade 3: Projetos que expiraram (foram revelados mas passaram os 5 minutos) - podem voltar como mystery
    const expired = allProjects.filter(p => p.wasEverRevealed && !p.isCurrentlyRevealed);
    
    console.log('🔮 Mystery project categories:', {
      currentlyRevealed: currentlyRevealed.length,
      neverRevealed: neverRevealed.length,
      expired: expired.length
    });
    
    // Montar lista de projetos mystery (máximo 3)
    let mysterySelection: typeof projects = [];
    
    // 1. SEMPRE incluir projetos atualmente revelados (para mostrar por 5 min)
    mysterySelection.push(...currentlyRevealed.slice(0, 3));
    console.log('🔮 Added currently revealed projects:', currentlyRevealed.length);
    
    // 2. Completar com projetos nunca revelados se houver espaço
    const remainingSlots = 3 - mysterySelection.length;
    if (remainingSlots > 0 && neverRevealed.length > 0) {
      const shuffledNever = neverRevealed
        .sort(() => Math.random() - 0.5) // Embaralhar para variedade
        .slice(0, remainingSlots);
      mysterySelection.push(...shuffledNever);
      console.log('🔮 Added never revealed projects:', shuffledNever.length);
    }
    
    // 3. Se ainda houver espaço, incluir projetos expirados (podem ser re-revelados)
    const finalRemainingSlots = 3 - mysterySelection.length;
    if (finalRemainingSlots > 0 && expired.length > 0) {
      const shuffledExpired = expired
        .sort(() => Math.random() - 0.5) // Embaralhar para variedade
        .slice(0, finalRemainingSlots);
      mysterySelection.push(...shuffledExpired);
      console.log('🔮 Added expired projects:', shuffledExpired.length);
    }
    
    // Garantir máximo de 3 projetos
    mysterySelection = mysterySelection.slice(0, 3);
    
    console.log('🔮 Final mystery selection:', mysterySelection.length, 'projects');
    console.log('🔮 Mystery details:', mysterySelection.map(p => ({
      id: p.id,
      title: p.titulo,
      isRevealed: isProjectRevealed(p.id),
      status: isProjectRevealed(p.id) ? 'REVEALED_ACTIVE' : 'LOCKED'
    })));
    
    return mysterySelection;
  }, [projects, isProjectRevealed, revealedProjects]); // Dependências corretas para re-trigger

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

  // HANDLERS - Seção unificada para todos os callbacks
  const handleProjectReveal = React.useCallback((projectId: number) => {
    console.log('🔓 Revealing mystery project:', projectId);
    revealProject(projectId);
    
    // O projeto agora ficará visível por 5 minutos antes de ser substituído
    console.log('⏰ Project will be visible for 5 minutes before being replaced');
  }, [revealProject]);

  const handleResetDiscoveries = React.useCallback(() => {
    clearRevealedProjects();
    console.log('🔄 User reset all discoveries');
  }, [clearRevealedProjects]);

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
          
          {mysteryProjects.length > 0 ? (
            <MysteryProjectsSection
              projects={mysteryProjects}
              revealedProjects={revealedProjects}
              onProjectReveal={handleProjectReveal}
              isProjectRevealed={isProjectRevealed}
            />
          ) : (
            <MysteryCompletedSection
              onReset={handleResetDiscoveries}
              totalProjects={projects?.length || 0}
            />
          )}
          
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
