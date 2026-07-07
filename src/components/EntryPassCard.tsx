import { cx } from "./cx";
import { StatusIndicator } from "./StatusIndicator";
import { QrPlaceholder } from "./QrPlaceholder";
import styles from "./EntryPassCard.module.css";

type EntryPassCardProps = {
  visitorName: string;
  /** Optional visitor photo (simulated identity). */
  photoUrl?: string;
  host: string;
  /** Human-readable visit window, e.g. "7 Jul 2026, 10:00–11:00". */
  visitWindow: string;
  /** Pass id — also seeds the QR pattern. */
  passId: string;
  status?: "approved" | "verified";
  className?: string;
};

/*
 * The "boarding pass" — the credential a visitor carries between Approval and
 * the gate. White card, one hairline border, roomy radius; QR is the focal
 * element in pure black on white.
 */
export function EntryPassCard({
  visitorName,
  photoUrl,
  host,
  visitWindow,
  passId,
  status = "approved",
  className,
}: EntryPassCardProps) {
  const initials = visitorName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className={cx(styles.card, className)}>
      <header className={styles.header}>
        <div className={styles.identity}>
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt="" className={styles.photo} />
          ) : (
            <span className={styles.photoFallback} aria-hidden="true">
              {initials}
            </span>
          )}
          <span className={styles.who}>
            <span className={styles.name}>{visitorName}</span>
            <span className={styles.host}>Host: {host}</span>
          </span>
        </div>
        <StatusIndicator status={status} />
      </header>

      <div className={styles.qrWrap}>
        <QrPlaceholder value={passId} size={168} />
      </div>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Visit window</dt>
          <dd className={styles.factValue}>{visitWindow}</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Pass ID</dt>
          <dd className={cx(styles.factValue, styles.mono)}>{passId}</dd>
        </div>
      </dl>
    </article>
  );
}
