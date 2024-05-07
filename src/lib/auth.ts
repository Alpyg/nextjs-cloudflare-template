import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { env } from "process";

import { db } from "@/db";
import { sessions, users } from "@/db/schema";

const adapter = () => new DrizzleSQLiteAdapter(db(), sessions, users);

export const lucia = () =>
  new Lucia(adapter(), {
    sessionCookie: {
      expires: false,
      attributes: {
        secure: env.NODE_ENV === "production",
      },
    },
    getUserAttributes: (attributes) => {
      return {
        email: attributes.email,
      };
    },
  });

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserID: number;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}
