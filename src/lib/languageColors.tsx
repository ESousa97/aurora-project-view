// src/lib/languageColors.tsx - Versão corrigida com validação de tipos
export interface LanguageColor {
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  gradient: string;
  icon?: string;
}

export const LANGUAGE_COLORS: Record<string, LanguageColor> = {
  // JavaScript & Related
  'javascript': {
    name: 'JavaScript',
    color: '#F7DF1E',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    gradient: 'from-yellow-400 to-yellow-500',
    icon: '⚡'
  },
  'typescript': {
    name: 'TypeScript',
    color: '#3178C6',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    gradient: 'from-blue-500 to-blue-600',
    icon: '🔷'
  },
  'react': {
    name: 'React',
    color: '#61DAFB',
    bgColor: 'bg-cyan-400',
    textColor: 'text-cyan-900',
    gradient: 'from-cyan-400 to-cyan-500',
    icon: '⚛️'
  },
  'vue': {
    name: 'Vue.js',
    color: '#4FC08D',
    bgColor: 'bg-green-500',
    textColor: 'text-green-100',
    gradient: 'from-green-500 to-green-600',
    icon: '💚'
  },
  'angular': {
    name: 'Angular',
    color: '#DD0031',
    bgColor: 'bg-red-600',
    textColor: 'text-red-100',
    gradient: 'from-red-600 to-red-700',
    icon: '🅰️'
  },
  'node': {
    name: 'Node.js',
    color: '#339933',
    bgColor: 'bg-green-600',
    textColor: 'text-green-100',
    gradient: 'from-green-600 to-green-700',
    icon: '🟢'
  },
  'nextjs': {
    name: 'Next.js',
    color: '#000000',
    bgColor: 'bg-black',
    textColor: 'text-white',
    gradient: 'from-black to-gray-800',
    icon: '▲'
  },

  // Web Technologies
  'html': {
    name: 'HTML',
    color: '#E34F26',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-100',
    gradient: 'from-orange-500 to-orange-600',
    icon: '🌐'
  },
  'css': {
    name: 'CSS',
    color: '#1572B6',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: '🎨'
  },
  'sass': {
    name: 'Sass',
    color: '#CC6699',
    bgColor: 'bg-pink-500',
    textColor: 'text-pink-100',
    gradient: 'from-pink-500 to-pink-600',
    icon: '💅'
  },
  'tailwind': {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    bgColor: 'bg-cyan-500',
    textColor: 'text-cyan-100',
    gradient: 'from-cyan-500 to-teal-500',
    icon: '🌊'
  },

  // Backend Languages
  'python': {
    name: 'Python',
    color: '#3776AB',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    gradient: 'from-blue-500 to-yellow-400',
    icon: '🐍'
  },
  'java': {
    name: 'Java',
    color: '#007396',
    bgColor: 'bg-orange-600',
    textColor: 'text-orange-100',
    gradient: 'from-orange-600 to-red-600',
    icon: '☕'
  },
  'csharp': {
    name: 'C#',
    color: '#239120',
    bgColor: 'bg-purple-600',
    textColor: 'text-purple-100',
    gradient: 'from-purple-600 to-purple-700',
    icon: '🔷'
  },
  'php': {
    name: 'PHP',
    color: '#777BB4',
    bgColor: 'bg-indigo-500',
    textColor: 'text-indigo-100',
    gradient: 'from-indigo-500 to-indigo-600',
    icon: '🐘'
  },
  'go': {
    name: 'Go',
    color: '#00ADD8',
    bgColor: 'bg-cyan-500',
    textColor: 'text-cyan-900',
    gradient: 'from-cyan-500 to-blue-500',
    icon: '🔵'
  },
  'rust': {
    name: 'Rust',
    color: '#000000',
    bgColor: 'bg-orange-700',
    textColor: 'text-orange-100',
    gradient: 'from-orange-700 to-red-700',
    icon: '🦀'
  },

  // Mobile
  'swift': {
    name: 'Swift',
    color: '#FA7343',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-100',
    gradient: 'from-orange-500 to-red-500',
    icon: '🍎'
  },
  'kotlin': {
    name: 'Kotlin',
    color: '#7F52FF',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-100',
    gradient: 'from-purple-500 to-indigo-500',
    icon: '📱'
  },
  'flutter': {
    name: 'Flutter',
    color: '#02569B',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-cyan-500',
    icon: '🦋'
  },
  'react-native': {
    name: 'React Native',
    color: '#61DAFB',
    bgColor: 'bg-cyan-400',
    textColor: 'text-cyan-900',
    gradient: 'from-cyan-400 to-blue-500',
    icon: '📱'
  },

  // Databases
  'mysql': {
    name: 'MySQL',
    color: '#4479A1',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-100',
    gradient: 'from-blue-600 to-blue-700',
    icon: '🗄️'
  },
  'postgresql': {
    name: 'PostgreSQL',
    color: '#336791',
    bgColor: 'bg-blue-700',
    textColor: 'text-blue-100',
    gradient: 'from-blue-700 to-blue-800',
    icon: '🐘'
  },
  'mongodb': {
    name: 'MongoDB',
    color: '#47A248',
    bgColor: 'bg-green-600',
    textColor: 'text-green-100',
    gradient: 'from-green-600 to-green-700',
    icon: '🍃'
  },
  'firebase': {
    name: 'Firebase',
    color: '#FFCA28',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    gradient: 'from-yellow-400 to-orange-500',
    icon: '🔥'
  },

  // Cloud & DevOps
  'aws': {
    name: 'AWS',
    color: '#FF9900',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-100',
    gradient: 'from-orange-500 to-orange-600',
    icon: '☁️'
  },
  'docker': {
    name: 'Docker',
    color: '#2496ED',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    gradient: 'from-blue-500 to-cyan-500',
    icon: '🐳'
  },

  // Default/Fallback
  'default': {
    name: 'Projeto',
    color: '#6B7280',
    bgColor: 'bg-slate-500',
    textColor: 'text-slate-100',
    gradient: 'from-slate-500 to-slate-600',
    icon: '📦'
  }
};

/**
 * Detecta múltiplas tecnologias em um texto e retorna suas configurações
 */
function detectMultipleTechnologies(content: string): LanguageColor[] {
  // Validação de entrada
  if (!content || typeof content !== 'string') {
    return [LANGUAGE_COLORS.default];
  }

  const normalizedContent = content.toLowerCase().trim();
  
  if (!normalizedContent) {
    return [LANGUAGE_COLORS.default];
  }

  const detected: LanguageColor[] = [];
  
  // Padrões comuns de separação: +, &, e, and, com, with
  const separators = /[+&]|\s+(e|and|com|with)\s+/g;
  
  // Se não há separadores, usar detecção simples
  if (!separators.test(normalizedContent)) {
    const singleTech = detectSingleTechnology(normalizedContent);
    return [singleTech];
  }
  
  // Dividir por separadores e detectar cada tecnologia
  const parts = normalizedContent.split(separators)
    .map(part => part ? part.trim() : '')
    .filter(part => part && part.length > 1);
  
  for (const part of parts) {
    const tech = detectSingleTechnology(part);
    if (tech && tech !== LANGUAGE_COLORS.default && !detected.some(d => d.name === tech.name)) {
      detected.push(tech);
    }
  }
  
  // Se não detectou nenhuma tecnologia específica, usar detecção no conteúdo completo
  if (detected.length === 0) {
    detected.push(detectSingleTechnology(normalizedContent));
  }
  
  // Limitar a 3 tecnologias para não complicar muito o gradiente
  return detected.slice(0, 3);
}

/**
 * Detecta uma única tecnologia no conteúdo
 */
function detectSingleTechnology(content: string): LanguageColor {
  // Validação de entrada
  if (!content || typeof content !== 'string') {
    return LANGUAGE_COLORS.default;
  }

  const normalizedContent = content.toLowerCase().trim();
  
  if (!normalizedContent) {
    return LANGUAGE_COLORS.default;
  }
  
  // Verificações específicas primeiro
  if (normalizedContent.includes('c#') || normalizedContent.includes('dotnet') || normalizedContent.includes('.net')) {
    return LANGUAGE_COLORS.csharp;
  }
  
  if (normalizedContent.includes('react native') || normalizedContent.includes('reactnative')) {
    return LANGUAGE_COLORS['react-native'];
  }
  
  if (normalizedContent.includes('next.js') || normalizedContent.includes('nextjs')) {
    return LANGUAGE_COLORS.nextjs;
  }
  
  if (normalizedContent.includes('tailwind')) {
    return LANGUAGE_COLORS.tailwind;
  }
  
  // Busca por prioridade
  const priorities = [
    'typescript', 'javascript', 'react', 'vue', 'angular', 'nextjs', 'node',
    'python', 'java', 'csharp', 'php', 'go', 'rust',
    'swift', 'kotlin', 'flutter', 'react-native',
    'html', 'css', 'sass', 'tailwind',
    'mysql', 'postgresql', 'mongodb', 'firebase',
    'aws', 'docker'
  ];

  for (const tech of priorities) {
    const techConfig = LANGUAGE_COLORS[tech];
    if (techConfig && (normalizedContent.includes(tech) || normalizedContent.includes(techConfig.name.toLowerCase()))) {
      return techConfig;
    }
  }

  return LANGUAGE_COLORS.default;
}

/**
 * Cria um gradiente combinado baseado em múltiplas tecnologias
 */
function createCombinedGradient(technologies: LanguageColor[]): string {
  if (!technologies || technologies.length === 0) {
    return LANGUAGE_COLORS.default.gradient;
  }

  if (technologies.length === 1) {
    return technologies[0].gradient;
  }
  
  if (technologies.length === 2) {
    const tech1 = technologies[0];
    const tech2 = technologies[1];
    
    const color1 = extractMainColor(tech1);
    const color2 = extractMainColor(tech2);
    
    return `from-${color1} via-${color2} to-${color1}`;
  }
  
  if (technologies.length === 3) {
    const colors = technologies.map(extractMainColor);
    return `from-${colors[0]} via-${colors[1]} to-${colors[2]}`;
  }
  
  return technologies[0].gradient;
}

/**
 * Extrai a cor principal de uma configuração de tecnologia
 */
function extractMainColor(tech: LanguageColor): string {
  if (!tech || !tech.color) {
    return 'slate-500';
  }

  // Mapear cores hex para classes Tailwind equivalentes
  const colorMap: Record<string, string> = {
    '#F7DF1E': 'yellow-400',
    '#3178C6': 'blue-500',
    '#61DAFB': 'cyan-400',
    '#4FC08D': 'green-500',
    '#DD0031': 'red-600',
    '#339933': 'green-600',
    '#000000': 'black',
    '#E34F26': 'orange-500',
    '#1572B6': 'blue-600',
    '#CC6699': 'pink-500',
    '#06B6D4': 'cyan-500',
    '#3776AB': 'blue-500',
    '#007396': 'orange-600',
    '#239120': 'purple-600',
    '#777BB4': 'indigo-500',
    '#00ADD8': 'cyan-500',
    '#FA7343': 'orange-500',
    '#7F52FF': 'purple-500',
    '#02569B': 'blue-600',
    '#4479A1': 'blue-600',
    '#336791': 'blue-700',
    '#47A248': 'green-600',
    '#FFCA28': 'yellow-400',
    '#FF9900': 'orange-500',
    '#2496ED': 'blue-500',
    '#6B7280': 'slate-500',
  };
  
  return colorMap[tech.color] || 'slate-500';
}

/**
 * Obtém a cor principal combinada de múltiplas tecnologias
 */
function getCombinedMainColor(technologies: LanguageColor[]): string {
  if (!technologies || technologies.length === 0) {
    return LANGUAGE_COLORS.default.color;
  }

  if (technologies.length === 1) {
    return technologies[0].color;
  }
  
  return technologies[0].color;
}

/**
 * Detecta a linguagem/tecnologia principal de um projeto com suporte a múltiplas tecnologias
 */
export function detectLanguage(project: { titulo?: string; descricao?: string; categoria?: string } | null | undefined): LanguageColor {
  // Validação de entrada robusta
  if (!project || typeof project !== 'object') {
    return LANGUAGE_COLORS.default;
  }

  const titulo = project.titulo || '';
  const descricao = project.descricao || '';
  const categoria = project.categoria || '';
  
  // Verificação adicional para garantir que são strings
  const tituloStr = typeof titulo === 'string' ? titulo : '';
  const descricaoStr = typeof descricao === 'string' ? descricao : '';
  const categoriaStr = typeof categoria === 'string' ? categoria : '';
  
  const content = `${tituloStr} ${descricaoStr} ${categoriaStr}`.trim();
  
  if (!content) {
    return LANGUAGE_COLORS.default;
  }
  
  // Detectar múltiplas tecnologias
  const technologies = detectMultipleTechnologies(content);
  
  if (!technologies || technologies.length === 0) {
    return LANGUAGE_COLORS.default;
  }
  
  if (technologies.length === 1) {
    return technologies[0];
  }
  
  // Para múltiplas tecnologias, criar uma configuração combinada
  const combinedGradient = createCombinedGradient(technologies);
  const mainColor = getCombinedMainColor(technologies);
  const combinedName = technologies.map(t => t.name).join(' + ');
  
  // Criar ícone combinado (máximo 2 ícones para não poluir)
  const combinedIcon = technologies.slice(0, 2).map(t => t.icon || '📦').join('');
  
  return {
    name: combinedName,
    color: mainColor,
    bgColor: technologies[0].bgColor,
    textColor: technologies[0].textColor,
    gradient: combinedGradient,
    icon: combinedIcon
  };
}

/**
 * Obtém configuração de cor por categoria com suporte a múltiplas tecnologias
 */
export function getCategoryColor(categoryName?: string | null): LanguageColor {
  if (!categoryName || typeof categoryName !== 'string') {
    return LANGUAGE_COLORS.default;
  }

  const normalizedCategory = categoryName.toLowerCase().trim();
  
  if (!normalizedCategory) {
    return LANGUAGE_COLORS.default;
  }
  
  // Detectar se a categoria contém múltiplas tecnologias
  const technologies = detectMultipleTechnologies(normalizedCategory);
  
  if (technologies.length > 1 && technologies[0] !== LANGUAGE_COLORS.default) {
    // Criar configuração combinada para a categoria
    const combinedGradient = createCombinedGradient(technologies);
    const mainColor = getCombinedMainColor(technologies);
    const combinedName = technologies.map(t => t.name).join(' + ');
    const combinedIcon = technologies.slice(0, 2).map(t => t.icon || '📦').join('');
    
    return {
      name: combinedName,
      color: mainColor,
      bgColor: technologies[0].bgColor,
      textColor: technologies[0].textColor,
      gradient: combinedGradient,
      icon: combinedIcon
    };
  }
  
  // Mapeamento direto de categorias para linguagens (single tech)
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
    'cloud': 'aws'
  };

  const mappedLang = categoryMappings[normalizedCategory];
  if (mappedLang && LANGUAGE_COLORS[mappedLang]) {
    return LANGUAGE_COLORS[mappedLang];
  }

  // Se não encontrou mapeamento, usar detecção padrão
  return technologies[0];
}

/**
 * Gera um gradiente territorial baseado em múltiplas tecnologias para categorias não mapeadas
 */
export function generateTerritoryGradient(categoryName?: string | null): string {
  if (!categoryName || typeof categoryName !== 'string') {
    return 'from-slate-500 to-slate-600';
  }
  
  // Tentar detectar tecnologias na categoria
  const technologies = detectMultipleTechnologies(categoryName);
  
  if (technologies.length > 1 && technologies[0] !== LANGUAGE_COLORS.default) {
    return createCombinedGradient(technologies);
  }
  
  // Fallback para gradientes territoriais baseados em hash
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
  
  // Usar hash do nome da categoria para consistência
  const hash = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return territoryGradients[hash % territoryGradients.length];
}

/**
 * Alias para retrocompatibilidade
 */
export const generateCategoryGradient = generateTerritoryGradient;
