import { cx } from "./cx";
import { IconCheck } from "./icons";
import styles from "./ProgressStepper.module.css";

type ProgressStepperProps = {
  steps: string[];
  /** Zero-based index of the current step. Earlier steps render as complete. */
  current: number;
  className?: string;
};

/*
 * The direct expression of "status is always unambiguous": a glanceable map of
 * where the visitor stands in Apply → Review → Approved → Pass → Verified.
 */
export function ProgressStepper({
  steps,
  current,
  className,
}: ProgressStepperProps) {
  return (
    <ol className={cx(styles.stepper, className)}>
      {steps.map((label, i) => {
        const state =
          i < current ? "complete" : i === current ? "current" : "upcoming";
        return (
          <li
            key={label}
            className={cx(styles.step, styles[state])}
            aria-current={state === "current" ? "step" : undefined}
          >
            <span className={styles.marker} aria-hidden="true">
              {state === "complete" ? <IconCheck size={16} /> : i + 1}
            </span>
            <span className={styles.label}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
