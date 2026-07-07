# Workflow: Gate Verification

From an approved visitor arriving at the gate to an allow/deny decision.

## Actors
- **Visitor** — presents their pass QR.
- **Gate Security (CISF Guard)** — scans, confirms identity, admits or refuses.
- **System** — validates the pass and returns a verdict + simulated identity.

## Steps
1. Visitor arrives and opens their entry pass (QR).
2. Guard scans the QR.
3. System validates: is the pass genuine, approved, within its time box, and not already used?
4. System returns a verdict and the simulated identity derived from the visitor's ID photo.
5. Guard visually confirms the person matches the simulated identity.
6. Guard admits (**Verified**) or refuses (**Denied / Expired**).
7. A single-visit pass is marked used on successful entry.

## Screen states
- **Ready to scan** — scanner active, awaiting a QR.
- **Verified** — large, unmistakable confirmation; identity + essential visit facts shown; visitor admitted.
- **Denied** — pass invalid / not approved; entry refused.
- **Expired** — pass outside its time box; entry refused, re-apply required.
- **Already used** — single-visit pass previously consumed; entry refused.

## Edge cases
- **Scan fails** (dead phone, damaged/blurred QR) → hand off to the manual-fallback workflow.
- **Already-used pass** — single-visit rule means a second presentation is refused.
- **Wrong gate** — pass valid but presented at a gate it isn't for (if gate scoping applies) → refused with a clear reason.
- **Clock-skew at the boundary** — arrival right at the edge of the time box; the verdict must be deterministic, not ambiguous.
- **Identity mismatch** — person doesn't match the simulated identity → guard refuses even on a valid QR.
