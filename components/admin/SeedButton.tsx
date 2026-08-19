"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SeedButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="rounded-[var(--radius-tile)] border border-line bg-white p-5">
      <p className="text-[0.9375rem] font-medium text-ink">Import the existing eight articles</p>
      <p className="mt-1.5 max-w-2xl text-[0.875rem] leading-relaxed text-ink-2">
        The articles currently on the site are stored in the code. Import them
        once and they become editable here — same headlines, same text, same
        images, same publication dates. The site carries on serving them
        throughout; nothing goes dark.
      </p>

      {error && (
        <p role="alert" className="mt-3 text-[0.875rem] text-critical">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          const response = await fetch("/api/admin/seed", { method: "POST" });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            setError(data.error ?? "The import failed.");
            setBusy(false);
            return;
          }
          router.refresh();
        }}
        className="mt-4 h-11 rounded-[0.625rem] border border-navy-600 px-5 text-[0.9375rem] font-medium text-navy-600 transition-colors hover:bg-navy-600 hover:text-white disabled:opacity-50"
      >
        {busy ? "Importing…" : "Import articles"}
      </button>
    </div>
  );
}
