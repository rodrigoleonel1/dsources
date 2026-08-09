import dotenv from "dotenv";
import { MongoClient } from "mongodb";

const HOSTING_URLS = [
  "https://www.cloudflare.com",
  "https://vercel.com",
  "https://www.netlify.com",
  "https://render.com",
];

const PRODUCTIVIDAD_URLS = [
  "https://www.notion.com",
  "https://trello.com",
  "https://linear.app",
  "https://miro.com",
  "https://discord.com",
  "https://slack.com",
];

async function main() {
  dotenv.config({ path: ".env.local" });
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Falta MONGODB_URI en .env.local");
    process.exit(1);
  }
  const dbName = process.env.MONGODB_DB || "dsources";
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const categories = db.collection("categories");
  const cats = [
    { key: "hosting", label: "Hosting y deploy", icon: "hosting", order: 14, submittable: true },
    { key: "productividad", label: "Productividad", icon: "productividad", order: 15, submittable: true },
  ];
  for (const cat of cats) {
    const existing = await categories.findOne({ key: cat.key });
    if (existing) {
      console.log(`Categoria ${cat.key} ya existente; se omite.`);
    } else {
      await categories.insertOne(cat);
      console.log(`Categoria ${cat.key} creada.`);
    }
  }

  const resources = db.collection("resources");
  const r1 = await resources.updateMany(
    { url: { $in: HOSTING_URLS } },
    { $set: { category: "hosting" } }
  );
  console.log(`Recursos movidos a hosting: ${r1.modifiedCount}.`);
  const r2 = await resources.updateMany(
    { url: { $in: PRODUCTIVIDAD_URLS } },
    { $set: { category: "productividad" } }
  );
  console.log(`Recursos movidos a productividad: ${r2.modifiedCount}.`);

  await client.close();
  console.log("Listo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});