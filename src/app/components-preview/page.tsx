import {
  AppShell,
  Alert,
  Button,
  DateTimeInput,
  EmptyState,
  EntryPassCard,
  FileUpload,
  IconInbox,
  ProgressStepper,
  Select,
  StatusIndicator,
  TextInput,
} from "@/components";
import styles from "./page.module.css";

const NAV = [
  { label: "My Visits", href: "/components-preview", active: true },
  { label: "Apply", href: "/apply" },
];

export default function ComponentsPreview() {
  return (
    <AppShell navItems={NAV}>
      <h1 className="text-headline">Component library</h1>
      <p className={`text-body ${styles.intro}`}>
        Every primitive from DESIGN.md, wired to tokens. Visitor flow first.
      </p>

      <section className={styles.section}>
        <h2 className="text-title">Buttons</h2>
        <div className={styles.row}>
          <Button>Apply for a visit</Button>
          <Button variant="secondary">Cancel</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="text-title">Status indicators</h2>
        <div className={styles.row}>
          <StatusIndicator status="pending" />
          <StatusIndicator status="approved" />
          <StatusIndicator status="denied" />
          <StatusIndicator status="verified" />
        </div>
        <StatusIndicator status="verified" size="lg" />
      </section>

      <section className={styles.section}>
        <h2 className="text-title">Progress stepper</h2>
        <ProgressStepper
          steps={["Apply", "Review", "Approved", "Pass", "Verified"]}
          current={2}
        />
      </section>

      <section className={styles.section}>
        <h2 className="text-title">Form fields</h2>
        <div className={styles.stack}>
          <TextInput
            label="Full name"
            placeholder="As printed on your ID"
            required
          />
          <Select label="Purpose of visit" placeholder="Select a purpose" required>
            <option value="meeting">Scheduled meeting</option>
            <option value="document">Document submission</option>
            <option value="grievance">Grievance / query</option>
          </Select>
          <DateTimeInput label="Requested date & time" required />
          <TextInput
            label="Contact number"
            error="Enter a valid 10-digit mobile number."
            defaultValue="12345"
          />
          <FileUpload
            label="Government ID photo"
            hint="Used only to simulate your identity. No real biometric data is stored."
            required
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="text-title">Alerts</h2>
        <div className={styles.stack}>
          <Alert variant="info" dismissible>
            Bring the same government ID you uploaded when you visit.
          </Alert>
          <Alert variant="approved" title="Visit approved">
            Your entry pass is ready. Show the QR at the gate.
          </Alert>
          <Alert variant="pending">Your request is awaiting officer review.</Alert>
          <Alert variant="denied" title="Visit denied">
            The requested department is closed on your chosen date.
          </Alert>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="text-title">Entry pass card</h2>
        <EntryPassCard
          visitorName="Aditya Sharma"
          host="Dept. of Revenue"
          visitWindow="7 Jul 2026, 10:00–11:00"
          passId="EPA-7F3K-2026"
          status="approved"
        />
      </section>

      <section className={styles.section}>
        <h2 className="text-title">Empty state</h2>
        <EmptyState
          icon={<IconInbox size={40} />}
          title="No visits yet"
          description="When you apply for a visit, it'll show up here with its status."
          action={<Button>Apply for a visit</Button>}
        />
      </section>
    </AppShell>
  );
}
