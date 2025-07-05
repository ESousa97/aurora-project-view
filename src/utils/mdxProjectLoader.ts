// src/utils/mdxProjectLoader.ts - VERSÃO CORRIGIDA
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

// ===== DESCOBERTA AUTOMÁTICA DE PROJETOS =====

async function discoverProjects(): Promise<string[]> {
  try {
    console.log('📁 Discovering projects in src/projects directory...');
    
    // Lista de projetos conhecidos baseada na estrutura de diretórios
    const knownProjects = [
      'projects0001',
      'projects0002'
      // Adicione mais projetos conforme necessário
    ];
    
    // Verificar quais projetos realmente existem através de import dinâmico
    const existingProjects: string[] = [];
    
    for (const projectSlug of knownProjects) {
      try {
        console.log(`🔍 Checking for project: ${projectSlug}`);
        
        // Tentar importar o arquivo MDX para verificar se existe
        await import(`../projects/${projectSlug}/${projectSlug}.mdx?raw`);
        existingProjects.push(projectSlug);
        console.log(`✅ Found project: ${projectSlug}`);
      } catch (error) {
        console.warn(`⚠️ Project file not found: ${projectSlug}`, error);
        // Se o import com ?raw falhar, tentar sem
        try {
          await import(`../projects/${projectSlug}/${projectSlug}.mdx`);
          existingProjects.push(projectSlug);
          console.log(`✅ Found project (fallback): ${projectSlug}`);
        } catch (fallbackError) {
          console.warn(`⚠️ Project not accessible: ${projectSlug}`);
        }
      }
    }
    
    console.log(`📁 Discovered ${existingProjects.length} projects: ${existingProjects.join(', ')}`);
    return existingProjects;
    
  } catch (error) {
    console.error('❌ Error discovering projects:', error);
    return [];
  }
}

// ===== FUNÇÃO CORRIGIDA PARA PARSEAMENTO DO FRONTMATTER =====

function parseFrontmatter(content: string): { metadata: MDXMetadata; content: string } {
  console.log(`🔍 Parsing frontmatter for content (${content.length} chars)`);
  
  // Limpar conteúdo preservando quebras de linha essenciais
  const cleanContent = content.trim();
  
  // Tentar diferentes padrões de frontmatter preservando estrutura
  const patterns = [
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/,  // Padrão principal
    /^---\n([\s\S]*?)\n---\n([\s\S]*)$/,           // Padrão simples
    /^---([\s\S]*?)---([\s\S]*)$/,                 // Sem quebras obrigatórias
  ];
  
  let frontmatterMatch = null;
  let patternUsed = '';
  
  for (let i = 0; i < patterns.length; i++) {
    frontmatterMatch = cleanContent.match(patterns[i]);
    if (frontmatterMatch) {
      patternUsed = `Pattern ${i + 1}`;
      console.log(`✅ Frontmatter matched with ${patternUsed}`);
      break;
    }
  }
  
  if (!frontmatterMatch) {
    console.error('❌ No frontmatter pattern matched. Content start:', cleanContent.substring(0, 200));
    throw new Error('Arquivo MDX inválido: frontmatter não encontrado');
  }

  const [, frontmatterStr, markdownContent] = frontmatterMatch;
  console.log(`📝 Frontmatter extracted (${frontmatterStr.length} chars)`);
  
  // Inicializar com valores padrão
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
  
  // CORREÇÃO: Processar linha por linha preservando estrutura
  const lines = frontmatterStr.split(/\r?\n/);
  
  console.log(`🔑 Processing: ${frontmatterStr.replace(/\r?\n/g, '')}`);
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    const value = trimmedLine.substring(colonIndex + 1).trim();
    
    // Parse diferentes tipos de dados com validação
    switch (key) {
      case 'id': {
        const parsedId = parseInt(value);
        if (!isNaN(parsedId)) {
          metadata.id = parsedId;
        }
        break;
      }
        
      case 'titulo': {
        const titulo = value.replace(/^["']|["']$/g, '').trim();
        if (titulo) {
          metadata.titulo = titulo;
        }
        break;
      }
        
      case 'descricao': {
        const descricao = value.replace(/^["']|["']$/g, '').trim();
        if (descricao) {
          metadata.descricao = descricao;
        }
        break;
      }
        
      case 'categoria': {
        const categoria = value.replace(/^["']|["']$/g, '').trim();
        if (categoria) {
          metadata.categoria = categoria;
        }
        break;
      }
        
      case 'data_criacao': {
        const dataCriacao = value.replace(/^["']|["']$/g, '').trim();
        if (dataCriacao) {
          metadata.data_criacao = dataCriacao;
        }
        break;
      }
        
      case 'data_modificacao': {
        const dataModificacao = value.replace(/^["']|["']$/g, '').trim();
        if (dataModificacao) {
          metadata.data_modificacao = dataModificacao;
        }
        break;
      }
        
      case 'imageurl': {
        const imageurl = value.replace(/^["']|["']$/g, '').trim();
        if (imageurl) {
          metadata.imageurl = imageurl;
        }
        break;
      }
        
      case 'dificuldade': {
        const dificuldade = parseInt(value);
        if (!isNaN(dificuldade) && dificuldade >= 1 && dificuldade <= 5) {
          metadata.dificuldade = dificuldade;
        }
        break;
      }
        
      case 'featured': {
        metadata.featured = value.toLowerCase() === 'true';
        break;
      }
        
      case 'repositorio': {
        const repo = value.replace(/^["']|["']$/g, '').trim();
        if (repo) {
          metadata.repositorio = repo;
        }
        break;
      }
        
      case 'demo': {
        const demo = value.replace(/^["']|["']$/g, '').trim();
        if (demo) {
          metadata.demo = demo;
        }
        break;
      }
        
      case 'tecnologias':
      case 'tags': {
        // Melhor parsing de arrays
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
  }

  // VALIDAÇÃO CRÍTICA
  if (!metadata.id || !metadata.titulo) {
    console.error('❌ Invalid metadata: missing id or title', {
      id: metadata.id,
      titulo: metadata.titulo,
      hasId: !!metadata.id,
      hasTitle: !!metadata.titulo
    });
    throw new Error(`Invalid metadata for project: missing ${!metadata.id ? 'id' : 'title'}`);
  }

  console.log(`📋 Parsed metadata:`, {
    id: metadata.id,
    titulo: metadata.titulo,
    categoria: metadata.categoria,
    featured: metadata.featured,
    tecnologias: metadata.tecnologias?.length || 0
  });

  return {
    metadata,
    content: markdownContent.trim()
  };
}

// ===== FUNÇÃO PARA CARREGAR CONTEÚDO MDX =====

async function loadMDXFile(projectSlug: string): Promise<string | null> {
  try {
    console.log(`📁 Loading MDX file for: ${projectSlug}`);
    
    // Tentar importar o arquivo MDX como raw text
    try {
      console.log(`📄 Trying raw import for: ${projectSlug}`);
      const mdxModule = await import(`../projects/${projectSlug}/${projectSlug}.mdx?raw`);
      const mdxContent = mdxModule.default;
      
      if (!mdxContent) {
        console.warn(`⚠️ Empty MDX content for: ${projectSlug}`);
        return null;
      }
      
      console.log(`✅ Successfully loaded MDX file for: ${projectSlug} (${mdxContent.length} chars)`);
      return mdxContent;
      
    } catch (rawError) {
      console.warn(`⚠️ Raw import failed for ${projectSlug}, trying standard import...`);
      
      // Fallback: tentar import normal
      try {
        const mdxModule = await import(`../projects/${projectSlug}/${projectSlug}.mdx`);
        
        if (typeof mdxModule.default === 'string') {
          console.log(`✅ Successfully loaded MDX via standard import: ${projectSlug}`);
          return mdxModule.default;
        }
        
        if (mdxModule.content || mdxModule.source) {
          const content = mdxModule.content || mdxModule.source;
          console.log(`✅ Successfully loaded MDX content: ${projectSlug}`);
          return content;
        }
        
        console.warn(`⚠️ MDX module structure not recognized for: ${projectSlug}`);
        return null;
        
      } catch (standardError) {
        console.error(`❌ Both import methods failed for ${projectSlug}:`, {
          rawError: rawError.message,
          standardError: standardError.message
        });
        return null;
      }
    }
    
  } catch (error) {
    console.error(`❌ Error loading MDX file for ${projectSlug}:`, error);
    return null;
  }
}

// ===== FUNÇÃO PARA CARREGAR UM PROJETO MDX =====

async function loadMDXProject(projectSlug: string): Promise<MDXProject | null> {
  try {
    console.log(`📖 Loading MDX project: ${projectSlug}`);
    
    const mdxContent = await loadMDXFile(projectSlug);
    
    if (!mdxContent) {
      console.warn(`⚠️ MDX content not found for: ${projectSlug}`);
      return null;
    }

    const { metadata, content } = parseFrontmatter(mdxContent);
    
    // Validação adicional
    if (!metadata.id || !metadata.titulo) {
      console.error(`❌ Invalid metadata for ${projectSlug}: missing id or title`);
      return null;
    }

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

  console.log('📋 Loading all MDX projects from file system...');
  
  const projectSlugs = await discoverProjects();
  const projects: MDXProject[] = [];
  const failedProjects: string[] = [];
  
  // Carregar todos os projetos descobertos
  for (const projectSlug of projectSlugs) {
    const project = await loadMDXProject(projectSlug);
    if (project) {
      projects.push(project);
    } else {
      failedProjects.push(projectSlug);
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

  console.log(`✅ Loaded ${projects.length} MDX projects from file system`);
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
 * Obter metadados de um projeto MDX
 */
export function getMDXProjectMetadata(id: number): MDXMetadata | null {
  // Esta função retorna dados sincronamente do cache
  if (!projectsCache) {
    console.warn('⚠️ No cached projects available for metadata lookup');
    return null;
  }
  
  const project = projectsCache.find(p => p.id === id);
  return project || null;
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
  getMDXProjectMetadata,
  clearMDXCache,
  reloadMDXProjects
};

// ===== LOGS DE INICIALIZAÇÃO =====

console.log('🚀 MDX Project Loader initialized - Dynamic Import Mode (Fixed)');
console.log('📁 Expected project structure: src/projects/{projectSlug}/{projectSlug}.mdx');
console.log('📦 Using dynamic imports with enhanced error handling and content cleaning');
