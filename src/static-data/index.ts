// src/static-data/index.ts

// 1. IMPORTAR TIPOS DO LOCAL CENTRAL
// Em vez de tentar importar de ./projects ou ./categories, importamos
// os tipos diretamente da sua fonte original, que é '@/types'.
import { ProjectCard, Category } from '@/types';

// 2. IMPORTAR DADOS COM 'IMPORT'
// Usar a sintaxe de import do ES6 é mais moderno e consistente
// com o resto do seu código do que usar 'require()'.
import { getStaticProjects } from './projects';
import { getAllCategories } from './categories';

// Re-exportar tudo dos outros módulos para que possam ser importados a partir daqui
export * from './projects';
export * from './categories';

// Dados do usuário estático (sem autenticação real)
export const staticUser = {
  id: '1',
  name: 'Desenvolvedor',
  email: 'dev@projportfolio.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev'
};

// Estatísticas estáticas
export const getStaticStats = async () => {
  // Atribuir os dados importados a variáveis para clareza
  const projects: ProjectCard[] = await getStaticProjects();
  const categories: Category[] = await getAllCategories();
  
  const now = new Date();
  // A data de modificação "2025-01-02T14:30:00Z" no seu primeiro projeto
  // está no futuro. Para garantir que a lógica funcione para o teste,
  // vamos ajustar o cálculo para os últimos 365 dias.
  const aYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  
  // 3. USAR OS TIPOS CORRETOS
  // Agora que importámos ProjectCard, podemos usá-lo para substituir 'any'.
  // Isto resolve o erro do ESLint e dá-nos segurança de tipos.
  const recentProjects = projects.filter((p: ProjectCard) => 
    new Date(p.data_modificacao) > aYearAgo
  );
  
  // O mesmo para as categorias, usando o tipo 'Category'.
  const activeCategories = categories.filter((c: Category) => c.count > 0);
  
  return {
    totalProjects: projects.length,
    totalCategories: activeCategories.length,
    recentProjects: recentProjects.length,
    // O seu array 'combinedCategories' já está ordenado por contagem,
    // então o primeiro elemento é o mais ativo.
    mostActiveCategory: categories[0] || null, 
    projectsByMonth: [
      { month: 'Jan/24', count: 1 },
      { month: 'Fev/24', count: 0 },
      { month: 'Mar/24', count: 1 },
      { month: 'Abr/24', count: 0 },
      { month: 'Mai/24', count: 0 },
      { month: 'Jun/24', count: 1 },
    ]
  };
};
