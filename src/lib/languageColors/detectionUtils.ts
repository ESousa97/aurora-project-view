// src/lib/languageColors/detectionUtils.ts
import { LanguageColor } from './types';
import { LANGUAGE_COLORS } from './configs';
import { DETECTION_PATTERNS } from './detectionPatterns';

/**
 * Detecta múltiplas tecnologias em um texto
 */
export function detectMultipleTechnologies(content: string): LanguageColor[] {
  if (!content || typeof content !== 'string') {
    return [LANGUAGE_COLORS.default];
  }

  const normalizedContent = content.toLowerCase().trim();
  
  if (!normalizedContent) {
    return [LANGUAGE_COLORS.default];
  }

  const detected = new Set<LanguageColor>();
  
  // Usar padrões de detecção mais precisos
  for (const [techKey, patterns] of Object.entries(DETECTION_PATTERNS)) {
    const techConfig = LANGUAGE_COLORS[techKey];
    if (techConfig && patterns.some(pattern => pattern.test(normalizedContent))) {
      detected.add(techConfig);
    }
  }
  
  // Se não detectou nenhuma tecnologia específica, tentar detecção simples por keywords
  if (detected.size === 0) {
    for (const [key, config] of Object.entries(LANGUAGE_COLORS)) {
      if (key !== 'default' && config.keywords.some(keyword => 
        normalizedContent.includes(keyword.toLowerCase())
      )) {
        detected.add(config);
        break; // Pegar apenas a primeira correspondência
      }
    }
  }
  
  // Se ainda não detectou nada, usar default
  if (detected.size === 0) {
    detected.add(LANGUAGE_COLORS.default);
  }
  
  // Converter Set para Array e ordenar por prioridade
  const detectedArray = Array.from(detected)
    .sort((a, b) => {
      // Priorizar trending
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      
      // Depois por popularidade
      if (a.popularity !== b.popularity) return b.popularity - a.popularity;
      
      // Por último por dificuldade (menor primeiro)
      return a.difficulty - b.difficulty;
    })
    .slice(0, 3); // Limitar a 3 tecnologias
  
  return detectedArray;
}

/**
 * Detecta uma única tecnologia no conteúdo
 */
export function detectSingleTechnology(content: string): LanguageColor {
  const technologies = detectMultipleTechnologies(content);
  return technologies[0] || LANGUAGE_COLORS.default;
}

/**
 * Extrai a cor principal de uma configuração de tecnologia
 */
export function extractMainColor(tech: LanguageColor): string {
  if (!tech?.color) return 'slate-500';

  // Mapear cores hex para classes Tailwind equivalentes
  const colorMap: Record<string, string> = {
    '#F7DF1E': 'yellow-400',    // JavaScript
    '#3178C6': 'blue-500',      // TypeScript
    '#61DAFB': 'cyan-400',      // React
    '#4FC08D': 'green-500',     // Vue
    '#DD0031': 'red-600',       // Angular
    '#339933': 'green-600',     // Node
    '#000000': 'black',         // Next.js
    '#E34F26': 'orange-500',    // HTML
    '#1572B6': 'blue-600',      // CSS
    '#3776AB': 'blue-500',      // Python
    '#ED8B00': 'orange-600',    // Java
    '#2496ED': 'blue-500',      // Docker
    '#6B7280': 'slate-500',     // Default
  };
  
  return colorMap[tech.color] || 'slate-500';
}

/**
 * Cria um gradiente combinado baseado em múltiplas tecnologias
 */
export function createCombinedGradient(technologies: LanguageColor[]): string {
  if (!technologies || technologies.length === 0) {
    return LANGUAGE_COLORS.default.gradient;
  }

  if (technologies.length === 1) {
    return technologies[0].gradient;
  }
  
  const colors = technologies.map(extractMainColor).slice(0, 3);
  
  if (colors.length === 2) {
    return `from-${colors[0]} via-${colors[1]} to-${colors[0]}`;
  }
  
  if (colors.length === 3) {
    return `from-${colors[0]} via-${colors[1]} to-${colors[2]}`;
  }
  
  return technologies[0].gradient;
}
