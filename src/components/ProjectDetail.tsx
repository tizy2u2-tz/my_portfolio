'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Project, projects } from '@/data/projects';

// Dynamic import with ssr: false to prevent document is not defined error
const LottiePlayer = dynamic(() => import('./LottiePlayer'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-ink-light animate-pulse" />
});

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="pt-28 pb-16 container-main">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link 
          href="/work" 
          className="inline-flex items-center gap-2 text-cream/60 hover:text-magenta transition-colors mb-12"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Work
        </Link>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-magenta text-cream">
            {project.category}
          </span>
          <span className="text-cream/40">{project.year}</span>
          {project.client && (
            <span className="text-cream/40">• {project.client}</span>
          )}
        </div>
        
        <h1 className="heading-lg mb-6">{project.title}</h1>
        
        <p className="body-lg max-w-3xl">{project.overview}</p>
      </motion.header>

      {/* Hero Image or Lottie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative aspect-video mb-20 bg-ink-light overflow-hidden"
      >
        {project.hasLottie && project.lottieFile ? (
          <LottiePlayer 
            src={project.lottieFile} 
            className="w-full h-full"
          />
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
      </motion.div>

      {/* Case Study Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-32 space-y-8">
            <div>
              <h3 className="text-xs font-medium tracking-widest uppercase text-magenta mb-3">Role</h3>
              <p className="text-cream/80">{project.role}</p>
            </div>
            
            <div>
              <h3 className="text-xs font-medium tracking-widest uppercase text-magenta mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-cream/60 border border-cream/20 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-2 space-y-12"
        >
          <section>
            <h2 className="heading-md mb-4">Challenge</h2>
            <p className="body-md">{project.challenge}</p>
          </section>

          <section>
            <h2 className="heading-md mb-4">Approach</h2>
            <p className="body-md">{project.approach}</p>
          </section>

          <section>
            <h2 className="heading-md mb-4">Outcome</h2>
            <p className="body-md">{project.outcome}</p>
          </section>

          {project.reflection && (
            <section>
              <h2 className="heading-md mb-4">Reflection</h2>
              <p className="body-md">{project.reflection}</p>
            </section>
          )}
        </motion.div>
      </div>

      {/* Project Images Gallery */}
      {project.images.length > 1 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="heading-md mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-[4/3] bg-ink-light overflow-hidden">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-cream/10 pt-12 flex justify-between"
      >
        {prevProject ? (
          <Link 
            href={`/work/${prevProject.slug}`}
            className="group"
          >
            <span className="text-xs text-cream/40 uppercase tracking-widest">Previous</span>
            <p className="text-lg font-display group-hover:text-magenta transition-colors">
              ← {prevProject.title}
            </p>
          </Link>
        ) : <div />}
        
        {nextProject ? (
          <Link 
            href={`/work/${nextProject.slug}`}
            className="group text-right"
          >
            <span className="text-xs text-cream/40 uppercase tracking-widest">Next</span>
            <p className="text-lg font-display group-hover:text-magenta transition-colors">
              {nextProject.title} →
            </p>
          </Link>
        ) : <div />}
      </motion.nav>
    </article>
  );
}
