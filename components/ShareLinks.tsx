"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard unavailable — the explicit share links below still work. */
    }
  };

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-3">
        Share
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 ring-1 ring-line transition-colors hover:bg-navy-50 hover:text-navy-600 hover:ring-navy-600"
      >
        <Icon name="linkedin" className="h-4 w-4" />
      </a>
      <a
        href={`https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 ring-1 ring-line transition-colors hover:bg-navy-50 hover:text-navy-600 hover:ring-navy-600"
      >
        <Icon name="x" className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.75rem] font-medium text-ink-2 ring-1 ring-line transition-colors hover:bg-navy-50 hover:text-navy-600 hover:ring-navy-600"
      >
        <Icon name={copied ? "check" : "share"} className="h-4 w-4" strokeWidth={2} />
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
