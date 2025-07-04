import React from 'react';
import { cn } from '@/lib/utils';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className,
  hover = true,
}) => {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg shadow-sm',
        hover && 'hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};
