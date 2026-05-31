export interface ExternalRelatedProject {
  title: string;
  category: string;
  description: string;
  href: string;
  thumbnail: string;
  thumbnailClassName?: string;
  tags?: string[];
}

export const COHESITY_3D_RELATED_PROJECTS: ExternalRelatedProject[] = [
  {
    title: '3D Datacenter Scene',
    category: '3D',
    description:
      'Rack-scale datacenter visualization: flythrough camera, inspection mode, and telemetry-style readouts in WebGL.',
    href: 'https://projects.tonyazenin.ai/projects/datacenter-scene',
    thumbnail: '/images/related/datacenter-scene.png',
    thumbnailClassName: 'object-cover object-top',
    tags: ['3D', 'WebGL', 'Interactive'],
  },
  {
    title: '3D Nemoclaw Bot Game',
    category: '3D',
    description:
      'Arcade clawling chase. Core interaction and game loop were first prototyped in Omma, then refined here.',
    href: 'https://projects.tonyazenin.ai/projects/nemoclaw-bot-game',
    thumbnail: '/images/related/nemoclaw-bot-game.png',
    thumbnailClassName: 'object-cover',
    tags: ['3D', 'WebGL', 'Game'],
  },
];
