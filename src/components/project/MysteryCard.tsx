// src/components/project/MysteryCard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Zap, 
  Lock, 
  Unlock,
  Terminal,
  Binary,
  Cpu,
  Shield,
  MousePointer,
  Fingerprint,
  Scan
} from 'lucide-react';
import { ProjectType } from '@/pages/types';

interface MysteryCardProps {
  project: ProjectType;
  isRevealed: boolean;
  onReveal: () => void;
  index: number;
}

// Caracteres para efeito de glitch/matrix
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
const MATRIX_CHARS = '01';
const TECH_WORDS = ['API', 'SDK', 'JWT', 'SQL', 'CSS', 'DOM', 'CLI', 'GUI', 'IDE', 'URL'];

// Componente de efeito glitch para texto
const GlitchText: React.FC<{ 
  text: string; 
  isActive: boolean; 
  className?: string;
  speed?: number;
}> = ({ text, isActive, className = '', speed = 50 }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      const randomChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      const randomIndex = Math.floor(Math.random() * text.length);
      const chars = text.split('');
      chars[randomIndex] = randomChar;
      setDisplayText(chars.join(''));
      
      setTimeout(() => setDisplayText(text), speed);
    }, speed * 2);

    return () => clearInterval(interval);
  }, [text, isActive, speed]);

  return <span className={className}>{displayText}</span>;
};

// Componente de matriz digital
const MatrixRain: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 text-green-400 text-xs font-mono"
          style={{ 
            left: `${(i * 12.5)}%`,
            fontFamily: 'monospace'
          }}
          animate={{
            y: ['0%', '110%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear"
          }}
        >
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="block">
              {MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Componente de scan lines
const ScanLines: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 0, 0.3) 2px,
          rgba(0, 255, 0, 0.3) 4px
        )`
      }}
      animate={{ backgroundPosition: ['0px 0px', '0px 8px'] }}
      transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export const MysteryCard: React.FC<MysteryCardProps> = ({ 
  project, 
  isRevealed, 
  onReveal, 
  index 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Simular processo de scan ao revelar
  const handleReveal = () => {
    if (isRevealed) return;
    
    setIsScanning(true);
    setScanProgress(0);
    
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setTimeout(() => {
            onReveal();
            setIsScanning(false);
          }, 200);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  // Variants corrigidas com tipos adequados
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100
      }
    },
    hover: {
      y: -5,
      rotateY: isRevealed ? 0 : 5,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const revealVariants: Variants = {
    hidden: { 
      scaleX: 0,
      transformOrigin: "left"
    },
    revealed: { 
      scaleX: 1,
      transformOrigin: "left",
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] // bezier curve equivalente a "easeInOut"
      }
    }
  };

  if (isRevealed) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="perspective-1000"
      >
        <Link to={`/projects/${project.id}`}>
          <div className="relative group h-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-green-500/50 cursor-pointer overflow-hidden transform-gpu">
            {/* Borda neon animada */}
            <motion.div
              className="absolute inset-0 border-2 border-green-400"
              style={{
                borderImage: `linear-gradient(45deg, 
                  rgba(34, 197, 94, 0.8), 
                  rgba(34, 197, 94, 0.2), 
                  rgba(34, 197, 94, 0.8)
                ) 1`
              }}
              animate={{
                borderImageSource: [
                  'linear-gradient(45deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.8))',
                  'linear-gradient(225deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.8))',
                  'linear-gradient(45deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.8))'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Efeito de revelação */}
            <motion.div
              className="absolute inset-0 bg-green-400/10"
              variants={revealVariants}
              initial="hidden"
              animate="revealed"
            />

            {/* Scan lines */}
            <ScanLines />

            {/* Conteúdo */}
            <div className="relative z-10 h-full flex items-center px-4 space-x-4">
              {/* Ícone da tecnologia */}
              <div className="flex-shrink-0 w-10 h-10 bg-green-400/20 border border-green-400/50 flex items-center justify-center">
                {project.detectedLanguage?.icon ? (
                  React.createElement(project.detectedLanguage.icon, {
                    className: "w-5 h-5 text-green-400"
                  })
                ) : (
                  <Terminal className="w-5 h-5 text-green-400" />
                )}
              </div>

              {/* Informações do projeto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <motion.h3 
                    className="text-sm font-bold text-green-400 truncate font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {project.titulo}
                  </motion.h3>
                  <Unlock className="w-3 h-3 text-green-400 flex-shrink-0" />
                </div>
                <p className="text-xs text-green-300/70 truncate font-mono">
                  {project.detectedLanguage?.displayName || 'SYSTEM'} • ACCESSED
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex-shrink-0 flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: [0.42, 0, 0.58, 1]
                  }}
                />
                <span className="text-xs text-green-400 font-mono">ONLINE</span>
              </div>
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-green-400/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </Link>
      </motion.div>
    );
  }

  // Card não revelado
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="perspective-1000"
    >
      <div 
        className="relative group h-20 bg-gradient-to-r from-red-950 via-gray-900 to-red-950 border border-red-500/30 cursor-pointer overflow-hidden transform-gpu"
        onClick={handleReveal}
      >
        {/* Efeito de interferência */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(239, 68, 68, 0.1) 2px,
              rgba(239, 68, 68, 0.1) 4px
            )`
          }}
          animate={isHovering ? {
            backgroundPosition: ['0px 0px', '8px 0px']
          } : {}}
          transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
        />

        {/* Matrix rain effect */}
        <MatrixRain isVisible={isHovering} />

        {/* Scan progress */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-red-400"
              initial={{ width: 0 }}
              animate={{ width: `${scanProgress}%` }}
              exit={{ opacity: 0 }}
              style={{
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)'
              }}
            />
          )}
        </AnimatePresence>

        {/* Conteúdo */}
        <div className="relative z-10 h-full flex items-center px-4 space-x-4">
          {/* Ícone locked */}
          <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 border border-red-500/50 flex items-center justify-center">
            <motion.div
              animate={isHovering ? {
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Lock className="w-5 h-5 text-red-400" />
            </motion.div>
          </div>

          {/* Informações obfuscadas */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <GlitchText
                text="ENCRYPTED_DATA.exe"
                isActive={isHovering}
                className="text-sm font-bold text-red-400 font-mono"
              />
              <motion.div
                animate={isHovering ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-3 h-3 text-red-400" />
              </motion.div>
            </div>
            <div className="flex items-center space-x-1">
              <GlitchText
                text={TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)]}
                isActive={isHovering}
                className="text-xs text-red-300/70 font-mono"
                speed={30}
              />
              <span className="text-xs text-red-300/70 font-mono">•</span>
              <span className="text-xs text-red-300/70 font-mono">CLASSIFIED</span>
            </div>
          </div>

          {/* Scan button */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <motion.div
              animate={isHovering ? {
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Scan className="w-4 h-4 text-red-400" />
            </motion.div>
            <span className="text-xs text-red-400 font-mono">
              {isScanning ? 'SCANNING' : 'LOCKED'}
            </span>
          </div>
        </div>

        {/* Click instruction */}
        <AnimatePresence>
          {isHovering && !isScanning && (
            <motion.div
              className="absolute inset-0 bg-red-500/10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex items-center space-x-2 text-red-300 text-xs font-mono"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <MousePointer className="w-3 h-3" />
                <span>CLICK TO DECRYPT</span>
                <Fingerprint className="w-3 h-3" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scanning overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center space-x-2 text-red-300 text-xs font-mono">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="w-4 h-4" />
                </motion.div>
                <span>DECRYPTING... {scanProgress}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
