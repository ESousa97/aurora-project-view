
// src/components/ui/theme-badge.tsx - Badge usando a nova paleta
import React from 'react';
import { Badge } from './badge';
import { useStatusColors } from '@/hooks/useColors';
import { cn } from '@/lib/utils';

export type ThemeStatusType = 'success' | 'warning' | 'error' | 'info';

interface ThemeBadgeProps {
  status: ThemeStatusType;
  children?: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'light';
}

export const ThemeBadge: React.FC<ThemeBadgeProps> = ({ 
  status, 
  children, 
  className,
  variant = 'solid'
}) => {
  const statusColors = useStatusColors();
  const statusConfig = statusColors[status];

  const solidStyles = {
    backgroundColor: statusConfig.bg,
    color: statusConfig.text === 'text-white' ? 'white' : 'black',
    border: 'none',
  };

  const lightStyles = {
    backgroundColor: statusConfig.lightBg,
    color: statusConfig.bg,
    border: `1px solid ${statusConfig.bg}`,
  };

  return (
    <Badge
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        statusConfig.className,
        className
      )}
      style={variant === 'solid' ? solidStyles : lightStyles}
    >
      {children || status}
    </Badge>
  );
};
