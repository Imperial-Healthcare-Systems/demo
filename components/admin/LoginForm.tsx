"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Sign in failed.");
        setBusy(false);
        return;
      }
      /*
        `refresh` before `push`.

        The session lives in an HttpOnly cookie, so the server knows the sign-in
        happened but the client's cached copy of the route tree does not. Push
        alone can render /admin from that stale cache, where the auth gate had
        already decided the visitor was a stranger, and bounce straight back
        here — a login that appears to fail after succeeding.
      */
      router.refresh();
      router.push("/admin");
    } catch {
      setError("Could not reach the server.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[0.8125rem] font-medium text-ink-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-[0.625rem] border border-line bg-white px-4 text-[0.9375rem] outline-none transition-colors focus:border-navy-600 focus:ring-2 focus:ring-navy-600/20"
        />
      </div>

      {error && (
        /*
          `role="alert"` so a screen reader is told the attempt failed. Without
          it the message appears silently and the only feedback is that nothing
          happened.
        */
        <p role="alert" className="text-[0.875rem] text-critical">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || !password}
        className="h-12 rounded-[0.625rem] bg-navy-600 px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
