# Workflow: Onboarding (Visitor first-run)

From a first-time visitor opening the app to being signed in and ready to apply. This flow precedes the request-and-approval workflow, whose first step ("Visitor logs in via OTP") assumes onboarding is already done.

## Actors
- **Visitor** — the public first-time user.
- **System** — issues the demo OTP, verifies it, and creates the session.

## Steps
1. Visitor opens the app and sees a short, plain-language intro: what the app does (apply for a visit → get approved → show a pass at the gate). The intro never blocks — it's skippable.
2. Visitor continues to sign in: enters their mobile number.
3. System "sends" a one-time passcode (demo — always `123456`; no real SMS is sent).
4. Visitor enters the 6-digit code.
5. System verifies the code and creates the session.
6. Visitor reaches **Set up your profile**: confirm full name and upload a government-ID photo (the mobile number is already known from login). This enrols the visitor's identity once — see `profile.md`.
7. Visitor lands on **My Visits** — on first run this is the empty state with a single primary action, "Apply for a visit."

## Screen states
- **Intro** — the plain-language "what is this," skippable.
- **Phone entry** — mobile-number input + a continue action.
- **OTP entry** — 6-digit code input (demo code `123456`), with a resend affordance.
- **Verifying** — a brief pending state while the code is checked.
- **Set up your profile** — confirm name + upload the government-ID photo (see `profile.md`).
- **Signed in / landing** — the My Visits empty state on first run.

## Edge cases
- **Wrong OTP** — a clear inline error ("That code doesn't match. In this demo, the code is `123456`."); the field stays, no lockout in the prototype.
- **Resend** — a resend link with a short cooldown; re-issues the same demo code.
- **Invalid phone number** — inline validation before the code step.
- **Skip intro** — anyone can skip straight to sign-in; the intro never gates the flow.
- **Already signed in** — opening the app with an existing session skips onboarding and goes straight to My Visits.
- **Not production auth** — this is a demo: the OTP is always `123456`, never real authentication (domain rule).

## Notes
- **Identity is enrolled here, once.** The full name and government-ID photo → simulated identity are captured during profile setup and stored in the visitor's profile, then reused for every application (see `profile.md`) — never re-collected per application.
- Plain language over bureaucratic language, generous touch targets, one primary action per screen — for the visitor population's varied literacy and tech comfort.
