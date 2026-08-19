import type { Insight, InsightBlock } from "@/content/insights";
import { slugify } from "@/lib/utils";

/**
 * Validation for anything the admin portal sends, and the URL safety rules
 * that go with it.
 *
 * This runs on the server, on data that arrives over HTTP. The editor in the
 * browser validates too, but that check is a courtesy to whoever is typing —
 * it is not a control, because anything can POST to the route. These functions
 * are the control.
 */

/**
 * Is this a URL we are willing to put in an href or a src?
 *
 * The attack this closes is `javascript:alert(1)` — and its cousins `data:` and
 * `vbscript:` — typed into a link or an image field. React escapes text, so
 * the article body cannot inject markup, but it does NOT stop a crafted
 * `href`: an anchor whose href is a javascript: URL runs that script on click,
 * from this origin, with the admin's session cookie in scope.
 *
 * So the rule is an allowlist, not a blocklist: a site-relative path, or an
 * absolute http/https/mailto URL. Nothing else survives, including anything
 * clever involving whitespace or case, because the scheme is compared after
 * trimming and lowercasing.
 */
export function safeUrl(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if (!value) return null;

  // Site-relative. "//evil.com" is protocol-relative, not a path, so it goes.
  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value);
    const scheme = url.protocol.toLowerCase();
    if (scheme === "http:" || scheme === "https:" || scheme === "mailto:") return value;
    return null;
  } catch {
    return null;
  }
}

/**
 * Inline links inside prose: `[label](https://example.com)`.
 *
 * One piece of markdown and no more. The client asked to be able to put links
 * in an article, and this is the notation everybody has already met — in
 * LinkedIn drafts, in GitHub, in chat. A full markdown parser would bring bold,
 * italics, headings and tables into a body model that already has blocks for
 * those, which is two ways to say the same thing and one of them wrong.
 *
 * Used by components/InsightBody.tsx to split prose into text and anchors.
 * The URL still goes through `safeUrl` at render time — this only finds it.
 */
export const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

const BLOCK_TYPES = ["paragraph", "heading", "list", "quote", "callout", "image", "video"];

function str(value: unknown, max = 20000): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

/**
 * Coerce whatever arrived into a clean block array.
 *
 * Anything unrecognised is dropped rather than rejected. A body is a long
 * thing to retype, and refusing to save all of it because one block came
 * through malformed would lose the client's work to protect them from a
 * problem they cannot see. Empty blocks are dropped for the same reason they
 * should not render: they are almost always a paragraph someone started and
 * abandoned.
 */
export function parseBlocks(input: unknown): InsightBlock[] {
  if (!Array.isArray(input)) return [];
  const blocks: InsightBlock[] = [];

  for (const raw of input.slice(0, 400)) {
    if (!raw || typeof raw !== "object") continue;
    const block = raw as Record<string, unknown>;
    const type = String(block.type ?? "");
    if (!BLOCK_TYPES.includes(type)) continue;

    switch (type) {
      case "paragraph":
      case "heading": {
        const text = str(block.text).trim();
        if (text) blocks.push({ type, text } as InsightBlock);
        break;
      }
      case "quote": {
        const text = str(block.text).trim();
        const attribution = str(block.attribution, 200).trim();
        if (text) blocks.push({ type: "quote", text, ...(attribution ? { attribution } : {}) });
        break;
      }
      case "callout": {
        const title = str(block.title, 200).trim();
        const text = str(block.text).trim();
        if (title || text) blocks.push({ type: "callout", title, text });
        break;
      }
      case "list": {
        const items = Array.isArray(block.items)
          ? block.items.map((i) => str(i, 2000).trim()).filter(Boolean)
          : [];
        if (items.length) {
          blocks.push({ type: "list", items, ...(block.ordered ? { ordered: true } : {}) });
        }
        break;
      }
      case "image": {
        const src = safeUrl(block.src);
        if (src) {
          blocks.push({
            type: "image",
            src,
            alt: str(block.alt, 300).trim(),
            ...(str(block.caption, 300).trim() ? { caption: str(block.caption, 300).trim() } : {}),
          });
        }
        break;
      }
      case "video": {
        const src = safeUrl(block.src);
        const embedUrl = safeUrl(block.embedUrl);
        if (src || embedUrl) {
          blocks.push({
            type: "video",
            title: str(block.title, 300).trim() || "Video",
            ...(src ? { src } : {}),
            ...(embedUrl ? { embedUrl } : {}),
            ...(safeUrl(block.poster) ? { poster: safeUrl(block.poster)! } : {}),
            ...(str(block.caption, 300).trim() ? { caption: str(block.caption, 300).trim() } : {}),
          } as InsightBlock);
        }
        break;
      }
    }
  }
  return blocks;
}

export type ParseResult = { ok: true; insight: Insight } | { ok: false; error: string };

/** Validate a submitted post and normalise it into the shape the site renders. */
export function parseInsight(input: unknown): ParseResult {
  if (!input || typeof input !== "object") return { ok: false, error: "Nothing was submitted." };
  const raw = input as Record<string, unknown>;

  const title = str(raw.title, 300).trim();
  if (!title) return { ok: false, error: "A headline is required." };

  const category = str(raw.category, 80).trim();
  if (!category) return { ok: false, error: "A category is required." };

  // The slug comes from the title unless one was given. Once a post is live
  // the editor sends the existing slug back unchanged, because changing it
  // would break every link anyone has already shared.
  const slug = slugify(str(raw.slug, 200).trim() || title);
  if (!slug) return { ok: false, error: "That headline does not make a usable web address." };

  const status = raw.status === "published" ? "published" : "draft";

  // A published post needs a date, because the "3 min ago" on the card counts
  // from it. Defaulting to now is right: publishing something is the event the
  // reader is being told about.
  let publishedAt = str(raw.publishedAt, 40).trim() || null;
  if (publishedAt && Number.isNaN(Date.parse(publishedAt))) publishedAt = null;
  if (status === "published" && !publishedAt) publishedAt = new Date().toISOString();

  const coverSrc = safeUrl(raw.coverSrc);
  const relatedHref = safeUrl(raw.relatedServiceHref);
  const relatedLabel = str(raw.relatedServiceLabel, 120).trim();

  return {
    ok: true,
    insight: {
      slug,
      title,
      category,
      topic: str(raw.topic, 120).trim(),
      type: (["Analysis", "Research", "Field Note"].includes(String(raw.type))
        ? raw.type
        : "Analysis") as Insight["type"],
      excerpt: str(raw.excerpt, 2000).trim(),
      outline: [],
      author: str(raw.author, 120).trim(),
      authorRole: str(raw.authorRole, 200).trim(),
      publishedAt,
      status,
      coverTone: (["navy", "sky", "green", "gold"].includes(String(raw.coverTone))
        ? raw.coverTone
        : "navy") as Insight["coverTone"],
      cover: coverSrc ? { src: coverSrc, alt: str(raw.coverAlt, 300).trim() } : undefined,
      body: parseBlocks(raw.body),
      media: [],
      relatedService:
        relatedHref && relatedLabel ? { label: relatedLabel, href: relatedHref } : undefined,
    },
  };
}
