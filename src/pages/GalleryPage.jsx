import { useCallback, useMemo, useState } from 'react';
import PageHead from '../components/PageHead.jsx';
import Staggered from '../components/Staggered.jsx';
import Lightbox from '../components/Lightbox.jsx';
import CallBand from '../components/CallBand.jsx';
import { galleryOrder, photos } from '../data/photos.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import './gallery-page.css';

const GROUPS = ['Everything', 'Music', 'Nights', 'The place', 'Food & drink'];

export default function GalleryPage() {
  usePageMeta({
    title: 'Gallery | Loop St., Potchefstroom',
    description: 'Photographs of Loop St.: live music under the tree, candlelit tables, the bar and the courtyard after dark.'
  });
  const [group, setGroup] = useState('Everything');
  const [open, setOpen] = useState(null);
  const slugs = useMemo(
    () => galleryOrder.filter(slug => group === 'Everything' || photos[slug].group === group),
    [group]
  );
  const move = useCallback(step => setOpen(i => (i === null ? i : (i + step + slugs.length) % slugs.length)), [slugs.length]);

  return (
    <>
      <PageHead
        title="Nights at Loop St."
        sentence="Music on the courtyard stage, a candle on every table, the bar and the tree after dark."
        photo="tree-acoustic-set"
      >
        <div className="gallery-filter" role="group" aria-label="Show photographs of">
          {GROUPS.map(g => (
            <button
              key={g}
              type="button"
              className="button button--small button--quiet"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </PageHead>

      <section className="gallery section wrap" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="t-head gallery__title">
          {group === 'Everything' ? 'Every photograph' : group}
          <span className="gallery__count muted t-small"> {slugs.length} photographs</span>
        </h2>
        <Staggered key={group} slugs={slugs} onOpen={setOpen} />
      </section>

      <Lightbox slugs={slugs} index={open} onClose={() => setOpen(null)} onMove={move} />
      <CallBand />
    </>
  );
}
