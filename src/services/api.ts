// src/services/api.ts
import { ProjectCard, ProjectDetails, Category } from '@/types';
import { 
  getStaticProjects,
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
    console.log('📋 Fetching static project cards...');
    await simulateDelay(200);
    const projects = await getStaticProjects(); // Garante que os projetos MDX sejam carregados
    console.log(`📋 Retrieved ${projects.length} project cards`);
    return [...projects];
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
