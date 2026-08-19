import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { seedFromRepo } from "@/lib/insights-store";
import { isSupabaseConfigured } from "@/lib/supabase";

/**
 * Copy the eight articles that ship in the repository into an empty database.
 *
 * This is the one-time bridge between "the site serves what was checked in"
 * and "the site serves what the client edits". Until it is run the database is
 * empty and the public pages fall back to the repository, so nothing is broken
 * before somebody presses the button — it just is not editable yet.
 *
 * `seedFromRepo` refuses if the table already holds anything, which makes the
 * button safe to press twice. Without that guard a second press would restore
 * the originals over the client's edits.
 */
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "No database is connected." }, { status: 503 });
  }

  try {
    const imported = await seedFromRepo();
    revalidatePath("/insights");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true, imported });
  } catch (err) {
    console.error("[admin] seed failed:", err);
    return NextResponse.json({ error: "The import failed." }, { status: 500 });
  }
}
