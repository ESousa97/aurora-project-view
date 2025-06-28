// src/hooks/useCopyHandler.ts
import { useState } from 'react';
import { toast } from 'sonner';

export const useCopyHandler = (onCopy: (text: string) => void) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        onCopy(text);
        toast.success('Conteúdo copiado!');
        setTimeout(() => setCopiedText(null), 2000);
      })
      .catch(() => toast.error('Erro ao copiar'));
  };

  return { copiedText, handleCopy };
};