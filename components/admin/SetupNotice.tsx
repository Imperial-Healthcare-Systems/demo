/**
 * Shown on every portal screen while no database is connected.
 *
 * The portal is genuinely usable in this state — it signs in, it renders, the
 * public site serves the articles from the repository — and that is exactly
 * why the notice has to be loud. Silence would read as "working, but nobody
 * has visited yet" and the client would wait for numbers that are never coming.
 */
export function SetupNotice() {
  return (
    <div className="rounded-[var(--radius-tile)] border border-caution/40 bg-caution/[0.06] p-5">
      <p className="text-[0.9375rem] font-medium text-ink">No database connected yet</p>
      <p className="mt-1.5 max-w-2xl text-[0.875rem] leading-relaxed text-ink-2">
        Posts cannot be saved and nothing is being counted. The public site is
        unaffected — it is serving the eight articles checked into the
        repository. To switch it on, create a Supabase project, run{" "}
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.8125rem]">
          supabase/schema.sql
        </code>{" "}
        in its SQL editor, and set{" "}
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.8125rem]">
          NEXT_PUBLIC_SUPABASE_URL
        </code>{" "}
        and{" "}
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.8125rem]">
          SUPABASE_SERVICE_ROLE_KEY
        </code>
        . Full steps are in{" "}
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.8125rem]">
          docs/admin-portal.md
        </code>
        .
      </p>
    </div>
  );
}
