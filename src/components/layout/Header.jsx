"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/config";
import { whatsappUrl } from "@/lib/format";
import Logo from "@/components/ui/Logo";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Rudi's Car - Início">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            href={whatsappUrl(SITE.whatsapp, "Olá! Vim pelo site.")}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <Phone size={16} strokeWidth={2.4} />
            <span>Fale conosco</span>
          </a>

          <button
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}>
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappUrl(SITE.whatsapp, "Olá! Vim pelo site.")}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            <Phone size={18} /> Fale conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
