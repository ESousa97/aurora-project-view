// src/utils/mdxProjectLoader.ts
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
  // Em um ambiente real, isso escanearia o diretório
  // Por enquanto, vamos usar um método que funciona no browser
  const knownProjects = ['projects0001', 'projects0002'];
  
  console.log(`📁 Discovered projects: ${knownProjects.join(', ')}`);
  return knownProjects;
}

// ===== FUNÇÃO PARA PARSEAMENTO DO FRONTMATTER =====

function parseFrontmatter(content: string): { metadata: MDXMetadata; content: string } {
  console.log(`🔍 Parsing frontmatter for content (${content.length} chars):`, content.substring(0, 200));
  
  // Tentar diferentes padrões de frontmatter
  const patterns = [
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/,  // Padrão principal com \r\n
    /^---\n([\s\S]*?)\n---\n([\s\S]*)$/,           // Padrão original
    /^---([\s\S]*?)---([\s\S]*)$/,                 // Sem quebras de linha obrigatórias
  ];
  
  let frontmatterMatch = null;
  for (const pattern of patterns) {
    frontmatterMatch = content.match(pattern);
    if (frontmatterMatch) {
      console.log(`✅ Frontmatter matched with pattern: ${pattern}`);
      break;
    }
  }
  
  if (!frontmatterMatch) {
    console.error('❌ No frontmatter pattern matched. Content start:', content.substring(0, 100));
    throw new Error('Arquivo MDX inválido: frontmatter não encontrado');
  }

  const [, frontmatterStr, markdownContent] = frontmatterMatch;
  console.log(`📝 Frontmatter content:`, frontmatterStr);
  
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
  
  frontmatterStr.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    const value = trimmedLine.substring(colonIndex + 1).trim();
    
    console.log(`🔑 Processing: ${key} = ${value}`);
    
    // Parse diferentes tipos de dados com type safety
    switch (key) {
      case 'id':
        metadata.id = parseInt(value) || 0;
        break;
      case 'dificuldade':
        metadata.dificuldade = parseInt(value) || 1;
        break;
      case 'featured':
        metadata.featured = value === 'true';
        break;
      case 'tecnologias':
      case 'tags': {
        const arrayMatch = value.match(/\[(.*?)\]/);
        if (arrayMatch) {
          const arrayValue = arrayMatch[1]
            .split(',')
            .map(item => item.trim().replace(/"/g, ''))
            .filter(item => item.length > 0);
          
          if (key === 'tecnologias') {
            metadata.tecnologias = arrayValue;
          } else if (key === 'tags') {
            metadata.tags = arrayValue;
          }
        }
        break;
      }
      case 'titulo':
        metadata.titulo = value.replace(/^["']|["']$/g, '');
        break;
      case 'descricao':
        metadata.descricao = value.replace(/^["']|["']$/g, '');
        break;
      case 'categoria':
        metadata.categoria = value.replace(/^["']|["']$/g, '');
        break;
      case 'data_criacao':
        metadata.data_criacao = value.replace(/^["']|["']$/g, '');
        break;
      case 'data_modificacao':
        metadata.data_modificacao = value.replace(/^["']|["']$/g, '');
        break;
      case 'imageurl':
        metadata.imageurl = value.replace(/^["']|["']$/g, '');
        break;
      case 'repositorio':
        metadata.repositorio = value.replace(/^["']|["']$/g, '');
        break;
      case 'demo':
        metadata.demo = value.replace(/^["']|["']$/g, '');
        break;
    }
  });

  console.log(`📋 Parsed metadata:`, metadata);

  return {
    metadata,
    content: markdownContent.trim()
  };
}

// ===== FUNÇÃO PARA CARREGAR CONTEÚDO MDX =====

// ===== FUNÇÃO PARA CARREGAR CONTEÚDO MDX =====

async function loadMDXFile(projectSlug: string): Promise<string | null> {
  try {
    console.log(`📁 Loading MDX file for: ${projectSlug}`);
    
    // DADOS ESTÁTICOS TEMPORÁRIOS (até configurar arquivos reais)
    const staticMDXData: Record<string, string> = {
      'projects0001': `---
id: 1
titulo: Sistema de Autenticação JWT
descricao: Sistema completo de autenticação com JWT, refresh tokens e middleware de segurança
categoria: Backend
data_criacao: 2024-12-15T10:00:00Z
data_modificacao: 2025-01-02T14:30:00Z
imageurl: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop
tecnologias: ["Node.js", "Express", "JWT", "PostgreSQL", "TypeScript"]
dificuldade: 4
featured: true
---

# Sistema de Autenticação JWT Completo

Sistema robusto de autenticação utilizando **JWT (JSON Web Tokens)** com refresh tokens e middleware de segurança avançado.

## 🚀 Principais Funcionalidades

### Autenticação Segura
- **Login/Logout** com validação robusta
- **Refresh Tokens** para sessões de longa duração
- **Rate Limiting** para prevenir ataques
- **Middleware de Autorização** personalizável

### Recursos Avançados
- Criptografia de senhas com \`bcrypt\`
- Validação de entrada com \`Joi\`
- Logs detalhados de segurança
- Proteção contra ataques CSRF

## 💻 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **JWT** - Tokens de autenticação
- **TypeScript** - Tipagem estática

## 🔧 Instalação Rápida

@@npm install@@
@@npm run dev@@

:::Esta implementação seguiu as melhores práticas de segurança da OWASP:::

**Status:** ✅ Produção | **Última atualização:** Janeiro 2025`,

      'projects0002': `---
id: 2
titulo: Dashboard Analytics React
descricao: Dashboard interativo com gráficos em tempo real, métricas KPI e sistema de filtros avançados
categoria: Frontend
data_criacao: 2024-11-20T09:00:00Z
data_modificacao: 2024-12-28T16:45:00Z
imageurl: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop
tecnologias: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Chart.js"]
dificuldade: 3
featured: false
---

# Dashboard Analytics Interativo

Dashboard moderno construído em **React** com visualizações de dados em tempo real e interface responsiva.

## ✨ Características Principais

### Visualizações Dinâmicas
- **Gráficos interativos** com D3.js e Chart.js
- **Métricas KPI** atualizadas em tempo real
- **Filtros avançados** por período e categoria
- **Exportação de dados** em PDF/Excel

### Interface Moderna
- Design **mobile-first** responsivo
- Tema **dark/light** personalizável
- Animações suaves com **Framer Motion**
- Componentes **acessíveis** (ARIA)

## 🛠️ Stack Tecnológica

- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **D3.js** - Visualizações personalizadas
- **Chart.js** - Gráficos interativos

## ⚡ Quick Start

@@git clone https://github.com/user/dashboard-analytics@@
@@cd dashboard-analytics@@
@@npm install && npm start@@

:::O dashboard processa mais de 10.000 pontos de dados simultaneamente:::

**Status:** 🔄 Em desenvolvimento | **Última atualização:** Dezembro 2024`
    };

    if (staticMDXData[projectSlug]) {
      console.log(`✅ Found static MDX data for: ${projectSlug}`);
      return staticMDXData[projectSlug];
    }

    console.warn(`⚠️ No static MDX data found for: ${projectSlug}`);
    return null;
    
  } catch (error) {
    console.error(`❌ Error loading MDX data for ${projectSlug}:`, error);
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
  
  // Carregar todos os projetos descobertos
  for (const projectSlug of projectSlugs) {
    const project = await loadMDXProject(projectSlug);
    if (project) {
      projects.push(project);
    }
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

console.log('🚀 MDX Project Loader initialized - File System Mode');