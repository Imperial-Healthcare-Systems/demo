import "server-only";
import {
  SUGGESTED_CATEGORIES,
  estimateReadingTime,
  getAllInsights as seedAll,
  type Insight,
  type InsightBlock,
} from "@/content/insights";
import { getSupabase, requireSupabase } from "@/lib/supabase";

/**
 * The insights data layer.
 *
 * content/insights.ts always said it was built to be swapped for a CMS without
 * touching a component — "the page components only ever consume
 * getAllInsights(), getInsight(slug) and the taxonomy exports". This is that
 * swap, and the promise held: the pages import from here instead of there, and
 * not one component changed.
 *
 * Two sources, one shape. When Supabase is configured this reads the database;
 * when it is not it returns the eight articles checked into the repository. So
 * a fresh clone with no keys still builds and still serves the site, and the
 * production build that runs before anyone has pasted the credentials into
 * Vercel does not fail — it just serves what it has.
 */

/** The database's snake_case row, kept apart from the app's camelCase type. */
type Row = {
  slug: string;
  title: string;
  category: string;
  topic: string;
  type: string;
  excerpt: string;
  author: string;
  author_role: string;
  published_at: string | null;
  status: string;
  cover_src: string | null;
  cover_alt: string | null;
  cover_tone: string;
  body: InsightBlock[] | null;
  outline: string[] | null;
  media: InsightBlock[] | null;
  related_service: { label: string; href: string } | null;
  updated_at?: string;
};

function toInsight(row: Row): Insight {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    topic: row.topic ?? "",
    type: (row.type as Insight["type"]) ?? "Analysis",
    excerpt: row.excerpt ?? "",
    outline: row.outline ?? [],
    author: row.author ?? "",
    authorRole: row.author_role ?? "",
    publishedAt: row.published_at,
    status: (row.status as Insight["status"]) ?? "draft",
    coverTone: (row.cover_tone as Insight["coverTone"]) ?? "navy",
    // A cover is only a cover if it has a file. A row with an alt and no src
    // would render an empty frame rather than the tonal ground InsightCover
    // draws when there is no image at all.
    cover: row.cover_src ? { src: row.cover_src, alt: row.cover_alt ?? "" } : undefined,
    body: row.body ?? [],
    media: row.media ?? [],
    relatedService: row.related_service ?? undefined,
  };
}

export function toRow(insight: Insight): Row {
  return {
    slug: insight.slug,
    title: insight.title,
    category: insight.category,
    topic: insight.topic ?? "",
    type: insight.type,
    excerpt: insight.excerpt ?? "",
    author: insight.author ?? "",
    author_role: insight.authorRole ?? "",
    published_at: insight.publishedAt,
    status: insight.status,
    cover_src: insight.cover?.src ?? null,
    cover_alt: insight.cover?.alt ?? null,
    cover_tone: insight.coverTone ?? "navy",
    body: insight.body ?? [],
    outline: insight.outline ?? [],
    media: insight.media ?? [],
    related_service: insight.relatedService ?? null,
  };
}

/** Newest first, undated last — the order the listing and the sitemap want. */
function byNewest(a: Insight, b: Insight): number {
  if (!a.publishedAt) return 1;
  if (!b.publishedAt) return -1;
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

// ---------------------------------------------------------------- public reads

/**
 * Every published insight, newest first.
 *
 * Published only, and that filter is here rather than in the pages so there is
 * one place it can be got wrong. A draft has no card, no URL and no sitemap
 * entry because it never leaves this function.
 */
export async function getAllInsights(): Promise<Insight[]> {
  const db = getSupabase();
  if (!db) return seedAll();

  const { data, error } = await db
    .from("insights")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    // Falling back rather than throwing. A database hiccup should degrade the
    // insights page to the articles we shipped with, not take out a marketing
    // site — and the error is logged so it is not silent.
    console.error("[insights] read failed, serving the checked-in seed:", error.message);
    return seedAll();
  }
  return (data as Row[]).map(toInsight).sort(byNewest);
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  const db = getSupabase();
  if (!db) return seedAll().find((i) => i.slug === slug);

  const { data, error } = await db
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[insights] read failed for", slug, error.message);
    return seedAll().find((i) => i.slug === slug);
  }
  return data ? toInsight(data as Row) : undefined;
}

/** The hero slot on /insights: simply the most recent published piece. */
export async function getFeaturedInsight(): Promise<Insight | undefined> {
  return (await getAllInsights())[0];
}

/**
 * Up to `limit` further reads for the foot of an article.
 *
 * Same category first, then anything else, which is a better guess at "more
 * like this" than recency alone and costs nothing to compute over a list this
 * size.
 */
export async function getRelatedInsights(slug: string, limit = 3): Promise<Insight[]> {
  const all = await getAllInsights();
  const current = all.find((i) => i.slug === slug);
  const others = all.filter((i) => i.slug !== slug);
  const sameCategory = others.filter((i) => i.category === current?.category);
  const rest = others.filter((i) => i.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/**
 * The filter row on /insights.
 *
 * Derived from what the published articles actually use, never declared. This
 * is what makes "create a category" work with no schema change — a category
 * exists the moment a published post is filed under it — and it is also what
 * stops the row offering a chip that returns nothing.
 *
 * The client's original eight lead, in their order, so the row does not
 * reshuffle itself as posts come and go. Anything new they invent follows,
 * alphabetically.
 */
export function deriveCategories(insights: Insight[]): string[] {
  const used = new Set(insights.map((i) => i.category).filter(Boolean));
  const known = SUGGESTED_CATEGORIES.filter((c) => used.has(c));
  const invented = [...used]
    .filter((c) => !(SUGGESTED_CATEGORIES as readonly string[]).includes(c))
    .sort();
  return ["All", ...known, ...invented];
}

export { estimateReadingTime };

// ----------------------------------------------------------------- admin only
// Everything below writes, and every caller sits behind isAdmin().

/** Published and drafts together, for the admin list. */
export async function getAllInsightsForAdmin(): Promise<Insight[]> {
  const db = getSupabase();
  if (!db) return seedAll();
  const { data, error } = await db
    .from("insights")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as Row[]).map(toInsight);
}

export async function getInsightForAdmin(slug: string): Promise<Insight | undefined> {
  const db = getSupabase();
  if (!db) return seedAll().find((i) => i.slug === slug);
  const { data, error } = await db.from("insights").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toInsight(data as Row) : undefined;
}

/**
 * Create or update, keyed on slug.
 *
 * `upsert` rather than read-then-branch: one round trip, and no window between
 * the check and the write in which the row could appear.
 */
export async function saveInsight(insight: Insight): Promise<void> {
  const db = requireSupabase();
  const { error } = await db
    .from("insights")
    .upsert({ ...toRow(insight), updated_at: new Date().toISOString() }, { onConflict: "slug" });
  if (error) throw new Error(error.message);
}

export async function deleteInsight(slug: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db.from("insights").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

/**
 * Copy the checked-in articles into an empty database.
 *
 * Run once, from the admin portal, and only when the table is empty — the
 * guard matters, because running it over a live table would overwrite the
 * client's edits with the originals every time somebody pressed the button.
 */
export async function seedFromRepo(): Promise<number> {
  const db = requireSupabase();
  const { count, error: countError } = await db
    .from("insights")
    .select("slug", { count: "exact", head: true });
  if (countError) throw new Error(countError.message);
  if ((count ?? 0) > 0) return 0;

  const rows = seedAll().map((i) => toRow({ ...i, status: "published" }));
  const { error } = await db.from("insights").insert(rows);
  if (error) throw new Error(error.message);
  return rows.length;
}
