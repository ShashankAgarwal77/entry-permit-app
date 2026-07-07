"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  Button,
  EmptyState,
  FileUpload,
  IconUser,
  IdentitySummary,
  TextInput,
} from "@/components";
import { isProfileComplete, saveProfile, useProfile } from "@/lib/profile";
import styles from "./page.module.css";

const NAV = [
  { label: "My Visits", href: "/visits" },
  { label: "Apply", href: "/apply" },
];

export default function ProfilePage() {
  const router = useRouter();
  const profile = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>();
  const [photoError, setPhotoError] = useState<string>();
  const [saving, setSaving] = useState(false);

  function startEdit() {
    setName(profile?.fullName ?? "");
    setPhoto(profile?.idPhotoDataUrl ?? null);
    setNameError(undefined);
    setPhotoError(undefined);
    setEditing(true);
  }

  function handleFile(file: File | null) {
    if (!file) {
      setPhoto(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    let ok = true;
    if (!name.trim()) {
      setNameError("Enter your full name.");
      ok = false;
    }
    if (!photo) {
      setPhotoError("Upload a government-ID photo.");
      ok = false;
    }
    if (!ok || !profile) return;

    setSaving(true);
    window.setTimeout(() => {
      saveProfile({
        fullName: name.trim(),
        phone: profile.phone,
        idPhotoDataUrl: photo,
      });
      setSaving(false);
      setEditing(false);
    }, 500);
  }

  return (
    <AppShell navItems={NAV} account>
      <div className={styles.page}>
        <h1 className="text-headline">Your profile</h1>

        {!isProfileComplete(profile) ? (
          <EmptyState
            icon={<IconUser size={40} />}
            title="No profile yet"
            description="Set up your name and ID once, then apply for visits without re-entering them."
            action={
              <Button onClick={() => router.push("/")}>Set up your profile</Button>
            }
          />
        ) : editing ? (
          <div className={styles.form}>
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
              <span className={styles.readonlyValue}>{profile.phone}</span>
              <span className={styles.readonlyHint}>From your login — can&rsquo;t be changed.</span>
            </div>

            <div>
              <FileUpload
                label="Government-ID photo"
                hint="Enrolled once and reused for every application. Simulated identity only — no real biometric data is stored."
                required
                onFileSelect={handleFile}
              />
              {photo && !photoError && (
                <p className={styles.currentPhoto}>A photo is already enrolled. Upload a new one to replace it.</p>
              )}
              {photoError && (
                <p className={styles.fieldError} role="alert">
                  {photoError}
                </p>
              )}
            </div>

            <div className={styles.actions}>
              <Button fullWidth loading={saving} onClick={handleSave}>
                {saving ? "Saving…" : "Save changes"}
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setEditing(false)}
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.view}>
            <IdentitySummary
              name={profile.fullName}
              phone={profile.phone}
              photoUrl={profile.idPhotoDataUrl}
              onEdit={startEdit}
            />
            <p className={styles.note}>
              Your name and ID are enrolled once and reused every time you apply.
              You can update them here anytime.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
