import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const EASE_OUT = 'expo.out';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

// Smooth scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
// Visitors who ask for reduced motion keep the browser's own scrolling.
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export const getLenis = () => lenis;

// Scroll to an element or a y position, through Lenis when it runs.
export function scrollToTarget(target, { offset = 0, immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: immediate ? 0 : 1.1 });
    return;
  }
  const top =
    typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
}

export { gsap, ScrollTrigger };
