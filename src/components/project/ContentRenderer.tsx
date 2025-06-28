// src/components/project/ContentRenderer.tsx
import React from 'react';
import { marked } from 'marked';
import { VideoPlayer } from './VideoPlayer';
import { CopyButton } from './CopyButton';
import { extractVideoId, processCodeElements, processLinks } from '@/utils/contentProcessor';

interface ContentRendererProps {
  processedContent: string;
  copiedText: string | null;
  videoLoaded: string | null;
  isVideoExpanded: boolean;
  onCopy: (text: string) => void;
  onVideoLoad: (videoId: string) => void;
  onToggleVideoExpand: () => void;
  createMarkup: (html: string) => { __html: string };
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  processedContent,
  copiedText,
  videoLoaded,
  isVideoExpanded,
  onCopy,
  onVideoLoad,
  onToggleVideoExpand,
  createMarkup
}) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = processedContent;

  processCodeElements(tempDiv);
  processLinks(tempDiv);

  return (
    <>
      {Array.from(tempDiv.childNodes).map((node, index) => {
        const textContent = node.textContent || '';
        
        // Handle YouTube videos
        const videoId = extractVideoId(textContent);
        if (videoId) {
          return (
            <div key={`video-${index}`} className="my-8">
              <VideoPlayer
                videoId={videoId}
                isLoaded={videoLoaded === videoId}
                isExpanded={isVideoExpanded}
                onLoad={() => onVideoLoad(videoId)}
                onToggleExpand={onToggleVideoExpand}
              />
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
              <CopyButton
                key={`copy-${index}-${i}`}
                text={part}
                isCopied={copiedText === part}
                onCopy={onCopy}
              />
            );
          });
          return (
            <div key={`copy-wrap-${index}`} className="my-4 flex flex-wrap items-center gap-2">
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
              className="my-3"
              dangerouslySetInnerHTML={createMarkup((node as Element).outerHTML)}
            />
          );
        }

        // Handle text nodes
        return (
          <div key={`text-${index}`} className="my-3">
            {textContent}
          </div>
        );
      })}
    </>
  );
};
