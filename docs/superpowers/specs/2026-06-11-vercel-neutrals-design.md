# Vercel Neutrals Design — Portfolio Polish

**Date:** 2026-06-11
**Status:** Approved
**Approach:** Minimal changes, maximum polish. Single blue accent, tighter hierarchy, Vercel-like restraint.

## Design Principles

1. **Restraint over addition** — Remove before adding. Every element earns its place.
2. **One accent, surgical placement** — Blue appears in ~6 places. Nowhere else.
3. **Typographic authority** — The name dominates. Section headings are clear but not shouting.
4. **Vercel-like precision** — Flat buttons, sharp borders, no gradients unless they serve clarity.

## Color System

### Accent Color
| Mode | Token | Hex | Usage |
|------|-------|-----|-------|
| Light | `blue-500` | `#3B82F6` | Active states, CTAs, markers |
| Dark | `blue-400` | `#60A5FA` | Same roles in dark mode |

### Where Accent Appears (exhaustive list)
1. **Hero dice markers** (⚀⚁⚂) — tagline prefix dots
2. **Navigation active underline** — active link indicator
3. **"Send Enquiry" button** — primary CTA on contact page
4. **PR filter active tab** — GitHub Proof of Work section
5. **Project card hover border** — subtle tint on hover
6. **Contact form focus ring** — input focus state

### Neutrals (unchanged from current)
- Light bg: `neutral-50` (#FAFAFA)
- Dark bg: `neutral-950` (#0A0A0A)
- Primary text: `neutral-900` / `neutral-50`
- Secondary text: `neutral-500` / `neutral-400`
- Borders: `neutral-200` / `neutral-800`

## Typography Changes

| Element | Current | New | Why |
|---------|---------|-----|-----|
| Hero name | `text-3xl font-bold` | `text-4xl md:text-5xl font-bold tracking-tight` | Name must dominate |
| Dice markers | `font-semibold` (neutral) | `font-mono text-blue-500 dark:text-blue-400` | Accent + terminal feel |
| Section headings | `text-3xl font-bold` | `text-3xl font-semibold` (keep weight, Instrument Serif is naturally bold) | Consistency |
| Tech Stack label | `text-xs font-medium` | `text-[10px] font-mono uppercase tracking-widest text-blue-500/70` | Vercel micro-label style |

## Component Changes

### Navigation (Navbar.tsx)
- Active link underline: `bg-neutral-900` → `bg-blue-500 dark:bg-blue-400`
- Hover pill: `bg-neutral-300/25 dark:bg-neutral-800/50` → `bg-neutral-200 dark:bg-neutral-800`
- Otherwise: unchanged

### Hero (page.tsx)
- Name size: `text-3xl md:text-3xl` → `text-4xl md:text-5xl`
- Dice markers: add `text-blue-500 dark:text-blue-400 font-mono`
- Tagline text: slightly recede — `text-neutral-700 dark:text-neutral-300` → `text-neutral-500 dark:text-neutral-400`

### Project Cards (projects.tsx)
- Card hover border: add `hover:border-blue-500/20 dark:hover:border-blue-400/20`
- Tech Stack label: restyle to `text-[10px] font-mono uppercase tracking-widest text-blue-500/70 dark:text-blue-400/70`
- Grid gap: `gap-5` → `gap-6`

### Timeline (timeline.tsx)
- Active chevron color on expanded: add `text-blue-500 dark:text-blue-400` when expanded

### GitHub Graph (githubgraph.tsx)
- PR filter active tab: `bg-white dark:bg-neutral-800` → `bg-blue-500 dark:bg-blue-400 text-white dark:text-white`

### Contact Page (contact/page.tsx)
- "Send Enquiry" button: replace gradient with solid blue
  - Remove: `bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900`
  - Remove: hover gradient classes
  - Add: `bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 text-white`
- Input focus rings: add `focus-visible:ring-blue-500/30 dark:focus-visible:ring-blue-400/30`

### Skills (skills.tsx)
- No changes. Marquee works as-is.

### Footer (footer.tsx)
- No changes needed.

### PageBorder (page-border.tsx)
- No changes. The hatched pattern is the signature element — keep it.

### Chatbot (chatbot-ui.tsx, chatbot.tsx)
- No design changes in this pass.

## Dark Mode Specifics

- Accent: `blue-400` (`#60A5FA`) for sufficient contrast on `neutral-950`
- Card hover borders: `border-blue-400/20` 
- Pattern border opacity: keep `dark:opacity-12` — correctly subtle
- Section dividers: keep `dark:opacity-15` on pattern-fg lines

## Files to Modify

1. `app/page.tsx` — hero name size, dice markers, tagline opacity
2. `app/contact/page.tsx` — button style, focus rings
3. `components/Navbar.tsx` — active underline, hover pill
4. `components/projects.tsx` — card hover border, tech label, grid gap
5. `components/timeline.tsx` — expanded chevron accent
6. `components/githubgraph.tsx` — PR filter active tab
7. `app/globals.css` — potentially add blue accent variables for consistency

## Out of Scope

- Layout restructuring
- Font changes
- New components or pages
- Animation additions
- Chatbot redesign
- FractalTree changes
- Mobile layout changes (already responsive)