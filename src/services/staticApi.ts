// src/services/staticApi.ts
import { ProjectCard, ProjectDetails, Category } from '@/types';
import { markdownProjectService } from './markdownProjectService';

// Simular delays de rede para manter a experiência
const simulateDelay = (min = 50, max = 200) =>
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// API Service completamente estático
export const apiService = {
  // Buscar todos os projetos
  getCards: async (): Promise<ProjectCard[]> => {
    console.log('📋 Carregando projetos locais...');
    await simulateDelay();
    
    const projects = await markdownProjectService.getProjects();
    console.log(`✅ ${projects.length} projetos carregados`);
    
    return projects;
  },

  // Buscar projeto específico
  getProjectDetails: async (id: string): Promise<ProjectDetails> => {
    console.log(`📄 Carregando detalhes do projeto ${id}...`);
    await simulateDelay();
    
    const project = await markdownProjectService.getProject(id);
    
    if (!project) {
      throw new Error(`Projeto ${id} não encontrado`);
    }
    
    console.log(`✅ Projeto "${project.titulo}" carregado`);
    return project;
  },

  // Buscar categorias
  getCategories: async (): Promise<Category[]> => {
    console.log('📂 Carregando categorias...');
    await simulateDelay();
    
    const categories = await markdownProjectService.getCategories();
    console.log(`✅ ${categories.length} categorias carregadas`);
    
    return categories;
  },

  // Buscar projetos
  searchProjects: async (query: string): Promise<ProjectCard[]> => {
    console.log(`🔍 Buscando projetos: "${query}"...`);
    await simulateDelay(100, 300);
    
    const results = await markdownProjectService.searchProjects(query);
    console.log(`✅ ${results.length} resultados encontrados`);
    
    return results;
  },

  // Criar novo projeto
  createProject: async (project: Omit<ProjectCard, 'id' | 'data_criacao' | 'data_modificacao'>): Promise<ProjectCard> => {
    console.log('➕ Criando novo projeto...');
    await simulateDelay();
    
    const newProject = await markdownProjectService.createProject(project);
    console.log(`✅ Projeto "${newProject.titulo}" criado com sucesso`);
    
    return newProject;
  },

  // Atualizar projeto
  updateProject: async (id: string, updates: Partial<ProjectCard>): Promise<ProjectCard> => {
    console.log(`✏️ Atualizando projeto ${id}...`);
    await simulateDelay();
    
    const updated = await markdownProjectService.updateProject(id, updates);
    
    if (!updated) {
      throw new Error(`Projeto ${id} não encontrado`);
    }
    
    console.log(`✅ Projeto atualizado com sucesso`);
    return updated;
  },

  // Deletar projeto
  deleteProject: async (id: string): Promise<boolean> => {
    console.log(`🗑️ Deletando projeto ${id}...`);
    await simulateDelay();
    
    const success = await markdownProjectService.deleteProject(id);
    
    if (success) {
      console.log('✅ Projeto deletado com sucesso');
    } else {
      console.log('❌ Falha ao deletar projeto');
    }
    
    return success;
  },

  // Ping (mantido por compatibilidade)
  ping: async (): Promise<boolean> => {
    console.log('🏓 Sistema local - sempre online');
    await simulateDelay(10, 50);
    return true;
  }
};

// Keep-alive service (não necessário para versão local, mas mantido por compatibilidade)
export const keepAliveService = {
  start: () => {
    console.log('🚀 Sistema local - sem necessidade de keep-alive');
    return () => {
      console.log('🛑 Keep-alive finalizado');
    };
  }
};
