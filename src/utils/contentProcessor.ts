// src/utils/contentProcessor.ts
export const processCodeElements = (element: HTMLElement) => {
  element.querySelectorAll('code').forEach((codeEl) => {
    const text = codeEl.textContent?.trim() || '';
    const isCode = /[=(){}[\];]/.test(text);
    
    if (isCode) {
      codeEl.classList.add('code-real');
    } else {
      codeEl.classList.add('code-inline-text');
    }
  });
};

export const processLinks = (element: HTMLElement) => {
  element.querySelectorAll('a').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });
};

export const extractVideoId = (text: string): string | null => {
  const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = text.match(videoRegex);
  return match ? match[1] : null;
};
