import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/lib/db/schema";

// Server-only: this file must never be imported from a client component.
// DATABASE_URL is read only here, never exposed to the browser.
//
// Deliberately lazy: constructing the real client only happens on first
// actual use (inside a Server Action/Component at request time), not at
// module import time. Admin route modules still need to be *imported*
// during `next build` (even though they render dynamically, not
// statically) to determine their rendering strategy — if this file threw
// eagerly at import time, the production build itself would fail whenever
// DATABASE_URL isn't set, which would be true for anyone building this
// project before provisioning a database. Failing only on first real query
// gives a much clearer error, at the right time, without breaking the build.
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment (see .env.example) before using the database."
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let cached: ReturnType<typeof createDb> | undefined;

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop, receiver) {
    if (!cached) cached = createDb();
    return Reflect.get(cached as object, prop, receiver);
  },
});
