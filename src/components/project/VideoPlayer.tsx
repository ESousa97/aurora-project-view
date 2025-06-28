// src/components/project/VideoPlayer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Video, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoId: string;
  isLoaded: boolean;
  isExpanded: boolean;
  onLoad: () => void;
  onToggleExpand: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  isLoaded,
  isExpanded,
  onLoad,
  onToggleExpand
}) => {
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center py-8 mb-6">
        <Button
          variant="outline"
          onClick={onLoad}
          className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <Video className="h-4 w-4 mr-2" />
          Carregar Vídeo
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden shadow-lg mb-6 transition-all duration-500 ${
        isExpanded ? 'fixed inset-4 z-50 bg-black' : 'aspect-video'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {isExpanded && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      )}
      <iframe
        className="w-full h-full border-0 relative z-10"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&vq=hd1080`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
      <Button
        variant="secondary"
        size="sm"
        onClick={onToggleExpand}
        className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm z-20"
      >
        {isExpanded ? (
          <>
            <Minimize2 className="h-4 w-4 mr-2" />
            Fechar
          </>
        ) : (
          <>
            <Maximize2 className="h-4 w-4 mr-2" />
            Expandir
          </>
        )}
      </Button>
    </motion.div>
  );
};
