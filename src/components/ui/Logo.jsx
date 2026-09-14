import styles from "./Logo.module.css";

/**
 * Logo Rudi's Car - marca tipografica com selo de pistao/velocimetro.
 */
export default function Logo({ compact = false }) {
  return (
    <span className={styles.logo}>
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <rect
            x="1.5"
            y="1.5"
            width="37"
            height="37"
            rx="11"
            stroke="url(#g1)"
            strokeWidth="2"
          />
          <path
            d="M12 27c0-4.4 3.6-8 8-8s8 3.6 8 8"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="27" r="2.4" fill="var(--brand)" />
          <path
            d="M20 27 L26 15"
            stroke="var(--brand)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M14 24 l-1.6-1M26 24 l1.6-1M20 20.5 v-1.8"
            stroke="var(--text-2)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="var(--brand)" />
              <stop offset="1" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {!compact && (
        <span className={styles.text}>
          <span className={styles.name}>
            Rudi&apos;s<span className={styles.accent}>Car</span>
          </span>
          <span className={styles.tag}>Mecânica Automotiva</span>
        </span>
      )}
    </span>
  );
}
