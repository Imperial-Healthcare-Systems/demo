"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Insight } from "@/content/insights";
import type { EditorDraft } from "@/lib/insight-draft";
import { slugify } from "@/lib/utils";
import { BlockList } from "@/components/admin/BlockList";
import { ImageField } from "@/components/admin/ImageField";

/**
 * The post editor.
 *
 * Everything the client asked to control lives on this one screen: the
 * picture, the headline, the category (including inventing a new one), the
 * body, and links inside the body. It is one long form rather than a wizard
 * because writing an article is not a sequence of steps — people jump back to
 * the headline halfway through the third paragraph.
 *
 * The body is edited as blocks, not as a rich text box. That is a deliberate
 * choice: the article renderer takes a typed block array, so blocks in the
 * editor are the same blocks that come out the other end, with nothing to
 * parse and nothing to lose in translation. It also means nothing the client
 * types can inject markup into the published page — a heading is a heading
 * because its type says so, not because of characters in a string.
 */

const INPUT =
  "h-11 w-full rounded-[0.5rem] border border-line bg-white px-3.5 text-[0.9375rem] outline-none transition-colors focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15";
const AREA =
  "w-full rounded-[0.5rem] border border-line bg-white px-3.5 py-3 text-[0.9375rem] leading-relaxed outline-none transition-colors focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15";

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="flex flex-col gap-0.5">
      <span className="text-[0.8125rem] font-medium text-ink">{children}</span>
      {hint && <span className="text-[0.75rem] leading-snug text-ink-3">{hint}</span>}
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-tile)] border border-line bg-white p-6">
      <h2 className="mb-5 font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function InsightEditor({
  initial,
  categories,
  isNew,
}: {
  initial: EditorDraft;
  categories: string[];
  isNew: boolean;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<EditorDraft>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof EditorDraft>(key: K, value: EditorDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  /*
    The slug follows the headline until somebody takes it over.

    On a new post that is what people expect — type a headline, get a sensible
    web address, never think about it. On a post that already exists the slug
    is frozen: it is the URL people have shared and search engines have
    indexed, and quietly changing it because a typo was fixed in the headline
    would break every one of those links.
  */
  const slugTouched = useRef(!isNew);
  useEffect(() => {
    if (slugTouched.current) return;
    setDraft((d) => ({ ...d, slug: slugify(d.title) }));
  }, [draft.title]);

  // Leaving with unsaved work should take a deliberate second click. This is
  // the only guard against closing a tab on an hour of writing.
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function save(status: "draft" | "published") {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, status, isNew }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? "The save failed.");
        setSaving(false);
        return;
      }
      setDraft((d) => ({ ...d, status }));
      setSaved(true);
      setSaving(false);
      if (isNew) {
        // Move off /new so a second save is an edit rather than a second
        // attempt to create the same post.
        router.replace(`/admin/insights/${data.slug}`);
      }
      router.refresh();
    } catch {
      setError("Could not reach the server.");
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 pb-28">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">
          {isNew ? "New post" : "Edit post"}
        </h1>
        {draft.slug && (
          <p className="font-mono text-[0.8125rem] text-ink-3">/insights/{draft.slug}</p>
        )}
      </div>

      <Card title="The post">
        <label className="flex flex-col gap-2">
          <Label hint="This is the card headline and the page title.">Headline</Label>
          <input
            className={INPUT}
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="What the piece is called"
          />
        </label>

        <label className="flex flex-col gap-2">
          <Label hint="The web address. Changing it on a live post breaks links people have already shared.">
            Web address
          </Label>
          <input
            className={`${INPUT} font-mono text-[0.875rem]`}
            value={draft.slug}
            onChange={(e) => {
              slugTouched.current = true;
              set("slug", e.target.value);
            }}
            placeholder="how-it-will-appear-in-the-url"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <Label hint="Pick one that exists or type a new one — it appears in the filter row as soon as the post is live.">
              Category
            </Label>
            <input
              className={INPUT}
              list="om-categories"
              value={draft.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="e.g. Stablecoins"
            />
            {/*
              A datalist, not a select. A select could only offer what exists,
              and the client specifically asked to be able to create categories.
              This suggests the existing ones and still accepts anything typed.
            */}
            <datalist id="om-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>

          <label className="flex flex-col gap-2">
            <Label hint="Shown as a small label on the card.">Format</Label>
            <select
              className={INPUT}
              value={draft.type}
              onChange={(e) => set("type", e.target.value as Insight["type"])}
            >
              <option>Analysis</option>
              <option>Research</option>
              <option>Field Note</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <Label hint="One or two sentences. Shown under the headline on the card and at the top of the article.">
            Standfirst
          </Label>
          <textarea
            className={AREA}
            rows={3}
            value={draft.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="flex flex-col gap-2">
            <Label>Author</Label>
            <input
              className={INPUT}
              value={draft.author}
              onChange={(e) => set("author", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            <Label>Author&rsquo;s role</Label>
            <input
              className={INPUT}
              value={draft.authorRole}
              onChange={(e) => set("authorRole", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            <Label hint="A short tag, e.g. “Settlement”.">Topic</Label>
            <input
              className={INPUT}
              value={draft.topic}
              onChange={(e) => set("topic", e.target.value)}
            />
          </label>
        </div>
      </Card>

      <Card title="Lead image">
        <ImageField
          value={draft.coverSrc}
          alt={draft.coverAlt}
          onChange={(src) => set("coverSrc", src)}
          onAltChange={(alt) => set("coverAlt", alt)}
        />
        {!draft.coverSrc && (
          <label className="flex flex-col gap-2">
            <Label hint="Used to colour the card when there is no image.">Fallback colour</Label>
            <select
              className={INPUT}
              value={draft.coverTone}
              onChange={(e) => set("coverTone", e.target.value as Insight["coverTone"])}
            >
              <option value="navy">Navy</option>
              <option value="sky">Sky</option>
              <option value="green">Green</option>
              <option value="gold">Gold</option>
            </select>
          </label>
        )}
      </Card>

      <Card title="The article">
        <BlockList blocks={draft.body} onChange={(body) => set("body", body)} />
      </Card>

      <Card title="Further reading link">
        <p className="-mt-2 text-[0.8125rem] leading-relaxed text-ink-3">
          Optional. Adds one button at the foot of the article pointing at a
          service or product page.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <Label>Button text</Label>
            <input
              className={INPUT}
              value={draft.relatedServiceLabel}
              onChange={(e) => set("relatedServiceLabel", e.target.value)}
              placeholder="Explore Digital Currency Hub"
            />
          </label>
          <label className="flex flex-col gap-2">
            <Label hint="A path on this site, or a full https:// address.">Where it goes</Label>
            <input
              className={`${INPUT} font-mono text-[0.875rem]`}
              value={draft.relatedServiceHref}
              onChange={(e) => set("relatedServiceHref", e.target.value)}
              placeholder="/products/digital-currency-hub"
            />
          </label>
        </div>
      </Card>

      <Card title="Publication date">
        <label className="flex max-w-sm flex-col gap-2">
          <Label hint='This is what the "3 hours ago" on the card counts from. Leave it alone to stamp it when you publish.'>
            Published
          </Label>
          <input
            type="datetime-local"
            className={INPUT}
            /*
              `datetime-local` speaks local wall-clock time with no zone, and
              the database stores an instant. Slicing to 16 characters converts
              one to the other, and `new Date(...)` on the way back reads it in
              the editor's own timezone — which is the one they are thinking in.
            */
            value={draft.publishedAt ? toLocalInput(draft.publishedAt) : ""}
            onChange={(e) =>
              set("publishedAt", e.target.value ? new Date(e.target.value).toISOString() : null)
            }
          />
        </label>
      </Card>

      {/*
        The save bar is fixed to the bottom of the window.

        This form is long enough to scroll several screens, and a Save button
        at the end of it is a button people have to go looking for. Pinned, the
        action is always where the hand already is.
      */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[76rem] flex-wrap items-center gap-3 px-6 py-4">
          <span className="text-[0.8125rem] text-ink-2">
            {saving
              ? "Saving…"
              : error
                ? ""
                : saved
                  ? draft.status === "published"
                    ? "Published — it is live now."
                    : "Saved as a draft."
                  : dirty
                    ? "Unsaved changes"
                    : "No changes"}
          </span>

          {error && (
            <span role="alert" className="text-[0.8125rem] font-medium text-critical">
              {error}
            </span>
          )}

          <div className="ml-auto flex items-center gap-3">
            {draft.status === "published" && draft.slug && !dirty && (
              <a
                href={`/insights/${draft.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-[0.875rem] text-ink-2 hover:text-navy-600"
              >
                View ↗
              </a>
            )}
            <button
              type="button"
              disabled={saving || !draft.title}
              onClick={() => save("draft")}
              className="h-11 rounded-[0.625rem] border border-line px-5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-line-strong disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              type="button"
              disabled={saving || !draft.title || !draft.category}
              onClick={() => save("published")}
              className="h-11 rounded-[0.625rem] bg-navy-600 px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-700 disabled:opacity-50"
            >
              {draft.status === "published" ? "Update live post" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ISO instant → the `YYYY-MM-DDTHH:mm` a datetime-local input expects, in local time. */
function toLocalInput(iso: string): string {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}
