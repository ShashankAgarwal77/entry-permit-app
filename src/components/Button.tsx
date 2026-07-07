import type { ButtonHTMLAttributes } from "react";
import { cx } from "./cx";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Primary carries the one action per screen; secondary is for Cancel/Back. */
  variant?: "primary" | "secondary";
  /** Stretch to fill the container width (common on mobile). */
  fullWidth?: boolean;
  /** Submit awaiting a result: shows a spinner, disables, sets aria-busy. */
  loading?: boolean;
};

export function Button({
  variant = "primary",
  fullWidth = false,
  loading = false,
  type = "button",
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        styles.btn,
        styles[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
