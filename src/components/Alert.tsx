"use client";

import { useState, type ReactNode } from "react";
import { cx } from "./cx";
import {
  IconCheck,
  IconClock,
  IconInfo,
  IconX,
} from "./icons";
import styles from "./Alert.module.css";

type AlertVariant = "info" | "pending" | "approved" | "denied";

type AlertProps = {
  variant?: AlertVariant;
  /** Optional heading above the message. */
  title?: string;
  children: ReactNode;
  /** Show a close button; fires after the alert removes itself. */
  dismissible?: boolean;
  onDismiss?: () => void;
};

const ICON: Record<AlertVariant, typeof IconInfo> = {
  info: IconInfo,
  pending: IconClock,
  approved: IconCheck,
  denied: IconX,
};

/*
 * The one deliberate exception to Border-Not-Fill: a soft semantic tint carries
 * the message. Copy stays ink (not tinted) so it's always fully legible.
 */
export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
}: AlertProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const Icon = ICON[variant];

  return (
    <div className={cx(styles.alert, styles[variant])} role="status">
      <Icon size={20} className={styles.icon} />
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        <p className={styles.message}>{children}</p>
      </div>
      {dismissible && (
        <button
          type="button"
          className={styles.close}
          aria-label="Dismiss"
          onClick={() => {
            setOpen(false);
            onDismiss?.();
          }}
        >
          <IconX size={18} />
        </button>
      )}
    </div>
  );
}
