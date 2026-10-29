import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Picture from './Picture.jsx';
import { photo } from '../data/photos.js';
import { gsap, prefersReducedMotion } from '../lib/motion.js';
import './staggered.css';

// Staggered pairs in empty ground: one or two photographs per screen, each on its own column line,
// mirrored on every second pass. Pictures open with a short wipe from the bottom edge.
export default function Staggered({ slugs, onOpen }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray('.stagger__item', ref.current).forEach(item => {
        gsap.fromTo(
          item.querySelector('.stagger__frame'),
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.3,
            ease: 'expo.out',
            clearProps: 'clipPath',
            scrollTrigger: { trigger: item, start: 'top 90%', once: true }
          }
        );
        gsap.fromTo(
          item.querySelector('img'),
          { scale: 1.12 },
          { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: item, start: 'top 90%', once: true } }
        );
      });
    },
    { scope: ref, dependencies: [slugs.join()] }
  );

  return (
    <ul className="stagger" ref={ref}>
      {slugs.map((slug, i) => {
        const p = photo(slug);
        const Frame = onOpen ? 'button' : 'div';
        return (
          <li key={slug} className={`stagger__item stagger__item--${i % 8}`}>
            <Frame
              className="stagger__frame"
              {...(onOpen ? { type: 'button', onClick: () => onOpen(i), 'aria-label': `Open photo: ${p.caption}` } : {})}
            >
              <Picture slug={slug} sizes="(max-width: 899px) 90vw, 50vw" />
            </Frame>
            <p className="stagger__caption">{p.caption}</p>
          </li>
        );
      })}
    </ul>
  );
}
