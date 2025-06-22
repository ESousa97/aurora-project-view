// src/lib/languageColors.ts
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
 * Detecta a linguagem principal de um projeto baseado no título, descrição e categoria
 */
export function detectLanguage(project: { titulo?: string; descricao?: string; categoria?: string } | null | undefined): LanguageColor {
  // Verificação de segurança
  if (!project) {
    return LANGUAGE_COLORS.default;
  }

  // Garantir que os valores sejam strings válidas
  const titulo = project.titulo || '';
  const descricao = project.descricao || '';
  const categoria = project.categoria || '';
  
  const content = `${titulo} ${descricao} ${categoria}`.toLowerCase();
  
  // Ordem de prioridade para detecção
  const priorities = [
    'typescript', 'javascript', 'react', 'vue', 'angular', 'node',
    'python', 'java', 'csharp', 'php', 'go', 'rust',
    'swift', 'kotlin', 'flutter', 'react-native',
    'html', 'css', 'sass',
    'mysql', 'postgresql', 'mongodb'
  ];

  for (const lang of priorities) {
    const langConfig = LANGUAGE_COLORS[lang];
    if (content.includes(lang) || content.includes(langConfig.name.toLowerCase())) {
      return langConfig;
    }
  }

  // Verificações específicas
  if (content.includes('c#') || content.includes('dotnet') || content.includes('.net')) {
    return LANGUAGE_COLORS.csharp;
  }
  
  if (content.includes('react native') || content.includes('reactnative')) {
    return LANGUAGE_COLORS['react-native'];
  }

  return LANGUAGE_COLORS.default;
}

/**
 * Obtém configuração de cor por categoria
 */
export function getCategoryColor(categoryName?: string | null): LanguageColor {
  // Verificação de segurança
  if (!categoryName || typeof categoryName !== 'string') {
    return LANGUAGE_COLORS.default;
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
    'ui/ux': 'css'
  };

  const mappedLang = categoryMappings[normalizedCategory];
  if (mappedLang && LANGUAGE_COLORS[mappedLang]) {
    return LANGUAGE_COLORS[mappedLang];
  }

  // Detecta baseado no nome da categoria
  for (const [key, config] of Object.entries(LANGUAGE_COLORS)) {
    if (normalizedCategory.includes(key) || normalizedCategory.includes(config.name.toLowerCase())) {
      return config;
    }
  }

  return LANGUAGE_COLORS.default;
}

/**
 * Gera um gradiente aleatório para categorias não mapeadas
 */
export function generateCategoryGradient(categoryName?: string | null): string {
  const gradients = [
    'from-red-500 to-pink-500',
    'from-blue-500 to-cyan-500', 
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-blue-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-rose-500'
  ];
  
  if (!categoryName) {
    return gradients[0];
  }
  
  // Usa o nome da categoria para gerar um índice consistente
  const hash = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}
