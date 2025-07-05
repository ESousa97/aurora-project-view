// src/hooks/useContentProcessor.ts (Adaptado para MDX)
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const useContentProcessor = () => {
  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
      async: false
    });
  }, []);

  const createMarkup = (html: string) => ({
    __html: DOMPurify.sanitize(html)
  });

  const processMarkdown = (content: string) => {
    const safeContent = content || 'Conteúdo não disponível';
    
    // Processar sintaxe especial MDX antes do markdown
    let processedContent = safeContent;
    
    // 1. Processar destaques :::texto::: ANTES do markdown
    processedContent = processedContent.replace(
      /:::(.+?):::/g,
      (_, content) => `<span class="highlight-text">${content.trim()}</span>`
    );

    // 2. Marcar botões de cópia @@texto@@ para não serem processados pelo markdown
    const copyButtons: string[] = [];
    processedContent = processedContent.replace(
      /@@(.+?)@@/g,
      (match, content) => {
        copyButtons.push(content.trim());
        return `__COPY_BUTTON_${copyButtons.length - 1}__`;
      }
    );

    // 3. Processar markdown normalmente
    let markdownResult = marked.parse(processedContent.replace(/\\n/g, '\n'), { async: false }) as string;

    // 4. Restaurar botões de cópia após processamento markdown
    copyButtons.forEach((content, index) => {
      markdownResult = markdownResult.replace(
        `__COPY_BUTTON_${index}__`,
        `@@${content}@@`
      );
    });

    return markdownResult;
  };

  return { createMarkup, processMarkdown };
};
