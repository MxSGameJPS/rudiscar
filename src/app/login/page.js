import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/ui/Logo";
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export const metadata = {
  title: "Área restrita",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.card}>
        <Link href="/" className={styles.back}>
          <ArrowLeft size={16} /> Voltar ao site
        </Link>

        <div className={styles.logo}>
          <Logo />
        </div>

        <h1 className={styles.title}>Painel administrativo</h1>
        <p className={styles.sub}>
          Acesse para gerenciar os veículos da revenda.
        </p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
