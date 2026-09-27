import type { Config } from "drizzle-kit";

// drizzle-kit reads DATABASE_URL only to introspect/push against a live
// database (`push`, `studio`, `migrate`). `generate` (used to produce the SQL
// migration files from lib/db/schema.ts) works from the schema file alone and
// does not require a live connection.
export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
} satisfies Config;
