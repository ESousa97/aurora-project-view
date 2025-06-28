
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ProjectViewerContent } from './ProjectViewerContent';
import { ProjectViewerHeader } from './ProjectViewerHeader';
import { ProjectCard as ProjectCardType } from '@/types';

interface ProjectViewerProps {
  project: ProjectCardType;
  onBack?: () => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ 
  project, 
  onBack 
}) => {
  const [videoLoaded, setVideoLoaded] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoadVideo = (videoId: string) => {
    setVideoLoaded(videoId);
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado para a área de transferência!'))
      .catch(() => toast.error('Erro ao copiar conteúdo'));
  };

  const renderVideo = (videoId: string) => (
    videoLoaded === videoId ? (
      <motion.div 
        className={`relative rounded-xl overflow-hidden shadow-2xl mb-6 transition-all duration-500 ${
          isExpanded ? 'h-[80vh]' : 'h-[400px]'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&vq=hd1080`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleExpand}
          className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white border-0 backdrop-blur-sm"
        >
          {isExpanded ? (
            <>
              <Minimize2 className="h-4 w-4 mr-2" />
              Minimizar
            </>
          ) : (
            <>
              <Maximize2 className="h-4 w-4 mr-2" />
              Expandir
            </>
          )}
        </Button>
      </motion.div>
    ) : (
      <div className="flex justify-start items-center h-20 mb-6">
        <Button
          variant="outline"
          onClick={() => handleLoadVideo(videoId)}
          className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <Video className="h-4 w-4 mr-2" />
          Carregar Vídeo do YouTube
        </Button>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <ProjectViewerHeader 
        project={project}
        onBack={onBack}
      />
      
      <motion.div 
        className="container mx-auto px-6 py-8 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="p-8 md:p-12 shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          {/* Project Header */}
          <div className="mb-12">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.titulo}
            </motion.h1>
            {project.descricao && (
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {project.descricao}
              </motion.p>
            )}
          </div>

          {/* Project Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ProjectViewerContent 
              content={project.conteudo || 'Conteúdo não disponível para este projeto.'}
              onCopy={handleCopy}
              renderVideo={renderVideo}
            />
          </motion.div>
        </Card>
      </motion.div>

      {/* Minimal Footer */}
      <footer className="mt-16 pb-8 text-center text-sm text-muted-foreground/60">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Desenvolvido por <strong className="text-foreground/80">José Enoque</strong> 
          <span className="mx-2">•</span>
          Powered by React & TypeScript
        </motion.div>
      </footer>
    </div>
  );
};
