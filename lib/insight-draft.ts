import type { Insight, InsightBlock } from "@/content/insights";

/**
 * The shape the editor form holds, and the two ways of producing one.
 *
 * This lives in its own module rather than in components/admin/InsightEditor.tsx
 * for a reason worth remembering. That file is `"use client"`, and a server
 * component importing a plain value from a client module does not get the
 * value — it gets a client reference, a placeholder the bundler swaps in so the
 * browser can find the component. Spreading one produces an object with none
 * of the expected fields, and the first thing to touch `body.length` throws
 * "Cannot read properties of undefined".
 *
 * That is exactly what happened: the New Post page 500'd on
 * `{...EMPTY_DRAFT}`. Plain data and plain functions shared across the
 * boundary belong in a module that is neither client nor server.
 *
 * It is flat, and the form's fields are strings, because that is what form
 * controls hand back. lib/insight-schema.ts turns it into an Insight on the
 * way in, and this turns an Insight into it on the way out.
 */
export type EditorDraft = {
  slug: string;
  title: string;
  category: string;
  topic: string;
  type: Insight["type"];
  excerpt: string;
  author: string;
  authorRole: string;
  publishedAt: string | null;
  status: "published" | "draft";
  coverSrc: string;
  coverAlt: string;
  coverTone: Insight["coverTone"];
  relatedServiceLabel: string;
  relatedServiceHref: string;
  body: InsightBlock[];
};

export function fromInsight(insight: Insight): EditorDraft {
  return {
    slug: insight.slug,
    title: insight.title,
    category: insight.category,
    topic: insight.topic ?? "",
    type: insight.type,
    excerpt: insight.excerpt ?? "",
    author: insight.author ?? "",
    authorRole: insight.authorRole ?? "",
    publishedAt: insight.publishedAt,
    status: insight.status === "published" ? "published" : "draft",
    coverSrc: insight.cover?.src ?? "",
    coverAlt: insight.cover?.alt ?? "",
    coverTone: insight.coverTone ?? "navy",
    relatedServiceLabel: insight.relatedService?.label ?? "",
    relatedServiceHref: insight.relatedService?.href ?? "",
    body: insight.body ?? [],
  };
}

/** A new post starts with one empty paragraph, so there is somewhere to type. */
export const EMPTY_DRAFT: EditorDraft = {
  slug: "",
  title: "",
  category: "",
  topic: "",
  type: "Analysis",
  excerpt: "",
  author: "",
  authorRole: "",
  publishedAt: null,
  status: "draft",
  coverSrc: "",
  coverAlt: "",
  coverTone: "navy",
  relatedServiceLabel: "",
  relatedServiceHref: "",
  body: [{ type: "paragraph", text: "" }],
};
