'use client';

import Image from 'next/image';

interface LaptopVideoMockupProps {
  laptopImage: string;
  videoSrc: string;
  videoAlt?: string;
  className?: string;
}

/**
 * Mockup: device image (e.g. iMac, laptop) with video playing on the screen.
 * Video is overlaid on the screen region with autoplay, loop, muted.
 */
export default function LaptopVideoMockup({
  laptopImage,
  videoSrc,
  videoAlt = 'Video on screen',
  className = '',
}: LaptopVideoMockupProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative aspect-[4/5] w-full max-w-4xl mx-auto">
        <Image
          src={laptopImage}
          alt="Device mockup"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 896px"
        />
        {/* Video overlay on screen — positioned over iMac screen, scaled to 75.5%, offset down */}
        <div
          className="absolute overflow-hidden rounded-lg flex items-center justify-center"
          style={{
            top: 'calc(9% + 76px)',
            left: 'calc(9% + 3px)',
            width: '82%',
            height: '62%',
          }}
        >
          <div
            className="relative w-[75.5%] h-[75.5%]"
            style={{ flexShrink: 0 }}
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
              aria-label={videoAlt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
