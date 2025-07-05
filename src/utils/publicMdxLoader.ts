// src/utils/publicMdxLoader.ts - Loader para arquivos MDX em public/
import { ProjectCard } from '@/types';

// ===== INTERFACES PARA METADADOS MDX =====

export interface MDXMetadata {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  data_criacao: string;
  data_modificacao: string;
  imageurl: string;
  tecnologias?: string[];
  dificuldade?: number;
  featured?: boolean;
  tags?: string[];
  repositorio?: string;
  demo?: string;
}

// Interface para projeto MDX completo
export interface MDXProject extends MDXMetadata {
  content: string;
  slug: string;
}

// ===== CACHE EM MEMÓRIA =====

let projectsCache: MDXProject[] | null = null;
let lastCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// ===== LISTA DE PROJETOS CONHECIDOS =====

const KNOWN_PROJECTS = [
  'projects0001',
  'projects0002'
  // Adicione mais projetos conforme necessário
];

// ===== FUNÇÃO PARA CARREGAR ARQUIVO MDX DO PUBLIC =====

async function loadMDXFromPublic(projectSlug: string): Promise<string | null> {
  try {
    console.log(`📁 Loading MDX from public: ${projectSlug}`);
    
    const response = await fetch(`/projects/${projectSlug}/${projectSlug}.mdx`);
    
    if (!response.ok) {
      console.warn(`⚠️ Failed to load ${projectSlug}: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const content = await response.text();
    
    if (!content || content.trim().length === 0) {
      console.warn(`⚠️ Empty content for ${projectSlug}`);
      return null;
    }
    
    console.log(`✅ Successfully loaded ${projectSlug} (${content.length} chars)`);
    return content;
    
  } catch (error) {
    console.error(`❌ Error loading ${projectSlug}:`, error);
    return null;
  }
}

// ===== FUNÇÃO PARA PARSEAMENTO DO FRONTMATTER =====

function parseFrontmatter(content: string): { metadata: MDXMetadata; content: string } {
  console.log(`🔍 Parsing frontmatter for content (${content.length} chars)`);
  
  const cleanContent = content.trim();
  
  // Padrões de frontmatter
  const patterns = [
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/,
    /^---\n([\s\S]*?)\n---\n([\s\S]*)$/,
    /^---([\s\S]*?)---([\s\S]*)$/,
  ];
  
  let frontmatterMatch = null;
  
  for (let i = 0; i < patterns.length; i++) {
    frontmatterMatch = cleanContent.match(patterns[i]);
    if (frontmatterMatch) {
      console.log(`✅ Frontmatter matched with Pattern ${i + 1}`);
      break;
    }
  }
  
  if (!frontmatterMatch) {
    console.error('❌ No frontmatter pattern matched');
    throw new Error('Arquivo MDX inválido: frontmatter não encontrado');
  }

  const [, frontmatterStr, markdownContent] = frontmatterMatch;
  
  // Inicializar metadados com valores padrão
  const metadata: MDXMetadata = {
    id: 0,
    titulo: '',
    descricao: '',
    categoria: '',
    data_criacao: '',
    data_modificacao: '',
    imageurl: '',
    tecnologias: [],
    dificuldade: 1,
    featured: false,
    tags: [],
    repositorio: '',
    demo: ''
  };
  
  // Processar frontmatter linha por linha
  const lines = frontmatterStr.split(/\r?\n/);
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    const value = trimmedLine.substring(colonIndex + 1).trim();
    
    // Parse diferentes tipos de dados
    switch (key) {
      case 'id':
        const parsedId = parseInt(value);
        if (!isNaN(parsedId)) metadata.id = parsedId;
        break;
        
      case 'titulo':
        metadata.titulo = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'descricao':
        metadata.descricao = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'categoria':
        metadata.categoria = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'data_criacao':
        metadata.data_criacao = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'data_modificacao':
        metadata.data_modificacao = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'imageurl':
        metadata.imageurl = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'dificuldade':
        const dificuldade = parseInt(value);
        if (!isNaN(dificuldade) && dificuldade >= 1 && dificuldade <= 5) {
          metadata.dificuldade = dificuldade;
        }
        break;
        
      case 'featured':
        metadata.featured = value.toLowerCase() === 'true';
        break;
        
      case 'repositorio':
        metadata.repositorio = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'demo':
        metadata.demo = value.replace(/^["']|["']$/g, '').trim();
        break;
        
      case 'tecnologias':
      case 'tags':
        const arrayMatch = value.match(/\[(.*?)\]/);
        if (arrayMatch) {
          const arrayValue = arrayMatch[1]
            .split(',')
            .map(item => item.trim().replace(/^["']|["']$/g, ''))
            .filter(item => item.length > 0);
          
          if (key === 'tecnologias') {
            metadata.tecnologias = arrayValue;
          } else if (key === 'tags') {
            metadata.tags = arrayValue;
          }
        }
        break;
    }
  }

  // Validação
  if (!metadata.id || !metadata.titulo) {
    throw new Error(`Invalid metadata: missing ${!metadata.id ? 'id' : 'title'}`);
  }

  console.log(`📋 Parsed metadata: ${metadata.titulo} (ID: ${metadata.id})`);

  return {
    metadata,
    content: markdownContent.trim()
  };
}

// ===== FUNÇÃO PARA CARREGAR UM PROJETO MDX =====

async function loadMDXProject(projectSlug: string): Promise<MDXProject | null> {
  try {
    console.log(`📖 Loading MDX project: ${projectSlug}`);
    
    const mdxContent = await loadMDXFromPublic(projectSlug);
    
    if (!mdxContent) {
      console.warn(`⚠️ MDX content not found for: ${projectSlug}`);
      return null;
    }

    const { metadata, content } = parseFrontmatter(mdxContent);
    
    const project: MDXProject = {
      ...metadata,
      content,
      slug: projectSlug
    };

    console.log(`✅ Successfully loaded MDX project: ${metadata.titulo}`);
    return project;
    
  } catch (error) {
    console.error(`❌ Error loading MDX project ${projectSlug}:`, error);
    return null;
  }
}

// ===== FUNÇÃO PARA CARREGAR TODOS OS PROJETOS =====

async function loadAllMDXProjects(): Promise<MDXProject[]> {
  const now = Date.now();
  
  // Verificar cache
  if (projectsCache && (now - lastCacheTime) < CACHE_DURATION) {
    console.log('📋 Using cached MDX projects');
    return projectsCache;
  }

  console.log('📋 Loading all MDX projects from public directory...');
  console.log('📁 Known projects list:', KNOWN_PROJECTS);
  
  const projects: MDXProject[] = [];
  const failedProjects: string[] = [];
  
  // Carregar todos os projetos conhecidos
  for (const projectSlug of KNOWN_PROJECTS) {
    console.log(`📖 Processing project: ${projectSlug}`);
    const project = await loadMDXProject(projectSlug);
    if (project) {
      projects.push(project);
      console.log(`✅ Successfully added project: ${project.titulo} (ID: ${project.id})`);
    } else {
      failedProjects.push(projectSlug);
      console.warn(`❌ Failed to load project: ${projectSlug}`);
    }
  }

  // Log de resultados
  if (failedProjects.length > 0) {
    console.warn(`⚠️ Failed to load ${failedProjects.length} projects: ${failedProjects.join(', ')}`);
  }

  // Ordenar por data de modificação (mais recentes primeiro)
  projects.sort((a, b) => 
    new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime()
  );

  // Atualizar cache
  projectsCache = projects;
  lastCacheTime = now;

  console.log(`✅ Loaded ${projects.length} MDX projects from public directory`);
  console.log('📊 Project titles:', projects.map(p => `${p.titulo} (${p.categoria})`));
  return projects;
}

// ===== FUNÇÕES PÚBLICAS EXPORTADAS =====

/**
 * Obter todos os projetos MDX
 */
export async function getAllMDXProjects(): Promise<ProjectCard[]> {
  console.log('📚 Getting all MDX projects...');
  
  const mdxProjects = await loadAllMDXProjects();
  
  // Converter para formato ProjectCard
  const projectCards: ProjectCard[] = mdxProjects.map(project => ({
    id: project.id,
    titulo: project.titulo,
    descricao: project.descricao,
    categoria: project.categoria,
    data_criacao: project.data_criacao,
    data_modificacao: project.data_modificacao,
    imageurl: project.imageurl,
    conteudo: project.content
  }));

  console.log(`📚 Returned ${projectCards.length} project cards`);
  return projectCards;
}

/**
 * Obter projeto MDX por ID
 */
export async function getMDXProjectById(id: number): Promise<ProjectCard | null> {
  console.log(`📖 Getting MDX project by ID: ${id}`);
  
  const allProjects = await loadAllMDXProjects();
  const project = allProjects.find(p => p.id === id);
  
  if (!project) {
    console.log(`❌ MDX project with ID ${id} not found`);
    return null;
  }

  const projectCard: ProjectCard = {
    id: project.id,
    titulo: project.titulo,
    descricao: project.descricao,
    categoria: project.categoria,
    data_criacao: project.data_criacao,
    data_modificacao: project.data_modificacao,
    imageurl: project.imageurl,
    conteudo: project.content
  };

  console.log(`📖 Found MDX project: ${project.titulo}`);
  return projectCard;
}

/**
 * Buscar projetos MDX
 */
export async function searchMDXProjects(query: string): Promise<ProjectCard[]> {
  console.log(`🔍 Searching MDX projects for: "${query}"`);
  
  const allProjects = await getAllMDXProjects();
  const searchTerm = query.toLowerCase();
  
  const filtered = allProjects.filter(project => 
    project.titulo.toLowerCase().includes(searchTerm) ||
    project.descricao.toLowerCase().includes(searchTerm) ||
    project.categoria.toLowerCase().includes(searchTerm) ||
    project.conteudo.toLowerCase().includes(searchTerm)
  );
  
  console.log(`🔍 Found ${filtered.length} MDX projects matching "${query}"`);
  return filtered;
}

/**
 * Obter projetos MDX por categoria
 */
export async function getMDXProjectsByCategory(categoria: string): Promise<ProjectCard[]> {
  console.log(`📂 Getting MDX projects for category: ${categoria}`);
  
  const allProjects = await getAllMDXProjects();
  const filtered = allProjects.filter(project => 
    project.categoria.toLowerCase() === categoria.toLowerCase()
  );
  
  console.log(`📂 Found ${filtered.length} MDX projects in category: ${categoria}`);
  return filtered;
}

/**
 * Obter projetos em destaque
 */
export async function getFeaturedMDXProjects(): Promise<ProjectCard[]> {
  console.log('⭐ Getting featured MDX projects...');
  
  const allMDXProjects = await loadAllMDXProjects();
  const featured = allMDXProjects.filter(project => project.featured === true);
  
  // Converter para ProjectCard
  const featuredCards: ProjectCard[] = featured.map(project => ({
    id: project.id,
    titulo: project.titulo,
    descricao: project.descricao,
    categoria: project.categoria,
    data_criacao: project.data_criacao,
    data_modificacao: project.data_modificacao,
    imageurl: project.imageurl,
    conteudo: project.content
  }));
  
  console.log(`⭐ Found ${featuredCards.length} featured MDX projects`);
  return featuredCards;
}

/**
 * Limpar cache de projetos MDX
 */
export function clearMDXCache(): void {
  console.log('🧹 Clearing MDX projects cache...');
  projectsCache = null;
  lastCacheTime = 0;
}

/**
 * Recarregar projetos (forçar reload do cache)
 */
export async function reloadMDXProjects(): Promise<ProjectCard[]> {
  clearMDXCache();
  return await getAllMDXProjects();
}

// ===== EXPORT PADRÃO =====

export default {
  getAllMDXProjects,
  getMDXProjectById,
  searchMDXProjects,
  getMDXProjectsByCategory,
  getFeaturedMDXProjects,
  clearMDXCache,
  reloadMDXProjects
};

// ===== LOGS DE INICIALIZAÇÃO =====

console.log('🚀 Public MDX Project Loader initialized');
console.log('📁 Expected project structure: public/projects/{projectSlug}/{projectSlug}.mdx');
console.log('📦 Using fetch API to load MDX files from public directory');