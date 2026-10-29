import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import Picture from '../components/Picture.jsx';
import Statement from '../components/Statement.jsx';
import Firsts from '../components/Firsts.jsx';
import CallBand from '../components/CallBand.jsx';
import { Heading, Reveal, RevealPicture } from '../components/Reveal.jsx';
import { site } from '../data/site.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import './about-page.css';

export default function AboutPage() {
  usePageMeta({
    title: 'About | Loop St. by Kraught Republique, Potchefstroom',
    description:
      'Kraught Republique brings you Loop St.: a contemporary casual restaurant and bar on the Bult in Potchefstroom, started by Riaan May and Mitchell Coetzee.'
  });

  return (
    <>
      <PageHead
        title="About Loop St."
        sentence="Kraught Republique brings you Loop St.: a social hub for social creatures on the Bult in Potchefstroom."
        photo="the-steps"
      />

      <section className="story section wrap" aria-labelledby="story-title">
        <div className="grid">
          <div className="story__head">
            <Heading id="story-title" text="Food, drinks and good company" className="t-head" />
          </div>
          <div className="story__body">
            <Statement>
              Our ancestors and ourselves share a commonality: we are all social creatures, and social gatherings are best when food and
              drinks are involved.
            </Statement>
            <div className="story__columns">
              <Reveal order={1}>
                <p>
                  Loop St. is the work of Riaan May and Mitchell Coetzee, two locals who wanted a farm-to-table place that celebrates the
                  North West’s own produce. The menu follows the seasons and changes through the year: homemade kudu patties, smoked
                  pulled meats and Loop-style tacos, made with an African zest and spiced with international inspiration.
                </p>
              </Reveal>
              <Reveal order={2}>
                <p>
                  The bar pours craft cocktails and collectible brews. In the words of the house: although we do not Kraught them
                  ourselves (for now), we look for the coolest bottles we can find. Loop St. also houses a coffee roastery, run by
                  Mitchell Coetzee of Common Ground Coffees.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Firsts />

      <section className="willow section wrap" aria-labelledby="willow-title">
        <div className="grid">
          <RevealPicture className="willow__photo">
            <Picture slug="the-tree" sizes="(max-width: 899px) 100vw, 45vw" />
          </RevealPicture>
          <div className="willow__text">
            <Heading id="willow-title" text="Potgieter’s willow" className="t-head" />
            <Reveal order={1}>
              <p>
                When Andries Hendrik Potgieter planted his willow tree in Potchefstroom, he imagined a future where he could grab an
                ice-cold beer with amazing food at a place like Loop St. That willow is the tree inside the arch of our logo.
              </p>
            </Reveal>
            <Reveal order={2}>
              <p>
                Everyone has the right to socialise here, whatever their background, as long as you are lekker. We want quality
                entertainment with a feel-at-home vibe.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="house section wrap" aria-labelledby="house-title">
        <div className="grid">
          <div className="house__head">
            <Heading id="house-title" text="Good to know" className="t-head" />
          </div>
          <dl className="house__list">
            <div>
              <dt>Age</dt>
              <dd>No under 21s.</dd>
            </div>
            <div>
              <dt>Parking</dt>
              <dd>Room for about 10 cars, so carpool: better on the parking, the environment and your wallet.</dd>
            </div>
            <div>
              <dt>Inside and out</dt>
              <dd>A fireplace inside for winter, and a deck overlooking the Fanie du Toit sports grounds.</dd>
            </div>
            <div>
              <dt>Bread and pastries</dt>
              <dd>
                From our bakery,{' '}
                <a href={site.social.bakery} target="_blank" rel="noreferrer">
                  Loop Coffee &amp; Bakery
                </a>
                . Its hours are on its Instagram.
              </dd>
            </div>
            <div>
              <dt>Spend</dt>
              <dd>About {site.priceRange}.</dd>
            </div>
          </dl>
          <Reveal className="house__more">
            <Link to="/visit" className="link link--arrow">
              Hours and directions <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CallBand />
    </>
  );
}
