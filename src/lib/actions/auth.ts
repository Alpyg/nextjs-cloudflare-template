"use server";

import { eq } from "drizzle-orm";
import { Scrypt } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db, takeUniqueOrThrow } from "@/db";
import { users } from "@/db/schema";
import { authSchema } from "@/lib/validations/auth";

import { lucia } from "../auth";
import { action } from "./safe-action";

export const signInAction = action(authSchema, async ({ email, password }) => {
  const user = await db()
    .select({
      id: users.id,
      email: users.email,
      password_hash: users.password_hash,
    })
    .from(users)
    .where(eq(users.email, email))
    .then(takeUniqueOrThrow);

  if (!user || !user.password_hash) {
    return { error: "Incorrect email or password." };
  }

  const validPassword = await new Scrypt().verify(user.password_hash, password);
  if (!validPassword) {
    return { error: "Incorrect email or password." };
  }

  const session = await lucia().createSession(user.id, {});
  const sessionCookie = lucia().createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
});

export const signUpAction = action(authSchema, async ({ email, password }) => {
  console.log(await db().select().from(users));
  const existingUser = await db().select().from(users);
  console.log(await db().select().from(users));

  if (existingUser) {
    return { error: "Email already taken." };
  }

  const hashedPassword = await new Scrypt().hash(password);
  const user = (
    await db()
      .insert(users)
      .values({
        email,
        password_hash: hashedPassword,
      })
      .returning({ id: users.id })
  )[0];

  // TODO add email verification?

  const session = await lucia().createSession(user.id, {});
  const sessionCookie = lucia().createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/"); // TODO change into verify email path
});
