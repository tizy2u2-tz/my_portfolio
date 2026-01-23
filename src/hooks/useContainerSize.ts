import { useRef, useEffect, useState } from 'react';

interface ContainerSize {
  width: number;
  height: number;
}

export function useContainerSize(): [React.RefObject<HTMLDivElement>, ContainerSize] {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // Initial measurement
    updateSize();

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(updateSize);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as a fallback
    window.addEventListener('resize', updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return [containerRef, size];
}
