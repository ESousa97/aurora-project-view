
// src/components/ui/color-indicator.tsx - Indicador de cor reutilizável
import React from 'react';
import { useColors } from '@/hooks/useColors';
import { cn } from '@/lib/utils';

interface ColorIndicatorProps {
  type: 'technology' | 'status' | 'state';
  variant: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export const ColorIndicator: React.FC<ColorIndicatorProps> = ({
  type,
  variant,
  size = 'md',
  className,
  showLabel = false
}) => {
  const colors = useColors();
  
  const getColorValue = () => {
    switch (type) {
      case 'technology': {
        const techConfig = colors.context.technology[variant as keyof typeof colors.context.technology];
        return techConfig?.color || colors.variables.text['gray-400'];
      }
      case 'status': {
        const statusConfig = colors.getStatusColor(variant as keyof typeof colors.status);
        return statusConfig?.bg || colors.variables.text['gray-400'];
      }
      case 'state': {
        const stateConfig = colors.getStateColor(variant as keyof typeof colors.state);
        return stateConfig?.bg || colors.variables.text['gray-400'];
      }
      default:
        return colors.variables.text['gray-400'];
    }
  };

  const colorValue = getColorValue();
  
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div 
        className={cn(
          'rounded-full',
          sizeClasses[size]
        )}
        style={{ backgroundColor: colors.hsl(colorValue) }}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground capitalize">
          {variant}
        </span>
      )}
    </div>
  );
};
