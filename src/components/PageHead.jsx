import Picture from './Picture.jsx';
import LoopFilm from './LoopFilm.jsx';
import { Heading, Reveal, RevealPicture } from './Reveal.jsx';
import './page-head.css';

// The first screen of an inner page: its title large on the left, one lit photograph (or the film) on the right.
export default function PageHead({ title, sentence, photo, film = false, children }) {
  return (
    <section className="page-head wrap" aria-labelledby="page-title">
      <div className="grid page-head__grid">
        <div className="page-head__text">
          <Heading as="h1" id="page-title" text={title} className="t-display page-head__title" trigger="load" />
          <Reveal order={2} trigger="mount">
            <p className="page-head__sentence t-lead">{sentence}</p>
          </Reveal>
          {children && (
            <Reveal order={3} trigger="mount" className="page-head__extra">
              {children}
            </Reveal>
          )}
        </div>
        {(photo || film) && (
          <RevealPicture order={1} className="page-head__photo">
            {film ? (
              <LoopFilm className="page-head__film" />
            ) : (
              <Picture slug={photo} sizes="(max-width: 899px) 100vw, 40vw" loading="eager" priority />
            )}
          </RevealPicture>
        )}
      </div>
    </section>
  );
}
