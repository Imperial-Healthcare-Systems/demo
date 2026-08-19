import type { Metadata } from "next";

/**
 * The admin portal's outermost layer.
 *
 * It sits directly under the root layout, so it gets the fonts and the
 * stylesheet and none of the marketing chrome — no header, no footer, no
 * engagement slider. That separation is the reason app/(site) exists.
 *
 * `noindex, nofollow` is set here rather than page by page so it covers
 * everything under /admin including anything added later. It is not a security
 * control — the password is — but an indexed login form is an advertisement,
 * and a stray admin URL in Google's cache outlives the mistake that put it
 * there by months.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-surface text-ink">{children}</main>;
}
