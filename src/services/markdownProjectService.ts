// src/services/markdownProjectService.ts
import { ProjectCard, Category } from '@/types';
import matter from 'gray-matter';

// Interface para o frontmatter do markdown
interface ProjectFrontmatter {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  imageurl?: string;
  data_criacao: string;
  data_modificacao: string;
  tags?: string[];
  destaque?: boolean;
}

// Importar todos os arquivos markdown da pasta projects
const projectModules = import.meta.glob('/src/data/projects/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

class MarkdownProjectService {
  private projects: ProjectCard[] = [];
  private categories: Category[] = [];
  private initialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    if (this.initialized) return;
    
    console.log('🔄 Inicializando serviço de projetos Markdown...');
    
    try {
      // Processar todos os arquivos markdown
      const projectPromises = Object.entries(projectModules).map(async ([path, content]) => {
        return this.parseMarkdownProject(content as string, path);
      });

      const parsedProjects = await Promise.all(projectPromises);
      this.projects = parsedProjects.filter(p => p !== null) as ProjectCard[];

      // Gerar categorias
      this.generateCategories();
      
      this.initialized = true;
      console.log(`✅ ${this.projects.length} projetos carregados`);
      console.log(`📂 ${this.categories.length} categorias identificadas`);
    } catch (error) {
      console.error('❌ Erro ao inicializar projetos:', error);
      this.projects = [];
      this.categories = [];
    }
  }

  private parseMarkdownProject(content: string, path: string): ProjectCard | null {
    try {
      const { data: frontmatter, content: markdownContent } = matter(content);
      const metadata = frontmatter as ProjectFrontmatter;

      if (!metadata.id || !metadata.titulo) {
        console.warn(`⚠️ Projeto inválido em ${path}: faltam campos obrigatórios`);
        return null;
      }

      return {
        id: metadata.id,
        titulo: metadata.titulo,
        descricao: metadata.descricao || '',
        categoria: metadata.categoria || 'OUTROS',
        imageurl: metadata.imageurl || '',
        data_criacao: metadata.data_criacao || new Date().toISOString(),
        data_modificacao: metadata.data_modificacao || new Date().toISOString(),
        conteudo: markdownContent || ''
      };
    } catch (error) {
      console.error(`❌ Erro ao processar ${path}:`, error);
      return null;
    }
  }

  private generateCategories() {
    const categoryMap = new Map<string, ProjectCard[]>();

    this.projects.forEach(project => {
      const categoryName = project.categoria?.trim();
      if (categoryName) {
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, []);
        }
        categoryMap.get(categoryName)?.push(project);
      }
    });

    this.categories = Array.from(categoryMap.entries())
      .map(([name, projects]) => ({
        name,
        count: projects.length,
        projects
      }))
      .sort((a, b) => b.count - a.count);
  }

  // Métodos públicos
  async getProjects(): Promise<ProjectCard[]> {
    await this.waitForInitialization();
    return [...this.projects];
  }

  async getProject(id: string | number): Promise<ProjectCard | undefined> {
    await this.waitForInitialization();
    return this.projects.find(p => p.id.toString() === id.toString());
  }

  async getCategories(): Promise<Category[]> {
    await this.waitForInitialization();
    return [...this.categories];
  }

  async searchProjects(query: string): Promise<ProjectCard[]> {
    await this.waitForInitialization();
    const lowercaseQuery = query.toLowerCase();
    
    return this.projects.filter(project =>
      project.titulo?.toLowerCase().includes(lowercaseQuery) ||
      project.descricao?.toLowerCase().includes(lowercaseQuery) ||
      project.categoria?.toLowerCase().includes(lowercaseQuery) ||
      project.conteudo?.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createProject(project: Omit<ProjectCard, 'id' | 'data_criacao' | 'data_modificacao'>): Promise<ProjectCard> {
    const newProject: ProjectCard = {
      ...project,
      id: Date.now(), // Usar timestamp como ID único
      data_criacao: new Date().toISOString(),
      data_modificacao: new Date().toISOString()
    };

    // Em produção, isso salvaria o arquivo. Por enquanto, apenas adiciona à memória
    this.projects.push(newProject);
    this.generateCategories();

    console.log('✅ Novo projeto criado:', newProject.titulo);
    return newProject;
  }

  async updateProject(id: string | number, updates: Partial<ProjectCard>): Promise<ProjectCard | undefined> {
    await this.waitForInitialization();
    const index = this.projects.findIndex(p => p.id.toString() === id.toString());
    
    if (index === -1) return undefined;

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      data_modificacao: new Date().toISOString()
    };

    this.generateCategories();
    return this.projects[index];
  }

  async deleteProject(id: string | number): Promise<boolean> {
    await this.waitForInitialization();
    const index = this.projects.findIndex(p => p.id.toString() === id.toString());
    
    if (index === -1) return false;

    this.projects.splice(index, 1);
    this.generateCategories();
    return true;
  }

  private async waitForInitialization(): Promise<void> {
    // Aguarda até 5 segundos pela inicialização
    const maxWait = 50; // 50 * 100ms = 5s
    let waited = 0;
    
    while (!this.initialized && waited < maxWait) {
      await new Promise(resolve => setTimeout(resolve, 100));
      waited++;
    }
    
    if (!this.initialized) {
      throw new Error('Serviço de projetos não conseguiu inicializar');
    }
  }

  // Método para exportar projeto como Markdown
  exportProjectAsMarkdown(project: ProjectCard): string {
    const frontmatter = {
      id: project.id,
      titulo: project.titulo,
      descricao: project.descricao,
      categoria: project.categoria,
      imageurl: project.imageurl,
      data_criacao: project.data_criacao,
      data_modificacao: project.data_modificacao
    };

    return matter.stringify(project.conteudo || '', frontmatter);
  }
}

// Singleton
export const markdownProjectService = new MarkdownProjectService();
