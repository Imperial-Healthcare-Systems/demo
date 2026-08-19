import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * The one place that talks to Supabase.
 *
 * `server-only` is the first line here on purpose: this module holds the
 * service role key, which bypasses every row level security policy in the
 * database. If it were ever pulled into a client component the import would
 * fail the build rather than quietly ship the key to browsers, which is the
 * whole point of that package.
 *
 * Note which variables are read. `SUPABASE_SERVICE_ROLE_KEY` has no
 * `NEXT_PUBLIC_` prefix, so Next will not inline it into client bundles even
 * by accident. The URL does carry the prefix because it is not a secret and
 * `next.config.ts` needs the hostname anyway.
 */

const URL_VAR = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY_VAR = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Whether the site has a database behind it.
 *
 * This is checked rather than assumed because the site has to keep working
 * without one. A fresh clone, a CI build, or the production build that runs
 * before anyone has pasted the keys into Vercel all have no Supabase — and the
 * marketing site going down because the admin portal is not configured yet
 * would be a self-inflicted outage. Everything that reads content falls back
 * to the checked-in articles in content/insights.ts; everything that writes
 * refuses with a clear message.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(URL_VAR && KEY_VAR);
}

let client: SupabaseClient | null = null;

/** The service-role client, or null when the site is running unconfigured. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(URL_VAR!, KEY_VAR!, {
      auth: {
        // There are no Supabase user sessions here — the admin portal has its
        // own password — so none of the token machinery is wanted. Left on, it
        // tries to persist a session and refresh it on a timer inside a
        // serverless function that will not exist a second later.
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return client;
}

/** The same, for code paths where running without a database is a bug. */
export function requireSupabase(): SupabaseClient {
  const db = getSupabase();
  if (!db) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return db;
}

/** Public base URL for anything uploaded to the media bucket. */
export const MEDIA_BUCKET = "insight-media";
