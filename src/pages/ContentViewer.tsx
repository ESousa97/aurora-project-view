// src/pages/ContentViewer.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, ExternalLink, Share, Download } from 'lucide-react';
import { getCategoryColor } from '@/lib/languageColors';

// Mock data para demonstração
const mockProjects = {
  'project0001': {
    id: 'project0001',
    title: 'Sistema de Gestão Empresarial',
    category: 'JAVASCRIPT',
    description: 'Um sistema completo de gestão empresarial desenvolvido com tecnologias modernas',
    lastModified: '2025-01-15T10:30:00Z',
    readTime: '15 min'
  },
  'project0002': {
    id: 'project0002', 
    title: 'Portfolio Criativo Digital',
    category: 'REACT',
    description: 'Uma experiência digital imersiva que combina arte, tecnologia e storytelling',
    lastModified: '2025-01-10T14:20:00Z',
    readTime: '12 min'
  },
  'project0003': {
    id: 'project0003',
    title: 'Plataforma de IA Conversacional', 
    category: 'PYTHON',
    description: 'Uma plataforma revolucionária que combina inteligência artificial avançada com interface humana',
    lastModified: '2025-01-08T16:45:00Z',
    readTime: '18 min'
  }
};

const ContentViewer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [content, setContent] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const projectInfo = projectId ? mockProjects[projectId as keyof typeof mockProjects] : null;
  const categoryConfig = projectInfo ? getCategoryColor(projectInfo.category) : null;

  React.useEffect(() => {
    const loadContent = async () => {
      if (!projectId) {
        setError('ID do projeto não encontrado');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Simular carregamento do conteúdo markdown
        const response = await fetch(`/src/content/${projectId}/${projectId}.md`);
        
        if (!response.ok) {
          throw new Error('Conteúdo não encontrado');
        }
        
        const markdownContent = await response.text();
        setContent(markdownContent);
      } catch (err) {
        setError('Erro ao carregar o conteúdo');
        console.error('Erro ao carregar markdown:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [projectId]);

  if (isLoading) {
    return (
      <AppLayout>
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
      </AppLayout>
    );
  }

  if (error || !projectInfo) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div 
            className="text-center space-y-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-3xl font-bold text-foreground">
              Conteúdo não encontrado
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {error || 'O conteúdo que você procura não existe ou foi removido.'}
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar aos projetos
              </Link>
            </Button>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Navegação */}
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="outline" size="sm">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>

            <Badge 
              className="border-0 shadow-sm"
              style={{ 
                backgroundColor: `${categoryConfig?.color}20`, 
                color: categoryConfig?.color 
              }}
            >
              <span className="flex items-center gap-1">
                {React.createElement(categoryConfig?.icon || ExternalLink, { 
                  className: "h-3 w-3" 
                })}
                {projectInfo.category}
              </span>
            </Badge>
          </div>

          {/* Título e metadados */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {projectInfo.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {projectInfo.description}
            </p>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Atualizado em {new Date(projectInfo.lastModified).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Leitura de {projectInfo.readTime}</span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-3 pt-4">
              <Button size="sm" variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              
              <Button size="sm" variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver código
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <MarkdownRenderer 
          content={content}
          className="max-w-none"
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-2">Gostou do projeto?</h3>
              <p className="text-muted-foreground text-sm">
                Explore outros projetos similares ou entre em contato.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button asChild>
                <Link to="/projects">
                  Ver mais projetos
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ContentViewer;