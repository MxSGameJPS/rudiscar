"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PlusCircle, LogOut, ExternalLink } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { sair } from "@/app/painel/actions";
import styles from "./PainelShell.module.css";

export default function PainelShell({ children, email }) {
  const pathname = usePathname();
  const isActive = (href) =>
    href === "/painel" ? pathname === "/painel" : pathname.startsWith(href);

  return (
    <div className={styles.wrap}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Logo compact />
          <span className={styles.brandText}>Painel</span>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/painel"
            className={`${styles.item} ${isActive("/painel") && pathname === "/painel" ? styles.active : ""}`}
          >
            <LayoutGrid size={18} /> Veículos
          </Link>
          <Link
            href="/painel/novo"
            className={`${styles.item} ${isActive("/painel/novo") ? styles.active : ""}`}
          >
            <PlusCircle size={18} /> Adicionar veículo
          </Link>
          <Link href="/" target="_blank" className={styles.item}>
            <ExternalLink size={18} /> Ver site
          </Link>
        </nav>

        <div className={styles.footer}>
          <span className={styles.email} title={email}>
            {email}
          </span>
          <form action={sair}>
            <button type="submit" className={styles.logout}>
              <LogOut size={16} /> Sair
            </button>
          </form>
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
