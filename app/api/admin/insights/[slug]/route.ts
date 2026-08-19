import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { deleteInsight } from "@/lib/insights-store";
import { isSupabaseConfigured } from "@/lib/supabase";

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "No database is connected." }, { status: 503 });
  }

  const { slug } = await params;
  try {
    await deleteInsight(slug);
  } catch (err) {
    console.error("[admin] delete failed:", err);
    return NextResponse.json({ error: "The database refused the delete." }, { status: 500 });
  }

  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
