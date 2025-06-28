
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface ProjectViewerContentProps {
  content: string;
  onCopy: (text: string) => void;
  renderVideo: (videoId: string) => React.ReactNode;
}

export const ProjectViewerContent: React.FC<ProjectViewerContentProps> = ({
  content,
  onCopy,
  renderVideo
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configure marked options for synchronous operation
    marked.setOptions({
      gfm: true,
      breaks: true,
      async: false // Force synchronous operation
    });
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      // Add target="_blank" to all links
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }, [content]);

  const createMarkup = (html: string) => ({
    __html: DOMPurify.sanitize(html)
  });

  // Process markdown content
  const processContent = () => {
    const safeContent = content || 'Conteúdo não disponível';
    
    // Highlight special content with :::text::: syntax
    const highlightedMarkdown = safeContent.replace(
      /:::(.+?):::/g,
      (_, content) => `<span class="highlight-text">${content.trim()}</span>`
    );

    // Parse markdown content synchronously using the legacy API
    const processedContent = marked.parse(highlightedMarkdown.replace(/\\n/g, '\n'), { async: false }) as string;
    
    // Create temporary div to process content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = processedContent;

    // Process code elements
    tempDiv.querySelectorAll('code').forEach((codeEl) => {
      const text = codeEl.textContent?.trim() || '';
      const isCode = /[=(){}[\];]/.test(text);
      
      if (isCode) {
        codeEl.classList.add('code-real');
      } else {
        codeEl.classList.add('code-inline-text');
      }
    });

    // Process links
    tempDiv.querySelectorAll('a').forEach((a) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });

    return Array.from(tempDiv.childNodes).map((node, index) => {
      const textContent = node.textContent || '';
      
      // Handle YouTube videos
      const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const videoMatch = textContent.match(videoRegex);

      if (videoMatch) {
        return (
          <div key={`video-${index}`} className="my-8">
            {renderVideo(videoMatch[1])}
          </div>
        );
      }

      // Handle copy buttons with @@ syntax
      if (textContent.includes('@@')) {
        const split = textContent.split(/@@(.*?)@@/);
        const processed = split.map((part, i) => {
          if (i % 2 === 0) {
            return part.trim() === '' ? null : (
              <span
                key={`text-${index}-${i}`}
                dangerouslySetInnerHTML={createMarkup(marked.parseInline(part, { async: false }) as string)}
              />
            );
          }
          return (
            <Button
              key={`copy-${index}-${i}`}
              variant="outline"
              size="sm"
              onClick={() => onCopy(part)}
              className="mx-2 my-1 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 transition-all duration-200 hover:scale-105"
            >
              <Copy className="h-3 w-3 mr-2" />
              {part}
            </Button>
          );
        });
        return (
          <div key={`copy-wrap-${index}`} className="my-6 flex flex-wrap items-center gap-2">
            {processed}
          </div>
        );
      }

      // Handle images
      if (node.nodeType === Node.ELEMENT_NODE && (node as Element).nodeName.toLowerCase() === 'img') {
        return (
          <div key={`img-${index}`} className="my-8 text-center">
            <div dangerouslySetInnerHTML={{ __html: (node as Element).outerHTML }} />
          </div>
        );
      }

      // Handle regular content
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (
          <div
            key={`html-${index}`}
            className="my-4"
            dangerouslySetInnerHTML={createMarkup((node as Element).outerHTML)}
          />
        );
      }

      // Handle text nodes
      return (
        <div key={`text-${index}`} className="my-4">
          {textContent}
        </div>
      );
    });
  };

  return (
    <motion.div 
      ref={contentRef}
      className="prose prose-lg max-w-none dark:prose-invert project-viewer-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <style>
        {`
        .project-viewer-content {
          /* Modern color scheme */
          --tw-prose-headings: theme(colors.slate.900);
          --tw-prose-lead: theme(colors.slate.600);
          --tw-prose-links: theme(colors.blue.600);
          --tw-prose-bold: theme(colors.slate.900);
          --tw-prose-counters: theme(colors.slate.500);
          --tw-prose-bullets: theme(colors.slate.400);
          --tw-prose-hr: theme(colors.slate.200);
          --tw-prose-quotes: theme(colors.slate.900);
          --tw-prose-quote-borders: theme(colors.slate.200);
          --tw-prose-captions: theme(colors.slate.500);
          --tw-prose-code: theme(colors.slate.900);
          --tw-prose-pre-code: theme(colors.slate.100);
          --tw-prose-pre-bg: theme(colors.slate.900);
          --tw-prose-th-borders: theme(colors.slate.300);
          --tw-prose-td-borders: theme(colors.slate.200);
        }

        .dark .project-viewer-content {
          --tw-prose-headings: theme(colors.slate.100);
          --tw-prose-lead: theme(colors.slate.400);
          --tw-prose-links: theme(colors.blue.400);
          --tw-prose-bold: theme(colors.slate.100);
          --tw-prose-counters: theme(colors.slate.400);
          --tw-prose-bullets: theme(colors.slate.500);
          --tw-prose-hr: theme(colors.slate.700);
          --tw-prose-quotes: theme(colors.slate.100);
          --tw-prose-quote-borders: theme(colors.slate.700);
          --tw-prose-captions: theme(colors.slate.400);
          --tw-prose-code: theme(colors.slate.100);
          --tw-prose-pre-code: theme(colors.slate.300);
          --tw-prose-pre-bg: theme(colors.slate.800);
          --tw-prose-th-borders: theme(colors.slate.600);
          --tw-prose-td-borders: theme(colors.slate.700);
        }

        .project-viewer-content h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 2rem;
          margin-top: 2rem;
          color: var(--tw-prose-headings);
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        .project-viewer-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          margin-top: 2rem;
          color: var(--tw-prose-headings);
          letter-spacing: -0.025em;
        }

        .project-viewer-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
          color: var(--tw-prose-headings);
        }

        .project-viewer-content p {
          font-size: 1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          color: var(--tw-prose-lead);
          font-weight: 400;
        }

        .project-viewer-content pre {
          background-color: var(--tw-prose-pre-bg);
          color: var(--tw-prose-pre-code);
          border-radius: 12px;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          font-size: 0.875rem;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid theme(colors.slate.200);
        }

        .dark .project-viewer-content pre {
          border: 1px solid theme(colors.slate.700);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        .project-viewer-content pre code {
          background: none;
          padding: 0;
          color: inherit;
          font-family: inherit;
        }

        .project-viewer-content code {
          background-color: theme(colors.slate.100);
          color: theme(colors.slate.800);
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .dark .project-viewer-content code {
          background-color: theme(colors.slate.800);
          color: theme(colors.slate.200);
        }

        .project-viewer-content .highlight-text {
          background-color: theme(colors.yellow.100);
          color: theme(colors.yellow.800);
          font-style: italic;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.875rem;
          border: 1px solid theme(colors.yellow.200);
          display: inline-block;
        }

        .dark .project-viewer-content .highlight-text {
          background-color: theme(colors.yellow.900);
          color: theme(colors.yellow.200);
          border: 1px solid theme(colors.yellow.700);
        }

        .project-viewer-content ul, .project-viewer-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
        }

        .project-viewer-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }

        .project-viewer-content a {
          color: var(--tw-prose-links);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          border-bottom: 1px solid transparent;
        }

        .project-viewer-content a:hover {
          border-bottom-color: var(--tw-prose-links);
        }

        .project-viewer-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.875rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border-radius: 8px;
          overflow: hidden;
        }

        .project-viewer-content th, .project-viewer-content td {
          border: 1px solid var(--tw-prose-th-borders);
          padding: 0.75rem 1rem;
          text-align: left;
        }

        .project-viewer-content th {
          background-color: theme(colors.slate.50);
          font-weight: 600;
          color: theme(colors.slate.900);
        }

        .dark .project-viewer-content th {
          background-color: theme(colors.slate.800);
          color: theme(colors.slate.100);
        }

        .project-viewer-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2rem auto;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .project-viewer-content blockquote {
          border-left: 4px solid var(--tw-prose-links);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--tw-prose-quotes);
          background-color: theme(colors.slate.50);
          padding: 1.5rem;
          border-radius: 8px;
        }

        .dark .project-viewer-content blockquote {
          background-color: theme(colors.slate.800);
        }

        @media (max-width: 768px) {
          .project-viewer-content h1 {
            font-size: 1.75rem;
          }
          
          .project-viewer-content h2 {
            font-size: 1.375rem;
          }
          
          .project-viewer-content h3 {
            font-size: 1.125rem;
          }
          
          .project-viewer-content p {
            font-size: 0.95rem;
          }
          
          .project-viewer-content pre {
            padding: 1rem;
            font-size: 0.8rem;
          }
        }
        `}
      </style>
      
      {processContent()}
    </motion.div>
  );
};
