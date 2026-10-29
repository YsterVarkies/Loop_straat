import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Magnet from './reactbits/Magnet.jsx';
import { nav, site } from '../data/site.js';
import { asset } from '../lib/asset.js';
import { getLenis } from '../lib/motion.js';
import './rail.css';

// The rail: one bar carrying the name, the pages and the one action.
// On the home page it starts on the film's vertical centre and docks as the header as you scroll.
export default function Rail({ home = false }) {
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(!home);
  const railRef = useRef(null);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!home) {
      setDocked(true);
      return undefined;
    }
    // Mobile's hero is much shorter than desktop's, and the transparent bar over busy video is
    // harder to read there, so it solidifies much sooner — a small scroll, not most of the hero.
    const check = () => {
      const fraction = window.innerWidth <= 899 ? 0.12 : 0.6;
      setDocked(window.scrollY > window.innerHeight * fraction);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [home]);

  useEffect(() => {
    if (!open) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add('is-locked');
    const panel = panelRef.current;
    panel.querySelector('a')?.focus();
    const onKey = e => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') return;
      const items = [...panel.querySelectorAll('a, button')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-locked');
      lenis?.start();
    };
  }, [open]);

  function close() {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }

  const Title = home ? 'h1' : 'p';

  return (
    <header ref={railRef} className={`rail ${home ? 'rail--home' : ''} ${docked ? 'is-docked' : ''}`}>
      <div className="rail__bar">
        <Link to="/" className="rail__brand" aria-label={home ? undefined : 'Loop St. home'}>
          <img src={asset('media/logo/loop-logo-160.webp')} width="44" height="44" alt="" className="rail__logo" />
          <Title className="rail__title">
            Loop St. <span className="rail__what">restaurant &amp; bar</span>
          </Title>
        </Link>
        <nav className="rail__nav" aria-label="Pages">
          <ul>
            {nav.map(item => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Magnet padding={36} magnetStrength={5} wrapperClassName="rail__action">
          <a className="button button--small" href={site.phone.whatsapp} target="_blank" rel="noreferrer">
            Book a table
          </a>
        </Magnet>
        <button
          ref={toggleRef}
          type="button"
          className="rail__toggle"
          aria-expanded={open}
          aria-controls="site-pages"
          onClick={() => setOpen(true)}
        >
          <span className="rail__toggle-bars" aria-hidden="true" />
          <span className="sr-only">Open pages</span>
        </button>
      </div>

      <div
        id="site-pages"
        ref={panelRef}
        className="rail__panel"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Pages"
      >
        <div className="rail__panel-top">
          <span className="rail__panel-name">Loop St.</span>
          <button type="button" className="rail__close link" onClick={close}>
            Close
          </button>
        </div>
        <nav aria-label="Pages">
          <ul className="rail__panel-links">
            {nav.map(item => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="t-head">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="rail__panel-foot">
          <a className="button" href={site.phone.whatsapp} target="_blank" rel="noreferrer">
            Book on WhatsApp
          </a>
          <p className="muted">
            {site.address.street}, {site.address.town}. Tuesday to Saturday from 13:00, Sunday 15:00 to 22:00.
          </p>
        </div>
      </div>
    </header>
  );
}
