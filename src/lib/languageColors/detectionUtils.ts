// src/lib/languageColors/detectionUtils.ts
import { LanguageColor } from './types';
import { LANGUAGE_COLORS } from './configs';
import { DETECTION_PATTERNS } from './detectionPatterns';

/**
 * Detecta múltiplas tecnologias em um texto, incluindo o padrão "X + Y"
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
  
  // NOVO: Detectar padrão "LINGUAGEM + LINGUAGEM"
  const multiLanguagePattern = /(\w+)\s*\+\s*(\w+)/gi;
  const multiLanguageMatches = normalizedContent.matchAll(multiLanguagePattern);
  
  for (const match of multiLanguageMatches) {
    const [, firstLang, secondLang] = match;
    
    // Buscar primeira linguagem
    const firstLanguageConfig = findLanguageByName(firstLang);
    if (firstLanguageConfig) {
      detected.add(firstLanguageConfig);
    }
    
    // Buscar segunda linguagem
    const secondLanguageConfig = findLanguageByName(secondLang);
    if (secondLanguageConfig) {
      detected.add(secondLanguageConfig);
    }
  }
  
  // Se não detectou com o padrão +, usar detecção normal
  if (detected.size === 0) {
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
          // Não fazer break aqui para detectar múltiplas linguagens
        }
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
 * Função auxiliar para encontrar linguagem por nome
 */
function findLanguageByName(name: string): LanguageColor | null {
  const normalizedName = name.toLowerCase().trim();
  
  // Busca direta
  for (const [key, config] of Object.entries(LANGUAGE_COLORS)) {
    if (key === normalizedName || 
        config.name === normalizedName || 
        config.displayName.toLowerCase() === normalizedName) {
      return config;
    }
  }
  
  // Busca por keywords
  for (const [, config] of Object.entries(LANGUAGE_COLORS)) {
    if (config.keywords.some(keyword => keyword.toLowerCase() === normalizedName)) {
      return config;
    }
  }
  
  return null;
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
 * MELHORADO: Suporte aprimorado para múltiplas cores
 */
export function createCombinedGradient(technologies: LanguageColor[]): string {
  if (!technologies || technologies.length === 0) {
    return LANGUAGE_COLORS.default.gradient;
  }

  if (technologies.length === 1) {
    return technologies[0].gradient;
  }
  
  // Para 2 tecnologias - gradiente direto entre elas
  if (technologies.length === 2) {
    const color1 = extractMainColor(technologies[0]);
    const color2 = extractMainColor(technologies[1]);
    return `from-${color1} to-${color2}`;
  }
  
  // Para 3 tecnologias - usar via
  if (technologies.length === 3) {
    const color1 = extractMainColor(technologies[0]);
    const color2 = extractMainColor(technologies[1]);
    const color3 = extractMainColor(technologies[2]);
    return `from-${color1} via-${color2} to-${color3}`;
  }
  
  // Para mais de 3, usar as 3 primeiras
  return createCombinedGradient(technologies.slice(0, 3));
}

/**
 * Cria configuração de estilo para múltiplas linguagens
 */
export function createMultiLanguageStyle(technologies: LanguageColor[]) {
  if (technologies.length <= 1) {
    return technologies[0] || LANGUAGE_COLORS.default;
  }

  const gradient = createCombinedGradient(technologies);
  const mainTech = technologies[0];
  const combinedName = technologies.map(t => t.displayName).join(' + ');
  
  return {
    ...mainTech, // Herda propriedades da linguagem principal
    name: 'combined',
    displayName: combinedName,
    gradient: gradient,
    // Usar o ícone da primeira linguagem
    icon: mainTech.icon,
    // Ajustar outras propriedades
    difficulty: Math.max(...technologies.map(t => t.difficulty)) as 1 | 2 | 3 | 4 | 5,
    trending: technologies.some(t => t.trending),
    popularity: Math.max(...technologies.map(t => t.popularity)),
    description: `Projeto usando ${combinedName}`,
    keywords: [...new Set(technologies.flatMap(t => t.keywords))]
  };
}
