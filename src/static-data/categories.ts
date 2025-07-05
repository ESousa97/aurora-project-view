// src/static-data/categories.ts
import { Category } from '@/types';
import { getStaticProjects } from './projects';

// Gerar categorias a partir dos projetos MDX
const generateCategoriesFromMDX = async (): Promise<Category[]> => {
  const projects = await getStaticProjects();
  const categoryMap = new Map<string, typeof projects>();
  
  projects.forEach(project => {
    const categoryName = project.categoria;
    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, []);
    }
    categoryMap.get(categoryName)?.push(project);
  });
  
  return Array.from(categoryMap.entries()).map(([name, projects]) => ({
    name,
    count: projects.length,
    projects
  })).sort((a, b) => b.count - a.count);
};

// Cache para categorias
let cachedCategories: Category[] | null = null;

export const getStaticCategories = async (): Promise<Category[]> => {
  if (cachedCategories) {
    return cachedCategories;
  }
  
  cachedCategories = await generateCategoriesFromMDX();
  return cachedCategories;
};

// Adicionar algumas categorias extras (sem projetos por enquanto)
export const getAllCategories = async (): Promise<Category[]> => {
  const staticCategories = await getStaticCategories();
  
  const allCategories: Category[] = [
    ...staticCategories,
    {
      name: "Node.js",
      count: 0,
      projects: []
    },
    {
      name: "Vue.js",
      count: 0,
      projects: []
    },
    {
      name: "Django",
      count: 0,
      projects: []
    },
    {
      name: "React Native",
      count: 0,
      projects: []
    },
    {
      name: "Next.js",
      count: 0,
      projects: []
    },
    {
      name: "PostgreSQL",
      count: 0,
      projects: []
    },
    {
      name: "Docker",
      count: 0,
      projects: []
    },
    {
      name: "Kubernetes",
      count: 0,
      projects: []
    },
    {
      name: "AWS",
      count: 0,
      projects: []
    },
    {
      name: "Machine Learning",
      count: 0,
      projects: []
    },
    {
      name: "Blockchain",
      count: 0,
      projects: []
    },
    {
      name: "Mobile",
      count: 0,
      projects: []
    }
  ].filter(cat => !staticCategories.find(sc => sc.name === cat.name));

  return [...staticCategories, ...allCategories]
    .sort((a, b) => {
      // Priorizar categorias com projetos
      if (a.count > 0 && b.count === 0) return -1;
      if (a.count === 0 && b.count > 0) return 1;
      // Depois ordenar por quantidade
      return b.count - a.count;
    });
};

// Combinar categorias com projetos e vazias (mantido para compatibilidade)
export const combinedCategories: Category[] = [];

// Função auxiliar para obter categoria por nome
export const getCategoryByName = async (name: string): Promise<Category | undefined> => {
  const categories = await getAllCategories();
  return categories.find(c => 
    c.name.toLowerCase() === name.toLowerCase()
  );
};

// Função auxiliar para obter categorias populares
export const getPopularCategories = async (limit: number = 10): Promise<Category[]> => {
  const categories = await getAllCategories();
  return categories
    .filter(c => c.count > 0)
    .slice(0, limit);
};
