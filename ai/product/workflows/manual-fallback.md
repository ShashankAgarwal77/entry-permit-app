# Workflow: Manual Fallback

What happens when automated gate verification can't proceed — without losing accountability.

## When it triggers
- The visitor's phone is dead or lost, so there's no QR to scan.
- The QR is damaged, blurred, or won't scan.
- The scanner or system is temporarily unavailable.
- Any case where the normal gate-verification path can't return a verdict.

## Actors
- **Gate Security (CISF Guard)** — initiates and carries out the manual check.
- **System** — provides a manual lookup and records the fallback action.
- **Visitor** — provides identifying details in place of a scan.

## Steps
1. Guard confirms the automated path can't proceed.
2. Guard performs a manual lookup (e.g. by visitor name / reference) to find the approved visit.
3. System shows the visit's status, time box, and simulated identity.
4. Guard confirms the person against the simulated identity and the visit facts.
5. Guard records a **logged override / manual verification** with the outcome.
6. Visitor is admitted or refused; a single-visit pass is still marked used on entry.

## Screen states
- **Manual lookup** — search for the approved visit.
- **Match found** — visit + simulated identity shown for the guard to confirm.
- **No match** — no valid approved visit; entry refused.
- **Override logged** — confirmation that the manual action is recorded.

## Edge cases
- **No record found** — visitor claims approval but none exists → refuse; direct to re-apply.
- **Expired / already-used visit surfaced in lookup** — same refusal rules as automated verification apply.
- **Override without justification** — a manual admit must always carry a logged reason; it is never silent.
- **System down entirely** — define the offline posture (refuse vs. log-for-later); accountability must survive it.

## Accountability rule
Every manual action is attributable and logged. Manual fallback is a controlled exception, not an escape hatch — it must never let a denied or expired visitor in without a record.
