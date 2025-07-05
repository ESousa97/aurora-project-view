// src/pages/types/index.ts

import { LanguageColor } from '@/lib/languageColors';

export interface ProjectType {
  id: number;
  titulo: string;
  nome?: string;
  descricao: string;
  data_modificacao: string;
  data_criacao: string;
  detectedLanguage: LanguageColor;
  categoria: string;
  conteudo: string;
  imageurl: string;
  languageMetadata: {
    detectedAt: string;
    confidence: number;
  };
}

export interface CategoryType {
  name: string;
  count: number;
  projects?: ProjectType[];
  languageConfig?: LanguageColor;
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
