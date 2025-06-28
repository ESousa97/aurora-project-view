
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
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
    // Configure marked options
    marked.setOptions({
      gfm: true,
      breaks: true,
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

    // Parse markdown
    const processedContent = marked.parse(highlightedMarkdown.replace(/\\n/g, '\n'));
    
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
          <div key={`video-${index}`} className="my-6">
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
                dangerouslySetInnerHTML={createMarkup(marked.parse(part))}
              />
            );
          }
          return (
            <Button
              key={`copy-${index}-${i}`}
              variant="outline"
              size="sm"
              onClick={() => onCopy(part)}
              className="mx-1 my-1 bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
            >
              <Copy className="h-3 w-3 mr-1" />
              {part}
            </Button>
          );
        });
        return (
          <div key={`copy-wrap-${index}`} className="my-4">
            {processed}
          </div>
        );
      }

      // Handle images
      if (node.nodeName.toLowerCase() === 'img') {
        return (
          <div key={`img-${index}`} className="my-6 text-center">
            <div dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
          </div>
        );
      }

      // Handle regular content
      return (
        <div
          key={`html-${index}`}
          className="my-4"
          dangerouslySetInnerHTML={createMarkup(node.outerHTML)}
        />
      );
    });
  };

  return (
    <motion.div 
      ref={contentRef}
      className="prose prose-lg max-w-none dark:prose-invert project-viewer-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <style jsx>{`
        .project-viewer-content {
          /* Headings */
          --tw-prose-headings: theme(colors.foreground);
          --tw-prose-lead: theme(colors.muted.foreground);
          --tw-prose-links: theme(colors.primary.DEFAULT);
          --tw-prose-bold: theme(colors.foreground);
          --tw-prose-counters: theme(colors.muted.foreground);
          --tw-prose-bullets: theme(colors.muted.foreground);
          --tw-prose-hr: theme(colors.border);
          --tw-prose-quotes: theme(colors.foreground);
          --tw-prose-quote-borders: theme(colors.border);
          --tw-prose-captions: theme(colors.muted.foreground);
          --tw-prose-code: theme(colors.foreground);
          --tw-prose-pre-code: theme(colors.muted.foreground);
          --tw-prose-pre-bg: theme(colors.muted);
          --tw-prose-th-borders: theme(colors.border);
          --tw-prose-td-borders: theme(colors.border);
        }

        .project-viewer-content h1 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--tw-prose-headings);
          border-bottom: 2px solid theme(colors.border);
          padding-bottom: 0.5rem;
        }

        .project-viewer-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          color: var(--tw-prose-headings);
        }

        .project-viewer-content h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--tw-prose-headings);
        }

        .project-viewer-content p {
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1rem;
          color: theme(colors.muted.foreground);
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .project-viewer-content pre {
          background-color: theme(colors.muted);
          color: theme(colors.foreground);
          border-radius: 0.75rem;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .project-viewer-content pre code {
          background: none;
          padding: 0;
          color: inherit;
          font-family: inherit;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .project-viewer-content code {
          background-color: theme(colors.muted);
          color: theme(colors.primary.DEFAULT);
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.85rem;
          font-weight: 500;
          word-break: break-word;
        }

        .project-viewer-content .highlight-text {
          background-color: theme(colors.accent.DEFAULT);
          color: theme(colors.accent.foreground);
          font-style: italic;
          font-weight: bold;
          padding: 0.125rem 0.375rem;
          border-radius: 0.375rem;
          font-size: 0.9rem;
          border: 1px dashed theme(colors.border);
          display: inline-block;
        }

        .project-viewer-content ul, .project-viewer-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .project-viewer-content li {
          margin-bottom: 0.75rem;
          line-height: 1.6;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .project-viewer-content a {
          color: theme(colors.primary.DEFAULT);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease-in-out;
          position: relative;
        }

        .project-viewer-content a:hover {
          color: theme(colors.primary.DEFAULT / 0.8);
        }

        .project-viewer-content a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 2px;
          width: 0;
          background-color: theme(colors.primary.DEFAULT);
          transition: width 0.3s ease-in-out;
        }

        .project-viewer-content a:hover::after {
          width: 100%;
        }

        .project-viewer-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .project-viewer-content th, .project-viewer-content td {
          border: 1px solid theme(colors.border);
          padding: 0.75rem;
          text-align: left;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .project-viewer-content th {
          background-color: theme(colors.muted);
          font-weight: 600;
        }

        .project-viewer-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1.5rem auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .project-viewer-content blockquote {
          border-left: 4px solid theme(colors.primary.DEFAULT);
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: theme(colors.muted.foreground);
        }

        @media (max-width: 640px) {
          .project-viewer-content h1 {
            font-size: 1.5rem;
          }
          
          .project-viewer-content h2 {
            font-size: 1.3rem;
          }
          
          .project-viewer-content h3 {
            font-size: 1.1rem;
          }
          
          .project-viewer-content p {
            font-size: 0.875rem;
          }
          
          .project-viewer-content pre {
            font-size: 0.75rem;
          }
          
          .project-viewer-content code {
            font-size: 0.75rem;
          }
        }
      `}</style>
      
      {processContent()}
    </motion.div>
  );
};
