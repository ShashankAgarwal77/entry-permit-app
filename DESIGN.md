---
name: Entry Permit App
description: Self-serve visitor entry permits — apply, get approved, verify at the gate.
colors:
  white: "oklch(100% 0 0)"
  black: "oklch(0% 0 0)"
  teal-50: "oklch(97% 0.020 195)"
  teal-100: "oklch(94% 0.035 195)"
  teal-200: "oklch(88% 0.060 195)"
  teal-300: "oklch(80% 0.080 195)"
  teal-400: "oklch(70% 0.100 195)"
  teal-500: "oklch(60% 0.110 195)"
  teal-600: "oklch(52% 0.100 195)"
  teal-700: "oklch(44% 0.090 195)"
  teal-800: "oklch(36% 0.070 195)"
  teal-900: "oklch(28% 0.050 195)"
  slate-50: "oklch(98% 0.003 240)"
  slate-100: "oklch(95% 0.005 240)"
  slate-200: "oklch(90% 0.007 240)"
  slate-300: "oklch(84% 0.009 240)"
  slate-400: "oklch(72% 0.012 240)"
  slate-500: "oklch(58% 0.014 240)"
  slate-600: "oklch(46% 0.014 240)"
  slate-700: "oklch(36% 0.013 240)"
  slate-800: "oklch(26% 0.011 240)"
  slate-900: "oklch(16% 0.008 240)"
  green-100: "oklch(94% 0.050 150)"
  green-600: "oklch(52% 0.140 145)"
  amber-100: "oklch(94% 0.060 85)"
  amber-600: "oklch(58% 0.160 80)"
  red-100: "oklch(94% 0.050 20)"
  red-600: "oklch(52% 0.190 25)"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1rem + 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.teal-600}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.teal-700}"
    textColor: "{colors.white}"
  button-primary-disabled:
    backgroundColor: "{colors.slate-200}"
    textColor: "{colors.slate-400}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.teal-700}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.slate-50}"
    textColor: "{colors.teal-700}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  input-field-focus:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
  input-field-error:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
  status-dot-pending:
    backgroundColor: "{colors.amber-600}"
    rounded: "{rounded.full}"
    size: "8px"
  status-dot-approved:
    backgroundColor: "{colors.green-600}"
    rounded: "{rounded.full}"
    size: "8px"
  status-dot-denied:
    backgroundColor: "{colors.red-600}"
    rounded: "{rounded.full}"
    size: "8px"
  status-dot-verified:
    backgroundColor: "{colors.teal-700}"
    rounded: "{rounded.full}"
    size: "8px"
  entry-pass-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.lg}"
    padding: "24px"
  app-shell:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    width: "640px"
    padding: "0 16px"
  scanner-viewport:
    backgroundColor: "{colors.slate-100}"
    textColor: "{colors.slate-600}"
    rounded: "{rounded.lg}"
  gate-verdict:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    padding: "24px"
  otp-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.sm}"
  button-loading:
    backgroundColor: "{colors.teal-600}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
  visit-request-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.md}"
    padding: "16px"
  identity-summary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: Entry Permit App

## 1. Overview

**Creative North Star: "The Boarding Pass"**

This system borrows its posture from the airline boarding pass and the airport checkpoint: a single credential that moves a person from request to approval to a scannable pass, verified in seconds and never re-explained to a human at the door. Like Global Entry and other digital-government services, credibility comes from restraint and plain language, not seals or ornamentation. Like Notion and Linear, the interface is built on a single pure-white canvas, hairline borders instead of boxed cards, and one quiet accent — nothing to figure out, nothing decorative competing for attention.

The system explicitly rejects the glossy travel-brand marketing site (no lifestyle photography, no hero sections selling a destination) and the enterprise dashboard (no dense sidebars, nested cards, or data-table overload). It also carries PRODUCT.md's anti-references forward: no playful consumer-SaaS aesthetic, and no clunky legacy government e-portal.

**Key Characteristics:**
- Pure white is the only background color in the system; separation between surfaces comes from a 1px border, never a tonal fill, at rest.
- One primary task per screen; status is always the loudest thing on it.
- Restrained color: teal marks meaning (action, identity) and appears nowhere else; status color lives in small dots and text, not filled backgrounds.
- Checkpoint-legible: the gate verification view must be readable in under a second, not read.
- Plain language over bureaucratic language throughout.
- Light-only for now; no dark mode scope yet.

## 2. Colors

Minimal, Linear/Notion-style strategy: **white and black are the two structural anchors** — white is the entire app's background, black (and near-black ink) carries every word of text and the one functional element that demands true contrast, the QR code. Slate is a quiet supporting ramp for borders and secondary text. Teal is the single accent, used sparingly and only for action and identity — never for decoration or as a fill. All values are OKLCH per this system's OKLCH-throughout doctrine; note Stitch's linter will flag non-hex values with a warning, which is expected and accepted here.

### Primary — Teal ramp
- **teal-50** (`oklch(97% 0.020 195)`) – **teal-100** (`oklch(94% 0.035 195)`): faint accent wash, e.g. secondary-button hover fill, "Verified" status text-on-hover contexts.
- **teal-200** (`oklch(88% 0.060 195)`) – **teal-400** (`oklch(70% 0.100 195)`): available for future data-visualization or illustrative accents; not assigned to a component today, kept out of the UI chrome to protect the One Voice Rule.
- **teal-500** (`oklch(60% 0.110 195)`): the "identity" teal — reserved for the visitor's own QR/pass accent framing, if the pass ever needs a colored border treatment.
- **teal-600** (`oklch(52% 0.100 195)`): **base action color.** Primary button fill, links, active states, active nav underline.
- **teal-700** (`oklch(44% 0.090 195)`): primary-button hover/pressed state; secondary-button text; "Verified" status dot + text.
- **teal-800** (`oklch(36% 0.070 195)`) – **teal-900** (`oklch(28% 0.050 195)`): reserved for a future dark mode, if scoped later.

### Structural anchors — White & Black
- **white** (`oklch(100% 0 0)`): the app's only background color. Every screen, every surface — visitor form, officer review, gate scanner — sits on pure white. No tinted canvas.
- **black** (`oklch(0% 0 0)`): reserved for the one place true contrast is functional, not stylistic — the QR code on the Entry Pass Card. Pure black modules on pure white background maximize scan reliability; this is the single spot in the system where a true 0%/100% pair is required rather than a design choice.

### Neutral — Slate ramp (supporting role only)
Slate never serves as the page background now — white owns that role. Slate exists purely for borders, dividers, and text that sits a step below full ink weight.

- **slate-50** (`oklch(98% 0.003 240)`): the *only* fill exception — hover/active state background for ghost buttons and list rows. Never used at rest.
- **slate-100** (`oklch(95% 0.005 240)`): pressed-state fill, one step darker than hover.
- **slate-200** (`oklch(90% 0.007 240)`): the system's primary separator — 1px borders on cards, inputs, and dividers between form sections and list rows. Does the job tonal layering used to do.
- **slate-300** (`oklch(84% 0.009 240)`): disabled-state borders and icon strokes.
- **slate-400** (`oklch(72% 0.012 240)`): disabled text, placeholder text ceiling — never used for real status/body copy (see Named Rules).
- **slate-500** (`oklch(58% 0.014 240)`) – **slate-600** (`oklch(46% 0.014 240)`): secondary/metadata text (timestamps, helper text) where full ink weight would compete with primary content.
- **slate-700** (`oklch(36% 0.013 240)`) – **slate-800** (`oklch(26% 0.011 240)`): reserved, unused today.
- **slate-900** (`oklch(16% 0.008 240)`): **Ink.** All body text and headings — a near-black, not pure black, so large blocks of body copy stay comfortable while still comfortably clearing WCAG AA (4.5:1) against white.

### Status colors (semantic, not decorative)
- **Pending** — `amber-600` (`oklch(58% 0.160 80)`) dot + text.
- **Approved** — `green-600` (`oklch(52% 0.140 145)`) dot + text.
- **Denied/Error** — `red-600` (`oklch(52% 0.190 25)`) dot + text; same red for input-error borders and helper text.
- **Verified** — `teal-700` dot + text: the one status that borrows the brand accent rather than a separate hue, since a successful gate scan is the system's own "boarding accepted" moment.
- `green-100` / `amber-100` / `red-100` remain defined but are used in exactly one place — the Inline Alert/Banner background — never on badges, buttons, or cards. Keeping tinted fills to a single component is what keeps the palette feeling restrained rather than color-coded everywhere.

### Named Rules
**The One Voice Rule.** Teal is the only decorative accent in the system, and teal-600 is its one true action color — every button, link, and active state resolves to it (or its 700 hover step). Every other color on screen is either ink, a slate border/text step, or a semantic status color; nothing competes with status for the visitor's attention.

**The Border-Not-Fill Rule.** Every surface is pure white at rest. Cards, inputs, and list rows separate from the page with a 1px `slate-200` border, never a background tint. `slate-50`/`slate-100` fills exist only as a direct response to hover or pressed state — if nothing is being interacted with, there is no fill.

## 3. Typography

**Body & Display Font:** Manrope, with `ui-sans-serif, system-ui, sans-serif` fallback.

**Character:** One family, five weight-driven roles, no separate mono or serif. Manrope's geometric-humanist shape reads clean and technical-neutral. Scale is intentionally modest — Linear and Notion never shout with type, and neither does this system; hierarchy comes from weight and spacing, not oversized display sizes.

### Hierarchy
- **Display** (700, `clamp(1.75rem, 1rem + 3vw, 2.5rem)`, line-height 1.15, letter-spacing -0.01em): the pass/QR screen and top-level status ("Approved", "Denied") — the one moment a bigger, bolder mark is earned, capped well short of a marketing hero size.
- **Headline** (600, 1.5rem/24px, line-height 1.25, letter-spacing -0.01em): screen titles ("Apply for a Visit", "Review Application").
- **Title** (600, 1.125rem/18px, line-height 1.3): section headers within a form or review screen.
- **Body** (400, 1rem/16px, line-height 1.5, 65–75ch max where prose appears): form labels, instructions, status descriptions. Kept at 16px rather than a denser Linear-style 13–14px, since visitors bring varied literacy and tech comfort — minimalism here means restraint in color and chrome, not shrinking text.
- **Label** (500, 0.8125rem/13px, line-height 1.4, letter-spacing 0.01em): field labels, status text, metadata (timestamps, permit IDs).

### Named Rules
**The No-Whisper Rule.** Status and instructional text never drops below `slate-600` — if it matters enough to show a visitor or a guard, it meets full body-text contrast. `slate-400` is a ceiling reserved for disabled/placeholder states only.

## 4. Elevation

Flat by default, everywhere. With white as the only background color, this system doesn't have tonal layers to lean on — separation is handled entirely by the `slate-200` border (see the Border-Not-Fill Rule). Shadow is reserved for exactly one situation: a surface that temporarily detaches from the page (a modal or confirmation sheet opening). Motion energy is Responsive, not Choreographed, so even that shadow is quiet and appears only on the state change itself.

### Shadow Vocabulary
- **modal-elevated** (`box-shadow: 0 8px 24px oklch(0% 0 0 / 0.08)`): the only shadow in the system, built from the pure-black token at low opacity rather than a tinted color — the most neutral possible shadow. Used when a sheet/modal (e.g. "Confirm Cancel Application") lifts off the page on open; removed instantly on close, no lingering ambient shadow elsewhere.

### Named Rules
**The Flat-by-Default Rule.** Surfaces are flat at rest, separated by border rather than shadow or fill. `modal-elevated` appears only as a direct response to an interactive state (a modal/sheet opening), never as ambient decoration on static cards like the Entry Pass Card.

## 5. Components

Scoped to the **visitor flow** first (Apply → Review → Approved → Pass → Verified), per PRODUCT.md's "one flow, three lenses" principle. **Gate Security** components begin below (Scanner / Camera Viewport, Gate Verdict Panel); they reuse the same tokens rather than introducing a second language. Approving Officer components follow next.

**Component list:** App Shell, Text Input, Select/Dropdown, Date & Time Picker, Document/Photo Upload, Button (Primary/Secondary/Disabled/Loading), Status Indicator (dot + label), Progress Stepper, Entry Pass Card, Visit Request Row, Identity Summary, Inline Alert/Banner, Empty State, Scanner / Camera Viewport (Gate Security), Gate Verdict Panel (Gate Security), OTP Code Input (Onboarding).

**The Generous Tap Rule (applies to every component below).** Every tappable control — button, icon-button, or link acting as a control — has at least a 44×44px hit area, even when its visible glyph or label is smaller (e.g. a close icon can render at 18px inside a 44px tap box). This turns PRODUCT.md's "generous touch targets" principle into a concrete, checkable minimum rather than a suggestion.

### App Shell (structural frame)
The persistent frame every screen renders inside — identical across all three roles, differing only in what the top bar shows and where content is routed. It is not a screen; it is the container that guarantees consistency and enforces the one-task-per-screen discipline.

- **Background:** pure `white`, full viewport. No tinted app chrome, no colored header bar — the shell disappears so the task is all that's left.
- **Structure (mobile-first, top to bottom):**
  1. **Top bar** — the Navigation component (app name/logo left, single "My Visits"/profile entry right), pinned to the top and separated from content by a 1px `slate-200` bottom border. Full-bleed, edge to edge.
  2. **Content region** — a single centered column on `white`, `max-width` 640px for form/detail screens so body copy stays within the 65–75ch reading measure; horizontal padding `spacing.md` (16px) on mobile, growing to `spacing.lg` (24px) at wider viewports. Officer queue / list screens may widen the column to ~880px, but never go full-bleed dense.
  3. **No persistent footer / bottom tab bar** — with a 2–3 item nav there is nothing to dock; a bottom bar would be enterprise-dashboard chrome. The single primary action lives inline in the content, one per screen.
- **Safe areas:** respect mobile safe-area insets (notch / home indicator) via `env(safe-area-inset-*)` so the top bar and any bottom-anchored primary action clear the hardware.
- **Scroll:** only the content region scrolls; the top bar stays put. The page body never scrolls horizontally.
- **Full-bleed variant (gate verification):** the Gate Verification screen drops the standard content `max-width` and runs edge to edge so the verdict fills the viewport at checkpoint-legible size — the one screen allowed to break the centered-column rule, because a guard reads it at arm's length in seconds.

**The Invisible Shell Rule.** The shell is pure-white frame plus a single hairline `slate-200` border, nothing more. It never introduces a colored header, a sidebar, a tab bar, or a second surface tone — every bit of color, emphasis, and action belongs to the content, not the chrome.

### Buttons
- **Shape:** `rounded.md` (8px) — a crisp, Linear-style corner, not a soft pill.
- **Primary:** `teal-600` fill, `white` text, `typography.label` (500 weight), padding `10px 20px`. The one primary action per screen (Apply, Submit, Confirm).
- **Hover/Pressed:** fill shifts to `teal-700`, no transform/scale — a color-only state change per Responsive motion energy.
- **Disabled:** `slate-200` fill, `slate-400` text — never `teal-600` at reduced opacity, which would imply the action is still live.
- **Secondary/Ghost:** transparent fill at rest, `teal-700` text, same shape and padding as Primary. Hover fills `slate-50` (the one permitted hover fill) — used for Cancel/Back, never paired with Primary in a way that makes two actions compete for attention.
- **Loading:** while a submit awaits a result (e.g. verifying an OTP), the primary button shows a small spinner before its label, stays disabled and `aria-busy`, and may read "Verifying…". This is the **one spinner** in the system — reserved for a submit awaiting a response, never for loading page content (use an Empty/skeleton for that); `prefers-reduced-motion` swaps the spin for a static state.

### Inputs / Fields
- **Text Input:** `white` background, `slate-200` 1px border, `rounded.sm` (6px), padding `10px 14px`, `typography.body`. Label sits above in `typography.label`/`slate-600`.
- **Focus:** border shifts to `teal-600` at 2px, no glow/ring, no fill change — consistent with the Border-Not-Fill Rule.
- **Error:** border shifts to `red-600`; background stays `white` (no red fill — a filled error state would break the one-fill-only-on-hover rule). Error message below in `red-600` at `typography.label` size, always paired with an icon (never color alone, per PRODUCT.md's accessibility principle).
- **Select / Dropdown** (purpose of visit, host/department): same shell as Text Input; options list opens via `position: fixed` or the native `<dialog>`/popover API so it isn't clipped by any `overflow: hidden` form container. The open list sits on `white` with a `slate-200` border, no shadow unless it needs to lift above other page content.
- **Date & Time Picker** (requested visit date/time): same input shell as the trigger; the calendar/time surface is `white` with a `slate-200` border, using `modal-elevated` only when presented as a detached bottom sheet on mobile.
- **Document/Photo Upload** (ID proof, selfie for face-verification enrollment): a dashed `slate-300` border drop-zone on `white`, `slate-500` icon + instruction text at rest; on a successful upload, the border becomes solid `slate-200` around a thumbnail with a small `green-600` check dot — reusing the Approved status color to confirm the file is accepted.

### OTP Code Input (Onboarding, signature component)
The 6-digit code entry on the OTP sign-in step — the one place the app collects a passcode.
- **Style:** six separate cells in a row, each a `white` box with a 1px `slate-200` border, `rounded.sm`, sized to a ~48px touch target, one digit per cell in `typography.title` with tabular numerals, centered. Never a filled cell background at rest (Border-Not-Fill Rule) — the digit and border carry state.
- **Focus:** the active cell's border shifts to `teal-600` (2px via box-shadow, no glow), consistent with Text Input.
- **Error:** every cell's border shifts to `red-600`, with a message below in `red-600` + icon ("That code doesn't match. In this demo, the code is `123456`.").
- **Behavior:** auto-advance on each digit, backspace steps to the previous cell, a full-code **paste** distributes across all six cells, `inputMode="numeric"`; the six cells are wrapped as one labelled group ("One-time passcode") so screen readers announce a single field, not six.
- **Demo rule:** the accepted code is always `123456` — never real authentication (domain rule).

### Status Indicator (signature component)
Replaces a conventional filled "badge" with a quieter dot-plus-label pairing, closer to how Linear marks issue state than a colored pill.
- **Style:** an 8px filled circle (`status-dot-*`) followed by `typography.label` text in `slate-900` — the dot carries the color, the text stays neutral ink. No background fill, no border, no pill shape.
- **Pending:** `amber-600` dot + "Pending".
- **Approved:** `green-600` dot + "Approved".
- **Denied:** `red-600` dot + "Denied".
- **Verified:** `teal-700` dot + "Verified" — the one status that borrows the brand accent.
- Dot + label always ship together; color alone never carries the status (PRODUCT.md accessibility requirement). On the Entry Pass Card and gate-verification screen, the label additionally appears at `typography.display` size for checkpoint-speed legibility — the dot there grows to accompany it, not disappears.

### Cards / Containers — Entry Pass Card (signature component)
The system's one true "boarding pass": the credential a visitor holds between Approval and Gate Verification.
- **Corner Style:** `rounded.lg` (12px).
- **Background:** `white`, separated from the page by a `slate-200` 1px border (Border-Not-Fill Rule) — no shadow at rest.
- **Shadow Strategy:** flat at rest; if presented in a modal/full-screen sheet, uses `modal-elevated` on entry only.
- **Content:** visitor name and photo (`typography.title`), visit date/time and host (`typography.body`), a large QR code rendered in pure `black` modules on pure `white` (the system's one true-contrast pairing, chosen for scan reliability, not style), and a Status Indicator (`status-dot-verified` or `status-dot-approved` + label) pinned top-right.
- **Internal Padding:** `24px` (`spacing.lg`) uniform.

### Navigation
- **Style:** a simple top bar on `white`, separated from content by a single `slate-200` bottom border — app name/logo left, a single "My Visits" or profile entry right. No sidebar, no nested menus (Notion-simple, per the anti-references).
- **Typography:** `typography.label`, `slate-900` text, `teal-600` for the active section indicator (a 2px underline, not a filled pill or background).
- **Desktop/tablet (≥640px):** links render inline in the top bar, exactly as above.
- **Mobile (<640px):** the inline links are replaced by a single hamburger icon-button (a `slate-900` icon, no fill, meeting the Generous Tap Rule below) at the top-right. Tapping it opens a **transient full-width panel** anchored directly under the top bar: `white` background, a `slate-200` top divider, nav items stacked vertically as 44px-tall rows with the same label + teal-underline-on-active treatment as desktop. It closes on item selection or an outside tap. This is a disclosure, not new permanent chrome — it doesn't violate the Invisible Shell Rule (no persistent sidebar, no colored surface) because nothing is visible until the guard/visitor/officer asks for it.
- **Account/profile entry:** a persistent icon-button at the far right of the top bar (a `slate-900` user icon in a 44px tap target, no fill), linking to the Profile screen. It sits after the inline nav links on desktop and to the left of the hamburger on mobile — the "profile entry right" the Navigation opens with. It never grows into a menu or colored surface; it's a single quiet affordance, one tap to the profile.

### Progress Stepper (signature component)
Apply → Review → Approved → Pass → Verified, always visible on any screen within an active application.
- **Style:** horizontal row of steps connected by a `slate-200` line; completed steps are a filled `teal-600` circle with a `white` check glyph, the current step is an outlined `teal-600` ring on `white`, upcoming steps are a `slate-300` outline with `slate-400` label text.
- **Purpose:** the direct expression of PRODUCT.md's "status is always unambiguous" principle — a visitor should be able to glance at this and know exactly where they stand without reading a paragraph.
- **Reusable for any multi-step sequence, not only the top-level journey.** The same component (a step label list + a current index) also drives sub-flows nested inside one journey stage — e.g. the Apply form's own internal steps (Your details → Visit details → ID photo → Review) before that stage hands off to Review/Approved. Same visual language throughout; the label set is contextual to whichever flow it's placed in.

### Visit Request Row (signature component)
The list item for a submitted-but-not-yet-decided visit on My Visits — simpler than the Entry Pass Card because there's no pass to show yet.
- **Style:** `white` background, `slate-200` 1px border, `rounded.md` (8px), `16px` (`spacing.md`) padding — the same bordered list-row language as everywhere else (Border-Not-Fill Rule).
- **Content:** a two-column layout — left side carries purpose of visit (`typography.title`) and host/department (`typography.body`/`slate-600`); right side stacks the requested date/time (`typography.label`/`slate-600`) above a **Status Indicator** (`Pending` today; the same component will show `Approved`/`Denied` once the officer-review flow exists).
- **Use:** rows stack with `spacing.md` gaps on My Visits once at least one request exists, replacing the Empty State.

### Identity Summary (signature component)
A compact, read-only view of the visitor's enrolled identity — so the same identity reads consistently in the two places it appears: the Profile screen header and the Apply/Review "Applying as…" summary.
- **Style:** `white` background, `slate-200` 1px border, `rounded.md` (8px), `16px` (`spacing.md`) padding (Border-Not-Fill Rule). A horizontal row.
- **Content:** left, a small ID-photo thumbnail (`rounded.sm`, `slate-200` border) or an initials-avatar fallback (`teal-50` fill, `teal-700` initials — the pass-card avatar treatment); then the visitor **name** (`typography.title`) with an optional secondary line for the phone (`typography.label`/`slate-600`); and an **"ID enrolled"** confirmation — a `green-600` check icon + label, reusing the Document/Photo Upload accepted treatment (icon + label, never color alone).
- **Optional trailing action:** a plain-text **Edit** link (`teal-700`, Generous Tap Rule) on the Profile screen; omitted in the read-only Apply/Review context.
- **Use:** the header of the Profile screen (with Edit), and the identity block on the Apply flow / Review step (without Edit), where the visitor confirms "this is who's applying" before choosing visit details.

### Inline Alert / Banner (signature component)
- **Style:** full-width, `rounded.sm`, no border — the system's one deliberate exception to the Border-Not-Fill Rule: background tint matches the message's semantic color (`amber-100`/`green-100`/`red-100`) at reduced footprint, icon + `typography.body` text in `slate-900` (not tinted) so the message copy stays fully legible.
- **Use:** visit reminders ("Bring a government-issued ID tomorrow"), denial reason text, pass-expiry warnings. Dismissible with a plain `slate-500` close icon, never a button.

### Empty State (signature component)
- **Style:** centered within the content area, a single simple line-icon in `slate-300`, `typography.title` headline ("No visits yet"), one line of `typography.body`/`slate-600` supporting text, and a single Primary Button ("Apply for a Visit"). No illustration, no marketing copy, no card container around it — just white space and one task, stated plainly.

### Scanner / Camera Viewport (Gate Security)
The guard's scan surface on the Gate Verification screen — a framed viewport the guard points at a visitor's pass.
- **Frame:** a `rounded.lg` viewport with a 1px `slate-200` border, centered in the full-bleed screen at a comfortable handheld size (roughly square to 3:4). The live device-camera feed fills it and is treated as *content* (like a photo), not a surface tone — so the frame stays on-brand even though the video is full-bleed inside it.
- **Reticle:** a corner-bracket framing overlay in `teal-500` (the "identity" accent) centered over the feed — the one place teal marks the scan target. A quiet scanning shimmer animates the reticle only; a `prefers-reduced-motion` alternative holds it static.
- **Before permission / no camera:** a neutral `slate-100` placeholder (never dark chrome) with a `slate-500` camera icon and a one-line instruction — the surface stays white/slate, consistent with Border-Not-Fill.
- **Trigger:** a single Primary Button — in this prototype **"Simulate scan"**, which resolves to a seeded demo visitor (no real QR decode, no biometric match — the guard confirms identity by eye per the domain rules). Manual pass-ID entry is offered as the fallback affordance.
- **No dark exception:** unlike the QR's pure black, this component introduces **no** new dark surface — the camera feed is content, and its empty state is `slate-100`.

### Gate Verdict Panel (Gate Security, signature component)
The checkpoint verdict — the reason the whole screen exists, legible in under a second.
- **Layout:** full-bleed (App Shell `full` variant), a single centered column with generous whitespace; the verdict is the loudest thing on a `white` surface.
- **Loud through scale, not fill:** the verdict is a large status **icon** (a check for Verified) in the status color plus the verdict word at `typography.display` size via **Status Indicator (`lg`)**. The surface stays **pure white** — there is **no filled green/red background**. Color stays concentrated in the icon + dot + display text, so Border-Not-Fill and One Voice hold even at checkpoint scale.
- **Identity match:** below the verdict, the *simulated* identity — a large ID-photo block (a `slate-100`-framed placeholder in the prototype, captioned "Simulated ID photo"), the visitor **name** (`typography.title`), and **host + visit window + pass ID** (`typography.body`/`label`) — so the guard matches the person by eye.
- **Actions:** one Primary Button to **Admit** (marks the single-visit pass used on confirm) and a Secondary to **Refuse**; a quiet "Scan next" resets to Ready-to-scan.
- **Verified** uses `status-dot-verified` (teal-700) — the system's "boarding accepted" moment. **Denied / Expired / Already used** reuse the `denied` indicator and plain-language reason text (specced with those states).
- **Accessibility:** the verdict is announced via an `aria-live` region; color never carries the verdict alone.

## 6. Do's and Don'ts

### Do:
- **Do** keep every surface pure `white` at rest; separate with a `slate-200` border, not a tint.
- **Do** keep one primary task and one primary action per screen.
- **Do** use plain language for every status and instruction — no bureaucratic phrasing.
- **Do** pair status color with a dot/icon and text label, never color alone.
- **Do** make the gate-verification screen legible in under a second.
- **Do** use `teal-600` as the single source of the brand accent; every button/link/active-state resolves to it or its `teal-700` hover step.
- **Do** keep body and status text at `slate-900`/`slate-600` or darker — never lighter, per the No-Whisper Rule.
- **Do** render the Entry Pass Card's QR code in pure `black` on pure `white` — the one place true contrast is functional, not stylistic.

### Don't:
- **Don't** fill a card, input, or list row with a tinted background at rest — `slate-50`/`slate-100` are hover/pressed states only.
- **Don't** build a playful consumer-SaaS aesthetic — no mascots, no casual copy, no marketing gradients or flourishes.
- **Don't** build a clunky legacy government e-portal — no dense bureaucratic forms, tiny text, or dated table-heavy layouts.
- **Don't** design like an airport-lounge marketing site — no glossy lifestyle photography or destination-selling hero sections.
- **Don't** design like an enterprise dashboard — no heavy sidebars, nested cards, or data-table overload; keep each screen to one clear task, Notion-simple.
- **Don't** use light gray (`slate-400` or lighter) for status or body text at any size — it fails the checkpoint-legibility bar this system exists for.
- **Don't** apply a filled background to a Status Indicator — it's a dot + label, not a pill, everywhere except the Inline Alert/Banner.
- **Don't** apply `modal-elevated` shadow to any static, at-rest surface — it's reserved for genuine open/close state changes only.
- **Don't** give the app a colored header bar, a sidebar, or a bottom tab bar — the App Shell is invisible white frame plus one hairline `slate-200` border (The Invisible Shell Rule).
- **Don't** flood the gate verdict screen with a full green/red background — the verdict reads big through scale + a large status icon on `white`, never a color fill.
