import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Car, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const res = await login(email, password);
    setSubmitting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      navigate("/admin");
    }
  };

  const handleDemoAccess = async () => {
    setEmail("admin@rudiscar.com.br");
    setPassword("admin123");
    setSubmitting(true);
    const res = await login("admin@rudiscar.com.br", "admin123");
    setSubmitting(false);
    if (!res.error) {
      navigate("/admin");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-ink-950 text-zinc-100 flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Glow ambient background elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/15 blur-[140px] animate-blob" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-teal-400/10 blur-[140px] animate-blob [animation-delay:-8s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[160px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
      </div>

      {/* Top Bar Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <a href="#/" className="flex items-center gap-3 transition hover:opacity-90">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 font-display font-bold text-ink-950 shadow-lg shadow-emerald-500/20">
            <Car className="h-6 w-6" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-white">Rudi's <span className="text-gradient">Car</span></span>
            <span className="block text-[10px] uppercase tracking-widest text-zinc-400">Painel Gestor</span>
          </div>
        </a>
        <a
          href="#/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
          Voltar ao site
        </a>
      </header>

      {/* Main Login Card */}
      <main className="mx-auto my-auto flex w-full max-w-md flex-col justify-center px-5 py-8">
        <div className="glass relative overflow-hidden rounded-[2.5rem] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

          {/* Badge Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-400 shadow-inner">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Acesso Administrativo</h1>
            <p className="mt-2 text-xs text-zinc-400">Gerencie o estoque, depoimentos e propostas da Rudi's Car</p>
          </div>

          {errorMsg && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 animate-[fadeUp_0.3s]">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              <div>
                <strong className="block font-semibold">Falha na autenticação</strong>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-zinc-300">E-mail do Gestor</label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rudiscar.com.br"
                  className="w-full rounded-2xl border border-white/10 bg-ink-900/80 py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-ink-900 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pass" className="block text-xs font-medium text-zinc-300">Senha de Acesso</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-ink-900/80 py-3.5 pl-11 pr-11 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-ink-900 focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-4 font-display font-semibold text-ink-950 shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:from-emerald-400 hover:to-emerald-300 hover:shadow-emerald-500/30 disabled:opacity-50"
            >
              {submitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-ink-950 border-t-transparent" />
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Notice */}
          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-[11px] text-zinc-400">Quer testar o painel imediatamente?</p>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="mt-2 text-xs font-semibold text-emerald-400 underline underline-offset-4 hover:text-emerald-300 transition"
            >
              Entrar como Admin Demo
            </button>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="py-6 text-center text-xs text-zinc-600">
        Rudi's Car &copy; {new Date().getFullYear()} &bull; Painel de Controle de Estoque
      </footer>
    </div>
  );
}
