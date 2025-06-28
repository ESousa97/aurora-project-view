import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/lib/languageColors';
import { Category } from './types';
import { GradientIcon } from '@/components/GradientIcon';

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isActive,
  index,
  onClick,
}) => {
  const colorCfg = getCategoryColor(category.name);
  const { gradient, icon: Icon, color } = colorCfg;

  const isMultiLanguage =
    colorCfg.name === 'combined' || category.name.includes('+');
  const isPython = colorCfg.name === 'python';

  return (
    <motion.div
      className="mb-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
          'w-full justify-between space-x-3 py-2 overflow-hidden transition-all duration-300',
          isActive
            ? 'text-white shadow-md bg-primary/90'
            : 'text-muted-foreground hover:bg-muted/10'
        )}
        onClick={onClick}
      >
        {/* Ícone */}
        <span
          className={cn(
            'inline-flex items-center justify-center h-6 w-6 rounded transition-all duration-300',
            isActive ? 'bg-white/10' : 'bg-surface'
          )}
        >
          {isMultiLanguage || isPython ? (
            <GradientIcon icon={Icon} gradient={gradient} className="h-4 w-4" />
          ) : (
            <Icon
              className="h-4 w-4"
              style={{ color: isActive ? '#fff' : color }}
            />
          )}
        </span>

        <span className="flex-1 truncate font-medium">{category.name}</span>

        <Badge
          variant={isActive ? 'secondary' : 'outline'}
          className={cn(
            'flex-shrink-0 transition-all duration-300',
            isActive && 'bg-white/20 text-white border-white/30'
          )}
        >
          {category.count}
        </Badge>
      </Button>
    </motion.div>
  );
};
