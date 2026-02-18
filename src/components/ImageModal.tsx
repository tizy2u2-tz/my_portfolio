'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

/**
 * Modal that displays an image at larger scale. Close via button, backdrop click, or Escape.
 * Image uses natural dimensions so tall images are scrollable.
 */
export default function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
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
          className="fixed inset-0 z-50 bg-black/90"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-ink p-4 pt-16 md:pt-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent' }}
          >
            <div className="flex min-h-full min-w-0 justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={alt}
                className="max-w-full w-full h-auto block object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg"
              aria-label="Close"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
