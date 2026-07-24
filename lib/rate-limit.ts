import "server-only";
import { getDb } from "@/lib/mongodb";

type RateLimitDoc = {
  _id: string; // `${action}:${identifier}:${windowStart}`
  count: number;
  expiresAt: Date;
};

let ttlIndexEnsured = false;
async function ensureTtlIndex() {
  if (ttlIndexEnsured) return;
  ttlIndexEnsured = true;
  try {
    const db = await getDb();
    await db
      .collection<RateLimitDoc>("rate_limits")
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "ttl_expiresAt" });
  } catch (err) {
    console.error("[rate-limit] No se pudo asegurar el índice TTL:", err);
    ttlIndexEnsured = false;
  }
}

/**
 * Fixed-window rate limiter. Every `windowSeconds`, the counter for
 * `action:identifier` resets. Old windows expire automatically via a Mongo
 * TTL index, no cron job needed.
 */
export async function rateLimit({
  action,
  identifier,
  limit,
  windowSeconds,
}: {
  action: string;
  identifier: string;
  limit: number;
  windowSeconds: number;
}): Promise<{ allowed: boolean; remaining: number; retryAfterSeconds: number }> {
  await ensureTtlIndex();
  const db = await getDb();
  const col = db.collection<RateLimitDoc>("rate_limits");

  const windowStart = Math.floor(Date.now() / 1000 / windowSeconds) * windowSeconds;
  const key = `${action}:${identifier}:${windowStart}`;
  const expiresAt = new Date((windowStart + windowSeconds) * 1000);

  const res = await col.findOneAndUpdate(
    { _id: key },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
    { upsert: true, returnDocument: "after" }
  );

  const count = res?.count ?? 1;
  const retryAfterSeconds = Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / 1000));

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfterSeconds,
  };
}

/** Best-effort client IP extraction, works behind Vercel/most reverse proxies. */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
