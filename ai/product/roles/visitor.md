# Role: Visitor

## Who they are
A member of the public visiting a government office — the citizen at the center of the flow. They may never have used the app before, bring varied literacy and tech comfort, and are almost always on a phone, often in a hurry shortly before or on the day of their visit. They are not employees; they touch the system once per visit and expect it to be obvious.

## Context of use
- Primarily mobile, outdoors or in transit, possibly on a slow connection.
- Time-pressured: filling in a request the night before, or holding up a pass at a busy gate.
- Low tolerance for jargon, dense forms, or ambiguity about "what happens next."

## What they need to see and do
- Log in via OTP (demo code `123456`).
- Maintain a profile: their name + an enrolled government-ID photo (used to simulate identity — see domain rules), set up once and editable anytime.
- Apply for a visit: pick who/what they're visiting and when — identity is pre-filled from their profile.
- Track a single, unambiguous status: Pending → Approved / Denied.
- Receive and open their time-boxed entry pass (QR) once approved.
- Present the pass at the gate for verification.
- See clear reasons and next steps when denied or when a pass expires.

## What they must never do / see
- Never see other visitors' applications, data, or passes.
- Never see internal officer notes, reviewer identities, or approval reasoning beyond a plain outcome + reason.
- Never edit or re-issue a pass themselves, or change a submitted identity after approval.
- Never reuse a single-visit pass or use a pass outside its time box.

## What success looks like
The visitor moves from application to standing inside the building without having to explain themselves to a guard: they always knew their status, their pass was ready to scan instantly, and verification took seconds. No paperwork, no phone calls, no confusion.

## Design & voice notes
Plain language over bureaucratic language. Status is the loudest thing on every screen. Generous touch targets, icon+text status (never color alone), one primary task and one primary action per screen. (See `DESIGN.md`.)
