// src/hooks/useProjects.ts - Versão com Dados Estáticos
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { staticProjects, staticCategories } from '@/data/staticData';
import { ProjectCard, ProjectDetails, Category } from '@/types';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      console.log('🔄 useProjects: Loading static data...');
      // Simular delay de API para manter consistência
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log(`✅ useProjects: Retrieved ${staticProjects?.length || 0} projects`);
      return staticProjects;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Reduzido já que são dados estáticos
  });
};

export const useProjectDetails = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      console.log(`🔄 useProjectDetails: Loading static project ${id}...`);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 50));
      const project = staticProjects.find(p => p.id.toString() === id);
      console.log(`✅ useProjectDetails: Retrieved project "${project?.titulo}"`);
      return project;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('🔄 useCategories: Loading static categories...');
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 50));
      console.log(`✅ useCategories: Retrieved ${staticCategories?.length || 0} categories`);
      
      // Log categorias para debug
      if (staticCategories && staticCategories.length > 0) {
        console.log('📂 Categories summary:', staticCategories.map(cat => ({
          name: cat.name,
          count: cat.count
        })));
      }
      
      return staticCategories;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 1,
  });
};

export const useSearchProjects = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      console.log(`🔄 useSearchProjects: Searching static data for "${query}"...`);
      // Simular delay de busca
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const filtered = staticProjects.filter(project => 
        project.titulo?.toLowerCase().includes(query.toLowerCase()) ||
        project.descricao?.toLowerCase().includes(query.toLowerCase()) ||
        project.categoria?.toLowerCase().includes(query.toLowerCase())
      );
      
      console.log(`✅ useSearchProjects: Found ${filtered?.length || 0} results`);
      return filtered;
    },
    enabled: query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

// New hook for related projects
export const useRelatedProjects = (projectId: string, category: string) => {
  return useQuery({
    queryKey: ['related-projects', projectId, category],
    queryFn: async () => {
      console.log(`🔄 useRelatedProjects: Finding related projects for ${projectId} in category ${category}...`);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Filtrar projetos estáticos por categoria, excluindo o atual
      const related = staticProjects
        .filter(project => 
          project.categoria === category && 
          project.id.toString() !== projectId
        )
        .slice(0, 5); // Limit to 5 related projects
      
      console.log(`✅ useRelatedProjects: Found ${related.length} related projects`);
      return related;
    },
    enabled: !!projectId && !!category,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};

// Hook para estatísticas dos projetos (usando dados estáticos)
export const useProjectStats = () => {
  const { data: projects } = useProjects();
  const { data: categories } = useCategories();

  return React.useMemo(() => {
    if (!projects || !categories) {
      return {
        totalProjects: 0,
        totalCategories: 0,
        recentProjects: 0,
        mostActiveCategory: null,
        projectsByMonth: [],
        isLoading: true
      };
    }

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const recentProjects = projects.filter(p => new Date(p.data_modificacao) > lastMonth);

    // Calculate projects by month for the last 6 months
    const projectsByMonth = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const projectsInMonth = projects.filter(project => {
        const projectDate = new Date(project.data_modificacao);
        return projectDate >= monthDate && projectDate < nextMonth;
      });

      projectsByMonth.push({
        month: monthDate.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
        count: projectsInMonth.length
      });
    }

    const mostActiveCategory = categories[0] || null;

    return {
      totalProjects: projects.length,
      totalCategories: categories.length,
      recentProjects: recentProjects.length,
      mostActiveCategory,
      projectsByMonth,
      isLoading: false
    };
  }, [projects, categories]);
};
