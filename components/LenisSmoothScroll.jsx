'use client';

import { usePathname } from 'next/navigation';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

/**
 * Enables Lenis smooth scroll only on the home page (one long page with scroll-driven effects).
 * Other routes use native scrolling.
 */
export default function LenisSmoothScroll({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (!isHome) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.1,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
