/**
 * Seed the MongoDB database with the original static resource catalog and
 * (optionally) a first admin user.
 *
 * Usage:
 *   pnpm run seed
 *
 * Env vars used:
 *   MONGODB_URI        (required)
 *   MONGODB_DB         (optional, default "dsources")
 *   SEED_ADMIN_EMAIL   (optional) — if set together with SEED_ADMIN_PASSWORD,
 *   SEED_ADMIN_PASSWORD  creates/promotes an admin account you can log in with.
 *   SEED_ADMIN_NAME     (optional, default "Admin")
 */
import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { MongoClient, type Collection, type CreateIndexesOptions, type IndexSpecification } from "mongodb";
import bcrypt from "bcryptjs";
import { RESOURCES } from "../data/resources";
import { DEFAULT_CATEGORIES } from "../data/categories";

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function normalizeUrl(url: string) {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    const path = u.pathname.replace(/\/+$/, "").toLowerCase();
    return `${host}${path}`;
  } catch {
    return url.trim().toLowerCase();
  }
}

/**
 * The app already ensures indexes on startup (lib/db/indexes.ts), so the seed
 * treats them as best-effort: a conflict with an existing same-key index
 * (IndexOptionsConflict, code 85) shouldn't abort seeding.
 */
async function createIndexBestEffort(
  col: Collection,
  spec: IndexSpecification,
  options?: CreateIndexesOptions
) {
  try {
    await col.createIndex(spec, options);
  } catch (err) {
    const code = (err as { code?: number })?.code;
    if (code === 85) {
      console.warn("[seed] Índice ya existente con otra configuración; se omite.");
    } else {
      console.warn("[seed] No se pudo crear un índice:", err);
    }
  }
}

async function main() {
  const envPath = existsSync(".env.local") ? ".env.local" : ".env";
  dotenv.config({ path: envPath });
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Falta MONGODB_URI en el entorno (.env.local).");
    process.exit(1);
  }
  const dbName = process.env.MONGODB_DB || "dsources";
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  console.log(`Conectado a la base "${dbName}". Sembrando recursos...`);

  const categoriesCol = db.collection("categories");
  await createIndexBestEffort(categoriesCol, { key: 1 }, { unique: true });
  let categoriesUpserted = 0;
  for (const cat of DEFAULT_CATEGORIES) {
    const res = await categoriesCol.updateOne(
      { key: cat.key },
      { $set: cat },
      { upsert: true }
    );
    if (res.upsertedCount > 0) categoriesUpserted++;
  }
  console.log(
    `Categorías aseguradas: ${DEFAULT_CATEGORIES.length} (${categoriesUpserted} nuevas).`
  );

  const resourcesCol = db.collection("resources");
  await createIndexBestEffort(resourcesCol, { url: 1 });
  await createIndexBestEffort(resourcesCol, { status: 1, category: 1, createdAt: -1 });
  await createIndexBestEffort(resourcesCol, { nameNormalized: 1 });
  await createIndexBestEffort(resourcesCol, { urlNormalized: 1 });

  let inserted = 0;
  let skipped = 0;
  for (const r of RESOURCES) {
    const existing = await resourcesCol.findOne({ url: r.url });
    if (existing) {
      skipped++;
      continue;
    }
    await resourcesCol.insertOne({
      name: r.name,
      description: r.description,
      url: r.url,
      tags: r.tags,
      category: r.category,
      status: "approved",
      reviewedBy: null,
      createdAt: new Date(),
      votes: 0,
      featured: r.featured ?? false,
      nameNormalized: normalize(r.name),
      tagsNormalized: r.tags.map(normalize).join(" "),
      urlNormalized: normalizeUrl(r.url),
    });
    inserted++;
  }
  console.log(`Recursos insertados: ${inserted}. Ya existían: ${skipped}.`);

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const usersCol = db.collection("users");
    await createIndexBestEffort(usersCol, { email: 1 }, { unique: true });
    const email = adminEmail.toLowerCase().trim();
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const existingAdmin = await usersCol.findOne({ email });
    if (existingAdmin) {
      await usersCol.updateOne(
        { email },
        { $set: { role: "admin", passwordHash } }
      );
      console.log(`Usuario ${email} promovido a admin y contraseña actualizada.`);
    } else {
      await usersCol.insertOne({
        name: process.env.SEED_ADMIN_NAME || "Admin",
        email,
        passwordHash,
        role: "admin",
        createdAt: new Date(),
      });
      console.log(`Usuario admin ${email} creado.`);
    }
  } else {
    console.log(
      "SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD no definidos: no se creó ningún admin."
    );
  }

  await client.close();
  console.log("Listo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
