import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/env";

/**
 * Cliente do Supabase com a chave secreta — ignora RLS, por isso só existe no
 * servidor (o "server-only" quebra o build se um Client Component o importar).
 * As tabelas do site têm RLS ligado e nenhuma policy: o navegador não as vê.
 */
let cached: { key: string; client: SupabaseClient } | undefined;

/** Um cliente por processo (refeito só se a URL ou a chave mudarem). */
export function getSupabaseAdmin(): SupabaseClient | null {
  const env = supabaseEnv();
  if (!env) return null;
  const key = `${env.url}\n${env.secretKey}`;
  if (cached?.key !== key) {
    cached = {
      key,
      client: createClient(env.url, env.secretKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      }),
    };
  }
  return cached.client;
}
