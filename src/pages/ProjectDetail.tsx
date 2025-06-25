
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye, Share2, Star, GitBranch, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProjectsWithLanguage } from '@/hooks/useCategories';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RelatedProjects } from '@/components/project/RelatedProjects';
import { ProjectCardEngagement } from '@/components/project/ProjectCardEngagement';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projects, isLoading } = useProjectsWithLanguage();
  
  const project = projects?.find(p => p.id === parseInt(id || '0'));

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4" />
            <div className="h-64 bg-muted rounded mb-8" />
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Projeto não encontrado</h1>
          <p className="text-muted-foreground">O projeto que você procura não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos projetos
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const languageConfig = project.detectedLanguage;
  const LanguageIcon = languageConfig?.icon;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div 
        className="relative bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/5 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Projetos</span>
              <span>/</span>
              <span className="text-foreground font-medium">{project.titulo}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações principais */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {/* Título e linguagem */}
                <div className="flex items-start gap-4">
                  {languageConfig && (
                    <div 
                      className="p-3 rounded-xl shadow-lg flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${languageConfig.color}20, ${languageConfig.color}10)`,
                        border: `1px solid ${languageConfig.color}30`
                      }}
                    >
                      {LanguageIcon && <LanguageIcon className="h-8 w-8" style={{ color: languageConfig.color }} />}
                    </div>
                  )}
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{project.titulo}</h1>
                    {languageConfig && (
                      <Badge 
                        variant="outline"
                        className="text-sm px-3 py-1"
                        style={{ 
                          color: languageConfig.color,
                          borderColor: languageConfig.color + '40',
                          backgroundColor: languageConfig.color + '10'
                        }}
                      >
                        {LanguageIcon && <LanguageIcon className="h-4 w-4 mr-2" style={{ color: languageConfig.color }} />}
                        {languageConfig.displayName}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.descricao || 'Sem descrição disponível'}
                </p>
              </div>

              {/* Engagement */}
              <ProjectCardEngagement project={project} variant="default" />
            </div>

            {/* Sidebar com informações */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Informações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Criado em</h4>
                    <p className="text-sm">
                      {formatDistanceToNow(new Date(project.data_criacao), {
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Última atualização</h4>
                    <p className="text-sm">
                      {formatDistanceToNow(new Date(project.data_modificacao), {
                        addSuffix: true,  
                        locale: ptBR
                      })}
                    </p>
                  </div>
                  {languageConfig && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Tecnologia</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {LanguageIcon && <LanguageIcon className="h-4 w-4" style={{ color: languageConfig.color }} />}
                            <span className="text-sm font-medium">{languageConfig.displayName}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{languageConfig.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Ações */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button className="w-full" size="lg">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Projeto
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Star className="mr-2 h-4 w-4" />
                    Favoritar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Imagem do projeto */}
      <motion.div 
        className="max-w-6xl mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/80 flex items-center justify-center">
            {project.imageurl ? (
              <img 
                src={`${import.meta.env.VITE_API_BASE_URL}${project.imageurl}`}
                alt={project.titulo}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`text-center space-y-4 ${project.imageurl ? 'hidden' : ''}`}>
              {languageConfig && LanguageIcon && (
                <LanguageIcon className="h-16 w-16 mx-auto opacity-30" style={{ color: languageConfig.color }} />
              )}
              <p className="text-muted-foreground font-medium">
                Prévia do projeto: {project.titulo}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Projetos relacionados */}
      <motion.div 
        className="max-w-6xl mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RelatedProjects 
          projectId={project.id.toString()} 
          category={project.categoria}
          currentProjectTitle={project.titulo}
        />
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
