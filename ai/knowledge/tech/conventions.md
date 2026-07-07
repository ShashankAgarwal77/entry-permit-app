# Tech: Conventions

How we build the Entry Permit App. Follow these unless a task explicitly overrides them.

## Stack
- **Next.js (App Router).** Note the project's `AGENTS.md`: this Next.js version may differ from training data — read the relevant guide in `node_modules/next/dist/docs/` before writing framework code, and heed deprecation notices.
- **TypeScript**, React 19.
- **npm** for package management.

## Styling
- **Custom CSS only, driven by `DESIGN.md` tokens.** No Tailwind, no shadcn, no component/styling libraries.
- **Tokens are the source of truth.** Every color, type role, radius, and spacing value comes from `DESIGN.md`'s frontmatter tokens (surfaced as CSS custom properties). Never hardcode a hex/px that a token already covers.
- **OKLCH throughout**, matching `DESIGN.md`.
- **The design rules are binding:** pure-white surfaces separated by 1px `slate-200` borders (Border-Not-Fill), teal as the single accent (One Voice), status as dot+label never color alone, flat-by-default elevation. See `DESIGN.md` for the full spec.

## Responsive
- **Mobile-first.** Design and write base styles for the phone first (the visitor's primary context), then layer breakpoints upward.
- Use relative units and fluid type (`clamp()`) per the token scale; test headings at every breakpoint so copy never overflows its container.

## File layout
- **Screens (routes) live in `src/app/`** — App Router pages/layouts.
- **Reusable components live in `src/components/`.**
- Keep one primary task per screen; compose screens from shared components rather than repeating markup.
- Component CSS: co-located custom CSS (CSS Modules or plain CSS wired to tokens) — no utility-class frameworks.

## Accessibility
- WCAG AA baseline: contrast, full keyboard operability, screen-reader support.
- Respect `prefers-reduced-motion` for every animation (Responsive motion energy means subtle transitions, always with a reduced-motion alternative).
- Plain language, generous touch targets, icon+text status — per `PRODUCT.md` and `DESIGN.md`.
