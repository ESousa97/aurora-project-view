
// src/components/layout/sidebar/SidebarCategories.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCategories } from '@/hooks/useProjects';
import { useUIStore } from '@/stores/uiStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategoryColor } from '@/lib/languageColors';
import { FolderOpen, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SidebarCategories: React.FC = () => {
  const { data: categories = [], isLoading } = useCategories();
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const navigate = useNavigate();

  const onAllProjectsClick = () => {
    setSelectedCategory('');
    navigate('/projects');
  };

  const onCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate('/projects');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          Categorias
        </h3>
        <Badge variant="outline" className="text-xs">
          {categories.length}
        </Badge>
      </div>

      {/* Todos os projetos */}
      <Button
        variant={selectedCategory === '' ? 'secondary' : 'ghost'}
        className="w-full justify-between h-10 mb-3 font-medium"
        onClick={onAllProjectsClick}
      >
        <div className="flex items-center gap-3">
          <FolderOpen className="h-4 w-4 flex-shrink-0" />
          <span>Todos</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {categories.reduce((sum, c) => sum + c.count, 0)}
        </Badge>
      </Button>

      {/* Lista de categorias */}
      <div className="space-y-1">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted animate-pulse rounded-lg" />
          ))
        ) : (
          categories.slice(0, 12).map((cat, i) => {
            const active = selectedCategory === cat.name;
            const { color } = getCategoryColor(cat.name);
            
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Button
                  variant={active ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-between h-10 font-medium',
                    active 
                      ? 'bg-surface-hover border-divider-strong'
                      : 'hover:bg-surface-hover'
                  )}
                  onClick={() => onCategoryClick(cat.name)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-sm flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Hash className="h-3 w-3" style={{ color }} />
                    </div>
                    <span className="truncate text-sm">{cat.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {cat.count}
                  </Badge>
                </Button>
              </motion.div>
            );
          })
        )}

        {categories.length > 12 && (
          <Button
            variant="ghost"
            className="w-full justify-center h-10 text-sm text-muted-foreground mt-2"
            onClick={() => navigate('/projects')}
          >
            Ver mais categorias...
          </Button>
        )}
      </div>
    </div>
  );
};
