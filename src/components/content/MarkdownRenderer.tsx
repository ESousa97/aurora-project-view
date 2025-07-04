// src/components/content/MarkdownRenderer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  // Processar markdown para HTML com estilos aprimorados
  const processMarkdown = (markdown: string) => {
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-4 text-primary">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-6 text-primary border-b border-border pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">$1</h1>')
      
      // Imagens com estilos aprimorados
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="w-full rounded-lg shadow-lg mb-6 hover:scale-105 transition-transform duration-300" />')
      
      // Links estilizados
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary hover:text-accent transition-colors underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Negrito e itálico
      .replace(/\*\*([^*]+)\*\*/gim, '<strong class="font-bold text-foreground">$1</strong>')
      .replace(/\*([^*]+)\*/gim, '<em class="italic text-muted-foreground">$1</em>')
      
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-muted p-4 rounded-lg border border-border overflow-x-auto mb-6"><code class="text-sm font-mono">$2</code></pre>')
      .replace(/`([^`]+)`/gim, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono border">$1</code>')
      
      // Listas
      .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2 text-foreground">• $1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-foreground">• $1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-foreground list-decimal">$1</li>')
      
      // Quebras de linha
      .replace(/\n\n/gim, '</p><p class="mb-4 text-foreground leading-relaxed">')
      .replace(/\n/gim, '<br/>')
      
      // Divisores
      .replace(/^---$/gim, '<hr class="my-8 border-t border-border" />')
      
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-2 mb-4 bg-muted/30 rounded-r italic text-muted-foreground">$1</blockquote>')
      
      // Adicionar parágrafos
      .replace(/^(?!<[h|p|l|b|i|u|c|d])/gim, '<p class="mb-4 text-foreground leading-relaxed">');
  };

  const htmlContent = processMarkdown(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`markdown-content ${className}`}
    >
      <Card className="p-8 max-w-none prose prose-lg dark:prose-invert">
        <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="prose-headings:scroll-m-20 prose-img:rounded-lg prose-img:shadow-md"
        />
      </Card>
    </motion.div>
  );
};