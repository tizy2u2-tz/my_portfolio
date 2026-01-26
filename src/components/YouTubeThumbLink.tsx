'use client';

import { motion } from 'framer-motion';

interface YouTubeThumbLinkProps {
  href: string;
  title?: string;
  className?: string;
}

/**
 * Thumbnail-style link to a YouTube video. Dark card with play button overlay.
 */
export default function YouTubeThumbLink({
  href,
  title = 'Watch video',
  className = '',
}: YouTubeThumbLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block aspect-square bg-ink overflow-hidden rounded-sm border border-cream/20 hover:border-yellow/50 transition-colors duration-300 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={title}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-yellow/90 flex items-center justify-center group-hover:bg-yellow transition-colors shadow-lg">
          <svg className="w-6 h-6 text-ink ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span className="text-xs font-medium text-cream/90 group-hover:text-yellow transition-colors">
          {title}
        </span>
      </div>
    </motion.a>
  );
}
