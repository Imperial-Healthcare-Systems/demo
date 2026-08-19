import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { parseInsight } from "@/lib/insight-schema";
import { getInsightForAdmin, saveInsight } from "@/lib/insights-store";
import { isSupabaseConfigured } from "@/lib/supabase";

/**
 * Create or update a post.
 *
 * `isAdmin()` is called here even though the page that submits this form is
 * already behind the same check. That is not redundancy for its own sake: the
 * page guard protects the page, and anything at all can POST to this URL. A
 * route that assumes its caller came through the UI is open.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "No database is connected, so there is nowhere to save this." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseInsight(payload);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 422 });

  const insight = parsed.insight;
  const isNew = (payload as { isNew?: boolean }).isNew === true;

  // Creating something at a slug that already exists would silently replace
  // somebody's article, because the save is an upsert. Editing that same post
  // is the identical write and must be allowed — so the check is on intent,
  // which only the editor knows.
  if (isNew && (await getInsightForAdmin(insight.slug))) {
    return NextResponse.json(
      { error: `A post already lives at /insights/${insight.slug}. Change the headline or the web address.` },
      { status: 409 },
    );
  }

  try {
    await saveInsight(insight);
  } catch (err) {
    console.error("[admin] save failed:", err);
    return NextResponse.json({ error: "The database refused the save." }, { status: 500 });
  }

  /*
    Rebuild the pages this post appears on, now, rather than waiting for the
    60-second window in the page config to come round. Without this the client
    presses Publish, opens /insights in the next tab and does not see it — and
    concludes the portal is broken, which is a fair conclusion from what they
    can see.

    The sitemap is in the list because it is a rendered route like any other,
    and a new article missing from it is a new article search engines take
    weeks longer to find.
  */
  revalidatePath("/insights");
  revalidatePath(`/insights/${insight.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, slug: insight.slug });
}
