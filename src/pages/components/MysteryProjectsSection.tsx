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
  MousePointer
} from 'lucide-react';
import { EnhancedProjectCard } from '@/components/project/EnhancedProjectCard';
import { ProjectType } from '../types';

interface MysteryProjectsSectionProps {
  projects: ProjectType[];
  revealedProjects: Set<number>;
  onProjectReveal: (projectId: number) => void;
  isProjectRevealed: (projectId: number) => boolean;
}

// Componente de partículas flutuantes
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

// Componente de névoa misteriosa
const MysteriousFog = () => {
  return (
    <>
      {/* Névoa de fundo */}
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
      
      {/* Brilhos místicos */}
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
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

  return (
    <section 
      id="mystery-section"
      className="relative py-24 px-4 overflow-hidden rounded-3xl mx-4"
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a103d 50%, #2d1b69 100%)"
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradiente dinâmico que segue o mouse */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.2), transparent 50%)`,
          }}
        />
        
        {/* Névoa misteriosa */}
        <MysteriousFog />
        
        {/* Partículas flutuantes */}
        <FloatingParticles />
        
        {/* Grid pattern sutil */}
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
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto"
        style={{ y: parallaxY }}
      >
        {/* Header section */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border border-white/20 bg-white/10"
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

          {/* Main title */}
          <motion.h2 
            className="text-5xl md:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span 
              className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
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
              className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-2"
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

          {/* Description */}
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
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex justify-center gap-8 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {projects.length}
              </div>
              <div className="text-sm text-gray-400">Mistérios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {Array.from(revealedProjects).length}
              </div>
              <div className="text-sm text-gray-400">Revelados</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <EnhancedProjectCard 
              key={project.id} 
              project={project}
              variant="mystery"
              index={index}
              onDiscover={onProjectReveal}
              isDiscovered={isProjectRevealed(project.id)}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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
              duration: 2,
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
