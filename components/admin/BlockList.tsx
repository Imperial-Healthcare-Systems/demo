"use client";

import type { InsightBlock } from "@/content/insights";
import { ImageField } from "@/components/admin/ImageField";

/**
 * The body editor.
 *
 * An article is a list of typed blocks — paragraph, heading, list, quote,
 * callout, image — and this edits exactly that. No rich text box, no HTML, no
 * markdown to learn beyond one thing: links are written `[text](address)`
 * inside any paragraph, list item or callout, which is the notation people
 * have already met everywhere else.
 *
 * The reason for blocks rather than a WYSIWYG is worth stating once. The
 * article renderer takes this array; a rich text editor would produce HTML
 * that something would then have to convert into it, and that conversion is
 * where formatting gets lost and where markup gets injected. Here the thing
 * being edited is the thing being published.
 */

const INPUT =
  "h-11 w-full rounded-[0.5rem] border border-line bg-white px-3.5 text-[0.9375rem] outline-none transition-colors focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15";
const AREA =
  "w-full rounded-[0.5rem] border border-line bg-white px-3.5 py-3 text-[0.9375rem] leading-relaxed outline-none transition-colors focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15";

const NEW_BLOCK: Record<string, () => InsightBlock> = {
  paragraph: () => ({ type: "paragraph", text: "" }),
  heading: () => ({ type: "heading", text: "" }),
  list: () => ({ type: "list", items: [""] }),
  quote: () => ({ type: "quote", text: "" }),
  callout: () => ({ type: "callout", title: "", text: "" }),
  image: () => ({ type: "image", src: "", alt: "" }),
};

const LABELS: Record<string, string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  list: "List",
  quote: "Pull quote",
  callout: "Callout box",
  image: "Image",
  video: "Video",
};

export function BlockList({
  blocks,
  onChange,
}: {
  blocks: InsightBlock[];
  onChange: (blocks: InsightBlock[]) => void;
}) {
  function update(index: number, next: InsightBlock) {
    onChange(blocks.map((b, i) => (i === index ? next : b)));
  }
  function remove(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }
  function move(index: number, by: number) {
    const target = index + by;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target]!, next[index]!];
    onChange(next);
  }
  function add(kind: string) {
    onChange([...blocks, NEW_BLOCK[kind]!()]);
  }

  return (
    <div className="flex flex-col gap-4">
      {blocks.length === 0 && (
        <p className="rounded-[0.5rem] border border-dashed border-line-strong px-4 py-8 text-center text-[0.875rem] text-ink-3">
          Nothing written yet. Add a paragraph below to start.
        </p>
      )}

      {blocks.map((block, index) => (
        <div key={index} className="rounded-[0.625rem] border border-line bg-surface/60 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.1em] text-ink-3 uppercase">
              {LABELS[block.type] ?? block.type}
            </span>
            <div className="ml-auto flex items-center gap-1">
              {/* Reorder and remove. Small, quiet, and never the first thing
                  the eye lands on — the writing is. */}
              <button
                type="button"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                className="h-7 w-7 rounded text-ink-3 transition-colors hover:bg-white hover:text-ink disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={index === blocks.length - 1}
                onClick={() => move(index, 1)}
                className="h-7 w-7 rounded text-ink-3 transition-colors hover:bg-white hover:text-ink disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                aria-label={`Remove this ${LABELS[block.type] ?? block.type}`}
                onClick={() => remove(index)}
                className="h-7 w-7 rounded text-ink-3 transition-colors hover:bg-white hover:text-critical"
              >
                ✕
              </button>
            </div>
          </div>

          {(block.type === "paragraph" || block.type === "heading") && (
            <textarea
              className={AREA}
              rows={block.type === "heading" ? 1 : 5}
              value={block.text}
              placeholder={
                block.type === "heading"
                  ? "Section heading"
                  : "Write the paragraph. Links go in as [text](https://example.com)."
              }
              onChange={(e) => update(index, { ...block, text: e.target.value })}
            />
          )}

          {block.type === "quote" && (
            <div className="flex flex-col gap-3">
              <textarea
                className={AREA}
                rows={3}
                value={block.text}
                placeholder="The quoted line"
                onChange={(e) => update(index, { ...block, text: e.target.value })}
              />
              <input
                className={INPUT}
                value={block.attribution ?? ""}
                placeholder="Who said it (optional)"
                onChange={(e) => update(index, { ...block, attribution: e.target.value })}
              />
            </div>
          )}

          {block.type === "callout" && (
            <div className="flex flex-col gap-3">
              <input
                className={INPUT}
                value={block.title}
                placeholder="Callout heading"
                onChange={(e) => update(index, { ...block, title: e.target.value })}
              />
              <textarea
                className={AREA}
                rows={3}
                value={block.text}
                placeholder="The point being pulled out"
                onChange={(e) => update(index, { ...block, text: e.target.value })}
              />
            </div>
          )}

          {block.type === "list" && (
            <div className="flex flex-col gap-3">
              {/*
                One item per line, edited as plain text.

                A row of inputs with its own add and remove buttons would be
                more "correct" and much worse to use — pasting five bullets
                from a document is one action here and five there.
              */}
              <textarea
                className={AREA}
                rows={Math.max(3, block.items.length + 1)}
                value={block.items.join("\n")}
                placeholder={"One item per line"}
                onChange={(e) => update(index, { ...block, items: e.target.value.split("\n") })}
              />
              <label className="flex items-center gap-2 text-[0.8125rem] text-ink-2">
                <input
                  type="checkbox"
                  checked={Boolean(block.ordered)}
                  onChange={(e) => update(index, { ...block, ordered: e.target.checked })}
                />
                Number these instead of bullets
              </label>
            </div>
          )}

          {block.type === "image" && (
            <ImageField
              value={block.src}
              alt={block.alt}
              caption={block.caption ?? ""}
              onChange={(src) => update(index, { ...block, src })}
              onAltChange={(alt) => update(index, { ...block, alt })}
              onCaptionChange={(caption) => update(index, { ...block, caption })}
            />
          )}

          {block.type === "video" && (
            <p className="text-[0.8125rem] text-ink-3">
              Video blocks are kept as they are. They can be reordered or
              removed here, but are not editable in the portal.
            </p>
          )}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="mr-1 text-[0.8125rem] text-ink-3">Add:</span>
        {Object.keys(NEW_BLOCK).map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => add(kind)}
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-navy-600 hover:text-navy-600"
          >
            {LABELS[kind]}
          </button>
        ))}
      </div>
    </div>
  );
}
