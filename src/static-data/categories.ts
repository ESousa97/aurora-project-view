// src/static-data/categories.ts
import { Category } from '@/types';
import { staticProjects } from './projects';

// Gerar categorias a partir dos projetos estáticos
const generateCategories = (): Category[] => {
  const categoryMap = new Map<string, typeof staticProjects>();
  
  staticProjects.forEach(project => {
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

export const staticCategories: Category[] = generateCategories();

// Adicionar algumas categorias extras (sem projetos por enquanto)
export const allCategories: Category[] = [
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

// Combinar categorias com projetos e vazias
export const combinedCategories: Category[] = [...staticCategories, ...allCategories]
  .sort((a, b) => {
    // Priorizar categorias com projetos
    if (a.count > 0 && b.count === 0) return -1;
    if (a.count === 0 && b.count > 0) return 1;
    // Depois ordenar por quantidade
    return b.count - a.count;
  });

// Função auxiliar para obter categoria por nome
export const getCategoryByName = (name: string): Category | undefined => {
  return combinedCategories.find(c => 
    c.name.toLowerCase() === name.toLowerCase()
  );
};

// Função auxiliar para obter categorias populares
export const getPopularCategories = (limit: number = 10): Category[] => {
  return combinedCategories
    .filter(c => c.count > 0)
    .slice(0, limit);
};
