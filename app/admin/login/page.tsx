import { redirect } from "next/navigation";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/LoginForm";

/**
 * Reading the session cookie makes this route dynamic, which is what we want:
 * a cached login page would be served to somebody who is already signed in.
 */
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-[26rem]">
        <div className="mb-8 flex flex-col gap-2">
          <p className="font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.16em] text-navy-600 uppercase">
            OrbisMoneta
          </p>
          <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">
            Content &amp; traction
          </h1>
          <p className="text-[0.9375rem] text-ink-2">
            Sign in to publish insights and see how the site is performing.
          </p>
        </div>

        {isAdminConfigured() ? (
          <LoginForm />
        ) : (
          /*
            No password is set on this deployment, so there is nothing to sign
            in against. Saying so plainly beats a login box that rejects every
            attempt — that reads as a forgotten password and sends somebody
            hunting for the wrong problem.
          */
          <div className="rounded-[var(--radius-tile)] border border-caution/30 bg-caution/5 p-5">
            <p className="text-[0.9375rem] font-medium text-ink">Not configured yet</p>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
              This deployment has no <code className="font-mono text-[0.8125rem]">ADMIN_PASSWORD</code>{" "}
              set, so the portal is closed. Add it in the hosting environment
              and redeploy — see{" "}
              <code className="font-mono text-[0.8125rem]">docs/admin-portal.md</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
