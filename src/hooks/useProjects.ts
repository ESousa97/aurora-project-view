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
