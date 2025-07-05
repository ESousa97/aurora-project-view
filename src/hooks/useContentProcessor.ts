// src/hooks/useContentProcessor.ts - VERSÃO CORRIGIDA
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

    // 2. CORREÇÃO: Preservar botões de cópia @@texto@@ sem alterar
    // Não vamos substituir por placeholders, deixamos @@texto@@ intacto
    // O markdown não deve processar @@texto@@ pois não é sintaxe markdown válida

    // 3. Processar markdown normalmente (@@texto@@ ficará intacto)
    const markdownResult = marked.parse(processedContent.replace(/\\n/g, '\n'), { async: false }) as string;

    // 4. Os @@texto@@ ainda estarão presentes no resultado final
    // O MDXContentRenderer vai processá-los depois

    return markdownResult;
  };

  return { createMarkup, processMarkdown };
};
