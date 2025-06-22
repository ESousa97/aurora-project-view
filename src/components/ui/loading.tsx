import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Target, Zap } from 'lucide-react';

// Loading Spinner Principal
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg`}
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity }
        }}
      >
        <Compass className="h-1/2 w-1/2 text-white" />
      </motion.div>
    </div>
  );
};

// Loading para descoberta de projetos
export const DiscoveryLoading: React.FC = () => {
  const icons = [Compass, Sparkles, Target, Zap];
  
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            animate={{
              rotate: 360,
              x: Math.cos(index * (Math.PI / 2)) * 30,
              y: Math.sin(index * (Math.PI / 2)) * 30
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 1 + index * 0.2, 
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              <Icon className="h-4 w-4 text-white" />
            </motion.div>
          </motion.div>
        ))}
        
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="h-8 w-8 text-primary" />
          </motion.div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <motion.h3 
          className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Descobrindo novos territórios...
        </motion.h3>
        <p className="text-muted-foreground">Preparando aventuras incríveis para você</p>
      </div>
    </div>
  );
};

// Loading para cards de projeto
export const ProjectCardSkeleton: React.FC<{ variant?: 'default' | 'compact' }> = ({ variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <motion.div 
        className="animate-pulse"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="border rounded-lg p-4 bg-gradient-to-br from-muted/50 to-muted/30">
          <div className="flex items-center gap-4">
            <div className="w-3 h-12 bg-gradient-to-b from-primary/30 to-purple-500/30 rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="flex gap-2">
                <div className="h-5 bg-muted rounded-full w-16" />
                <div className="h-5 bg-muted rounded-full w-12" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="animate-pulse"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="border rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-8 bg-muted rounded w-20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Loading para timeline
export const TimelineLoading: React.FC = () => {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, periodIndex) => (
        <motion.div 
          key={periodIndex}
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: periodIndex * 0.1 }}
        >
          {/* Period Header Skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30" />
            <div className="h-6 bg-muted rounded w-32 animate-pulse" />
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            <div className="h-6 bg-muted rounded w-16 animate-pulse" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-3 ml-6 relative">
            <div className="absolute left-[-1.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-border to-transparent" />
            
            {[...Array(2)].map((_, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (periodIndex * 0.1) + (itemIndex * 0.05) }}
                className="relative"
              >
                <div className="absolute left-[-1.8rem] top-6 w-3 h-3 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30" />
                
                <div className="border rounded-lg p-4 bg-gradient-to-br from-muted/30 to-muted/10 border-l-4 border-l-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 animate-pulse" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                        <div className="h-8 bg-muted rounded w-16 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Loading para página de detalhes
export const ProjectDetailLoading: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: '60%' }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header Skeleton */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="h-10 bg-muted rounded w-32 animate-pulse" />
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 animate-pulse" />
              <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
            </div>
            <div className="flex gap-4">
              <div className="h-4 bg-muted rounded w-32 animate-pulse" />
              <div className="h-4 bg-muted rounded w-32 animate-pulse" />
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded-full w-20 animate-pulse" />
              <div className="h-6 bg-muted rounded-full w-16 animate-pulse" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-muted rounded w-20 animate-pulse" />
            <div className="h-10 bg-muted rounded w-20 animate-pulse" />
            <div className="h-10 bg-muted rounded w-24 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-muted rounded w-4/5 animate-pulse" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-4 border rounded-lg p-4">
            <div className="h-6 bg-muted rounded w-2/3 animate-pulse" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-32 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

// Loading para stats/dashboard
export const StatsLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="text-center border rounded-lg p-6 bg-gradient-to-br from-muted/30 to-muted/10"
        >
          <motion.div 
            className="w-8 h-8 mx-auto mb-3 rounded bg-gradient-to-br from-primary/30 to-purple-500/30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
          />
          <div className="h-8 bg-muted rounded w-16 mx-auto mb-2 animate-pulse" />
          <div className="h-4 bg-muted rounded w-20 mx-auto animate-pulse" />
        </motion.div>
      ))}
    </div>
  );
};

export default {
  LoadingSpinner,
  DiscoveryLoading,
  ProjectCardSkeleton,
  TimelineLoading,
  ProjectDetailLoading,
  StatsLoading
};
