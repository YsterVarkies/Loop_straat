# Loop St. website

A multi-page site for **Loop St. by Kraught Republique** (Loopstraat), 37 Loop St, Potchefstroom.
React 19 + Vite, GSAP with ScrollTrigger, Lenis smooth scrolling, React Bits components, and a
react-three-fiber 3D scene.

Live at **https://<your-github-username>.github.io/Loop_straat/**.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5180 (Vite picks the next free port if that one's busy). `npm run build`
writes a static site to `dist/`; `npm run preview` serves that build on port 4173.

## Deploying to GitHub Pages

Pushing to `main` builds and publishes automatically via `.github/workflows/deploy.yml`, which
builds with `GITHUB_PAGES=true` (so Vite's `base` and the router's `basename` both switch to
`/Loop_straat/`) and pushes `dist/` to the `gh-pages` branch. The repo's Pages source is set to
deploy from that branch. `public/404.html` plus the small restore script in `index.html` handle
direct hits and refreshes on client-side routes (`/menu`, `/events`, …), since GitHub Pages has no
server-side rewrites.

To build for Pages by hand: `GITHUB_PAGES=true npm run build`.

## Pages

| Route | What is on it |
| --- | --- |
| `/` | The film, then **What's on** (tonight's status, upcoming shows, regular nights) and **Specials**, the 3D walk through the arch, the menu at a glance, photographs, the story, booking |
| `/menu` | The full menu by category, with a vegetarian / vegan / gluten-free filter |
| `/events` | Upcoming shows, regular nights, every special, private functions, recent shows |
| `/gallery` | All photographs, filterable, with a full-screen viewer |
| `/about` | Kraught Republique, the founders, Potchefstroom's firsts, the willow |
| `/visit` | Live open/closed status, hours, map, directions, parking, contact |

## Change the content

Everything a manager would update lives in `src/data/`:

- `events.js`: shows (`events`), regular nights (`regulars`), recent shows, function types. Shows disappear from the
  home page by themselves the day after their date.
- `specials.js`: happy hour, the blackboard boards, weekly specials.
- `menu.js`: every menu category and item, prices in rand (`price: null` shows "Ask us").
- `site.js`: address, phone, email, socials, opening hours, happy hour, navigation links.
- `photos.js`: alt text, captions, gallery groups and crop focus for each photo.

`CONTENT-SOURCES.md` lists what was verified against Loop St.'s own pages and what is a placeholder.

## Media

`public/media/` already has everything the site serves (images in AVIF/WebP/JPEG at several sizes,
the hero film, the logo). `scripts/optimise-media.mjs` regenerates it from a raw `Media/` folder
(the original photos and the Jan Blohm film) — that raw folder is large and isn't checked into this
repo, so the script only needs to run again if you're replacing the source media. With the raw
files restored to `Media/`: `npm run media` (photos + logo) or `npm run media -- --video` to also
rebuild the hero film (slow, about a minute; needs ffmpeg via the `ffmpeg-static` package).

## How it is built

- `src/components/Rail.jsx`: the fixed top nav bar; bigger wordmark on the home page.
- `src/components/HeroFilm.jsx`: muted, looping, inline film with a poster; pauses off screen, in background
  tabs and for reduced motion, and has a pause button. Shows the full, untrimmed film from 0:00.
- `src/components/Tonight.jsx`: the live line (open or closed right now in South African time, happy hour,
  tonight's show), with a candle that is lit while Loop St. is open.
- `src/components/ArchScene.jsx` / `ArchWalk.jsx`: the logo's arch, steps and willow in 3D (three.js via
  @react-three/fiber and drei), walked through as the section scrolls, finishing by opening onto a full-bleed
  photo of the bar interior. Loads only when the section approaches, falls back to flat photos without WebGL,
  and stands still for reduced motion.
- `src/components/reactbits/`: React Bits components (SplitText, ScrollReveal, AnimatedContent, Magnet) copied
  from reactbits.dev.
- `src/lib/motion.js`: Lenis smooth scroll on GSAP's ticker, shared with ScrollTrigger. Off for reduced motion.
- Type is Erode from Fontshare; colours and the five type sizes are in `src/styles/tokens.css`.

## Accessibility and motion

`prefers-reduced-motion: reduce` turns off smooth scrolling, the film (it shows its poster), the pinned 3D walk
(a still view with every caption), split-text and entrance animations, and CSS transitions. Every control has
a visible focus state, the pages menu on phones traps focus and closes on Escape, and the gallery viewer is a
native modal dialog.
