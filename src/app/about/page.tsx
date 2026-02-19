'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Resume from '@/components/Resume';
import MagneticWrapper from '@/components/MagneticWrapper';

const PROFILE_IMAGE = '/images/tonya-about.png';
const PROFILE_BG_IMAGE = '/images/about-bg.png';

export default function AboutPage() {
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
              I&apos;m a senior multidisciplinary brand designer and art director working across brand identity, digital experiences, campaigns, and motion design. I focus on creating work that is visually strong, clear, and purposeful.
            </p>
            <p>
              I&apos;ve spent years designing for technology companies, helping brands communicate complex ideas in ways that feel confident, human, and easy to understand. My work ranges from large campaign moments to the systems that keep brands consistent across web, motion, and other touchpoints. I enjoy shaping ideas early and carrying them through to final execution.
            </p>
            <p>
              I&apos;m very hands-on in my work and comfortable moving between big-picture thinking and detailed design. Lately, I&apos;ve been exploring new tools and workflows, including AI-assisted design, to prototype ideas faster while staying grounded in craft and clarity.
            </p>
            <p>
              When I&apos;m not designing, you&apos;ll usually find me painting outdoors with oils.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-[500px] mx-auto lg:mx-0"
        >
          {/* Black frame (border); inner box = same for both layers so they base-align */}
          <div className="relative aspect-square bg-ink overflow-hidden rounded-sm p-3 md:p-4">
            <div className="relative w-full h-full">
              {/* Background layer - same box as top, base-aligned */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <Image
                  src={PROFILE_BG_IMAGE}
                  alt=""
                  fill
                  className="object-contain object-center"
                  priority
                  aria-hidden
                />
              </motion.div>
              {/* Top layer - same box, object-contain object-bottom = same base line */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src={PROFILE_IMAGE}
                  alt="Tonya"
                  fill
                  className="object-contain object-bottom"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 420px, 500px"
                />
              </motion.div>
            </div>
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
              title: 'Digital & Design Systems',
              description: 'Websites, apps, design systems, and digital experiences that look beautiful and actually work.',
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
              href="/TonyaZenin_resume.pdf" 
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
