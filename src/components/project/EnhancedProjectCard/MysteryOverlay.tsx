// src/components/project/EnhancedProjectCard/MysteryOverlay.tsx
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface MysteryOverlayProps {
  isVisible: boolean;
}

export const MysteryOverlay: React.FC<MysteryOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
      <HelpCircle className="h-8 w-8 text-white animate-pulse" />
    </div>
  );
};
