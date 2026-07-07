"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "./cx";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { IconCamera } from "./icons";
import styles from "./ScannerViewport.module.css";

type ScannerViewportProps = {
  /** Fires when a pass is "scanned" (prototype: resolves to a seeded visitor). */
  onScan: () => void;
  /** Fires when the guard verifies by manually entered pass id. */
  onManualScan?: (passId: string) => void;
  className?: string;
};

type CameraState = "idle" | "live" | "denied" | "unsupported";

/*
 * The guard's scan surface. Shows the live device camera as content inside a
 * bordered viewport with a teal framing reticle; falls back to a neutral
 * slate-100 placeholder when the camera is unavailable. The "scan" is
 * simulated — no real QR decode, no biometric match (domain rule).
 */
export function ScannerViewport({
  onScan,
  onManualScan,
  className,
}: ScannerViewportProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camera, setCamera] = useState<CameraState>("idle");
  const [showManual, setShowManual] = useState(false);
  const [passId, setPassId] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCamera("unsupported");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCamera("live");
      } catch {
        if (!cancelled) setCamera("denied");
      }
    }

    start();
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className={cx(styles.scanner, className)}>
      <div className={styles.viewport} data-camera={camera}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          playsInline
          aria-hidden="true"
          hidden={camera !== "live"}
        />

        {camera !== "live" && (
          <div className={styles.placeholder}>
            <IconCamera size={32} className={styles.placeholderIcon} />
            <p className={styles.placeholderText}>
              {camera === "idle"
                ? "Starting camera…"
                : "Camera unavailable — verify by pass ID below"}
            </p>
          </div>
        )}

        {/* Framing reticle — the one place teal marks the scan target. */}
        <div className={styles.reticle} aria-hidden="true">
          <span className={cx(styles.corner, styles.tl)} />
          <span className={cx(styles.corner, styles.tr)} />
          <span className={cx(styles.corner, styles.bl)} />
          <span className={cx(styles.corner, styles.br)} />
          <span className={styles.scanline} />
        </div>
      </div>

      <div className={styles.actions}>
        <Button fullWidth onClick={onScan}>
          Simulate scan
        </Button>

        {onManualScan &&
          (showManual ? (
            <form
              className={styles.manual}
              onSubmit={(e) => {
                e.preventDefault();
                if (passId.trim()) onManualScan(passId.trim());
              }}
            >
              <TextInput
                label="Pass ID"
                placeholder="e.g. EPA-7F3K-2026"
                value={passId}
                onChange={(e) => setPassId(e.target.value)}
                autoComplete="off"
              />
              <Button type="submit" variant="secondary" fullWidth>
                Verify pass ID
              </Button>
            </form>
          ) : (
            <button
              type="button"
              className={styles.manualToggle}
              onClick={() => setShowManual(true)}
            >
              Enter pass ID manually
            </button>
          ))}
      </div>
    </div>
  );
}
