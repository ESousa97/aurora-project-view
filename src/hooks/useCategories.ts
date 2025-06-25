
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
      
      // Enriquecer categorias com informações de linguagem
      const enrichedCategories = categories.map(category => ({
        ...category,
        languageConfig: category.projects.length > 0 
          ? detectLanguage(category.projects[0])
          : null,
        projects: category.projects.map(project => ({
          ...project,
          detectedLanguage: detectLanguage(project)
        }))
      }));
      
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

// Hook específico para obter projetos com linguagem detectada
export const useProjectsWithLanguage = () => {
  return useQuery({
    queryKey: ['projects-with-language'],
    queryFn: async () => {
      console.log('🔄 useProjectsWithLanguage: Starting fetch...');
      const projects = await apiService.getCards();
      
      const enrichedProjects = projects.map(project => ({
        ...project,
        detectedLanguage: detectLanguage(project),
        languageMetadata: {
          detectedAt: new Date().toISOString(),
          confidence: calculateLanguageConfidence(project)
        }
      }));
      
      console.log(`✅ useProjectsWithLanguage: Enriched ${enrichedProjects.length} projects with language data`);
      return enrichedProjects;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Função para calcular confiança na detecção de linguagem
function calculateLanguageConfidence(project: ProjectCard): number {
  if (!project) return 0;
  
  const hasTitle = Boolean(project.titulo?.trim());
  const hasDescription = Boolean(project.descricao?.trim());
  const hasCategory = Boolean(project.categoria?.trim());
  const hasContent = Boolean(project.conteudo?.trim());
  
  let confidence = 0;
  if (hasTitle) confidence += 25;
  if (hasDescription) confidence += 35;
  if (hasCategory) confidence += 25;
  if (hasContent) confidence += 15;
  
  return Math.min(confidence, 100);
}
