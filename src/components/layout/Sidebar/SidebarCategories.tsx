// src/components/layout/Sidebar/SidebarCategories.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SiGlobe } from '@/lib/languageColors/icons';
import { FolderOpen } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { CategoryItem } from './CategoryItem';
import { Category } from './types';

interface SidebarCategoriesProps {
  categories: Category[];
  isLoading: boolean;
  onClose: () => void;
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = ({
  categories,
  isLoading,
  onClose,
}) => {
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const navigate = useNavigate();

  const handleAllCategoriesClick = () => {
    setSelectedCategory('');
    navigate('/projects');
    onClose();
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate('/projects');
    onClose();
  };

  const handleViewMoreClick = () => {
    navigate('/projects');
    onClose();
  };

  const totalProjectsCount = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="p-4">
      <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center space-x-1">
        <SiGlobe className="h-4 w-4" />
        <span>Territórios</span>
        <Badge variant="outline" className="ml-auto">{categories.length}</Badge>
      </h3>

      <Button
        variant={selectedCategory === '' ? 'secondary' : 'ghost'}
        className="w-full justify-start space-x-3 py-2 mb-3"
        onClick={handleAllCategoriesClick}
      >
        <FolderOpen className="h-5 w-5 flex-shrink-0" />
        <span className="flex-1 text-left">Todos</span>
        <Badge variant="outline">{totalProjectsCount}</Badge>
      </Button>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted/20 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {categories.slice(0, 12).map((category, i) => (
            <CategoryItem
              key={category.name}
              category={category}
              isActive={selectedCategory === category.name}
              index={i}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}

          {categories.length > 12 && (
            <Button
              variant="ghost"
              className="w-full justify-center py-2 mt-2"
              onClick={handleViewMoreClick}
            >
              Ver mais...
            </Button>
          )}
        </>
      )}
    </div>
  );
};