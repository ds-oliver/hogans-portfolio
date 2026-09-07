# CLAUDE.md

Repo conventions for `hogans-portfolio`, being rebuilt as the Marlen Solutions LLC firm site.

## What this repo is

Next.js 15 static export (`output: 'export'`), React 19, Tailwind v4, Framer Motion. Currently a personal portfolio. Being converted in place to the marketing site for Marlen Solutions LLC, a one-person data engineering and solutions architecture consultancy in Portland, Oregon.

Full build spec: `docs/MARLEN_SITE_REBUILD.md`. Read it before making changes.

## Working rules

- Branch off `main`. Never commit directly to `main`. Open a PR.
- Run `npm run build` before every commit. The Tailwind config is currently broken (see spec); the build is the only way to catch class-resolution failures.
- Complete files over partial edits when a file is being substantially rewritten. Small surgical edits are fine for small changes.
- Delete dead code rather than commenting it out.
- No new dependencies without saying why. The current tree already carries `three`, `@react-three/fiber`, and `@react-three/drei` for nothing; those come out.

## Content rules

These are not style preferences. They are correctness constraints for a site that public agency procurement staff will read.

- **No fabricated data.** No simulated metrics, no invented visitor counts, no placeholder statistics rendered as if real. The previous site had a `Math.random()` dashboard labeled "Live Engagement Metrics." Nothing like that ships.
- **No placeholder links.** No `example.com`, no `yourusername`, no `your-profile`. If a real URL is not available, remove the element.
- **No zero-byte assets referenced from markup.** Check file size before wiring an `href` or `src` to it.
- **No self-rated skill scores on tools.** "Kubernetes 5/10" invites a buyer to discount you. Capability and lifecycle coverage only.
- **No rate figures anywhere on the site.**
- **No em dashes in any copy.** Use commas, periods, or a restructured sentence.
- Plain verbs in body copy. "Built," "reviewed," "found," "checked." Not "leveraged," "spearheaded," "dove into."
- Banned words in copy: leverage (verb), robust, seamless, streamline, unlock, empower, holistic, deep dive.

## Brand

Single source of truth is `docs/MARLEN_SITE_REBUILD.md`, section "Brand tokens." Do not invent colors, do not substitute fonts, do not add a second accent hue. The palette is four blues and a near-black. Typeface is Sora, weights 400 and 600 only.

## Facts about the business

Use these verbatim. Do not paraphrase the registry number, address, or coverage limits.

- Entity: Marlen Solutions LLC, single-member Oregon LLC
- Oregon Registry No. 258911594
- Address: 1109 SE 72nd Ave, Portland, OR 97215
- Phone: 503-267-5947
- Email: hogan@marlensolutions.com
- Descriptor: "Data Engineering and Solutions Architecting"
- Footer line: `Marlen Solutions LLC | 1109 SE 72nd Ave, Portland, OR 97215 | Oregon Registry No. 258911594`

## Do not touch

- Any DNS record on `marlensolutions.com` related to mail. MX, SPF, DKIM, and DMARC are configured and passing for Google Workspace. Adding a sending domain for the contact form uses a **subdomain** (`send.marlensolutions.com`) precisely so the apex SPF is not modified.
- Do not enable Cloudflare Email Routing on `marlensolutions.com`. It writes competing MX records.
