import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface UseMagneticEffectOptions {
  strength?: number;
  maxDistance?: number;
  springConfig?: { damping: number; stiffness: number };
}

export function useMagneticEffect(options: UseMagneticEffectOptions = {}) {
  const {
    strength = 15,
    maxDistance = 100,
    springConfig = { damping: 15, stiffness: 150 },
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Text shift for depth
  const textX = useTransform(xSpring, [-20, 20], [-2, 2]);
  const textY = useTransform(ySpring, [-20, 20], [-1, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Magnetic pull effect - stronger when closer
      if (distance < maxDistance) {
        const pullStrength = (1 - distance / maxDistance) * strength;
        x.set(distanceX * 0.15 * pullStrength);
        y.set(distanceY * 0.15 * pullStrength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [x, y, strength, maxDistance]);

  return {
    ref: elementRef,
    x: xSpring,
    y: ySpring,
    textX,
    textY,
  };
}
