import { SUGGESTED_CATEGORIES } from "@/content/insights";
import { getAllInsightsForAdmin } from "@/lib/insights-store";
import { isSupabaseConfigured } from "@/lib/supabase";
import { InsightEditor } from "@/components/admin/InsightEditor";
import { EMPTY_DRAFT } from "@/lib/insight-draft";
import { SetupNotice } from "@/components/admin/SetupNotice";

export const dynamic = "force-dynamic";

export default async function NewInsightPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const existing = await getAllInsightsForAdmin();

  // Every category already in use, plus the eight the site was built around,
  // offered as suggestions. Typing something not on the list is still allowed —
  // that is how a new category gets created.
  const categories = [
    ...new Set([...existing.map((i) => i.category), ...SUGGESTED_CATEGORIES]),
  ].filter(Boolean);

  /*
    The byline is carried over from the most recent post.

    Two people write for this site and one of them writes most of it, so
    starting from a blank author field means typing the same name every time.
    It is an ordinary editable field, so getting it wrong costs nothing.
  */
  const last = existing.find((i) => i.author);

  return (
    <InsightEditor
      isNew
      categories={categories}
      initial={{
        ...EMPTY_DRAFT,
        author: last?.author ?? "",
        authorRole: last?.authorRole ?? "",
      }}
    />
  );
}
