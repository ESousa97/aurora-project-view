import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useProjects';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import { SiRocket } from '@/lib/languageColors/icons';
import { navItems } from './constants';
import { getCategoryColor } from '@/lib/languageColors';

export const SidebarMinimized: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const { data: rawCategories = [] } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  // Remove duplicados e itens de home (href '/')
  const filteredNavItems = useMemo(() => {
    const map = new Map<string, typeof navItems[0]>();
    navItems.forEach(item => {
      if (item.href !== '/' && !map.has(item.href)) {
        map.set(item.href, item);
      }
    });
    return Array.from(map.values());
  }, []);

  // Remove categorias duplicadas e limita aos 8 primeiros
  const uniqueCategories = useMemo(() => {
    const map = new Map<string, typeof rawCategories[0]>();
    rawCategories.forEach(cat => {
      if (!map.has(cat.name)) {
        map.set(cat.name, cat);
      }
    });
    return Array.from(map.values()).slice(0, 8);
  }, [rawCategories]);

  const handleCategoryClick = (categoryName: string) => {
    console.log('Category clicked:', categoryName);
    setSelectedCategory(categoryName);
    navigate('/projects');
  };

  const handleAllProjectsClick = () => {
    console.log('All projects clicked');
    setSelectedCategory('');
    navigate('/projects');
  };

  return (
    <motion.aside
      className="fixed top-16 left-0 w-16 h-[calc(100vh-4rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-r border-gray-200/50 dark:border-gray-700/50 z-30"
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -64, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        pointerEvents: 'auto',
        userSelect: 'none'
      }}
    >
      <div className="flex flex-col h-full p-1 space-y-1">
        {/* Logo */}
        <Link
          to="/"
          className="flex justify-center p-2 hover:bg-muted/20 rounded-md transition-colors cursor-pointer"
          title="Página Inicial"
          onClick={() => console.log('Logo clicked')}
        >
          <SiRocket className="h-6 w-6 text-primary pointer-events-none" />
        </Link>

        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-1">
          {/* Navigation items sem duplicatas e sem home */}
          {filteredNavItems.map(item => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href} className="block w-full">
                <button
                  className={`w-full h-10 p-0 mb-1 transition-colors rounded-md flex items-center justify-center cursor-pointer ${
                    active 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'hover:bg-muted/20'
                  }`}
                  title={item.name}
                  onClick={() => console.log('Nav item clicked:', item.name)}
                >
                  <item.icon className="h-5 w-5 pointer-events-none" />
                </button>
              </Link>
            );
          })}

          {/* Todos os projetos */}
          <button
            className={`w-full h-10 p-0 mb-1 transition-colors rounded-md flex items-center justify-center cursor-pointer ${
              selectedCategory === '' && location.pathname === '/projects'
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'hover:bg-muted/20'
            }`}
            onClick={handleAllProjectsClick}
            title="Todos os projetos"
          >
            <FolderOpen className="h-5 w-5 pointer-events-none" />
          </button>

          {/* Categorias (primeiras 8, sem duplicatas) */}
          {uniqueCategories.map(category => {
            const active = selectedCategory === category.name && location.pathname === '/projects';
            const { icon: Icon } = getCategoryColor(category.name);

            return (
              <button
                key={category.name}
                className={`w-full h-10 p-0 mb-1 transition-colors rounded-md flex items-center justify-center cursor-pointer ${
                  active 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'hover:bg-muted/20'
                }`}
                onClick={() => handleCategoryClick(category.name)}
                title={`${category.name} (${category.count} projetos)`}
              >
                <Icon className="h-4 w-4 pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};
