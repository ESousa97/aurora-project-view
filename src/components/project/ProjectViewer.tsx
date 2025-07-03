import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectViewerContent } from './ProjectViewerContent';
import { ProjectViewerHeader } from './ProjectViewerHeader';
import { ProjectCard as ProjectCardType } from '@/types';

interface ProjectViewerProps {
  project: ProjectCardType;
  onBack?: () => void;
}

interface RawProject {
  id: ProjectCardType['id'];
  conteudo?: string;
  content?: string;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ project, onBack }) => {
  const [projectContent, setProjectContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setContentError(null);
      
      // Simular delay de carregamento para manter UX consistente
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // O conteúdo já está no projeto (dados estáticos)
      if (project.conteudo) {
        setProjectContent(project.conteudo);
      } else {
        setContentError('Conteúdo não disponível para este projeto.');
      }
      
      setIsLoading(false);
    };
    
    loadContent();
  }, [project.id, project.conteudo, retryCount]);

  const handleCopy = (text: string) => navigator.clipboard.writeText(text);
  const handleRetry = () => setRetryCount(prev => prev + 1);

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      );
    }
    if (contentError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
          <p className="mb-4 text-center">{contentError}</p>
          <Button onClick={handleRetry} variant="outline">Tentar novamente</Button>
        </div>
      );
    }
    if (!projectContent) {
      return (
        <div className="flex items-center justify-center h-full">
          <p>Conteúdo não disponível</p>
        </div>
      );
    }
    return (
      <AnimatePresence>
        <motion.div
          key={projectContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectViewerContent
            content={projectContent}
            onCopy={handleCopy}
            renderVideo={() => null}
            className="w-full"
          />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ProjectViewerHeader project={project} onBack={onBack} isLoading={isLoading} />
      <main className="flex-1 p-4 lg:p-8">
        <h1 className="text-5xl font-bold mb-4">{project.titulo}</h1>
        {project.descricao && <p className="text-xl text-muted-foreground mb-6">{project.descricao}</p>}
        <div ref={contentRef} className="prose lg:prose-xl max-w-none">
          {renderMainContent()}
        </div>
      </main>
      <footer className="py-2 bg-muted/30 text-center text-sm text-muted-foreground">
        © 2025 José Enoque - Todos os direitos reservados
      </footer>
    </div>
  );
};
