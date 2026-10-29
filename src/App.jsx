import { useEffect, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Rail from './components/Rail.jsx';
import HeroFilm from './components/HeroFilm.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import MenuPage from './pages/MenuPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import VisitPage from './pages/VisitPage.jsx';
import NotFound from './pages/NotFound.jsx';
import { ScrollTrigger, getLenis, startSmoothScroll } from './lib/motion.js';

export default function App() {
  const { pathname, hash } = useLocation();
  const home = pathname === '/';

  useEffect(() => {
    startSmoothScroll();
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  // Each page starts at the top; ScrollTrigger re-measures once the new page and its fonts have settled.
  useLayoutEffect(() => {
    if (!hash) {
      getLenis()?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
    };
  }, [pathname, hash]);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {home && <HeroFilm />}
      <Rail home={home} key={home ? 'home' : 'page'} />
      {/* The rail is fixed and out of flow, so every page but the home hero needs to clear it. */}
      <main id="main" tabIndex={-1} className={home ? undefined : 'has-fixed-rail'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/visit" element={<VisitPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
