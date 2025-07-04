import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { Badge } from '@/components/ui/badge';
import { ProjectStatsChart } from '@/components/dashboard/ProjectStatsChart';
import { FaChartBar, FaChartLine, FaBullseye, FaBolt } from 'react-icons/fa';

export const Dashboard = () => {
  const { data: projects } = useProjects();
  const { data: categories } = useCategories();

  const stats = React.useMemo(() => {
    if (!projects || !categories) {
      return { totalProjects: 0, recentProjects: 0, totalCategories: 0, mostActiveCategory: null };
    }

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const recentProjects = projects.filter(p => new Date(p.data_modificacao) > lastMonth);
    const mostActiveCategory = categories[0] || null;

    return {
      totalProjects: projects.length,
      recentProjects: recentProjects.length,
      totalCategories: categories.length,
      mostActiveCategory,
    };
  }, [projects, categories]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da plataforma de projetos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
              <FaBullseye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">projetos catalogados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <FaChartBar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <p className="text-xs text-muted-foreground">áreas técnicas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atualizações Recentes</CardTitle>
              <FaBolt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentProjects}</div>
              <p className="text-xs text-muted-foreground">no último mês</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categoria Mais Ativa</CardTitle>
              <FaChartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{stats.mostActiveCategory?.name || 'N/A'}</div>
              <p className="text-xs text-muted-foreground">com mais projetos</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectStatsChart />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Categorias</CardTitle>
              <CardDescription>Categorias com maior quantidade de projetos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories?.slice(0, 6).map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-sm">{category.name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
