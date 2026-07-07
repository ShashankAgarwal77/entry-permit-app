# Domain: Entry Permit Rules

The rules that govern passes, identity, and privacy in this app. These are demo/prototype rules modeled on real Indian digital-identity and data-protection practice (DigiYatra-style flow, DPDP-style privacy) — but they use **simulated data only**.

## The pass
- **Single-visit.** A pass is valid for exactly one entry. Once used at the gate, it is consumed and cannot be reused.
- **Time-boxed.** A pass is valid only within the requested/approved time window. Outside it, the pass is **Expired** and entry is refused.
- **Issued on approval only.** A pass exists only after an Approving Officer approves the request; it carries a QR the guard scans at the gate.
- **Not self-issued or self-edited.** Visitors cannot create, re-issue, or modify their own pass; a change means a new request.

## Login
- **OTP-based login.** Visitors authenticate with a one-time passcode.
- **Demo OTP is `123456`.** In this prototype the OTP is always `123456` — no real SMS/OTP delivery. Do not build against any other code, and do not treat this as production auth.

## Identity
- **Simulated from a government-ID photo.** The visitor uploads a government-ID photo; the app derives a **simulated** identity from it for display and gate matching.
- **Enrolled once into the visitor's profile.** The name + ID photo are captured a single time during profile setup and reused for every application, rather than re-collected per visit (see `ai/product/workflows/profile.md`). The identity stays visitor-controlled — editable or replaceable at any time.
- **No real biometric matching.** The gate "face check" is simulated — there is no live facial-recognition or biometric comparison against real data. The guard visually confirms the person against the simulated identity.

## Privacy (hard rule)
- **Never use real biometric or citizen data.** This is the non-negotiable rule of the system. All identity is simulated; no real biometrics, no real government-database lookups, no real personal records.
- **Model, not the real registry.** The design is inspired by DigiYatra (seamless ID-based entry) and the DPDP model (data minimisation, purpose limitation, accountability) — it emulates their *shape*, never their real data.
- **Collect only what's needed.** Purpose-limited: an enrolled identity (name + one ID photo) plus per-visit details, nothing more. The enrolled identity is reused across visits but stays visitor-controlled — editable and removable at any time.

## Why these rules exist
They keep the prototype safe to build and demo while still faithfully representing how a real, privacy-respecting government entry system would behave: fast and ID-driven at the gate, but with citizen data protected by design.
