import type { AnyStore } from "nanostores";

/** Logs store changes to the console - in the browser during development only. */
export function devLogger(stores: Record<string, AnyStore>): void {
  if (import.meta.env.DEV && !import.meta.env.SSR) {
    import("@nanostores/logger").then(({ logger }) => logger(stores));
  }
}
