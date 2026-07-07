import type { ReactNode } from "react";
import { cx } from "./cx";
import styles from "./StatusIndicator.module.css";

export type Status = "pending" | "approved" | "denied" | "verified";

const DEFAULT_LABEL: Record<Status, string> = {
  pending: "Pending",
  approved: "Approved",
  denied: "Denied",
  verified: "Verified",
};

type StatusIndicatorProps = {
  status: Status;
  /** "lg" is the checkpoint-speed size for the pass / gate screens. */
  size?: "sm" | "lg";
  /** Override the label text; defaults to the status name. */
  children?: ReactNode;
  className?: string;
};

/*
 * Status as a colored dot + neutral-ink label — never color alone (a11y).
 * The dot carries the hue; the text carries the meaning.
 */
export function StatusIndicator({
  status,
  size = "sm",
  children,
  className,
}: StatusIndicatorProps) {
  return (
    <span
      className={cx(styles.root, styles[size], styles[status], className)}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{children ?? DEFAULT_LABEL[status]}</span>
    </span>
  );
}
