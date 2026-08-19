"use client";

import { useRef, useState } from "react";

/**
 * Pick an image, upload it, describe it.
 *
 * The alt text field is not optional decoration and is not hidden behind a
 * disclosure. An article picture with no description is invisible to a screen
 * reader and to anyone whose connection dropped the file, and the moment to
 * write one is while you are looking at the picture — not in an audit later.
 */
export function ImageField({
  value,
  alt,
  caption,
  onChange,
  onAltChange,
  onCaptionChange,
}: {
  value: string;
  alt: string;
  caption?: string;
  onChange: (src: string) => void;
  onAltChange: (alt: string) => void;
  onCaptionChange?: (caption: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? "The upload failed.");
        setBusy(false);
        return;
      }
      onChange(data.url);
    } catch {
      setError("Could not reach the server.");
    }
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-3">
      {value ? (
        <div className="flex flex-wrap items-start gap-4">
          {/*
            A plain <img>, not next/image, and deliberately so. This is an
            admin preview of a file that was uploaded seconds ago to a bucket
            whose hostname next/image only learns about through config — and a
            preview that 400s because of an optimiser rule would look exactly
            like a failed upload.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-28 w-auto max-w-[16rem] rounded-[0.5rem] border border-line object-cover"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-navy-600 hover:text-navy-600"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full px-3.5 py-1.5 text-[0.8125rem] text-ink-3 transition-colors hover:text-critical"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => input.current?.click()}
          className="rounded-[0.5rem] border border-dashed border-line-strong px-4 py-8 text-[0.875rem] text-ink-2 transition-colors hover:border-navy-600 hover:text-navy-600 disabled:opacity-50"
        >
          {busy ? "Uploading…" : "Choose an image — PNG, JPEG or WebP, up to 8MB"}
        </button>
      )}

      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          // Clear it, or choosing the same file twice in a row fires nothing.
          e.target.value = "";
        }}
      />

      {error && (
        <p role="alert" className="text-[0.8125rem] text-critical">
          {error}
        </p>
      )}

      {value && (
        <>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8125rem] font-medium text-ink">
              Describe the image
              <span className="ml-1.5 font-normal text-ink-3">
                — read aloud to people who cannot see it
              </span>
            </span>
            <input
              className="h-11 w-full rounded-[0.5rem] border border-line bg-white px-3.5 text-[0.9375rem] outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15"
              value={alt}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="e.g. Two coins side by side, labelled CBDC and Stablecoin"
            />
          </label>

          {onCaptionChange && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.8125rem] font-medium text-ink">Caption (optional)</span>
              <input
                className="h-11 w-full rounded-[0.5rem] border border-line bg-white px-3.5 text-[0.9375rem] outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15"
                value={caption ?? ""}
                onChange={(e) => onCaptionChange(e.target.value)}
              />
            </label>
          )}
        </>
      )}
    </div>
  );
}
