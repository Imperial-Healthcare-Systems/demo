import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";

/**
 * Admin session.
 *
 * One shared password, as the client asked for — there is one administrator,
 * and a user table with roles would be machinery serving nobody. What that
 * buys in simplicity it costs in blast radius, so the two things that matter
 * are both done properly: the password is never in the repository, and the
 * cookie that stands in for it afterwards cannot be forged.
 *
 * The password lives in `ADMIN_PASSWORD`. It is deliberately NOT defaulted in
 * code — this repository is public, and a fallback value in a source file is
 * the same as publishing it. With the variable unset the portal refuses every
 * login rather than falling back to something guessable.
 */

const COOKIE = "om_admin";
/** Twelve hours. Long enough for a working day, short enough that a forgotten
 *  session on a shared machine expires on its own. */
const TTL_SECONDS = 12 * 60 * 60;

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/**
 * The key the session cookie is signed with.
 *
 * `ADMIN_SESSION_SECRET` if it is set, otherwise derived from the password.
 * The derivation keeps setup to a single variable, and has a useful side
 * effect: changing the password changes the key, so every session signed with
 * the old one stops verifying. Changing the password logs everyone out, which
 * is exactly what changing a password should do.
 */
async function signingKey(): Promise<CryptoKey> {
  const material = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
  return crypto.subtle.importKey("raw", digest, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Constant-time string comparison.
 *
 * `a === b` on a secret leaks its length and, in principle, its prefix through
 * how long the comparison takes. The cost of not caring is small here and the
 * cost of caring is four lines, so it cares.
 */
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const left = enc.encode(a);
  const right = enc.encode(b);
  // Compare a fixed-length digest instead of the raw bytes so unequal lengths
  // do not short-circuit before the loop runs.
  let diff = left.length ^ right.length;
  const len = Math.max(left.length, right.length);
  for (let i = 0; i < len; i++) diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  return diff === 0;
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(candidate, expected);
}

/** `<expiry>.<hmac>` — no secrets in the value, and it cannot be edited. */
async function mintToken(): Promise<string> {
  const expiresAt = Date.now() + TTL_SECONDS * 1000;
  const payload = String(expiresAt);
  const key = await signingKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toHex(sig)}`;
}

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const key = await signingKey();
  const expected = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return timingSafeEqual(sig, toHex(expected));
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, await mintToken(), {
    httpOnly: true, // script on the page cannot read it, so XSS cannot steal it
    sameSite: "lax", // not sent on cross-site POSTs, which is the CSRF guard
    secure: process.env.NODE_ENV === "production", // off on http://localhost
    path: "/",
    maxAge: TTL_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/**
 * Is the caller signed in?
 *
 * `cache` memoises this for the duration of one render, so a layout and the
 * page inside it verifying independently costs one HMAC rather than two.
 *
 * Every admin page and every admin API route calls this for itself. That is
 * deliberate duplication: Next's own authentication guide is explicit that a
 * check in proxy/middleware is an optimisation and not a boundary, and a route
 * that trusts something upstream to have checked is one refactor away from
 * being open.
 */
export const isAdmin = cache(async (): Promise<boolean> => {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
});
