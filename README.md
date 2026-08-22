# Navirize — React clone

A React re-implementation of the Navirize studio site
(`irresistible-hexagon-908698.framer.app`), originally published with Framer
from the "Pearl" template.

Every layout value in this build was **measured off the live original in
headless Chrome** — computed styles and `getBoundingClientRect()` at 1440×900
and 390×844, plus frame-by-frame sampling of its animation — rather than
inferred from the HTML.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 5 |
| UI | React 18 |
| Routing | react-router-dom 6 (8 routes, mirrors the original sitemap) |
| Motion | framer-motion 11 |
| Styling | Plain CSS with custom properties |

Bundle: **~105 KB gzipped JS**, vs **~243 KB** for the original's Framer runtime.
Rendered page height 5657px vs the original's 5969px at 1440 wide.

## What the measurement pass found

The first version of this clone was built by reading the HTML and inferring the
design. That was wrong in specific, visible ways. Rendering the original and
probing it turned up the following, all now corrected:

**Layout**
- Container is an 80px gutter over a **1280px** content width at 1440 (not 1200).
- Work grid is **1 full-bleed featured card + a 2-column grid of 3**, not a
  uniform 2×2. Featured aspect **1280×709 (1.805)**, grid cards **620×509
  (1.218)**, 40px gap.
- Card corner radius is **24px** (found three levels above the `<img>`), with a
  translucent circular arrow inset 20px from the frame's bottom-left.
- Sections use a repeating **3-column grid**: label at x=80 in a 272px column,
  content at x=352 capped at 795px, action button right-aligned to x=1360.
- The "Shaping Perception" section has **no images at all** — the first build
  invented a three-image collage that does not exist.
- Services is a **collapsed accordion** of four rows with a down-arrow, not a
  four-column list of 24 items.
- There is a centred chrome "N" brand mark between the last section and the footer.

**Type & colour**
- Scale: 64/76.8 · 40/56 · 24/33.6 · 18/25.2, Manrope 500 throughout.
- Section labels are **16px**, not 12px (the 12px reported belongs to the
  wrapping container, not the text).
- The hero eyebrow is **plain 16px black text** — not a bordered pill.
- Buttons: padding 16/32, radius 64px, 18px label → 57px tall. Primary `#000`,
  secondary and on-dark `#f0f0f0`.
- Form fields are **filled `#f0f0f0` with no border**, 12px radius.

**The two-tone heading device**
Every major heading is a *single* element where the opening clause is `#000`
and the trailing clause is `#969696`. The break is mid-sentence in places
("…driven by a | refusal to settle for ordinary."), and sometimes starts a new
line (hero, "Shaping Perception") and sometimes runs inline ("Our Story", the
About mission). `TwoTone.jsx` handles both via a `breakLine` prop.

**Animation — the biggest correction**
Sampling the hero's character spans at ~16ms intervals showed char 0, 3, 10 and
25 moving in **perfect lockstep**. The headline is split into spans for layout
but animates as one block: `opacity 0→1`, `translateY 50px→0`, **~500ms,
ease-out**. There is no per-character stagger; the first build had a rippling
0.016s-per-character reveal that the original does not do.

Mid-page sections measured `opacity: 1` / `transform: none` while still 3000px+
below the fold, so **the original has no scroll-triggered reveals at all**. The
first build wrapped nearly every block in a scroll reveal. Those are gone.

**Nav**
`position: fixed`, fully transparent — no blur, no border. A scroll sweep
(0/20/40/60/80/120/200/400) showed it visible **only at scrollY 0**; it hides
immediately on scroll and returns only at the top, not on scroll-up.

**Footer**
Black (`#000`) with white text, a 64px CTA headline, an `#f0f0f0` pill, two
208px link columns, then a rule and a centred legal line. The first build had a
white four-column footer with a brand blurb.

## Structure

```
src/
├─ main.jsx · App.jsx · index.css
├─ data/site.js          all copy, projects, galleries, headings, legal text
├─ components/
│  ├─ Nav.jsx            fixed transparent bar, visible at top only
│  ├─ Footer.jsx         black CTA + link columns
│  ├─ TwoTone.jsx        the black/grey heading device
│  ├─ RiseIn.jsx         the one real animation (50px rise, 500ms, on mount)
│  ├─ SectionRow.jsx     label | content | action grid
│  ├─ ProjectCard.jsx    featured + grid variants
│  ├─ Accordion.jsx      services
│  ├─ Seo.jsx · ScrollToTop.jsx · icons.jsx
└─ pages/
   Home · Projects · ProjectDetail · About · Contact · Legal · NotFound
```

## Deliberate differences from the original

Audit findings fixed rather than reproduced:

1. One `<h1>` per page with a real `h2`/`h3` nest (the original home page ships
   10 `<h1>` and zero `<h2>`).
2. Descriptive `alt` on every image (7 of 11 have none on the original; the
   rest share `"Main Project Image"`).
3. Images requested at display size with `sizes`/`srcset` and
   `fetchpriority="high"` on the LCP — the original requests its hero at
   `?width=5837`.
4. Per-route titles (the original `/contact` still reads "Pearl Framer Template").
5. `ProfessionalService` JSON-LD; the original has none.
6. Every animation gated on `prefers-reduced-motion`.
7. Form validation, inline errors, a live region, a privacy consent line
   (relevant for an EU entity — the original collects data with none), honeypot.
8. One DOM tree with media queries instead of Framer's three per-breakpoint copies.
9. Security headers via `vercel.json`.
10. Content fixes: "User **Psycology**" → "Psychology"; "work that **feel**
    timeless" → "feels"; the duplicated About mission sentence removed.

## Known approximations

- The wordmark is set in letterspaced type; the original ships vector art.
- The services accordion's expanded state is reconstructed — the original keeps
  its 24 items in a clipped zero-height container, so the collapsed design is
  measured but the open state is inferred from the down-arrow affordance.
- Route changes use a 220ms opacity fade. The original is a multi-page site with
  full document loads and no transition.

## Deploying

Client-side routing needs a catch-all rewrite so `/about` survives a refresh.
`vercel.json` (Vercel) and `public/_redirects` (Netlify) are both included.

## Assets and content

Images are still served from Framer's CDN and the copy is Navirize's. **Replace
both before any public deployment** — this is a structural and technical
reference, not a licence to republish their work. Drop replacements into
`public/` and update `src/data/site.js`.
