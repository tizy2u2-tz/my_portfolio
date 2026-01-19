# Tonya Zenin — Design Portfolio

A bold, motion-rich portfolio built with Next.js 14, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion + Lottie
- **Deployment**: GitHub Pages (static export)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

The static site will be exported to the `out/` directory.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home
│   ├── work/              # Work section
│   ├── playground/        # Experiments
│   ├── about/             # About page
│   └── contact/           # Contact form
├── components/            # Reusable components
│   ├── Navigation.tsx
│   ├── AnimatedLogo.tsx
│   ├── ProjectCard.tsx
│   ├── LottiePlayer.tsx
│   └── Resume.tsx
├── data/                  # Content data
│   └── projects.ts
└── styles/
    └── globals.css

public/
├── images/               # Project images
├── lottie/              # Lottie animation files
└── resume.pdf           # Downloadable resume
```

## Customization

### Adding Projects

Edit `src/data/projects.ts` to add or modify projects:

```typescript
{
  slug: 'project-slug',
  title: 'Project Title',
  category: 'Brand',
  overview: 'One-line description',
  role: 'Your role',
  challenge: 'The problem',
  approach: 'Your solution',
  outcome: 'Results',
  thumbnail: '/images/project-thumb.jpg',
  images: ['/images/project-1.jpg', '/images/project-2.jpg'],
  tags: ['Brand', 'Motion'],
  year: '2024',
  featured: true,
}
```

### Adding Lottie Animations

1. Export animations as JSON from After Effects (via Bodymovin) or LottieFiles
2. Place files in `public/lottie/`
3. Reference in projects or Playground page

### Colors

Custom colors defined in `tailwind.config.ts`:

- `magenta`: #bb0147 (primary accent)
- `coral`: #FF6B4A
- `lime`: #BFFF00
- `electric`: #1a1aff
- `cream`: #f5f2eb (text)
- `ink`: #0a0a0a (background)

## Deployment

The site auto-deploys to GitHub Pages on push to `main` via GitHub Actions.

To deploy manually:

```bash
npm run build
# Output in ./out directory
```

## Content To-Do

- [ ] Add project images to `public/images/`
- [ ] Export Lottie animations to `public/lottie/`
- [ ] Upload resume PDF to `public/resume.pdf`
- [ ] Update project case study copy in `src/data/projects.ts`
- [ ] Customize About page bio in `src/app/about/page.tsx`
- [ ] Update Resume component with real experience
- [ ] Add actual social media links

## License

All rights reserved. Design and content © Tonya Zenin.
