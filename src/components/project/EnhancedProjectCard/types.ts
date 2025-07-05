// src/components/project/EnhancedProjectCard/types.ts
import type { EnhancedProjectCard as EnhancedProjectCardType } from '@/types/enhanced';
import type { LanguageColor } from '@/lib/languageColors';

export interface EnhancedProjectCardProps {
  project: EnhancedProjectCardType | null | undefined;
  variant?: 'default' | 'compact' | 'mystery' | 'featured';
  index?: number;
  onDiscover?: (id: number) => void;
  isDiscovered?: boolean;
}

export interface ProjectCardVariantProps {
  project: EnhancedProjectCardType;
  revealed: boolean;
  langConfig: LanguageColor;
  index: number;
  onClick: () => void;
  viewportRef?: React.RefObject<HTMLDivElement>;
}
