import { Link } from 'react-router-dom';
import WhatsOn from '../components/WhatsOn.jsx';
import PriceList from '../components/PriceList.jsx';
import ArchWalk from '../components/ArchWalk.jsx';
import MenuIndex from '../components/MenuIndex.jsx';
import Staggered from '../components/Staggered.jsx';
import Statement from '../components/Statement.jsx';
import CallBand from '../components/CallBand.jsx';
import { Heading, Reveal } from '../components/Reveal.jsx';
import { specials } from '../data/specials.js';
import { usePageMeta } from '../lib/usePageMeta.js';

const HOME_SPECIALS = specials.filter(s => ['happy-hour', 'beer-board', 'drink-of-the-day', 'weekly'].includes(s.id));

export default function Home() {
  usePageMeta({
    title: 'Loop St. | Restaurant & bar, 37 Loop St, Potchefstroom',
    description:
      'A candlelit courtyard restaurant and bar in Potchefstroom with live music, craft beer, cocktails and homemade kudu burgers. Tonight’s show, specials and the menu.'
  });

  return (
    <>
      <WhatsOn first />

      <PriceList
        id="specials"
        heading="Specials"
        intro="Have a look at the blackboard for specials. This is what it said last time we looked."
        photo="beer-board"
        groups={HOME_SPECIALS}
      >
        <Link to="/events#specials" className="link link--arrow prices__more">
          Every special and the sweet treats board <span className="arrow">→</span>
        </Link>
      </PriceList>

      <ArchWalk />

      <MenuIndex />

      <section className="nights section wrap" aria-labelledby="nights-title">
        <div className="nights__head">
          <Heading id="nights-title" text="Nights at Loop" className="t-head" />
          <Reveal order={1}>
            <Link to="/gallery" className="link link--arrow">
              More photographs <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
        <Staggered slugs={['tree-acoustic-set', 'deck-applause', 'accordion-duo', 'sweet-treats-board']} />
      </section>

      <section className="home-about section wrap" aria-labelledby="home-about-title">
        <div className="grid">
          <div className="home-about__head">
            <Heading id="home-about-title" text="A social hub for social creatures" className="t-head" />
          </div>
          <div className="home-about__body">
            <Statement>
              Throughout history one thing has stayed the same: social gatherings are best when food and drinks are involved.
            </Statement>
            <Reveal order={2}>
              <p className="home-about__text">
                Loop St. is a contemporary casual restaurant and bar by Kraught Republique, with a fireplace inside and a deck under the
                trees by the Fanie du Toit fields. Everyone is welcome, as long as you are lekker.
              </p>
            </Reveal>
            <Reveal order={3}>
              <Link to="/about" className="link link--arrow">
                Our story <span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CallBand />
    </>
  );
}
