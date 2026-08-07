import "server-only";
import { getDb } from "@/lib/mongodb";
import type { IndexDescription } from "mongodb";

let ensured = false;

/** True if both index specs describe the same set of key:direction pairs. */
function sameKey(a: Record<string, unknown>, b: Record<string, unknown>) {
  const aEntries = Object.entries(a);
  if (aEntries.length !== Object.keys(b).length) return false;
  return aEntries.every(([k, v]) => b[k] === v);
}

/**
 * Ensures the given indexes on a collection, self-healing against
 * `IndexOptionsConflict` (code 85). Older setups (or an early seed run) may
 * have created an index with the same keys but a different name (Mongo's
 * auto-generated `k1_1_k2_-1` style), which makes `createIndexes` throw when
 * we try to create our own named index. We drop any same-key conflicting
 * index first, then create the one we want.
 */
async function ensureIndexesWithSelfHealing(
  collectionName: string,
  targets: IndexDescription[]
) {
  const col = (await getDb()).collection(collectionName);
  // On a fresh DB the collection may not exist yet, so `indexes()` throws
  // `NamespaceNotFound` (code 26); `createIndexes` creates the collection
  // implicitly, so there's nothing to heal in that case.
  let existing: Awaited<ReturnType<typeof col.indexes>> = [];
  try {
    existing = await col.indexes();
  } catch (err) {
    const code = (err as { code?: number })?.code;
    if (code !== 26) throw err;
  }
  for (const target of targets) {
    const targetKey = target.key as Record<string, unknown>;
    const targetName = target.name;
    if (!targetName) continue;
    for (const idx of existing) {
      const key = idx.key as Record<string, unknown>;
      if (idx.name && idx.name !== targetName && sameKey(key, targetKey)) {
        await col.dropIndex(idx.name);
      }
    }
  }
  await col.createIndexes(targets);
}

/** Creates indexes if they don't exist yet. Safe to call repeatedly. */
export async function ensureIndexes() {
  if (ensured) return;
  ensured = true;
  try {
    await ensureIndexesWithSelfHealing("users", [
      { key: { email: 1 }, unique: true, name: "uniq_email" },
    ]);

    await ensureIndexesWithSelfHealing("resources", [
      { key: { status: 1, category: 1, createdAt: -1 }, name: "status_category_createdAt" },
      { key: { status: 1, votes: -1, createdAt: -1 }, name: "status_votes_createdAt" },
      { key: { nameNormalized: 1 }, name: "nameNormalized" },
      { key: { urlNormalized: 1 }, name: "urlNormalized" },
      { key: { url: 1 }, name: "url" },
    ]);

    await ensureIndexesWithSelfHealing("categories", [
      { key: { key: 1 }, unique: true, name: "uniq_category_key" },
    ]);
  } catch (err) {
    // Don't crash the app if index creation races or lacks permissions;
    // the app still works, just without the perf benefit until retried.
    console.error("[mongodb] No se pudieron asegurar los índices:", err);
    ensured = false;
  }
}
