import { cx } from "./cx";
import styles from "./QrPlaceholder.module.css";

type QrPlaceholderProps = {
  /** Seed string (e.g. the pass id) — same value renders the same pattern. */
  value: string;
  size?: number;
  className?: string;
};

const MODULES = 21; // QR v1 grid size

/* Deterministic hash → module fill. Stable per seed, no Math.random. */
function fill(value: string, x: number, y: number): boolean {
  let h = 2166136261 ^ value.length;
  const k = x * 31 + y * 131 + 7;
  h = Math.imul(h ^ k, 16777619);
  for (let i = 0; i < value.length; i++) {
    h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  }
  return ((h >>> ((x + y) % 16)) & 1) === 1;
}

function isFinder(x: number, y: number): boolean {
  const inBox = (bx: number, by: number) =>
    x >= bx && x < bx + 7 && y >= by && y < by + 7;
  return inBox(0, 0) || inBox(MODULES - 7, 0) || inBox(0, MODULES - 7);
}

function finderModule(x: number, y: number): boolean {
  // Map to the local 7x7 finder cell and paint the classic ring + center.
  const lx = x < 7 ? x : x - (MODULES - 7);
  const ly = y < 7 ? y : y - (MODULES - 7);
  const edge = lx === 0 || lx === 6 || ly === 0 || ly === 6;
  const center = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
  return edge || center;
}

/*
 * A visual QR placeholder — pure black modules on pure white, the one
 * true-contrast pairing in DESIGN.md. It is NOT a scannable code; swap in a
 * real QR library at implementation. Deterministic so it never flickers.
 */
export function QrPlaceholder({ value, size = 160, className }: QrPlaceholderProps) {
  const cells = [];
  for (let y = 0; y < MODULES; y++) {
    for (let x = 0; x < MODULES; x++) {
      const on = isFinder(x, y) ? finderModule(x, y) : fill(value, x, y);
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  }
  return (
    <svg
      className={cx(styles.qr, className)}
      width={size}
      height={size}
      viewBox={`0 0 ${MODULES} ${MODULES}`}
      role="img"
      aria-label="Entry pass QR code"
      shapeRendering="crispEdges"
    >
      <rect x="0" y="0" width={MODULES} height={MODULES} className={styles.bg} />
      <g className={styles.modules}>{cells}</g>
    </svg>
  );
}
