'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';

// Staggered text animation for headline
const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const imageRevealVariants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: (delay: number) => ({
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      delay,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Animated letter component
const AnimatedLetter = ({ char, index }: { char: string; index: number }) => (
  <motion.span
    custom={index}
    initial="hidden"
    animate="visible"
    variants={letterVariants}
    className="inline-block"
    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

// TZ Logo Component with roll-in and continuous rotation
const AnimatedTZLogo = () => {
  return (
    <motion.div
      className="w-[230px] h-[230px]"
      // Roll in from left: start completely off-screen
      initial={{ 
        x: '-100vw', 
        rotate: -720,
        opacity: 1,
      }}
      animate={{ 
        x: 0, 
        rotate: 0,
        opacity: 1,
      }}
      transition={{
        delay: 1.0,
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Inner container for continuous 360° rotation with pause */}
      <motion.div
        className="w-full h-full"
        animate={{
          rotate: [0, 0, 360, 360], // Pause → Rotate → Pause
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1], // Smooth acceleration/deceleration
          times: [0, 0.3, 0.7, 1], // 30% pause, 40% rotation, 30% pause
          delay: 2.5, // Start after roll-in completes
        }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
        >
          {/* Outer circle with tz letterform */}
          <path
            d="M200,3.66C91.56,3.66,3.66,91.56,3.66,200s87.9,196.34,196.34,196.34,196.34-87.9,196.34-196.34S308.44,3.66,200,3.66ZM336.99,312.85h-186.2c-37.57,0-59.29-25.05-59.29-64.71V62.34h36.74v50.1h168.66c25.05,0,38.41,10.44,38.41,26.72,0,8.77-1.67,16.29-6.26,21.71l-95.61,116.9h103.54v35.07Z"
            fill="black"
          />
          
          {/* Inner counter shape */}
          <path
            d="M200.06,147.51h-71.81v105.21c0,18.79,8.77,25.05,27.56,25.05h37.94c2.51-9.1,8.96-17.64,18.83-30.06l81.83-100.2h-94.35Z"
            fill="black"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const designText = "Design";
  const withText = "with";
  const purposeText = "PURPOSE";

  return (
    <>
      {/* Hero Section - Figma-matched layout */}
      <section className="min-h-screen w-full relative bg-[#FFE100]">
        {/* Desktop Layout Container - centered with max-width */}
        <div className="hidden lg:block relative w-full max-w-[1440px] mx-auto h-screen">
          
          {/* tonya-3.png - Background colorful image with special corners */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={imageRevealVariants}
            className="absolute"
            style={{
              left: '11.5%',
              top: '163px',
              width: '526px',
              height: '538px',
            }}
          >
            <div className="relative w-full h-full rounded-bl-[20px] rounded-tr-[20px] overflow-hidden">
              <Image
                src="/images/tonya-3.png"
                alt="Colorful background"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* tonya.png - Main portrait (z-10 to be on top of PURPOSE box) */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={imageRevealVariants}
            className="absolute z-10"
            style={{
              left: '18.75%',
              top: '116px',
              width: '507px',
              height: '585px',
            }}
          >
            <Image
              src="/images/tonya.png"
              alt="Tonya Zenin"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* TZ Logo - overlapping bottom-left of portrait */}
          <div
            className="absolute z-20"
            style={{
              left: '6.3%',
              top: '541px',
            }}
          >
            <AnimatedTZLogo />
          </div>

          {/* TONYA ZENIN label */}
          <motion.p
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="absolute text-black text-[16px] font-medium tracking-[0.96px] uppercase"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              left: '49.65%',
              top: '156px',
            }}
          >
            Tonya Zenin
          </motion.p>

          {/* Design with - Headline */}
          <div
            className="absolute text-black"
            style={{
              left: '48.8%',
              top: '197px',
              fontSize: '152px',
              lineHeight: '0.8',
            }}
          >
            {/* Design */}
            <div style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 900 }}>
              {designText.split('').map((char, i) => (
                <AnimatedLetter key={i} char={char} index={i} />
              ))}
            </div>
            
            {/* with */}
            <div 
              style={{ 
                fontFamily: "'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni MT', 'Didot', serif",
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              {withText.split('').map((char, i) => (
                <AnimatedLetter key={i} char={char} index={i + designText.length} />
              ))}
            </div>
          </div>

          {/* PURPOSE - Yellow text in black container with top clipped */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bg-black overflow-hidden z-0"
            style={{
              left: '48%',
              top: '456px',
              width: '611px',
              height: '113px',
              transformOrigin: 'left',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="text-[#FFE100] uppercase"
              style={{
                fontFamily: "'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni MT', 'Didot', serif",
                fontWeight: 700,
                fontSize: '140px',
                lineHeight: '1',
                marginTop: '-22px',
                paddingLeft: '10px',
              }}
            >
              {purposeText}
            </motion.div>
          </motion.div>

          {/* Description - White box (aligned right edge with PURPOSE box) */}
          <motion.div
            custom={1.6}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="absolute bg-white p-[20px] z-10"
            style={{
              left: '40.2%',
              top: '600px',
              width: '723px',
            }}
          >
            <p
              className="text-black text-[18px] leading-[1.6]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              I&apos;m a multi-disciplinary designer specializing in brand, digital, and campaign work, driven by bold ideas and a genuine passion for design. I create thoughtful, impactful solutions across every medium.
            </p>
          </motion.div>

          {/* CTA Buttons - positioned below description */}
          <motion.div
            custom={1.8}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="absolute flex gap-4"
            style={{
              left: '40.2%',
              top: '750px',
            }}
          >
            <Link 
              href="/work" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase bg-black text-[#FFE100] hover:bg-black/80 transition-colors"
            >
              View Work
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase border-2 border-black text-black hover:bg-black hover:text-[#FFE100] transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Tablet/Mobile Layout - simplified responsive version */}
        <div className="lg:hidden flex flex-col items-center justify-center min-h-screen px-6 py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-black text-sm font-medium tracking-[0.96px] uppercase mb-4"
          >
            Tonya Zenin
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-black text-center mb-8"
            style={{ fontSize: 'clamp(3rem, 12vw, 6rem)', lineHeight: 0.85 }}
          >
            <span style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 900, display: 'block' }}>Design</span>
            <span style={{ fontFamily: "'Bodoni 72', serif", fontStyle: 'italic', display: 'block' }}>with</span>
            <span style={{ fontFamily: "'Bodoni 72', serif", fontWeight: 700, display: 'block' }}>Purpose</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative w-full max-w-sm mb-8"
          >
            <Image
              src="/images/tonya.png"
              alt="Tonya Zenin"
              width={507}
              height={585}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white p-6 max-w-md mb-8"
          >
            <p className="text-black text-base leading-relaxed">
              I&apos;m a multi-disciplinary designer specializing in brand, digital, and campaign work, driven by bold ideas and a genuine passion for design. I create thoughtful, impactful solutions across every medium.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link 
              href="/work" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase bg-black text-[#FFE100]"
            >
              View Work
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase border-2 border-black text-black"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-black"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Work Section */}
      <section className="py-32 container-main bg-ink">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <p className="text-magenta font-medium tracking-widest uppercase mb-4">Selected Projects</p>
            <h2 className="heading-lg text-cream">Featured Work</h2>
          </div>
          <Link 
            href="/work" 
            className="mt-6 md:mt-0 text-cream/60 hover:text-yellow transition-colors duration-300 link-underline"
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
      <section className="py-32 container-main bg-blue">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="heading-lg mb-6 text-white">
            Let&apos;s create something <span className="text-yellow">bold</span> together.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-10">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase bg-yellow text-ink hover:bg-white transition-colors duration-300">
            Start a Conversation
          </Link>
        </motion.div>
      </section>
    </>
  );
}
