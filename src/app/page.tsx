'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import MagneticButton from '@/components/MagneticButton';
import MagneticWrapper from '@/components/MagneticWrapper';
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

// Reveal animation variants for PURPOSE black background
const purposeRevealVariants = {
  // OPTION 1: Slide in from left
  slideFromLeft: {
    hidden: { scaleX: 0, transformOrigin: 'left' },
    visible: { 
      scaleX: 1,
      transition: { delay: 1.0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  },
  // OPTION 2: Slide in from right
  slideFromRight: {
    hidden: { scaleX: 0, transformOrigin: 'right' },
    visible: { 
      scaleX: 1,
      transition: { delay: 1.0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  },
  // OPTION 3: Fade in
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 1.0, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  },
  // OPTION 4: Clip path reveal (wipe effect)
  clipReveal: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { 
      clipPath: 'inset(0 0% 0 0)',
      transition: { delay: 1.0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  },
  // OPTION 5: Scale from center
  scaleFromCenter: {
    hidden: { scale: 0, transformOrigin: 'center' },
    visible: { 
      scale: 1,
      transition: { delay: 1.0, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
    },
  },
};

// Choose your reveal animation style:
// 1: slideFromLeft, 2: slideFromRight, 3: fadeIn, 4: clipReveal, 5: scaleFromCenter
const PURPOSE_REVEAL_STYLE: number = 1; // Change this number to switch styles

const getPurposeRevealVariant = () => {
  switch (PURPOSE_REVEAL_STYLE) {
    case 1: return purposeRevealVariants.slideFromLeft;
    case 2: return purposeRevealVariants.slideFromRight;
    case 3: return purposeRevealVariants.fadeIn;
    case 4: return purposeRevealVariants.clipReveal;
    case 5: return purposeRevealVariants.scaleFromCenter;
    default: return purposeRevealVariants.slideFromLeft;
  }
};

// Bounce animation for PURPOSE letters - OPTION 1: Current (Bouncy)
const bounceLetterVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.3 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 1.4 + i * 0.08,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1], // Bouncy ease
    },
  }),
};

// OPTION 2: Punchy Scale & Rotate (More dramatic)
const punchyScaleRotateVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: (i: number) => ({
    opacity: 1,
    scale: [0, 1.3, 1],
    rotate: [-180, 10, 0],
    transition: {
      delay: 1.4 + i * 0.05,
      duration: 0.5,
      ease: [0.68, -0.55, 0.27, 1.55], // Strong bounce
    },
  }),
};

// OPTION 3: Slam Down (Aggressive impact)
const slamDownVariants = {
  hidden: { opacity: 0, y: -150, scale: 1.5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: [1.5, 0.9, 1],
    transition: {
      delay: 1.4 + i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// OPTION 4: Explosive Pop (Quick and snappy)
const explosivePopVariants = {
  hidden: { opacity: 0, scale: 0, rotate: 360 },
  visible: (i: number) => ({
    opacity: 1,
    scale: [0, 1.4, 1],
    rotate: [360, -10, 0],
    transition: {
      delay: 1.4 + i * 0.04,
      duration: 0.35,
      ease: [0.68, -0.6, 0.32, 1.6], // Sharp bounce
    },
  }),
};

// OPTION 5: Staggered Impact (Wave effect)
const staggeredImpactVariants = {
  hidden: { opacity: 0, y: 100, x: -50, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: [0.5, 1.2, 1],
    transition: {
      delay: 1.4 + i * 0.07,
      duration: 0.45,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

// OPTION 6: Quick Snap (Minimal but punchy)
const quickSnapVariants = {
  hidden: { opacity: 0, scale: 0.2, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 1.4 + i * 0.03,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.5], // Quick snap
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

// Diagonal split with scale and rotation - Background (top-left to bottom-right)
const diagonalSplitBackgroundVariants = {
  hidden: { 
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    scale: 0.9,
    rotate: -5,
    opacity: 0,
  },
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      clipPath: { duration: 0.8 },
      scale: { duration: 0.9 },
      rotate: { duration: 0.9 },
      opacity: { duration: 0.6 },
    },
  },
};

// Diagonal split with scale and rotation - Profile (bottom-right to top-left, opposite direction)
const diagonalSplitProfileVariants = {
  hidden: { 
    clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    scale: 0.9,
    rotate: 5,
    opacity: 0,
  },
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      clipPath: { duration: 0.8 },
      scale: { duration: 0.9 },
      rotate: { duration: 0.9 },
      opacity: { duration: 0.6 },
    },
  },
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

// Choose your animation style for PURPOSE:
// 1: bounceLetterVariants (Current - Bouncy)
// 2: punchyScaleRotateVariants (Scale & Rotate - More dramatic)
// 3: slamDownVariants (Slam Down - Aggressive impact)
// 4: explosivePopVariants (Explosive Pop - Quick and snappy)
// 5: staggeredImpactVariants (Staggered Impact - Wave effect)
// 6: quickSnapVariants (Quick Snap - Minimal but punchy)
const PURPOSE_ANIMATION_STYLE: number = 6; // Change this number to switch styles

const getPurposeVariants = () => {
  switch (PURPOSE_ANIMATION_STYLE) {
    case 1: return bounceLetterVariants;
    case 2: return punchyScaleRotateVariants;
    case 3: return slamDownVariants;
    case 4: return explosivePopVariants;
    case 5: return staggeredImpactVariants;
    case 6: return quickSnapVariants;
    default: return bounceLetterVariants;
  }
};

// Animated purpose letter component
const AnimatedPurposeLetter = ({ char, index }: { char: string; index: number }) => (
  <motion.span
    custom={index}
    initial="hidden"
    animate="visible"
    variants={getPurposeVariants()}
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
      className="w-[207px] h-[207px]"
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
            initial="hidden"
            animate="visible"
            variants={diagonalSplitBackgroundVariants}
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

          {/* tonya.png - Main portrait */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={diagonalSplitProfileVariants}
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

          {/* TZ Logo - locked position relative to profile photo */}
          {/* Original working position: calc(5.5% + 20px), 557px */}
          {/* Scales proportionally: 207px at 1440px container, scales down on smaller screens */}
          <div
            className="absolute z-20"
            style={{
              left: 'calc(5.5% + 20px)',
              top: '557px',
            }}
          >
            <div 
              className="w-[207px] h-[207px]"
              style={{
                transform: 'scale(min(1, calc(100vw / 1440)))',
              }}
            >
              <AnimatedTZLogo />
            </div>
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
              lineHeight: '0.75',
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

          {/* PURPOSE - Yellow text in black container with reveal animation */}
          {/* Text starts italic, changes to Bodoni when black shape animates */}
          <div
            className="absolute z-0"
            style={{
              left: '48%',
              top: '450px',
              width: '611px',
              height: '113px',
            }}
          >
            {/* PURPOSE text */}
            <div
              className="text-[#FFE100] uppercase absolute"
              style={{
                fontFamily: "'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni MT', 'Didot', serif",
                fontWeight: 700,
                fontSize: '140px',
                lineHeight: '1',
                marginTop: '-22px',
                paddingLeft: '10px',
                zIndex: 2,
              }}
            >
              {purposeText}
            </div>
            
            {/* Black background - animates in to reveal text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={getPurposeRevealVariant()}
              className="absolute bg-black overflow-hidden"
              style={{
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            />
          </div>

          {/* Description - White box (aligned right edge with PURPOSE box) */}
          <motion.div
            custom={1.6}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="absolute bg-white border border-black z-10"
            style={{
              left: '40.2%',
              top: '577px',
              width: '723px',
              padding: '24px',
              boxShadow: '12px 12px 0px 0px #000000',
            }}
          >
            <p
              className="text-black text-[18px] leading-[1.7] font-normal"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              I&apos;m a multidisciplinary brand designer specializing in brand, digital, motion, and campaign work. I create clear, thoughtful design that helps complex ideas feel human, intentional, and easy to connect with.
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
            <MagneticButton href="/work" variant="primary">
              View Work
            </MagneticButton>
            <MagneticButton href="/contact" variant="secondary">
              Get in Touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Tablet/Mobile Layout - matching Figma design exactly */}
        <div className="lg:hidden relative w-full min-h-screen bg-[#FFE100] overflow-hidden pb-20">
          {/* Container with proper padding */}
          <div className="relative w-full max-w-[390px] mx-auto" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            
            {/* TONYA ZENIN label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute text-black font-medium uppercase"
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.6px',
                left: '40px',
                top: '70px',
              }}
            >
              Tonya Zenin
            </motion.p>
            
            {/* Design with - Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute text-black"
              style={{ 
                left: '34px',
                top: '99px',
                fontSize: 'min(84.67px, 21.7vw)',
                lineHeight: 0.74,
              }}
            >
              {/* Design */}
              <div style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 900 }}>
                Design
              </div>
              
              {/* with */}
              <div 
                style={{ 
                  fontFamily: "'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni MT', 'Didot', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                with
              </div>
            </motion.div>

            {/* PURPOSE - black box */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute bg-black flex items-center"
              style={{
                transformOrigin: 'left',
                left: '27px',
                top: '235px',
                width: 'calc(100% - 16px)',
                maxWidth: '347px',
                height: '80px',
                padding: '3px 4px',
              }}
            >
              <div
                className="text-[#FFE100] uppercase"
                style={{
                  fontFamily: "'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni MT', 'Didot', serif",
                  fontWeight: 700,
                  fontSize: 'min(77.89px, 20vw)',
                  lineHeight: '1',
                }}
              >
                PURPOSE
              </div>
            </motion.div>

            {/* Background colorful image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute rounded-bl-[11px] rounded-tr-[11px] overflow-hidden"
              style={{
                left: '42px',
                top: '306px',
                width: '72%',
                maxWidth: '281px',
                height: '288px',
              }}
            >
              <Image
                src="/images/tonya-3.png"
                alt="Colorful background"
                fill
                className="object-cover"
                style={{ objectPosition: '-4.67% -34.03%', transform: 'scale(1.37)' }}
                priority
              />
            </motion.div>

            {/* Main portrait */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="absolute"
              style={{
                left: '96px',
                top: '288px',
                width: '72%',
                maxWidth: '281px',
                height: '325px',
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
            
            {/* TZ Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-20"
              style={{
                left: '12px',
                top: '528px',
                width: '94px',
                height: '94px',
              }}
            >
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
              >
                <path
                  d="M200,3.66C91.56,3.66,3.66,91.56,3.66,200s87.9,196.34,196.34,196.34,196.34-87.9,196.34-196.34S308.44,3.66,200,3.66ZM336.99,312.85h-186.2c-37.57,0-59.29-25.05-59.29-64.71V62.34h36.74v50.1h168.66c25.05,0,38.41,10.44,38.41,26.72,0,8.77-1.67,16.29-6.26,21.71l-95.61,116.9h103.54v35.07Z"
                  fill="black"
                />
                <path
                  d="M200.06,147.51h-71.81v105.21c0,18.79,8.77,25.05,27.56,25.05h37.94c2.51-9.1,8.96-17.64,18.83-30.06l81.83-100.2h-94.35Z"
                  fill="black"
                />
              </svg>
            </motion.div>

            {/* Shadow box */}
            <div 
              className="absolute bg-black"
              style={{
                left: '33px',
                top: '619px',
                width: 'calc(100% - 7px)',
                maxWidth: '350px',
                height: '100px',
              }}
            />

            {/* Description - White box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bg-white border border-black z-10"
              style={{
                left: '27px',
                top: '611px',
                width: 'calc(100% - 16px)',
                maxWidth: '347px',
                padding: '12px',
              }}
            >
              <p 
                className="text-black leading-[1.6] font-normal"
                style={{ 
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                }}
              >
                I&apos;m a multidisciplinary brand designer specializing in brand, digital, motion, and campaign work. I create clear, thoughtful design that helps complex ideas feel human, intentional, and easy to connect with.
              </p>
            </motion.div>

            {/* CTA Buttons - positioned below description box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="absolute z-10 flex flex-col gap-3"
              style={{
                left: '27px',
                right: '27px',
                top: '720px',
              }}
            >
              <div className="w-full flex justify-center">
                <MagneticButton href="/work" variant="primary">
                  View Work
                </MagneticButton>
              </div>
              <div className="w-full flex justify-center mb-16">
                <MagneticButton href="/contact" variant="secondary">
                  Get in Touch
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile to avoid overlap with buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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
      <section className="py-16 md:py-24 lg:py-32 container-main bg-ink">
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
      <section className="py-16 md:py-24 lg:py-32 container-main bg-blue">
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
          <MagneticWrapper>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase bg-yellow text-ink hover:bg-white transition-colors duration-300">
              Start a Conversation
            </Link>
          </MagneticWrapper>
        </motion.div>
      </section>
    </>
  );
}
