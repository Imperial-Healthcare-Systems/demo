/**
 * Client-side tracking. One function, called from the browser.
 *
 * Everything about this is deliberately unimportant: it never throws, never
 * blocks, never awaits, and if it fails nothing tells the reader. A marketing
 * site that broke because a counter could not be written would be a worse site
 * than one with a slightly low number.
 */
export function track(
  name: "pageview" | "cta_click" | (string & {}),
  options: { path?: string; label?: string; referrer?: string } = {},
): void {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    name,
    path: options.path ?? window.location.pathname,
    label: options.label,
    referrer: options.referrer,
  });

  try {
    /*
      `keepalive` is the important flag.

      A click on the Digital Currency Hub button navigates away, and a normal
      fetch is cancelled when the page unloads — so the one event the client
      most wants counted is exactly the one that would go missing. `keepalive`
      hands the request to the browser to finish after the document is gone.
    */
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* an ad blocker, an offline tab, a locked-down browser — all fine */
  }
}
