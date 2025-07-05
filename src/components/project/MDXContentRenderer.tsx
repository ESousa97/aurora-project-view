// src/components/project/MDXContentRenderer.tsx (Adaptado para Estilos Premium)
import React from 'react';
import { marked } from 'marked';
import { VideoPlayer } from './VideoPlayer';
import { CopyButton } from './CopyButton';
import { extractVideoId } from '@/utils/contentProcessor';

interface MDXContentRendererProps {
  processedContent: string;
  copiedText: string | null;
  videoLoaded: string | null;
  isVideoExpanded: boolean;
  onCopy: (text: string) => void;
  onVideoLoad: (videoId: string) => void;
  onToggleVideoExpand: () => void;
  createMarkup: (html: string) => { __html: string };
  renderVideo: (videoId: string) => React.ReactNode;
}

export const MDXContentRenderer: React.FC<MDXContentRendererProps> = ({
  processedContent,
  copiedText,
  videoLoaded,
  isVideoExpanded,
  onCopy,
  onVideoLoad,
  onToggleVideoExpand,
  createMarkup,
  renderVideo
}) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = processedContent;

  // Processar elementos específicos do MDX mantendo os estilos premium
  const processedElements = Array.from(tempDiv.childNodes).map((node, index) => {
    const textContent = node.textContent || '';
    
    // 1. Processar vídeos do YouTube com estilo premium
    const videoId = extractVideoId(textContent);
    if (videoId) {
      return (
        <div key={`video-${index}`} className="my-8 premium-video-container">
          {renderVideo(videoId)}
        </div>
      );
    }

    // 2. Processar botões de cópia com sintaxe @@texto@@ (estilo premium)
    if (textContent.includes('@@')) {
      const parts = textContent.split(/@@(.*?)@@/);
      const processed = parts.map((part, i) => {
        if (i % 2 === 0) {
          return part.trim() === '' ? null : (
            <span
              key={`text-${index}-${i}`}
              dangerouslySetInnerHTML={createMarkup(marked.parseInline(part, { async: false }) as string)}
            />
          );
        }
        return (
          <CopyButton
            key={`copy-${index}-${i}`}
            text={part}
            isCopied={copiedText === part}
            onCopy={onCopy}
          />
        );
      });
      
      return (
        <div key={`copy-wrap-${index}`} className="my-6 flex flex-wrap items-center gap-3 premium-copy-section">
          {processed}
        </div>
      );
    }

    // 3. Processar texto destacado com sintaxe :::texto::: (aplicar classe highlight-text)
    if (textContent.includes(':::')) {
      const highlightedContent = textContent.replace(
        /:::(.*?):::/g,
        '<span class="highlight-text">$1</span>'
      );
      
      return (
        <div 
          key={`highlight-${index}`} 
          className="my-6 premium-highlight-container"
          dangerouslySetInnerHTML={createMarkup(marked.parseInline(highlightedContent, { async: false }) as string)}
        />
      );
    }

    // 4. Processar imagens com efeito premium
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).nodeName.toLowerCase() === 'img') {
      const imgElement = node as HTMLImageElement;
      return (
        <div key={`img-${index}`} className="my-8 text-center premium-image-wrapper">
          <img 
            src={imgElement.src}
            alt={imgElement.alt || 'Imagem do projeto'}
            className="premium-image"
            loading="lazy"
          />
        </div>
      );
    }

    // 5. Processar elementos HTML mantendo hierarquia premium
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      
      // Headers com gradientes premium
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
        return (
          <div
            key={`header-${index}`}
            className={`premium-header premium-${tagName}`}
            dangerouslySetInnerHTML={createMarkup(element.outerHTML)}
          />
        );
      }
      
      // Code blocks com estilo premium
      if (tagName === 'pre') {
        return (
          <div key={`code-${index}`} className="my-6 premium-code-wrapper">
            <div 
              className="premium-code-block"
              dangerouslySetInnerHTML={createMarkup(element.outerHTML)}
            />
          </div>
        );
      }

      // Listas com estilo premium
      if (['ul', 'ol'].includes(tagName)) {
        return (
          <div key={`list-${index}`} className="premium-list-container">
            <div 
              dangerouslySetInnerHTML={createMarkup(element.outerHTML)}
            />
          </div>
        );
      }

      // Blockquotes com estilo testemunho
      if (tagName === 'blockquote') {
        return (
          <div key={`quote-${index}`} className="premium-blockquote-container">
            <div 
              dangerouslySetInnerHTML={createMarkup(element.outerHTML)}
            />
          </div>
        );
      }

      // Tabelas com estilo premium
      if (tagName === 'table') {
        return (
          <div key={`table-${index}`} className="my-8 premium-table-wrapper">
            <div 
              dangerouslySetInnerHTML={createMarkup(element.outerHTML)}
            />
          </div>
        );
      }

      // Parágrafos e outros elementos
      return (
        <div
          key={`html-${index}`}
          className="premium-content-element"
          dangerouslySetInnerHTML={createMarkup(element.outerHTML)}
        />
      );
    }

    // 6. Nós de texto simples
    if (node.nodeType === Node.TEXT_NODE && textContent.trim()) {
      return (
        <div key={`text-${index}`} className="premium-text-content">
          {textContent}
        </div>
      );
    }

    return null;
  }).filter(Boolean);

  return <>{processedElements}</>;
};
