import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BaseCard } from '@/components/ui/BaseCard';
import { Calendar, ArrowRight, Code2 } from 'lucide-react';
import { detectLanguage } from '@/lib/languageColors';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { useRevealedProjects } from '@/hooks/useRevealedProjects';
import type { ProjectCard as ProjectCardType } from '@/types';

interface ProjectCardProps {
  project: ProjectCardType;
  compact?: boolean;
}

const hoverEffects = { scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' };

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, compact = false }) => {
  // Hook para capturar projetos revelados
  const { revealProject } = useRevealedProjects();
  
  // MELHORADO: Detecta múltiplas linguagens e usa gradiente
  const languageConfig = detectLanguage(project);
  const { gradient, icon: Icon } = languageConfig;

  // Função para capturar clique e marcar como revelado
  const handleClick = () => {
    console.log('🎯 ProjectCard: Marking project as revealed:', project.id, project.titulo);
    revealProject(project.id);
  };

  // Memoize parsed date to avoid unnecessary re-renders
  const modified = useMemo(
    () => new Date(project.data_modificacao),
    [project.data_modificacao]
  );

  const dateLabel = useMemo(() => {
    try {
      return format(modified, "dd 'de' MMM yyyy", { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  }, [modified]);

  const isNew = useMemo(
    () => differenceInDays(new Date(), modified) <= 7,
    [modified]
  );

  return (
    <Link to={`/projects/${project.id}`} onClick={handleClick} aria-label={`Abrir projeto ${project.titulo}`}>
      <motion.div
        whileHover={hoverEffects}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <BaseCard className={`flex ${compact ? 'items-center gap-4 p-4' : 'flex-col'} transition-colors`}>

          {/* Badge de novidade para efeito de novidade */}
          {isNew && !compact && (
            <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-white">
              Novo
            </span>
          )}

          {/* Ícone ou imagem com gradiente */}
          <div
            className={`flex-shrink-0 flex items-center justify-center rounded-lg bg-gradient-to-br ${gradient} ${compact ? 'w-10 h-10' : 'w-full h-40'}`}
          >
            {compact ? (
              <Icon className="w-5 h-5 text-white" />
            ) : project.imageurl ? (
              <img
                src={project.imageurl}
                alt={project.titulo}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Icon className="w-12 h-12 text-white/80" />
            )}
          </div>

          {/* Conteúdo de texto */}
          <div className={`${compact ? 'flex-1 min-w-0' : 'p-4 flex-1 flex flex-col'} ${!compact && 'group relative'}`}
          >
            <h3 className="font-semibold text-base truncate">{project.titulo}</h3>

            {!compact && (
              <>
                <motion.p
                  className="text-sm text-muted flex-1 mt-2 line-clamp-3"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {project.descricao || '—'}
                </motion.p>

                {/* Badge da linguagem com gradiente */}
                {languageConfig.displayName && (
                  <div className="mt-3">
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r ${gradient}`}
                    >
                      <Icon className="w-3 h-3" />
                      {languageConfig.displayName}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Rodapé com data e CTA */}
            <div className={`${compact ? '' : 'mt-4 flex items-center justify-between text-xs text-muted'}`}>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {dateLabel}
              </span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1`} />
            </div>
          </div>
        </BaseCard>
      </motion.div>
    </Link>
  );
});
