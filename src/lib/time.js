import { hours, happyHour } from '../data/site.js';
import { events } from '../data/events.js';

const ZONE = 'Africa/Johannesburg';
const toMinutes = hhmm => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const pad = n => String(n).padStart(2, '0');

// `?now=2026-10-29T19:30` previews the live line at another moment (South African time).
function previewDate() {
  if (typeof window === 'undefined') return null;
  const at = new URLSearchParams(window.location.search).get('now');
  if (!at || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(at)) return null;
  return new Date(`${at}:00+02:00`);
}

// The current date and time at Loop St., whatever the visitor's own time zone.
export function nowAtLoop(date = previewDate() || new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    })
      .formatToParts(date)
      .map(p => [p.type, p.value])
  );
  const y = Number(parts.year);
  const m = Number(parts.month);
  const d = Number(parts.day);
  return {
    iso: `${y}-${pad(m)}-${pad(d)}`,
    dow: new Date(Date.UTC(y, m - 1, d)).getUTCDay(),
    minutes: Number(parts.hour) * 60 + Number(parts.minute)
  };
}

export const timeLabel = hhmm => (hhmm === '24:00' ? 'midnight' : hhmm);

// Is Loop St. open right now, and if not, when does it open?
export function openStatus(now = nowAtLoop()) {
  const today = hours[now.dow];
  if (today.open) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (now.minutes >= open && now.minutes < close) {
      return { open: true, closes: today.close, minutesLeft: close - now.minutes };
    }
    if (now.minutes < open) return { open: false, opens: today.open, when: 'today' };
  }
  for (let k = 1; k <= 7; k++) {
    const day = hours[(now.dow + k) % 7];
    if (day.open) return { open: false, opens: day.open, when: k === 1 ? 'tomorrow' : day.day };
  }
  return { open: false };
}

export function happyHourStatus(now = nowAtLoop()) {
  if (!hours[now.dow].open) return null;
  const start = toMinutes(happyHour.start);
  const end = toMinutes(happyHour.end);
  if (now.minutes < start) return { state: 'later', ...happyHour };
  if (now.minutes < end) return { state: 'now', ...happyHour };
  return { state: 'done', ...happyHour };
}

export function upcomingEvents(now = nowAtLoop()) {
  return events.filter(e => e.date >= now.iso).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
}

export const tonightsEvent = (now = nowAtLoop()) => events.find(e => e.date === now.iso) || null;

const dayFmt = new Intl.DateTimeFormat('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
const longFmt = new Intl.DateTimeFormat('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// "Thu 29 Oct" from "2026-10-29".
export function shortDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return dayFmt.format(new Date(Date.UTC(y, m - 1, d))).replace(',', '');
}

export function longDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return longFmt.format(new Date(Date.UTC(y, m - 1, d))).replace(',', '');
}

export function relativeDay(iso, now = nowAtLoop()) {
  if (iso === now.iso) return 'Tonight';
  const [y, m, d] = iso.split('-').map(Number);
  const [ty, tm, td] = now.iso.split('-').map(Number);
  const diff = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(ty, tm - 1, td)) / 86400000);
  if (diff === 1) return 'Tomorrow';
  return shortDate(iso);
}
