"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { cx } from "./cx";
import { IconMenu, IconShieldCheck, IconUser, IconX } from "./icons";
import styles from "./AppShell.module.css";

export type NavItem = { label: string; href: string; active?: boolean };

type AppShellProps = {
  children: ReactNode;
  /** Brand shown at the top-left. Defaults to the app name + shield mark. */
  brand?: ReactNode;
  /** 2–3 nav entries max. Inline on desktop/tablet; a hamburger panel on mobile. */
  navItems?: NavItem[];
  /** Extra node on the top-right (e.g. profile). Desktop/tablet only. */
  right?: ReactNode;
  /** Show the persistent account avatar (top-right), linking to the Profile screen. */
  account?: boolean;
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
 *
 * Nav is inline at >=640px; below that it collapses into a hamburger that
 * opens a transient full-width panel (a disclosure, not persistent chrome).
 */
export function AppShell({
  children,
  brand,
  navItems,
  right,
  account = false,
  width = "default",
  className,
}: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const hasNav = Boolean(navItems && navItems.length > 0);

  // Close on outside tap/click and on Escape.
  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setMenuOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
            {hasNav && (
              <nav aria-label="Primary" className={styles.nav}>
                {navItems!.map((item) => (
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
            {/* `right` only needs a mobile home in the panel when there's a
                nav/hamburger to hold it; otherwise (e.g. the gate screen's
                lane label) it stays visible in the bar at every width. */}
            <span className={hasNav ? styles.desktopOnly : styles.rightAlways}>
              {right}
            </span>

            {account && (
              <Link
                href="/profile"
                className={styles.account}
                aria-label="Your profile"
              >
                <IconUser size={22} />
              </Link>
            )}

            {hasNav && (
              <button
                ref={toggleRef}
                type="button"
                className={styles.menuToggle}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls={panelId}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
              </button>
            )}
          </div>
        </div>

        {hasNav && (
          <div
            id={panelId}
            ref={panelRef}
            className={cx(styles.panel, menuOpen && styles.panelOpen)}
            hidden={!menuOpen}
          >
            <nav aria-label="Primary" className={styles.panelNav}>
              {navItems!.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={cx(
                    styles.panelLink,
                    item.active && styles.panelLinkActive,
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {right && <div className={styles.panelExtra}>{right}</div>}
          </div>
        )}
      </header>

      <main className={cx(styles.main, styles[width], className)}>
        {children}
      </main>
    </div>
  );
}
