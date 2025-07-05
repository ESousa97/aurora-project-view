// src/pages/components/MysteryProjectsSection.tsx
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Crown, 
  Eye, 
  Sparkles, 
  Lock,
  Key,
  Star,
  Zap,
  Atom,
  MousePointer,
  Clock,
  Timer
} from 'lucide-react';
import { EnhancedProjectCard } from '@/components/project/EnhancedProjectCard';
import { ProjectType } from '../types';
import { useRevealedProjects } from '@/hooks/useRevealedProjects';

interface MysteryProjectsSectionProps {
  projects: ProjectType[];
  revealedProjects: Set<number>;
  onProjectReveal: (projectId: number) => void;
  isProjectRevealed: (projectId: number) => boolean;
}

// Componente de timer para projeto revelado
const ProjectTimer: React.FC<{ 
  projectId: number; 
  getProjectTimeRemaining: (id: number) => number;
  onExpire: () => void;
}> = ({ projectId, getProjectTimeRemaining, onExpire }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = getProjectTimeRemaining(projectId);
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        onExpire();
      }
    };

    updateTimer(); // Atualização inicial
    const interval = setInterval(updateTimer, 1000); // Atualizar a cada segundo

    return () => clearInterval(interval);
  }, [projectId, getProjectTimeRemaining, onExpire]);

  if (timeRemaining <= 0) return null;

  const minutes = Math.floor(timeRemaining / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  const percentage = (timeRemaining / (5 * 60 * 1000)) * 100; // 5 minutos = 100%

  return (
    <div className="absolute top-3 left-3 z-20">
      <motion.div
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/80 backdrop-blur-sm border border-green-400/30"
        animate={{
          opacity: percentage < 20 ? [1, 0.5, 1] : 1, // Piscar quando restam menos de 20%
          scale: percentage < 10 ? [1, 1.05, 1] : 1   // Pulsar quando crítico
        }}
        transition={{ 
          duration: percentage < 20 ? 0.5 : 1,
          repeat: percentage < 20 ? Infinity : 0 
        }}
      >
        <Timer className="h-3 w-3 text-green-400" />
        <span className="text-xs font-mono text-green-300">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
        
        {/* Barra de progresso circular */}
        <div className="relative w-4 h-4">
          <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 16 16">
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="rgb(34 197 94 / 0.3)"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              cx="8"
              cy="8"
              r="6"
              stroke="rgb(34 197 94)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 6}`}
              strokeDashoffset={`${2 * Math.PI * 6 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              animate={{
                strokeDashoffset: `${2 * Math.PI * 6 * (1 - percentage / 100)}`
              }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

// Componente de partículas flutuantes (mantido do original)
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Componente de névoa misteriosa (mantido do original)
const MysteriousFog = () => {
  return (
    <>
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -40, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </>
  );
};

export const MysteryProjectsSection: React.FC<MysteryProjectsSectionProps> = ({ 
  projects, 
  revealedProjects,
  onProjectReveal,
  isProjectRevealed
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [refreshKey, setRefreshKey] = useState(0); // Para forçar re-render quando projetos expiram
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Hook atualizado para obter tempo restante
  const { getProjectTimeRemaining } = useRevealedProjects();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('mystery-section')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Callback para quando um projeto expira (força re-render)
  const handleProjectExpire = React.useCallback(() => {
    console.log('⏰ Project expired, forcing refresh of mystery section');
    setRefreshKey(prev => prev + 1);
  }, []);

  // Estatísticas atualizadas
  const stats = React.useMemo(() => {
    const currentlyRevealed = projects.filter(p => isProjectRevealed(p.id));
    const totalRevealed = Array.from(revealedProjects).length;
    
    return {
      total: projects.length,
      revealed: currentlyRevealed.length,
      totalEverRevealed: totalRevealed
    };
  }, [projects, isProjectRevealed, revealedProjects]); // refreshKey para re-calcular

  return (
    <section 
      id="mystery-section"
      className="relative py-4 px-4 overflow-hidden rounded-3xl mx-4"
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a103d 50%, #2d1b69 100%)"
      }}
    >
      {/* Background effects (mantidos do original) */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.2), transparent 50%)`,
          }}
        />
        <MysteriousFog />
        <FloatingParticles />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
        {/* Header section (mantido do original) */}
        <motion.div 
          className="text-center space-y-8 mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-1 rounded-full backdrop-blur-xl border border-white/20 bg-white/10"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Crown className="h-5 w-5 text-yellow-400" />
            </motion.div>
            <span className="font-semibold text-base bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Câmara dos Mistérios
            </span>
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Sparkles className="h-5 w-5 text-pink-400" />
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl font-black tracking-tight flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              O que Está
            </motion.span>
            <motion.span 
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
              animate={{
                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              Escondido?
            </motion.span>
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
              Alguns projetos preferem manter seus{' '}
              <motion.strong 
                className="text-white relative"
                whileHover={{ scale: 1.05 }}
              >
                segredos
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.strong>
              {' '}até o momento certo.
            </p>
            <p className="text-lg text-gray-400">
              Clique para revelar e descobrir{' '}
              <strong className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                tecnologias ocultas
              </strong>
              {' '}que podem revolucionar sua visão sobre desenvolvimento.
            </p>

          {/* Stats atualizadas */}
          <motion.div 
            className="flex justify-center gap-8 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stats.total}
              </div>
              <div className="text-sm text-gray-400">Mistérios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {stats.revealed}
              </div>
              <div className="text-sm text-gray-400">Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stats.totalEverRevealed}
              </div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects grid com timers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={`${project.id}-${refreshKey}`} className="relative">
              <EnhancedProjectCard 
                project={project}
                variant="mystery"
                index={index}
                onDiscover={onProjectReveal}
                isDiscovered={isProjectRevealed(project.id)}
              />
              
              {/* Timer overlay para projetos revelados */}
              {isProjectRevealed(project.id) && (
                <ProjectTimer
                  projectId={project.id}
                  getProjectTimeRemaining={getProjectTimeRemaining}
                  onExpire={handleProjectExpire}
                />
              )}
            </div>
          ))}
        </div>

        {/* Call to action atualizado */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <p className="text-gray-400 mb-4">
            Cada revelação pode mudar sua perspectiva sobre tecnologia
          </p>
          <motion.div
            className="inline-flex items-center gap-2 text-purple-400"
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Key className="h-4 w-4" />
            <span className="text-sm font-medium">
              Destrave o potencial oculto
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
