'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Project, projects } from '@/data/projects';
import LaptopVideoMockup from './LaptopVideoMockup';
import VideoModal from './VideoModal';

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
  const [videoModalId, setVideoModalId] = useState<string | null>(null);

  useEffect(() => {
    if (project.slug !== 'resilience-everywhere-2025') return;
    const id = setInterval(() => {
      setIphoneBannerIndex((i) => (i + 1) % 3);
    }, 2500);
    return () => clearInterval(id);
  }, [project.slug]);

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
        ) : (() => {
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
                  className="w-full h-full object-cover"
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
                className="w-full h-full object-cover"
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
                <h3 className="text-lg md:text-xl font-semibold font-body mb-3">Landing page Lottie animation</h3>
                <LaptopVideoMockup
                  laptopImage="/images/Resilience-campaign/iMac-mock.jpg"
                  videoSrc="/images/Resilience-campaign/hero-animation_1.mp4"
                  videoAlt="Resilience Everywhere 2025 hero animation"
                />
              </div>
            )}
            {project.images.slice(1).map((image, index) => {
              const isVideo = image.endsWith('.mp4') || image.endsWith('.mov') || image.endsWith('.webm');
              
              // Skip the first image if it's a video (already shown in hero for AWS project)
              if (project.slug === 'aws-reinvent-ooh-2024' && index === 0 && project.images[0] && project.images[0].endsWith('.mp4')) {
                return null;
              }

              // Resilience: iPhone banners + YT thumb live in Social Assets section; skip in main grid
              if (project.slug === 'resilience-everywhere-2025' && IPHONE_BANNER_IMAGES.includes(image)) return null;

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
              )) return null;

              return (
                <div key={index} className="relative aspect-[4/3] bg-ink-light overflow-hidden">
                  {isVideo ? (
                    <video
                      src={image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {project.slug === 'resilience-everywhere-2025' && (
            <>
              <h3 className="text-xl md:text-2xl font-semibold font-body mt-8 mb-6">Social and Video Assets</h3>
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

              <VideoModal
                isOpen={!!videoModalId}
                onClose={() => setVideoModalId(null)}
                videoId={videoModalId || ''}
              />

              <h3 className="text-xl md:text-2xl font-semibold font-body mt-16 mb-6">Campaign photography style</h3>
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
                Developed a comprehensive 3D illustration system that brings depth and dimension to the Cohesity brand. These graphics serve as versatile visual elements across digital and print applications, enhancing the brand's modern aesthetic while maintaining clarity and impact.
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
