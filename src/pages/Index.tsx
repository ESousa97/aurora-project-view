import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle }  from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectGrid } from '@/components/project/ProjectGrid';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { ArrowRight, Folder, Search, BarChart3, Sparkles, BookOpen, Target } from 'lucide-react';
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

  // Get popular categories (top 6 by project count)
  const popularCategories = React.useMemo(() => {
    if (!categories) return [];
    return categories
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [categories]);

  return (
    <AppLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-3xl" />
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Bem-vindo ao futuro dos portfólios</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                  ProjPortfólio
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Descubra, explore e organize projetos técnicos de forma moderna e intuitiva. 
                Sua plataforma definitiva para conhecimento e inspiração.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Link to="/projects">
                  <Folder className="mr-2 h-5 w-5" />
                  Explorar Projetos
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl" asChild>
                <Link to="/projects">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Conteúdo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-8 pb-6">
              <div className="mx-auto w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {projectsLoading ? '...' : projects?.length || 0}
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-medium">Projetos Disponíveis</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="pt-8 pb-6">
              <div className="mx-auto w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                {categoriesLoading ? '...' : categories?.length || 0}
              </div>
              <p className="text-purple-600 dark:text-purple-400 font-medium">Categorias Técnicas</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-8 pb-6">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                {recentProjects.length}
              </div>
              <p className="text-green-600 dark:text-green-400 font-medium">Atualizações Recentes</p>
            </CardContent>
          </Card>
        </section>

        {/* Categories Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Explore por Categoria</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navegue pelos projetos organizados por área de conhecimento técnico
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categoriesLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
              ))
            ) : (
              popularCategories.map((category, index) => {
                const colors = [
                  'from-blue-500 to-cyan-500',
                  'from-purple-500 to-pink-500', 
                  'from-green-500 to-emerald-500',
                  'from-orange-500 to-red-500',
                  'from-indigo-500 to-purple-500',
                  'from-teal-500 to-blue-500'
                ];
                return (
                  <Card key={category.name} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`h-2 bg-gradient-to-r ${colors[index % colors.length]}`} />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {category.count}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {category.count} projeto{category.count !== 1 ? 's' : ''} disponível{category.count !== 1 ? 'eis' : ''}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">
                Ver Todas as Categorias
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Projetos em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça os projetos mais recentes e interessantes da nossa coleção
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <ProjectGrid 
              projects={recentProjects} 
              isLoading={projectsLoading}
            />
          </div>
          
          {recentProjects.length > 0 && (
            <div className="text-center">
              <Button size="lg" asChild>
                <Link to="/projects">
                  Ver Todos os Projetos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="relative py-16 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl" />
          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Explorar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubra projetos incríveis, aprenda novas tecnologias e encontre inspiração para seus próprios desenvolvimentos.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl" asChild>
              <Link to="/projects">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
