import { StatusIndicator, type Status } from "./StatusIndicator";
import { cx } from "./cx";
import styles from "./VisitRequestRow.module.css";

type VisitRequestRowProps = {
  purpose: string;
  department: string;
  /** Human-readable visit window, e.g. "10 Jul 2026, 10:00". */
  visitWindow: string;
  status: Status;
  className?: string;
};

/*
 * The list item for a submitted-but-not-yet-decided visit on My Visits —
 * simpler than the Entry Pass Card because there's no pass to show yet.
 */
export function VisitRequestRow({
  purpose,
  department,
  visitWindow,
  status,
  className,
}: VisitRequestRowProps) {
  return (
    <article className={cx(styles.row, className)}>
      <div className={styles.main}>
        <p className={styles.purpose}>{purpose}</p>
        <p className={styles.department}>{department}</p>
      </div>
      <div className={styles.meta}>
        <p className={styles.when}>{visitWindow}</p>
        <StatusIndicator status={status} />
      </div>
    </article>
  );
}
