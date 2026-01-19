'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Resume from '@/components/Resume';

export default function AboutPage() {
  return (
    <section className="py-16 container-main">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-magenta font-medium tracking-widest uppercase mb-4">About</p>
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
          {/* Photo placeholder - replace with your actual photo */}
          <div className="relative aspect-[4/5] bg-ink-light overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-cream/20">
              {/* Placeholder for photo */}
              <span className="text-sm">Your photo here</span>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-magenta/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-lime/20 -z-10" />
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
              className="p-8 border border-cream/10 hover:border-magenta/50 transition-colors duration-300"
            >
              <span className="text-3xl text-magenta mb-4 block">{skill.icon}</span>
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
            { label: 'Coffee order', value: 'Oat milk latte' },
            { label: 'Current obsession', value: 'AI experiments' },
            { label: 'Design tool', value: 'Figma forever' },
            { label: 'Hidden talent', value: 'Street art photography' },
          ].map((fact) => (
            <div key={fact.label} className="text-center p-4">
              <p className="text-xs uppercase tracking-widest text-cream/40 mb-2">{fact.label}</p>
              <p className="font-display font-semibold text-magenta">{fact.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
