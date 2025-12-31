'use client';

import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(throttleMs: number = 16): MousePosition {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const lastUpdate = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      if (now - lastUpdate.current >= throttleMs) {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          lastUpdate.current = now;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [throttleMs]);

  return mousePos;
}
