"use client";

import { useRouter } from "next/navigation";
import { AppShell, Button, EmptyState, IconInbox } from "@/components";

const NAV = [
  { label: "My Visits", href: "/visits", active: true },
  { label: "Apply", href: "/apply" },
];

/* The onboarding landing — a signed-in visitor's first view of My Visits. */
export default function VisitsPage() {
  const router = useRouter();
  return (
    <AppShell navItems={NAV}>
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
    </AppShell>
  );
}
