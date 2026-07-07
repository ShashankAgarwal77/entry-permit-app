# Workflow: Profile (identity enrolment)

The visitor's reusable identity — captured once during onboarding and editable anytime. It exists so a visitor enters their name and ID once, not on every application. This precedes and feeds the request-and-approval workflow, which pre-fills identity from the profile.

## Actors
- **Visitor** — enrols and maintains their own profile.
- **System** — stores the profile locally and reuses it across applications.

## Steps

### First-run setup (during onboarding)
1. After OTP verification, the visitor reaches **Set up your profile**.
2. Visitor confirms their **full name**.
3. Visitor uploads a **government-ID photo** (used to derive a *simulated* identity — see domain rules).
4. The **mobile number** is already known from OTP login and is shown read-only.
5. Visitor saves. The profile is stored, and they land on **My Visits**.

### Edit (anytime)
1. Visitor opens the **Profile** screen from the top-bar profile entry.
2. Name and enrolled ID photo are editable; re-uploading the ID replaces the enrolled photo.
3. The mobile number stays read-only — it is the login identity.
4. Saving updates the profile for **future** applications only.

## Screen states
- **Setup** — the first-run "Set up your profile" step (name + ID upload).
- **Profile view/edit** — name + phone + enrolled ID, reachable anytime.
- **Saved** — a brief confirmation that the profile was stored.

## Edge cases
- **Incomplete profile** — a visitor without an enrolled identity can't apply; the Apply flow routes them to finish their profile first.
- **Phone is read-only** — it comes from the login and can't be edited in the profile.
- **Edit doesn't rewrite history** — changing the profile never alters an already-submitted request; submitted identity stays immutable (per the domain "edit after submit" rule).

## Notes
- **Enrolled once, reused.** Identity (name + ID photo) is captured a single time and reused for every application, rather than re-collected each time.
- **Still simulated, still no real biometric.** The enrolled ID photo derives a *simulated* identity only; the no-real-biometric hard rule is untouched (see domain rules).
- **Visitor-controlled and minimal.** The profile holds only name + contact + one ID photo — nothing more — and the visitor can edit or replace it at any time.
