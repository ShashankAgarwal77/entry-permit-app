import { useId, type InputHTMLAttributes } from "react";
import { cx } from "./cx";
import { IconX } from "./icons";
import styles from "./TextInput.module.css";

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  /** Error text shown below; also flips the field into its error state. */
  error?: string;
  /** Helper text shown below when there's no error. */
  hint?: string;
  id?: string;
};

export function TextInput({
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: TextInputProps) {
  const reactId = useId();
  const id = rest.id ?? reactId;
  const describedById = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

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
      <input
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedById}
        className={cx(styles.input, error && styles.inputError)}
      />
      {error ? (
        <p id={describedById} className={styles.error} role="alert">
          <IconX size={16} />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={describedById} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
