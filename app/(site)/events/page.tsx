import type { Metadata } from "next";
import { events, eventsPage, splitEvents, type EventItem } from "@/content/events";
import { PageHero } from "@/components/PageHero";
import { Eyebrow } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Conferences, webinars and industry roundtables where the OrbisMoneta team is speaking or exhibiting, and a record of past appearances.",
  alternates: { canonical: "/events" },
};

/**
 * Recomputed hourly.
 *
 * The page decides what is upcoming by comparing dates to now, so a build from
 * three weeks ago would still be showing a finished event as forthcoming. An
 * hour is well inside the resolution anyone cares about for a diary and costs
 * one render.
 */
export const revalidate = 3600;

function when(event: EventItem): string {
  const start = new Date(event.date);
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  if (!event.endDate) return start.toLocaleDateString("en-GB", opts);

  const end = new Date(event.endDate);
  // "12–14 November 2026" rather than repeating the month and year twice.
  const sameMonth =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${start.getDate()}–${end.toLocaleDateString("en-GB", opts)}`;
  }
  return `${start.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} – ${end.toLocaleDateString("en-GB", opts)}`;
}

function EventCard({ event, past }: { event: EventItem; past: boolean }) {
  return (
    <article
      id={event.slug}
      className="group/event flex flex-col gap-4 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-card)] md:flex-row md:items-start md:gap-8 md:p-8"
    >
      {/*
        The date as a block, not a line of text. On a page whose whole job is
        "when and where", the date is the thing the eye should land on first,
        and a stacked day/month reads at a glance in a way "14 November 2026"
        set in a paragraph does not.
      */}
      <div
        className={
          past
            ? "flex shrink-0 flex-col items-center justify-center rounded-[var(--radius-tile)] bg-surface px-5 py-4 text-ink-3 md:w-24"
            : "flex shrink-0 flex-col items-center justify-center rounded-[var(--radius-tile)] bg-navy-600 px-5 py-4 text-white md:w-24"
        }
      >
        <span className="text-[1.75rem] leading-none font-semibold tracking-[-0.03em] tabular">
          {new Date(event.date).getDate()}
        </span>
        <span className="mt-1 font-mono text-[0.75rem] tracking-[0.14em] uppercase md:text-[0.6875rem]">
          {new Date(event.date).toLocaleDateString("en-GB", { month: "short" })}
        </span>
        <span className="mt-0.5 font-mono text-[0.75rem] tabular opacity-70 md:text-[0.6875rem]">
          {new Date(event.date).getFullYear()}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-navy-50 px-2.5 py-1 font-mono text-[0.75rem] tracking-[0.12em] text-navy-600 uppercase md:text-[0.625rem]">
            {event.kind}
          </span>
          <span className="flex items-center gap-1.5 text-[0.8125rem] text-ink-3">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {event.location}
          </span>
        </div>

        <h3 className="text-[1.25rem] leading-snug">{event.title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-ink-2">{event.summary}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-ink-3">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {when(event)}
          </span>
          {event.speakers && event.speakers.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Icon name="user" className="h-3.5 w-3.5" />
              {event.speakers.join(", ")}
            </span>
          )}
        </div>

        {event.link && (
          <a
            href={event.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex min-h-11 w-fit items-center gap-1.5 text-[0.875rem] font-medium text-navy-600 transition-colors hover:text-navy-800 md:min-h-0"
          >
            {event.link.label}
            <Icon name="arrowUpRight" className="h-4 w-4" strokeWidth={2} />
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * What the page says when there is nothing to say.
 *
 * A dashed panel with a plain sentence, rather than a blank gap that reads as
 * a page half-built or a list that failed to load. The client asked for this
 * explicitly: until events are listed, the page should say none are.
 */
function Empty({ line, hint }: { line: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface/60 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-3 ring-1 ring-line">
        <Icon name="calendar" className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <p className="text-[1rem] font-medium text-ink">{line}</p>
      {hint && <p className="max-w-md text-[0.875rem] leading-relaxed text-ink-3">{hint}</p>}
    </div>
  );
}

export default function EventsPage() {
  const { upcoming, past } = splitEvents(events, new Date());

  return (
    <>
      <PageHero
        eyebrow={eventsPage.eyebrow}
        title={`${eventsPage.headline} ${eventsPage.headlineAccent}`}
        accent={eventsPage.headlineAccent}
        intro={eventsPage.intro}
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell flex flex-col gap-14">
          <div className="flex flex-col gap-6">
            <Eyebrow>{eventsPage.upcomingTitle}</Eyebrow>
            {upcoming.length === 0 ? (
              <Empty line={eventsPage.upcomingEmpty} hint={eventsPage.upcomingEmptyHint} />
            ) : (
              <div className="flex flex-col gap-4">
                {upcoming.map((event, i) => (
                  <Reveal key={event.slug} delay={i * 70}>
                    <EventCard event={event} past={false} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/*
            The past list is only drawn once there is a past. An empty
            "Past events" heading over an empty panel says nothing twice.
          */}
          {past.length > 0 && (
            <div className="flex flex-col gap-6">
              <Eyebrow>{eventsPage.pastTitle}</Eyebrow>
              <div className="flex flex-col gap-4">
                {past.map((event, i) => (
                  <Reveal key={event.slug} delay={i * 70}>
                    <EventCard event={event} past />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col items-start gap-4 rounded-[var(--radius-card)] bg-surface p-8 ring-1 ring-line md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[1.25rem]">{eventsPage.contactLead}</h2>
              <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                {eventsPage.contactBody}
              </p>
            </div>
            <ButtonLink href="/contact" size="sm" className="shrink-0">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
