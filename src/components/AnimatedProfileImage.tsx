'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedProfileImage() {
  return (
    <div className="relative w-full md:w-[400px] lg:w-[500px] aspect-square flex-shrink-0">
      {/* Static background - tonya-2.png */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/tonya-2.png"
          alt="Tonya Zenin background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Foreground overlay - tonya.png with subtle animation, bottom-aligned */}
      <motion.div
        className="absolute z-10"
        style={{
          bottom: 0, // Bottom-aligned
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: 'auto',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: [0, -3, 0], // Subtle gentle float
        }}
        transition={{
          opacity: { duration: 0.6, ease: 'easeOut' },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <Image
          src="/images/tonya.png"
          alt="Tonya Zenin"
          width={1157}
          height={1335}
          className="w-full h-auto object-contain"
          style={{ maxHeight: '100%' }}
          priority
        />
      </motion.div>
    </div>
  );
}
