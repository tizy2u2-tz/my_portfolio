'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function MagneticButton({ 
  href, 
  children, 
  className = '',
  variant = 'primary'
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
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
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
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

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [x, y]);

  const baseClasses = variant === 'primary'
    ? 'inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase bg-black text-[#FFE100] border-2 border-black relative overflow-hidden min-w-[200px]'
    : 'inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase border-2 border-black text-black relative overflow-hidden min-w-[200px]';

  return (
    <motion.div
      style={{
        x: xSpring,
        y: ySpring,
      }}
      className="inline-block"
    >
      <motion.div
        whileHover={variant === 'secondary' ? { scale: 1.02 } : {}}
        transition={{ duration: 0.2 }}
      >
        <Link
          ref={buttonRef}
          href={href}
          className={`${baseClasses} ${className}`}
        >
        {/* Primary: Magenta wave overlay - sweeps from left to right */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-[#FF0B90]"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '0%' } : { x: '-100%' }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        )}
        
        {/* Secondary: Border glow effect */}
        {variant === 'secondary' && (
          <>
            <motion.div
              className="absolute inset-0 border-2 border-[#014CFD]"
              initial={{ opacity: 0, scale: 1 }}
              animate={isHovered ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                boxShadow: isHovered ? '0 0 20px rgba(1, 76, 253, 0.5)' : '0 0 0px rgba(1, 76, 253, 0)',
              }}
            />
            <motion.div
              className="absolute inset-0 bg-[#014CFD]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </>
        )}
        
        {/* Text with depth shift */}
        <motion.span
          style={{
            x: textX,
            y: textY,
            position: 'relative',
            zIndex: 1,
            color: isHovered && variant === 'primary' 
              ? '#000000' 
              : isHovered && variant === 'secondary'
              ? '#FFFFFF'
              : variant === 'primary' 
              ? '#FFE100' 
              : '#000000',
            transition: 'color 0.3s ease 0.3s',
          }}
        >
          {children}
        </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
