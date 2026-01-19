'use client';

import { useEffect, useRef } from 'react';

// Using exact colors provided
const ORANGE = '#FF8C09';
const PINK = '#EB5D9B';
const GREEN = '#79D37C';
const BLACK = '#0a0a0a';

const colors = [ORANGE, PINK, GREEN, BLACK];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width, height } = canvas;
      
      // Clear with black
      ctx.fillStyle = BLACK;
      ctx.fillRect(0, 0, width, height);

      const numStripes = 40;
      const stripeHeight = (height * 1.5) / numStripes;
      
      // Draw diagonal undulating stripes
      for (let i = 0; i < numStripes; i++) {
        const colorIndex = i % colors.length;
        ctx.fillStyle = colors[colorIndex];
        
        ctx.beginPath();
        
        // Calculate base Y position (diagonal offset)
        const diagonalOffset = (i * stripeHeight) - (height * 0.25);
        
        // Start from left edge
        const startY = diagonalOffset + width * 0.3; // Diagonal slant
        ctx.moveTo(0, startY);
        
        // Draw wavy top edge
        for (let x = 0; x <= width; x += 4) {
          // Multiple wave frequencies for organic feel
          const wave1 = Math.sin((x * 0.008) + time + i * 0.3) * 15;
          const wave2 = Math.sin((x * 0.015) + time * 1.3 + i * 0.5) * 8;
          const wave3 = Math.sin((x * 0.003) + time * 0.7) * 20;
          
          const y = diagonalOffset + (x * 0.3) + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }
        
        // Draw wavy bottom edge (reverse direction)
        for (let x = width; x >= 0; x -= 4) {
          const wave1 = Math.sin((x * 0.008) + time + (i + 1) * 0.3) * 15;
          const wave2 = Math.sin((x * 0.015) + time * 1.3 + (i + 1) * 0.5) * 8;
          const wave3 = Math.sin((x * 0.003) + time * 0.7) * 20;
          
          const y = diagonalOffset + stripeHeight + (x * 0.3) + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
      }

      time += 0.02; // Steady, rhythmic speed
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
}
