// src/pages/Dashboard.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjectStats, useCategories } from '@/hooks/useProjects';
import { BarChart3, TrendingUp, Target, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProjectStatsChart } from '@/components/dashboard/ProjectStatsChart'; // Importado

export const Dashboard = () => {
  const { totalProjects, recentProjects, totalCategories, mostActiveCategory } = useProjectStats();
  const { data: categories } = useCategories();

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
              <div className="text-2xl font-bold">{totalProjects || 0}</div>
              <p className="text-xs text-muted-foreground">projetos catalogados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories || 0}</div>
              <p className="text-xs text-muted-foreground">áreas técnicas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atualizações Recentes</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentProjects || 0}</div>
              <p className="text-xs text-muted-foreground">no último mês</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categoria Mais Ativa</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{mostActiveCategory?.name || 'N/A'}</div>
              <p className="text-xs text-muted-foreground">com mais projetos</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AQUI ESTÁ A MUDANÇA: Adicionando o gráfico */}
          <div className="lg:col-span-2">
            <ProjectStatsChart />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Categorias</CardTitle>
              <CardDescription>
                Categorias com maior quantidade de projetos.
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
        </div>
      </div>
    </AppLayout>
  );
};
