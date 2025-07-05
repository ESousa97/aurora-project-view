// src/static-data/projects.ts (Simplificado para usar diretamente MDX)
import { ProjectCard } from '@/types';
import { getAllMDXProjects, getMDXProjectById, searchMDXProjects, getMDXProjectsByCategory } from '@/utils/publicMdxLoader';

// Função principal simplificada - usa diretamente getAllMDXProjects
export const getStaticProjects = async (): Promise<ProjectCard[]> => {
  console.log('🔄 getStaticProjects: Direct call to getAllMDXProjects');
  return await getAllMDXProjects();
};

// Projetos estáticos inicializados de forma síncrona
export let staticProjects: ProjectCard[] = [];

// Função para inicializar projetos (chamada pelos hooks quando necessário)
export const initializeStaticProjects = async (): Promise<ProjectCard[]> => {
  console.log('🚀 initializeStaticProjects: Initializing...');
  try {
    staticProjects = await getAllMDXProjects();
    console.log(`✅ initializeStaticProjects: Loaded ${staticProjects.length} projects`);
    return staticProjects;
  } catch (error) {
    console.error('❌ initializeStaticProjects: Error:', error);
    return [];
  }
};

// Funções auxiliares (atualizadas para usar MDX)
export const getProjectById = async (id: number): Promise<ProjectCard | null> => {
  return await getMDXProjectById(id);
};

export const getProjectsByCategory = async (categoria: string): Promise<ProjectCard[]> => {
  return await getMDXProjectsByCategory(categoria);
};

export const searchProjects = async (query: string): Promise<ProjectCard[]> => {
  if (!query.trim()) {
    return await getStaticProjects();
  }
  return await searchMDXProjects(query);
};

// Função para forçar recarregamento do cache
export const reloadProjects = async (): Promise<void> => {
  staticProjects = await getStaticProjects();
};