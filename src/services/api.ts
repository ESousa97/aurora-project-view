import axios from 'axios';
import { ProjectCard, ProjectDetails, Category } from '@/types';

const API_BASE_URL = 'https://serverdatabase.onrender.com/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received from ${response.config.url}:`, response.status);
    console.log('📊 Data preview:', Array.isArray(response.data) ? `Array with ${response.data.length} items` : typeof response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    console.error('🔍 Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url
    });
    
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout - server might be sleeping');
    } else if (!error.response) {
      console.error('🌐 Network error - server might be down or sleeping');
    }
    
    return Promise.reject(error);
  }
);

// Função para processar dados de categorias do servidor com linguagens
const processCategoriesFromServer = (serverData: Array<{id: number, titulo: string, categoria: string}>): Category[] => {
  console.log('📂 Processing categories from server data with language detection...');
  console.log('📊 Server data sample:', serverData.slice(0, 3));
  
  const categoryMap = new Map<string, Array<{id: number, titulo: string, categoria: string}>>();
  
  // Agrupar projetos por categoria
  serverData.forEach(project => {
    const categoryName = project.categoria?.trim();
    if (categoryName) {
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, []);
      }
      categoryMap.get(categoryName)?.push(project);
    }
  });
  
  // Converter para formato Category com detecção de linguagem
  const categories = Array.from(categoryMap.entries()).map(([name, projects]) => ({
    name,
    count: projects.length,
    projects: projects.map(p => {
      const baseProject = {
        id: p.id,
        titulo: p.titulo,
        categoria: p.categoria,
        descricao: '', // Será preenchido quando necessário
        imageurl: '',
        data_criacao: '',
        data_modificacao: '',
        conteudo: ''
      } as ProjectCard;
      
      return baseProject;
    })
  }));
  
  // Ordenar categorias por quantidade de projetos (decrescente)
  categories.sort((a, b) => b.count - a.count);
  
  console.log(`📂 Processed ${categories.length} categories with language mapping:`, 
    categories.map(c => `${c.name} (${c.count} projetos)`));
  
  return categories;
};

// Função para gerar categorias a partir dos projetos completos (fallback)
const generateCategoriesFromProjects = (projects: ProjectCard[]): Category[] => {
  console.log('📂 Generating categories from full projects (fallback)...');
  
  const categoryMap = new Map<string, ProjectCard[]>();
  
  projects.forEach(project => {
    const categoryName = project.categoria?.trim();
    if (categoryName) {
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, []);
      }
      categoryMap.get(categoryName)?.push(project);
    }
  });
  
  const categories = Array.from(categoryMap.entries()).map(([name, projectsInCategory]) => ({
    name,
    count: projectsInCategory.length,
    projects: projectsInCategory
  }));
  
  // Ordenar categorias por quantidade de projetos (decrescente)
  categories.sort((a, b) => b.count - a.count);
  
  console.log(`📂 Generated ${categories.length} categories from fallback:`, 
    categories.map(c => `${c.name} (${c.count})`));
  
  return categories;
};

// API functions
export const apiService = {
  // Get all project cards
  getCards: async (): Promise<ProjectCard[]> => {
    console.log('📋 Fetching project cards...');
    const response = await api.get('/cards');
    console.log(`📋 Retrieved ${response.data?.length || 0} project cards`);
    
    // Log sample data to understand structure
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const sampleProject = response.data[0];
      if (sampleProject && typeof sampleProject === 'object') {
        console.log('📋 Sample project structure:', {
          id: sampleProject.id,
          titulo: sampleProject.titulo,
          categoria: sampleProject.categoria,
          data_criacao: sampleProject.data_criacao,
          hasAllFields: !!(sampleProject.id && sampleProject.titulo && sampleProject.categoria)
        });
      }
    }
    
    return response.data;
  },

  // Search projects
  searchProjects: async (query: string): Promise<ProjectCard[]> => {
    console.log(`🔍 Searching projects with query: "${query}"`);
    try {
      const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
      console.log(`🔍 Found ${response.data.length} projects matching "${query}"`);
      return response.data;
    } catch (error) {
      console.warn('🔍 Search endpoint failed, falling back to client-side search');
      // Fallback: buscar todos os projetos e filtrar no cliente
      const allProjects = await apiService.getCards();
      const filtered = allProjects.filter(project => 
        project.titulo?.toLowerCase().includes(query.toLowerCase()) ||
        project.descricao?.toLowerCase().includes(query.toLowerCase()) ||
        project.categoria?.toLowerCase().includes(query.toLowerCase())
      );
      console.log(`🔍 Client-side search found ${filtered.length} projects`);
      return filtered;
    }
  },

  // Get categories - usa endpoint específico do servidor
  getCategories: async (): Promise<Category[]> => {
    console.log('📂 Fetching categories from server...');
    
    try {
      // Tentar usar endpoint de categorias primeiro
      const response = await api.get('/categories');
      console.log(`📂 Server returned ${response.data?.length || 0} category entries`);
      
      if (response.data && Array.isArray(response.data)) {
        return processCategoriesFromServer(response.data);
      } else {
        throw new Error('Invalid categories response format');
      }
    } catch (error) {
      console.warn('📂 Categories endpoint failed, falling back to generating from projects');
      console.error('Categories endpoint error:', error);
      
      // Fallback: gerar categorias a partir dos projetos
      const projects = await apiService.getCards();
      return generateCategoriesFromProjects(projects);
    }
  },

  // Get project details
  getProjectDetails: async (id: string): Promise<ProjectDetails> => {
    console.log(`📄 Fetching project details for ID: ${id}`);
    const response = await api.get(`/projects/${id}`);
    console.log(`📄 Retrieved details for project: ${response.data.titulo}`);
    return response.data;
  },

  // Keep-alive ping
  ping: async (): Promise<boolean> => {
    try {
      console.log('🏓 Pinging server...');
      const response = await api.get('/ping');
      const isAlive = response.status === 200;
      console.log(`🏓 Server ping: ${isAlive ? 'Success ✅' : 'Failed ❌'}`);
      return isAlive;
    } catch (error) {
      console.log('🏓 Server ping: Failed ❌');
      return false;
    }
  },

  // Enhanced getCards method with language detection
  getCardsWithLanguage: async (): Promise<ProjectCard[]> => {
    console.log('📋 Fetching project cards with language detection...');
    const response = await api.get('/cards');
    console.log(`📋 Retrieved ${response.data?.length || 0} project cards for language processing`);
    
    // Log sample data to understand structure
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const sampleProject = response.data[0];
      if (sampleProject && typeof sampleProject === 'object') {
        console.log('📋 Sample project structure for language detection:', {
          id: sampleProject.id,
          titulo: sampleProject.titulo,
          categoria: sampleProject.categoria,
          descricao: sampleProject.descricao?.substring(0, 50) + '...',
          hasLanguageData: !!(sampleProject.titulo && sampleProject.categoria)
        });
      }
    }
    
    return response.data;
  },
};

// Keep-alive service
export const keepAliveService = {
  start: () => {
    console.log('🚀 Starting keep-alive service...');
    
    // Initial ping
    apiService.ping();
    
    // Ping every 5 minutes when user is active
    const pingInterval = setInterval(async () => {
      if (document.visibilityState === 'visible') {
        await apiService.ping();
      }
    }, 5 * 60 * 1000);

    return () => {
      console.log('🛑 Stopping keep-alive service...');
      clearInterval(pingInterval);
    };
  },
};
