// src/pages/ProjectDetail.tsx
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useProjectDetails } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, ExternalLink, Share2, BookOpen, Tag, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProjectDetails(id || '');

  if (!id) {
    return <Navigate to="/projects" replace />;
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-32" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !project) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="text-6xl">😞</div>
          <h2 className="text-2xl font-bold">Projeto não encontrado</h2>
          <p className="text-muted-foreground text-center max-w-md">
            O projeto que você está procurando pode ter sido removido ou não existe.
          </p>
          <Button asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Projetos
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const shareProject = () => {
    if (navigator.share) {
      navigator.share({
        title: project.titulo,
        text: project.descricao,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Idealmente mostrar um toast aqui
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>

          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              {project.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Criado em {formatDate(project.data_criacao)}</span>
              </div>
              {project.data_modificacao !== project.data_criacao && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Atualizado em {formatDate(project.data_modificacao)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={shareProject}>
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Image */}
            {project.imageurl && (
              <Card className="overflow-hidden">
                <img
                  src={project.imageurl}
                  alt={project.titulo}
                  className="w-full h-64 lg:h-80 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=320&fit=crop&crop=entropy&auto=format&q=60`;
                  }}
                />
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Descrição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.descricao}
                </p>
              </CardContent>
            </Card>

            {/* Content */}
            {project.conteudo && (
              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo Detalhado</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{project.conteudo}</ReactMarkdown>
                </CardContent>
              </Card>
            )}

            {/* No content placeholder */}
            {!project.conteudo && (
              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  Este projeto ainda não possui conteúdo detalhado disponível.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Projeto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                  <div className="mt-1">
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                      <Tag className="h-3 w-3" />
                      {project.categoria}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID do Projeto</label>
                  <p className="mt-1 font-mono text-sm">{project.id}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Criação</label>
                  <p className="mt-1">{formatDate(project.data_criacao)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Última Modificação</label>
                  <p className="mt-1">{formatDate(project.data_modificacao)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Projects Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Projetos Relacionados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Funcionalidade em desenvolvimento. Em breve você poderá ver projetos similares aqui.
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" onClick={shareProject}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar Projeto
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/projects?category=${encodeURIComponent(project.categoria)}`}>
                    <Tag className="mr-2 h-4 w-4" />
                    Ver Categoria
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetail;
