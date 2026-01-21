'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Placeholder experiments - you can add your Lottie files here
const experiments = [
  {
    id: 'cohesity-cake',
    title: '10th Anniversary Cake',
    description: 'Celebratory animation for Cohesity\'s 10-year milestone.',
    type: 'lottie',
    // lottieFile: '/lottie/cohesity-cake.json',
    thumbnail: '/images/placeholder-project.jpg',
  },
  {
    id: 'catalyst-logo',
    title: 'Catalyst Summit',
    description: 'Animated branding for the Data Security & Management Summit.',
    type: 'lottie',
    // lottieFile: '/lottie/catalyst.json',
    thumbnail: '/images/placeholder-project.jpg',
  },
  {
    id: 'be-resilient',
    title: 'BE: Ready, Resilient',
    description: 'Campaign motion graphics exploring security themes.',
    type: 'lottie',
    // lottieFile: '/lottie/be-resilient.json',
    thumbnail: '/images/placeholder-project.jpg',
  },
  {
    id: 'shield-animation',
    title: 'Security Shield',
    description: 'Illustrated shield animation with cityscape backdrop.',
    type: 'lottie',
    // lottieFile: '/lottie/shield.json',
    thumbnail: '/images/placeholder-project.jpg',
  },
];

export default function PlaygroundPage() {
  return (
    <section className="pt-28 pb-16 container-main min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-lime font-medium tracking-widest uppercase mb-4">Experiments</p>
        <h1 className="heading-lg mb-6">Playground</h1>
        <p className="body-lg max-w-2xl">
          A space for motion experiments, animation explorations, and creative play. 
          These pieces live outside of client work—pure creative expression.
        </p>
      </motion.div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {experiments.map((experiment, index) => (
          <motion.article
            key={experiment.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative bg-ink-light overflow-hidden"
          >
            {/* Preview area */}
            <div className="relative aspect-square bg-gradient-to-br from-ink-light to-ink flex items-center justify-center overflow-hidden">
              {/* Placeholder - replace with LottiePlayer when you add files */}
              <div className="text-center p-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-magenta to-coral opacity-50"
                />
                <p className="text-cream/30 text-sm">Lottie animation coming soon</p>
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-yellow/20 flex items-center justify-center"
              >
                <span className="px-4 py-2 bg-ink text-cream text-sm font-medium">
                  View Animation
                </span>
              </motion.div>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-lime transition-colors">
                {experiment.title}
              </h3>
              <p className="text-cream/60 text-sm">
                {experiment.description}
              </p>
            </div>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-lime origin-left"
            />
          </motion.article>
        ))}
      </div>

      {/* Coming soon message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-cream/40">
          More experiments loading... Check back soon for interactive Lottie animations.
        </p>
      </motion.div>
    </section>
  );
}
