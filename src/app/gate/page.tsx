"use client";

import { useState } from "react";
import {
  AppShell,
  GateVerdict,
  ScannerViewport,
  type VerifiedVisitor,
} from "@/components";
import styles from "./page.module.css";

/* Seeded demo visitor the simulated scan resolves to (no real data). */
const DEMO_VISITOR: VerifiedVisitor = {
  name: "Aditya Sharma",
  host: "Dept. of Revenue",
  visitWindow: "7 Jul 2026, 10:00–11:00",
  passId: "EPA-7F3K-2026",
};

type Phase = "scanning" | "verified";

export default function GateVerificationPage() {
  const [phase, setPhase] = useState<Phase>("scanning");
  const [admitted, setAdmitted] = useState(false);

  function reset() {
    setAdmitted(false);
    setPhase("scanning");
  }

  return (
    <AppShell
      width="full"
      right={<span className={styles.gateLabel}>North Entrance · Lane 3</span>}
    >
      <div className={styles.screen}>
        {phase === "scanning" ? (
          <div className={styles.scan}>
            <header className={styles.scanHead}>
              <h1 className="text-headline">Scan visitor pass</h1>
              <p className={styles.scanSub}>
                Point the camera at the visitor&rsquo;s QR pass, then match their
                face to the ID photo.
              </p>
            </header>
            <ScannerViewport
              onScan={() => setPhase("verified")}
              onManualScan={() => setPhase("verified")}
            />
          </div>
        ) : (
          <GateVerdict
            visitor={DEMO_VISITOR}
            admitted={admitted}
            onAdmit={() => setAdmitted(true)}
            onRefuse={reset}
            onScanNext={reset}
          />
        )}
      </div>
    </AppShell>
  );
}
