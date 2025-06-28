// src/hooks/useVideoPlayer.ts
import { useState } from 'react';

export const useVideoPlayer = () => {
  const [videoLoaded, setVideoLoaded] = useState<string | null>(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  const handleVideoLoad = (videoId: string) => {
    setVideoLoaded(videoId);
  };

  const toggleVideoExpand = () => {
    setIsVideoExpanded(prev => !prev);
  };

  return {
    videoLoaded,
    isVideoExpanded,
    handleVideoLoad,
    toggleVideoExpand
  };
};