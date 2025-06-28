// src/lib/languageColors/index.ts
import { LanguageColor, TechnologyCategory } from './types';
import { LANGUAGE_COLORS } from './configs';
import { 
  detectMultipleTechnologies, 
  detectSingleTechnology, 
  createCombinedGradient,
  createMultiLanguageStyle 
} from './detectionUtils';

// Export types
export type { LanguageColor, TechnologyCategory };

// Export constants
export { LANGUAGE_COLORS };

// Export detection functions
export { 
  detectMultipleTechnologies, 
  detectSingleTechnology, 
  createCombinedGradient,
  createMultiLanguageStyle 
};

/**
 * Detecta a linguagem/tecnologia principal de um projeto
 * MELHORADO: Suporte completo para múltiplas linguagens
 * @param project - Qualquer objeto que represente um projeto
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function detectLanguage(project: any): LanguageColor {
  if (!project || typeof project !== 'object') {
    return LANGUAGE_COLORS.default;
  }

  // Priorizar categoria se tiver o padrão "X + Y"
  const categoria = project.categoria || project.category || '';
  if (categoria && categoria.includes('+')) {
    const technologies = detectMultipleTechnologies(categoria);
    if (technologies.length > 1) {
      return createMultiLanguageStyle(technologies);
    }
  }

  // Fallback para detecção normal
  const fields = [
    project.titulo || project.title || '',
    project.descricao || project.description || '',
    categoria,
    Array.isArray(project.tags) ? project.tags.join(' ') : '',
    Array.isArray(project.tecnologias) ? project.tecnologias.join(' ') : '',
    Array.isArray(project.stack) ? project.stack.join(' ') : ''
  ];
  
  const content = fields
    .filter(field => typeof field === 'string')
    .join(' ')
    .trim();
  
  if (!content) {
    return LANGUAGE_COLORS.default;
  }
  
  const technologies = detectMultipleTechnologies(content);
  
  if (technologies.length === 1) {
    return technologies[0];
  }
  
  // Para múltiplas tecnologias, criar uma configuração combinada
  return createMultiLanguageStyle(technologies);
}

/**
 * Obtém configuração de cor por categoria
 * MELHORADO: Suporte para categorias compostas
 */
export function getCategoryColor(categoryName?: string | null | undefined): LanguageColor {
  if (!categoryName || typeof categoryName !== 'string') {
    return LANGUAGE_COLORS.default;
  }

  // Se a categoria tem "+", processar como múltiplas linguagens
  if (categoryName.includes('+')) {
    const technologies = detectMultipleTechnologies(categoryName);
    if (technologies.length > 1) {
      return createMultiLanguageStyle(technologies);
    }
  }

  const normalizedCategory = categoryName.toLowerCase().trim();
  
  // Mapeamento direto de categorias para linguagens
  const categoryMappings: Record<string, string> = {
    'frontend': 'react',
    'backend': 'node',
    'fullstack': 'javascript',
    'mobile': 'flutter',
    'web': 'html',
    'api': 'node',
    'database': 'postgresql',
    'ui/ux': 'css',
    'devops': 'docker',
    'cloud': 'aws',
    'ai': 'tensorflow',
    'ml': 'pytorch',
    'machine learning': 'pytorch',
    'artificial intelligence': 'tensorflow',
    'blockchain': 'ethereum',
    'web3': 'solidity',
    'testing': 'jest'
  };

  const mappedLang = categoryMappings[normalizedCategory];
  if (mappedLang && LANGUAGE_COLORS[mappedLang]) {
    return LANGUAGE_COLORS[mappedLang];
  }

  return detectSingleTechnology(normalizedCategory);
}

/**
 * Gera um gradiente territorial baseado em múltiplas tecnologias
 */
export function generateTerritoryGradient(categoryName?: string | null): string {
  if (!categoryName || typeof categoryName !== 'string') {
    return 'from-slate-500 to-slate-600';
  }
  
  const technologies = detectMultipleTechnologies(categoryName);
  
  if (technologies.length > 1 && technologies[0] !== LANGUAGE_COLORS.default) {
    return createCombinedGradient(technologies);
  }
  
  // Fallback para gradientes territoriais dinâmicos
  const territoryGradients = [
    'from-red-500 via-orange-500 to-pink-500',
    'from-blue-500 via-cyan-500 to-teal-500', 
    'from-green-500 via-emerald-500 to-lime-500',
    'from-purple-500 via-violet-500 to-fuchsia-500',
    'from-orange-500 via-amber-500 to-yellow-500',
    'from-indigo-500 via-blue-500 to-cyan-500',
    'from-teal-500 via-green-500 to-emerald-500',
    'from-yellow-500 via-orange-500 to-red-500',
    'from-pink-500 via-purple-500 to-indigo-500',
    'from-cyan-500 via-blue-500 to-purple-500'
  ];
  
  const hash = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return territoryGradients[hash % territoryGradients.length];
}

// Aliases para retrocompatibilidade
export const generateCategoryGradient = generateTerritoryGradient;
