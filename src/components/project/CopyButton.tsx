// src/components/project/CopyButton.tsx (Versão Premium para MDX)
import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  text: string;
  isCopied: boolean;
  onCopy: (text: string) => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  isCopied,
  onCopy
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onCopy(text)}
      className="premium-copy-button group relative overflow-hidden transition-all duration-300 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderColor: '#0ea5e9',
        color: '#0369a1'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      {isCopied ? (
        <CheckCircle className="h-3 w-3 mr-2 animate-pulse text-green-600" />
      ) : (
        <Copy className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform duration-300" />
      )}
      
      <span className="max-w-32 truncate font-medium relative z-10">
        {text}
      </span>
      
      {/* Efeito de shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:animate-shimmer" />
    </Button>
  );
};
