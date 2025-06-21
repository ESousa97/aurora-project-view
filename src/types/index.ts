// Types baseados na estrutura real do banco de dados
export interface ProjectCard {
  id: number; // No banco é integer, não string
  titulo: string;
  descricao: string;
  imageurl: string;
  data_criacao: string; // timestamp with time zone
  data_modificacao: string; // timestamp with time zone  
  categoria: string;
  conteudo: string; // Campo existe na tabela principal
}

// ProjectDetails é um alias para ProjectCard já que todos os campos estão na tabela principal
export type ProjectDetails = ProjectCard;

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
