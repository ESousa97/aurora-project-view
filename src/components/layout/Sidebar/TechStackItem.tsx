// src/components/layout/Sidebar/TechStackItem.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/lib/languageColors';
import { GradientIcon } from '@/components/GradientIcon';
import type { StackCategory } from '@/utils/stackCategorization';

interface TechStackItemProps {
  stackCategory: StackCategory;
  isActive: boolean;
  index: number;
  collapsed: boolean;
  onClick: () => void;
}

export const TechStackItem: React.FC<TechStackItemProps> = ({
  stackCategory,
  isActive,
  index,
  collapsed,
  onClick,
}) => {
  const primaryTechConfig = getCategoryColor(stackCategory.primaryTech);
  const { gradient, icon: Icon, color } = primaryTechConfig;

  const shouldUseGradient = 
    primaryTechConfig.name === 'combined' || 
    stackCategory.technologies.length > 1 ||
    primaryTechConfig.name === 'python';

  return (
    <motion.div
      className="mb-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
          'w-full justify-start gap-3 py-3 h-auto overflow-hidden transition-all duration-300',
          'group relative',
          isActive
            ? 'bg-primary/90 text-white shadow-md'
            : 'text-muted-foreground hover:bg-muted/10 hover:text-foreground'
        )}
        onClick={onClick}
        title={`${stackCategory.name} - ${stackCategory.technologies.join(', ')}`}
      >
        {/* Left gradient accent */}
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-1 rounded-r transition-all duration-300',
            isActive ? 'bg-white/30' : 'bg-primary/50 group-hover:bg-primary/70'
          )}
        />

        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300',
          isActive ? 'bg-white/10' : 'bg-muted/30 group-hover:bg-muted/50'
        )}>
          {shouldUseGradient ? (
            <GradientIcon icon={Icon} gradient={gradient} className="h-5 w-5" />
          ) : (
            <Icon
              className="h-5 w-5 transition-colors duration-300"
              style={{ color: isActive ? '#fff' : color }}
            />
          )}
        </div>

        {/* Content */}
        {!collapsed && (
          <div className="flex-1 min-w-0">
            {/* Stack name and count */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm truncate">
                {stackCategory.name}
              </span>
              <Badge
                variant={isActive ? 'secondary' : 'outline'}
                className={cn(
                  'text-xs font-bold transition-all duration-300 flex-shrink-0',
                  isActive && 'bg-white/20 text-white border-white/30'
                )}
              >
                {stackCategory.count}
              </Badge>
            </div>

            {/* Technologies tags */}
            <div className="flex flex-wrap gap-1">
              {stackCategory.technologies.slice(0, 3).map((tech, i) => {
                const techConfig = getCategoryColor(tech);
                return (
                  <span
                    key={tech}
                    className={cn(
                      'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium',
                      'border transition-all duration-300',
                      isActive
                        ? 'bg-white/10 text-white/90 border-white/20'
                        : 'bg-muted/20 text-muted-foreground border-muted/30'
                    )}
                    title={tech}
                  >
                    <techConfig.icon className="h-2.5 w-2.5" style={{ color: isActive ? '#fff' : techConfig.color }} />
                    <span className="truncate max-w-12">{tech}</span>
                  </span>
                );
              })}
              {stackCategory.technologies.length > 3 && (
                <span
                  className={cn(
                    'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium',
                    'border transition-all duration-300',
                    isActive
                      ? 'bg-white/10 text-white/70 border-white/20'
                      : 'bg-muted/20 text-muted-foreground border-muted/30'
                  )}
                >
                  +{stackCategory.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </Button>
    </motion.div>
  );
};