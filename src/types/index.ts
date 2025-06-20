
export interface ProjectCard {
  id: string;
  titulo: string;
  descricao: string;
  imageurl: string;
  data_criacao: string;
  data_modificacao: string;
  categoria: string;
}

export interface ProjectDetails extends ProjectCard {
  conteudo: string;
}

export interface Category {
  name: string;
  count: number;
  projects: ProjectCard[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  sortBy: 'date' | 'title' | 'category';
  sortOrder: 'asc' | 'desc';
}

export type ViewMode = 'grid' | 'list' | 'compact' | 'timeline';
export type Theme = 'light' | 'dark' | 'system';
