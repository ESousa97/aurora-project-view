
// src/components/ui/modern-card.tsx - Componente de card usando a nova paleta
import React from 'react';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useColors';

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
  shadow?: 'light' | 'medium' | 'heavy';
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = true,
  shadow = 'medium',
  ...props
}) => {
  const themeColors = useThemeColors();

  const baseStyles = 'rounded-xl border transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-card border-border',
    glass: 'glass-card',
    gradient: 'bg-gradient-primary border-border',
  };

  const hoverStyles = hover ? 'hover-scale' : '';
  const shadowStyles = shadow ? `shadow-${shadow}` : '';

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        shadowStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
