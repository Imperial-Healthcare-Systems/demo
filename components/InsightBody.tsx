import Image from "next/image";
import type { InsightBlock } from "@/content/insights";
import { Icon } from "@/components/Icon";

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
                {block.text}
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
                    {item}
                  </li>
                ))}
              </Tag>
            );
          }

          case "quote":
            return (
              <figure key={i} className="my-2 border-l-2 border-navy-600 pl-6">
                <blockquote className="font-display text-[1.25rem] leading-[1.24] font-semibold tracking-[-0.03em] text-ink md:text-[1.5rem]">
                  {block.text}
                </blockquote>
                {block.attribution && (
                  <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3">
                    {block.attribution}
                  </figcaption>
                )}
              </figure>
            );

          case "callout":
            return (
              <aside
                key={i}
                className="flex gap-4 rounded-[--radius-card] bg-surface p-6 ring-1 ring-line"
              >
                <Icon name="spark" className="h-5 w-5 shrink-0 text-navy-600" strokeWidth={1.6} />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[1rem]">{block.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">{block.text}</p>
                </div>
              </aside>
            );

          case "image":
            return (
              <figure key={i} className="my-2 flex flex-col gap-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[--radius-card] bg-surface-2">
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
                <div className="relative aspect-video overflow-hidden rounded-[--radius-card] bg-abyss">
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
