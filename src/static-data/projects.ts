// src/static-data/projects.ts (Atualizado para usar MDX do public/)
import { ProjectCard } from '@/types';
import { getAllMDXProjects, getMDXProjectById, searchMDXProjects, getMDXProjectsByCategory } from '@/utils/publicMdxLoader';

// Cache simples para otimização
let cachedProjects: ProjectCard[] | null = null;

// Função principal para obter projetos (agora usando MDX)
export const getStaticProjects = async (): Promise<ProjectCard[]> => {
  if (cachedProjects) {
    return cachedProjects;
  }
  
  console.log('🔄 Loading projects from MDX files...');
  cachedProjects = await getAllMDXProjects();
  return cachedProjects;
};

// Projetos estáticos (mantido para compatibilidade, mas agora vem do MDX)
export let staticProjects: ProjectCard[] = [];

// Inicializar projetos estáticos
const initializeStaticProjects = async () => {
  staticProjects = await getStaticProjects();
};

// Inicializar na importação do módulo
initializeStaticProjects();

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
  cachedProjects = null;
  staticProjects = await getStaticProjects();
};