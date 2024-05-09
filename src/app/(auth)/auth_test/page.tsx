import { getLucia } from "@/lib/auth";

export const runtime = "edge";

export default async function Page() {
  const { user } = await getLucia();
  return <div>{user?.email ?? "Not logged in"}</div>;
}
