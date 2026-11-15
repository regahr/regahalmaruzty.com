"use client";

import { useEffect, type AnchorHTMLAttributes, type ReactNode } from "react";
import { pageview, track } from "@vercel/analytics";

// Counting the funnel the council asked for (visit → case page → email/CV).
// A mailto or a download loads no page, so Vercel would never see the click.
// Each click logs a virtual page view such as /go/email/home-hire, which
// shows in the Pages list on every Vercel plan, plus a custom event for plans
// that support them. Neither delays the link.
type Kind = "email" | "cv";

function record(kind: Kind, from: string) {
  try {
    pageview({ route: `/go/${kind}/[from]`, path: `/go/${kind}/${from}` });
    track(`${kind}_click`, { from });
  } catch {
    // analytics must never block the link
  }
}

export function TrackedLink({
  kind,
  from,
  children,
  ...rest
}: { kind: Kind; from: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} onClick={() => record(kind, from)}>
      {children}
    </a>
  );
}

// Application links carry ?ref=<tag> (for example ?ref=app-03). Vercel can
// strip query strings from page paths, so the tag is also logged as the
// virtual page /ref/<tag>, once per visit.
export function RefTracker() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (!ref || !/^[\w-]{1,40}$/.test(ref)) return;
    // This effect can run before <Analytics /> has set up window.va, and calls
    // made then are dropped. Create the same queue the library uses, so the
    // call waits for the script instead.
    const w = window as unknown as { va?: (...a: unknown[]) => void; vaq?: unknown[][] };
    w.va = w.va || ((...a: unknown[]) => void (w.vaq = w.vaq || []).push(a));
    try {
      pageview({ route: "/ref/[tag]", path: `/ref/${ref}${window.location.pathname === "/" ? "" : window.location.pathname}` });
      track("ref_visit", { ref, page: window.location.pathname });
    } catch {
      // ignore
    }
  }, []);
  return null;
}
