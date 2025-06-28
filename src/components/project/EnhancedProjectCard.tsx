import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Target, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import type { EnhancedProjectCard as EnhancedProjectCardType } from '@/types/enhanced';
import { LANGUAGE_COLORS, LanguageColor } from '@/lib/languageColors';
import { ProjectCardImage } from './ProjectCardImage';
import { ProjectCardContent } from './ProjectCardContent';
import { ProjectCardFooter } from './ProjectCardFooter';
import { useProjectEngagement } from '@/hooks/useProjectEngagement';

interface EnhancedProjectCardProps {
  project: EnhancedProjectCardType | null | undefined;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = React.memo(({ 
  project,
  variant = 'default',
  index = 0,
  onDiscover,
  isDiscovered = false
}) => {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(variant !== 'mystery');
  useProjectEngagement(project);

  // Detect language config
  const langConfig: LanguageColor = useMemo(
    () => project?.detectedLanguage ?? LANGUAGE_COLORS.default,
    [project]
  );
  const ProjectIcon = langConfig.icon;

  // Unified click handler: reveal then navigate
  const handleClick = useCallback(() => {
    if (!project?.id) return;
    if (!revealed) {
      setRevealed(true);
      toast.success(`Descobriu ${project.titulo}!`, { duration: 2000 });
      onDiscover?.(project.id);
      return;
    }
    navigate(`/projects/${project.id}`);
  }, [project, revealed, navigate, onDiscover]);

  // Compact variant
  if (variant === 'compact') {
    if (!project?.id) return null;
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
      >
        <Card
          className="flex items-center justify-between p-2 h-16 rounded-lg shadow-sm cursor-pointer transition-shadow duration-200"
          style={{
            backgroundColor: revealed ? langConfig.bgColor : 'hsl(var(--muted))',
            borderColor: revealed ? langConfig.color : 'transparent'
          }}
        >
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-md bg-gradient-to-br ${revealed ? langConfig.gradient : 'from-gray-300 to-gray-400'}`}
            >
              {revealed ? (
                <ProjectIcon className="h-5 w-5 text-white" />
              ) : (
                <HelpCircle className="h-5 w-5 text-white animate-pulse" />
              )}
            </div>
            <span className="text-sm font-medium truncate">{project.titulo}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Card>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring' }}
      whileHover={{ scale: 1.03 }}
      onClick={handleClick}
      className="h-full"
    >
      <Card
        className="relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col"
        style={{
          backgroundColor: revealed ? langConfig.bgColor : 'hsl(var(--muted))',
          backgroundImage: revealed
            ? `linear-gradient(135deg, ${langConfig.color}10, transparent)`
            : `linear-gradient(135deg, var(--muted), var(--background))`,
          borderColor: revealed ? langConfig.color : 'transparent'
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
          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <HelpCircle className="h-8 w-8 text-white animate-pulse" />
            </div>
          )}
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
});
