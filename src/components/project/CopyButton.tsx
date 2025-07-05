// src/components/project/CopyButton.tsx - VERSÃO FINAL
import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  isCopied: boolean;
  onCopy: (text: string) => void;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  isCopied,
  onCopy,
  className,
  variant = 'outline',
  size = 'sm'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCopy(text);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'lg':
        return 'px-4 py-3 text-base';
      case 'md':
        return 'px-3 py-2 text-sm';
      case 'sm':
      default:
        return 'px-2 py-1 text-xs';
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      onClick={handleClick}
      className={cn(
        'premium-copy-button group relative overflow-hidden transition-all duration-300 hover:scale-105',
        getSizeClasses(),
        // Estilo dinâmico baseado no estado
        isCopied
          ? 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
          : 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900 dark:hover:to-blue-800',
        'shadow-sm hover:shadow-md',
        className
      )}
    >
      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
      
      {/* Ícone com transição suave */}
      <div className="relative z-10 flex items-center gap-2">
        {isCopied ? (
          <CheckCircle className="h-3 w-3 animate-in zoom-in-75 duration-200 text-green-600 dark:text-green-400" />
        ) : (
          <Copy className="h-3 w-3 group-hover:rotate-12 transition-transform duration-300" />
        )}
        
        {/* Texto do botão */}
        <span className="max-w-32 truncate font-medium">
          {text}
        </span>
      </div>
      
      {/* Indicador visual de sucesso */}
      {isCopied && (
        <div className="absolute inset-0 bg-green-500/10 rounded-md animate-pulse" />
      )}
    </Button>
  );
};

// CSS para o efeito shimmer e animações
const copyButtonStyles = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

.premium-copy-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-copy-button:hover {
  transform: translateY(-1px) scale(1.02);
}

.premium-copy-button:active {
  transform: translateY(0) scale(0.98);
}

/* Animação de entrada para o ícone de sucesso */
@keyframes zoom-in-75 {
  0% {
    opacity: 0;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-in {
  animation-fill-mode: both;
}

.zoom-in-75 {
  animation-name: zoom-in-75;
}

.duration-200 {
  animation-duration: 200ms;
}
`;

// Adicionar estilos ao head se não existirem
if (typeof document !== 'undefined' && !document.querySelector('#copy-button-styles')) {
  const style = document.createElement('style');
  style.id = 'copy-button-styles';
  style.textContent = copyButtonStyles;
  document.head.appendChild(style);
}
