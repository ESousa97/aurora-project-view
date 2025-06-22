// src/pages/ProjectDetail.tsx
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useProjectDetails } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, ExternalLink, Share2, BookOpen, Tag, Clock, Heart, Eye, Star, Sparkles, Code, Zap, Target } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RelatedProjects } from '@/components/project/RelatedProjects';
import { toast } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { detectLanguage, getCategoryColor } from '@/lib/languageColors';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProjectDetails(id || '');
  const [isLiked, setIsLiked] = React.useState(false);
  const [viewProgress, setViewProgress] = React.useState(0);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [readingTime, setReadingTime] = React.useState(0);

  // Scroll progress para engajamento
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setViewProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular tempo de leitura
  React.useEffect(() => {
    if (project?.conteudo) {
      const wordsPerMinute = 200;
      const wordCount = project.conteudo.split(' ').length;
      const time = Math.ceil(wordCount / wordsPerMinute);
      setReadingTime(time);
    }
  }, [project]);

  if (!id) {
    return <Navigate to="/projects" replace />;
  }

  const languageConfig = project ? detectLanguage(project) : null;
  const categoryConfig = project ? getCategoryColor(project.categoria) : null;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
            <div className="h-full bg-primary/30 animate-pulse" style={{ width: '40%' }} />
          </div>

          {/* Header Skeleton */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Skeleton className="h-10 w-32" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </motion.div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !project) {
    return (
      <AppLayout>
        <motion.div 
          className="flex flex-col items-center justify-center py-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl"
          >
            😞
          </motion.div>
          <h2 className="text-3xl font-bold">Projeto não encontrado</h2>
          <p className="text-muted-foreground text-center max-w-md leading-relaxed">
            O projeto que você está procurando pode ter sido removido ou não existe. 
            Mas não desanime, há muitas outras descobertas esperando por você!
          </p>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar aos Projetos
              </Link>
            </Button>
            <Button asChild>
              <Link to="/">
                <Target className="mr-2 h-4 w-4" />
                Página Inicial
              </Link>
            </Button>
          </div>
        </motion.div>
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

  const handleShare = () => {
    const shareData = {
      title: project.titulo,
      text: project.descricao,
      url: window.location.href,
    };
    
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData);
      toast.success("Compartilhado!", { 
        description: "O projeto foi compartilhado com sucesso." 
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link Copiado!", { 
        description: "O link do projeto foi copiado para sua área de transferência." 
      });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removido dos favoritos" : "Adicionado aos favoritos!", {
      description: isLiked ? "Projeto removido da sua lista" : "Você pode encontrá-lo facilmente depois",
      duration: 2000,
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Bookmark removido" : "Projeto salvo!", {
      description: isBookmarked ? "Removido da sua lista de leitura" : "Adicionado à sua lista de leitura",
      duration: 2000,
    });
  };

  return (
    <AppLayout>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={viewProgress} className="h-1 rounded-none bg-transparent" />
      </div>

      <div className="space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <Button variant="outline" asChild className="w-fit">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar à Exploração
              </Link>
            </Button>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                {languageConfig && (
                  <div 
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${languageConfig.gradient} shadow-lg flex items-center justify-center`}
                  >
                    <span className="text-xs">{languageConfig.icon}</span>
                  </div>
                )}
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {project.titulo}
                </h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Criado em {formatDate(project.data_criacao)}</span>
                </div>
                {project.data_modificacao !== project.data_criacao && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Atualizado em {formatDate(project.data_modificacao)}</span>
                  </div>
                )}
                {readingTime > 0 && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{readingTime} min de leitura</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge 
                  className="border-0 shadow-sm"
                  style={{ 
                    backgroundColor: categoryConfig?.color + '20',
                    color: categoryConfig?.color 
                  }}
                >
                  {categoryConfig?.icon} {project.categoria}
                </Badge>
                {languageConfig && (
                  <Badge variant="outline" className="border-current" style={{ color: languageConfig.color }}>
                    {languageConfig.name}
                  </Badge>
                )}
              </div>
            </div>

            {/* Interactive Actions */}
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={isLiked ? "default" : "outline"}
                  onClick={handleLike}
                  className={isLiked ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Curtido' : 'Curtir'}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  onClick={handleBookmark}
                >
                  <Star className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Salvo' : 'Salvar'}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Project Image */}
            {project.imageurl && (
              <Card className="overflow-hidden">
                <motion.img
                  src={project.imageurl}
                  alt={project.titulo}
                  className="w-full h-64 lg:h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
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
                  Sobre este Projeto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.descricao}
                </p>
              </CardContent>
            </Card>

            {/* Content */}
            {project.conteudo ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Conteúdo Detalhado
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{project.conteudo}</ReactMarkdown>
                </CardContent>
              </Card>
            ) : (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  Este projeto ainda não possui conteúdo detalhado disponível. 
                  Mas não se preocupe, há muito mais para descobrir!
                </AlertDescription>
              </Alert>
            )}
          </motion.div>

          {/* Enhanced Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Informações Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                  <div className="mt-2">
                    <Badge 
                      variant="secondary" 
                      className="flex items-center gap-2 w-fit text-sm py-1"
                      style={{ backgroundColor: categoryConfig?.color + '20', color: categoryConfig?.color }}
                    >
                      <Tag className="h-3 w-3" />
                      {project.categoria}
                    </Badge>
                  </div>
                </div>

                {languageConfig && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Linguagem Principal</label>
                    <div className="mt-2">
                      <Badge variant="outline" className="flex items-center gap-2 w-fit">
                        <span>{languageConfig.icon}</span>
                        {languageConfig.name}
                      </Badge>
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID do Projeto</label>
                  <p className="mt-1 font-mono text-sm bg-muted px-2 py-1 rounded">{project.id}</p>
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

            {/* Related Projects */}
            <RelatedProjects projectId={project.id.toString()} category={project.categoria} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar Projeto
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/projects?category=${encodeURIComponent(project.categoria)}`}>
                    <Tag className="mr-2 h-4 w-4" />
                    Explorar Categoria
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/projects">
                    <Eye className="mr-2 h-4 w-4" />
                    Todos os Projetos
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Engagement Stats */}
            <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <h4 className="font-semibold">Sua Jornada</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Leitura</span>
                      <span>{Math.round(viewProgress)}%</span>
                    </div>
                    <Progress value={viewProgress} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Continue explorando para descobrir mais!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetail;
