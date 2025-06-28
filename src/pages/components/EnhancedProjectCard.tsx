// src/pages/components/EnhancedProjectCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, MousePointer } from 'lucide-react';
import { EnhancedProjectCardProps } from '../types';

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ 
  project, 
  variant = 'featured', 
  index = 0, 
  onDiscover, 
  isDiscovered 
}) => {
  // Estado inicial: cards misteriosos começam não revelados
  const [revealed, setRevealed] = React.useState(variant !== 'mystery' || isDiscovered);

  // Atualizar o estado quando isDiscovered mudar
  React.useEffect(() => {
    if (variant === 'mystery' && isDiscovered) {
      setRevealed(true);
    }
  }, [variant, isDiscovered]);

  const handleReveal = React.useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    console.log('handleReveal chamado', { variant, revealed, projectId: project.id });
    
    if (variant === 'mystery' && !revealed) {
      e.stopPropagation();
      
      setRevealed(true);
      
      if (onDiscover) {
        onDiscover(project.id);
        console.log('onDiscover chamado para projeto:', project.id);
      }
    }
  }, [variant, revealed, project.id, onDiscover]);

  const gradientClass = project.detectedLanguage?.gradient || 'from-blue-600 to-purple-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group h-full"
    >
      {variant === 'mystery' && !revealed ? (
        <div 
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative h-full"
          onClick={handleReveal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleReveal(e);
            }
          }}
        >
          {/* Overlay de mistério */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center text-white">
              <Eye className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              <p className="font-semibold">Clique para Revelar</p>
              <p className="text-sm opacity-80 mt-1">Descubra a tecnologia oculta</p>
            </div>
          </div>
          
          {/* Barra colorida no topo */}
          <div className={`h-2 bg-gradient-to-r ${gradientClass} opacity-50`} />
          
          {/* Conteúdo do card mistério */}
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Projeto Misterioso #???
                </h3>
                <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  ?
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Este projeto esconde segredos tecnológicos esperando para serem descobertos. Que linguagem será utilizada? Qual framework foi escolhido?
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <MousePointer className="h-3 w-3" />
              <span>Clique para revelar</span>
            </div>
          </div>
        </div>
      ) : (
        <Link to={`/projects/${project.id}`} className="block h-full">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden relative h-full">
            {/* Animação de revelação */}
            <motion.div
              initial={variant === 'mystery' ? { scaleX: 0 } : { scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`h-2 bg-gradient-to-r ${gradientClass} origin-left`}
            />
            
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {project.titulo || project.nome || 'Projeto sem título'}
                  </h3>
                  <motion.span 
                    initial={variant === 'mystery' ? { scale: 0, rotate: -180 } : { scale: 1 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                  >
                    {project.detectedLanguage?.name || 'Unknown'}
                  </motion.span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.descricao || 'Projeto em desenvolvimento'}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MousePointer className="h-3 w-3" />
                <span>Clique para explorar</span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </motion.div>
  );
};
