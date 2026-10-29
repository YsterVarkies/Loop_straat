import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import Picture from './Picture.jsx';
import { ScrollTrigger, prefersReducedMotion } from '../lib/motion.js';
import { asset } from '../lib/asset.js';
import './arch-walk.css';

const ArchScene = lazy(() => import('./ArchScene.jsx'));

const SLIDES = ['the-steps', 'the-tree', 'bar-at-night'];
const CAPTIONS = [
  'Number 37 is the last address on your left before the Fanie du Toit rugby fields. Look for the lamp-lit steps.',
  'Through the door, the deck sits under one big tree, strung with festoon lights and lit green at night.',
  'Inside is the bar: timber beams, old licence plates, woven lamps and a fireplace for winter.'
];
// The walk (far → mid → through the doorway) is finished by ENTRY_END of the scroll — kept in
// sync with ArchScene.jsx's own ENTRY_END, which clamps the camera to be fully in by then.
const ENTRY_END = 0.72;
// Only once you are all the way in does the same photo take over, full-bleed: a short crossfade
// starting just after ENTRY_END, holding at full size for the rest of the scroll.
const SLIDES_STAGE_SPLIT = [ENTRY_END * 0.32, ENTRY_END * 0.6];
const REVEAL_SLUG = SLIDES[2];
const REVEAL_START = ENTRY_END + 0.03;
const REVEAL_END = ENTRY_END + 0.16;

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

// One frame, three distances: the logo's arch in 3D, walked through as the section scrolls.
// The walk finishes — you are all the way in, photo ready — before it opens onto that same
// photo at full size. The title and captions stay up throughout; only the picture changes.
export default function ArchWalk() {
  const sectionRef = useRef(null);
  const progress = useRef(0);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [still] = useState(prefersReducedMotion);
  const [webgl] = useState(hasWebGL);
  const revealRef = useRef(null);
  const titleRef = useRef(null);
  const enteredRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setMounted(true), { rootMargin: '120% 0px' });
    const seen = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '5% 0px' });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      if (still) {
        progress.current = 0.42;
        stageRef.current = 1;
        setStage(1);
        return;
      }
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          progress.current = self.progress;
          const next = self.progress < SLIDES_STAGE_SPLIT[0] ? 0 : self.progress < SLIDES_STAGE_SPLIT[1] ? 1 : 2;
          if (next !== stageRef.current) {
            stageRef.current = next;
            setStage(next);
          }
          const t = Math.max(0, Math.min(1, (self.progress - REVEAL_START) / (REVEAL_END - REVEAL_START)));
          if (revealRef.current) revealRef.current.style.opacity = t;
          // Once you've walked all the way in, the title steps out of the photo's way to the top-left.
          const entered = self.progress >= ENTRY_END;
          if (entered !== enteredRef.current) {
            enteredRef.current = entered;
            titleRef.current?.classList.toggle('is-entered', entered);
          }
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={`arch-walk ${still ? 'is-still' : ''}`} aria-labelledby="arch-walk-title">
      <div className="arch-walk__stage">
        <div className="arch-walk__canvas">
          {webgl ? (
            mounted && (
              <Suspense fallback={null}>
                <ArchScene progress={progress} stage={stageRef} active={active} still={still} />
              </Suspense>
            )
          ) : (
            <div className="arch-walk__fallback">
              {SLIDES.map((slug, i) => (
                <Picture key={slug} slug={slug} sizes="40vw" className={i === stage ? 'is-on' : ''} />
              ))}
              <img src={asset('media/logo/loop-willow.webp')} alt="" className="arch-walk__willow" />
            </div>
          )}
        </div>
        {!still && (
          <div className="arch-walk__reveal" ref={revealRef} aria-hidden="true">
            <Picture slug={REVEAL_SLUG} sizes="100vw" />
          </div>
        )}
        {/* Always on top of the canvas and the reveal photo, and never faded: the words stay up.
            Once you've entered the arch, they move to the top-left so the photo can take over. */}
        <h2 id="arch-walk-title" className="arch-walk__title" ref={titleRef}>
          <span className="arch-walk__half arch-walk__half--top t-display">Up the steps,</span>{' '}
          <span className={`arch-walk__half arch-walk__half--bottom t-display ${stage >= 1 || still ? 'is-on' : ''}`}>
            through the arch.
          </span>
        </h2>
        <ul className="arch-walk__captions">
          {CAPTIONS.map((text, i) => (
            <li key={i} className={i === stage || still ? 'is-on' : ''}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
