import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { env } from "process";
import { cache } from "react";

import { db } from "@/db";
import { sessions, users } from "@/db/schema";

const adapter = cache(() => new DrizzleSQLiteAdapter(db, sessions, users));

export const lucia = new Lucia(adapter(), {
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

export const getLucia = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    } else {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {}
  return { user, session };
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}
