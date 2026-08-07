import "server-only";
import { getDb } from "@/lib/mongodb";
import type { SessionPayload } from "@/lib/auth";
import type { UserDoc, PublicUser } from "@/data/types";

async function usersCollection() {
  const db = await getDb();
  return db.collection<UserDoc>("users");
}

/** Adapts a UserDoc or a session payload to the PublicUser shape used by UI. */
export function toPublicUser(doc: UserDoc): PublicUser;
export function toPublicUser(session: SessionPayload | null): PublicUser | null;
export function toPublicUser(
  source: UserDoc | SessionPayload | null
): PublicUser | null {
  if (!source) return null;
  const userId = "userId" in source ? source.userId : source._id!.toString();
  return {
    id: userId,
    name: source.name,
    email: source.email,
    role: source.role,
  };
}

export async function findUserByEmail(email: string) {
  const col = await usersCollection();
  return col.findOne({ email: email.toLowerCase().trim() });
}
