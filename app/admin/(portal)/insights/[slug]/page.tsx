import { notFound } from "next/navigation";
import { SUGGESTED_CATEGORIES } from "@/content/insights";
import { getAllInsightsForAdmin, getInsightForAdmin } from "@/lib/insights-store";
import { isSupabaseConfigured } from "@/lib/supabase";
import { InsightEditor } from "@/components/admin/InsightEditor";
import { fromInsight } from "@/lib/insight-draft";
import { SetupNotice } from "@/components/admin/SetupNotice";

export const dynamic = "force-dynamic";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const { slug } = await params;
  const insight = await getInsightForAdmin(slug);
  if (!insight) notFound();

  const existing = await getAllInsightsForAdmin();
  const categories = [
    ...new Set([...existing.map((i) => i.category), ...SUGGESTED_CATEGORIES]),
  ].filter(Boolean);

  return <InsightEditor isNew={false} categories={categories} initial={fromInsight(insight)} />;
}
