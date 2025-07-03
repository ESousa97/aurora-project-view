// types/hero.ts
import { LucideIcon } from 'lucide-react';

export interface StatsType {
  total: number;
}

export interface IconPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface IconProps {
  className?: string;
}

export interface FloatingIconData {
  Icon: LucideIcon;
  delay: number;
  position: IconPosition;
}

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}
