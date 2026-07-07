"use client";

import { useRouter } from "next/navigation";
import {
  AppShell,
  Button,
  EmptyState,
  IconInbox,
  VisitRequestRow,
} from "@/components";
import { formatVisitWindow, useVisits } from "@/lib/visits";
import styles from "./page.module.css";

const NAV = [
  { label: "My Visits", href: "/visits", active: true },
  { label: "Apply", href: "/apply" },
];

export default function VisitsPage() {
  const router = useRouter();
  const visits = useVisits();

  return (
    <AppShell navItems={NAV} account>
      {visits.length === 0 ? (
        <EmptyState
          icon={<IconInbox size={40} />}
          title="No visits yet"
          description="When you apply for a visit, it'll show up here with its status."
          action={
            <Button onClick={() => router.push("/apply")}>
              Apply for a visit
            </Button>
          }
        />
      ) : (
        <div className={styles.list}>
          <div className={styles.header}>
            <h1 className="text-headline">My Visits</h1>
            <Button onClick={() => router.push("/apply")}>Apply for a visit</Button>
          </div>
          {visits.map((visit) => (
            <VisitRequestRow
              key={visit.id}
              purpose={visit.purpose}
              department={visit.department}
              visitWindow={formatVisitWindow(visit.visitDateTime)}
              status={visit.status}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
