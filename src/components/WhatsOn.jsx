import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Picture from './Picture.jsx';
import Tonight from './Tonight.jsx';
import { Heading, Reveal } from './Reveal.jsx';
import { regulars } from '../data/events.js';
import { site } from '../data/site.js';
import { nowAtLoop, relativeDay, upcomingEvents } from '../lib/time.js';
import { useStagger } from '../lib/useStagger.js';
import { asset } from '../lib/asset.js';
import './whats-on.css';

const fromEvent = (e, now) => ({
  id: e.id,
  title: e.title,
  when: `${relativeDay(e.date, now)} · ${e.start}`,
  meta: [e.kind, e.price, e.tickets].filter(Boolean).join(' · '),
  blurb: e.blurb,
  photo: e.photo,
  poster: e.poster,
  book: true
});

const fromRegular = r => ({
  id: r.id,
  title: r.title,
  when: r.when,
  meta: null,
  blurb: r.blurb,
  photo: r.photo,
  book: false
});

// Sticky photograph, active list: the photograph on the left follows the row you point at,
// focus or scroll to the middle of the screen. Upcoming shows first, then the regular nights.
export default function WhatsOn({
  id = 'whats-on',
  heading = 'Upcoming events',
  headingAs = 'h2',
  regularsToo = true,
  more = true,
  first = false
}) {
  const items = useMemo(() => {
    const now = nowAtLoop();
    return [...upcomingEvents(now).map(e => fromEvent(e, now)), ...(regularsToo ? regulars.map(fromRegular) : [])];
  }, [regularsToo]);
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  useStagger(listRef, '.whats-on__row', { deps: [items] });

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('[data-row]');
    if (!rows?.length) return undefined;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(Number(e.target.dataset.row))),
      { rootMargin: '-46% 0px -46% 0px' }
    );
    rows.forEach(r => io.observe(r));
    return () => io.disconnect();
  }, [items]);

  return (
    <section className={`whats-on section wrap ${first ? 'whats-on--first' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="grid whats-on__grid">
        <div className="whats-on__intro">
          <Heading as={headingAs} id={`${id}-title`} text={heading} className="t-head whats-on__title" />
          <Reveal order={1} className="whats-on__tonight">
            <Tonight />
          </Reveal>
        </div>
        {/* The outer column stretches to the full height of the intro + list beside it, so the
            sticky photo inside has somewhere to stick while the rows scroll past. */}
        <div className="whats-on__photo-col">
          <div className="whats-on__photo" aria-hidden="true">
            {items.map((item, i) =>
              item.poster ? (
                <picture key={item.id} className={`whats-on__poster ${i === active ? 'is-on' : ''}`}>
                  <img src={asset(item.poster)} alt="" loading={i < 2 ? 'eager' : 'lazy'} />
                </picture>
              ) : (
                <Picture
                  key={item.id}
                  slug={item.photo}
                  sizes="(max-width: 899px) 100vw, 34vw"
                  className={i === active ? 'is-on' : ''}
                  alt=""
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              )
            )}
          </div>
        </div>
        <div className="whats-on__rows">
            <ul className="whats-on__list" ref={listRef}>
              {items.map((item, i) => (
                <li
                  key={item.id}
                  data-row={i}
                  className={`whats-on__row ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                >
                  <button
                    type="button"
                    className="whats-on__head"
                    aria-expanded={i === active}
                    aria-controls={`${id}-${item.id}`}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="whats-on__name t-lead">{item.title}</span>
                    <span className="whats-on__when t-small">{item.when}</span>
                  </button>
                  <div id={`${id}-${item.id}`} className="whats-on__desc" hidden={i !== active}>
                    {item.meta && <p className="whats-on__meta">{item.meta}</p>}
                    <p>{item.blurb}</p>
                    {item.book && (
                      <a className="link link--arrow t-small" href={site.phone.whatsapp} target="_blank" rel="noreferrer">
                        WhatsApp {site.phone.display} <span className="arrow">→</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          {more && (
            <Reveal order={3}>
              <Link to="/events" className="link link--arrow whats-on__more">
                All events and specials <span className="arrow">→</span>
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
