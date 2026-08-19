"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  insightCategories,
  insightTypes,
  type Insight,
  type InsightCategory,
  type InsightType,
} from "@/content/insights";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/Icon";
import { InsightCard } from "./InsightCard";

const PAGE_SIZE = 6;

/**
 * Where the listing keeps its place while the reader is off in an article.
 *
 * Session storage, not local: the place you were in a list is a property of
 * this visit, not of this browser, and a filter set restored a week later
 * would read as the site having lost the plot rather than kept it.
 */
const RETURN_KEY = "om:insights-return";

type SavedView = {
  category: InsightCategory | "All";
  types: InsightType[];
  query: string;
  visible: number;
  scrollY: number;
};

function saveView(view: SavedView) {
  try {
    sessionStorage.setItem(RETURN_KEY, JSON.stringify(view));
  } catch {
    /* see readView */
  }
}

function readView(): SavedView | null {
  try {
    const raw = sessionStorage.getItem(RETURN_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as SavedView;
    return v && typeof v === "object" ? v : null;
  } catch {
    // Private-mode Safari throws on sessionStorage. Losing the place is a
    // smaller failure than a listing that will not render.
    return null;
  }
}

/**
 * Listing-page filtering. Deliberately shows heading, excerpt and metadata
 * only — the full article lives on its own page. Filtering happens in the
 * client against data passed down from the server component, so swapping the
 * source for a CMS query later changes nothing here.
 */
export function InsightsExplorer({ insights }: { insights: Insight[] }) {
  const [category, setCategory] = useState<InsightCategory | "All">("All");
  const [types, setTypes] = useState<InsightType[]>([]);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const deferredQuery = useDeferredValue(query);

  /*
    Coming back to where you left.

    A reader who has filtered to ISO 20022, loaded another page of results and
    scrolled halfway down opens an article — and every one of those is React
    state that dies the moment this component unmounts. Coming back rebuilt the
    default view at the top of the page, which is the reader doing their
    filtering again.

    So the view is written to session storage as it changes and read back on
    mount. Three effects, in this order, and the order is what makes it work.
  */

  /* 1. Restore. Runs once, before anything below has had a chance to write, so
        it is always reading the record the *previous* visit left. */
  const pendingScroll = useRef<number | null>(null);
  /*
    The one place this component sets state from inside an effect, and the rule
    against it is suspended for exactly these four lines. Restoring from session
    storage cannot be done anywhere else: read during render it would put the
    client's first pass out of step with the server's HTML, which is a
    hydration mismatch rather than a cascading render. It runs once, on mount,
    and never again.
  */
  useEffect(() => {
    const saved = readView();
    if (!saved) {
      // No record: the reader has not been here in this session, and the back
      // link that brought them suppressed its own scroll reset in case there
      // was one. Start at the top like any other first visit.
      window.scrollTo(0, 0);
      return;
    }
    /* eslint-disable react-hooks/set-state-in-effect */
    if (saved.category) setCategory(saved.category);
    if (Array.isArray(saved.types)) setTypes(saved.types);
    if (typeof saved.query === "string") setQuery(saved.query);
    if (typeof saved.visible === "number") {
      setVisible(Math.max(PAGE_SIZE, saved.visible));
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    if (typeof saved.scrollY === "number") pendingScroll.current = saved.scrollY;
  }, []);

  /*
    2. Scroll, once the restored view is tall enough to take it.

    This runs after every render on purpose. The offset cannot be applied in the
    effect above: at that point the list still holds its first six cards, the
    document is shorter than the offset, and the browser would clamp the scroll
    to the bottom of a short page. So it waits for the commit where the restored
    `visible` count has actually painted its rows.
  */
  useEffect(() => {
    const y = pendingScroll.current;
    if (y == null) return;
    if (document.documentElement.scrollHeight < y + window.innerHeight) return;
    pendingScroll.current = null;
    window.scrollTo(0, y);
  });

  /* 3. Save. Skips its first run, which is the one carrying nothing but the
        defaults — without that guard it would overwrite the record between
        effect 1 reading it and the restored state landing. */
  const firstSave = useRef(true);
  useEffect(() => {
    if (firstSave.current) {
      firstSave.current = false;
      return;
    }
    saveView({ category, types, query, visible, scrollY: window.scrollY });
  }, [category, types, query, visible]);

  /*
    4. The offset, which moves far more often than the filters do, so it is
    written from a frame-throttled scroll listener rather than through the
    effect above. Re-subscribed when the view changes, which is what keeps the
    payload current without a ref read during render.
  */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        saveView({ category, types, query, visible, scrollY: window.scrollY });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [category, types, query, visible]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return insights.filter((insight) => {
      if (category !== "All" && insight.category !== category) return false;
      if (types.length > 0 && !types.includes(insight.type)) return false;
      if (!q) return true;
      return (
        insight.title.toLowerCase().includes(q) ||
        insight.excerpt.toLowerCase().includes(q) ||
        insight.topic.toLowerCase().includes(q) ||
        insight.category.toLowerCase().includes(q)
      );
    });
  }, [insights, category, types, deferredQuery]);

  const shown = results.slice(0, visible);
  const activeFilters = (category !== "All" ? 1 : 0) + types.length + (query ? 1 : 0);

  const reset = () => {
    setCategory("All");
    setTypes([]);
    setQuery("");
    setVisible(PAGE_SIZE);
  };

  const toggleType = (type: InsightType) => {
    setVisible(PAGE_SIZE);
    setTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Filter bar */}
      <div className="flex flex-col gap-5 border-b border-line pb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-3"
              strokeWidth={2}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search insights"
              aria-label="Search insights"
              className="h-12 w-full rounded-full border border-line-strong bg-white pr-4 pl-11 text-[0.9375rem] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-3">
              <Icon name="filter" className="h-3.5 w-3.5" strokeWidth={2} />
              Type
            </span>
            {insightTypes.map((type) => {
              const on = types.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleType(type)}
                  className={cn(
                    "cursor-pointer rounded-full px-3.5 py-1.5 text-[0.75rem] font-medium transition-colors",
                    on
                      ? "bg-navy-600 text-white"
                      : "bg-white text-ink-2 ring-1 ring-line hover:ring-navy-600",
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {insightCategories.map((item) => {
            const on = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setCategory(item);
                  setVisible(PAGE_SIZE);
                }}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-colors",
                  on
                    ? "bg-ink text-white"
                    : "bg-surface text-ink-2 ring-1 ring-line hover:bg-white hover:ring-line-strong",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result meta */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.8125rem] text-ink-2" role="status" aria-live="polite">
          <span className="tabular font-medium text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "insight" : "insights"}
          {activeFilters > 0 && " matching your filters"}
        </p>
        {activeFilters > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex cursor-pointer items-center gap-1.5 text-[0.8125rem] font-medium text-navy-600 hover:text-navy-800"
          >
            <Icon name="close" className="h-3.5 w-3.5" strokeWidth={2} />
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {shown.length > 0 ? (
        <>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((insight) => (
              <li key={insight.slug} className="h-full">
                <InsightCard insight={insight} />
              </li>
            ))}
          </ul>

          {visible < results.length && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full px-7 text-sm font-medium text-navy-600 ring-1 ring-inset ring-line-strong transition-colors hover:bg-navy-50 hover:ring-navy-600"
              >
                Load more insights
                <span className="tabular text-ink-3">
                  ({results.length - visible} remaining)
                </span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface/60 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-3 ring-1 ring-line">
            <Icon name="search" className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[1.0625rem]">No insights match those filters.</h3>
            <p className="max-w-sm text-[0.875rem] text-ink-2">
              Try a broader category, or clear the filters to see everything we have published.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-1 cursor-pointer text-sm font-medium text-navy-600 underline underline-offset-4"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
