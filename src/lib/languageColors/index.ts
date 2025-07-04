import { FaReact, FaJs, FaPython, FaJava, FaPhp, FaVuejs, FaAngular, FaHtml5, FaCss3, FaNode, FaCode } from 'react-icons/fa';

export interface LanguageColor {
  name: string;
  displayName: string;
  color: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  difficulty: number;
  trending: boolean;
  popularity: number;
  description: string;
  keywords: string[];
}

export const LANGUAGE_COLORS: Record<string, LanguageColor> = {
  'react': {
    name: 'react',
    displayName: 'React',
    color: '#61DAFB',
    gradient: 'from-cyan-400 to-cyan-500',
    icon: FaReact,
    category: 'frontend',
    difficulty: 3,
    trending: true,
    popularity: 10,
    description: 'Biblioteca para interfaces de usuário',
    keywords: ['react', 'jsx', 'components']
  },
  'javascript': {
    name: 'javascript',
    displayName: 'JavaScript',
    color: '#F7DF1E',
    gradient: 'from-yellow-400 to-yellow-500',
    icon: FaJs,
    category: 'language',
    difficulty: 2,
    trending: true,
    popularity: 10,
    description: 'Linguagem de programação versátil',
    keywords: ['js', 'javascript', 'web']
  },
  'python': {
    name: 'python',
    displayName: 'Python',
    color: '#3776AB',
    gradient: 'from-blue-500 to-yellow-400',
    icon: FaPython,
    category: 'language',
    difficulty: 2,
    trending: true,
    popularity: 9,
    description: 'Linguagem versátil e legível',
    keywords: ['python', 'py', 'data']
  },
  'default': {
    name: 'default',
    displayName: 'Projeto',
    color: '#6B7280',
    gradient: 'from-slate-500 to-slate-600',
    icon: FaCode,
    category: 'other',
    difficulty: 1,
    trending: false,
    popularity: 1,
    description: 'Projeto de tecnologia',
    keywords: ['projeto', 'code']
  }
};

export function detectLanguage(project: unknown): LanguageColor {
  if (!project || typeof project !== 'object') return LANGUAGE_COLORS.default;
  const data = project as Record<string, unknown>;

  const content = [
    data.titulo || '',
    data.descricao || '',
    data.categoria || ''
  ].join(' ').toLowerCase();
  
  // Detecção simples
  if (content.includes('react')) return LANGUAGE_COLORS.react;
  if (content.includes('javascript') || content.includes('js')) return LANGUAGE_COLORS.javascript;
  if (content.includes('python')) return LANGUAGE_COLORS.python;
  
  return LANGUAGE_COLORS.default;
}

export function getCategoryColor(category: string): LanguageColor {
  const normalized = category?.toLowerCase() || '';
  return LANGUAGE_COLORS[normalized] || LANGUAGE_COLORS.default;
}
