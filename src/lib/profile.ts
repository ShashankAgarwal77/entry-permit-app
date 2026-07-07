/*
 * The visitor's enrolled identity, persisted client-side (no backend yet).
 * Captured once during onboarding, editable anytime from the Profile screen,
 * and reused to pre-fill every application. Same useSyncExternalStore pattern
 * as visits.ts — the correct primitive for subscribing to an external store.
 */

import { useSyncExternalStore } from "react";

export type Profile = {
  fullName: string;
  /** From OTP login — read-only in the profile. */
  phone: string;
  /** Data URL of the enrolled government-ID photo (simulated identity only). */
  idPhotoDataUrl: string | null;
};

const STORAGE_KEY = "entry-permit.profile";

function read(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.fullName === "string") return parsed as Profile;
    return null;
  } catch {
    return null;
  }
}

// getSnapshot must return a referentially stable value until a real change,
// or useSyncExternalStore loops. Cache it; invalidate on write / cross-tab.
let cached: Profile | null | undefined;
const listeners = new Set<() => void>();

function invalidate() {
  cached = undefined;
  listeners.forEach((l) => l());
}

function getSnapshot(): Profile | null {
  if (cached === undefined) cached = read();
  return cached;
}

function getServerSnapshot(): Profile | null {
  return null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) invalidate();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Live-updating profile (or null if not set up yet). */
export function useProfile(): Profile | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  invalidate();
}

/** A profile is usable for applying once it has a name and an enrolled ID. */
export function isProfileComplete(profile: Profile | null): profile is Profile {
  return Boolean(profile && profile.fullName.trim() && profile.idPhotoDataUrl);
}
