"use client";

import { useDeferredValue, useMemo, useState } from "react";
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
        <div className="flex flex-col items-center gap-4 rounded-[--radius-card] border border-dashed border-line-strong bg-surface/60 px-6 py-16 text-center">
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
