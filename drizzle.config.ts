import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./migrations",
  driver: "better-sqlite",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.LOCAL_DB_PATH,
  },
} satisfies Config;
