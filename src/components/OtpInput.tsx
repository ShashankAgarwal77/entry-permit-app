"use client";

import {
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cx } from "./cx";
import styles from "./OtpInput.module.css";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  /** Fires when all cells are filled. */
  onComplete?: (value: string) => void;
  length?: number;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Group label announced to screen readers. */
  label?: string;
};

/*
 * Segmented 6-digit code entry. One labelled group (not six fields to a screen
 * reader); auto-advances, backspaces across cells, and accepts a pasted code.
 * Border + digit carry state — no filled cell background at rest.
 */
export function OtpInput({
  value,
  onChange,
  onComplete,
  length = 6,
  error = false,
  disabled = false,
  autoFocus = false,
  label = "One-time passcode",
}: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const cells = Array.from({ length }, (_, i) => value[i] ?? "");

  function focusCell(i: number) {
    const el = refs.current[Math.max(0, Math.min(i, length - 1))];
    el?.focus();
    el?.select();
  }

  function handleChange(i: number, e: ChangeEvent<HTMLInputElement>) {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    // Never leave a gap: a digit typed past the fill point lands at the fill point.
    const pos = Math.min(i, value.length);
    const next = [...cells];
    next[pos] = digit;
    const joined = next.join("");
    onChange(joined);
    focusCell(pos + 1);
    if (joined.length === length) onComplete?.(joined);
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...cells];
      if (next[i]) {
        next[i] = "";
        onChange(next.join(""));
      } else if (i > 0) {
        next[i - 1] = "";
        onChange(next.join(""));
        focusCell(i - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusCell(i - 1);
    } else if (e.key === "ArrowRight") {
      focusCell(i + 1);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!digits) return;
    onChange(digits);
    focusCell(Math.min(digits.length, length - 1));
    if (digits.length === length) onComplete?.(digits);
  }

  return (
    <div className={styles.group} role="group" aria-label={label}>
      {cells.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={cx(styles.cell, error && styles.cellError)}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={c}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          aria-invalid={error || undefined}
          autoFocus={autoFocus && i === 0}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}
