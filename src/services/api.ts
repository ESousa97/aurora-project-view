import { ProjectCard, Category } from '@/types';

const mockProjects: ProjectCard[] = [
  {
    id: 1,
    titulo: 'Sistema React Avançado',
    descricao: 'Sistema completo desenvolvido com React e TypeScript',
    categoria: 'REACT',
    imageurl: '',
    data_criacao: '2024-01-15T10:30:00Z',
    data_modificacao: '2024-01-20T15:45:00Z',
    conteudo: '# Sistema React\n\nProjeto desenvolvido com React, TypeScript e Tailwind CSS.\n\n## Funcionalidades\n- Dashboard interativo\n- Gestão de dados\n- Interface responsiva'
  },
  {
    id: 2,
    titulo: 'API Python Flask',
    descricao: 'API RESTful desenvolvida com Python e Flask',
    categoria: 'PYTHON',
    imageurl: '',
    data_criacao: '2024-01-10T08:00:00Z',
    data_modificacao: '2024-01-25T12:30:00Z',
    conteudo: '# API Python\n\nAPI desenvolvida com Flask e SQLAlchemy.\n\n## Recursos\n- Autenticação JWT\n- CRUD completo\n- Documentação Swagger'
  },
  {
    id: 3,
    titulo: 'App Mobile Flutter',
    descricao: 'Aplicativo mobile multiplataforma com Flutter',
    categoria: 'FLUTTER',
    imageurl: '',
    data_criacao: '2024-01-05T14:20:00Z',
    data_modificacao: '2024-01-30T09:15:00Z',
    conteudo: '# App Flutter\n\nAplicativo mobile desenvolvido com Flutter.\n\n## Características\n- Interface nativa\n- Performance otimizada\n- Suporte Android e iOS'
  }
];

export const apiService = {
  getCards: async (): Promise<ProjectCard[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProjects;
  },

  getProjectDetails: async (id: string): Promise<ProjectCard> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const project = mockProjects.find(p => p.id.toString() === id);
    if (!project) throw new Error('Projeto não encontrado');
    return project;
  },

  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const categories = mockProjects.reduce((acc, project) => {
      const existing = acc.find(cat => cat.name === project.categoria);
      if (existing) {
        existing.count++;
        existing.projects.push(project);
      } else {
        acc.push({
          name: project.categoria,
          count: 1,
          projects: [project]
        });
      }
      return acc;
    }, [] as Category[]);

    return categories;
  },

  searchProjects: async (query: string): Promise<ProjectCard[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProjects.filter(project =>
      project.titulo.toLowerCase().includes(query.toLowerCase()) ||
      project.descricao.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const keepAliveService = {
  start: () => () => {},
};
