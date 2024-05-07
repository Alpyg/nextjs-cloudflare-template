"use server";

import { authSchema } from "@/lib/validations/auth";

import { action } from "./safe-action";

export const signInAction = action(authSchema, async ({ email, password }) => {
  // TODO add db validation

  console.log("signInAction", email, password);

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ message: "Signed in" });
    }, 1000),
  );
});

export const signUpAction = action(authSchema, async ({ email, password }) => {
  // TODO add db validation
  // insert to database

  console.log("signUpAction", email, password);

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ message: "Signed up" });
    }, 1000),
  );
});
