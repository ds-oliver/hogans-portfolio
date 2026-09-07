# Marlen Solutions Site Rebuild

Converting `hogans-portfolio` from a personal portfolio into the firm site for Marlen Solutions LLC. Rewire in place. Do not fork, do not start a new repo.

Audience is public agency procurement staff and enterprise data leads. The Port of Portland is the anchor client and is now nameable.

---

## 1. Current state

Read this before touching anything. These are verified findings from the repo at commit `96b6de0`, not assumptions.

### 1.1 The site is not live

Vercel reports Invalid Configuration on both `hoganmarhoefer.com` and `www.hoganmarhoefer.com`. Only `hogans-portfolio.vercel.app` has a valid config. Analytics reads zero visitors. There is no traffic to preserve and no cutover window to manage.

### 1.2 Tailwind v4 is not loading the config

`package.json` installs Tailwind v4 with `@tailwindcss/postcss`. `globals.css` uses `@import "tailwindcss"`. But `tailwind.config.js` is a v3-style `module.exports` file, which v4 does not auto-load.

Consequence: every custom color class silently resolves to nothing. `bg-charcoal-100`, `bg-charcoal-200`, `text-charcoal-800`, `text-charcoal-900`, `text-saffron-800`, `text-saffron-900`, `bg-charcoal-300`, `bg-charcoal-400`, `border-charcoal-600`, `text-persian_green`, `text-burnt_sienna`. Only inline `style={{ color: 'var(--...)' }}` is working.

Fix by defining the palette in CSS with v4's `@theme` block and deleting `tailwind.config.js`. Do not add an `@config` directive to keep the old file; the palette is being replaced wholesale anyway.

**Verification:** after the fix, run `npm run build` and grep the emitted CSS in `out/_next/static/css/` for a hex value from the new palette. If it is absent, the classes are still not compiling.

### 1.3 Zero-byte assets referenced from markup

| File | Size | Referenced by |
|---|---|---|
| `public/resume.pdf` | 0 bytes | `About.tsx` download button, `NavigationCards.tsx` |
| `public/profile-placeholder.jpg` | 0 bytes | OpenGraph and Twitter card metadata in `layout.tsx` |
| `public/fonts/F1Black.ttf` | 0 bytes | `.font-f1` class in `globals.css`, used across section headings |

`.font-f1` is falling back to Arial Black. F1 Black is also Formula One's licensed corporate typeface and is not licensable for commercial use. Delete the font file, the `@font-face` rule, the `.font-f1` class, and every `font-f1` usage.

### 1.4 Fabricated data

`src/components/ui/PerformanceMetrics.tsx` renders a panel headed "Portfolio Analytics" and "Real-time performance and engagement metrics," containing a "Live Engagement Metrics" area chart. All values are hardcoded and then mutated every 5 seconds with `Math.random()`. Visitor counts, engagement scores, page load times, and Lighthouse-style scores are all invented.

Delete the component and its section wrapper in `page.tsx`.

### 1.5 Placeholder links

- `Footer.tsx`: `https://github.com/yourusername`, `https://linkedin.com/in/yourusername`
- `About.tsx`: `https://www.linkedin.com/in/your-profile`
- `Projects.tsx`: `demoLink: "https://example.com/demo"` on all three entries

### 1.6 Contradictory skill data

Three sources disagree:

- `SkillGrid.tsx` rates 0-10: Snowflake 7, Airflow 7, dbt 5, Spark 5, Databricks absent
- `Skills.tsx` rates 0-100: Snowflake 90, Databricks 85, Spark 80, dbt 80
- `About.tsx` prose claims the day-to-day centers on Snowflake, Databricks, dbt, and Airflow

Actual production depth is SQL (Oracle and SQL Server), Python, dimensional modeling, and validation and reconciliation work. Both components currently render on the same page. `Skills.tsx` is deleted; `SkillGrid.tsx` is retargeted per section 5.

### 1.7 Dead structure

- `Navigation.tsx` links to `#contact`; no Contact section exists
- `Footer.tsx` is written but never imported into `page.tsx`
- `ThemeToggle.tsx` exists but is never rendered
- `ThemeProvider` defaults to `light`, but `:root`, the `prefers-color-scheme: dark` block, and `[data-theme="dark"]` all define identical dark values. Light mode does not exist.
- `console.log` statements remain in `ThemeProvider.tsx`

Site is dark-only. Delete `ThemeProvider`, `ThemeToggle`, the `useTheme` hook, and the duplicate theme blocks in `globals.css`.

### 1.8 Unused dependencies

`three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, and `date-fns` are installed and never imported. `@headlessui/react` is installed and never imported. Remove all six.

`@vercel/analytics` and `@vercel/speed-insights` come out as part of the hosting move.

`recharts` stays only if the radar chart survives. `framer-motion` and `@heroicons/react` stay.

---

## 2. Hosting and domains

Move from Vercel to Cloudflare Pages.

**Why:** the Vercel project sits on the Hobby plan, which Vercel restricts to personal non-commercial use. A consultancy marketing site is commercial, so staying means Pro at $20/mo. The build is already a pure static export with no server functions, so Pages is a direct port, and `marlensolutions.com` is already on Cloudflare DNS. One vendor, no monthly fee.

*Hogan should verify the Hobby plan terms against Vercel's current policy before decommissioning.*

### Cloudflare Pages settings

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` |
| `NODE_VERSION` env var | `20` |

The `functions/` directory at repo root is compiled to Workers automatically and coexists with the static `out` directory.

### Domains

- `marlensolutions.com` and `www.marlensolutions.com` serve the site. `www` redirects to apex.
- `hoganmarhoefer.com` and `www.hoganmarhoefer.com` get a Cloudflare Redirect Rule, 301 to `https://marlensolutions.com`. Keep the registration.
- Remove both domains from the Vercel project once Pages is serving.

### Metadata cleanup

`layout.tsx` and `public/sitemap.xml` and `public/robots.txt` all hardcode `hoganmarhoefer.com`. Update every occurrence to `marlensolutions.com`. The `google-site-verification` token in `layout.tsx` belongs to the old property; remove it and re-verify the new domain in Search Console if wanted.

---

## 3. Brand tokens

Authoritative. Do not add colors, do not substitute fonts.

```css
@theme {
  /* Marlen ramp */
  --color-layer-1: #DCE7F0;
  --color-layer-1-stroke: #C3D4E3;
  --color-layer-2: #6E9DC4;
  --color-layer-3: #1C4468;
  --color-tile: #1A2B3C;

  /* Surfaces, derived from the tile */
  --color-surface: #121D28;
  --color-surface-raised: #1A2B3C;
  --color-surface-line: #24384B;

  /* Text */
  --color-ink: #DCE7F0;
  --color-ink-muted: #9FB4C7;
  --color-ink-dim: #6E8298;

  --font-sans: var(--font-sora);
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
```

`--color-surface`, `--color-surface-raised`, `--color-surface-line`, `--color-ink-muted`, and `--color-ink-dim` are derived working values, not part of the canonical brand ramp. The five canonical values are Layer 1, its stroke, Layer 2, Layer 3, and the dark tile.

### Typeface

Sora, from Google Fonts, weights 400 and 600 only. Load via `next/font/google` in `layout.tsx`:

```ts
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sora",
  display: "swap",
});
```

Remove Poppins and Inter. Wordmark convention: "Marlen" in 600, "Solutions" in 400. That weight contrast is fixed and applies anywhere the firm name appears as a lockup.

---

## 4. Keep and cut

| Path | Action |
|---|---|
| `src/components/ui/SkillBar.tsx` + `.module.css` | **Keep.** Recolor to the brand ramp. Repurpose per section 6. |
| `src/components/sections/Hero.module.css` | **Keep.** Retarget the typing keyframes per section 5.2. |
| `src/components/sections/SkillGrid.tsx` + `.module.css` | **Keep the shell.** Carousel, dot nav, panel layout, stagger. Replace all data. |
| `src/components/ui/SkillRadarChart.tsx` | **Keep, optional.** Only if axes are capability domains. Cut `recharts` if dropped. |
| `src/components/ui/Button.tsx` | **Keep.** Recolor. |
| `src/components/ui/ScrollToTop.tsx` | **Keep.** Recolor. |
| `src/components/layout/Navigation.tsx` | **Keep.** Relabel, recolor, swap wordmark. |
| `src/components/layout/Footer.tsx` | **Rewrite.** Actually import it. Renders the standard footer line. |
| `src/components/ui/PerformanceMetrics.tsx` | **Delete.** Fabricated data. |
| `src/components/sections/Education.tsx` | **Delete.** 295 lines of course table and GPA. Degree becomes one dossier field. |
| `src/components/sections/Skills.tsx` | **Delete.** Redundant and contradictory. |
| `src/components/sections/About.tsx` | **Delete.** Replaced by `Dossier.tsx`. |
| `src/components/sections/Projects.tsx` | **Delete.** Replaced by `Work.tsx`. |
| `src/components/ui/NavigationCards.tsx` | **Delete.** Portfolio-browsing pattern, wrong for a single-page firm site. |
| `src/components/ui/ThemeProvider.tsx`, `ThemeToggle.tsx` | **Delete.** Dark only. |
| `tailwind.config.js` | **Delete.** Replaced by `@theme` in `globals.css`. |
| `public/fonts/`, `public/resume.pdf`, `public/profile-placeholder.jpg` | **Delete.** |
| `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` | **Delete.** Next.js scaffold leftovers. |
| `my-portfolio-watermelon.code-workspace` | **Delete.** |

Rename in `package.json`: `"name": "marlen-solutions-site"`.

---

## 5. Page structure

Single page, anchored nav. Order is deliberate: a procurement reader hits services and the registry number before anything about the owner.

### 5.1 Header

Fixed, `--color-tile` at 90% with backdrop blur, bottom border `--color-surface-line`. Left: Marlen lockup (mark plus wordmark). Right: anchor links to Services, Capabilities, Work, About, Contact. Mobile drawer keeps the existing Framer Motion slide-in.

The taper strata mark is three horizontally centered rectangles stepping narrower top to bottom, in Layer 1, Layer 2, Layer 3 from top down. Inline SVG, no image file.

### 5.2 Hero

`<h1>` reads **Marlen Solutions**. "Marlen" is static at weight 600. "Solutions" types in at weight 400 using the existing `Hero.module.css` keyframe technique, retargeted from the current `@ds-oliver` to `Hogan` sequence.

**Accessibility requirement:** the current implementation puts the name in a CSS `::before` `content` property, so the `<span>` is empty in the DOM. Crawlers and screen readers see "Hi, I'm" and nothing else. Fix by rendering the real text in a visually-hidden span alongside the animated one, and marking the animated element `aria-hidden="true"`.

Below the h1: the descriptor "Data Engineering and Solutions Architecting" in `--color-layer-2`, then one positioning sentence, then a single CTA anchored to `#contact`.

### 5.3 Services

Four cards on `--color-surface-raised` with `--color-surface-line` borders.

1. **Pipeline builds.** Production data pipelines, ingestion through delivery, built to run unattended.
2. **Source-to-target mapping and data modeling.** Documented field-level lineage and dimensional models that survive handoff.
3. **Validation and reconciliation.** Row and value level checks that prove the target matches the source, not just that the job succeeded.
4. **Requirements translation.** Working directly with business owners to turn what they need into something an engineer can build against.

Copy above is a starting draft. Tighten it, keep it plain, no banned words.

### 5.4 Capabilities

Reuse the `SkillGrid` carousel shell. Replace the four tool-score domains with capability domains. No numeric self-ratings on named vendor products.

Suggested domains, to be confirmed with Hogan:

- Data platforms: Oracle, SQL Server, Snowflake, Postgres
- Pipeline and orchestration: Python, SQL, Airflow, incremental and full-load patterns
- Modeling and mapping: dimensional modeling, source-to-target specs, slowly changing dimensions
- Validation: reconciliation queries, row and aggregate checks, exception reporting

Present as labeled lists with a two-tier distinction at most (used in production / working knowledge). Drop the 0-10 bars here entirely; the bar component moves to the dossier.

If the radar chart survives, its four axes are these domains, and the values must be defensible. If they cannot be defended, delete the chart and `recharts` with it.

### 5.5 Work

One entry: the Port of Portland bid tab pipeline. The Port is nameable now that the contract is executed.

Structure: client, engagement type, problem, what was built, outcome. No stakeholder names. No screenshots of Port data. No schema detail, table names, or column names. The contract being public record does not make the data public.

**Blocked on Hogan** for the description and a confirmation that nothing described touches data the Port would consider non-public. Build the component with the structure and a clearly-marked `TODO` placeholder rather than inventing content.

### 5.6 Engagement

How the firm works. Monthly invoicing, hourly against a contract ceiling, per-effort time tracking so invoices reconcile to contract line items. General liability at $1M per occurrence and $2M aggregate on an occurrence form, plus errors and omissions at $1M per claim, written to public agency requirements. Oregon Registry No. 258911594.

**No rate figure. Anywhere.**

### 5.7 Dossier

See section 6.

### 5.8 Contact

Form plus direct details. See section 7.

### 5.9 Footer

The standard line, centered, `--color-ink-dim`, small:

```
Marlen Solutions LLC | 1109 SE 72nd Ave, Portland, OR 97215 | Oregon Registry No. 258911594
```

No social icons unless Hogan supplies real URLs he wants on the firm site.

---

## 6. Dossier component

New file: `src/components/sections/Dossier.tsx`.

The one place the site takes a visual risk. It is a personnel-record readout, and it lands through typography, framing, and reveal timing, not through effects.

### Layout

Two columns on a `--color-tile` panel, stacking on mobile.

**Left:** headshot, `--color-layer-2` hairline frame, corner brackets drawn as four small L-shaped SVG paths in `--color-layer-2` inset from the frame. Slight desaturation in CSS, no filters beyond that.

**Right:** monospace field readout. Field label in `--color-layer-2`, uppercase, 11px, letter-spacing 0.08em. Value in `--color-ink`, 14px, mono. Labels in a fixed-width left column so values align on a single axis. Fields reveal in sequence with a 60ms stagger, borrowed from the existing `SkillBar` intersection-observer reveal, so it reads as a record populating.

### Field set

```
SUBJECT          Hogan Marhoefer
DESIGNATION      Principal, Marlen Solutions LLC
BASE OF OPS      Portland, Oregon
REGISTRY         Oregon No. 258911594
DOMAINS          Utilities and energy, public sector,
                 insurance and payroll systems
CORE STACK       SQL, Python, dimensional modeling
METHOD           Requirements to mapping to validation
CREDENTIALS      M.S. Applied Data Science for Business
COVERAGE         GL $1M/$2M, E&O $1M, occurrence form
STATUS           Accepting engagements
```

No GPA. No course list. No employment history.

### Coverage readout

Below the fields, three `SkillBar` rows. Segments, not scores. Recolored: filled segments in `--color-layer-2`, unfilled in `--color-layer-3` at low opacity. Drop the green and amber entirely.

Labels:

- Discovery and requirements
- Build and mapping
- Validation and reconciliation

These represent lifecycle coverage, meaning the phases the firm delivers across, not a proficiency score. All three read as full coverage. Do not render a numeric value next to them.

### Explicitly out of scope

Terminal green, scanline overlays, CRT curvature, glitch or chromatic aberration effects, typewriter sound, redaction bars, and field labels like ALIASES, ALLIES, THREAT LEVEL, or LAST KNOWN LOCATION. Those tip the section from designed into costume and cost credibility with the primary audience. Brand palette only, no exceptions.

---

## 7. Contact form

Static export means no Next.js API routes. Use a Cloudflare Pages Function.

### Architecture

- `functions/api/contact.ts`, Pages Function, POST only
- Delivery via Resend to `hogan@marlensolutions.com`
- Bot protection via Cloudflare Turnstile, verified server-side

### Fields

Name, email, organization, message. All required except organization. Client-side validation plus server-side validation; never trust the client.

### Sending domain

Verify `send.marlensolutions.com` in Resend, not the apex.

**This matters.** The apex already carries Google Workspace MX, SPF, DKIM, and DMARC that are configured and passing. Adding a second sending source to the apex SPF record risks breaking that. Using a subdomain keeps the Resend DKIM and SPF records scoped to `send.marlensolutions.com` and leaves the apex untouched.

Do not enable Cloudflare Email Routing on `marlensolutions.com`; it writes competing MX records.

### Environment variables

Set in Cloudflare Pages project settings, both Production and Preview:

- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public, safe to expose)

Never commit any of these. Add `.dev.vars` to `.gitignore` for local testing.

### Behavior

- Success: inline confirmation, form clears. No redirect.
- Failure: inline error with the direct email address as a fallback so a broken form never costs a lead.
- Rate limit at the Cloudflare level rather than in the function.

### Also render directly

Below the form: `hogan@marlensolutions.com`, `503-267-5947`, `Portland, Oregon`. Some buyers will not use a form, and AP departments verifying a vendor want a mailto they can check against the invoice.

---

## 8. Build sequence

Work in this order. Each step should build clean before the next starts.

1. **Branch.** `git checkout -b rebuild/marlen-site`
2. **Fix the toolchain.** Delete `tailwind.config.js`, move the palette into `@theme` in `globals.css`, swap Sora in and Poppins/Inter out, remove the F1 `@font-face` and `.font-f1`. Run `npm run build`. Verify a brand hex appears in the emitted CSS.
3. **Strip.** Delete every file marked Delete in section 4. Remove unused deps from `package.json`, run `npm install`, rebuild. Nothing should break, because the deleted components were either unimported or are going away together.
4. **Shell.** Rewrite `layout.tsx` metadata for `marlensolutions.com`, rebuild `Navigation.tsx` with the lockup and new anchors, wire `Footer.tsx` into `page.tsx`.
5. **Sections.** Hero, Services, Capabilities, Engagement. Build each, check it renders, move on.
6. **Dossier.** Headshot goes to `public/hogan.jpg`. Confirm the file is non-zero before referencing it.
7. **Work.** Structure now, copy when Hogan supplies it.
8. **Contact.** Function, Turnstile, Resend. Test locally with `wrangler pages dev out` and a `.dev.vars` file.
9. **Deploy.** Cloudflare Pages, settings per section 2. Verify on the `.pages.dev` URL before pointing any domain at it.
10. **Cut over.** Point `marlensolutions.com` at Pages. Add the `hoganmarhoefer.com` redirect rule. Remove both domains from the Vercel project last.

---

## 9. Blocked on Hogan

Do not invent content for these. Build the structure with a marked `TODO` and stop.

1. **Headshot.** `public/hogan.jpg`.
2. **Bid tab description.** Scope, what was built, outcome. Port named as client, no stakeholder names.
3. **Confirmation** that nothing in the bid tab description touches data the Port would consider non-public.
4. **GitHub link decision.** `ds-oliver` is a personal handle; the public repos are soccer analytics and a fantasy sports API wrapper. Default is to omit it from the firm site.
5. **Capability domain list** in section 5.4, confirmed against what he will actually stand behind in a scoping call.
6. **Radar chart** keep or cut.
