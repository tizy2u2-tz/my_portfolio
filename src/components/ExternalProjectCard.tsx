'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalRelatedProject } from '@/data/cohesity-3d-related';

interface ExternalProjectCardProps {
  project: ExternalRelatedProject;
}

export default function ExternalProjectCard({ project }: ExternalProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative overflow-hidden bg-ink-light rounded-sm"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`transition-transform duration-500 group-hover:scale-105 ${project.thumbnailClassName ?? 'object-cover'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent pointer-events-none"
          />

          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium tracking-wider uppercase z-10 bg-magenta text-white">
            {project.category}
          </span>

          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium tracking-wider uppercase z-10 bg-ink/80 text-cream/70 border border-cream/20">
            External ↗
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-magenta transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-cream/60 text-sm line-clamp-2">{project.description}</p>

          {project.tags && project.tags.length > 0 && (
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
          )}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-magenta"
        />
      </motion.article>
    </a>
  );
}
