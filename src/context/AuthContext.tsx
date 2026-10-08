import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  isDemoSession: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ error: null }),
  logout: async () => {},
  isDemoSession: false,
});

const DEMO_SESSION_KEY = "rudis_car_admin_demo_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoSession, setIsDemoSession] = useState(false);

  useEffect(() => {
    // Check demo session first
    const demoStored = localStorage.getItem(DEMO_SESSION_KEY);
    if (demoStored) {
      setUser(JSON.parse(demoStored));
      setIsDemoSession(true);
      setLoading(false);
      return;
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ error: string | null }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });

        if (error) {
          // If supabase auth fails or user isn't created in Supabase yet, allow demo fallback if admin credentials used
          if (email === "admin@rudiscar.com.br" && pass === "admin123") {
            const demoUser = { email: "admin@rudiscar.com.br", id: "demo-admin-id", role: "admin" };
            localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoUser));
            setUser(demoUser);
            setIsDemoSession(true);
            setLoading(false);
            return { error: null };
          }
          setLoading(false);
          return { error: error.message };
        }

        setUser(data.user);
        setIsDemoSession(false);
        setLoading(false);
        return { error: null };
      } else {
        // Fallback demo mode when Supabase credentials aren't set
        if ((email === "admin@rudiscar.com.br" || email.includes("admin")) && pass.length >= 6) {
          const demoUser = { email: email || "admin@rudiscar.com.br", id: "demo-admin-id", role: "admin" };
          localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoUser));
          setUser(demoUser);
          setIsDemoSession(true);
          setLoading(false);
          return { error: null };
        } else {
          setLoading(false);
          return { error: "Credenciais inválidas. Tente admin@rudiscar.com.br com a senha admin123" };
        }
      }
    } catch (err: any) {
      setLoading(false);
      return { error: err.message || "Erro ao realizar login" };
    }
  };

  const logout = async () => {
    localStorage.removeItem(DEMO_SESSION_KEY);
    setIsDemoSession(false);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isDemoSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
