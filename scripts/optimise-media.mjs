// Turns the raw files in /Media into web-sized assets in /public/media.
//   npm run media            photos + logo
//   npm run media -- --video also rebuilds the hero film (slow, about a minute)
// Writes src/data/media.json with each photo's size, widths and placeholder colour.
//
// Needs the raw /Media folder (the original photos and the Jan Blohm film), which lives outside
// this repo (it's large and not checked in). public/media/ already has everything the site
// serves, so this script only needs to run again when the raw media changes.

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = path.join(ROOT, 'Media');
const OUT = path.join(ROOT, 'public', 'media');
const WIDTHS = [480, 800, 1200, 1600, 2048];

// Source file → slug. Alt text and captions live in src/data/photos.js.
const PHOTOS = [
  ['submain.png', 'the-bar'],
  ['submain2.png', 'the-tree'],
  ['submain3.png', 'the-steps'],
  ['Screenshot 2026-10-29 113845.png', 'courtyard-beer-board'],
  ['Screenshot 2026-10-29 113947.png', 'bar-red-wine'],
  ['inside.png', 'bar-at-night'],
  ['468333657_595977856202471_1568209192457596032_n.jpg', 'courtyard-function'],
  ['481702675_651508687378850_2059629239938247240_n.jpg', 'white-wine-table'],
  ['486859753_667177125812006_6669610316518602894_n.jpg', 'tree-acoustic-set'],
  ['494294795_693254803204238_8746804718182204048_n.jpg', 'deck-applause'],
  ['504885415_18045499349553716_1752595663618595831_n.jpg', 'stage-lamp'],
  ['505118614_18045499295553716_1835595416037897628_n.jpg', 'courtyard-guitarist'],
  ['505938516_18045499322553716_5623750457945840709_n.jpg', 'accordion-duo'],
  ['566249105_18059432585553716_7028160335104751858_n.jpg', 'sweet-treats-board'],
  ['566380625_18059432639553716_3740094498466852451_n.jpg', 'after-the-show'],
  ['566625424_18059432462553716_1898186748413080455_n.jpg', 'two-guitars'],
  ['567124578_18059432612553716_8532680650604837757_n.jpg', 'listening'],
  ['567419360_18059432471553716_5701093689340584235_n.jpg', 'duo-closeup'],
  ['567419549_18059432558553716_1837727256701142083_n.jpg', 'beer-board'],
  ['567424644_18059432603553716_6159305642957889662_n.jpg', 'photographer'],
  ['568140702_18059432492553716_2136099862208414469_n.jpg', 'front-row']
];

const VIDEO_SRC = 'Jan Blohm deel Breyten se Brief met n nuwe kontemporere Suid Afrikaanse gees.So ervaring definie.mp4';

const hex = ({ r, g, b }) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');

async function photos() {
  await mkdir(path.join(OUT, 'img'), { recursive: true });
  const manifest = {};
  for (const [file, slug] of PHOTOS) {
    const input = path.join(SRC, file);
    const meta = await sharp(input).metadata();
    const widths = WIDTHS.filter(w => w < meta.width);
    widths.push(Math.min(meta.width, 2048));
    const base = sharp(input).rotate().removeAlpha();
    for (const w of widths) {
      const resized = base.clone().resize({ width: w, withoutEnlargement: true });
      await resized.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(OUT, 'img', `${slug}-${w}.avif`));
      await resized.clone().webp({ quality: 74 }).toFile(path.join(OUT, 'img', `${slug}-${w}.webp`));
    }
    const fallback = widths.find(w => w >= 1200) || widths[widths.length - 1];
    await base
      .clone()
      .resize({ width: fallback, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUT, 'img', `${slug}-${fallback}.jpg`));
    const { channels } = await sharp(input).removeAlpha().resize(8, 8, { fit: 'cover' }).stats();
    const color = hex({ r: channels[0].mean * 0.7, g: channels[1].mean * 0.7, b: channels[2].mean * 0.7 });
    manifest[slug] = { w: meta.width, h: meta.height, widths, fallback, color };
    console.log(`photo ${slug}: ${widths.join(', ')}`);
  }
  await writeFile(path.join(ROOT, 'src', 'data', 'media.json'), JSON.stringify(manifest, null, 2) + '\n');
}

// The logo is cream line art on black. Its brightness becomes the alpha channel so the mark sits on any dark ground.
async function logo() {
  await mkdir(path.join(OUT, 'logo'), { recursive: true });
  const cream = { r: 244, g: 234, b: 214 };
  const cut = async (region, size, name, inside = () => true) => {
    let img = sharp(path.join(SRC, 'Logo.jpg'));
    if (region) img = img.extract(region);
    const { data, info } = await img.resize(size, size, { fit: 'inside' }).greyscale().raw().toBuffer({ resolveWithObject: true });
    const rgba = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
      const x = (i % info.width) / info.width;
      const y = Math.floor(i / info.width) / info.height;
      const a = inside(x, y) ? Math.max(0, Math.min(255, ((data[i] - 18) / (225 - 18)) * 255)) : 0;
      rgba[i * 4] = cream.r;
      rgba[i * 4 + 1] = cream.g;
      rgba[i * 4 + 2] = cream.b;
      rgba[i * 4 + 3] = a;
    }
    const raw = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } });
    await raw.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo', `${name}.png`));
    await raw.clone().webp({ quality: 90, alphaQuality: 90 }).toFile(path.join(OUT, 'logo', `${name}.webp`));
  };
  await cut(null, 160, 'loop-logo-160');
  await cut(null, 320, 'loop-logo-320');
  await cut(null, 640, 'loop-logo-640');
  // The willow inside the arch, used as a texture in the 3D doorway. The mask keeps the inner
  // opening of the arch (a semicircle over a rectangle) and drops the stippled band around it.
  const opening = (x, y) => {
    const px = x * 448;
    const py = y * 560;
    if (py < 212) return (px - 225) ** 2 + (py - 212) ** 2 < 196 ** 2;
    return px > 29 && px < 421;
  };
  await cut({ left: 800, top: 500, width: 448, height: 560 }, 512, 'loop-willow', opening);
  // Icons keep the black ground.
  await sharp(path.join(SRC, 'Logo.jpg')).resize(64, 64).png().toFile(path.join(ROOT, 'public', 'favicon.png'));
  await sharp(path.join(SRC, 'Logo.jpg')).resize(180, 180).png().toFile(path.join(ROOT, 'public', 'apple-touch-icon.png'));
  console.log('logo done');
}

function ff(args) {
  const run = spawnSync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (run.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '));
}

async function video() {
  const dir = path.join(OUT, 'video');
  await mkdir(dir, { recursive: true });
  const input = path.join(SRC, VIDEO_SRC);
  // The whole film, from its own first frame, just scaled, muted and compressed for the web.
  const h264 = (width, crf, name) =>
    ff([
      '-i', input,
      '-vf', `scale=${width}:-2,format=yuv420p`,
      '-an',
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-crf', String(crf),
      '-preset', 'slow',
      '-movflags', '+faststart',
      path.join(dir, name)
    ]);
  h264(1280, 28, 'loop-film-1280.mp4');
  h264(854, 29, 'loop-film-854.mp4');
  ff(['-i', input, '-vf', 'scale=1280:-2', '-an', '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4', path.join(dir, 'loop-film-1280.webm')]);
  // Poster is the film's own first frame, so nothing jumps when playback starts.
  const frame = path.join(dir, 'poster.png');
  ff(['-i', input, '-frames:v', '1', frame]);
  for (const w of [854, 1280]) {
    await sharp(frame).resize({ width: w }).avif({ quality: 50 }).toFile(path.join(dir, `loop-film-poster-${w}.avif`));
    await sharp(frame).resize({ width: w }).webp({ quality: 72 }).toFile(path.join(dir, `loop-film-poster-${w}.webp`));
    await sharp(frame).resize({ width: w }).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(dir, `loop-film-poster-${w}.jpg`));
  }
  const { rmSync } = await import('node:fs');
  rmSync(frame);
  console.log('video done (full film, from 0:00)');
}

await mkdir(path.join(ROOT, 'src', 'data'), { recursive: true });
await photos();
await logo();
if (process.argv.includes('--video') || !existsSync(path.join(OUT, 'video', 'loop-film-1280.mp4'))) await video();
