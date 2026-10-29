import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import WhatsOn from '../components/WhatsOn.jsx';
import PriceList from '../components/PriceList.jsx';
import Picture from '../components/Picture.jsx';
import CallBand from '../components/CallBand.jsx';
import { Heading, Reveal, RevealPicture } from '../components/Reveal.jsx';
import { functions, pastEvents } from '../data/events.js';
import { specials } from '../data/specials.js';
import { site } from '../data/site.js';
import { longDate } from '../lib/time.js';
import { scrollToTarget } from '../lib/motion.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import './events-page.css';

const functionMail = `mailto:${site.email}?subject=${encodeURIComponent('Function at Loop St.')}&body=${encodeURIComponent(
  'Hi Loop St.,\n\nWe would like to book a function.\n\nDate:\nNumber of guests:\nKind of event:\n\nThank you'
)}`;

export default function EventsPage() {
  usePageMeta({
    title: 'Events & specials | Loop St., Potchefstroom',
    description: 'Live music, quiz nights and shows at Loop St. in Potchefstroom, plus happy hour 17:00–19:00 and the blackboard specials.'
  });
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) scrollToTarget(el, { offset: -80, immediate: true });
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <PageHead
        title="Events & specials"
        sentence="Live music on the courtyard stage, quiz nights and the blackboard. Book on WhatsApp 082 571 8557."
        film
      />

      <WhatsOn id="upcoming" heading="Coming up" more={false} />

      <PriceList
        id="specials"
        heading="Specials"
        intro="Have a look at the blackboard for specials. These are the boards as last chalked up; prices change, so check in on the night."
        photo="sweet-treats-board"
        groups={specials}
      />

      <section className="functions section wrap" aria-labelledby="functions-title">
        <div className="grid">
          <RevealPicture className="functions__photo">
            <Picture slug="courtyard-function" sizes="(max-width: 899px) 100vw, 50vw" />
          </RevealPicture>
          <div className="functions__text">
            <Heading id="functions-title" text="Host your function here" className="t-head" />
            <Reveal order={1}>
              <p>
                The fireplace inside suits winter dinners; the deck and the courtyard under the tree suit summer nights. Seating moves
                to fit the occasion.
              </p>
            </Reveal>
            <Reveal order={2}>
              <ul className="functions__list">
                {functions.map(f => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal order={3} className="functions__actions">
              <a className="button" href={site.phone.whatsapp} target="_blank" rel="noreferrer">
                Ask on WhatsApp
              </a>
              <a className="link link--arrow" href={functionMail}>
                Or email us <span className="arrow">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="past section wrap" aria-labelledby="past-title">
        <div className="grid">
          <div className="past__head">
            <Heading id="past-title" text="Recently at Loop" className="t-head" />
          </div>
          <ul className="past__list">
            {pastEvents.map(e => (
              <li key={e.title} className="past__row">
                <span className="t-lead">{e.title}</span>
                <span className="muted">{[e.date ? longDate(e.date) : null, e.note].filter(Boolean).join(' · ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallBand />
    </>
  );
}
