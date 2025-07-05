// src/services/api.ts
import { ProjectCard, ProjectDetails, Category } from '@/types';
import { 
  getStaticProjects,
  initializeStaticProjects,
  getProjectById, 
  getProjectsByCategory,
  searchProjects as staticSearchProjects,
  getAllCategories,
  getCategoryByName
} from '@/static-data';

// Simular delay de rede para tornar mais realista
const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

// API functions usando dados estáticos
export const apiService = {
  // Get all project cards
  getCards: async (): Promise<ProjectCard[]> => {
    console.log('🎯 API: getCards() called - forcing fresh initialization');
    await simulateDelay(200);
    
    try {
      // Força uma nova inicialização para garantir que os dados estão atualizados
      const projects = await initializeStaticProjects();
      console.log(`🎯 API: Retrieved ${projects?.length || 0} projects from initialization`);
      
      if (!projects || projects.length === 0) {
        console.warn('⚠️ API: No projects returned from initializeStaticProjects');
        // Tenta fallback
        const fallbackProjects = await getStaticProjects();
        console.log(`🔄 API: Fallback retrieved ${fallbackProjects?.length || 0} projects`);
        return fallbackProjects || [];
      }
      
      console.log('📝 API: Project titles:', projects.map(p => `${p.titulo} (${p.categoria})`));
      return [...projects];
    } catch (error) {
      console.error('❌ API: Error in getCards:', error);
      return [];
    }
  },

  // Search projects
  searchProjects: async (query: string): Promise<ProjectCard[]> => {
    console.log(`🔍 Searching projects with query: "${query}"`);
    await simulateDelay(150);
    const results = await staticSearchProjects(query);
    console.log(`🔍 Found ${results.length} projects matching "${query}"`);
    return results;
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    console.log('📂 Fetching static categories...');
    await simulateDelay(100);
    const categories = await getAllCategories();
    console.log(`📂 Retrieved ${categories.length} categories`);
    return [...categories];
  },

  // Get project details
  getProjectDetails: async (id: string): Promise<ProjectDetails> => {
    console.log(`📄 Fetching project details for ID: ${id}`);
    await simulateDelay(300);
    
    const project = await getProjectById(parseInt(id));
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    console.log(`📄 Retrieved details for project: ${project.titulo}`);
    return project;
  },

  // Keep-alive ping (não necessário para estático, mas mantido para compatibilidade)
  ping: async (): Promise<boolean> => {
    console.log('🏓 Static mode - always alive!');
    return true;
  },
};

// Keep-alive service (não necessário para estático)
export const keepAliveService = {
  start: () => {
    console.log('🚀 Static mode - no keep-alive needed');
    return () => {
      console.log('🛑 Static mode - nothing to stop');
    };
  },
};
