import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Category, ProjectCard } from '@/types';
import { detectLanguage, getCategoryColor } from '@/lib/languageColors';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('🔄 useCategories: Starting fetch...');
      const categories = await apiService.getCategories();
      console.log(`✅ useCategories: Retrieved ${categories?.length || 0} categories`);
      
      // SINCRONIZAÇÃO: Enriquecer categorias com informações de linguagem consistentes
      const enrichedCategories = categories.map(category => {
        // Buscar um projeto representativo da categoria para detectar linguagem
        const sampleProject = category.projects[0];
        
        // Usar detecção baseada no projeto real se disponível
        const languageConfig = sampleProject 
          ? detectLanguage(sampleProject) 
          : getCategoryColor(category.name);
        
        return {
          ...category,
          languageConfig,
          projects: category.projects.map(project => ({
            ...project,
            detectedLanguage: detectLanguage(project) // Garantir que cada projeto tenha linguagem detectada
          }))
        };
      });
      
      console.log('📂 Categories with synchronized language info:', 
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
        
        // SINCRONIZAÇÃO: Garantir detecção consistente da linguagem
        const detectedLanguage = detectLanguage(projectWithCorrectCategory);
        
        return {
          ...projectWithCorrectCategory,
          detectedLanguage,
          languageMetadata: {
            detectedAt: new Date().toISOString(),
            confidence: 100 // 100% pois vem do banco de dados
          }
        };
      });
      
      console.log(`✅ useProjectsWithLanguage: Enriched ${enrichedProjects.length} projects with synchronized language data`);
      
      // Log de exemplo das linguagens detectadas
      const languageCounts = enrichedProjects.reduce((acc, project) => {
        const lang = project.detectedLanguage.displayName;
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('🔧 Language distribution:', Object.entries(languageCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([lang, count]) => `${lang}: ${count}`)
        .join(', '));
      
      return enrichedProjects;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
