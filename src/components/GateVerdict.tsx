import { cx } from "./cx";
import { Button } from "./Button";
import { StatusIndicator } from "./StatusIndicator";
import { IconCheck, IconUser } from "./icons";
import styles from "./GateVerdict.module.css";

export type VerifiedVisitor = {
  name: string;
  host: string;
  visitWindow: string;
  passId: string;
  /** Simulated ID photo; falls back to a captioned placeholder. */
  photoUrl?: string;
};

type GateVerdictProps = {
  visitor: VerifiedVisitor;
  /** True once the guard has confirmed entry (single-visit pass consumed). */
  admitted: boolean;
  onAdmit: () => void;
  onRefuse: () => void;
  onScanNext: () => void;
  className?: string;
};

/*
 * The checkpoint verdict. Loud through scale — a large teal medallion + the
 * word "Verified" at display size on pure white — never a color flood. Below
 * it, the simulated identity for the guard to match by eye.
 */
export function GateVerdict({
  visitor,
  admitted,
  onAdmit,
  onRefuse,
  onScanNext,
  className,
}: GateVerdictProps) {
  return (
    <section className={cx(styles.verdict, className)} aria-live="assertive">
      <div className={styles.badge}>
        <span className={styles.medallion} aria-hidden="true">
          <IconCheck size={52} strokeWidth={3} />
        </span>
        <StatusIndicator status="verified" size="lg" />
      </div>

      <div className={styles.identity}>
        <div className={styles.photo}>
          {visitor.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={visitor.photoUrl} alt="" className={styles.photoImg} />
          ) : (
            <IconUser size={40} className={styles.photoIcon} aria-hidden="true" />
          )}
          <span className={styles.photoCaption}>Simulated ID photo</span>
        </div>

        <dl className={styles.facts}>
          <div className={styles.nameRow}>
            <dt className="sr-only">Visitor</dt>
            <dd className={styles.name}>{visitor.name}</dd>
          </div>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Host</dt>
            <dd className={styles.factValue}>{visitor.host}</dd>
          </div>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Visit window</dt>
            <dd className={styles.factValue}>{visitor.visitWindow}</dd>
          </div>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Pass ID</dt>
            <dd className={cx(styles.factValue, styles.mono)}>{visitor.passId}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.actions}>
        {admitted ? (
          <>
            <p className={styles.admittedNote}>
              <IconCheck size={18} className={styles.admittedCheck} />
              Entry recorded — pass used.
            </p>
            <Button fullWidth onClick={onScanNext}>
              Scan next visitor
            </Button>
          </>
        ) : (
          <>
            <Button fullWidth onClick={onAdmit}>
              Admit — mark entered
            </Button>
            <Button variant="secondary" fullWidth onClick={onRefuse}>
              Refuse
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
