"use client";

import { useRouter } from "next/navigation";
import { AppShell, Button, EmptyState, IconCalendar } from "@/components";

const NAV = [
  { label: "My Visits", href: "/visits" },
  { label: "Apply", href: "/apply", active: true },
];

/*
 * Placeholder landing target for the apply CTA. The real application flow is a
 * future screen (to be built under the AGENTS.md gates); this keeps the
 * onboarding endpoint from dead-ending.
 */
export default function ApplyPage() {
  const router = useRouter();
  return (
    <AppShell navItems={NAV}>
      <EmptyState
        icon={<IconCalendar size={40} />}
        title="Application form coming soon"
        description="The apply flow is the next screen to build — it'll collect your visit details and a government-ID photo here."
        action={
          <Button variant="secondary" onClick={() => router.push("/visits")}>
            Back to My Visits
          </Button>
        }
      />
    </AppShell>
  );
}
