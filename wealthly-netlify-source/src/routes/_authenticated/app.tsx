import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { APP_MARKUP } from "@/app/markup";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Wealthly" },
      {
        name: "description",
        content: "Your private Wealthly dashboard: expenses, income, budgets, analytics and reports.",
      },
      { property: "og:title", content: "Dashboard — Wealthly" },
      { property: "og:description", content: "Your private Wealthly finance dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TrackerPage,
});

/**
 * Mounts the original Wealthly interface exactly as authored (markup + CSS are
 * unchanged) and boots the app logic once. Only the persistence layer inside
 * that logic was swapped from localStorage to authenticated API calls.
 */
function TrackerPage() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const host = hostRef.current;
    host.innerHTML = APP_MARKUP;

    // Hard safety net: the splash screen can never outlive the boot sequence,
    // even if the logic bundle fails to load.
    const failsafe = window.setTimeout(() => {
      host.querySelector("#loadingScreen")?.classList.add("hide");
    }, 8000);

    let cancelled = false;
    void import("@/app/wealthly.js")
      .then((mod) => {
        if (cancelled) return;
        void mod.initWealthly().catch((err: unknown) => {
          console.error("[wealthly] initialization failed", err);
          host.querySelector("#loadingScreen")?.classList.add("hide");
        });
      })
      .catch((err) => {
        console.error("[wealthly] failed to start", err);
        host.querySelector("#loadingScreen")?.classList.add("hide");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  return <div ref={hostRef} />;
}
