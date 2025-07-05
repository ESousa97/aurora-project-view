// src/components/project/ProjectViewer.tsx (Versão MDX Otimizada)
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, BookOpen, Clock, User, Tag, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProjectViewerContent } from './ProjectViewerContent';
import { RelatedProjects } from './RelatedProjects';
import { toast } from 'sonner';
import { formatProjectDate } from '@/utils/projectHelpers';
import { detectLanguage } from '@/lib/languageColors';
import { getMDXProjectMetadata } from '@/utils/mdxProjectLoader';
import type { ProjectCard as ProjectCardType } from '@/types';

interface ProjectViewerProps {
  project: ProjectCardType;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ project }) => {
  const [isLoading, setIsLoading] = useState(false);
  const languageConfig = detectLanguage(project);
  
  // Obter metadados adicionais do MDX
  const mdxMetadata = getMDXProjectMetadata(project.id);

  // Função para copiar conteúdo
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Conteúdo copiado para a área de transferência!');
    }).catch(() => {
      toast.error('Erro ao copiar conteúdo');
    });
  }, []);

  // Função para compartilhar projeto
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: project.titulo,
        text: project.descricao,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  }, [project]);

  // Renderizar vídeo do YouTube
  const renderVideo = useCallback((videoId: string) => {
    return (
      <div className="my-8">
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&showinfo=0&vq=hd1080`}
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={`Vídeo demonstrativo - ${project.titulo}`}
          />
        </div>
      </div>
    );
  }, [project.titulo]);

  useEffect(() => {
    // Simular carregamento para feedback visual
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [project.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-8 max-w-4xl w-full mx-auto p-8">
          <div className="h-16 bg-muted rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header com navegação */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4" />
              Voltar aos Projetos
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            {/* Links externos do MDX */}
            {mdxMetadata?.repositorio && (
              <Button variant="outline" asChild className="gap-2">
                <a href={mdxMetadata.repositorio} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Código
                </a>
              </Button>
            )}
            
            {mdxMetadata?.demo && (
              <Button variant="outline" asChild className="gap-2">
                <a href={mdxMetadata.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
            
            <Button variant="outline" onClick={handleShare} className="gap-2">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Cabeçalho do projeto com metadados MDX */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          {/* Título e descrição */}
          <div className="mb-6">
            <motion.h1 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {project.titulo}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.descricao}
            </motion.p>
          </div>

          {/* Metadados e badges */}
          <div className="space-y-4">
            {/* Informações de data e categoria */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Modificado: {formatProjectDate(project.data_modificacao)}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Criado: {formatProjectDate(project.data_criacao)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <Badge 
                  variant="secondary"
                  style={{ 
                    backgroundColor: `${languageConfig.color}20`,
                    color: languageConfig.color,
                    borderColor: languageConfig.color
                  }}
                >
                  {project.categoria}
                </Badge>
              </div>
            </div>

            {/* Tecnologias (do MDX) */}
            {mdxMetadata?.tecnologias && mdxMetadata.tecnologias.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Tecnologias:</span>
                {mdxMetadata.tecnologias.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            {/* Dificuldade e Featured (do MDX) */}
            <div className="flex items-center gap-4">
              {mdxMetadata?.dificuldade && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Dificuldade:</span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full mr-1 ${
                          i < mdxMetadata.dificuldade 
                            ? 'bg-primary' 
                            : 'bg-muted-foreground/20'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {mdxMetadata.dificuldade}/5
                    </span>
                  </div>
                </div>
              )}

              {mdxMetadata?.featured && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  ⭐ Em Destaque
                </Badge>
              )}
            </div>

            {/* Tags (do MDX) */}
            {mdxMetadata?.tags && mdxMetadata.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                {mdxMetadata.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Conteúdo principal MDX */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ProjectViewerContent
            content={project.conteudo || 'Conteúdo não disponível'}
            onCopy={handleCopy}
            renderVideo={renderVideo}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
          />
        </motion.div>

        {/* Separador */}
        <Separator className="my-12" />

        {/* Projetos relacionados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <RelatedProjects 
            projectId={project.id.toString()}
            category={project.categoria}
            currentProjectTitle={project.titulo}
          />
        </motion.div>
      </div>
    </div>
  );
};
