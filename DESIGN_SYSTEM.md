# Design System — Dami Owolabi Personal Brand Website

## Design Principle

The website should make visitors feel like they're encountering **a person with a clear point of view** — not a service being sold to them . Every design decision should reinforce one takeaway :

> "This is someone who understands marketing, growth and people." 

The visual language exists to support three qualities: **authority, clarity, and warmth** . Nothing decorative for its own sake; nothing so stripped-back it feels cold . Confidence expressed through restraint, not minimalism for minimalism's sake .

### Audience & Ambition

The audience for this site spans high-net-worth individuals and executive decision-makers, marketing and brand professionals, corporate employees evaluating training or coaching, and C-suite executives — a mix of people who evaluate brand quality by what a site *doesn't* do as much as what it does, and people making a practical decision about a course, session, or speaking engagement . This raises the bar on execution but does not change the design direction below; it sharpens it . Practically:

- **Restraint reads as confidence.** Executive and HNW visitors in particular are more persuaded by unhurried pacing and generous whitespace than by animation, badges, or urgency copy . Every "sell harder" instinct should be resisted .
- **Clarity serves the practical decision-makers.** Professionals and corporate employees evaluating a course or training session need the facts (price, format, curriculum) surfaced clearly and quickly — restraint should never come at the cost of making a booking decision harder than it needs to be . This is exactly what honest, clearly-surfaced facts and progressive-disclosure patterns are for (see Components → Honest Numbers and Progressive Disclosure) .
- **Production quality has zero tolerance for shortcuts.** Photography must be genuinely professional-grade (see Imagery below); no visible AI-generation artifacts, no stretched stock photography, no placeholder that reads as unfinished in a final build .
- **Progressive disclosure over information dump.** Where client content is comprehensive (course curricula, program details), the layout should let a page read calm at a glance while the full depth stays one interaction away — see Components → Progressive Disclosure .
- **Every shared link is a brand touchpoint.** This audience — from executive assistants forwarding a link to a C-suite principal, to a corporate L&D team circulating a training proposal — frequently forwards links rather than browsing in the moment . The social/OG preview card matters as much as the page itself .

### Structural Direction: Editorial / Thought-Leader, Not Agency-Portfolio

An earlier draft of this document borrowed structural cues from a design-studio portfolio template (stat-card rows, a client logo wall, case-study grids) . On reflection, that structure is built for a studio selling services to clients — which works against the stated design principle almost by definition . This site belongs to a person known for how they *think*, not a firm showcasing project output, so the structure should read closer to a magazine profile or a personal essay site than an agency homepage :

- **Byline over stat cards.** Where the old direction wanted a row of "14 years / 120+ clients" metrics right under the hero, this direction prefers a short, specific byline treatment instead — name, discipline, one sharp line of context — the way a magazine credits a contributor, not the way a SaaS site proves ROI . The industry-tag row already in place (Fintech, Payments, QSR, Retail, Consumer Brands, Web3, Agency-led Marketing) does the "credibility" job more quietly than a stat block would .
- **No client logo wall.** A grid of borrowed logos is a trust-by-association device built for agencies and vendors . It has no equivalent here — dropping it entirely rather than inventing placeholder logos that would misrepresent real client relationships .
- **Long-form manifesto copy reads like an essay, not marketing fragments.** Sections like "What Is BrandForge" or the Roundtable philosophy copy should sit in a single constrained-width column (65–75ch), with the short punch-line sentences ("No buzzwords." "No recycled slides.") given room to breathe as isolated lines — closer to how a personal essay uses white space for emphasis than how a landing page uses bullet fragments . The `PullQuote`/`BigQuote` treatments already built support this .
- **Numbered sections as chapters, not service tiers.** The `01 / 02 / 03` index treatment already in use (Work With Me, BrandForge hub, Academy) should read as a table-of-contents / chapter marker, reinforcing "a body of thought organized into parts" rather than "three pricing packages." 
- **Photography as a single strong portrait, not a case-study grid.** One considered image of the person (the hero photo) carries more authority here than a wall of project photography would — this is someone's presence, not a portfolio of deliverables .

This direction keeps everything already defined below (palette, type, spacing, hard constraints) — it changes what the site borrows structurally, not the visual system itself .

---

## Hard Constraints

These are non-negotiable, regardless of component or section :

- **No emojis**, anywhere in the UI — headings, buttons, captions, lists . Use typographic marks (·, —, /) or icons instead .
- **No blue or purple gradients, ever** — those hues never appear in this system at all, gradient or flat .
- **No warm-toned backgrounds** — no cream, beige, peach, tan, or yellow-tinted neutrals . All background neutrals must be cool-toned grays (see `--gray-50` etc. below), keeping the palette aligned with the teal/black/white system .
- **Gradients are allowed, but only as a two-stop blend between adjacent steps of the Core Palette / Extended Teal Ramp** (e.g. Deep Teal → Near-Black Teal, or Muted Teal → Deep Teal) — never a third hue, never anything outside this teal family, never a "mesh"/multi-blob gradient . Reserved for larger background surfaces (CTA sections, decorative accent shapes) that benefit from a little depth; small UI elements — buttons, pills, tags — stay flat, see Components below .

---

## Color Palette

### Core Palette (client-approved)

Four foundational colors, dark to light — this is the palette to reach for first for any major structural moment (footer, hero, primary CTAs, headlines) . Everything else in this document (the extended ramp, grays) exists to support these four, not replace them .

| Role | Color | Hex | Usage |
|---|---|---|---|
| Near-Black Teal | `#02232A` | Footer background, deepest structural moments, highest-contrast dark fills |
| Deep Teal (Primary) | `#054753` | Headlines, nav, primary CTAs, anchor of authority |
| Muted Teal (Accent) | `#439aa9` | Secondary CTAs, links, highlights, hover states, icon accents |
| White | `#FFFFFF` | Primary background, negative space, breathing room |

Ink (`#0A0A0A`, below under Extended Neutrals) remains the body-copy color — it sits just outside this four-swatch core palette because its job is text, not structural fills .

### Extended Teal Ramp (tonal scale, for depth and hierarchy)

The core palette's dark-to-light progression, extended into a full tonal scale for places that need more than four steps (illustration, layered shapes, chart series) . `teal-950` is fixed to the exact Near-Black Teal swatch above; `teal-800` and `teal-500` reproduce the Deep Teal and Muted Teal core swatches almost exactly; the rest is interpolated with saturation tapering at the extremes so the lightest and darkest steps stay sophisticated rather than neon or muddy .

| Token | Hex | Notes |
|---|---|---|
| `--teal-950` | `#02232A` | = core **Near-Black Teal** — footer, deepest structural fills |
| `--teal-900` | `#053039` | Very dark teal — hover state for `teal-800`, dense background blocks |
| `--teal-800` | `#054652` | ≈ core **Deep Teal** (`#054753`) — headlines, nav, primary CTAs |
| `--teal-700` | `#0B5F6F` | Mid-dark teal — secondary headings on light backgrounds, active states |
| `--teal-600` | `#18798B` | Transitional tone — larger decorative shapes, chart/data-viz accents |
| `--teal-500` | `#4399A9` | ≈ core **Muted Teal** (`#439AA9`) — links, secondary CTAs, icon accents |
| `--teal-400` | `#6BB0BD` | Lighter accent — hover/disabled states, secondary icon fills |
| `--teal-300` | `#94C7D1` | Light accent — chips/tags on dark backgrounds, illustration fills |
| `--teal-200` | `#BCDFE6` | Pale tint — subtle section backgrounds, card highlights |
| `--teal-100` | `#DDF0F4` | Near-white tint — hover backgrounds, soft dividers |
| `--teal-50`  | `#EFF9FA` | Faintest tint — barely-there background wash, replaces plain white where a whisper of brand color helps |

**Usage principle:** the ramp exists for *tonal depth* — flat steps for illustration/chart series, or as the two stops of an in-palette gradient per the Hard Constraints above — not to multiply accent colors on a single screen . Pick one or two adjacent steps per view, not the whole ramp at once .

### Extended neutrals (derived, for hierarchy — not brand colors)

| Token | Hex | Usage |
|---|---|---|
| `--gray-50` | `#F7F8F8` | Section backgrounds, subtle contrast blocks |
| `--gray-200` | `#E3E7E7` | Dividers, hairlines, card borders |
| `--gray-500` | `#6B7573` | Secondary/muted text, captions |

All neutrals above are cool-toned (slight blue-gray cast, never yellow/cream) by design — see Hard Constraints .

### Color Principles

- **Black + Deep Teal do the heavy lifting.** Black carries body text and structure; deep teal carries brand moments (headlines, nav, key CTAs) . Together they read as serious and grounded rather than "startup pastel." 
- **Muted teal is the only accent.** Use it sparingly — links, hover states, a single highlighted word in a headline, icon strokes . If more than one accent color competes on a screen, warmth turns into noise .
- **White space is a color decision, not an afterthought.** Generous white background is what makes the palette feel premium rather than corporate . Don't fill it just because space is available .
- Never use pure black (`#000000`) — use `#0A0A0A` so it stays a hair warmer and pairs better with the teals .
- In-palette teal-to-teal gradients are permitted on larger surfaces per the Hard Constraints above, used deliberately for depth — not as decoration on every section . Most fills are still flat; a gradient should feel like an occasional, considered choice, not the default .

---

## Typography

### Primary Typeface — Montserrat
Used for **all headlines, body copy, and UI text** . It's the voice of the site — clean, geometric, humanist sans-serif that reads as confident without being cold .

| Style | Weight | Size (desktop) | Size (mobile) | Line height |
|---|---|---|---|---|
| Display / Hero | Bold (700) | 64–72px | 36–40px | 1.05–1.1 |
| H1 | Bold (700) | 48px | 32px | 1.1 |
| H2 | Bold (700) | 32px | 26px | 1.2 |
| H3 | SemiBold (600) | 22px | 20px | 1.3 |
| Body (large) | Regular (400) | 18–20px | 16–18px | 1.6 |
| Body (default) | Regular (400) | 16px | 15px | 1.6 |
| Caption / Meta | Medium (500) | 13–14px | 13px | 1.4 |

### Secondary Typeface — Roc Grotesk *(trial, standing in for Mulish)*
Used **sparingly** as an accent typeface: eyebrow labels, section tags, pull quotes, button labels, or a single contrasting word inside a Montserrat headline . It should never carry a full paragraph — its job is to punctuate, not narrate .

Roc Grotesk (a licensed typeface) is currently loaded in place of Mulish as a trial . The role it plays in the system — accent-only, never body copy — is unchanged; if the trial ends, Mulish resumes this exact role .

- Eyebrow/label style: Roc Grotesk, SemiBold (600), uppercase, letter-spacing +0.08em, small size (12–13px), often in Deep Teal on a white background or white on a teal background (as in the brand mark) .
- Button labels: Roc Grotesk, SemiBold (600), never Regular .

### Typographic Principles

- One font talks (Montserrat), one font *emphasizes* (Roc Grotesk) . Don't let the accent typeface creep into body paragraphs — that dilutes the hierarchy the two fonts are meant to create .
- Favor sentence case over Title Case in headlines — it reads more like a person speaking, less like brochure copy .
- Generous line-height and paragraph spacing (1.6+ for body) — clarity is a stated design goal, and cramped type undermines it .
- **Reading measure:** long-form body copy (manifesto sections, essay-style paragraphs) is constrained to 60–70 characters per line, not the full column width — a narrower, more deliberate measure reads as edited rather than filled .
- **Large display type gets negative tracking** (roughly -0.01em to -0.02em) at 48px+ — tightens the letterforms so big Montserrat headlines feel considered rather than default-browser-large .

### Motion

- Motion exists to confirm, not perform . Fade/slide reveals on scroll (300–500ms, ease-out, triggered once) are the ceiling — no parallax, no scroll-jacking, no looping/bouncing decorative animation .
- Always respect `prefers-reduced-motion` — skip the transition entirely, don't just shorten it .
- Hover states are the only "always-on" motion: subtle (150–200ms color/transform), never a shadow-pop or scale bounce .

---

## Layout & Spacing

- **Base unit:** 8px grid (`8, 16, 24, 32, 48, 64, 96, 128`) .
- **Max content width:** 1200px, with generous side gutters (min 24px mobile, 80px+ desktop) .
- **Section rhythm:** minimum 96–128px vertical padding between major sections on desktop, 64px on mobile — pacing communicates confidence; cramped sections read as anxious .
- **Grid:** 12-column on desktop, single column on mobile . Avoid dense multi-column layouts — one strong idea per section, left-aligned or centered, not scattered .
- Asymmetry over centered-everything: off-center hero text, images/quotes breaking the grid slightly — signals a point of view rather than a template .

---

## Components

### Buttons
- **Primary:** Deep Teal (`#054753`) background, white Roc Grotesk SemiBold label, no gradient, subtle radius (6–8px) or fully rounded, hover → Muted Teal (`#439aa9`) .
- **Secondary/Ghost:** Transparent or white background, 1.5px Deep Teal or Black border, Deep Teal text, hover → fill with Deep Teal, text turns white .
- No drop shadows on buttons . Flat, confident, architectural .

### Cards / Content Blocks
- White background, 1px `--gray-200` hairline border (not heavy shadows) — shadows read as "template," hairlines read as "considered." 
- Optional accent: a 2–3px Deep Teal or Muted Teal top/left border to mark featured content (e.g., a flagship case study or lead magnet) .

### Navigation
- White or `--gray-50` background, Montserrat for nav labels, Roc Grotesk-style uppercase micro-label if a "current section" indicator is needed .
- One pill-shaped (or otherwise clearly primary) CTA button sits at the far right of the nav — the single highest-contrast element on the page, reserved for the primary action (e.g., "Contact" / "Work with me") .
- Logo mark uses the two-tone lockup as established in the brand sheet — keep clear space around it, never place on busy imagery .

### Hero (identity, not argument)
The hero's job is identity: who this is, what they do, and a strong image of them — not the full pitch . Positioning copy, industry tags, and secondary CTAs belong in sections below the hero, not crowded into it .

Beyond that, the *how* is intentionally open — a hero can be a full-bleed sticky portrait column, a clipped/framed photo treatment, a split layout, or something else entirely, as different pages and future redesigns explore different structures . What stays constant is the feeling (authority, restraint, a real person rather than a template) and these guardrails:
- If multiple roles/titles are shown (e.g. "Marketing Leader · Growth Strategist · Brand Builder"), order them most-senior/primary first — a considered hierarchy, not a random list — and keep them visually secondary to the name itself .
- No invented sales metrics ("120+ clients," a fabricated client count) anywhere near the hero . Honestly-derived counts (years, countries, industries — see **Honest Numbers** below) are a different thing entirely .
- The portrait must clear the Imagery production bar below regardless of how creatively it's cropped, framed, or composited .

### Honest Numbers
Where a page surfaces numeric facts — "10+ Years," "7 Industries," "4 Countries" — every number must trace directly to something the client's own copy already states (e.g. "over a decade" → "10+ Years"; the count of industry tags → "7 Industries") . Never a number invented for persuasive effect .

Presentation is open — a slim list beside a photo, a plain grid, inline in a sentence, whatever a given layout calls for — as long as it stays visually restrained . The constraint is honesty and restraint, not a specific layout: avoid it reading as a bordered "stat card" wall competing for attention with the hero .

### Numbered / Indexed Sections
Where a page uses a numbered structure (`01 / 02 / 03`) to organize ideas — Work With Me, the BrandForge hub, Academy cards, a "here's what I focus on" section — it should read as a table-of-contents marker, "part one of a body of thought," not a pricing-tier label .

Numeral treatment (size, weight, whether it's a small tag or a large ghosted background numeral) can vary by context and is a good place for creative exploration; keep it in a teal-family or ink color consistent with the rest of the palette, and keep the *feeling* — chapters, not tiers — consistent even where the exact styling isn't identical across every instance .

### Progressive Disclosure
- For content-dense sections written by the client (course curricula, "who this is for" lists, module breakdowns), default to a calm, scannable summary with the full itemized content available via a clean expand/collapse interaction — not an accordion that looks like a FAQ widget, but a considered "show full curriculum" pattern consistent with the rest of the type system .
- Never hide content behind disclosure that a visitor needs to make a decision (price, format, who it's for at a glance) — only the granular depth (full module list, session-by-session breakdown) goes behind the toggle .
- No client wording is changed by this pattern — it only changes how much is visible by default .

### Footer
- Solid Near-Black Teal (`#02232A`) background — the darkest structural moment on the site, anchoring the page rather than trailing off into more white space .
- All text in white or a light, muted tint (white at reduced opacity for secondary lines) — never gray-on-dark, which reads muddy against this dark a background .
- Links (email, LinkedIn, Instagram) underline or brighten to Muted Teal on hover, not Deep Teal — Deep Teal doesn't have enough contrast against Near-Black Teal to read as a clear hover state .

### Icons & Dividers
- Line icons only (1.5–2px stroke), never filled/glyph style — matches the hand-drawn accent line already used in the brand assets (the loose freehand squiggle) . Consider using that same loose line-art motif as a recurring signature graphic element (section dividers, hero accents) — it's the one "human, warm" texture against an otherwise geometric system .
- Dividers: 1px `--gray-200`, full-bleed or content-width, used to separate sections instead of heavy color blocks where possible .

### Imagery
- Personal photography (real photos of the person) over stock imagery or illustration — reinforces "a person with a point of view," not a faceless service .
- If duotone treatment is used on photos, map shadows to `#0A0A0A` and highlights to `#439aa9`/white — ties photography back into the palette without looking like a filter gimmick .
- **Production bar for an executive and HNW audience:** photography must read as genuinely professional — proper lighting, real locations or a considered studio setup, no visible compression artifacts or upscaling softness . A single excellent photo beats several adequate ones; don't pad the page with imagery to "fill space." 
- **Anything depicting Dami specifically must be real photography, never AI-generated** — a synthetic likeness of a named real person presented as documenting real work is a fabrication, not a placeholder . Generated imagery is reserved for non-representational supporting graphics (icons, abstract textures, generic non-identifiable stock-style scenes) .
- **Social/share preview (OG image):** every primary page needs a considered Open Graph card — this is frequently the *first* impression for this audience, whether it's a C-suite principal, a corporate L&D buyer, or a marketing professional who forwards the link rather than browsing live . Treat it as seriously as the page itself, not an auto-generated screenshot .

---

## Voice-to-Visual Mapping

| Desired feeling | Design lever |
|---|---|
| Authority | Deep Teal + Black, confident type scale, generous white space, restrained color use |
| Clarity | Strict type hierarchy, 8px grid, one idea per section, sentence-case headlines |
| Warmth | Hand-drawn line accents, real photography, Muted Teal highlights, human sentence-case copy |
| "Not selling to me" | No stock "team high-fiving" imagery, no aggressive banner CTAs, no countdown/urgency patterns, no shadow-heavy SaaS card style |

---

## Do / Don't

**Do**
- Let white space and typography carry most of the visual weight .
- Use Muted Teal as a single, deliberate accent per view .
- Keep Roc Grotesk confined to labels, tags, and buttons .
- Use the hand-drawn line motif as a recurring signature detail .
- Let dense client content breathe via progressive disclosure rather than cramming everything above the fold .

**Don't**
- Don't use warm-toned neutrals (cream, beige, tan, yellow-gray) — backgrounds are white, black, or cool gray only .
- Don't use emojis anywhere in the interface .
- Don't set body copy in Roc Grotesk or headlines in anything but Montserrat .
- Don't use stock "corporate services" imagery or generic icon packs that dilute the personal-brand feel .
- Don't add a client logo wall or invented stat-card metrics — this is a person's site, not an agency's proof-of-work page .
- Don't reach for default "SaaS-isms" to fill space: icon-in-a-circle feature grids, overused badge/pill counts, cartoon/flat illustration packs, gradient-mesh backgrounds, or generic "trusted by" sections without real substance behind them . If a section idea could be swapped into any B2B SaaS landing page unchanged, it doesn't belong here .
- Don't ship a page without a considered Open Graph/share image — a default screenshot or blank card undercuts the brand the moment a link is shared .

---

## Technical Implementation & Workflow Guidelines

### Recommended Tech Stack
To ensure consistency across human developers and the Antigravity AI, use this stack :
* **Framework:** Next.js (React) .
* **Styling:** Tailwind CSS (configure all brand colors and fonts in `tailwind.config.js`) .
* **Forms:** React Hook Form . Submit to Next.js API routes (or placeholder endpoints until the payment gateway is finalized) .
* **Content:** All copy MUST be pulled verbatim from the provided `Website - FINAL.docx` reference file .

### Asset & Logo Placement Constraints
* **Global Logo:** The main client logo (located in root) is used in the main navigation across the site .
* **Client Signature:** MUST ONLY be used on the Homepage (image located in root) .
* **BrandForge Logo:** MUST ONLY be used on the specific BrandForge pages .

### Information Architecture & Routing
Antigravity and the development team must follow this exact page structure and nested routing :

* **`/`** (Home) 
* **`/work-with-me`** (Includes sections/components for: Advisory, Speaking, Training) 
* **`/contact`** 

**BrandForge Ecosystem (Nested Pages):**
The BrandForge section is a multi-page directory . It MUST be structured with the following sub-pages :
* **`/brandforge`** (Landing/Overview: What is BrandForge) 
* **`/brandforge/the-forge-room`** (Includes the program details and application form) 
* **`/brandforge/the-brandforge-network`** (Community details page) 
* **`/brandforge/roundtable`** (Includes the registration form) 
* **`/brandforge/academy`** (The Academy landing page listing all available courses) 
  * **`/brandforge/academy/interview-prep-sprint`** (Individual course detail page) 
  * **`/brandforge/academy/1-on-1-strategy-session`** (Individual course detail page) 
  * **`/brandforge/academy/switching-into-marketing`** (Individual course detail page) 
  * **`/brandforge/academy/commercial-marketing-and-growth`** (Individual course detail page) 

*Note for Academy Courses:* Each course requires its own detail view/page linked from the Academy page (Interview Prep Sprint, 1:1 Strategy Session, Switching Into Marketing, Commercial Marketing & Growth Course) .

### Form Data Structures
When Antigravity generates forms, it must include these exact fields :
* **Speaking & Training Inquiries:** Standard contact fields (Name, Email, Message) .
* **The Forge Room Application:** Full name, Email address, WhatsApp number, Where are you currently based?, LinkedIn Profile Link .
* **BrandForge Roundtable Registration:** Full name, Email address, WhatsApp number, Where are you currently based?, LinkedIn Profile Link .

### UI Components: The Course Card (Academy)
When building the course listings for "The BrandForge Academy", developers and AI MUST adhere to the provided design reference image :
* **Layout:** Vertical card layout with a clean white background and subtle shadow .
* **Hero Image:** Edge-to-edge image at the top of the card .
* **Meta Info:** Duration text sits above the title in a small, muted Roc Grotesk font .
* **Title:** Bold `Montserrat` font . **Crucial detail:** The title must be preceded by a thick vertical accent line (use Primary color `#439aa9`, do NOT use red) .
* **Description:** Short, concise excerpt below the title .
* **Alert/Deadline Text:** Muted text indicating investment (e.g., "₦50,000") .
* **Footer:** Bottom alignment containing the format on the left, and a pill-shaped button on the right, filled with the Primary color `#439aa9` .

### Development Timeline & Milestones
All work must map to the project timeline outlined in `Dami_Owolabi_Website_Project_Timeline.docx` :
* **Week 1:** Setup, Design System config, Home page build .
* **Week 2:** Work With Me (all sections), Contact, BrandForge Overview .
* **Week 3:** BrandForge Programs (Forge Room, Network, Academy landing page) .
* **Week 4:** Course detail pages, Form integrations, QA, First Client Preview .
* **Weeks 5-6:** Client Review, Feedback implementation, Final handover .

### Git & Collaboration Workflow
* **Branching:** Always branch off `main` for your specific page (e.g., `feature/brandforge-academy`) .
* **Consistency:** Before building a custom UI element, check if a teammate has already built a reusable component (like a Button, Form Input, or Course Card) . 
* **QA:** All forms and layouts must be tested for responsiveness across mobile, tablet, and desktop before opening a Pull Request .