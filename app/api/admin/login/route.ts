import { NextResponse } from "next/server";
import { checkPassword, endSession, isAdminConfigured, startSession } from "@/lib/admin-auth";

/**
 * Sign in and out.
 *
 * The delay on a failed attempt is the only rate limiting here, and it is
 * worth being clear about what it does and does not do. It makes an online
 * guessing attack slow — roughly two attempts a second per connection instead
 * of hundreds — which is enough to matter against a human or a naive script.
 * It does not stop a determined attacker running many connections at once. If
 * this portal ever holds something worth stealing, the right next step is a
 * proper rate limit keyed on IP, not a longer sleep.
 */

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured on this deployment." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!checkPassword(String(body.password ?? ""))) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Deliberately vague. "Wrong password" and "no such account" are the same
    // message here because there is only one account, but the habit is worth
    // keeping: an error that distinguishes them is an enumeration oracle.
    return NextResponse.json({ error: "That password was not recognised." }, { status: 401 });
  }

  await startSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
