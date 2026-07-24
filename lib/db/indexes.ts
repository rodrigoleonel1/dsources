import "server-only";
import { getDb } from "@/lib/mongodb";

let ensured = false;

/** Creates indexes if they don't exist yet. Safe to call repeatedly. */
export async function ensureIndexes() {
  if (ensured) return;
  ensured = true;
  try {
    const db = await getDb();

    await db
      .collection("users")
      .createIndex({ email: 1 }, { unique: true, name: "uniq_email" });

    await db
      .collection("resources")
      .createIndexes([
        { key: { status: 1, category: 1, createdAt: -1 }, name: "status_category_createdAt" },
        { key: { nameNormalized: 1 }, name: "nameNormalized" },
        { key: { urlNormalized: 1 }, name: "urlNormalized" },
        { key: { "submittedBy.userId": 1 }, name: "submittedBy_userId" },
        { key: { url: 1 }, name: "url" },
      ]);

    await db
      .collection("favorites")
      .createIndexes([
        { key: { userId: 1, resourceId: 1 }, unique: true, name: "uniq_user_resource" },
        { key: { userId: 1 }, name: "userId" },
      ]);

    await db
      .collection("notifications")
      .createIndexes([
        { key: { userId: 1, createdAt: -1 }, name: "userId_createdAt" },
        { key: { userId: 1, read: 1 }, name: "userId_read" },
      ]);

    await db
      .collection("reports")
      .createIndexes([
        { key: { resourceId: 1 }, name: "resourceId" },
        { key: { createdAt: -1 }, name: "createdAt" },
      ]);
  } catch (err) {
    // Don't crash the app if index creation races or lacks permissions;
    // the app still works, just without the perf benefit until retried.
    console.error("[mongodb] No se pudieron asegurar los índices:", err);
    ensured = false;
  }
}
