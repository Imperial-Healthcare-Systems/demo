/**
 * Events — conferences, webinars, roundtables and speaking slots.
 *
 * The list is deliberately empty. The client asked for the page to exist and
 * to say plainly that nothing is listed yet rather than to be filled with
 * placeholder events — an invented conference is exactly the kind of claim
 * this site does not make.
 *
 * To add one, append an object to `events`. Nothing else needs changing: the
 * page sorts by date and files each entry under Upcoming or Past by comparing
 * it to the moment the page renders, so an event moves across on its own the
 * day after it happens.
 *
 * If the client would rather manage these from /admin alongside the articles,
 * this file is the shape to lift into the database — same fields, same split.
 */

export type EventKind =
  | "Conference"
  | "Webinar"
  | "Roundtable"
  | "Speaking"
  | "Workshop"
  | "Panel";

export type EventItem = {
  /** Used as a React key and as an anchor. Lowercase, hyphenated. */
  slug: string;
  title: string;
  kind: EventKind;
  /** ISO 8601. The whole Upcoming/Past split turns on this being a real date. */
  date: string;
  /** For anything running more than a day. Omit for single-day events. */
  endDate?: string;
  /** "Mumbai, India" · "Online" · "Singapore Fintech Festival". */
  location: string;
  /** One or two sentences on what it is and who it is for. */
  summary: string;
  /** Who is representing OrbisMoneta, if it is worth naming. */
  speakers?: string[];
  /** Registration beforehand, a recording or write-up afterwards. */
  link?: { label: string; href: string };
};

export const events: EventItem[] = [];

/**
 * Split the list into what is still to come and what has been.
 *
 * `now` is passed in rather than read here so the page decides when "now" is —
 * which keeps this a pure function and keeps the server and the client from
 * disagreeing about the boundary mid-render.
 *
 * An event with an `endDate` counts as upcoming until that date passes, so a
 * three-day conference does not drop into the past on its opening morning.
 */
export function splitEvents(list: EventItem[], now: Date) {
  const cutoff = now.getTime();
  const ends = (e: EventItem) => Date.parse(e.endDate ?? e.date);

  const upcoming = list
    .filter((e) => ends(e) >= cutoff)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  const past = list
    .filter((e) => ends(e) < cutoff)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return { upcoming, past };
}

export const eventsPage = {
  eyebrow: "Events",
  headline: "Where to meet",
  headlineAccent: "OrbisMoneta",
  intro:
    "Conferences, webinars and industry roundtables where our team is speaking or exhibiting — and a record of where we have been.",
  upcomingTitle: "Upcoming",
  pastTitle: "Past events",
  /*
    The empty states. Both say the same thing in different words on purpose:
    "nothing scheduled" is a fact about the diary, while "nothing here yet" on
    the past list is a fact about the record. Neither promises a date.
  */
  upcomingEmpty: "No events are scheduled at the moment.",
  upcomingEmptyHint:
    "New conferences, webinars and roundtables will be listed here as they are confirmed.",
  pastEmpty: "No past events recorded yet.",
  contactLead: "Speaking to your institution",
  contactBody:
    "If you would like OrbisMoneta to speak at your event or run a private roundtable for your team, get in touch.",
} as const;
