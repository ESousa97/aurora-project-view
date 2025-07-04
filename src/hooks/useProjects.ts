import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: apiService.getCards,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: apiService.getCategories,
    staleTime: 15 * 60 * 1000,
  });
};

export const useProjectDetails = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => apiService.getProjectDetails(id),
    enabled: !!id,
  });
};

export const useSearchProjects = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => apiService.searchProjects(query),
    enabled: query.length > 2,
  });
};

export const useProjectStats = () => {
  const { data: projects } = useProjects();
  const { data: categories } = useCategories();

  return React.useMemo(() => {
    return {
      totalProjects: projects?.length || 0,
      totalCategories: categories?.length || 0,
      recentProjects: 0,
      mostActiveCategory: null,
      projectsByMonth: [],
      isLoading: !projects || !categories,
    };
  }, [projects, categories]);
};
