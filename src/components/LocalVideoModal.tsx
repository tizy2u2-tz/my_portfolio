'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LocalVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

/**
 * Modal that plays a local video file. Close via backdrop click or Escape.
 */
export default function LocalVideoModal({ isOpen, onClose, videoSrc }: LocalVideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Video modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-ink rounded overflow-hidden shadow-2xl"
            style={{
              aspectRatio: '16/9',
              width: 'min(100%, calc(100vw - 2rem), calc(90vh * 16 / 9))',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoSrc}
              controls
              autoPlay
              className="w-full h-full"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
