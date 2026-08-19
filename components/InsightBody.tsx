import Image from "next/image";
import type { InsightBlock } from "@/content/insights";
import { Icon } from "@/components/Icon";
import { INLINE_LINK, safeUrl } from "@/lib/insight-schema";

/**
 * Turns `[text](https://example.com)` inside prose into a real link.
 *
 * The client asked to be able to put links in an article, and this is the one
 * piece of markdown the editor understands — the notation everybody already
 * knows from chat, LinkedIn drafts and GitHub.
 *
 * It returns React elements, never HTML. Nothing here is ever handed to
 * `dangerouslySetInnerHTML`, so text that happens to contain angle brackets is
 * text and not markup, and the address goes through `safeUrl` on the way out:
 * a `javascript:` URL typed into the editor renders as plain text rather than
 * as a link that would run script from this origin when clicked.
 */
function inline(text: string): React.ReactNode {
  // Fast path — most paragraphs have no link in them at all.
  if (!text.includes("](")) return text;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  // `matchAll` rather than a stateful `exec` loop: INLINE_LINK is a shared
  // module-level regex with the /g flag, and `exec` would carry `lastIndex`
  // between calls, so the second paragraph on a page would start matching
  // halfway through itself.
  for (const match of text.matchAll(INLINE_LINK)) {
    const [whole, label, href] = match;
    const at = match.index ?? 0;
    if (at > cursor) nodes.push(text.slice(cursor, at));

    const safe = safeUrl(href);
    if (safe) {
      const external = /^https?:/i.test(safe);
      nodes.push(
        <a
          key={at}
          href={safe}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-navy-600 underline decoration-navy-600/30 underline-offset-[3px] transition-colors hover:decoration-navy-600"
        >
          {label}
        </a>,
      );
    } else {
      // Refused. Show what was written rather than dropping it silently —
      // an author who mistypes an address should see their words, not a gap.
      nodes.push(whole);
    }
    cursor = at + whole.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/**
 * Renders the rich content of an insight. Supports prose, lists, pull quotes,
 * callouts, photography and video (self-hosted or embedded) so the client can
 * publish a full multimedia article without any component changes.
 */
export function InsightBody({ blocks }: { blocks: InsightBlock[] }) {
  return (
    <div className="flex flex-col gap-7">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="mt-4 h-display-4">
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p key={i} className="text-[1.0625rem] leading-[1.75] text-ink-2">
                {inline(block.text)}
              </p>
            );

          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className="flex flex-col gap-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-ink-2">
                    {block.ordered ? (
                      <span className="mt-0.5 font-mono text-[0.75rem] tabular text-navy-600">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                      />
                    )}
                    {inline(item)}
                  </li>
                ))}
              </Tag>
            );
          }

          case "quote":
            return (
              /* Grey, at the client's request — `text-ink-2` rather than the
                 near-black `text-ink` these were set in. 7.5:1 on white, so it
                 still clears AA comfortably at this size. The navy rule beside
                 it stays: it is the mark that says "quote", not type, and
                 greying it too would leave the block with nothing to hold it
                 apart from the paragraphs around it. */
              <figure key={i} className="my-2 border-l-2 border-navy-600 pl-6">
                <blockquote className="font-display text-[1.25rem] leading-[1.24] font-semibold tracking-[-0.03em] text-ink-2 md:text-[1.5rem]">
                  {block.text}
                </blockquote>
                {block.attribution && (
                  <figcaption className="mt-3 font-mono text-[0.75rem] md:text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3">
                    {block.attribution}
                  </figcaption>
                )}
              </figure>
            );

          case "callout":
            return (
              <aside
                key={i}
                className="flex gap-4 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line"
              >
                <Icon name="spark" className="h-5 w-5 shrink-0 text-navy-600" strokeWidth={1.6} />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[1rem]">{block.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {inline(block.text)}
                  </p>
                </div>
              </aside>
            );

          case "image":
            return (
              <figure key={i} className="my-2 flex flex-col gap-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-[0.8125rem] text-ink-3">{block.caption}</figcaption>
                )}
              </figure>
            );

          case "video":
            return (
              <figure key={i} className="my-2 flex flex-col gap-3">
                <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-abyss">
                  {block.embedUrl ? (
                    <iframe
                      src={block.embedUrl}
                      title={block.title}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  ) : (
                    <video
                      src={block.src}
                      poster={block.poster}
                      controls
                      preload="metadata"
                      title={block.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                {block.caption && (
                  <figcaption className="text-[0.8125rem] text-ink-3">{block.caption}</figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
