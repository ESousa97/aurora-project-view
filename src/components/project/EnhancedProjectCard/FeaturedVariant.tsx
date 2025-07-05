// src/components/project/EnhancedProjectCard/FeaturedVariant.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProjectCardImage } from '../ProjectCardImage';
import { ProjectCardContent } from '../ProjectCardContent';
import { ProjectCardFooter } from '../ProjectCardFooter';
import { MysteryOverlay } from './MysteryOverlay';
import { ProjectCardVariantProps } from './types';

export const FeaturedVariant: React.FC<ProjectCardVariantProps> = ({
  project,
  revealed,
  langConfig,
  index,
  onClick,
  viewportRef, // não usado mas aceito por compatibilidade
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring' }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      className="h-full"
    >
      <Card
        className="relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col ring-2 ring-transparent hover:ring-primary/20"
        style={{
          backgroundColor: revealed ? (langConfig.bgColor as string) : 'hsl(var(--muted))',
          backgroundImage: revealed
            ? `linear-gradient(135deg, ${langConfig.color}20, transparent)`
            : `linear-gradient(135deg, var(--muted), var(--background))`,
          borderColor: revealed ? (langConfig.color as string) : 'transparent'
        }}
      >
        {/* Top image/icon with larger aspect ratio for featured */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <ProjectCardImage
            project={project}
            isRevealed={revealed}
            viewProgress={100}
            enhancedLanguage={revealed ? langConfig : undefined}
          />
          <MysteryOverlay isVisible={!revealed} />
          
          {/* Featured badge */}
          {revealed && (
            <div className="absolute top-3 right-3">
              <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${langConfig.gradient} text-white text-xs font-medium shadow-lg`}>
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Content with more padding for featured */}
        <CardContent className="flex-1 p-6">
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
