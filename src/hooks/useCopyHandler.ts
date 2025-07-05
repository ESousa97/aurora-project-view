// src/hooks/useCopyHandler.ts - VERSÃO SEM DUPLICAÇÃO
import { useState } from 'react';
import { toast } from 'sonner';

export const useCopyHandler = (onCopy?: (text: string) => void) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        
        // Chamar callback opcional (sem toast no callback)
        onCopy?.(text);
        
        // Toast único aqui
        toast.success('Conteúdo copiado!', {
          description: text.length > 30 ? `${text.substring(0, 30)}...` : text,
          duration: 2000,
        });
        
        // Reset do estado após 2 segundos
        setTimeout(() => setCopiedText(null), 2000);
      })
      .catch((error) => {
        console.error('Erro ao copiar:', error);
        toast.error('Erro ao copiar conteúdo');
      });
  };

  return { 
    copiedText, 
    handleCopy,
    // Helper para verificar se um texto específico foi copiado
    isCopied: (text: string) => copiedText === text
  };
};
