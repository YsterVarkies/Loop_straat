import { photo } from '../data/photos.js';
import { asset } from '../lib/asset.js';

// A photo from /Media in AVIF and WebP, with a JPEG fallback and its own placeholder colour.
export default function Picture({ slug, sizes = '100vw', className = '', imgClassName = '', alt, loading = 'lazy', priority }) {
  const p = photo(slug);
  if (!p) return null;
  const set = ext => p.widths.map(w => `${asset(`media/img/${slug}-${w}.${ext}`)} ${w}w`).join(', ');
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        className={imgClassName}
        src={asset(`media/img/${slug}-${p.fallback}.jpg`)}
        width={p.w}
        height={p.h}
        alt={alt ?? p.alt}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        style={{ backgroundColor: p.color, objectPosition: p.focus }}
      />
    </picture>
  );
}

// The smallest width of a photo that covers `px` device pixels, for textures.
export function photoUrl(slug, px = 800, ext = 'webp') {
  const p = photo(slug);
  const w = p.widths.find(width => width >= px) || p.widths[p.widths.length - 1];
  return asset(`media/img/${slug}-${w}.${ext}`);
}
