// src/pages/Dashboard.tsx
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectStatsChart } from '@/components/dashboard/ProjectStatsChart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getStaticStats } from '@/static-data';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = React.useState<{
    totalProjects: number;
    totalCategories: number;
    recentProjects: number;
    mostActiveCategory: any;
    projectsByMonth: Array<{ month: string; count: number; }>;
  } | null>(null);

  React.useEffect(() => {
    const loadStats = async () => {
      console.log('🎯 Dashboard: Loading stats...');
      try {
        const statsData = await getStaticStats();
        console.log('🎯 Dashboard: Stats loaded:', statsData);
        setStats(statsData);
      } catch (error) {
        console.error('❌ Dashboard: Error loading stats:', error);
      }
    };
    loadStats();
  }, []);

  if (!stats) {
    return (
      <AppLayout>
        <div className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-4xl font-bold">Centro de Comando</h1>
            <p className="text-muted-foreground">Carregando estatísticas...</p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Carregando...</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">Centro de Comando</h1>
          <p className="text-muted-foreground">Uma visão geral da atividade do seu portfólio.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total de Projetos</CardTitle>
              <CardDescription>Número de projetos no portfólio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalProjects}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Categorias Ativas</CardTitle>
              <CardDescription>Territórios com pelo menos um projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalCategories}</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Categoria Popular</CardTitle>
              <CardDescription>O território mais explorado</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.mostActiveCategory?.name || 'N/A'}</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Projetos Recentes</CardTitle>
              <CardDescription>Adicionados no último ano</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.recentProjects}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6">
          <ProjectStatsChart />
        </div>
      </div>
    </AppLayout>
  );
};
