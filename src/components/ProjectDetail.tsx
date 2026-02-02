'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Project, projects } from '@/data/projects';
import LaptopVideoMockup from './LaptopVideoMockup';
import VideoModal from './VideoModal';
import LocalVideoModal from './LocalVideoModal';
import ImageModal from './ImageModal';

const IPHONE_BANNER_IMAGES = [
  '/images/Resilience-campaign/iPhone 15 Pro.jpg',
  '/images/Resilience-campaign/iPhone 15 Pro-1.jpg',
  '/images/Resilience-campaign/iPhone 15 Pro-2.jpg',
];

const RESILIENCE_PHOTO_IMAGES = [
  '/images/Resilience-campaign/resilience-photo-1.jpg',
  '/images/Resilience-campaign/resilience-photo-2.jpg',
  '/images/Resilience-campaign/resilience-photo-3.jpg',
  '/images/Resilience-campaign/resilience-photo-4.jpg',
  '/images/Resilience-campaign/resilience-photo-5.jpg',
  '/images/Resilience-campaign/resilience-photo-6.jpg',
  '/images/Resilience-campaign/resilience-photo-7.jpg',
  '/images/Resilience-campaign/resilience-photo-8.jpg',
];

const COHESITY_COLOR_PALETTE_IMAGES = [
  '/images/Color-Palette.png',
];


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

  const [iphoneBannerIndex, setIphoneBannerIndex] = useState(0);
  const [heroSlidesIndex, setHeroSlidesIndex] = useState(0);
  const heroHasTransitionedRef = useRef(false);
  const heroTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroSlidesLengthRef = useRef(0);
  const [videoModalId, setVideoModalId] = useState<string | null>(null);
  const [localVideoSrc, setLocalVideoSrc] = useState<string | null>(null);
  const [imageModalSrc, setImageModalSrc] = useState<string | null>(null);
  const [imageModalAlt, setImageModalAlt] = useState<string>('');

  useEffect(() => {
    if (project.slug !== 'resilience-everywhere-2025') return;
    const id = setInterval(() => {
      setIphoneBannerIndex((i) => (i + 1) % 3);
    }, 2500);
    return () => clearInterval(id);
  }, [project.slug]);

  const heroSlidesImages = project.slug === 'cohesity-rebrand' && project.heroSlidesImages?.length
    ? project.heroSlidesImages
    : [];

  heroSlidesLengthRef.current = heroSlidesImages.length;

  // Mark that we've left the first slide so subsequent slides (and loop-back to 0) use push initial
  useEffect(() => {
    if (heroSlidesImages.length > 0 && heroSlidesIndex !== 0) heroHasTransitionedRef.current = true;
  }, [heroSlidesImages.length, heroSlidesIndex]);

  // Cohesity Rebrand hero: 30 slides, single timeout, group pacing (every 3rd = accent beat)
  useEffect(() => {
    if (heroSlidesImages.length === 0) return;
    const length = heroSlidesImages.length;
    const schedule = (currentIndex: number) => {
      if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
      const isAccent = (currentIndex % 3) === 0;
      const delay = currentIndex === 0 ? 500 : (isAccent ? 1600 : 1100);
      heroTimeoutRef.current = setTimeout(() => {
        heroTimeoutRef.current = null;
        setHeroSlidesIndex((i) => {
          const len = heroSlidesLengthRef.current || length;
          const next = len > 0 ? (i + 1) % len : 0;
          schedule(next);
          return next;
        });
      }, delay);
    };
    schedule(0);
    return () => {
      if (heroTimeoutRef.current) {
        clearTimeout(heroTimeoutRef.current);
        heroTimeoutRef.current = null;
      }
    };
  }, [project.slug, heroSlidesImages.length]);

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
          className="font-body inline-flex items-center gap-2 text-sm text-cream/60 hover:text-yellow transition-colors mb-12"
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
          <span className="font-body px-3 py-1 text-xs font-medium tracking-wider uppercase bg-yellow text-ink">
            {project.category}
          </span>
          <span className="font-body text-sm text-cream/40">{project.year}</span>
          {project.client && (
            <span className="font-body text-sm text-cream/40">• {project.client}</span>
          )}
        </div>
        
        <h1 className="heading-lg mb-6">{project.title}</h1>
        
        <p className="body-lg max-w-3xl">{project.overview}</p>
        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-yellow hover:underline focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-ink"
          >
            View live simulator
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        )}
      </motion.header>

      {/* Hero Image or Lottie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`relative mb-20 bg-ink-light overflow-hidden ${
          project.hasLottie && project.lottieFile 
            ? '' 
            : (() => {
                const isThumbnailVideo = project.thumbnail.endsWith('.mp4') || project.thumbnail.endsWith('.mov') || project.thumbnail.endsWith('.webm');
                const isFirstImageVideo = project.images[0] && (project.images[0].endsWith('.mp4') || project.images[0].endsWith('.mov') || project.images[0].endsWith('.webm'));
                if (project.slug === 'cohesity-rebrand' && (project.heroSlidesImages?.length ?? 0) > 0) return 'aspect-video min-h-[320px]';
                return (isThumbnailVideo || isFirstImageVideo) ? '' : 'aspect-video';
              })()
        }`}
        style={
          project.hasLottie && project.lottieFile 
            ? { padding: '3rem 1rem', minHeight: '500px' } 
            : (() => {
                const isThumbnailVideo = project.thumbnail.endsWith('.mp4') || project.thumbnail.endsWith('.mov') || project.thumbnail.endsWith('.webm');
                const isFirstImageVideo = project.images[0] && (project.images[0].endsWith('.mp4') || project.images[0].endsWith('.mov') || project.images[0].endsWith('.webm'));
                if (project.slug === 'cohesity-rebrand' && (project.heroSlidesImages?.length ?? 0) > 0) {
                  return { minHeight: '400px' };
                }
                return (isThumbnailVideo || isFirstImageVideo) ? { padding: '2rem 1rem', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' } : {};
              })()
        }
      >
        {project.hasLottie && project.lottieFile ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
              <LottiePlayer 
                src={project.lottieFile} 
                className="w-full"
              />
            </div>
          </div>
        ) : (() => {
          // Cohesity Rebrand: hero — push transitions (next from right, current exits left) + group pacing
          if (project.slug === 'cohesity-rebrand' && heroSlidesImages.length > 0) {
            const len = heroSlidesImages.length;
            const safeIndex = Math.max(0, Math.min(heroSlidesIndex, len - 1));
            const currentImage = heroSlidesImages[safeIndex];
            const i = safeIndex;
            const isAccentSlide = (i % 3) === 0; // group pacing: every 3rd slide = accent (longer hold, slightly longer transition)
            const dir = i % 4;
            const pushVariants = [
              { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
              { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '100%' } },
              { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '-100%' } },
              { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '100%' } },
            ];
            const push = pushVariants[dir];
            const isFirstSlideOnLoad = !heroHasTransitionedRef.current && i === 0;
            const initial = isFirstSlideOnLoad ? { x: 0, y: 0 } : push.initial;
            // Easing by quadrant (2–5% during hold); accent slightly more
            // Easing variety: 3 curves for normal; one “hero” ease for accent
            const easings = [
              [0.25, 0.46, 0.45, 0.94],
              [0.33, 1, 0.68, 1],
              [0.4, 0, 0.2, 1],
            ] as const;
            const heroEase = [0.33, 1, 0.68, 1] as const;
            const ease = isAccentSlide ? heroEase : easings[i % 3];
            const transitionDuration = isAccentSlide ? 0.55 : 0.45;
            // Overlapping push: both slides opaque; exiting on top so it cleanly reveals the next
            const initialVariant = { ...initial, opacity: 1, zIndex: 0 };
            const animateVariant = { ...push.animate, opacity: 1, zIndex: 0 };
            const exitVariant = { ...push.exit, opacity: 1, zIndex: 1 };
            return (
              <div className="relative w-full h-full min-h-[400px] aspect-video overflow-hidden isolate bg-ink-light">
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={`${currentImage}-${i}`}
                    initial={initialVariant}
                    animate={animateVariant}
                    exit={exitVariant}
                    transition={{
                      duration: transitionDuration,
                      ease,
                    }}
                    className="absolute inset-0 min-w-full min-h-full w-full h-full bg-ink-light"
                    style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
                  >
                    <Image
                      src={currentImage}
                      alt={`${project.title} — Presentation slide ${i + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          }

          // For AWS and Nasdaq projects, use the first image if it's a video (larger hero video)
          if ((project.slug === 'aws-reinvent-ooh-2024' || project.slug === 'nasdaq-tower-animation-2019') && project.images[0]) {
            const firstImage = project.images[0];
            const isVideo = firstImage.endsWith('.mp4') || firstImage.endsWith('.mov') || firstImage.endsWith('.webm');
            if (isVideo) {
              return (
                <video
                  src={firstImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full max-w-full max-h-[80vh] object-contain"
                />
              );
            }
          }
          
          // Check if thumbnail is a video (for other projects)
          const isThumbnailVideo = project.thumbnail.endsWith('.mp4') || project.thumbnail.endsWith('.mov') || project.thumbnail.endsWith('.webm');
          if (isThumbnailVideo) {
            return (
              <video
                src={project.thumbnail}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full max-w-full max-h-[80vh] object-contain"
              />
            );
          }
          
          return (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          );
        })()}
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
              <h3 className="font-body text-xs font-medium tracking-widest uppercase text-yellow mb-3">Role</h3>
              <p className="font-body text-sm md:text-base leading-relaxed text-cream/80">{project.role}</p>
            </div>
            
            <div>
              <h3 className="font-body text-xs font-medium tracking-widest uppercase text-yellow mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs text-cream/60 border border-cream/25 px-2 py-1"
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
          className="lg:col-span-2 space-y-6"
        >
          {project.goal && (
            <section>
              <h2 className="font-body font-semibold text-xl md:text-2xl mb-2">Campaign Goal</h2>
              <p className="text-sm md:text-base leading-relaxed text-cream/70">{project.goal}</p>
            </section>
          )}

          <section>
            <h2 className="font-body font-semibold text-xl md:text-2xl mb-2">Challenge</h2>
            <p className="text-sm md:text-base leading-relaxed text-cream/70">{project.challenge}</p>
          </section>

          <section>
            <h2 className="font-body font-semibold text-xl md:text-2xl mb-2">Approach</h2>
            <p className="text-sm md:text-base leading-relaxed text-cream/70">{project.approach}</p>
          </section>

          <section>
            <h2 className="font-body font-semibold text-xl md:text-2xl mb-2">Outcome</h2>
            <p className="text-sm md:text-base leading-relaxed text-cream/70">{project.outcome}</p>
          </section>

          {project.reflection && (
            <section>
              <h2 className="font-body font-semibold text-xl md:text-2xl mb-2">Reflection</h2>
              <p className="text-sm md:text-base leading-relaxed text-cream/70">{project.reflection}</p>
            </section>
          )}
        </motion.div>
      </div>

      {/* Landing Pages - Resilience Everywhere */}
      {project.slug === 'resilience-everywhere-2025' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-20 border-t border-cream/10"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">Landing Pages</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-8 max-w-3xl">
            Designed multiple landing pages for different audience segments, each with tailored messaging while maintaining visual consistency through the campaign style guide. The pages were optimized to ensure the right message reached IT leaders, security professionals, and enterprise decision-makers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.images
              .filter((image) => image.toLowerCase().includes('lp-cyber-resilience'))
              .sort((a, b) => {
                // Sort by number
                const aMatch = a.match(/lp-cyber-resilience-(\d+)/i);
                const bMatch = b.match(/lp-cyber-resilience-(\d+)/i);
                if (aMatch && bMatch) {
                  return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                }
                return a.localeCompare(b);
              })
              .map((image, i) => {
                const pageNumber = image.match(/lp-cyber-resilience-(\d+)/i)?.[1] || (i + 1).toString();
                const audienceLabels = ['IT Leaders', 'Security Professionals', 'Enterprise Executives'];
                const audienceLabel = audienceLabels[i] || `Audience ${pageNumber}`;
                
                return (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-body font-semibold text-lg mb-2">Landing Page {pageNumber} — {audienceLabel}</h3>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setImageModalSrc(image);
                        setImageModalAlt(`Landing Page ${pageNumber} - ${audienceLabel}`);
                      }}
                      className="group relative w-full bg-ink-light rounded-sm border border-cream/20 overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="aspect-[9/16] md:aspect-[9/16] relative">
                        <Image
                          src={image}
                          alt={`Landing Page ${pageNumber} - ${audienceLabel}`}
                          fill
                          className="object-contain transition-opacity duration-300 group-hover:opacity-90"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-yellow/90 flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
          </div>
        </motion.section>
      )}

      {/* OOH Design Concepts - AWS re:Invent */}
      {project.slug === 'aws-reinvent-ooh-2024' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-20 border-t border-cream/10"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">OOH Design Concepts</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-8 max-w-3xl">
            Two distinct design directions developed for the out-of-home campaign, testing visual hierarchy, messaging clarity, and impact at scale. Each concept was evaluated for visibility in high-traffic Las Vegas environments while maintaining strong brand consistency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images
              .filter((image) => image.toLowerCase().includes('ooh-opt'))
              .sort((a, b) => {
                // Sort by option number
                const aMatch = a.match(/ooh-opt(\d+)/i);
                const bMatch = b.match(/ooh-opt(\d+)/i);
                if (aMatch && bMatch) {
                  return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                }
                return a.localeCompare(b);
              })
              .map((image, i) => {
                const optionNumber = image.match(/ooh-opt(\d+)/i)?.[1] || (i + 1).toString();
                return (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20">
                      <Image
                        src={image}
                        alt={`OOH Design Concept ${optionNumber}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-lg">Design option {optionNumber}</h3>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.section>
      )}

      {/* Booth Design Concepts - AWS re:Invent */}
      {project.slug === 'aws-reinvent-ooh-2024' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-20 border-t border-cream/10"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">Booth Design Concepts</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-8 max-w-3xl">
            Three booth design concepts explored different approaches to spatial layout, visual hierarchy, and attendee flow. Each concept was evaluated for visibility, engagement, and how well it connected to the outdoor OOH campaign.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.images
              .filter((image) => image.toLowerCase().includes('booth-opt'))
              .sort((a, b) => {
                // Sort by option number
                const aMatch = a.match(/booth-opt(\d+)/i);
                const bMatch = b.match(/booth-opt(\d+)/i);
                if (aMatch && bMatch) {
                  return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                }
                return a.localeCompare(b);
              })
              .map((image, i) => {
                const optionNumber = image.match(/booth-opt(\d+)/i)?.[1] || (i + 1).toString();
                return (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20">
                      <Image
                        src={image}
                        alt={`Booth Design Concept ${optionNumber}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-lg">Design option {optionNumber}</h3>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.section>
      )}

      {/* Booth Animations - AWS re:Invent */}
      {project.slug === 'aws-reinvent-ooh-2024' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-20 border-t border-cream/10"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">Booth Animations</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-8 max-w-3xl">
            Animated content created for hanging LED cubes and the booth media wall. I storyboarded the animations and designed all graphics, collaborating with an agency partner on production to create dynamic, engaging motion that brought the booth environment to life.
          </p>
          
          {/* Storyboard with Play Button */}
          <div className="mb-8">
            <h3 className="font-body font-semibold text-lg md:text-xl mb-4">LED Media Wall Storyboard</h3>
            <motion.button
              type="button"
              onClick={() => setLocalVideoSrc('/images/AWS-reInvent/COHESITY_MEDIA_WALL_1920x1080.mp4')}
              className="group relative block w-full max-w-4xl mx-auto aspect-video bg-ink-light overflow-hidden rounded-sm border border-cream/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/AWS-reInvent/LED-storyborard.png"
                alt="LED Media Wall Storyboard"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                <div className="w-20 h-20 rounded-full bg-yellow/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-ink ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Cube Animation Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-body font-semibold text-lg md:text-xl mb-4">LED Cubes Animation</h3>
              <div className="relative aspect-video bg-ink-light overflow-hidden rounded-sm border border-cream/20">
                <video
                  src="/images/AWS-reInvent/Cohesity-LED-cubes.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <h3 className="font-body font-semibold text-lg md:text-xl mb-4">Cubes Mockup</h3>
              <div className="relative aspect-video bg-ink-light overflow-hidden rounded-sm border border-cream/20">
                <video
                  src="/images/AWS-reInvent/MOCK_ALL_v2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <LocalVideoModal
            isOpen={!!localVideoSrc}
            onClose={() => setLocalVideoSrc(null)}
            videoSrc={localVideoSrc || ''}
          />
        </motion.section>
      )}

      {/* Project Images Gallery */}
      {project.images.length > 1 && project.slug !== 'nasdaq-tower-animation-2019' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.slug === 'resilience-everywhere-2025' && (
              <div key="imac-mockup" className="md:col-span-2">
                <h3 className="text-lg md:text-xl font-semibold font-body mb-3">Motion / Lottie Animation</h3>
                <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
                  Designed and integrated motion for landing pages using Lottie animations to reinforce key ideas and add clarity and emphasis without distraction.
                </p>
                <div>
                  <LaptopVideoMockup
                    laptopImage="/images/Resilience-campaign/iMac-mock.jpg"
                    videoSrc="/images/Resilience-campaign/hero-animation_1.mp4"
                    videoAlt="Resilience Everywhere 2025 hero animation"
                  />
                </div>
                <div className="mt-6 md:mt-8">
                  <h4 className="text-base md:text-lg font-semibold font-body mb-2 text-cream/80">Animation Storyboard</h4>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {project.images
                      .filter((image) => image.toLowerCase().includes('hero-animation-frame'))
                      .sort((a, b) => {
                        // Sort by frame number
                        const aMatch = a.match(/frame\s*(\d+)/i);
                        const bMatch = b.match(/frame\s*(\d+)/i);
                        if (aMatch && bMatch) {
                          return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                        }
                        return a.localeCompare(b);
                      })
                      .map((image, i) => {
                        const frameMatch = image.match(/frame\s*(\d+)/i);
                        const frameNumber = frameMatch ? frameMatch[1] : (i + 1).toString();
                        return (
                          <motion.div
                            key={image}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="relative aspect-square bg-ink-light rounded-sm border border-cream/20 overflow-hidden"
                          >
                            <Image
                              src={image}
                              alt={`Animation Frame ${frameNumber}`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 50vw, 16vw"
                            />
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
            {project.slug === 'resilience-everywhere-2025' && (
              <div key="social-assets" className="md:col-span-2 mt-8">
                <h3 className="text-xl md:text-2xl font-semibold font-body mb-6">Social and Video Assets</h3>
                <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
                  Designed social and digital assets in collaboration with a copywriter. Provided visual direction and design for the campaign, while video production was handled by an agency partner. Ensured consistency across formats and platforms.
                </p>
                <h4 className="text-lg md:text-xl font-semibold font-body mb-4">5 Best Practices Social Video</h4>
                <div className="relative w-full max-w-4xl mx-auto aspect-video bg-ink-light rounded-sm border border-cream/20 overflow-hidden mb-8">
                  <video
                    src="/images/Resilience-campaign/5-best-practices-social-1200x627.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-lg md:text-xl font-semibold font-body mb-4">5 Best Practices Carousel</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {project.images
                    .filter((image) => {
                      const lowerImage = image.toLowerCase();
                      return lowerImage.includes('5-best-practices-carousel-slide') && lowerImage.endsWith('.png');
                    })
                    .sort((a, b) => {
                      // Sort by slide number
                      const aMatch = a.match(/slide-(\d+)/i);
                      const bMatch = b.match(/slide-(\d+)/i);
                      if (aMatch && bMatch) {
                        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                      }
                      return a.localeCompare(b);
                    })
                    .map((image, i) => {
                      return (
                        <motion.div
                          key={image}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="relative aspect-square bg-ink-light rounded-sm border border-cream/20 overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`5 Best Practices Carousel Slide ${i + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 20vw"
                          />
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            )}
            {project.slug === 'incident-response-simulator' && (() => {
              const base = '/images/incident-response-simulator';
              const desktopImages = [`${base}/MacBook-1.png`, `${base}/MacBook-3.png`, `${base}/MacBookWF2.png`, `${base}/iMac-incident.png`];
              const mobileImages = [`${base}/iPhone-1.png`, `${base}/iPhone-2.png`, `${base}/iPhone-3.png`, `${base}/iPhone-4.png`];
              const wireframeImages = [`${base}/WF-StartScreen.png`, `${base}/WF-IncidentCommandTabView.png`, `${base}/WF-IncidentReport-PostGame.png`, `${base}/WF-MobileView-1.png`, `${base}/WF-MobileView-2.png`];
              const renderImageGrid = (images: string[], sectionKey: string, altPrefix: string) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((image, i) => (
                    <motion.div
                      key={image}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20 group cursor-pointer"
                      onClick={() => { setImageModalSrc(image); setImageModalAlt(`${project.title} - ${altPrefix} ${i + 1}`); }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setImageModalSrc(image); setImageModalAlt(`${project.title} - ${altPrefix} ${i + 1}`); } }}
                    >
                      <Image src={image} alt={`${altPrefix} ${i + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                    </motion.div>
                  ))}
                </div>
              );
              return (
                <div key="incident-response-simulator" className="md:col-span-2 space-y-12">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold font-body mb-3">Start Screen</h3>
                    <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-4 max-w-3xl">
                      Gamified entry point: players step into the simulator and put their incident response skills to the test under pressure.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -4 }}
                      className="relative aspect-video max-w-4xl bg-ink-light rounded-sm border border-cream/20 overflow-hidden group cursor-pointer"
                      onClick={() => { setImageModalSrc(`${base}/laptop-simulator-2.jpg`); setImageModalAlt(`${project.title} - Start Screen`); }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setImageModalSrc(`${base}/laptop-simulator-2.jpg`); setImageModalAlt(`${project.title} - Start Screen`); } }}
                    >
                      <Image src={`${base}/laptop-simulator-2.jpg`} alt="Start Screen" fill className="object-contain transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 896px" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold font-body mb-3">Desktop Simulator</h3>
                    <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-4 max-w-3xl">
                      Immersive desktop experience for event kiosks and cohesity.com: multi-stage gameplay from Identify through Recover and Lessons Learned.
                    </p>
                    {renderImageGrid(desktopImages, 'desktop', 'Desktop')}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold font-body mb-3">Mobile Simulator</h3>
                    <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-4 max-w-3xl">
                      Dedicated mobile UI designed for smaller screens and touch—same flow, optimized for on-the-go use.
                    </p>
                    {renderImageGrid(mobileImages, 'mobile', 'Mobile')}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold font-body mb-3">Wireframes</h3>
                    <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-4 max-w-3xl">
                      UX and structure: start screen, incident command tab view, post-game report, and mobile views.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                      {wireframeImages.map((image, i) => {
                        const isMobileView = image.toLowerCase().includes('mobileview');
                        return (
                          <motion.div
                            key={image}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            whileHover={{ y: -2 }}
                            className={`relative overflow-hidden rounded-sm border border-cream/20 group cursor-pointer bg-ink-light flex items-center justify-center ${isMobileView ? 'aspect-[3/4] p-2 ring-1 ring-cream/10' : 'aspect-[3/2]'}`}
                            onClick={() => { setImageModalSrc(image); setImageModalAlt(`${project.title} - Wireframe ${i + 1}`); }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setImageModalSrc(image); setImageModalAlt(`${project.title} - Wireframe ${i + 1}`); } }}
                          >
                            <Image
                              src={image}
                              alt={`Wireframe ${i + 1}`}
                              fill
                              className={`transition-transform duration-300 group-hover:scale-105 ${isMobileView ? 'object-contain' : 'object-cover'}`}
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
            {project.images.slice(1).filter((image, index) => {
              // Skip the first image if it's a video (already shown in hero for AWS project)
              if (project.slug === 'aws-reinvent-ooh-2024' && index === 0 && project.images[0] && project.images[0].endsWith('.mp4')) {
                return false;
              }
              
              // Skip thumbnail if it's a video and appears in gallery (already shown in hero)
              if (image === project.thumbnail && (image.endsWith('.mp4') || image.endsWith('.mov') || image.endsWith('.webm'))) {
                return false;
              }

              // AWS: OOH, Booth design concepts, and animation files live in dedicated sections; skip in main grid
              if (project.slug === 'aws-reinvent-ooh-2024' && (
                image.toLowerCase().includes('ooh-opt') || 
                image.toLowerCase().includes('booth-opt') ||
                image.toLowerCase().includes('led-storyborard') ||
                image.toLowerCase().includes('led-cubes') ||
                image.toLowerCase().includes('mock_all') ||
                image.toLowerCase().includes('media_wall')
              )) {
                return false;
              }

              // Resilience: iPhone banners + YT thumb live in Social Assets section; skip in main grid
              if (project.slug === 'resilience-everywhere-2025' && IPHONE_BANNER_IMAGES.includes(image)) return false;
              
              // Resilience: Landing pages live in dedicated section; skip in main grid
              if (project.slug === 'resilience-everywhere-2025' && image.toLowerCase().includes('lp-cyber-resilience')) return false;
              
              // Resilience: 5-best-practices social assets live in dedicated section; skip in main grid
              if (project.slug === 'resilience-everywhere-2025' && (
                image.toLowerCase().includes('5-best-practices-social') ||
                image.toLowerCase().includes('5-best-practices-carousel')
              )) return false;
              
              // Resilience: hero-animation-frame images live in storyboard section; skip in main grid
              if (project.slug === 'resilience-everywhere-2025' && image.toLowerCase().includes('hero-animation-frame')) return false;

              // Incident Response Simulator: all images live in dedicated sections below; skip in main grid
              if (project.slug === 'incident-response-simulator') return false;

              // Cohesity: Color palette (except Color-Palette.png), Event-Demo, CS-, 3D graphics, brand elements, brand exploration, and typography images live in dedicated sections; skip in main grid
              if (project.slug === 'cohesity-rebrand' && (
                (COHESITY_COLOR_PALETTE_IMAGES.includes(image) && !image.toLowerCase().includes('color-palette.png')) || 
                (image.toLowerCase().includes('color') && !image.toLowerCase().includes('color-palette.png')) || 
                (image.toLowerCase().includes('palette') && !image.toLowerCase().includes('color-palette.png')) ||
                image.toLowerCase().includes('event-demo') ||
                image.toLowerCase().includes('/cs-') ||
                image.toLowerCase().includes('3d-graphic') ||
                image.toLowerCase().includes('3d-object-animation') ||
                image.toLowerCase().includes('brand-elements') ||
                image.toLowerCase().includes('brand-exploration') ||
                image.toLowerCase().includes('font-stress')
              )) return false;

              return true;
            }).map((image, index) => {
              const isVideo = image.endsWith('.mp4') || image.endsWith('.mov') || image.endsWith('.webm');
              const alt = `${project.title} - Image ${index + 2}`;

              return (
                <motion.div
                  key={`${image}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20 group ${!isVideo ? 'cursor-pointer' : ''}`}
                  onClick={!isVideo ? () => {
                    setImageModalSrc(image);
                    setImageModalAlt(alt);
                  } : undefined}
                  role={!isVideo ? 'button' : undefined}
                  tabIndex={!isVideo ? 0 : undefined}
                  onKeyDown={!isVideo ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setImageModalSrc(image);
                      setImageModalAlt(alt);
                    }
                  } : undefined}
                >
                  {isVideo ? (
                    <video
                      src={image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {project.slug === 'resilience-everywhere-2025' && (
            <>
              <div className="mt-12 md:mt-16">
                <h4 className="text-lg md:text-xl font-semibold font-body mb-4">Video and Social Assets</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.button
                  type="button"
                  onClick={() => setVideoModalId('dydQQj0N-M4')}
                  className="group relative block aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20 text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/images/Resilience-campaign/iPhone 15 Pro-left.jpg"
                    alt={`${project.title} - Social banner`}
                    fill
                    className="object-cover transition duration-300 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 rounded-full bg-yellow/90 flex items-center justify-center">
                      <svg className="w-6 h-6 text-ink ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setVideoModalId('OcgKjOiBRUo')}
                  className="group relative block aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20 text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/images/Resilience-campaign/iPad-right.jpg"
                    alt={`${project.title} - iPad`}
                    fill
                    className="object-cover transition duration-300 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 rounded-full bg-yellow/90 flex items-center justify-center">
                      <svg className="w-6 h-6 text-ink ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
                <div className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={iphoneBannerIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={IPHONE_BANNER_IMAGES[iphoneBannerIndex]}
                        alt={`${project.title} - Social banner ${iphoneBannerIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              </div>

              <VideoModal
                isOpen={!!videoModalId}
                onClose={() => setVideoModalId(null)}
                videoId={videoModalId || ''}
              />

              <h3 className="text-xl md:text-2xl font-semibold font-body mt-16 mb-6">Campaign photography style</h3>
              <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
                Defined and applied a consistent photography treatment for the campaign. While the initial style was developed by an agency, our team generated and sourced imagery and applied the same visual treatment across multiple portraits to ensure cohesion and scalability.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {RESILIENCE_PHOTO_IMAGES.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="relative aspect-square bg-ink-light overflow-hidden rounded-sm border border-cream/20"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} - Photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {project.slug === 'cohesity-rebrand' && (
            <>
              <h3 className="text-xl md:text-2xl font-semibold font-body mt-16 mb-6">Color Palette Exploration</h3>
              <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
                Led an extensive color palette exploration to ensure optimal color performance across both digital and print applications. The process involved thorough research and testing across RGB and CMYK color spaces, evaluating how colors translate between digital screens and physical print materials. Conducted comprehensive print testing to verify color accuracy, consistency, and vibrancy across various substrates and printing methods. Performed A/B testing to validate color choices against brand objectives, user perception, and accessibility standards. This rigorous approach ensured the final color system maintains visual integrity and brand impact whether viewed on screen or in print.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images
                  .filter((image) => 
                    (COHESITY_COLOR_PALETTE_IMAGES.includes(image) && !image.toLowerCase().includes('color-palette.png')) || 
                    (image.toLowerCase().includes('color') && !image.toLowerCase().includes('color-palette.png')) || 
                    (image.toLowerCase().includes('palette') && !image.toLowerCase().includes('color-palette.png')) ||
                    image.toLowerCase().includes('event-demo') ||
                    image.toLowerCase().includes('/cs-')
                  )
                  .sort((a, b) => {
                    // Sort order: Color-analogous, Color-complementary-split, Color-monochromatic first, then Color-Palette, then Event-Demo
                    const aLower = a.toLowerCase();
                    const bLower = b.toLowerCase();
                    
                    // First row: Color-analogous, Color-complementary-split, Color-monochromatic
                    const firstRow = ['color-analogous', 'color-complementary-split', 'color-monochromatic'];
                    const aFirstRow = firstRow.findIndex(name => aLower.includes(name));
                    const bFirstRow = firstRow.findIndex(name => bLower.includes(name));
                    
                    if (aFirstRow !== -1 && bFirstRow !== -1) return aFirstRow - bFirstRow;
                    if (aFirstRow !== -1) return -1;
                    if (bFirstRow !== -1) return 1;
                    
                    // Second: Color-Palette
                    if (aLower.includes('color-palette') && !bLower.includes('color-palette')) return -1;
                    if (bLower.includes('color-palette') && !aLower.includes('color-palette')) return 1;
                    
                    // Third: Event-Demo images (keep their original order)
                    const aEventDemo = aLower.includes('event-demo');
                    const bEventDemo = bLower.includes('event-demo');
                    if (aEventDemo && !bEventDemo && !bLower.includes('/cs-')) return -1;
                    if (bEventDemo && !aEventDemo && !aLower.includes('/cs-')) return 1;
                    
                    // Fourth: CS- images (keep their original order)
                    const aCS = aLower.includes('/cs-');
                    const bCS = bLower.includes('/cs-');
                    if (aCS && !bCS) return -1;
                    if (bCS && !aCS) return 1;
                    
                    return 0;
                  })
                  .map((image, i) => {
                    const isVideo = image.endsWith('.mp4') || image.endsWith('.mov') || image.endsWith('.webm');
                    return (
                      <motion.div
                        key={image}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20"
                      >
                        {isVideo ? (
                          <video
                            src={image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image
                            src={image}
                            alt={`${project.title} - Color palette ${i + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </motion.div>
                    );
                  })}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold font-body mt-16 mb-6">3D Graphics</h3>
              <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
                Developed a comprehensive 3D illustration system that brings depth and dimension to the Cohesity brand. These graphics serve as versatile visual elements across digital and print applications, enhancing the brand&apos;s modern aesthetic while maintaining clarity and impact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images
                  .filter((image) => 
                    image.toLowerCase().includes('3d-graphic') ||
                    image.toLowerCase().includes('3d-object-animation')
                  )
                  .sort((a, b) => {
                    // Sort 3d-object-animation first, then 3d-graphic images by number
                    const aIsAnimation = a.toLowerCase().includes('3d-object-animation');
                    const bIsAnimation = b.toLowerCase().includes('3d-object-animation');
                    if (aIsAnimation && !bIsAnimation) return -1;
                    if (!aIsAnimation && bIsAnimation) return 1;
                    
                    // Sort 3d-graphic images by number
                    const aMatch = a.match(/3d-graphic-(\d+)/);
                    const bMatch = b.match(/3d-graphic-(\d+)/);
                    if (aMatch && bMatch) {
                      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                    }
                    return a.localeCompare(b);
                  })
                  .map((image, i) => {
                    const isVideo = image.endsWith('.mp4') || image.endsWith('.mov') || image.endsWith('.webm');
                    return (
                      <motion.div
                        key={image}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20"
                      >
                        {isVideo ? (
                          <video
                            src={image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image
                            src={image}
                            alt={`${project.title} - 3D graphic ${i + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </motion.div>
                    );
                  })}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold font-body mt-16 mb-6">Typography & Brand Elements</h3>
              <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
                Refined the typography system with careful attention to font stress, weight variations, and character spacing, while developing a comprehensive set of brand elements that work cohesively across various applications, ensuring visual consistency and brand recognition.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images
                  .filter((image) => 
                    image.toLowerCase().includes('font-stress') ||
                    image.toLowerCase().includes('brand-elements')
                  )
                  .sort((a, b) => {
                    // Sort font-stress first, then brand-elements by number
                    const aIsFont = a.toLowerCase().includes('font-stress');
                    const bIsFont = b.toLowerCase().includes('font-stress');
                    if (aIsFont && !bIsFont) return -1;
                    if (!aIsFont && bIsFont) return 1;
                    
                    // Sort brand-elements images by number
                    const aMatch = a.match(/brand-elements-r2-(\d+)/i);
                    const bMatch = b.match(/brand-elements-r2-(\d+)/i);
                    if (aMatch && bMatch) {
                      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                    }
                    return a.localeCompare(b);
                  })
                  .map((image, i) => {
                    const isVideo = image.endsWith('.mp4') || image.endsWith('.mov') || image.endsWith('.webm');
                    return (
                      <motion.div
                        key={image}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20"
                      >
                        {isVideo ? (
                          <video
                            src={image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image
                            src={image}
                            alt={`${project.title} - ${image.toLowerCase().includes('font-stress') ? 'Typography' : 'Brand element'} ${i + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </motion.div>
                    );
                  })}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold font-body mt-16 mb-6">Brand Exploration</h3>
              <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
                Early exploration and concept development that informed the final brand direction, exploring various visual approaches and design directions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images
                  .filter((image) => 
                    image.toLowerCase().includes('brand-exploration')
                  )
                  .sort((a, b) => {
                    // Sort brand-exploration images by number
                    const aMatch = a.match(/brand-exploration-(\d+)/i);
                    const bMatch = b.match(/brand-exploration-(\d+)/i);
                    if (aMatch && bMatch) {
                      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                    }
                    return a.localeCompare(b);
                  })
                  .map((image, i) => {
                    const isVideo = image.endsWith('.mp4') || image.endsWith('.mov') || image.endsWith('.webm');
                    return (
                      <motion.div
                        key={image}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="relative aspect-[4/3] bg-ink-light overflow-hidden rounded-sm border border-cream/20"
                      >
                        {isVideo ? (
                          <video
                            src={image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image
                            src={image}
                            alt={`${project.title} - Brand exploration ${i + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </motion.div>
                    );
                  })}
              </div>
            </>
          )}
        </motion.section>
      )}

      {/* Related Projects - AWS re:Invent */}
      {project.slug === 'aws-reinvent-ooh-2024' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-20 border-t border-cream/10"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">Related Projects</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
            As part of the comprehensive AWS re:Invent campaign, I also designed the vehicle wraps that created mobile brand presence throughout Las Vegas.
          </p>
          {(() => {
            const carWrapProject = projects.find(p => p.slug === 'car-wrap-reinvent-2024');
            if (!carWrapProject) return null;
            
            return (
              <Link 
                href={`/work/${carWrapProject.slug}`}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden bg-ink-light rounded-sm border border-cream/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative aspect-[4/3] md:col-span-1">
                      <Image
                        src={carWrapProject.thumbnail}
                        alt={carWrapProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:col-span-2 flex flex-col justify-center">
                      <span className="font-body text-xs text-cream/40 uppercase tracking-widest mb-2">{carWrapProject.category}</span>
                      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-yellow transition-colors">
                        {carWrapProject.title}
                      </h3>
                      <p className="text-cream/60 text-sm line-clamp-2">
                        {carWrapProject.overview}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })()}
        </motion.section>
      )}

      {/* Related Projects - Car Wrap */}
      {project.slug === 'car-wrap-reinvent-2024' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-20 border-t border-cream/10"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">Related Projects</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
            The vehicle wraps were part of a larger comprehensive brand presence campaign for AWS re:Invent, which included out-of-home media, booth design, and animated content.
          </p>
          {(() => {
            const awsProject = projects.find(p => p.slug === 'aws-reinvent-ooh-2024');
            if (!awsProject) return null;
            
            return (
              <Link 
                href={`/work/${awsProject.slug}`}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden bg-ink-light rounded-sm border border-cream/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative aspect-[4/3] md:col-span-1">
                      <Image
                        src={awsProject.thumbnail}
                        alt={awsProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:col-span-2 flex flex-col justify-center">
                      <span className="font-body text-xs text-cream/40 uppercase tracking-widest mb-2">{awsProject.category}</span>
                      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-yellow transition-colors">
                        {awsProject.title}
                      </h3>
                      <p className="text-cream/60 text-sm line-clamp-2">
                        {awsProject.overview}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })()}
        </motion.section>
      )}

      {/* Related Projects - Brand Style Guide */}
      {project.slug === 'brand-style-guide' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 pt-20 border-t border-cream/10"
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-6">Related Projects</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-6 max-w-3xl">
            The visual identity and style guide established here were applied across Cohesity campaigns, including the comprehensive brand presence for AWS re:Invent.
          </p>
          {(() => {
            const awsProject = projects.find(p => p.slug === 'aws-reinvent-ooh-2024');
            if (!awsProject) return null;

            return (
              <Link
                href={`/work/${awsProject.slug}`}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden bg-ink-light rounded-sm border border-cream/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative aspect-[4/3] md:col-span-1">
                      <Image
                        src={awsProject.thumbnail}
                        alt={awsProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:col-span-2 flex flex-col justify-center">
                      <span className="font-body text-xs text-cream/40 uppercase tracking-widest mb-2">{awsProject.category}</span>
                      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-yellow transition-colors">
                        {awsProject.title}
                      </h3>
                      <p className="text-cream/60 text-sm line-clamp-2">
                        {awsProject.overview}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })()}
        </motion.section>
      )}

      {/* Image Modal - Global */}
      <ImageModal
        isOpen={!!imageModalSrc}
        onClose={() => {
          setImageModalSrc(null);
          setImageModalAlt('');
        }}
        imageSrc={imageModalSrc || ''}
        alt={imageModalAlt}
      />

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
            <span className="font-body text-xs text-cream/40 uppercase tracking-widest">Previous</span>
            <p className="font-body text-lg font-semibold group-hover:text-yellow transition-colors">
              ← {prevProject.title}
            </p>
          </Link>
        ) : <div />}
        
        {nextProject ? (
          <Link 
            href={`/work/${nextProject.slug}`}
            className="group text-right"
          >
            <span className="font-body text-xs text-cream/40 uppercase tracking-widest">Next</span>
            <p className="font-body text-lg font-semibold group-hover:text-yellow transition-colors">
              {nextProject.title} →
            </p>
          </Link>
        ) : <div />}
      </motion.nav>
    </article>
  );
}
