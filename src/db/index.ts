import { getRequestContext } from "@cloudflare/next-on-pages";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/d1";

import { sessions, users } from "./schema";

export const db = () => {
  console.log(getRequestContext().env.DB);
  return drizzle(getRequestContext().env.DB);
};
