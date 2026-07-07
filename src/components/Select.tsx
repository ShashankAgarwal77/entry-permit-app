import { useId, type SelectHTMLAttributes, type ReactNode } from "react";
import { cx } from "./cx";
import { IconChevronDown } from "./icons";
import styles from "./Select.module.css";

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  label: string;
  error?: string;
  hint?: string;
  /** Shown as a disabled first option when the value is empty. */
  placeholder?: string;
  id?: string;
  children: ReactNode;
};

/*
 * A styled native <select>. Native is deliberate: the OS-rendered options list
 * can never be clipped by an `overflow: hidden` form container (a DESIGN.md
 * pitfall), and it's fully keyboard/screen-reader accessible for free.
 */
export function Select({
  label,
  error,
  hint,
  placeholder,
  required,
  className,
  children,
  defaultValue,
  value,
  ...rest
}: SelectProps) {
  const reactId = useId();
  const id = rest.id ?? reactId;
  const describedById = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;
  const uncontrolledDefault =
    value === undefined ? (defaultValue ?? "") : undefined;

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      <div className={styles.wrap}>
        <select
          {...rest}
          id={id}
          required={required}
          value={value}
          defaultValue={uncontrolledDefault}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedById}
          className={cx(styles.select, error && styles.selectError)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <IconChevronDown size={18} className={styles.chevron} />
      </div>
      {error ? (
        <p id={describedById} className={styles.error} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={describedById} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
