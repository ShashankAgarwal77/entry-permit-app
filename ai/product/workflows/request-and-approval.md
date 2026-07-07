# Workflow: Request & Approval

From a visitor submitting a request to a time-boxed pass being issued.

## Actors
- **Visitor** — creates and submits the request, receives the outcome and pass.
- **Approving Officer** — reviews the request for their department and decides.
- **System** — routes the request, enforces rules, issues the pass on approval.

## Steps
1. Visitor logs in via OTP (demo code `123456`) and has an enrolled profile (name + ID photo — see `profile.md`).
2. Visitor fills the request: purpose of visit, host/department, requested date & time box. Identity (name + ID photo) is **pre-filled from the profile**, not re-entered.
3. Visitor submits. Request enters **Pending** and is routed to the officer(s) for that department/host.
4. Officer opens the request and reviews identity + purpose + host + time box in one view.
5. Officer decides:
   - **Approve** → system issues a single-visit, time-boxed pass with a QR; status → **Approved**.
   - **Reject** → officer supplies a plain-language reason; status → **Denied**.
6. Visitor sees the outcome. If approved, the entry pass becomes available to open and carry.

## Screen states
- **Draft** — request being filled, not yet submitted.
- **Pending** — submitted, awaiting officer decision.
- **Approved** — pass issued and viewable.
- **Denied** — outcome + reason shown; re-apply path offered.
- **Expired** — pass or approval no longer valid because the time box passed before use.

## Edge cases
- **Wrong-department routing** — request lands with an officer who shouldn't decide it; must be recognisable and not silently approved.
- **Expiry before visit** — approved pass's time box lapses before the visitor arrives → treated as Expired, re-apply required.
- **Re-submission** — a denied visitor corrects details and submits again as a new request (prior decision stays on record).
- **Edit after submit** — not allowed; a submitted identity/request is immutable, changes mean a new request.
- **Multiple pending requests** — a visitor with more than one open request must still see each status unambiguously.
