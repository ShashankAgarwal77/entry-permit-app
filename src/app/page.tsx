"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  Alert,
  Button,
  FileUpload,
  OtpInput,
  TextInput,
  IconCalendar,
  IconCheck,
  IconShieldCheck,
} from "@/components";
import { saveProfile } from "@/lib/profile";
import styles from "./page.module.css";

const DEMO_CODE = "123456";
const CODE_LENGTH = 6;

type Step = "intro" | "phone" | "otp" | "profile";

const INTRO_STEPS = [
  {
    icon: IconCalendar,
    title: "Request a visit",
    body: "Tell us who you're visiting and when — a few plain steps on your phone.",
  },
  {
    icon: IconCheck,
    title: "Get approved",
    body: "An officer reviews it. You'll see one clear status the whole way.",
  },
  {
    icon: IconShieldCheck,
    title: "Show your pass",
    body: "Once approved, show your pass at the gate. No paperwork, no queue.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string>();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Profile-setup step.
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string>();
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [idPhotoError, setIdPhotoError] = useState<string>();
  const [savingProfile, setSavingProfile] = useState(false);

  function sendCode(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setPhoneError("Enter a valid 10-digit mobile number.");
      return;
    }
    setPhoneError(undefined);
    setSending(true);
    // Simulated send — no real SMS; the demo code is always 123456.
    window.setTimeout(() => {
      setSending(false);
      setStep("otp");
    }, 700);
  }

  function verify(fullCode: string) {
    setVerifying(true);
    window.setTimeout(() => {
      if (fullCode === DEMO_CODE) {
        setVerifying(false);
        setStep("profile");
      } else {
        setVerifying(false);
        setCodeError("That code doesn't match. In this demo, the code is 123456.");
      }
    }, 600);
  }

  function resend() {
    setCode("");
    setCodeError(undefined);
  }

  function handleIdPhoto(file: File | null) {
    if (!file) {
      setIdPhoto(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setIdPhoto(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  function saveAndFinish() {
    let ok = true;
    if (!name.trim()) {
      setNameError("Enter your full name.");
      ok = false;
    }
    if (!idPhoto) {
      setIdPhotoError("Upload a government-ID photo to continue.");
      ok = false;
    }
    if (!ok) return;

    setSavingProfile(true);
    window.setTimeout(() => {
      saveProfile({
        fullName: name.trim(),
        phone: phone.replace(/\D/g, ""),
        idPhotoDataUrl: idPhoto,
      });
      router.push("/visits");
    }, 600);
  }

  return (
    <AppShell>
      {step === "intro" && (
        <section className={styles.intro}>
          <div className={styles.introHead}>
            <h1 className="text-display">Enter a government office without the paperwork.</h1>
            <p className={styles.lede}>
              Apply for your visit, get approved, and walk in with a pass on your
              phone — verified in seconds at the gate.
            </p>
          </div>

          <ol className={styles.steps}>
            {INTRO_STEPS.map(({ icon: Icon, title, body }) => (
              <li key={title} className={styles.stepItem}>
                <span className={styles.stepIcon} aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span className={styles.stepText}>
                  <span className={styles.stepTitle}>{title}</span>
                  <span className={styles.stepBody}>{body}</span>
                </span>
              </li>
            ))}
          </ol>

          <Button fullWidth onClick={() => setStep("phone")}>
            Get started
          </Button>
        </section>
      )}

      {step === "phone" && (
        <form className={styles.form} onSubmit={sendCode}>
          <header className={styles.formHead}>
            <h1 className="text-headline">Sign in</h1>
            <p className={styles.sub}>
              Enter your mobile number and we&rsquo;ll send a one-time code.
            </p>
          </header>

          <TextInput
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
            autoFocus
          />

          <div className={styles.actions}>
            <Button type="submit" fullWidth loading={sending}>
              {sending ? "Sending…" : "Send code"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => setStep("intro")}
            >
              Back
            </Button>
          </div>
        </form>
      )}

      {step === "otp" && (
        <div className={styles.form}>
          <header className={styles.formHead}>
            <h1 className="text-headline">Enter the code</h1>
            <p className={styles.sub}>
              We sent a 6-digit code to{" "}
              <span className={styles.phone}>{phone.replace(/\D/g, "")}</span>.
            </p>
          </header>

          <OtpInput
            value={code}
            onChange={(v) => {
              setCode(v);
              if (codeError) setCodeError(undefined);
            }}
            onComplete={verify}
            length={CODE_LENGTH}
            error={Boolean(codeError)}
            disabled={verifying}
            autoFocus
          />

          {codeError && (
            <p className={styles.codeError} role="alert">
              <span aria-hidden="true">✕</span> {codeError}
            </p>
          )}

          <Alert variant="info">
            This is a demo — the code is always <strong>123456</strong>.
          </Alert>

          <div className={styles.actions}>
            <Button
              fullWidth
              loading={verifying}
              disabled={code.length < CODE_LENGTH}
              onClick={() => verify(code)}
            >
              {verifying ? "Verifying…" : "Verify"}
            </Button>
            <button type="button" className={styles.resend} onClick={resend}>
              Resend code
            </button>
          </div>
        </div>
      )}

      {step === "profile" && (
        <div className={styles.form}>
          <header className={styles.formHead}>
            <h1 className="text-headline">Set up your profile</h1>
            <p className={styles.sub}>
              Enrol your details once. We&rsquo;ll reuse them each time you apply
              — no re-typing.
            </p>
          </header>

          <TextInput
            label="Full name"
            placeholder="As printed on your ID"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError(undefined);
            }}
            error={nameError}
            required
            autoFocus
          />

          <div className={styles.readonly}>
            <span className={styles.readonlyLabel}>Mobile number</span>
            <span className={styles.readonlyValue}>{phone.replace(/\D/g, "")}</span>
            <span className={styles.readonlyHint}>From your login — can&rsquo;t be changed.</span>
          </div>

          <div>
            <FileUpload
              label="Government-ID photo"
              hint="Used only to simulate your identity for the gate check. No real biometric data is stored."
              required
              onFileSelect={(file) => {
                handleIdPhoto(file);
                if (idPhotoError) setIdPhotoError(undefined);
              }}
            />
            {idPhotoError && (
              <p className={styles.codeError} role="alert">
                <span aria-hidden="true">✕</span> {idPhotoError}
              </p>
            )}
          </div>

          <div className={styles.actions}>
            <Button fullWidth loading={savingProfile} onClick={saveAndFinish}>
              {savingProfile ? "Saving…" : "Save and continue"}
            </Button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
