import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { UserDoc, PublicUser } from "@/data/types";

async function usersCollection() {
  const db = await getDb();
  return db.collection<UserDoc>("users");
}

export function toPublicUser(doc: UserDoc): PublicUser {
  return {
    id: doc._id!.toString(),
    name: doc.name,
    email: doc.email,
    role: doc.role,
  };
}

export async function findUserByEmail(email: string) {
  const col = await usersCollection();
  return col.findOne({ email: email.toLowerCase().trim() });
}

export async function findUserById(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const col = await usersCollection();
  return col.findOne({ _id: new ObjectId(id) });
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "user" | "admin";
}) {
  const col = await usersCollection();
  const doc: UserDoc = {
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    passwordHash: input.passwordHash,
    role: input.role ?? "user",
    createdAt: new Date(),
  };
  const res = await col.insertOne(doc);
  return { ...doc, _id: res.insertedId };
}

export async function countUsers() {
  const col = await usersCollection();
  return col.countDocuments();
}
