# OrbisMoneta — website

Marketing and RFQ site for OrbisMoneta (a brand of Monetanova Technologies Pvt. Ltd.).
Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**. That is the whole thing — there is no `.env` to
create and no service to start alongside it.

To run the production build instead:

```bash
npm run build
npm start          # also http://localhost:3000
```

**If it starts on port 3001**, or refuses with *"Another next dev server is already
running"*, an earlier server is still holding the project — Next 16 allows only one per
directory. Note that Ctrl-C on `npm run dev` kills the npm wrapper but can leave the node
child alive still holding the port, so kill the whole tree:

```powershell
$ids = Get-NetTCPConnection -LocalPort 3000,3001 -State Listen |
  Select-Object -ExpandProperty OwningProcess -Unique
foreach ($id in $ids) {
  Get-CimInstance Win32_Process -Filter "ParentProcessId=$id" |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
  Stop-Process -Id $id -Force
}
Remove-Item -Recurse -Force .next
```

A stale server is worth ruling out first for *any* odd behaviour: one left running against
a deleted `.next` will answer every route with a 500, which looks exactly like the app
being broken.

### Everything else

```bash
npm run build        # production build (28 routes, all static bar the enquiry API)
npm run typecheck
npm run lint
npm run assets       # regenerate brand marks + optimised imagery from source-assets/
npm run qa:audit     # a11y / SEO / overflow sweep across every route
npm run qa:shots     # desktop + mobile screenshots into .shots/
```

`qa:audit` and `qa:shots` need the app already running on port 3000.

---

## Where the content comes from

Every user-facing string originates in the client's own material:

| Source | Used for |
| --- | --- |
| `source-assets/OrbisMoneta - Website Content Document (Draft 1).pdf` | All page copy, navigation, footer, form fields, dropdown options |
| `source-assets/Landing page first section.docx` | Revised hero, revised Industry Context, the five carousel slides, section artwork |
| `source-assets/Orbis Moneta.docx` | Minutes: navigation and Contact-page instructions |
| `source-assets/orbismoneta-main.zip` | The client's own prototype — the six Solutions, the five Platforms, and the page bands for both |
| `source-assets/carousel/` | Replacement hero banner artwork (second round) |
| `source-assets/audiences/` | Photography for the six "Industries we serve" cards |
| `brand/OrMo Logo V SVG.svg` | The entire colour system, and every brand mark on the site |

No figures, certifications, clients, partnerships or regulatory claims have been invented.

### Editorial decisions applied

1. **One master list of service names.** The content document flagged that the Services
   dropdown and the Services page disagreed. The Services-page naming wins (those are the
   six lines with descriptions and focus areas) and is now used in the menu, the page and
   the footer. The footer's broader capability list was retitled **Capabilities** so the
   two can never contradict each other.
1. **Advisory leads the navigation.** The nav heading and the route are both
   `/advisory`, matching the client's own page title, *Strategic Advisory & Engineering
   Services*, and it sits first in the menu. `/services` is a **permanent redirect** to
   it, so every existing link — including deep links like
   `/services#digital-money-cbdcs`, whose fragment the browser carries across the
   redirect — still lands correctly. The section heading on that page is the client's own
   **"Our Services"**.
2. **A single Contact entry.** Per the minutes, the duplicate header "Contact" button was
   removed and **Careers moved under About**.
3. **Contact routes collapsed into the form.** Per the minutes, the four contact desks are
   now the first dropdown in the enquiry form rather than a separate left-hand column.
   They remain visible as a collapsed reference panel.
4. **Hero copy.** The landing-page brief's shortened hero replaces the 55-word version, as
   the content document itself recommended.
5. **Emoji icons replaced.** The five Industry cards now use the project's SVG icon set.
6. **`Stablecoin Regulation in 2025`** retitled to drop the year, as recommended.
7. **`Become a OrbisMoneta partner`** → **`Become an OrbisMoneta partner`**.

---

## Documentation

- **[docs/design-notes.md](docs/design-notes.md)** — design system, brand marks, hero
  carousel, the industries marquee, header behaviour, conversion architecture and the
  Insights platform. The reasoning behind each, not just the what.
- **AGENTS.md** / **CLAUDE.md** — instructions for agents working in this repo.

---

## Still needed from the client

These are carried through from the content document's own "What we still need from you"
page. Each has a designed, honest placeholder state rather than invented filler:

| Area | Outstanding |
| --- | --- |
| Insights | Body copy, lead images, authors and publication dates for the nine articles |
| Leadership | Co-founder + additional profiles; professional headshots (cards show initials) |
| Lab | Imagery and 3–5 prototype/research themes |
| Partners | Approved partner logos and permission to display each mark |
| Careers | Employer positioning, cultural principles, open roles, application route |
| Legal | Approved Privacy Policy, Terms of Use and Disclaimer copy |
| Forms | The destination inbox / CRM for enquiries — see `app/api/enquiry/route.ts` |
| Social | Live LinkedIn and X profile URLs (`content/site.ts`) |

---

## Project shape

```
app/              routes, metadata, sitemap, robots, enquiry API
components/       every component, flat, one PascalCase file each
content/          all copy and data — the CMS boundary
lib/              small shared helpers
brand/            the client's supplied logo, master for every generated mark
docs/             design and implementation notes
scripts/          asset pipeline + QA tooling
source-assets/    client originals — documents and full-size artwork
public/images/    optimised derivatives, the only imagery that ships
scripts/          asset pipeline + QA tooling
public/images/    optimised client artwork (42 MB of PNG → 3.4 MB of WebP)
```

Client artwork arrives as multi-megabyte PNGs, sometimes dropped straight into `/public`
where it would ship to every visitor untouched. Nothing in `/public/images` is hand-placed:
originals live in `source-assets/` and `scripts/prepare-assets.mjs` is the only thing that
writes there. Re-run it after adding artwork:

```bash
node scripts/prepare-assets.mjs            # brand marks, carousel, audiences, icons
node scripts/prepare-assets.mjs <media-dir> # the above plus the first-round Word media
```

The first round of client artwork carried baked-in headlines, so the pipeline crops each
image to its artwork region and the copy is re-set as live HTML — the slides reflow
properly, stay selectable and translatable, and are readable by assistive technology.
