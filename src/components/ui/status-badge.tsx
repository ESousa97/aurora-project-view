
// src/components/ui/status-badge.tsx - Badge de status usando o sistema de cores
import React from 'react';
import { Badge } from './badge';
import { useStatusColors } from '@/hooks/useColors';
import { cn } from '@/lib/utils';

export type StatusType = 'active' | 'completed' | 'draft' | 'paused';

interface StatusBadgeProps {
  status: StatusType;
  children?: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  children, 
  className 
}) => {
  const statusColors = useStatusColors();
  const statusConfig = statusColors[status];

  return (
    <Badge
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        statusConfig.text,
        className
      )}
      style={{
        backgroundColor: statusConfig.bg,
        borderColor: statusConfig.bg,
      }}
    >
      {children || status}
    </Badge>
  );
};
