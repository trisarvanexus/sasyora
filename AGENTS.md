# AGENTS.md

## Project overview

Sasyora is a single-page static marketing site for a farm-produce brand based in
**Karnataka, India**, marketed by **Trisarva Nexus**. Its first and only product is
**Elaneer**, a 330 ml tender coconut water, currently pre-launch.

The site is deployed via **GitHub Pages** to the domain in `CNAME` (`sasyora.com`).
Pushing to the default branch (`main`) publishes it.

## Tech stack

- Plain **HTML5**, **CSS3** and **vanilla JavaScript**. No framework, no build step,
  no package manager, no tests, no CI.
- Google Fonts: `Playfair Display` (headings) and `Poppins` (body).
- Deliberately zero-dependency. Do not introduce a bundler or framework unless asked.

## Files

- `index.html` — all markup, including an inline `<svg>` sprite of hand-authored
  `<symbol>` icons (ids prefixed `i-`) and one larger inline illustration.
- `styles.css` — all styling, mobile-first, organised into numbered comment sections.
- `script.js` — all behaviour, wrapped in an IIFE.
- `logo.png` — the original brand lockup as supplied (2816x1536, ~4 MB, white
  background). **Source of truth, not referenced by the page.** All web logo assets
  are derived from it.
- `logo-lockup.{png,webp}` — full lockup, transparent, centred on its optical axis.
- `logo-emblem.{png,webp}` — the wreath emblem alone, square.
- `favicon.png`, `favicon-32.png` — derived from the emblem.
- `elaneerbottle.jpeg` / `.webp` — the **packaging specification sheet** (front/back
  bottle renders plus PANTONE, CMYK, print specs, barcode, supplier names). Internal
  reference; **not shown on the site.**
- `elaneer-bottle.{png,webp}` — the front bottle cropped out of that sheet. This is
  the product image the page uses.

## Brand rules

- **Trademark**: `™` belongs only to the full lockup *Sasyora — Nature's Flavour
  Delivered*. It appears exactly three times: the header tagline, the footer tagline
  and the footer legal line. Bare "Sasyora" in prose takes no `™`, and **"Elaneer"
  never takes `™`**.
- **Elaneer** is the Kannada word for tender coconut. Do not describe it as Tamil.
- Positioning is Karnataka-first: Tumakuru, Tiptur, Hassan and Mandya are the sourcing
  districts. Pollachi (Tamil Nadu) is referenced only as a quality benchmark.
- Only tender coconut water exists as a product. The emblem also depicts honey, coffee
  berries and cacao, but those are **not** offered — the single line "More organic
  produce from the same farms will follow" is the only forward-looking claim. Do not
  reintroduce them as products.
- Nutrition figures come from the actual Elaneer label (19 kcal, 4.6 g carbohydrate,
  4.6 g natural sugars, 0 g fat, 0 g protein, 20 mg sodium, 250 mg potassium per
  100 ml). Keep them in sync with the label, and keep health claims soft.

## Imagery

No stock photography. Everything is either the brand's own asset or original artwork:
inline SVG (the Pollachi coconut grove scene, the icon sprite, the hero hills) and CSS
gradients. If a new visual is needed, draw it as SVG rather than sourcing a photo.

## CSS conventions

- Design tokens live in `:root`: colours sampled from the emblem (`--green-*`,
  `--honey`, `--berry`, `--cacao`, `--soil`), plus radii, shadows, and a fluid type
  scale (`--step--1` through `--step-5`). Reuse tokens; avoid hardcoded values.
- **Mobile-first.** Base rules target small screens; enhancements are added in
  `min-width` blocks at `36em`, `48em`, `64em` and `80em`. The drawer navigation
  becomes a horizontal bar at `64em`.
- Fluid `clamp()` typography means per-breakpoint font sizes are rarely needed.
- Card grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` so they reflow
  without media queries.
- `html` carries `overflow-x: hidden` **on purpose**: the closed nav drawer sits just
  off the right edge and is `position: fixed`, so `body`'s overflow cannot clip it.
  Removing this reintroduces a horizontal scroll on phones.
- SVG `<symbol>`s are recoloured through *inherited* `fill`/`stroke` on the `<use>` or
  its parent, because CSS selectors cannot reach inside a `use` shadow tree.

## JavaScript conventions

- One `IntersectionObserver` for reveal-on-scroll, another for the active nav link.
- A single `requestAnimationFrame`-throttled `scroll` listener handles the sticky
  header and the back-to-top button, toggling classes rather than inline styles.
- The drawer manages `aria-expanded`, `Escape` to close, a scrim, and a body scroll
  lock; crossing the `64em` breakpoint force-closes it so the lock cannot get stuck.
- Everything decorative is skipped under `prefers-reduced-motion: reduce`, and reveal
  targets are made visible immediately if `IntersectionObserver` is missing, so the
  page is never blank without JS.

## Working locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

For visual checks with headless Chrome, note two traps: it **clamps the viewport to a
500px minimum**, so a `--window-size=390` capture renders at 500 and looks clipped;
and it can hang for ~45s on the Google Fonts request unless you block those hosts with
`--host-resolver-rules`.

## Verification

There is no linter or test suite. Check changes in a browser at phone, tablet and
desktop widths, watching for horizontal overflow, keyboard focus order and contrast.
