# Design and implementation notes

How the site is put together, and why. The README covers running it; this covers
the decisions. Read `AGENTS.md` first if you are an agent working in this repo.

---

## Design system

Derived from the logo: navy `#002EA6`, sky `#01A4FF`, green `#01AC32`. Gold `#C98A16`
carries the accent role the client's own hero artwork uses. Everything is expressed as
semantic tokens in `app/globals.css` — surfaces, lines, ink, state colours, elevation,
motion easings and a fluid display scale. Components never reference raw hex.

Typography: **Inter Tight** carries both display and body, with **IBM Plex Mono** for
eyebrows, tickers and metrics. Financial numerals use tabular figures throughout.

Inter Tight is a neo-grotesque cut specifically for tight display setting. The headline
style wants letters almost touching and lines almost stacked — heavy negative tracking at
large sizes with leading near 1.0. Regular Inter fights that, because its sidebearings are
drawn for UI text at small sizes; Inter Tight is the same skeleton redrawn for the job, so
tracking can be pulled in without the letterforms colliding.

The `.h-display-1…4` classes bundle size, weight, tracking and leading. Tracking tightens
and leading closes as the size grows — the bigger the type, the more air there is between
letters to take back out:

| | weight | tracking | leading |
| --- | --- | --- | --- |
| `.h-display-1` | 600 | −0.042em | 0.98 |
| `.h-display-2` | 600 | −0.038em | 1.02 |
| `.h-display-3` | 600 | −0.034em | 1.06 |
| `.h-display-4` | 600 | −0.028em | 1.14 |

This replaced an earlier Hanken Grotesk setting modelled on Standard Chartered, which set
display type at weight 300. The current direction is the opposite — semibold and tight
rather than light and open — at the client's request.

Motion is CSS-only and opt-in through `[data-reveal]`, driven by one `IntersectionObserver`
per element that disconnects after firing. `prefers-reduced-motion` neutralises all of it
in the stylesheet, and the hidden state is gated behind a `[data-js]` attribute so nothing
is ever invisible without JavaScript. An attribute rather than a class because React owns
`className` on `<html>`.

## Brand marks

Every mark on the site is generated from the client's single supplied SVG by
`scripts/prepare-assets.mjs`, and every placement goes through one component,
`components/ui/brand-mark.tsx`.

Four files come out of the one source:

| | Light ground | Dark ground |
| --- | --- | --- |
| **Lockup** — glyph + wordmark | `orbismoneta-logo.svg` | `orbismoneta-logo-inverse.svg` |
| **Symbol** — glyph alone | `orbismoneta-symbol.svg` | `orbismoneta-symbol-inverse.svg` |

- The dark variants are not `invert()`. The supplied artwork paints the letter counters
  white over navy, so a filter turns the mark into a white slab. The inverse is repainted
  properly: background rectangle dropped, counters set to the dark surface, navy promoted
  to white, anti-aliasing blend strokes taken to their pure brand values.
- The symbol is the *same geometry*, not a redrawing — the viewBox is retargeted to the
  glyph's measured ink box (`67 179 494 494`) so the wordmark simply falls outside the
  frame. Which paths belong to the glyph is decided by rendering each one and testing for
  ink, not by guessing at coordinate ranges, then the rest are dropped so the file is 10KB
  rather than 38KB. Verified pixel-identical to the untrimmed clip.
- `favicon.svg`, `apple-icon.png`, `icon-192.png` and `icon-512.png` are the glyph on the
  brand's abyss navy, all rendered from that same SVG so they cannot drift apart.
- `BrandMark` passes `unoptimized`. The mark is vector, and running it through the image
  optimiser rasterises it to a fixed pixel width — soft in the header, visibly blurry on a
  2x display. Served as-is it stays crisp at any density and skips the optimiser entirely.

The lockup needs roughly 120px of width before the wordmark closes up, so anywhere narrow
or square takes the symbol: favicon and app icons, the RFQ drawer header, the floating
engagement widget, and low-opacity watermarks on inner-page heroes, the footer, the 404
and the insight card covers.

---

## Hero carousel

`components/home/hero-carousel.tsx` opens on the brand statement, holds it a beat
longer than the rest (6s vs 4.8s), then plays through the five capability banners the
client supplied.

The six-column pillar rail that used to sit beneath it — Overview, Global Reach,
Intelligent Platforms and so on — was **removed at the client's request**, along with the
audience chips that closed the first slide. Both have been replaced by the "Industries we serve"
section immediately below, so the same information is not read twice within one scroll.
What sits on the divider now is a slim control bar: a progress pill per slide, a position
counter, and previous / next / pause.

- The active pill stretches and fills as the slide plays, so position and progress are one
  object to read rather than two.
- Slides share one grid cell, so the frame never changes height as it advances.
- Artwork cross-fades behind the copy; the outgoing slide clears fast so the two never
  read on top of one another.
- On desktop the banners are **contained, not cropped** — they are labelled diagrams and
  clipping the outer icon ring would lose content. The panel is painted the same near-black
  navy as the artwork's own background, so the letterboxing is invisible. On mobile the
  artwork becomes a full-bleed texture behind the copy instead.
- The banners are the client's **second round** of artwork, which arrived already cropped
  to the diagram. The first set carried a baked-in headline column that the pipeline had to
  cut away; these only need re-encoding.
- Autoplay pauses on hover and on focus, has explicit play/pause, prev/next and direct tab
  controls, responds to arrow keys, and is disabled outright under reduced-motion.
- Inactive slides are `inert`, so keyboard users never land in hidden content.
- The Overview slide carries animated corridor markers over the globe — New York, London,
  Mumbai, Singapore, Tokyo — entering on a stagger with a slow pulse.
- Banner artwork enters with a soft scale, then drifts on a long float over a breathing
  glow, so the slides feel alive rather than like static images.
- A scroll control sits on the rail's top divider. It is a real button that scrolls past
  the hero, seated there so it cannot collide with slide copy at any viewport size.

## "Industries we serve" marquee

`components/home/audience-marquee.tsx` — the six audiences from the client's own hero
strip, each with their photography, drifting continuously beneath the hero. Cards are an
icon badge, the audience name and the photograph over a wash of that card's brand colour;
arrows and dots sit either side for anyone who would rather not steer.

Hand-rolled rather than pulled from a carousel library, because direction and speed change
continuously at runtime and a CSS keyframe animation can only be played, paused or
reversed — not steered. One `requestAnimationFrame` loop writes `transform` on the track;
React never re-renders during motion.

- **The cursor steers it.** Pointer position across the track normalises to −1 … +1. Inside
  a 0.15 dead zone the marquee stops dead; past it, speed scales with the square of the
  distance from centre up to 6px/frame, and the side you are on sets the direction. Speed
  is lerped, never snapped, so it accelerates and stops smoothly.
- Delta-timed, so a 120Hz display does not run at double speed. Clamped at 50ms per frame
  so returning to a backgrounded tab does not jump a whole loop.
- The card set is rendered twice and the offset wraps by exactly one copy. The DOM is never
  re-mounted, so there is no flash at the seam.
- Click-drag and touch-swipe move it 1:1 and release with momentum that decays back into
  the ambient drift. Motion is paused entirely while the pointer is held.
- `prefers-reduced-motion` drops the whole loop and renders a plain `overflow-x` scroller
  with snap points and a single set of cards.
- The duplicate set is `aria-hidden`, `inert` and untabbable, and its images carry no alt
  text — the real set carries all of it.

Two things worth knowing about the implementation:

1. **No `setPointerCapture`.** Capturing the pointer makes Chrome fire `pointercancel` a
   few milliseconds later, which kills the drag as soon as it starts. The drag is tracked
   on `window` instead, which also lets a fast throw continue past the edge of the section.
2. **`select-none` and `draggable={false}` are load-bearing.** Chrome answers a native text
   or image drag with `pointercancel` too, and the cards are full of images.

Each card's client-approved focus areas stay on the content record and on the Industries
page; the card itself shows only the name, so the row stays scannable at a drift.

---

## Home page

Cut back to four blocks at the client's request:

| | |
| --- | --- |
| **Hero carousel** | Brand statement, then the five capability banners |
| **Industries we serve** | The audience marquee — the client HTML's `#industries` |
| **Capability ticker** | The twelve-token marquee |
| **Industry Context** | The client HTML's `#challenges` narrative |
| **Why OrbisMoneta** | Four reasons plus the three delivery highlights |

The page has no closing CTA band of its own. The footer's connect strip is the single ask
at the bottom of every page, and the floating popup is the only other one — see below.

Everything taken off the page is **kept, built and working**, and re-mounts with a single
line — this repo is not under version control, so nothing was deleted:

- `ServicesIndex`, `InsightsTeaser` → `components/home/parked-sections.tsx`
  (lifted out of `page.tsx`, not rewritten)
- `Proposition`, `FutureOfMoney`, `ClosingCta` → `components/home/sections.tsx`
- `RequestToConnect` → `components/conversion/request-to-connect.tsx`

---

## Conversion architecture

**No telephone number is published anywhere on the site.** OrbisMoneta sells to
institutions across many time zones, so every route is a written enquiry directed to the
right desk. The RFQ flow still captures the prospect's own number when they ask to be
called — that is lead capture, not a published contact.

Every call to action on the site — the floating popup, the footer strip, the header
button, the hero buttons and the Contact page — opens or leads to **the same enquiry
form**. There is one form, not several.

- **Docked CTA** (`components/conversion/engagement-slider.tsx`) — a vertical tab on the
  **right edge**; clicking it slides a panel out horizontally from behind it. Collapsed, the
  tab leans out of the edge every seven seconds so it reads as something openable rather
  than a label. It presents itself once after a quiet interval, then it is click-to-open.
  **Stays open while hovered or focused**, and closing **collapses rather than dismisses**:
  a close that removed the widget for the session would take the route away from anyone who
  closed it by reflex. No WhatsApp entry point anywhere, per the brief.
  It is bounded to the region **between the header and the footer**: nothing floats over the
  hero, where the page's own buttons already are (upper bound, ~520px of scroll), and it
  stands down as soon as the footer strip enters the viewport (lower bound).
  Two things the geometry depends on: only the **panel** translates (moving the whole row
  would carry the tab off-screen with it), and it travels its own width *plus the gap and
  the tab* — any less and a sliver stays visible beside the tab. The cluster sits in a
  clipping frame exactly panel + gap + tab wide, so the closed panel is genuinely gone
  rather than parked past the viewport edge where it would widen the document.
  The plate inside the panel is a **brand plate, not a report cover**: the design it is
  modelled on shows a publication, and inventing one would put an asset on the page that
  does not exist.
- **Footer connect strip** (`components/FooterCta.tsx`) — one line, one button. This was a full
  conversion band (headline, paragraph, two large buttons, an email), which meant the same
  ask appeared twice in a single scroll on any page that already closed with one. It also
  carries the hand-off that stands the floating popup down.
- **Footer hand-off** — when the end-of-page CTA scrolls into view, the floating widget
  stands down and the page's own, larger call to action takes over. One clear ask on
  screen at a time.
- **RFQ drawer** (`rfq-dialog.tsx`) — focus-trapped, Escape-closable, returns focus to the
  trigger. Three modes: *call*, *requirements*, *demo*.
- **Enquiry form** (`enquiry-form.tsx`) — two-step progressive disclosure, inline
  validation, explicit success state. Shared by the drawer and the Contact page.

---

## Insights

Structured as a content platform, not a page. `content/insights.ts` is the only source
of truth; components consume `getAllInsights()`, `getInsight(slug)` and the taxonomy
exports, so this can be swapped for a CMS without touching a single component.

- **Listing** shows heading, excerpt, category and metadata only — never the article body.
  Search, category filter, content-type filter, featured slot, load-more, empty state.
- **Detail** pages are dynamic routes with `generateStaticParams`, per-article metadata,
  Open Graph, Article JSON-LD, related insights, share links and a contextual CTA.
- The body renderer supports paragraphs, headings, lists, quotes, callouts, **images and
  video** (self-hosted or embedded). Populate `body` / `media` on a record and it renders.

---
