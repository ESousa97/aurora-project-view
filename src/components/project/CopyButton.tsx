// src/components/project/CopyButton.tsx
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
      className="mx-1 my-1 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border-emerald-300 text-emerald-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-200/50 font-medium"
    >
      {isCopied ? (
        <CheckCircle className="h-3 w-3 mr-1 animate-pulse" />
      ) : (
        <Copy className="h-3 w-3 mr-1" />
      )}
      <span className="max-w-32 truncate">{text}</span>
    </Button>
  );
};