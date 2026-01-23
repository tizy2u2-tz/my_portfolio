'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticWrapper({ children, className = '' }: MagneticWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Text shift for depth
  const textX = useTransform(xSpring, [-20, 20], [-2, 2]);
  const textY = useTransform(ySpring, [-20, 20], [-1, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Magnetic pull effect - stronger when closer
      const maxDistance = 100;
      if (distance < maxDistance) {
        const strength = (1 - distance / maxDistance) * 15;
        x.set(distanceX * 0.15 * strength);
        y.set(distanceY * 0.15 * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('mousemove', handleMouseMove);
        wrapper.removeEventListener('mouseenter', handleMouseEnter);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [x, y]);

  // Check if className includes w-full for full-width buttons
  const isFullWidth = className.includes('w-full');
  const wrapperClass = isFullWidth ? `block ${className}` : `inline-block ${className}`;

  return (
    <motion.div
      ref={wrapperRef}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      className={wrapperClass}
    >
      <motion.div
        style={{
          x: textX,
          y: textY,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

