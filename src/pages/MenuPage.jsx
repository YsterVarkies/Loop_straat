import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import Picture from '../components/Picture.jsx';
import { PriceGroup } from '../components/PriceList.jsx';
import CallBand from '../components/CallBand.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { menuSections } from '../data/menu.js';
import { scrollToTarget } from '../lib/motion.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { useStagger } from '../lib/useStagger.js';
import '../components/prices.css';
import './menu-page.css';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten free', label: 'Gluten free' }
];

const PARTS = [
  { kind: 'food', title: 'Food', photo: 'sweet-treats-board' },
  { kind: 'drinks', title: 'Drinks', photo: 'bar-red-wine' }
];

const matches = filter => item => {
  if (filter === 'all') return true;
  const tags = item.tags || [];
  if (filter === 'vegetarian') return tags.includes('vegetarian') || tags.includes('vegan');
  return tags.includes(filter);
};

export default function MenuPage() {
  usePageMeta({
    title: 'Menu | Loop St., Potchefstroom',
    description:
      'The Loop St. menu: homemade kudu burgers, Loop-style tacos, nachos, the snack shack, house cocktails, mocktails, beer, wine, rum and brandy, with prices in rand.'
  });
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(menuSections[0].id);
  const bodyRef = useRef(null);
  useStagger(bodyRef, '.prices__group', { each: 0.05, deps: [filter] });

  const sections = useMemo(
    () => menuSections.map(s => ({ ...s, anchor: `menu-${s.id}` })).filter(s => (filter === 'all' ? true : s.items.some(matches(filter)))),
    [filter]
  );

  useEffect(() => {
    const groups = bodyRef.current?.querySelectorAll('.prices__group');
    if (!groups?.length) return undefined;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id.replace('menu-', ''))),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    groups.forEach(g => io.observe(g));
    return () => io.disconnect();
  }, [sections]);

  const jump = (e, anchor) => {
    e.preventDefault();
    const el = document.getElementById(anchor);
    if (el) scrollToTarget(el, { offset: -96 });
    history.replaceState(null, '', `#${anchor}`);
  };

  return (
    <>
      <PageHead
        title="The menu"
        sentence="Homemade kudu burgers, Loop-style tacos and plates to share, with house cocktails and a long rum shelf."
        photo="the-bar"
      >
        <div className="menu-filter" role="group" aria-label="Show dishes that are">
          {FILTERS.map(f => (
            <button
              key={f.id}
              type="button"
              className="button button--small button--quiet"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </PageHead>

      <section className="menu-page section wrap" aria-label="Menu">
        <div className="grid">
          <aside className="menu-page__index" aria-label="Menu sections">
            {PARTS.map(part => (
              <div key={part.kind} className="menu-page__part">
                <p className="menu-page__part-title">{part.title}</p>
                <ul>
                  {sections
                    .filter(s => s.kind === part.kind)
                    .map(s => (
                      <li key={s.id}>
                        <a
                          href={`#${s.anchor}`}
                          className={`menu-page__jump ${active === s.id ? 'is-active' : ''}`}
                          aria-current={active === s.id ? 'true' : undefined}
                          onClick={e => jump(e, s.anchor)}
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <Link to="/events#specials" className="link link--arrow t-small">
              Today’s specials are on the blackboard <span className="arrow">→</span>
            </Link>
          </aside>

          <div className="menu-page__body" ref={bodyRef}>
            {PARTS.map((part, index) => {
              const list = sections.filter(s => s.kind === part.kind);
              if (!list.length) return null;
              return (
                <div key={part.kind} className="menu-page__block">
                  {index === 1 && (
                    <div className="menu-page__interlude">
                      <Reveal>
                        <figure>
                          <Picture slug="beer-board" sizes="(max-width: 899px) 100vw, 40vw" />
                          <figcaption>The beer board by the braai</figcaption>
                        </figure>
                      </Reveal>
                      <Reveal order={1}>
                        <figure>
                          <Picture slug="white-wine-table" sizes="(max-width: 899px) 60vw, 22vw" />
                          <figcaption>Chenin by candlelight</figcaption>
                        </figure>
                      </Reveal>
                    </div>
                  )}
                  <div className="menu-page__block-head">
                    <h2 className="t-head">{part.title}</h2>
                    <Reveal className="menu-page__photo">
                      <Picture slug={part.photo} sizes="(max-width: 899px) 50vw, 18vw" />
                    </Reveal>
                  </div>
                  <div className="menu-page__columns">
                    {list.map(s => (
                      <PriceGroup key={s.id} group={s} as="h3" filter={matches(filter)} />
                    ))}
                  </div>
                </div>
              );
            })}
            {filter !== 'all' && (
              <p className="menu-page__filter-note muted">
                Showing dishes the menu marks {FILTERS.find(f => f.id === filter).label.toLowerCase()}. Ask us about anything else; the kitchen
                can often adapt a dish.
              </p>
            )}
            <p className="menu-page__small muted">
              Prices in rand and subject to change. Beer prices are as last chalked up on the board.
            </p>
          </div>
        </div>
      </section>

      <CallBand />
    </>
  );
}
