'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type InlineSvgProps = {
  src: string;
  label: string;
};

function InlineSvgAnimation({ src, label }: InlineSvgProps) {
  const [svgHtml, setSvgHtml] = useState<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then(setSvgHtml)
      .catch(() => setSvgHtml(null));
  }, [src]);

  if (!svgHtml) {
    return <div className="py-12 text-sm text-ink/50">Loading graphic...</div>;
  }

  return (
    <div
      className="flex min-h-0 min-w-0 flex-1 items-center justify-center w-full [&_svg]:max-h-full [&_svg]:w-full [&_svg]:h-auto [&_svg]:object-contain"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
      aria-label={label}
      role="img"
    />
  );
}

type Iso20Variant = 'v3';

const ISO20_GROUP_IDS = [
  'iso20-hex',
  'iso20-grid',
  'iso20-ring1',
  'iso20-ring2',
  'iso20-ring3',
  'iso20-connections',
  'iso20-shield',
  'iso20-arrows-ghost',
  'iso20-arrows',
  'iso20-cyl1',
  'iso20-cyl2',
  'iso20-cyl3',
  'iso20-plat1',
  'iso20-plat2',
  'iso20-plat3',
];

let iso20SvgCache: Promise<string> | null = null;
function fetchIso20Svg(): Promise<string> {
  if (!iso20SvgCache) {
    iso20SvgCache = fetch('/images/css-isographics/backup-recovery-v2.svg').then((r) => r.text());
  }
  return iso20SvgCache;
}

const ISO20_EASE = 'cubic-bezier(0.16,1,0.3,1)';

function iso20Keyframes() {
  return `
    @keyframes iso20-fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes iso20-growIn { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
    @keyframes iso20-strokeDraw { to{stroke-dashoffset:0} }
    @keyframes iso20-gentleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
    @keyframes iso20-glowMagenta { 0%,100%{filter:drop-shadow(0 0 0 transparent)} 50%{filter:drop-shadow(0 0 4px rgba(252,0,128,0.3))} }
    @keyframes iso20-gapBreathUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes iso20-gapBreathMid { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
    @keyframes iso20-gapBreathDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
    @keyframes iso20-riseInOnly { from{transform:translateY(14px)} to{transform:translateY(0)} }
    @keyframes iso20-travelingDashReverse { 0%{stroke-dasharray:12 14;stroke-dashoffset:26} 100%{stroke-dasharray:12 14;stroke-dashoffset:0} }
    @keyframes iso20-arrowsTowardShield { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-10px,-4px)} }
  `;
}

function iso20VariantCSS(prefix: string, variant: Iso20Variant): string {
  const id = (n: string) => `#${prefix}-${n}`;
  const all = ISO20_GROUP_IDS.map((n) => id(n)).join(',\n    ');

  return `
    ${all} { transform-box:fill-box; transform-origin:center; }

    ${id('iso20-hex')},${id('iso20-grid')},${id('iso20-ring1')},${id('iso20-ring2')},${id('iso20-ring3')},
    ${id('iso20-shield')},${id('iso20-arrows-ghost')},${id('iso20-arrows')},
    ${id('iso20-plat1')},${id('iso20-plat2')},${id('iso20-plat3')} { opacity:0 }

    ${id('iso20-connections')} path { stroke-dasharray:300; stroke-dashoffset:300 }

    ${id('iso20-hex')}          { animation:iso20-growIn .7s ${ISO20_EASE} 0s forwards }
    ${id('iso20-grid')}         { animation:iso20-fadeIn .4s ease-out .3s forwards }
    ${id('iso20-shield')}       { animation:iso20-growIn .7s ${ISO20_EASE} .5s forwards, iso20-gentleFloat 5s ease-in-out 3.5s infinite }
    ${id('iso20-arrows-ghost')} { animation:iso20-fadeIn .4s ease-out .8s forwards }
    ${id('iso20-arrows')}       { animation:iso20-fadeIn .5s ease-out .9s forwards, iso20-arrowsTowardShield 2.5s ease-in-out 2.5s infinite }

    ${id('iso20-connections')} path { animation:iso20-strokeDraw .7s ease-out 1.1s forwards, iso20-travelingDashReverse 2.5s linear 2s infinite }
    ${id('iso20-connections')}      { animation:iso20-glowMagenta 4s ease-in-out 3.5s infinite }

    ${id('iso20-plat1')} { animation:iso20-growIn .5s ${ISO20_EASE} 1.4s forwards, iso20-gapBreathUp 2.5s ease-in-out 2.8s infinite }
    ${id('iso20-plat2')} { animation:iso20-growIn .5s ${ISO20_EASE} 1.6s forwards, iso20-gapBreathMid 2.5s ease-in-out 2.8s infinite }
    ${id('iso20-plat3')} { animation:iso20-growIn .5s ${ISO20_EASE} 1.8s forwards, iso20-gapBreathDown 2.5s ease-in-out 2.8s infinite }

    ${id('iso20-cyl1')}  { animation:iso20-riseInOnly .5s ${ISO20_EASE} 1.5s forwards, iso20-gapBreathUp 2.5s ease-in-out 2.8s infinite }
    ${id('iso20-cyl2')}  { animation:iso20-riseInOnly .5s ${ISO20_EASE} 1.7s forwards, iso20-gapBreathMid 2.5s ease-in-out 2.8s infinite }
    ${id('iso20-cyl3')}  { animation:iso20-riseInOnly .5s ${ISO20_EASE} 1.9s forwards, iso20-gapBreathDown 2.5s ease-in-out 2.8s infinite }

    ${id('iso20-ring1')} { animation:iso20-growIn .5s ${ISO20_EASE} 2.2s forwards }
    ${id('iso20-ring2')} { animation:iso20-growIn .5s ${ISO20_EASE} 2.4s forwards }
    ${id('iso20-ring3')} { animation:iso20-growIn .5s ${ISO20_EASE} 2.6s forwards }

    @media (prefers-reduced-motion:reduce) {
      ${all} { animation:none!important; opacity:1!important }
      ${id('iso20-connections')} path { animation:none!important; stroke-dashoffset:0!important }
    }
  `;
}

function processIso20Svg(raw: string, prefix: string, variant: Iso20Variant): string {
  if (typeof DOMParser === 'undefined') return raw;

  const doc = new DOMParser().parseFromString(raw, 'image/svg+xml');
  const svg = doc.documentElement;

  const topGroups = Array.from(svg.children).filter((el) => el.tagName === 'g');
  topGroups.forEach((g, i) => {
    if (i < ISO20_GROUP_IDS.length) g.setAttribute('id', `${prefix}-${ISO20_GROUP_IDS[i]}`);
  });

  const existingIds: string[] = [];
  svg.querySelectorAll('[id]').forEach((el) => {
    const id = el.getAttribute('id');
    if (id && !id.startsWith(`${prefix}-`)) existingIds.push(id);
  });

  let html = new XMLSerializer().serializeToString(svg);

  for (const id of existingIds) {
    const safe = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`id="${safe}"`, 'g'), `id="${prefix}-${id}"`);
    html = html.replace(new RegExp(`url\\(#${safe}\\)`, 'g'), `url(#${prefix}-${id})`);
    html = html.replace(new RegExp(`href="#${safe}"`, 'g'), `href="#${prefix}-${id}"`);
  }

  html = html.replace(/cls-(\d+)/g, `${prefix}-cls-$1`);

  const playStatePaused = `
    [id*="iso20-"] { animation-play-state: paused; }
    [id*="iso20-connections"] path { animation-play-state: paused; }
  `;
  const animCSS = iso20Keyframes() + iso20VariantCSS(prefix, variant) + playStatePaused;
  html = html.replace('</style>', `${animCSS}\n</style>`);

  return html;
}

function AnimatedBackupRecoveryV2() {
  const [rawSvg, setRawSvg] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchIso20Svg()
      .then(setRawSvg)
      .catch(() => setRawSvg(null));
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rawSvg]);

  const processed = useMemo(() => (rawSvg ? processIso20Svg(rawSvg, 'backup-v2', 'v3') : null), [rawSvg]);

  if (!processed) {
    return <div className="py-12 text-sm text-ink/50">Loading graphic...</div>;
  }

  return (
    <>
      <style>{`
        .iso20-play [id*="iso20-"] { animation-play-state: running; }
        .iso20-play [id*="iso20-connections"] path { animation-play-state: running; }
      `}</style>
      <div
        ref={wrapperRef}
        className={inView ? 'iso20-play' : ''}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        dangerouslySetInnerHTML={{ __html: processed }}
        role="img"
        aria-label="Backup and recovery version 2 CSS animation"
      />
    </>
  );
}

const MS360_WRAPPER_CLASS = 'ms360-v1-graphic';
const MS360_PLAY_CLASS = `${MS360_WRAPPER_CLASS}.ms360-v1-play`;

const MS360_ANIMATION_STYLES = `
  @keyframes ms360-draw-erase {
    0%   { stroke-dashoffset: 2400; }
    30%  { stroke-dashoffset: 0; }
    50%  { stroke-dashoffset: 0; }
    80%  { stroke-dashoffset: -2400; }
    100% { stroke-dashoffset: -2400; }
  }

  @keyframes ms360-flow-pulse {
    0%, 100% { opacity: 0.55; }
    50%      { opacity: 1; }
  }

  @keyframes ms360-node-float-pop {
    0%, 100% { transform: translateY(0) scale(1); }
    12.5%    { transform: translateY(-4px) scale(1.15); }
    25%      { transform: translateY(-8px) scale(1.2); }
    37.5%    { transform: translateY(-4px) scale(1.08); }
    50%      { transform: translateY(0) scale(1); }
    62.5%    { transform: translateY(-4px) scale(1.08); }
    75%      { transform: translateY(-8px) scale(1.15); }
    87.5%    { transform: translateY(-4px) scale(1.05); }
  }

  @keyframes ms360-ring-pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.7; }
  }

  .${MS360_WRAPPER_CLASS} .cls-62 {
    stroke-dasharray: 2400;
    stroke-dashoffset: 2400;
  }
  .${MS360_WRAPPER_CLASS} .ms360-arrow-group > .cls-61,
  .${MS360_WRAPPER_CLASS} .cls-41 .cls-61 {
    opacity: 0;
  }
  .${MS360_WRAPPER_CLASS} .cls-51,
  .${MS360_WRAPPER_CLASS} .cls-11,
  .${MS360_WRAPPER_CLASS} .cls-58,
  .${MS360_WRAPPER_CLASS} .cls-57 {
    transform-box: fill-box;
    transform-origin: center;
  }

  .${MS360_PLAY_CLASS} .cls-62 {
    stroke-dasharray: 2400;
    animation: ms360-draw-erase 6s ease-in-out infinite;
  }

  .${MS360_PLAY_CLASS} .cls-41 .cls-61 {
    animation: ms360-flow-pulse 2.4s ease-in-out infinite;
  }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(1)  { animation-delay: 0s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(2)  { animation-delay: 0.15s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(3)  { animation-delay: 0.30s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(4)  { animation-delay: 0.45s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(5)  { animation-delay: 0.60s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(6)  { animation-delay: 0.75s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(7)  { animation-delay: 0.90s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(8)  { animation-delay: 1.05s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(9)  { animation-delay: 1.20s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(10) { animation-delay: 1.35s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(11) { animation-delay: 1.50s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(12) { animation-delay: 1.65s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(13) { animation-delay: 1.80s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(14) { animation-delay: 0.20s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(15) { animation-delay: 0.40s; }
  .${MS360_PLAY_CLASS} .cls-41 .cls-61:nth-child(16) { animation-delay: 0.60s; }

  .${MS360_PLAY_CLASS} .cls-51,
  .${MS360_PLAY_CLASS} .cls-11,
  .${MS360_PLAY_CLASS} .cls-58,
  .${MS360_PLAY_CLASS} .cls-57 {
    animation: ms360-node-float-pop 3s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
  }
  .${MS360_PLAY_CLASS} .cls-51 { animation-delay: 0s; }
  .${MS360_PLAY_CLASS} .cls-11 { animation-delay: 0.4s; }
  .${MS360_PLAY_CLASS} .cls-58 { animation-delay: 0.8s; }
  .${MS360_PLAY_CLASS} .cls-57 { animation-delay: 1.2s; }

  .${MS360_PLAY_CLASS} .cls-9,
  .${MS360_PLAY_CLASS} .cls-33,
  .${MS360_PLAY_CLASS} .cls-22,
  .${MS360_PLAY_CLASS} .cls-59,
  .${MS360_PLAY_CLASS} .cls-15,
  .${MS360_PLAY_CLASS} .cls-6,
  .${MS360_PLAY_CLASS} .cls-48,
  .${MS360_PLAY_CLASS} .cls-44 {
    animation: ms360-ring-pulse 4s ease-in-out infinite;
  }
  .${MS360_PLAY_CLASS} .cls-33 { animation-delay: 0.3s; }
  .${MS360_PLAY_CLASS} .cls-22 { animation-delay: 0.6s; }
  .${MS360_PLAY_CLASS} .cls-59 { animation-delay: 0.9s; }
  .${MS360_PLAY_CLASS} .cls-15 { animation-delay: 1.2s; }
  .${MS360_PLAY_CLASS} .cls-6  { animation-delay: 1.5s; }
  .${MS360_PLAY_CLASS} .cls-48 { animation-delay: 0.4s; }
  .${MS360_PLAY_CLASS} .cls-44 { animation-delay: 0.8s; }

  @media (prefers-reduced-motion: reduce) {
    .${MS360_WRAPPER_CLASS} * { animation: none !important; }
  }
`;

function AnimatedMS360V1() {
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/images/css-isographics/ms360-v1.svg')
      .then((res) => res.text())
      .then(setSvgHtml)
      .catch(() => setSvgHtml(null));
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [svgHtml]);

  useEffect(() => {
    if (!inView || !svgHtml) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const strokeEl = wrapper.querySelector('.cls-62') as SVGElement | null;
    const headEl = wrapper.querySelector('.ms360-arrow-group > .cls-61') as SVGElement | null;
    if (!strokeEl || !headEl) return;
    const strokeAnim = strokeEl.getAnimations()[0];
    if (!strokeAnim) return;

    let rafId = 0;
    const syncArrowHead = () => {
      const t = Number(strokeAnim.currentTime ?? 0);
      const progress = (t % 6000) / 6000;
      headEl.style.opacity = progress >= 0.84 / 6 && progress < 0.64 ? '1' : '0';
      rafId = requestAnimationFrame(syncArrowHead);
    };
    rafId = requestAnimationFrame(syncArrowHead);
    return () => {
      cancelAnimationFrame(rafId);
      headEl.style.opacity = '0';
    };
  }, [inView, svgHtml]);

  if (!svgHtml) {
    return <div className="py-12 text-sm text-ink/50">Loading graphic...</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MS360_ANIMATION_STYLES }} />
      <div
        ref={wrapperRef}
        className={`${MS360_WRAPPER_CLASS} ${inView ? 'ms360-v1-play' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
        role="img"
        aria-label="MS360 version 1 CSS animation"
      />
    </>
  );
}

type AnimationItem = {
  title: string;
  description: string;
  component: React.ReactNode;
};

const ANIMATIONS: AnimationItem[] = [
  {
    title: 'Active Directory',
    description: 'A hero-style directory diagram with animated connectors, node sequencing, and dashed orbital motion.',
    component: (
      <InlineSvgAnimation
        src="/images/css-isographics/active-directory-hero.svg"
        label="Active Directory CSS animation"
      />
    ),
  },
  {
    title: 'Dashboard Isographic',
    description: 'An isometric dashboard graphic animated with SVG strokes, staggered panels, and cascading component reveals.',
    component: (
      <img
        src="/images/css-isographics/iso-graphic-dash.svg"
        alt="ISO Graphic Dash CSS animation"
        className="flex min-h-0 min-w-0 flex-1 items-center justify-center w-full h-auto object-contain"
      />
    ),
  },
  {
    title: 'Backup and Recovery',
    description: 'A backup-and-recovery system diagram with directional data flow, breathing layers, and sequenced recovery states.',
    component: (
      <div className="flex min-h-0 flex-1 w-full items-center justify-center [&>div:last-of-type]:scale-125">
        <AnimatedBackupRecoveryV2 />
      </div>
    ),
  },
  {
    title: 'Microsoft 365 Recovery',
    description: 'A Microsoft 365-style recovery diagram using draw-on paths, synchronized arrowheads, and pulsing data nodes.',
    component: (
      <div className="flex min-h-0 flex-1 w-full items-center justify-center">
        <AnimatedMS360V1 />
      </div>
    ),
  },
];

export default function CssIsographicAnimations() {
  return (
    <section className="mb-20 pt-20 border-t border-cream/10">
      <div className="mb-10 max-w-3xl">
        <h2 className="font-body font-semibold text-xl md:text-2xl mb-4">CSS Animated Isographics</h2>
        <p className="text-sm md:text-base leading-relaxed text-cream/70">
          Four production-minded SVG illustrations animated with CSS for Cohesity product and solution pages. The set
          explored a faster workflow where designers could create source graphics, animate them, and hand off
          implementation-ready assets to developers.
        </p>
      </div>

      <div className="space-y-12">
        {ANIMATIONS.map((animation, index) => (
          <article key={animation.title} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 lg:gap-8 items-start">
            <div className="w-full max-h-[80vh] min-h-[360px] bg-white rounded-sm shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 md:p-10 [&_svg]:max-h-full [&_svg]:w-full [&_svg]:h-auto [&_svg]:object-contain">
              {animation.component}
            </div>
            <div className="lg:pt-4">
              <p className="font-body text-xs text-yellow uppercase tracking-widest mb-3">
                0{index + 1} / CSS Motion
              </p>
              <h3 className="font-body font-semibold text-lg md:text-xl mb-3">{animation.title}</h3>
              <p className="text-sm leading-relaxed text-cream/65">{animation.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
