import { cx } from "./cx";
import { IconCheck } from "./icons";
import styles from "./IdentitySummary.module.css";

type IdentitySummaryProps = {
  name: string;
  /** Optional secondary line; e.g. the login phone. */
  phone?: string;
  /** Enrolled ID photo; shown as a thumbnail, else an initials avatar. */
  photoUrl?: string | null;
  /** When provided, renders an Edit link (Profile screen); omit for read-only. */
  onEdit?: () => void;
  className?: string;
};

/*
 * A compact, read-only view of the visitor's enrolled identity — the same
 * block on the Profile screen header and the Apply/Review "Applying as…".
 */
export function IdentitySummary({
  name,
  phone,
  photoUrl,
  onEdit,
  className,
}: IdentitySummaryProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={cx(styles.summary, className)}>
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt="" className={styles.photo} />
      ) : (
        <span className={styles.avatar} aria-hidden="true">
          {initials || "?"}
        </span>
      )}

      <div className={styles.body}>
        <span className={styles.name}>{name}</span>
        {phone && <span className={styles.phone}>{phone}</span>}
        {photoUrl && (
          <span className={styles.enrolled}>
            <IconCheck size={14} className={styles.enrolledCheck} />
            ID enrolled
          </span>
        )}
      </div>

      {onEdit && (
        <button type="button" className={styles.edit} onClick={onEdit}>
          Edit
        </button>
      )}
    </div>
  );
}
