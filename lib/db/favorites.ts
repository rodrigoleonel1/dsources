import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { incrementFavoritesCount } from "@/lib/db/resources";

type FavoriteDoc = {
  _id?: ObjectId;
  userId: string;
  resourceId: string;
  createdAt: Date;
};

async function favoritesCollection() {
  const db = await getDb();
  return db.collection<FavoriteDoc>("favorites");
}

export async function getFavoriteResourceIds(userId: string) {
  const col = await favoritesCollection();
  const docs = await col.find({ userId }).project({ resourceId: 1 }).toArray();
  return docs.map((d) => d.resourceId);
}

export async function isFavorite(userId: string, resourceId: string) {
  const col = await favoritesCollection();
  const doc = await col.findOne({ userId, resourceId });
  return !!doc;
}

/** Toggles a favorite and returns the new state. */
export async function toggleFavorite(userId: string, resourceId: string) {
  const col = await favoritesCollection();
  const existing = await col.findOne({ userId, resourceId });
  if (existing) {
    await col.deleteOne({ _id: existing._id });
    await incrementFavoritesCount(resourceId, -1);
    return false;
  }
  await col.insertOne({ userId, resourceId, createdAt: new Date() });
  await incrementFavoritesCount(resourceId, 1);
  return true;
}
