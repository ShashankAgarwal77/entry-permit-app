# Entry Permit App — Agent Constitution

**This file is the constitution for the project. Every agent — Claude, Codex,
Gemini, or any other — must read it first and treat it, and the documents it
points to, as the binding source of truth.** The per-agent entry files
(`CLAUDE.md`, `GEMINI.md`) exist only to redirect here; Codex reads this file
natively. Do not put project rules in the per-agent files — they belong here.

## Read before any work

Read these in order before writing code or design. They are canonical; when in
doubt, they win over your own assumptions or training-data defaults.

1. **[PRODUCT.md](PRODUCT.md)** — who this is for and why: register, users
   (Visitor, Approving Officer, Gate Security), product purpose, brand
   personality, anti-references, design principles, accessibility.
2. **[DESIGN.md](DESIGN.md)** — the visual system: color tokens (OKLCH ramps),
   typography (Manrope), spacing/radius, elevation, and every component spec.
   All styling derives from its tokens.
3. **[ai/INDEX.md](ai/INDEX.md)** — the map of the deeper context layer. From
   there, open only what your task needs:
   - `ai/product/roles/` — what each role may see and do, and must never do.
   - `ai/product/jobs/` — jobs-to-be-done per role (JTBD format).
   - `ai/product/workflows/` — request-and-approval, gate-verification,
     manual-fallback (actors, steps, screen states, edge cases).
   - `ai/knowledge/domain/entry-permit-rules.md` — the domain rules (in brief below).
   - `ai/knowledge/tech/conventions.md` — how we build (in brief below).

You don't need to inline everything for every change — read the specific role,
workflow, and knowledge files relevant to your task.

## Non-negotiables (the short core)

The highest-frequency rules, summarized. The linked files remain authoritative;
this section is the always-on core so no agent skips them.

**Build**
- Next.js (App Router) + TypeScript + React 19, npm.
- Screens live in `src/app/`; reusable components in `src/components/`.
- Mobile-first. WCAG AA baseline: contrast, keyboard operability, screen-reader
  support, and a `prefers-reduced-motion` alternative for every animation.
- This Next.js version has breaking changes — see the framework rule below.

**Styling**
- Custom CSS only, driven by DESIGN.md tokens (CSS custom properties in
  `src/app/tokens.css`). **No Tailwind, no shadcn, no styling libraries.** Never
  hardcode a value a token already covers.
- Binding design rules: pure-white surfaces separated by 1px `slate-200` borders
  (**Border-Not-Fill**); `teal-600` is the single accent (**One Voice**); status
  is always a dot/icon **plus** a text label, never color alone; flat by default
  (one modal shadow only); the App Shell is invisible white frame + one hairline
  border — no colored header, sidebar, or bottom tab bar.

**Domain (hard rules)**
- **Never use real biometric or citizen data.** Identity is always *simulated*
  from an uploaded government-ID photo; the gate "face check" is simulated, never
  a live biometric match. Model the shape, not the real registry (DigiYatra /
  DPDP-inspired).
- Passes are **single-visit** and **time-boxed**; issued only on officer
  approval; never self-issued or self-edited by the visitor.
- OTP login is a demo — the code is always **`123456`**. Not production auth.

## Gates — the build workflow

**These gates are mandatory for every change — no exceptions, however small.**
Before building or changing any **screen or shared component** (`src/app/**` or
`src/components/**`), follow these gates in order and **STOP for the owner's
approval at each one.** Never skip a gate. Never collapse two gates into one.

### Gate 1 — Context-setup
Read the context for this screen: `ai/INDEX.md`, `PRODUCT.md` (product vision),
`DESIGN.md` (design vision), and the relevant `ai/product/roles/`,
`ai/product/jobs/`, and `ai/product/workflows/` files (execution vision).
- If any required file is **missing or doesn't cover this screen**, draft it,
  show the draft in the chat, and wait for approval.
- If everything already exists, **still STOP**: post "context confirmed" with
  links to the exact files you're building against, and wait for approval.

Do not touch code until this gate is approved.

### Gate 2 — Design-system
Build using only what's already in `DESIGN.md`. If the screen needs a color,
token, or component that isn't there, **do NOT invent it inline.**
- Propose the addition to `DESIGN.md` (the token or component spec), show the
  exact change in the chat, wait for approval, then build using it.
- **This gate is recurring, not a one-time pre-check.** The moment you reach for
  anything not in `DESIGN.md` — even mid-build during Gate 3 — STOP, return here,
  and do not continue until the addition is approved.

### Gate 3 — Screen-execution
Build using only `DESIGN.md` tokens and the `ai/` context. Before you show it,
"done" means:
- Styling references DESIGN.md tokens only (via `src/app/tokens.css`); zero
  hardcoded hex/px that a token already covers, no off-spec components.
- `tsc` and lint pass; the screen is browser-verified at mobile and desktop.
- It honors the binding design rules (Border-Not-Fill, One Voice, dot+label
  status, invisible App Shell) and WCAG AA.

Then show the result and **wait for the owner's review before calling it
finished.** Review feedback loops back through the relevant gate.

**The golden rule.** If you're ever unsure whether context or a component
exists, run Gate 1. If it doesn't exist, propose it in the chat (product or
design) and build only once it's approved. When in doubt, STOP and ask — never
guess, never proceed.

## Canonical sources

| File | Binds |
|---|---|
| [PRODUCT.md](PRODUCT.md) | Strategy: users, purpose, principles, anti-references |
| [DESIGN.md](DESIGN.md) | Visual system, component specs, and tokens |
| [ai/INDEX.md](ai/INDEX.md) | Roles, jobs, workflows, domain + tech knowledge |
| This file (`AGENTS.md`) | The constitution: reading order + non-negotiables |

If any of these conflict, surface it rather than guessing — and when you change
one, keep the others consistent.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Claude Code auto-imports

The lines below inline the core context into Claude Code sessions via its `@`
import syntax. Other agents ignore the `@` prefix and rely on the "Read before
any work" section above — the reading list, not these lines, is the portable
contract.

@PRODUCT.md
@DESIGN.md
@ai/INDEX.md
