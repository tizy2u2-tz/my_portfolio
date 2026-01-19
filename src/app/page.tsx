'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
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
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center container-main relative">
        {/* Background accent */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-magenta/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-lime/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-5xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="text-magenta font-medium tracking-widest uppercase mb-6"
          >
            Tonya Zenin
          </motion.p>
          
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="heading-xl mb-8"
          >
            Design
            <br />
            <span className="text-magenta">With</span>
            <br />
            Purpose
          </motion.h1>
          
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="body-lg max-w-2xl mb-12"
          >
            I&apos;m a multi-disciplinary designer specializing in brand, digital, and campaign work. 
            My work blends visual clarity with bold ideas to deliver unique design solutions across every medium.
          </motion.p>
          
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="flex flex-wrap gap-4"
          >
            <Link href="/work" className="btn-primary">
              View Work
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-cream/40"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
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
