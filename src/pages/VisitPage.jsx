import PageHead from '../components/PageHead.jsx';
import Picture from '../components/Picture.jsx';
import Tonight from '../components/Tonight.jsx';
import CallBand from '../components/CallBand.jsx';
import { Heading, Reveal, RevealPicture } from '../components/Reveal.jsx';
import { happyHour, hours, site } from '../data/site.js';
import { nowAtLoop, timeLabel } from '../lib/time.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import './visit-page.css';

// Monday last, the way a week reads on a door.
const WEEK = [2, 3, 4, 5, 6, 0, 1];

export default function VisitPage() {
  usePageMeta({
    title: 'Visit | Loop St., 37 Loop St, Potchefstroom',
    description:
      'Loop St. is at 37 Loop St, Potchefstroom 2531, the last address on the left before the Fanie du Toit rugby fields. Open Tuesday to Saturday 13:00 to midnight, Sunday 15:00 to 22:00.'
  });
  const today = nowAtLoop().dow;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent('Loop St, 37 Loop St, Potchefstroom, 2531')}&ll=${site.address.lat},${site.address.lng}&z=16&output=embed`;

  return (
    <>
      <PageHead
        title="Visit Loop St."
        sentence="37 Loop St, Potchefstroom: the last address on your left before the Fanie du Toit rugby fields of the NWU Pukke."
        photo="the-steps"
      >
        <Tonight large />
      </PageHead>

      <section className="visit section wrap" aria-labelledby="hours-title">
        <div className="grid">
          <div className="visit__hours">
            <Heading id="hours-title" text="Opening hours" className="t-head" />
            <Reveal order={1}>
              <table className="hours">
                <caption className="sr-only">Opening hours, South African time</caption>
                <tbody>
                  {WEEK.map(d => {
                    const h = hours[d];
                    return (
                      <tr key={h.day} className={d === today ? 'is-today' : ''}>
                        <th scope="row">
                          {h.day}
                          {d === today && <span className="hours__today"> today</span>}
                        </th>
                        <td className="tnum">{h.open ? `${h.open} to ${timeLabel(h.close)}` : 'Closed'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Reveal>
            <Reveal order={2}>
              <p className="visit__note">
                Happy hour {happyHour.start} to {happyHour.end}. No under 21s.
              </p>
            </Reveal>
          </div>

          <div className="visit__map">
            <Reveal order={1}>
              <iframe
                title="Map of Loop St., 37 Loop St, Potchefstroom"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
            <a className="button button--quiet visit__map-cta" href={site.mapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="arrive section wrap" aria-labelledby="arrive-title">
        <Heading id="arrive-title" text="Up the steps, then" className="t-head arrive__title" />
        <ul className="arrive__list">
          {[
            ['courtyard-beer-board', 'The courtyard, with the beer board at the door'],
            ['the-tree', 'The deck under the tree, over the Fanie du Toit fields'],
            ['bar-at-night', 'The bar, and the fireplace inside for winter']
          ].map(([slug, caption], i) => (
            <li key={slug}>
              <RevealPicture order={i}>
                <Picture slug={slug} sizes="(max-width: 899px) 100vw, 30vw" />
              </RevealPicture>
              <p className="arrive__caption">{caption}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="getting section wrap" aria-labelledby="getting-title">
        <div className="grid">
          <div className="getting__head">
            <Heading id="getting-title" text="Getting here" className="t-head" />
          </div>
          <dl className="getting__list">
            <div>
              <dt>Address</dt>
              <dd>
                {site.address.street}, {site.address.area}, {site.address.town} {site.address.postcode}
              </dd>
            </div>
            <div>
              <dt>Finding the door</dt>
              <dd>{site.address.directions} Look for the lamp-lit brick steps.</dd>
            </div>
            <div>
              <dt>Parking</dt>
              <dd>There is parking for about 10 cars. Carpool if you can: it is better on the parking, the environment and your wallet.</dd>
            </div>
            <div>
              <dt>Bookings and tickets</dt>
              <dd>
                <a href={site.phone.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp {site.phone.display}
                </a>
                , or call the same number. Some shows sell tickets at the door.
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Follow</dt>
              <dd>
                <a href={site.social.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>{' '}
                for line-ups and specials, and{' '}
                <a href={site.social.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                .
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CallBand />
    </>
  );
}
