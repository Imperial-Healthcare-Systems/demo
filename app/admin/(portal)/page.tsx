import { getTraction } from "@/lib/analytics";
import { isSupabaseConfigured } from "@/lib/supabase";
import { SetupNotice } from "@/components/admin/SetupNotice";

export const dynamic = "force-dynamic";

/** A number a person reads at a glance. 1,240 rather than 1240. */
function fmt(n: number): string {
  return n.toLocaleString("en-GB");
}

function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="rounded-[var(--radius-tile)] border border-line bg-white p-5">
      <p className="font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">{label}</p>
      <p className="mt-2 text-[2rem] leading-none font-semibold tracking-[-0.03em] tabular">
        {fmt(value)}
      </p>
      {note && <p className="mt-1.5 text-[0.75rem] text-ink-3">{note}</p>}
    </div>
  );
}

/**
 * Thirty days of traffic as bars.
 *
 * Pure CSS, no charting library. A bar chart is a row of divs with heights,
 * and the smallest chart package would be more JavaScript than the entire
 * admin portal — on a screen that one person looks at.
 */
function Bars({ daily }: { daily: { day: string; views: number; visitors: number }[] }) {
  const peak = Math.max(1, ...daily.map((d) => d.views));

  return (
    <div className="rounded-[var(--radius-tile)] border border-line bg-white p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
          Page views — last 30 days
        </p>
        <p className="text-[0.75rem] text-ink-3">
          peak <span className="tabular">{fmt(peak)}</span>
        </p>
      </div>

      <div className="mt-5 flex h-32 items-end gap-[3px]">
        {daily.map((d) => {
          const height = (d.views / peak) * 100;
          return (
            <div
              key={d.day}
              /*
                The bar carries its own numbers in a title, so hovering answers
                "which day was that?" without a tooltip library and without
                turning a static page into an interactive one.
              */
              title={`${new Date(d.day).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })} — ${d.views} views, ${d.visitors} visitors`}
              className="group relative flex-1 rounded-t-[2px] bg-navy-100 transition-colors hover:bg-navy-600"
              // A day with no traffic still gets a 2px stub. A zero-height bar
              // is indistinguishable from a day that is not in the chart, and
              // "quiet Sunday" and "tracking broken" should not look the same.
              style={{ height: `${Math.max(height, d.views > 0 ? 4 : 2)}%` }}
            >
              <span className="sr-only">
                {d.day}: {d.views} views
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-[0.75rem] md:text-[0.6875rem] text-ink-3">
        <span>{daily[0]?.day ?? ""}</span>
        <span>{daily.at(-1)?.day ?? ""}</span>
      </div>
    </div>
  );
}

function Table({
  title,
  rows,
  firstColumn,
  empty,
}: {
  title: string;
  firstColumn: string;
  rows: { key: string; count: number; people: number }[];
  empty: string;
}) {
  return (
    <div className="rounded-[var(--radius-tile)] border border-line bg-white">
      <p className="border-b border-line px-5 py-4 font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
        {title}
      </p>
      {rows.length === 0 ? (
        <p className="px-5 py-6 text-[0.875rem] text-ink-3">{empty}</p>
      ) : (
        <table className="w-full text-[0.875rem]">
          <thead>
            <tr className="text-[0.75rem] md:text-[0.6875rem] tracking-[0.08em] text-ink-3 uppercase">
              <th className="px-5 py-2 text-left font-medium">{firstColumn}</th>
              <th className="px-3 py-2 text-right font-medium">Total</th>
              <th className="px-5 py-2 text-right font-medium">People</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-line">
                <td className="max-w-0 truncate px-5 py-3 text-ink" title={row.key}>
                  {row.key}
                </td>
                <td className="px-3 py-3 text-right tabular text-ink-2">{fmt(row.count)}</td>
                <td className="px-5 py-3 text-right tabular text-ink-2">{fmt(row.people)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default async function TractionPage() {
  const configured = isSupabaseConfigured();
  const traction = await getTraction(30);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Traction</h1>
        <p className="text-[0.9375rem] text-ink-2">
          What the site is actually doing. Counted without cookies — see the note
          at the foot.
        </p>
      </div>

      {!configured && <SetupNotice />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Visitors today" value={traction.visitors.today} />
        <Stat label="Visitors — 7 days" value={traction.visitors.week} />
        <Stat label="Visitors — 30 days" value={traction.visitors.month} />
        <Stat
          label="Page views — 30 days"
          value={traction.views.month}
          note={`${fmt(traction.views.total)} all time`}
        />
      </div>

      <Bars daily={traction.daily} />

      <Table
        title="Button clicks — last 30 days"
        firstColumn="Button"
        rows={traction.clicks.map((c) => ({ key: c.label, count: c.count, people: c.people }))}
        empty="No tracked button has been clicked yet. The Digital Currency Hub and Lending Integration buttons on /solutions/platforms report here."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Table
          title="Most visited pages — last 30 days"
          firstColumn="Page"
          rows={traction.topPages.map((p) => ({ key: p.path, count: p.count, people: p.people }))}
          empty="No page views recorded yet."
        />
        <Table
          title="Most read articles — last 30 days"
          firstColumn="Article"
          rows={traction.topArticles.map((a) => ({
            key: a.path.replace("/insights/", ""),
            count: a.count,
            people: a.people,
          }))}
          empty="No article has been opened yet."
        />
      </div>

      {/*
        Said plainly, because a number nobody understands gets misquoted. The
        distinction between "visitors" and "page views" is the one people get
        wrong in meetings, and the daily-rotation caveat is the one that makes
        the 30-day visitor figure larger than the number of individual humans.
      */}
      <div className="rounded-[var(--radius-tile)] border border-line bg-white p-5 text-[0.8125rem] leading-relaxed text-ink-2">
        <p className="mb-2 font-medium text-ink">How these are counted</p>
        <p>
          <strong className="font-medium text-ink">Page views</strong> counts every page
          opened. <strong className="font-medium text-ink">Visitors</strong> counts
          individual people per day, worked out from a one-way hash of the
          network address and browser that is re-salted every midnight. Nothing
          is stored that can identify anybody and no cookie is set, which is why
          the site needs no tracking consent banner.
        </p>
        <p className="mt-2">
          The trade-off is worth knowing: because the hash changes daily, one
          person visiting on three days counts as three in a 30-day figure.
          Today&rsquo;s number is exact. Obvious crawlers are excluded, and views of
          this portal are not counted at all.
        </p>
      </div>
    </div>
  );
}
