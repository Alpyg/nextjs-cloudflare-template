import { D1Adapter } from "@auth/d1-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: D1Adapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, request) => {
        let user = null;

        // TODO add database

        return user;
      },
    }),
  ],
});
