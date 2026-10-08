/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

// Variaveis de ambiente do Supabase (suporta Vite VITE_ e Next.js NEXT_PUBLIC_)
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

