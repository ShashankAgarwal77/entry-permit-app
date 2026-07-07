import type { ReactNode } from "react";
import { cx } from "./cx";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  /** A line-icon; rendered muted. Defaults to nothing. */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Usually a single primary Button. */
  action?: ReactNode;
  className?: string;
};

/*
 * First-run / nothing-here state. Centered, one muted icon, plain copy, one
 * primary action — no illustration, no card, no marketing.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
