'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { visibleProjects, categories } from '@/data/projects';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  const filteredProjects = activeFilter === 'All' 
    ? visibleProjects 
    : visibleProjects.filter(p => p.category === activeFilter);

  return (
    <section className="pt-28 pb-16 container-main min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-yellow font-medium tracking-widest uppercase mb-4">Portfolio</p>
        <h1 className="heading-lg mb-6 text-yellow">Selected Work</h1>
        <p className="body-lg max-w-2xl">
          A collection of brand, digital, and motion projects spanning enterprise tech, 
          campaigns, and personal explorations.
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        <FilterButton 
          label="All" 
          isActive={activeFilter === 'All'} 
          onClick={() => setActiveFilter('All')} 
        />
        {categories.map((category) => (
          <FilterButton
            key={category}
            label={category}
            isActive={activeFilter === category}
            onClick={() => setActiveFilter(category)}
          />
        ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-cream/40 py-20"
        >
          No projects found in this category.
        </motion.p>
      )}
    </section>
  );
}

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300
        ${isActive 
          ? 'bg-magenta text-white' 
          : 'bg-transparent text-cream/60 border border-cream/25 hover:border-magenta hover:text-magenta'
        }
      `}
    >
      {label}
    </button>
  );
}
