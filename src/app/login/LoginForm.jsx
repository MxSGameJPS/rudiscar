"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const email = fd.get("email");
    const password = fd.get("password");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErro("E-mail ou senha inválidos. Tente novamente.");
      setLoading(false);
      return;
    }

    const redirectTo = params.get("redirectTo") || "/painel";
    router.replace(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label className={styles.field}>
        <span>E-mail</span>
        <div className={styles.inputWrap}>
          <Mail size={18} />
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="voce@rudiscar.com.br"
          />
        </div>
      </label>

      <label className={styles.field}>
        <span>Senha</span>
        <div className={styles.inputWrap}>
          <Lock size={18} />
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>
      </label>

      {erro && <p className={styles.erro}>{erro}</p>}

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={18} className={styles.spin} /> Entrando…
          </>
        ) : (
          <>
            <LogIn size={18} /> Entrar
          </>
        )}
      </button>
    </form>
  );
}
