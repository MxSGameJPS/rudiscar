import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/config";
import Logo from "@/components/ui/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Logo />
            <p className={styles.desc}>{SITE.descricao}</p>
            <div className={styles.social}>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navegação</h4>
            <ul className={styles.links}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contato</h4>
            <ul className={styles.contact}>
              <li>
                <MapPin size={18} />
                <span>{SITE.endereco}</span>
              </li>
              <li>
                <Phone size={18} />
                <a href={`tel:+${SITE.whatsapp}`}>{SITE.telefone}</a>
              </li>
              <li>
                <Mail size={18} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <Clock size={18} />
                <span>{SITE.horario}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {ano} {SITE.nome} — {SITE.slogan}. Todos os direitos reservados.
          </p>
          <Link href="/login" className={styles.painelLink}>
            Área restrita
          </Link>
        </div>
      </div>
    </footer>
  );
}
