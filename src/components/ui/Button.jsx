import Link from "next/link";
import styles from "./Button.module.css";

/**
 * Botao versatil: renderiza <a>, <Link> ou <button>.
 * variant: primary | outline | ghost | dark
 * size: sm | md | lg
 */
export default function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  );
}
