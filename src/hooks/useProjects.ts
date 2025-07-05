// src/hooks/useProjects.ts - Versão Melhorada
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { ProjectCard, ProjectDetails, Category } from '@/types';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      console.log('🔄 useProjects: Starting fetch...');
      const projects = await apiService.getCards();
      console.log(`✅ useProjects: Retrieved ${projects?.length || 0} projects`);
      return projects;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useProjectDetails = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      console.log(`🔄 useProjectDetails: Fetching project ${id}...`);
      const project = await apiService.getProjectDetails(id);
      console.log(`✅ useProjectDetails: Retrieved project "${project?.titulo}"`);
      return project;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('🔄 useCategories: Starting fetch...');
      const categories = await apiService.getCategories();
      console.log(`✅ useCategories: Retrieved ${categories?.length || 0} categories`);
      
      // Log categorias para debug
      if (categories && categories.length > 0) {
        console.log('📂 Categories summary:', categories.map(cat => ({
          name: cat.name,
          count: cat.count
        })));
      }
      
      return categories;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

export const useSearchProjects = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      console.log(`🔄 useSearchProjects: Searching for "${query}"...`);
      const results = await apiService.searchProjects(query);
      console.log(`✅ useSearchProjects: Found ${results?.length || 0} results`);
      return results;
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
      
      // Get all projects and filter by category, excluding current project
      const allProjects = await apiService.getCards();
      const related = allProjects
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

// New hook for project statistics
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

// Hook para stack categories (nova funcionalidade moderna)
export const useStackCategories = () => {
  return useQuery({
    queryKey: ['stack-categories'],
    queryFn: async () => {
      console.log('🔄 useStackCategories: Loading stack-based categories...');
      const { getStackCategories } = await import('@/utils/stackCategorization');
      const stackCategories = await getStackCategories();
      console.log(`✅ useStackCategories: Retrieved ${stackCategories?.length || 0} stack categories`);
      
      // Log stack categories para debug
      if (stackCategories && stackCategories.length > 0) {
        console.log('🏗️ Stack Categories summary:', stackCategories.map(stack => ({
          name: stack.name,
          type: stack.type,
          count: stack.count,
          technologies: stack.technologies
        })));
      }
      
      return stackCategories;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
    retryDelay: 1500,
  });
};
