'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Fallback: ensure content is visible after animation should complete
    const timer = setTimeout(() => {
      const wrapper = document.querySelector('[data-page-transition]');
      if (wrapper) {
        const style = window.getComputedStyle(wrapper);
        if (parseFloat(style.opacity) === 0) {
          wrapper.style.opacity = '1';
          wrapper.style.transform = 'translateY(0)';
        }
      }
    }, 1000); // After 1 second, force visibility if still hidden

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        data-page-transition
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
