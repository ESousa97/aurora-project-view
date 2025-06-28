// src/components/layout/Sidebar/CategoryItem.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/lib/languageColors';
import { Category } from './types';

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
  const { gradient, icon: Icon } = getCategoryColor(category.name);

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
          'w-full justify-between space-x-3 py-2 relative overflow-hidden',
          isActive
            ? `bg-gradient-to-r ${gradient} text-white shadow-md`
            : 'text-muted-foreground hover:bg-muted/10'
        )}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-surface">
            <Icon 
              className="h-4 w-4" 
              style={{ color: isActive ? '#fff' : gradient.split(' ')[0] }} 
            />
          </span>
          <span className="flex-1 truncate font-medium">{category.name}</span>
        </div>
        <Badge variant="outline" className="flex-shrink-0">
          {category.count}
        </Badge>
      </Button>
    </motion.div>
  );
};
