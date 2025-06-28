
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, ExternalLink, Video, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ProjectViewerContent } from './ProjectViewerContent';
import { ProjectViewerHeader } from './ProjectViewerHeader';
import { ProjectCard as ProjectCardType } from '@/types';
import { Link } from 'react-router-dom';

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
      .then(() => toast.success('Conteúdo copiado!'))
      .catch(() => toast.error('Erro ao copiar conteúdo'));
  };

  const renderVideo = (videoId: string) => (
    videoLoaded === videoId ? (
      <motion.div 
        className={`relative rounded-lg overflow-hidden shadow-lg mb-4 ${
          isExpanded ? 'h-[85vh]' : 'h-[30vh]'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
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
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
        >
          {isExpanded ? (
            <>
              <Minimize2 className="h-4 w-4 mr-1" />
              Minimizar
            </>
          ) : (
            <>
              <Maximize2 className="h-4 w-4 mr-1" />
              Expandir
            </>
          )}
        </Button>
      </motion.div>
    ) : (
      <div className="flex justify-start items-center h-16 mb-4">
        <Button
          variant="outline"
          onClick={() => handleLoadVideo(videoId)}
          className="shadow-sm"
        >
          <Video className="h-4 w-4 mr-2" />
          Carregar Vídeo
        </Button>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <ProjectViewerHeader 
        project={project}
        onBack={onBack}
      />
      
      <motion.div 
        className="container mx-auto px-4 py-8 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8 shadow-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground border-b-2 border-border pb-2">
              {project.titulo}
            </h1>
            {project.descricao && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.descricao}
              </p>
            )}
          </div>

          <ProjectViewerContent 
            content={project.conteudo || 'Conteúdo não disponível'}
            onCopy={handleCopy}
            renderVideo={renderVideo}
          />
        </Card>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-sm text-muted-foreground opacity-60">
        Desenvolvido por <strong className="ml-1">José Enoque</strong> ✦ Powered by React & TypeScript
      </footer>
    </div>
  );
};
