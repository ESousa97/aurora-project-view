// src/pages/Dashboard.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { BarChart3, TrendingUp, Calendar, Target, Activity, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Dashboard = () => {
  const { data: projects } = useProjects();
  const { data: categories } = useCategories();

  const stats = React.useMemo(() => {
    if (!projects) return null;

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const recentProjects = projects.filter(p => new Date(p.data_modificacao) > lastMonth);

    return {
      total: projects.length,
      recent: recentProjects.length,
      categories: categories?.length || 0,
      mostActiveCategory: categories?.[0]?.name || 'N/A'
    };
  }, [projects, categories]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da plataforma de projetos
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
              <p className="text-xs text-muted-foreground">projetos catalogados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.categories || 0}</div>
              <p className="text-xs text-muted-foreground">áreas técnicas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atualizações Recentes</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.recent || 0}</div>
              <p className="text-xs text-muted-foreground">no último mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categoria Mais Ativa</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{stats?.mostActiveCategory}</div>
              <p className="text-xs text-muted-foreground">com mais projetos</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Categorias por Quantidade</CardTitle>
              <CardDescription>
                Distribuição de projetos por categoria
              </CardDescription>
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

          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades Futuras</CardTitle>
              <CardDescription>
                Em desenvolvimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Sistema de usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Timeline de atividades</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Analytics avançado</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
