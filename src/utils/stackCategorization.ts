// src/utils/stackCategorization.ts
import { ProjectCard } from '@/types';
import { getAllMDXProjects } from './publicMdxLoader';
import { getCategoryColor } from '@/lib/languageColors';

export interface StackCategory {
  name: string;
  type: 'Frontend' | 'Backend' | 'Full Stack' | 'DevOps' | 'Database' | 'Mobile';
  count: number;
  projects: ProjectCard[];
  technologies: string[];
  primaryTech: string;
}

// Mapeamento de tecnologias para stack types
const TECH_TO_STACK: Record<string, string> = {
  // Frontend
  'React': 'Frontend',
  'Vue.js': 'Frontend', 
  'Angular': 'Frontend',
  'Vue': 'Frontend',
  'TypeScript': 'Frontend', // pode ser ambos, mas vamos priorizar frontend
  'JavaScript': 'Frontend',
  'D3.js': 'Frontend',
  'Chart.js': 'Frontend',
  'Tailwind CSS': 'Frontend',
  'CSS': 'Frontend',
  'HTML': 'Frontend',
  'Next.js': 'Full Stack',
  'Nuxt.js': 'Full Stack',
  
  // Backend
  'Node.js': 'Backend',
  'Express': 'Backend',
  'Django': 'Backend',
  'Flask': 'Backend',
  'FastAPI': 'Backend',
  'Laravel': 'Backend',
  'Spring': 'Backend',
  'Java': 'Backend',
  'Python': 'Backend',
  'PHP': 'Backend',
  'C#': 'Backend',
  '.NET': 'Backend',
  'JWT': 'Backend',
  
  // Database
  'PostgreSQL': 'Database',
  'MySQL': 'Database',
  'MongoDB': 'Database',
  'Redis': 'Database',
  'SQLite': 'Database',
  
  // DevOps
  'Docker': 'DevOps',
  'Kubernetes': 'DevOps',
  'AWS': 'DevOps',
  'Azure': 'DevOps',
  'GCP': 'DevOps',
  
  // Mobile
  'React Native': 'Mobile',
  'Flutter': 'Mobile',
  'Ionic': 'Mobile',
  'Swift': 'Mobile',
  'Kotlin': 'Mobile',
};

// Determina o stack type baseado nas tecnologias
function determineStackType(technologies: string[]): StackCategory['type'] {
  const stackTypes = technologies
    .map(tech => TECH_TO_STACK[tech])
    .filter(Boolean);

  const counts = stackTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Se tem tecnologias de frontend e backend, é Full Stack
  if (counts['Frontend'] && counts['Backend']) {
    return 'Full Stack';
  }

  // Senão, retorna o tipo mais frequente
  const sortedTypes = Object.entries(counts)
    .sort(([,a], [,b]) => b - a);

  return (sortedTypes[0]?.[0] as StackCategory['type']) || 'Frontend';
}

// Gera categorias baseadas em stack types dos projetos MDX
export async function generateStackCategories(): Promise<StackCategory[]> {
  console.log('🏗️ Generating stack-based categories from MDX projects...');
  
  const projects = await getAllMDXProjects();
  const stackMap = new Map<string, {
    type: StackCategory['type'];
    projects: ProjectCard[];
    technologies: Set<string>;
  }>();

  // Processar cada projeto
  for (const project of projects) {
    console.log(`📋 Processing project: ${project.titulo}`);
    
    // Extrair tecnologias do conteúdo
    const technologies = extractTechnologiesFromProject(project);
    console.log(`🔧 Detected technologies: ${technologies.join(', ')}`);
    
    if (technologies.length === 0) continue;

    const stackType = determineStackType(technologies);
    const primaryTech = technologies[0]; // Primeira tecnologia como principal
    
    console.log(`📚 Stack type: ${stackType}, Primary tech: ${primaryTech}`);

    if (!stackMap.has(stackType)) {
      stackMap.set(stackType, {
        type: stackType,
        projects: [],
        technologies: new Set()
      });
    }

    const stackData = stackMap.get(stackType)!;
    stackData.projects.push(project);
    technologies.forEach(tech => stackData.technologies.add(tech));
  }

  // Converter para array de StackCategory
  const categories: StackCategory[] = Array.from(stackMap.entries()).map(([name, data]) => ({
    name,
    type: data.type,
    count: data.projects.length,
    projects: data.projects,
    technologies: Array.from(data.technologies),
    primaryTech: Array.from(data.technologies)[0] || 'default'
  }));

  // Ordenar por quantidade de projetos
  categories.sort((a, b) => b.count - a.count);

  console.log('🏗️ Generated stack categories:', categories.map(c => `${c.name}: ${c.count} projects`));
  
  return categories;
}

// Extrai tecnologias de um projeto (do frontmatter MDX)
function extractTechnologiesFromProject(project: ProjectCard): string[] {
  const content = project.conteudo || '';
  const technologies: string[] = [];

  // Primeiro, tentar extrair do frontmatter se disponível
  const frontmatterMatch = content.match(/---\s*([\s\S]*?)\s*---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const techMatch = frontmatter.match(/tecnologias:\s*\[(.*?)\]/);
    if (techMatch) {
      const techArray = techMatch[1]
        .split(',')
        .map(tech => tech.trim().replace(/['"]/g, ''))
        .filter(tech => tech.length > 0);
      technologies.push(...techArray);
    }
  }

  // Se não encontrou no frontmatter, usar detecção no conteúdo
  if (technologies.length === 0) {
    const searchContent = [
      project.titulo,
      project.descricao,
      project.categoria,
      content
    ].join(' ').toLowerCase();

    Object.keys(TECH_TO_STACK).forEach(tech => {
      if (searchContent.includes(tech.toLowerCase())) {
        technologies.push(tech);
      }
    });
  }

  return [...new Set(technologies)]; // Remove duplicatas
}

// Cache
let cachedStackCategories: StackCategory[] | null = null;

export async function getStackCategories(): Promise<StackCategory[]> {
  if (cachedStackCategories) {
    return cachedStackCategories;
  }
  
  cachedStackCategories = await generateStackCategories();
  return cachedStackCategories;
}

export function clearStackCategoriesCache(): void {
  cachedStackCategories = null;
}