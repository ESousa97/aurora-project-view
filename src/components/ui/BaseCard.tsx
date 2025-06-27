// src/components/ui/BaseCard.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export const BaseCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      'bg-surface rounded-xl overflow-hidden',
      'shadow-md transition-shadow duration-300',
      'hover:shadow-lg',
      'transform transition-transform duration-300',
      'hover:-translate-y-1 hover:scale-105',
      className
    )}
    {...props}
  >
    {children}
  </div>
);