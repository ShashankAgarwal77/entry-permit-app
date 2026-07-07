"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  Button,
  DateTimeInput,
  EmptyState,
  IconUser,
  IdentitySummary,
  ProgressStepper,
  Select,
} from "@/components";
import { isProfileComplete, useProfile } from "@/lib/profile";
import { formatVisitWindow, saveVisit } from "@/lib/visits";
import styles from "./page.module.css";

const NAV = [
  { label: "My Visits", href: "/visits" },
  { label: "Apply", href: "/apply", active: true },
];

const STEPS = ["Visit details", "Review"];

const PURPOSES = [
  "Scheduled meeting with an official",
  "Document submission or verification",
  "Grievance or RTI query",
  "Other",
];

const DEPARTMENTS = [
  "Department of Revenue",
  "Department of Urban Development",
  "Department of Public Works",
  "Department of Health & Family Welfare",
  "Department of Education",
  "Passport & Visa Office",
];

type FormState = {
  purpose: string;
  department: string;
  visitDateTime: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  purpose: "",
  department: "",
  visitDateTime: "",
};

export default function ApplyPage() {
  const router = useRouter();
  const profile = useProfile();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateDetails(): Errors {
    const next: Errors = {};
    if (!form.purpose) next.purpose = "Select a purpose of visit.";
    if (!form.department) next.department = "Select a department to visit.";
    if (!form.visitDateTime) {
      next.visitDateTime = "Choose a visit date and time.";
    } else if (new Date(form.visitDateTime).getTime() < Date.now()) {
      next.visitDateTime = "Choose a date and time in the future.";
    }
    return next;
  }

  function handleContinue() {
    const stepErrors = validateDetails();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep(1);
  }

  function handleBack() {
    if (step === 0) {
      router.push("/visits");
      return;
    }
    setStep(0);
  }

  function handleSubmit() {
    if (!isProfileComplete(profile)) return;
    setSubmitting(true);
    window.setTimeout(() => {
      saveVisit({
        applicantName: profile.fullName,
        contactNumber: profile.phone,
        purpose: form.purpose,
        department: form.department,
        visitDateTime: form.visitDateTime,
        idPhotoDataUrl: profile.idPhotoDataUrl,
      });
      router.push("/visits");
    }, 700);
  }

  // Can't apply without an enrolled identity — send them to finish their profile.
  if (!isProfileComplete(profile)) {
    return (
      <AppShell navItems={NAV} account>
        <EmptyState
          icon={<IconUser size={40} />}
          title="Finish your profile first"
          description="Applying uses your enrolled name and ID. Set those up once, then you can apply in a couple of taps."
          action={
            <Button onClick={() => router.push("/profile")}>
              Go to your profile
            </Button>
          }
        />
      </AppShell>
    );
  }

  return (
    <AppShell navItems={NAV} account>
      <div className={styles.wizard}>
        <h1 className="text-headline">Apply for a visit</h1>

        <ProgressStepper steps={STEPS} current={step} className={styles.stepper} />

        <div className={styles.applyingAs}>
          <span className={styles.applyingLabel}>Applying as</span>
          <IdentitySummary
            name={profile.fullName}
            phone={profile.phone}
            photoUrl={profile.idPhotoDataUrl}
          />
        </div>

        {step === 0 && (
          <div className={styles.stepBody}>
            <Select
              label="Purpose of visit"
              placeholder="Select a purpose"
              value={form.purpose}
              onChange={(e) => set("purpose", e.target.value)}
              error={errors.purpose}
              required
            >
              {PURPOSES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
            <Select
              label="Department / host office"
              placeholder="Select a department"
              value={form.department}
              onChange={(e) => set("department", e.target.value)}
              error={errors.department}
              required
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
            <DateTimeInput
              label="Requested visit date & time"
              value={form.visitDateTime}
              onChange={(e) => set("visitDateTime", e.target.value)}
              error={errors.visitDateTime}
              required
            />
          </div>
        )}

        {step === 1 && (
          <div className={styles.stepBody}>
            <p className={styles.reviewLede}>
              Check your visit details before submitting. Once submitted, this
              request can&rsquo;t be edited.
            </p>
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Purpose of visit</dt>
                <dd className={styles.factValue}>{form.purpose}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Department</dt>
                <dd className={styles.factValue}>{form.department}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Visit date & time</dt>
                <dd className={styles.factValue}>
                  {formatVisitWindow(form.visitDateTime)}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className={styles.actions}>
          {step === STEPS.length - 1 ? (
            <Button fullWidth loading={submitting} onClick={handleSubmit}>
              {submitting ? "Submitting…" : "Submit request"}
            </Button>
          ) : (
            <Button fullWidth onClick={handleContinue}>
              Continue
            </Button>
          )}
          <Button
            variant="secondary"
            fullWidth
            onClick={handleBack}
            disabled={submitting}
          >
            Back
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
