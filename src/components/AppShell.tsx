import type { ReactNode } from "react";
import Link from "next/link";
import { cx } from "./cx";
import { IconShieldCheck } from "./icons";
import styles from "./AppShell.module.css";

export type NavItem = { label: string; href: string; active?: boolean };

type AppShellProps = {
  children: ReactNode;
  /** Brand shown at the top-left. Defaults to the app name + shield mark. */
  brand?: ReactNode;
  /** 2–3 nav entries max — no hamburger, no sidebar. */
  navItems?: NavItem[];
  /** Extra node on the top-right (e.g. profile). */
  right?: ReactNode;
  /**
   * default: centered 640px column · wide: 880px (officer lists) ·
   * full: edge-to-edge (gate verification).
   */
  width?: "default" | "wide" | "full";
  className?: string;
};

/*
 * The invisible shell: pure-white frame, one hairline border under a pinned
 * top bar, a single centered content column. No colored header, no sidebar,
 * no bottom tab bar — all color and action lives in the content.
 */
export function AppShell({
  children,
  brand,
  navItems,
  right,
  width = "default",
  className,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.bar}>
          <Link href="/" className={styles.brand}>
            {brand ?? (
              <>
                <IconShieldCheck size={22} className={styles.brandMark} />
                <span className={styles.brandName}>Entry Permit</span>
              </>
            )}
          </Link>

          <div className={styles.right}>
            {navItems && navItems.length > 0 && (
              <nav aria-label="Primary" className={styles.nav}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={cx(styles.navLink, item.active && styles.navActive)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
            {right}
          </div>
        </div>
      </header>

      <main className={cx(styles.main, styles[width], className)}>
        {children}
      </main>
    </div>
  );
}
