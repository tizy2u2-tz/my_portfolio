export interface Cohesity3DSectionImage {
  src: string;
  alt: string;
  caption?: string;
  span?: 'full' | 'half';
  aspect?: 'square' | 'landscape';
  fit?: 'contain' | 'cover';
  scale?: number;
  tileBackground?: string;
}

export interface Cohesity3DContentSection {
  id: string;
  title: string;
  description: string;
  images: Cohesity3DSectionImage[];
  layout: 'icons' | 'variants' | 'campaigns';
}

const base = '/images/3d';

export const COHESITY_3D_SECTIONS: Cohesity3DContentSection[] = [
  {
    id: 'icons',
    title: 'Core icon library',
    description:
      'A modular set of metaphor-driven 3D objects—security, cloud, resilience, and AI—each built with beveled edges, gradient faces, and a subtle digital texture. The same icons stack into layered hero compositions for web, motion, and campaign key visuals.',
    layout: 'icons',
    images: [
      { src: `${base}/3D-shield.png`, alt: '3D shield icon', caption: 'Shield — cyber resilience' },
      { src: `${base}/3D-lock-green-orange.png`, alt: '3D lock icon', caption: 'Lock — data protection' },
      { src: `${base}/3D-cloud-green.png`, alt: '3D cloud icon — morph green core', caption: 'Morph — cloud green core' },
      { src: `${base}/3D-heart.png`, alt: '3D heart icon', caption: 'Heart — people & culture' },
      { src: `${base}/3D-vector.png`, alt: '3D AI letterforms', caption: 'AI — intelligent data' },
      { src: `${base}/3d-graphic-1.png`, alt: '3D composition — lock and shield stack', caption: 'Composition — security stack' },
      { src: `${base}/3d-graphic-2.png`, alt: '3D composition — cloud and data forms', caption: 'Composition — cloud & data' },
      { src: `${base}/3d-graphic-3.png`, alt: '3D composition — heart and human touch', caption: 'Composition — human-centered' },
      { src: `${base}/3d-graphic-4.png`, alt: '3D composition — AI letterforms', caption: 'Composition — AI narrative' },
      { src: `${base}/3d-graphic-5.png`, alt: '3D composition — multi-object scene', caption: 'Composition — full system' },
    ],
  },
  {
    id: 'variants',
    title: 'Materials & texture explorations',
    description:
      'Surface direction for the 3D system—digital pixel patterns, gradient fills, and gloss treatments explored to make the objects feel ownable rather than generic. Flat swatches test raw texture; object studies show how those materials read in three dimensions and on neutral backgrounds.',
    layout: 'variants',
    images: [
      { src: `${base}/digital-pattern-01.png`, alt: 'Digital texture — pink-to-green pixel scatter', caption: 'Pixel scatter · bi-gradient field' },
      { src: `${base}/digital-pattern-03.png`, alt: 'Digital texture — pixel mesh on magenta', caption: 'Pixel mesh · magenta' },
      { src: `${base}/digital-pattern-04.png`, alt: 'Digital texture — pixel mesh on green', caption: 'Pixel mesh · green' },
      { src: `${base}/3D-cloud-plastic.png`, alt: '3D material study — magenta plastic with pixel mesh', caption: 'Plastic · magenta pixel mesh', fit: 'cover', tileBackground: '#F0F0F0' },
      { src: `${base}/3D-cloud-metallic.png`, alt: '3D material study — metallic green with pixel mesh', caption: 'Metallic · green pixel mesh', fit: 'cover', tileBackground: '#F0F0F0' },
      { src: `${base}/3D-cloud-gray-bg.png`, alt: '3D material study — glossy gradient plastic with pixel mesh', caption: 'Glossy plastic · gradient' },
    ],
  },
  {
    id: 'campaigns',
    title: 'Campaign & social applications',
    description:
      '3D assets applied to real marketing deliverables—blog headers, social cards, partner campaigns, and values content. Layouts pair dimensional graphics with typographic hierarchy for legibility at every format.',
    layout: 'campaigns',
    images: [
      {
        src: `${base}/cs-9921-cyber-champions-1200x627.png`,
        alt: 'Cyber resilience blog social — 1200×627',
        caption: 'Blog series — cyber resilience',
        span: 'full',
      },
      {
        src: `${base}/cs-9736-google-cloud-champions-1200x627.png`,
        alt: 'Google Cloud Champions social — 1200×627',
        caption: 'Partner campaign — Google Cloud',
      },
      {
        src: `${base}/cs-9736-google-cloud-champions-1200x627-1.png`,
        alt: 'Google Cloud Champions social alternate',
        caption: 'Partner campaign — alternate crop',
      },
      {
        src: `${base}/cs-9703-values-4x5-1200x1500.png`,
        alt: 'Company values social — 4×5',
        caption: 'Values — portrait social',
      },
      {
        src: `${base}/cs-9703-values-4x5.png`,
        alt: 'Company values social alternate',
        caption: 'Values — alternate layout',
      },
      {
        src: `${base}/cs-9635-nbu-11-social-1080x1080.png`,
        alt: 'NetBackup social — 1080×1080',
        caption: 'Product social — square',
      },
    ],
  },
];

/** All image paths owned by dedicated sections (exclude from generic gallery). */
export const COHESITY_3D_SECTION_IMAGE_PATHS = COHESITY_3D_SECTIONS.flatMap((s) =>
  s.images.map((img) => img.src)
);
