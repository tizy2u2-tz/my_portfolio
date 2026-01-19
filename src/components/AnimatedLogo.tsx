'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const colors = {
  gray: '#6a6d75',
  light: '#bec1c6',
  magenta: '#bb0147',
};

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: 'easeInOut',
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
};

const pulseVariants = {
  idle: {
    scale: 1,
  },
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function AnimatedLogo({ className = '' }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentColor = isHovered ? colors.magenta : colors.gray;

  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      animate={isLoaded ? 'pulse' : 'visible'}
      variants={pulseVariants}
      onAnimationComplete={() => setIsLoaded(true)}
    >
      {/* Outer circle with tz letterform */}
      <motion.path
        d="M200,3.66C91.56,3.66,3.66,91.56,3.66,200s87.9,196.34,196.34,196.34,196.34-87.9,196.34-196.34S308.44,3.66,200,3.66ZM336.99,312.85h-186.2c-37.57,0-59.29-25.05-59.29-64.71V62.34h36.74v50.1h168.66c25.05,0,38.41,10.44,38.41,26.72,0,8.77-1.67,16.29-6.26,21.71l-95.61,116.9h103.54v35.07Z"
        fill="none"
        stroke={currentColor}
        strokeWidth="2"
        variants={pathVariants}
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 0,
        }}
        animate={{
          fill: currentColor,
          stroke: currentColor,
          transition: { duration: 0.3 },
        }}
      />
      
      {/* Inner counter shape */}
      <motion.path
        d="M200.06,147.51h-71.81v105.21c0,18.79,8.77,25.05,27.56,25.05h37.94c2.51-9.1,8.96-17.64,18.83-30.06l81.83-100.2h-94.35Z"
        fill="none"
        stroke={currentColor}
        strokeWidth="2"
        variants={pathVariants}
        animate={{
          fill: currentColor,
          stroke: currentColor,
          transition: { duration: 0.3, delay: 0.5 },
        }}
      />
    </motion.svg>
  );
}
