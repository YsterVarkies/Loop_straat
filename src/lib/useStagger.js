import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from './motion.js';

// Rows of a list arrive one after another as the list enters the screen, once.
// Content stays visible if scripts or motion are off.
export function useStagger(scope, selector, { each = 0.06, y = 18, start = 'top 88%', deps = [] } = {}) {
  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;
      const items = scope.current.querySelectorAll(selector);
      if (!items.length) return;
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: each,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: scope.current, start, once: true }
      });
    },
    { scope, dependencies: deps }
  );
}
