// src/components/project/EnhancedProjectCard/VariantRenderer.tsx
import React from 'react';
import { CompactVariant } from './CompactVariant';
import { DefaultVariant } from './DefaultVariant';
import { FeaturedVariant } from './FeaturedVariant';
import { MysteryVariant } from './MysteryVariant';
import { ProjectCardVariantProps } from './types';

interface VariantRendererProps extends ProjectCardVariantProps {
  variant: 'default' | 'compact' | 'mystery' | 'featured';
}

export const VariantRenderer: React.FC<VariantRendererProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 'compact':
      return <CompactVariant {...props} />;
    case 'featured':
      return <FeaturedVariant {...props} />;
    case 'mystery':
      return <MysteryVariant {...props} />;
    case 'default':
    default:
      return <DefaultVariant {...props} />;
  }
};
