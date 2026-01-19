'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedProfileImage from '@/components/AnimatedProfileImage';
import { featuredProjects } from '@/data/projects';

const heroTextVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Bleed */}
      <section className="min-h-screen w-full flex flex-col justify-center relative overflow-hidden">
        {/* Full-bleed animated background */}
        <AnimatedBackground />
        
        {/* Light overlay for text readability on colored backgrounds */}
        <div className="absolute inset-0 bg-white/10 z-[1]" />
        
        {/* Content container */}
        <div className="container-main relative z-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12 lg:gap-16">
            {/* Animated Profile Image - Left side */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={heroTextVariants}
              className="w-full md:w-auto"
            >
              <AnimatedProfileImage />
            </motion.div>

            {/* Text Content - Right side */}
            <div className="flex-1">
              <motion.p
                custom={0}
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
                className="font-medium tracking-widest uppercase mb-6 text-ink"
              >
                Tonya Zenin
              </motion.p>
              
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
                className="heading-xl mb-8 text-ink"
              >
                Design
                <br />
                <span className="text-ink">With</span>
                <br />
                Purpose
              </motion.h1>
              
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
                className="bg-white px-6 py-5 md:px-8 md:py-6 max-w-2xl mb-8 relative z-20 -ml-4"
              >
                <p className="text-ink text-base md:text-lg leading-relaxed">
                  I&apos;m a multi-disciplinary designer specializing in brand, digital, and campaign work. 
                  My work blends visual clarity with bold ideas to deliver unique design solutions across every medium.
                </p>
              </motion.div>
              
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
                className="flex flex-wrap gap-4 -ml-4"
              >
                <Link href="/work" className="btn-primary bg-ink text-cream hover:bg-ink-light">
                  View Work
                </Link>
                <Link href="/contact" className="btn-outline border-ink text-ink hover:bg-ink hover:text-cream">
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-ink"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Work Section */}
      <section className="py-32 container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <p className="text-magenta font-medium tracking-widest uppercase mb-4">Selected Projects</p>
            <h2 className="heading-lg">Featured Work</h2>
          </div>
          <Link 
            href="/work" 
            className="mt-6 md:mt-0 text-cream/60 hover:text-magenta transition-colors duration-300 link-underline"
          >
            View All Projects →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="heading-lg mb-6">
            Let&apos;s create something <span className="text-magenta">bold</span> together.
          </h2>
          <p className="body-lg mb-10">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link href="/contact" className="btn-primary">
            Start a Conversation
          </Link>
        </motion.div>
      </section>
    </>
  );
}
