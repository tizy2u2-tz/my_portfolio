'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Project } from '@/data/projects';

// Dynamic import with ssr: false to prevent document is not defined error
const LottiePlayer = dynamic(() => import('./LottiePlayer'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-ink-light animate-pulse" />
});

interface ProjectCardProps {
  project: Project;
  index?: number;
}

// Color scheme based on category
const getCategoryColors = (category: string) => {
  switch (category.toLowerCase()) {
    case 'brand':
      return { badge: 'bg-magenta text-white', titleHover: 'group-hover:text-magenta', line: 'bg-magenta' };
    case 'motion':
      return { badge: 'bg-magenta text-white', titleHover: 'group-hover:text-magenta', line: 'bg-magenta' };
    case 'campaign':
      return { badge: 'bg-magenta text-white', titleHover: 'group-hover:text-magenta', line: 'bg-magenta' };
    case 'design system':
      return { badge: 'bg-magenta text-white', titleHover: 'group-hover:text-magenta', line: 'bg-magenta' };
    default:
      return { badge: 'bg-magenta text-white', titleHover: 'group-hover:text-magenta', line: 'bg-magenta' };
  }
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const colors = getCategoryColors(project.category);
  const carouselImages = project.heroCarouselImages?.length ? project.heroCarouselImages : [];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (carouselImages.length === 0) return;
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % carouselImages.length);
    }, 1422);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative overflow-hidden bg-ink-light rounded-sm"
      >
        {/* Project Image, Video, Lottie, or Carousel */}
        <div className={`relative aspect-[4/3] overflow-hidden ${project.hasLottie && project.lottieFile ? 'flex items-center justify-center' : ''}`}>
          {project.hasLottie && project.lottieFile ? (
            <div className="w-full h-full flex items-start justify-center pt-6 pb-2 px-4">
              <div className="w-full h-full flex items-center justify-center">
                <LottiePlayer 
                  src={project.lottieFile} 
                  className="w-full h-full"
                  showControls={false}
                  autoplay={true}
                  loop={true}
                />
              </div>
            </div>
          ) : carouselImages.length > 0 ? (
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={carouselImages[carouselIndex]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselImages[carouselIndex]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : project.thumbnail.endsWith('.mp4') || project.thumbnail.endsWith('.mov') || project.thumbnail.endsWith('.webm') ? (
            <video
              src={project.thumbnail}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          
          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent pointer-events-none"
          />
          
          {/* Category badge */}
          <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium tracking-wider uppercase z-10 ${colors.badge}`}>
            {project.category}
          </span>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className={`text-xl font-display font-semibold mb-2 ${colors.titleHover} transition-colors duration-300`}>
            {project.title}
          </h3>
          <p className="text-cream/60 text-sm line-clamp-2">
            {project.overview}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-cream/40 border border-cream/25 px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${colors.line}`}
        />
      </motion.article>
    </Link>
  );
}
