
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle }  from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectGrid } from '@/components/project/ProjectGrid';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Get recent projects (last 6)
  const recentProjects = React.useMemo(() => {
    if (!projects) return [];
    return projects
      .sort((a, b) => new Date(b.data_modificacao).getTime() - new Date(a.data_modificacao).getTime())
      .slice(0, 6);
  }, [projects]);

  // Get popular categories (top 4 by project count)
  const popularCategories = React.useMemo(() => {
    if (!categories) return [];
    return categories
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [categories]);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-br from-primary/10 via-background to-background rounded-2xl">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ES Database V3
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plataforma moderna para descobrir, explorar e gerenciar conhecimento técnico 
              através de uma interface elegante e responsiva.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link to="/projects">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Explorar Projetos
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/search">
                  Busca Avançada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projectsLoading ? '...' : projects?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Conhecimento técnico disponível
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoriesLoading ? '...' : categories?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Áreas de conhecimento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atualizações</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentProjects.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Projetos recentes
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Popular Categories */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Categorias Populares</h2>
            <Button variant="outline" asChild>
              <Link to="/categories">
                Ver Todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoriesLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
              ))
            ) : (
              popularCategories.map((category) => (
                <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.count} projetos
                        </p>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Recent Projects */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Projetos Recentes</h2>
            <Button variant="outline" asChild>
              <Link to="/projects">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <ProjectGrid 
            projects={recentProjects} 
            isLoading={projectsLoading}
          />
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
