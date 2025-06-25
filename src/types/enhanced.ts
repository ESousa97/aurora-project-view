
import { ProjectCard, Category } from './index';
import { LanguageColor } from '@/lib/languageColors';

// Projeto enriquecido com informações de linguagem
export interface EnhancedProjectCard extends ProjectCard {
  detectedLanguage: LanguageColor;
  languageMetadata: {
    detectedAt: string;
    confidence: number; // Sempre 100 pois vem do banco
  };
}

// Categoria enriquecida com informações de linguagem
export interface EnhancedCategory extends Category {
  languageConfig: LanguageColor | null;
  projects: EnhancedProjectCard[];
}

// Contexto de linguagem para componentes
export interface LanguageContext {
  projectId: number;
  language: LanguageColor;
  confidence: number;
  category: string;
}
