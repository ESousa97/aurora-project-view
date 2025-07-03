import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Compass, Target, MousePointer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CategoryType } from '../types';
import { getCategoryColor } from '@/lib/languageColors';

// Container animations with stagger for uniform entry
const containerVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.07 },
  },
};

// Card animations
const cardVariants: Variants = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

interface CategoriesSectionProps {
  categories: CategoryType[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = memo(({ categories }) => {
  const topCategories = useMemo(() => categories.slice(0, 9), [categories]);

  return (
    <section className="space-y-12 px-4">
      <motion.div
        className="text-center space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariant}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
          <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Caminhos de Exploração
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Escolha Sua Aventura
        </h2>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Cada categoria é uma jornada diferente. Algumas são terrenos conhecidos,
          outras são fronteiras inexploradas. Qual desperta sua curiosidade?
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariant}
      >
        {topCategories.map((category) => {
          const sample = category.projects?.[0];
          const colorConfig = sample?.detectedLanguage || getCategoryColor(category.name);
          const gradientClass = colorConfig.gradient || 'from-blue-600 to-purple-600';
          const isMulti = colorConfig.name === 'combined' || colorConfig.name.includes('+');

          return (
            <motion.div
              key={category.name}
              className="cursor-pointer transform-gpu"
              style={{ willChange: 'transform' }}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link to={`/projects?category=${encodeURIComponent(category.name)}`}>                
                <div className="group shadow-lg transition-all duration-300 overflow-hidden relative h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className={`h-3 bg-gradient-to-r ${gradientClass} ${isMulti ? 'animate-pulse' : ''}`} />
                  <div className="p-6 relative">
                    <div
                      className={cn(
                        'absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-opacity duration-300',
                        isMulti
                          ? `bg-gradient-to-r ${gradientClass} opacity-30 group-hover:opacity-50`
                          : 'opacity-20 group-hover:opacity-40 bg-gradient-to-r from-blue-600/20 to-purple-600/20'
                      )}
                    >
                      {colorConfig.icon ? React.createElement(colorConfig.icon, { className: 'w-5 h-5 text-white' }) : <Target className="w-5 h-5 text-white" />}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3
                          className={cn(
                            'font-bold text-xl transition-all duration-300 leading-tight',
                            isMulti
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                              : 'text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent'
                          )}
                        >
                          {category.name}
                        </h3>
                        <span
                          className={cn(
                            'inline-flex items-center justify-center shrink-0 ml-2 px-2.5 py-0.5 text-xs rounded-full transition-colors duration-300',
                            isMulti
                              ? `bg-gradient-to-r ${gradientClass} text-white font-semibold`
                              : 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          )}
                        >{category.count}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.count} projeto{category.count !== 1 ? 's' : ''} esperando{category.count > 10 ? ' para serem explorados' : ' por você'}
                      </p>
                      {isMulti && (
                        <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                          Múltiplas tecnologias combinadas
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                        <MousePointer className="h-3 w-3" />
                        <span>Clique para explorar este território</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
});
