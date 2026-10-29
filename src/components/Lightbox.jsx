import { useEffect, useRef } from 'react';
import Picture from './Picture.jsx';
import { photo } from '../data/photos.js';
import { getLenis } from '../lib/motion.js';
import './lightbox.css';

// A photo at full size, in a native modal dialog. Arrow keys move through the set, Escape closes.
export default function Lightbox({ slugs, index, onClose, onMove }) {
  const ref = useRef(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) {
      dialog.showModal();
      getLenis()?.stop();
    }
    if (!open && dialog.open) dialog.close();
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => {
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onMove]);

  const p = open ? photo(slugs[index]) : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={p ? p.caption : 'Photo'}
      onClose={() => {
        getLenis()?.start();
        onClose();
      }}
      onClick={e => e.target === ref.current && ref.current.close()}
    >
      {p && (
        <figure className="lightbox__figure" key={p.slug}>
          <Picture slug={p.slug} sizes="92vw" loading="eager" className="lightbox__picture" />
          <figcaption className="lightbox__bar">
            <span>{p.caption}</span>
            <span className="lightbox__controls">
              <button type="button" className="link" onClick={() => onMove(-1)}>
                Previous
              </button>
              <button type="button" className="link" onClick={() => onMove(1)}>
                Next
              </button>
              <button type="button" className="link" onClick={() => ref.current.close()} autoFocus>
                Close
              </button>
            </span>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}
