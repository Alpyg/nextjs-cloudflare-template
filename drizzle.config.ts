import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "d1",
  dbCredentials: {
    dbName: "template-db",
    wranglerConfigPath: ".",
  },
} satisfies Config;
