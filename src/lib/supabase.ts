/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";
// A chave publishable é pública; nunca incluir service_role/secret no cliente.
const env = import.meta.env;
const supabaseUrl = env.VITE_SUPABASE_URL || "https://cszculnaawtspsqfqsyt.supabase.co";
const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_jVtbZGSd-rwMIuMqAXCljA_Ys69qftQ";
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;
