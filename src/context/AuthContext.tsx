import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAIL = "rudscar@rudscar.com.br";
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  isDemoSession: boolean;
}
const AuthContext = createContext<AuthContextType>({
  user: null, loading: true, login: async () => ({ error: "Sem autenticação" }),
  logout: async () => {}, isDemoSession: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      const valid = !error && data.user?.email?.toLowerCase() === ADMIN_EMAIL && !!data.user.email_confirmed_at;
      setUser(valid ? data.user : null);
      setLoading(false);
    }).catch(() => { if (active) setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const current = session?.user;
      setUser(current?.email?.toLowerCase() === ADMIN_EMAIL && !!current.email_confirmed_at ? current : null);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  const login = async (email: string, password: string) => {
    if (!supabase) return { error: "Supabase indisponível. Verifique as configurações." };
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) return { error: "Acesso restrito ao gestor." };
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return { error: error.message };
    if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL || !data.user.email_confirmed_at) {
      await supabase.auth.signOut();
      return { error: "Administrador não autorizado ou e-mail não confirmado." };
    }
    setUser(data.user);
    return { error: null };
  };
  const logout = async () => { if (supabase) await supabase.auth.signOut(); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, logout, isDemoSession: false }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
