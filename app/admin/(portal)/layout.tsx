import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { SignOutButton } from "@/components/admin/SignOutButton";

/**
 * The gate.
 *
 * `(portal)` is a route group holding everything that requires a session, so
 * /admin/login can sit outside it and still be under /admin. Adding a page
 * inside this folder puts it behind the password automatically, which is the
 * right default — a new admin screen that forgot to check would otherwise be
 * public.
 *
 * This is a real boundary, not an optimistic one. Next's authentication guide
 * is explicit that a check in proxy/middleware is a redirect convenience and
 * not a defence; the API routes each verify for themselves as well, because
 * this layout protects pages and not endpoints.
 */
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Traction" },
  { href: "/admin/insights", label: "Insights" },
];

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[76rem] items-center gap-6 px-6">
          <Link href="/admin" className="flex items-baseline gap-2.5">
            <span className="text-[1rem] font-semibold tracking-[-0.02em]">OrbisMoneta</span>
            <span className="rounded-full bg-navy-50 px-2 py-0.5 font-mono text-[0.75rem] md:text-[0.625rem] tracking-[0.12em] text-navy-600 uppercase">
              Admin
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-[0.875rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/insights"
              target="_blank"
              className="rounded-full px-3.5 py-1.5 text-[0.875rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              View site ↗
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[76rem] px-6 py-10">{children}</div>
    </div>
  );
}
