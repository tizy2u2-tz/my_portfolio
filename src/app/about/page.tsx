'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Resume from '@/components/Resume';
import MagneticWrapper from '@/components/MagneticWrapper';
import { useContainerSize } from '@/hooks/useContainerSize';

export default function AboutPage() {
  // Base design size: 800px width, 1000px height (4:5 aspect ratio)
  const BASE_WIDTH = 800;
  const BASE_HEIGHT = 1000;

  // Base positions in pixels (at base design size)
  const YELLOW_RECT = {
    width: 560, // 70% of 800
    height: 660, // 70% of 1000 - 40px
    top: 120, // 12% of 1000
  };

  // Wings image - full container size to prevent clipping
  const WINGS = {
    width: 800, // Full width of container
    height: 1000, // Full height of container
    top: 0,
    left: 0,
  };

  const [containerRef, containerSize] = useContainerSize();
  const scaleFactor = containerSize.width > 0 ? containerSize.width / BASE_WIDTH : 1;
  return (
    <section className="pt-28 pb-16 container-main">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-yellow font-medium tracking-widest uppercase mb-4">About</p>
          <h1 className="heading-lg mb-8 text-yellow">
            Hey, I&apos;m Tonya.
          </h1>
          
          {/* Bio - casual, human tone */}
          <div className="space-y-6 body-md">
            <p>
              I&apos;m a senior brand designer and art director who loves creating work that looks great and functions beautifully. 
              My favorite areas are brand identity, digital experiences, and motion design, anywhere I can blend bold visuals with smart strategy.
            </p>
            <p>
              I&apos;ve spent years designing for enterprise tech companies, shaping brands and campaigns that need to communicate complex ideas with confidence and personality. 
              I enjoy leading creative direction, bringing structure to ambiguity, and guiding ideas from early concept through final execution so the work feels intentional, clear, and human.
            </p>
            <p>
              These days, the way I work feels much more fluid and natural, and I&apos;m able to move more freely between design and build. I enjoy experimenting with AI tools and learning new ways to work with them, which has made my process more efficient and exploratory. It&apos;s an exciting time to be a designer.
            </p>
            <p>
              I stay curious and keep learning. When I&apos;m not designing, you&apos;ll usually find me painting outdoors with oils.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div 
            ref={containerRef}
            className="relative aspect-[4/5] bg-ink"
            style={{ overflow: 'visible' }}
          >
            {/* Yellow rectangle background - animates in first */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <div 
                className="absolute bg-yellow"
                style={{
                  width: `${YELLOW_RECT.width * scaleFactor}px`,
                  height: `${YELLOW_RECT.height * scaleFactor}px`,
                  top: `${(YELLOW_RECT.top + 4 + 70) * scaleFactor}px`,
                  left: '50%',
                  transform: `translateX(calc(-50% - ${20 * scaleFactor}px))`,
                }}
              />
            </motion.div>
            
            {/* Tonya with Wings - animates in second with dynamic effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30, rotate: -5 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: 0,
              }}
              transition={{ 
                delay: 0.5, 
                duration: 1.2, 
                ease: [0.34, 1.56, 0.64, 1],
                scale: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
              className="absolute z-10"
              style={{
                width: `${WINGS.width * scaleFactor}px`,
                height: `${WINGS.height * scaleFactor}px`,
                top: `${(WINGS.top + 5 + 70 + 40 - 4 - 2 - 2) * scaleFactor}px`,
                left: `${WINGS.left * scaleFactor}px`,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/tonya-wings.png"
                  alt="Tonya with Wings"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* What I Do */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24 lg:mb-32"
      >
        <h2 className="heading-md mb-12">What I Do</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Brand & Identity',
              description: 'Visual systems that tell your story—from logos to complete brand guidelines that scale.',
              icon: '◆',
            },
            {
              title: 'Digital Design',
              description: 'Websites, apps, and digital experiences that look beautiful and actually work.',
              icon: '◇',
            },
            {
              title: 'Motion & Animation',
              description: 'Bringing static designs to life with purposeful animation that engages and delights.',
              icon: '○',
            },
          ].map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-8 border border-cream/25 transition-colors duration-300 ${index % 2 === 0 ? 'hover:border-yellow/50' : 'hover:border-blue/50'}`}
            >
              <span className={`text-3xl mb-4 block ${index % 2 === 0 ? 'text-yellow' : 'text-blue'}`}>{skill.icon}</span>
              <h3 className="text-xl font-display font-semibold mb-3">{skill.title}</h3>
              <p className="text-cream/60">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Resume Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24 lg:mb-32"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="heading-md">Experience</h2>
          </div>
          <MagneticWrapper>
            <Link 
              href="/TonyaZenin-resume.pdf" 
              target="_blank"
              className="mt-4 md:mt-0 btn-outline inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Resume (PDF)
            </Link>
          </MagneticWrapper>
        </div>
        
        <Resume />
      </motion.div>

      {/* Connect & A Few More Things */}
      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="bg-blue p-6 md:p-12">
          <h2 className="heading-md mb-8 text-white">Connect</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'LinkedIn', url: 'https://linkedin.com/in/tonyazenin' },
              { name: 'Midjourney', url: 'https://www.midjourney.com/@tzee' },
              { name: 'Instagram', url: 'https://instagram.com/tonyazenin' },
              { name: 'Fine Art', url: 'https://www.tonyazenin.com/' },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-yellow text-yellow bg-transparent px-6 py-3 font-medium transition-all duration-300 rounded-sm hover:bg-yellow hover:text-ink"
                whileHover={{ y: -2, scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Fun Facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-yellow p-6 md:p-12">
          <h2 className="heading-md mb-8 text-ink">A Few More Things</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Coffee order', value: 'matcha latte' },
              { label: 'Current obsession', value: ['AI experiments', 'vibe coding'] as const },
              { label: 'Design tool', value: 'Figma forever' },
              { label: 'Hidden talent', value: 'plein air painting' },
            ].map((fact) => (
              <div key={fact.label} className="bg-cream border border-cream/40 text-ink text-center p-6 rounded-sm">
                <p className="text-xs uppercase tracking-widest opacity-60 mb-3">{fact.label}</p>
                {Array.isArray(fact.value) ? (
                  <div className="font-display font-semibold space-y-0.5">
                    {fact.value.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <p className="font-display font-semibold">{fact.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
