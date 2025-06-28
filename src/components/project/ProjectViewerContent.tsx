// src/components/project/ProjectViewerContent.tsx (Componente Principal Refatorado)
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useContentProcessor } from '@/hooks/useContentProcessor';
import { useCopyHandler } from '@/hooks/useCopyHandler';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { ContentRenderer } from './ContentRenderer';
import { projectViewerStyles } from '@/styles/projectViewerStyles';

interface ProjectViewerContentProps {
  content: string;
  onCopy: (text: string) => void;
  renderVideo: (videoId: string) => React.ReactNode;
  className?: string;
}

export const ProjectViewerContent: React.FC<ProjectViewerContentProps> = ({
  content,
  onCopy,
  renderVideo,
  className = ""
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { createMarkup, processMarkdown } = useContentProcessor();
  const { copiedText, handleCopy } = useCopyHandler(onCopy);
  const { 
    videoLoaded, 
    isVideoExpanded, 
    handleVideoLoad, 
    toggleVideoExpand 
  } = useVideoPlayer();

  useEffect(() => {
    if (contentRef.current) {
      // Add target="_blank" to all links
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }, [content]);

  const processedContent = processMarkdown(content);

  return (
    <motion.article 
      ref={contentRef}
      className={`prose prose-lg max-w-none dark:prose-invert project-viewer-content ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <style>{projectViewerStyles}</style>
      
      <ContentRenderer
        processedContent={processedContent}
        copiedText={copiedText}
        videoLoaded={videoLoaded}
        isVideoExpanded={isVideoExpanded}
        onCopy={handleCopy}
        onVideoLoad={handleVideoLoad}
        onToggleVideoExpand={toggleVideoExpand}
        createMarkup={createMarkup}
      />
    </motion.article>
  );
};
