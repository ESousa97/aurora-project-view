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
