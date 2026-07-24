import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "dsources";

if (!uri) {
  // We don't throw at import time so that `next build` (static analysis)
  // doesn't fail in environments where the env var is injected only at runtime.
  console.warn(
    "[mongodb] MONGODB_URI no está definida. Configúrala en tu .env.local"
  );
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const client = new MongoClient(uri as string, {
    maxPoolSize: 10,
  });
  return client.connect();
}

// Reuse the client across hot-reloads in dev and across invocations in prod
// to avoid exhausting Mongo's connection pool.
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
