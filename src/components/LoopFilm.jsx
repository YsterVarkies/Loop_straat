import { useEffect, useRef } from 'react';
import { asset } from '../lib/asset.js';
import { prefersReducedMotion } from '../lib/motion.js';

// The Loop St. film as a small muted loop inside a page: plays while on screen, rests on its poster for reduced motion.
export default function LoopFilm({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return undefined;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()), {
      threshold: 0.1
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={asset('media/video/loop-film-poster-854.webp')}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src={asset('media/video/loop-film-854.mp4')} type="video/mp4" />
    </video>
  );
}
