import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const runtime = "edge";

export default async function Users() {
  const users = await db.select().from(usersTable);
  return <div>{JSON.stringify(users)}</div>;
}
