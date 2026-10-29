import { useEffect, useState } from 'react';
import Candle from './Candle.jsx';
import { happyHourStatus, nowAtLoop, openStatus, shortDate, timeLabel, tonightsEvent, upcomingEvents } from '../lib/time.js';
import './tonight.css';

const openingLine = s => {
  if (s.open) return `Open now, until ${timeLabel(s.closes)}`;
  if (!s.opens) return 'Closed';
  return `Closed now, opens ${s.when} at ${s.opens}`;
};

const happyLine = h => {
  if (!h) return null;
  if (h.state === 'now') return `Happy hour is on until ${h.end}.`;
  if (h.state === 'later') return `Happy hour today from ${h.start} to ${h.end}.`;
  return `Happy hour was ${h.start} to ${h.end}.`;
};

// The live line: whether the candles are lit at Loop St. right now, in Potchefstroom time,
// what happy hour is doing, and what is on tonight or next.
export default function Tonight({ large = false }) {
  const [now, setNow] = useState(() => nowAtLoop());
  useEffect(() => {
    const id = setInterval(() => setNow(nowAtLoop()), 30000);
    return () => clearInterval(id);
  }, []);

  const status = openStatus(now);
  const happy = happyLine(happyHourStatus(now));
  const tonight = tonightsEvent(now);
  const next = upcomingEvents(now).find(e => e.date > now.iso);

  return (
    <div className={`tonight ${large ? 'tonight--large' : ''}`}>
      <Candle lit={status.open} size={large ? 96 : 80} />
      <div className="tonight__text" aria-live="polite">
        <p className="tonight__status t-lead">{openingLine(status)}</p>
        <p className="tonight__detail">
          {happy && <span>{happy} </span>}
          {tonight ? (
            <span>
              Tonight: <strong>{tonight.title}</strong>, {tonight.start}, {tonight.price}.
            </span>
          ) : next ? (
            <span>
              Next up: <strong>{next.title}</strong>, {shortDate(next.date)}.
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
