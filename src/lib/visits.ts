/*
 * Client-side persistence for visit requests. There is no backend yet, so a
 * submitted application is stored in localStorage — enough to make the
 * Pending state on My Visits real across navigation/reload, per the
 * request-and-approval workflow's screen states.
 *
 * Exposes `useVisits()`, a useSyncExternalStore-backed hook — the correct
 * primitive for subscribing to an external store like localStorage, rather
 * than reading it inside a raw useEffect + setState.
 */

import { useSyncExternalStore } from "react";

export type VisitStatus = "pending" | "approved" | "denied";

export type VisitRequest = {
  id: string;
  applicantName: string;
  contactNumber: string;
  purpose: string;
  department: string;
  /** ISO datetime-local value, e.g. "2026-07-10T10:00". */
  visitDateTime: string;
  /** Data URL of the uploaded government-ID photo (simulated identity only). */
  idPhotoDataUrl: string | null;
  status: VisitStatus;
  submittedAt: string;
};

const STORAGE_KEY = "entry-permit.visits";

function readAll(): VisitRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(visits: VisitRequest[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
  invalidate();
}

// ---- useSyncExternalStore plumbing ----
// getSnapshot's result must be referentially stable until the store actually
// changes, or React treats every render as a change. Cache it and only
// recompute on a real write (invalidate) or a cross-tab "storage" event.
let cachedSnapshot: VisitRequest[] | null = null;
const listeners = new Set<() => void>();

function computeSnapshot(): VisitRequest[] {
  cachedSnapshot = readAll().sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
  return cachedSnapshot;
}

function invalidate() {
  cachedSnapshot = null;
  listeners.forEach((listener) => listener());
}

function getSnapshot(): VisitRequest[] {
  return cachedSnapshot ?? computeSnapshot();
}

function getServerSnapshot(): VisitRequest[] {
  return [];
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

/** Live-updating list of visit requests, newest first. */
export function useVisits(): VisitRequest[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function saveVisit(visit: Omit<VisitRequest, "id" | "status" | "submittedAt">) {
  const record: VisitRequest = {
    ...visit,
    id: `EPA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  writeAll([...readAll(), record]);
  return record;
}

/** "10 Jul 2026, 10:00" — the one date format shared across Apply and My Visits. */
export function formatVisitWindow(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
