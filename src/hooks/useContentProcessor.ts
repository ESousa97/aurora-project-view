// src/hooks/useContentProcessor.ts
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
    
    // Highlight special content with :::text::: syntax
    const highlightedMarkdown = safeContent.replace(
      /:::(.+?):::/g,
      (_, content) => `<span class="highlight-text">${content.trim()}</span>`
    );

    // Parse markdown content synchronously
    return marked.parse(highlightedMarkdown.replace(/\\n/g, '\n'), { async: false }) as string;
  };

  return { createMarkup, processMarkdown };
};
