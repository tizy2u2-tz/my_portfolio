'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Resume from '@/components/Resume';
import MagneticWrapper from '@/components/MagneticWrapper';

export default function AboutPage() {
  return (
    <section className="pt-28 pb-16 container-main">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-yellow font-medium tracking-widest uppercase mb-4">About</p>
          <h1 className="heading-lg mb-8">
            Hey, I&apos;m Tonya.
          </h1>
          
          {/* Bio - casual, human tone */}
          <div className="space-y-6 body-md">
            <p>
              I&apos;m a senior designer who loves making things look good and work even better. 
              My sweet spot? Brand identity, digital experiences, and motion design—basically 
              anything where I can blend bold visuals with smart strategy.
            </p>
            <p>
              I&apos;ve spent years working with enterprise tech companies, helping them stand out 
              in a sea of sameness. Because let&apos;s be honest—B2B doesn&apos;t have to be boring. 
              Some of my favorite projects have been transforming complex ideas into visuals 
              that actually connect with people.
            </p>
            <p>
              When I&apos;m not pushing pixels, you&apos;ll find me exploring street art, experimenting 
              with new animation techniques, or probably reorganizing my Figma files for the 
              hundredth time. I believe great design should feel effortless (even when it&apos;s not) 
              and that the best work happens when you&apos;re not afraid to try something unexpected.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] bg-ink overflow-hidden">
            {/* Yellow rectangle background - animates in first */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <div className="absolute bg-yellow w-[70%] h-[70%] top-[12%] left-1/2 -translate-x-1/2" />
            </motion.div>
            
            {/* Wings - animates in second */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.10 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 z-10"
            >
              <Image
                src="/images/wings.png"
                alt="Wings"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            
            {/* Tonya - animates in last */}
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 80 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 z-20 flex justify-center"
              style={{ paddingTop: '16%' }}
            >
              <div className="relative" style={{ width: '60%', height: '66%' }}>
                <Image
                  src="/images/tonya-about.png"
                  alt="Tonya Zenin"
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
        className="mb-32"
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
              className={`p-8 border border-cream/10 transition-colors duration-300 ${index % 2 === 0 ? 'hover:border-yellow/50' : 'hover:border-blue/50'}`}
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
        className="mb-32"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="heading-md">Experience</h2>
          </div>
          <MagneticWrapper>
            <Link 
              href="/resume.pdf" 
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

      {/* Fun Facts (optional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-cream/10 pt-16"
      >
        <h2 className="heading-md mb-8">A Few More Things</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Coffee order', value: 'Oat milk latte', color: 'text-yellow' },
            { label: 'Current obsession', value: 'AI experiments', color: 'text-blue' },
            { label: 'Design tool', value: 'Figma forever', color: 'text-pink' },
            { label: 'Hidden talent', value: 'Street art photography', color: 'text-yellow' },
          ].map((fact) => (
            <div key={fact.label} className="text-center p-4">
              <p className="text-xs uppercase tracking-widest text-cream/40 mb-2">{fact.label}</p>
              <p className={`font-display font-semibold ${fact.color}`}>{fact.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
