import "server-only";
import { getSupabase } from "@/lib/supabase";

/**
 * Traction.
 *
 * The client asked to see how many people visit the site and how many click
 * through to the Digital Currency Hub, and asked for it simple. So this is a
 * flat table of events and a handful of counts — not a funnel builder, not
 * cohorts, and not a third-party script that would put a consent banner on
 * every page.
 *
 * WHAT IS AND IS NOT COLLECTED. No cookie is set, no identifier is stored, and
 * no IP address is written down. What gets stored per event is the path, the
 * name of the thing that happened, and `visitor` — a hash of the IP and user
 * agent mixed with a salt that changes at midnight UTC. It cannot be reversed,
 * and because the salt rotates, the same person is a different value tomorrow,
 * so nobody can be followed from one day to the next.
 *
 * That is a deliberate trade, and it is worth being straight about what it
 * costs: "visitors" means unique people per day. Someone who returns on three
 * days counts three times in a monthly figure. The alternative — a permanent
 * identifier — would make the monthly number "true" and make the data personal,
 * which is a much worse trade for a marketing site.
 */

export type Traction = {
  views: { today: number; week: number; month: number; total: number };
  visitors: { today: number; week: number; month: number };
  clicks: { label: string; count: number; people: number }[];
  topPages: { path: string; count: number; people: number }[];
  topArticles: { path: string; count: number; people: number }[];
  daily: { day: string; views: number; visitors: number }[];
};

export const EMPTY_TRACTION: Traction = {
  views: { today: 0, week: 0, month: 0, total: 0 },
  visitors: { today: 0, week: 0, month: 0 },
  clicks: [],
  topPages: [],
  topArticles: [],
  daily: [],
};

/**
 * Obvious robots, skipped before anything is written.
 *
 * Not a serious bot-detection effort — that is an arms race, and losing it
 * quietly is the normal outcome. This catches the honest ones that say what
 * they are, which is most of the crawl traffic a site like this sees, and
 * keeps the numbers from being mostly Googlebot.
 */
const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|monitor|preview|scrape|curl|wget|python-requests|node-fetch|axios/i;

export function looksLikeBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // a browser always sends one
  return BOT.test(userAgent);
}

/**
 * The daily-rotating visitor hash. See the note at the top for why it rotates.
 *
 * `ADMIN_SESSION_SECRET` doubles as the salt when it is set, so the hash cannot
 * be recomputed by someone who merely guesses an IP and a user agent. Without
 * it the date alone still rotates, which is the property that actually matters.
 */
async function visitorHash(ip: string, userAgent: string): Promise<string> {
  const day = new Date().toISOString().slice(0, 10); // UTC
  const salt = process.env.ADMIN_SESSION_SECRET ?? "";
  const data = new TextEncoder().encode(`${day}|${salt}|${ip}|${userAgent}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  // 16 hex characters is 64 bits — far past collision trouble at this volume,
  // and a third of the storage of the full digest.
  return [...new Uint8Array(digest)]
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The caller's address, as far as the platform will say. */
function clientIp(headers: Headers): string {
  // Vercel sets both; x-forwarded-for is a list and the client is first.
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}

/**
 * Strip a URL down to a bare path.
 *
 * The query string never gets stored. It is where campaign tags live, and also
 * where personal data ends up by accident — an email address in a `?ref=`, a
 * token someone pasted. Not storing it means it cannot leak from here.
 */
export function cleanPath(input: string): string {
  const path = input.split("?")[0]!.split("#")[0]!.trim();
  if (!path.startsWith("/")) return "/";
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}

export type EventInput = {
  name: "pageview" | "cta_click" | (string & {});
  path: string;
  label?: string | null;
  referrer?: string | null;
};

/**
 * Write one event. Never throws.
 *
 * Analytics is the least important thing happening on any given request, so it
 * is not allowed to break the most important one. A failure here is logged and
 * swallowed: a missed count is a rounding error, a 500 on a page view is an
 * outage.
 */
export async function recordEvent(event: EventInput, headers: Headers): Promise<void> {
  const db = getSupabase();
  if (!db) return;

  const userAgent = headers.get("user-agent");
  if (looksLikeBot(userAgent)) return;

  try {
    const visitor = await visitorHash(clientIp(headers), userAgent ?? "");
    const { error } = await db.from("events").insert({
      name: event.name,
      path: cleanPath(event.path),
      label: event.label ?? null,
      referrer: event.referrer ? event.referrer.slice(0, 300) : null,
      visitor,
    });
    if (error) console.error("[traction] insert failed:", error.message);
  } catch (err) {
    console.error("[traction] insert threw:", err);
  }
}

/** Everything the dashboard shows, in one round trip. See `traction()` in the schema. */
export async function getTraction(days = 30): Promise<Traction> {
  const db = getSupabase();
  if (!db) return EMPTY_TRACTION;

  const { data, error } = await db.rpc("traction", { p_days: days });
  if (error) {
    console.error("[traction] read failed:", error.message);
    return EMPTY_TRACTION;
  }
  return { ...EMPTY_TRACTION, ...(data as Partial<Traction>) };
}
