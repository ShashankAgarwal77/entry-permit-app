# AI Context Index

This folder is the context layer for the **Entry Permit App**. Read this file first, then open only what your task needs. Everything here is derived from `PRODUCT.md` (strategy) and `DESIGN.md` (visual system) at the repo root — those two remain the source of truth; this folder expands them into role, job, workflow, and knowledge detail.

## What this app is

Self-serve visitor entry for government office buildings: a visitor applies for a visit, an Approving Officer approves it, the visitor receives a time-boxed digital pass, and a CISF guard verifies identity (QR + simulated face match) at the gate — no manual paperwork, no guard negotiation. See `PRODUCT.md` for the full strategic picture.

## Map

### `product/roles/` — who uses this and what they're allowed to do
- `visitor.md` — the member of the public applying for their own pass.
- `approving-officer.md` — internal staff who approve/reject requests.
- `gate-security.md` — CISF guard verifying visitors at the entrance.

### `product/jobs/` — jobs-to-be-done, JTBD format, per role
- `visitor.md` — 3–5 jobs across apply → track → carry pass → get verified.
- `approving-officer.md` — 3–5 jobs across review → decide → revisit.
- `gate-security.md` — 3–5 jobs across scan → verify → handle edge cases.

### `product/workflows/` — end-to-end flows with states and edges
- `onboarding.md` — first open through signed-in and ready to apply (visitor first-run).
- `request-and-approval.md` — request submitted through pass issued.
- `gate-verification.md` — arrival through allow/deny at the gate.
- `manual-fallback.md` — what happens when automated verification can't proceed.

### `knowledge/domain/` — the rules of the domain
- `entry-permit-rules.md` — pass model, OTP login, simulated identity, privacy rules.

### `knowledge/tech/` — how we build
- `conventions.md` — Next.js, DESIGN.md-token CSS, mobile-first, file layout.

## Reading order for a new task
1. This INDEX.
2. The role(s) your task touches.
3. The workflow your task lives in.
4. `knowledge/domain/entry-permit-rules.md` for any rule question.
5. `knowledge/tech/conventions.md` before writing code.

## Scope note
Three roles only for now: **Visitor, Approving Officer, Gate Security**. A Facility Admin role is deferred and intentionally absent from this layer.
