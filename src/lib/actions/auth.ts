import { signInSchema } from "../validations/auth";
import { action } from "./safe-action";

export const signinAction = action(
  signInSchema,
  async ({ email, password }) => {
    // TODO add db validation

    return { success: "Signed in" };
  },
);
