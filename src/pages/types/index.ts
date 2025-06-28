// src/pages/types/index.ts

export interface ProjectType {
  id: number;
  titulo?: string;
  nome?: string;
  descricao?: string;
  data_modificacao: string;
  data_criacao: string;
  detectedLanguage: {
    name: string;
    gradient: string;
    color: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  categoria?: string;
  conteudo?: string;
  imageurl?: string;
}

export interface CategoryType {
  name: string;
  count: number;
  projects?: ProjectType[];
}

export interface StatsType {
  total: number;
  categories: number;
  languages: number;
  recent: number;
}

export interface EnhancedProjectCardProps {
  project: ProjectType;
  variant?: 'featured' | 'mystery';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}
