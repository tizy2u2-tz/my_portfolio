'use client';

import { useRef } from 'react';
import { Player, PlayerEvent } from '@lottiefiles/react-lottie-player';

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
  const playerRef = useRef<Player>(null);

  const togglePlay = () => {
    if (playerRef.current) {
      const state = playerRef.current.state;
      if (state?.playerState === 'playing') {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  const restart = () => {
    if (playerRef.current) {
      playerRef.current.setSeeker(0);
      playerRef.current.play();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <Player
        ref={playerRef}
        src={src}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
        onEvent={(event: PlayerEvent) => {
          if (event === 'error') {
            console.error('Lottie player error');
          }
        }}
      />

      {/* Controls overlay */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-ink/80 text-cream hover:bg-yellow hover:text-ink transition-colors"
            aria-label="Play/Pause"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
          
          <button
            onClick={restart}
            className="w-10 h-10 flex items-center justify-center bg-ink/80 text-cream hover:bg-yellow hover:text-ink transition-colors"
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
