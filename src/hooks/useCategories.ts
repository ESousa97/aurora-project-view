
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Category, ProjectCard } from '@/types';
import { detectLanguage } from '@/lib/languageColors';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('🔄 useCategories: Starting fetch...');
      const categories = await apiService.getCategories();
      console.log(`✅ useCategories: Retrieved ${categories?.length || 0} categories`);
      
      // Enriquecer categorias com informações de linguagem baseadas nos dados reais do banco
      const enrichedCategories = categories.map(category => {
        // Usar o primeiro projeto da categoria para detectar linguagem
        const sampleProject = category.projects[0];
        const languageConfig = sampleProject ? detectLanguage(sampleProject) : null;
        
        return {
          ...category,
          languageConfig,
          projects: category.projects.map(project => ({
            ...project,
            detectedLanguage: detectLanguage(project) // Linguagem baseada na categoria do banco
          }))
        };
      });
      
      console.log('📂 Categories with language info:', 
        enrichedCategories.map(c => `${c.name} (${c.count} projetos) - ${c.languageConfig?.displayName || 'Unknown'}`));
      
      return enrichedCategories;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

// Hook específico para obter projetos com linguagem detectada baseada nos dados do banco
export const useProjectsWithLanguage = () => {
  return useQuery({
    queryKey: ['projects-with-language'],
    queryFn: async () => {
      console.log('🔄 useProjectsWithLanguage: Starting fetch...');
      
      // Buscar categorias para ter mapeamento ID -> Categoria correto
      const categories = await apiService.getCategories();
      const projects = await apiService.getCards();
      
      // Criar mapa de categoria por ID do projeto
      const categoryMap = new Map<number, string>();
      categories.forEach(category => {
        category.projects.forEach(project => {
          categoryMap.set(project.id, project.categoria);
        });
      });
      
      const enrichedProjects = projects.map(project => {
        // Usar categoria do banco se disponível, senão usar a do projeto
        const correctCategory = categoryMap.get(project.id) || project.categoria;
        const projectWithCorrectCategory = { ...project, categoria: correctCategory };
        
        return {
          ...projectWithCorrectCategory,
          detectedLanguage: detectLanguage(projectWithCorrectCategory),
          languageMetadata: {
            detectedAt: new Date().toISOString(),
            confidence: 100 // 100% pois vem do banco de dados
          }
        };
      });
      
      console.log(`✅ useProjectsWithLanguage: Enriched ${enrichedProjects.length} projects with 100% confidence language data`);
      return enrichedProjects;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
