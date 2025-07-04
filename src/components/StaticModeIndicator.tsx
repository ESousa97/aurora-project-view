// src/components/StaticModeIndicator.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Zap, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StaticModeIndicatorProps {
  className?: string;
}

export const StaticModeIndicator: React.FC<StaticModeIndicatorProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Verifica se já foi dismissado anteriormente
    const dismissed = localStorage.getItem('static-mode-dismissed');
    if (!dismissed) {
      // Mostra o indicador após 2 segundos
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('static-mode-dismissed', 'true');
  };

  if (isDismissed || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25 }}
        className={cn(
          'fixed bottom-4 right-4 z-50 max-w-sm',
          className
        )}
      >
        <div className="relative bg-gradient-to-br from-emerald-500 to-blue-600 text-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Efeito de brilho animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
          
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg">Seja bem vindo!</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-sm text-white/90 leading-relaxed">
                Este portfólio está rodando completamente gratuito sem a necessidade de um servidor.
              </p>

              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                  <span>Carregamento instantâneo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                  <span>Funciona 100% free</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                  <span>Deploy em qualquer lugar</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={handleDismiss}
                className="w-full mt-4 py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-sm transition-colors backdrop-blur-sm"
              >
                Entendi, não mostrar novamente
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// CSS para o efeito shimmer
const shimmerStyles = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}
`;

// Adicionar estilos ao head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerStyles;
  document.head.appendChild(style);
}
