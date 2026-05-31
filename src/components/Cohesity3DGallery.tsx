'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  COHESITY_3D_SECTIONS,
  Cohesity3DContentSection,
  Cohesity3DSectionImage,
} from '@/data/cohesity-3d-sections';

interface Cohesity3DGalleryProps {
  onImageClick: (src: string, alt: string) => void;
}

function gridClassForLayout(layout: Cohesity3DContentSection['layout']) {
  switch (layout) {
    case 'icons':
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    case 'variants':
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    case 'campaigns':
      return 'grid grid-cols-1 md:grid-cols-2 gap-6';
    default:
      return 'grid grid-cols-1 md:grid-cols-2 gap-6';
  }
}

function itemClassForImage(
  layout: Cohesity3DContentSection['layout'],
  image: Cohesity3DSectionImage
) {
  if (image.span === 'full') {
    return layout === 'campaigns' ? 'md:col-span-2' : 'md:col-span-2';
  }
  return '';
}

function aspectClassForImage(
  layout: Cohesity3DContentSection['layout'],
  _image: Cohesity3DSectionImage
) {
  switch (layout) {
    case 'icons':
    case 'variants':
      return 'aspect-square';
    case 'campaigns':
      return 'aspect-[16/10]';
    default:
      return 'aspect-[4/3]';
  }
}

function ImageTile({
  image,
  layout,
  index,
  onImageClick,
}: {
  image: Cohesity3DSectionImage;
  layout: Cohesity3DContentSection['layout'];
  index: number;
  onImageClick: (src: string, alt: string) => void;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`space-y-3 ${itemClassForImage(layout, image)}`}
    >
      <motion.button
        type="button"
        onClick={() => onImageClick(image.src, image.alt)}
        style={image.tileBackground ? { backgroundColor: image.tileBackground } : undefined}
        className={`group relative w-full rounded-sm border border-cream/20 overflow-hidden cursor-pointer ring-1 ring-cream/10 hover:ring-cream/30 focus:outline-none focus:ring-2 focus:ring-yellow/50 ${aspectClassForImage(layout, image)} ${image.tileBackground ? '' : 'bg-ink-light'}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div
          className="absolute inset-0"
          style={
            image.scale
              ? { transform: `scale(${image.scale})`, transformOrigin: 'center' }
              : undefined
          }
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={`transition duration-300 group-hover:brightness-95 ${
              image.fit === 'cover'
                ? 'object-cover'
                : layout === 'campaigns'
                  ? 'object-contain p-2'
                  : 'object-contain'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </motion.button>
      {image.caption && (
        <figcaption className="font-body text-sm text-cream/60">{image.caption}</figcaption>
      )}
    </motion.figure>
  );
}

export default function Cohesity3DGallery({ onImageClick }: Cohesity3DGalleryProps) {
  return (
    <div className="space-y-20">
      {COHESITY_3D_SECTIONS.map((section, sectionIndex) => (
        <motion.section
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: sectionIndex * 0.05 }}
          className={sectionIndex === 0 ? '' : 'pt-20 border-t border-cream/10'}
        >
          <h2 className="font-body font-semibold text-xl md:text-2xl mb-4">{section.title}</h2>
          <p className="text-sm md:text-base leading-relaxed text-cream/70 mb-8 max-w-3xl">
            {section.description}
          </p>
          <div className={gridClassForLayout(section.layout)}>
            {section.images.map((image, index) => (
              <ImageTile
                key={image.src}
                image={image}
                layout={section.layout}
                index={index}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
