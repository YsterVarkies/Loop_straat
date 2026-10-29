import { Link } from 'react-router-dom';
import Picture from './Picture.jsx';
import { Heading, Reveal, RevealPicture } from './Reveal.jsx';
import './menu-index.css';

// A teaser, not the menu: a sentence about the food and one clear way through to the real thing,
// so nobody mistakes this short section for the whole menu.
export default function MenuIndex() {
  return (
    <section className="menu-index section wrap" aria-labelledby="menu-index-title">
      <div className="grid menu-index__grid">
        <div className="menu-index__text">
          <Heading id="menu-index-title" text="On the menu" className="t-head" />
          <Reveal order={1}>
            <p className="menu-index__intro">
              Homemade kudu burgers, Loop-style tacos and plates to share, made with an African zest and spiced with
              international inspiration, from locally sourced, seasonal ingredients.
            </p>
          </Reveal>
          <Reveal order={2}>
            <Link to="/menu" className="button menu-index__cta">
              View the full menu
            </Link>
          </Reveal>
        </div>
        <RevealPicture order={1} className="menu-index__photo">
          <Picture slug="the-bar" sizes="(max-width: 899px) 100vw, 40vw" />
        </RevealPicture>
      </div>
    </section>
  );
}
