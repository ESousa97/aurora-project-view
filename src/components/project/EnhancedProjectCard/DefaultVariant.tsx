// src/components/project/EnhancedProjectCard/DefaultVariant.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProjectCardImage } from '../ProjectCardImage';
import { ProjectCardContent } from '../ProjectCardContent';
import { ProjectCardFooter } from '../ProjectCardFooter';
import { MysteryOverlay } from './MysteryOverlay';
import { ProjectCardVariantProps } from './types';

export const DefaultVariant: React.FC<ProjectCardVariantProps> = ({
  project,
  revealed,
  langConfig,
  index,
  onClick,
  viewportRef,
}) => {
  return (
    <motion.div
      ref={viewportRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring' }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="h-full"
    >
      <Card
        className="relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col"
        style={{
          backgroundColor: revealed ? (langConfig.bgColor as string) : 'hsl(var(--muted))',
          backgroundImage: revealed
            ? `linear-gradient(135deg, ${langConfig.color}10, transparent)`
            : `linear-gradient(135deg, var(--muted), var(--background))`,
          borderColor: revealed ? (langConfig.color as string) : 'transparent'
        }}
      >
        {/* Top image/icon */}
        <div className="relative aspect-video overflow-hidden">
          <ProjectCardImage
            project={project}
            isRevealed={revealed}
            viewProgress={100}
            enhancedLanguage={revealed ? langConfig : undefined}
          />
          <MysteryOverlay isVisible={!revealed} />
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-4">
          <ProjectCardContent
            project={project}
            isRevealed={revealed}
            variant="default"
            enhancedLanguage={revealed ? langConfig : undefined}
          />
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-0">
          <ProjectCardFooter
            project={project}
            isRevealed={revealed}
            enhancedLanguage={revealed ? langConfig : undefined}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
