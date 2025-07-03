// src/services/staticApiService.ts - Serviço que simula API com dados estáticos
import { ProjectCard, ProjectDetails, Category } from '@/types';
import { staticProjects, staticCategories } from '@/data/staticData';

// Simular delays de API para manter UX consistente
const simulateNetworkDelay = (min = 50, max = 200) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// API estática compatível com a interface original
export const staticApiService = {
  // Get all project cards
  getCards: async (): Promise<ProjectCard[]> => {
    console.log('📋 Loading static project cards...');
    await simulateNetworkDelay();
    console.log(`📋 Retrieved ${staticProjects?.length || 0} static project cards`);
    return staticProjects;
  },

  // Search projects
  searchProjects: async (query: string): Promise<ProjectCard[]> => {
    console.log(`🔍 Searching static projects with query: \"${query}\"`);
    await simulateNetworkDelay(100, 300);
    
    const filtered = staticProjects.filter(project => 
      project.titulo?.toLowerCase().includes(query.toLowerCase()) ||
      project.descricao?.toLowerCase().includes(query.toLowerCase()) ||
      project.categoria?.toLowerCase().includes(query.toLowerCase())
    );
    
    console.log(`🔍 Found ${filtered.length} projects matching \"${query}\"`);
    return filtered;
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    console.log('📂 Loading static categories...');
    await simulateNetworkDelay();
    console.log(`📂 Retrieved ${staticCategories?.length || 0} static categories`);
    return staticCategories;
  },

  // Get project details
  getProjectDetails: async (id: string): Promise<ProjectDetails | undefined> => {
    console.log(`📄 Loading static project details for ID: ${id}`);
    await simulateNetworkDelay();
    
    const project = staticProjects.find(p => p.id.toString() === id);
    if (project) {
      console.log(`📄 Retrieved details for project: ${project.titulo}`);
    } else {
      console.warn(`📄 Project with ID ${id} not found in static data`);
    }
    
    return project;
  },

  // Keep-alive ping (agora apenas para compatibilidade)
  ping: async (): Promise<boolean> => {
    console.log('🏓 Static mode - ping simulation...');
    await simulateNetworkDelay(10, 50);
    console.log('🏓 Static ping: Success ✅');
    return true;
  },
};

// Keep-alive service simulado
export const staticKeepAliveService = {
  start: () => {
    console.log('🚀 Static mode - keep-alive service started (simulation only)');
    
    // Retornar função de cleanup vazia
    return () => {
      console.log('🛑 Static mode - keep-alive service stopped');
    };
  },
};
