// src/services/api.ts
import { ProjectCard, ProjectDetails, Category } from '@/types';
import { 
  staticProjects, 
  getProjectById, 
  getProjectsByCategory,
  searchProjects as staticSearchProjects,
  combinedCategories,
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
    console.log(`📋 Retrieved ${staticProjects.length} project cards`);
    return [...staticProjects];
  },

  // Search projects
  searchProjects: async (query: string): Promise<ProjectCard[]> => {
    console.log(`🔍 Searching projects with query: "${query}"`);
    await simulateDelay(150);
    const results = staticSearchProjects(query);
    console.log(`🔍 Found ${results.length} projects matching "${query}"`);
    return results;
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    console.log('📂 Fetching static categories...');
    await simulateDelay(100);
    console.log(`📂 Retrieved ${combinedCategories.length} categories`);
    return [...combinedCategories];
  },

  // Get project details
  getProjectDetails: async (id: string): Promise<ProjectDetails> => {
    console.log(`📄 Fetching project details for ID: ${id}`);
    await simulateDelay(300);
    
    const project = getProjectById(parseInt(id));
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
