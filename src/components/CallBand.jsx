import { site } from '../data/site.js';
import { Reveal } from './Reveal.jsx';
import './call-band.css';

// The booking line as display type, in the inverse of the page's colours.
export default function CallBand() {
  return (
    <section className="call" aria-labelledby="call-title">
      <div className="call__inner wrap">
        <Reveal className="call__top">
          <h2 id="call-title" className="call__lead t-lead">
            Book a table, a function or show tickets on WhatsApp.
          </h2>
        </Reveal>
        <a
          className="call__number t-display tnum"
          href={site.phone.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label={`WhatsApp ${site.phone.display}`}
        >
          {site.phone.display}
        </a>
        <div className="call__foot">
          <p>
            {site.address.street}, {site.address.town} {site.address.postcode}
            <br />
            <a href={`tel:${site.phone.tel}`}>Call {site.phone.display}</a>
          </p>
          <p className="call__social">
            <a className="link" href={site.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="link" href={site.social.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a className="link" href={`mailto:${site.email}?subject=${encodeURIComponent('Booking at Loop St.')}`}>
              Email
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
