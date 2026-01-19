'use client';

import { useState, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

interface LottiePlayerProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showControls?: boolean;
}

export default function LottiePlayer({
  src,
  className = '',
  autoplay = true,
  loop = true,
  showControls = true,
}: LottiePlayerProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load animation data
  useState(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load animation');
        setIsLoading(false);
        console.error('Lottie load error:', err);
      });
  });

  const togglePlay = () => {
    if (lottieRef.current) {
      if (isPlaying) {
        lottieRef.current.pause();
      } else {
        lottieRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restart = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
      setIsPlaying(true);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-ink-light ${className}`}>
        <div className="animate-pulse text-cream/40">Loading animation...</div>
      </div>
    );
  }

  if (error || !animationData) {
    return (
      <div className={`flex items-center justify-center bg-ink-light ${className}`}>
        <div className="text-cream/40">{error || 'Animation unavailable'}</div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full"
      />

      {/* Controls overlay */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-ink/80 text-cream hover:bg-magenta transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
          
          <button
            onClick={restart}
            className="w-10 h-10 flex items-center justify-center bg-ink/80 text-cream hover:bg-magenta transition-colors"
            aria-label="Restart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
