// src/components/project/EnhancedProjectCard/CompactVariant.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { ProjectCardVariantProps } from './types';

export const CompactVariant: React.FC<ProjectCardVariantProps> = ({
  project,
  revealed,
  langConfig,
  index,
  onClick,
}) => {
  const ProjectIcon = langConfig.icon;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <Card
        className="flex items-center justify-between p-2 h-16 rounded-lg shadow-sm cursor-pointer transition-shadow duration-200"
        style={{
          backgroundColor: revealed ? (langConfig.bgColor as string) : 'hsl(var(--muted))',
          borderColor: revealed ? (langConfig.color as string) : 'transparent'
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className={`p-1 rounded-md bg-gradient-to-br ${
              revealed ? langConfig.gradient : 'from-gray-300 to-gray-400'
            }`}
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
};
