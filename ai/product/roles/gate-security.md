# Role: Gate Security (CISF Guard)

## Who they are
A CISF guard stationed at the building entrance whose job is to verify that the person presenting a pass is the approved visitor, and to let them in or turn them away. They are the last checkpoint and the one place the physical and digital worlds meet. They act fast, repeatedly, often with a queue forming behind each visitor.

## Context of use
- At the gate, standing, on a shared or handheld device, in variable outdoor light.
- Under time pressure — verification must take seconds, and the screen must be legible at a glance, not read.
- Handling a stream of visitors, some of whom will have problems (dead phone, failed scan, expired pass).

## What they need to see and do
- Scan a visitor's pass QR and get an instant, unambiguous verdict: Verified / Denied / Expired.
- See the simulated identity (from the visitor's government-ID photo) to confirm the person matches the pass.
- See the essential visit facts — name, host, time box — without digging.
- Fall back to a manual lookup + logged override when a scan can't proceed (see manual-fallback workflow).

## What they must never do / see
- Never manually admit a denied or expired visitor without recording a logged fallback/override.
- Never see or handle real biometric data — identity is simulated, never a live biometric match (see domain rules).
- Never edit an approval decision or a visitor's identity; the guard verifies, it does not approve.
- Never browse the full visitor database — the guard sees only the pass in front of them.

## What success looks like
A visitor is admitted or refused in seconds, with no ambiguity and no negotiation. The verdict is large, legible, and obvious; edge cases have a clear fallback that stays accountable; the line keeps moving. The guard is never left guessing.

## Design & voice notes
This is the checkpoint-speed screen the whole system is tuned for: the verdict is `typography.display` size, status is dot + label + color (never color alone), and the layout is readable in under a second. (See `DESIGN.md`.)
