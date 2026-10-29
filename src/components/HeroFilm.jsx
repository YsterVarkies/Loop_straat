import { useEffect, useRef, useState } from 'react';
import Magnet from './reactbits/Magnet.jsx';
import { site } from '../data/site.js';
import { asset } from '../lib/asset.js';
import { prefersReducedMotion } from '../lib/motion.js';
import './hero.css';

// The Loop St. film fills the first screen: muted, looping, inline, with its first frame as the poster.
// It pauses off screen and in background tabs, and stays on the poster for reduced motion.
export default function HeroFilm() {
  const videoRef = useRef(null);
  const wantsPlay = useRef(!prefersReducedMotion());
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const play = () => {
      if (!wantsPlay.current) return;
      const p = video.play();
      if (p && p.catch) p.catch(() => setPlaying(false));
    };
    // Guarantee the film starts at its first frame, whatever position the browser restored on load.
    const onLoadedMetadata = () => {
      if (video.currentTime > 0.05) video.currentTime = 0;
    };
    if (video.readyState >= 1) onLoadedMetadata();
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('playing', onPlay);
    video.addEventListener('pause', onPause);

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : video.pause()), { threshold: 0.05 });
    io.observe(video);
    const onVisibility = () => (document.hidden ? video.pause() : play());
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('playing', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (playing) {
      wantsPlay.current = false;
      video.pause();
    } else {
      wantsPlay.current = true;
      video.play().catch(() => {});
    }
  };

  return (
    <section className="hero" aria-label="Loop St. at night">
      <video
        ref={videoRef}
        className="hero__film"
        muted
        loop
        playsInline
        autoPlay={wantsPlay.current}
        preload={wantsPlay.current ? 'auto' : 'none'}
        poster={asset('media/video/loop-film-poster-1280.webp')}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      >
        <source src={asset('media/video/loop-film-854.mp4')} type="video/mp4" media="(max-width: 720px)" />
        <source src={asset('media/video/loop-film-1280.webm')} type="video/webm" />
        <source src={asset('media/video/loop-film-1280.mp4')} type="video/mp4" />
      </video>
      <div className="hero__intro">
        <p className="hero__sentence">
          A candlelit courtyard restaurant and bar on the Bult in Potchefstroom, with live music under the tree.
        </p>
        <Magnet padding={40} magnetStrength={6} wrapperClassName="hero__action">
          <a className="button" href={site.phone.whatsapp} target="_blank" rel="noreferrer">
            Book on WhatsApp
          </a>
        </Magnet>
      </div>
      <button type="button" className="hero__toggle link" onClick={toggle} aria-pressed={!playing}>
        {playing ? 'Pause film' : 'Play film'}
      </button>
    </section>
  );
}
