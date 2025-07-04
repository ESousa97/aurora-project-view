import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';

import { useUIStore } from '@/stores/uiStore';
import { useCategories } from '@/hooks/useCategories';
import { navItems } from './constants';

import { SiRocket } from '@/lib/languageColors/icons';
import { getCategoryColor } from '@/lib/languageColors';
import { GradientIcon } from '@/components/GradientIcon';
import { cn } from '@/lib/utils';

export const SidebarMinimized: React.FC = () => {
  /* ---------- Stores & hooks ---------- */
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const { data: rawCategories = [] } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- Helpers ---------- */
  const filteredNavItems = useMemo(() => {
    const map = new Map<string, typeof navItems[0]>();
    navItems.forEach(item => {
      if (item.href !== '/' && !map.has(item.href)) map.set(item.href, item);
    });
    return Array.from(map.values());
  }, []);

  const uniqueCategories = useMemo(() => {
    const map = new Map<string, typeof rawCategories[0]>();
    rawCategories.forEach(cat => {
      if (!map.has(cat.name)) map.set(cat.name, cat);
    });
    return Array.from(map.values()).slice(0, 8);
  }, [rawCategories]);

  const goTo = (href: string, category = '') => {
    setSelectedCategory(category);
    navigate(href);
  };

  /* ---------- Render ---------- */
  return (
    <motion.aside
      className="fixed top-16 left-0 w-16 h-[calc(100vh-4rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-r border-gray-200/50 dark:border-gray-700/50 z-30"
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0,  opacity: 1 }}
      exit={{   x: -64, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="flex flex-col h-full p-1 space-y-1">
        {/* ---------- Logo ---------- */}
        <Link
          to="/"
          className="flex justify-center p-2 hover:bg-muted/20 rounded-md transition-colors"
          title="Página Inicial"
        >
          <SiRocket className="h-6 w-6 text-primary" />
        </Link>

        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-1">
          {/* ---------- Links de navegação (sempre cor primária) ---------- */}
          {filteredNavItems.map(item => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href} className="block w-full">
                <button
                  className={cn(
                    'w-full h-10 p-0 mb-1 rounded-md flex items-center justify-center transition-colors',
                    active
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted/20'
                  )}
                  title={item.name}
                >
                  <item.icon className="h-5 w-5 pointer-events-none text-primary" />
                </button>
              </Link>
            );
          })}

          {/* ---------- Todos os projetos ---------- */}
          <button
            className={cn(
              'w-full h-10 p-0 mb-1 rounded-md flex items-center justify-center transition-colors',
              selectedCategory === '' && location.pathname === '/projects'
                ? 'bg-primary/10 border border-primary/20'
                : 'hover:bg-muted/20'
            )}
            onClick={() => goTo('/projects', '')}
            title="Todos os projetos"
          >
            <FolderOpen className="h-5 w-5 pointer-events-none text-primary" />
          </button>

          {/* Categorias */}
          {uniqueCategories.map(category => {
            const active =
              selectedCategory === category.name &&
              location.pathname === '/projects';

            const cfg = getCategoryColor(category.name);
            const { icon: Icon, gradient, color } = cfg;

            const isMultiLanguage =
              cfg.name === 'combined' || category.name.includes('+');
            const isPython = cfg.name === 'python';

            return (
              <button
                key={category.name}
                className={cn(
                  'w-full h-10 p-0 mb-1 rounded-md flex items-center justify-center transition-colors',
                  active
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/20'
                )}
                onClick={() => goTo('/projects', category.name)}
                title={`${category.name} (${category.count} projetos)`}
              >
                {isMultiLanguage || isPython ? (
                  <GradientIcon
                    icon={Icon}
                    gradient={gradient}      // azul → amarelo para Python
                    className="h-4 w-4 pointer-events-none"
                  />
                ) : (
                  <Icon
                    className="h-4 w-4 pointer-events-none"
                    style={{ color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};
