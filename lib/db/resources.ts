import "server-only";
import { ObjectId, type Filter } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { CategoryKey, Resource, ResourceDoc } from "@/data/types";
import { normalizeUrl } from "@/lib/url";

const PAGE_SIZE = 24;

async function resourcesCollection() {
  const db = await getDb();
  return db.collection<ResourceDoc>("resources");
}

export function toResource(doc: ResourceDoc): Resource {
  return {
    id: doc._id!.toString(),
    name: doc.name,
    description: doc.description,
    url: doc.url,
    tags: doc.tags,
    category: doc.category,
    status: doc.status,
    submittedBy: doc.submittedBy ?? null,
    createdAt: (doc.createdAt instanceof Date
      ? doc.createdAt
      : new Date(doc.createdAt)
    ).toISOString(),
    favoritesCount: doc.favoritesCount ?? 0,
  };
}

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export type ListParams = {
  category?: CategoryKey;
  query?: string;
  page?: number;
  status?: ResourceDoc["status"];
  sort?: "recent" | "popular";
};

export async function listResources({
  category = "todas",
  query = "",
  page = 1,
  status = "approved",
  sort = "recent",
}: ListParams) {
  const col = await resourcesCollection();
  const filter: Filter<ResourceDoc> = { status };
  if (category && category !== "todas") filter.category = category;

  const q = query.trim();
  if (q) {
    // Regex-based search kept in the app's normalized (accent-insensitive) form.
    // A Mongo text index is also created (see lib/db/indexes.ts) for larger datasets.
    const nq = normalize(q);
    const escaped = nq.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "i");
    filter.$or = [{ nameNormalized: re }, { tagsNormalized: re }];
  }

  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * PAGE_SIZE;
  const sortSpec: Record<string, 1 | -1> =
    sort === "popular" ? { favoritesCount: -1, createdAt: -1 } : { createdAt: -1 };

  const [docs, total] = await Promise.all([
    col
      .find(filter)
      .sort(sortSpec)
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray(),
    col.countDocuments(filter),
  ]);

  return {
    resources: docs.map(toResource),
    total,
    page: safePage,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function countByCategory(status: ResourceDoc["status"] = "approved") {
  const col = await resourcesCollection();
  const agg = await col
    .aggregate<{ _id: CategoryKey; count: number }>([
      { $match: { status } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ])
    .toArray();
  const map = new Map<CategoryKey, number>();
  let total = 0;
  for (const row of agg) {
    map.set(row._id, row.count);
    total += row.count;
  }
  map.set("todas", total);
  return map;
}

export async function getResourceById(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const col = await resourcesCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return doc ? toResource(doc) : null;
}

export async function getAllApprovedForSeo() {
  const col = await resourcesCollection();
  const docs = await col
    .find({ status: "approved" })
    .project<{ _id: ObjectId; name: string; category: CategoryKey }>({
      name: 1,
      category: 1,
    })
    .toArray();
  return docs.map((d) => ({ id: d._id.toString(), name: d.name, category: d.category }));
}

function buildNormalizedFields(input: {
  name: string;
  tags: string[];
  url: string;
}) {
  return {
    nameNormalized: normalize(input.name),
    tagsNormalized: input.tags.map((t) => normalize(t)).join(" "),
    urlNormalized: normalizeUrl(input.url),
  };
}

/** Returns the existing active (pending or approved) resource with the same URL, if any. */
export async function findDuplicateByUrl(url: string) {
  const col = await resourcesCollection();
  const doc = await col.findOne({
    urlNormalized: normalizeUrl(url),
    status: { $in: ["pending", "approved"] },
  });
  return doc ? toResource(doc) : null;
}

export async function submitResource(input: {
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: CategoryKey;
  submittedBy: { userId: string; name: string };
}) {
  const col = await resourcesCollection();
  const doc: ResourceDoc = {
    name: input.name.trim(),
    description: input.description.trim(),
    url: input.url.trim(),
    tags: input.tags.map((t) => t.trim().toLowerCase()).filter(Boolean),
    category: input.category,
    status: "pending",
    submittedBy: input.submittedBy,
    createdAt: new Date(),
    favoritesCount: 0,
    ...buildNormalizedFields({ name: input.name, tags: input.tags, url: input.url }),
  };
  const res = await col.insertOne(doc);
  return toResource({ ...doc, _id: res.insertedId });
}

export async function adminCreateResource(input: {
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: CategoryKey;
  admin: { userId: string; name: string };
}) {
  const col = await resourcesCollection();
  const doc: ResourceDoc = {
    name: input.name.trim(),
    description: input.description.trim(),
    url: input.url.trim(),
    tags: input.tags.map((t) => t.trim().toLowerCase()).filter(Boolean),
    category: input.category,
    status: "approved",
    submittedBy: null,
    reviewedBy: input.admin,
    reviewedAt: new Date(),
    createdAt: new Date(),
    favoritesCount: 0,
    ...buildNormalizedFields({ name: input.name, tags: input.tags, url: input.url }),
  };
  const res = await col.insertOne(doc);
  return toResource({ ...doc, _id: res.insertedId });
}

export async function listPendingResources() {
  const col = await resourcesCollection();
  const docs = await col.find({ status: "pending" }).sort({ createdAt: 1 }).toArray();
  return docs.map(toResource);
}

export async function reviewResource(
  id: string,
  decision: "approved" | "rejected",
  admin: { userId: string; name: string }
) {
  if (!ObjectId.isValid(id)) return null;
  const col = await resourcesCollection();
  const res = await col.findOneAndUpdate(
    { _id: new ObjectId(id), status: "pending" },
    {
      $set: {
        status: decision,
        reviewedBy: admin,
        reviewedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );
  return res ? toResource(res) : null;
}

export async function deleteResource(id: string) {
  if (!ObjectId.isValid(id)) return false;
  const col = await resourcesCollection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

export async function updateResource(
  id: string,
  input: {
    name: string;
    description: string;
    url: string;
    tags: string[];
    category: CategoryKey;
  }
) {
  if (!ObjectId.isValid(id)) return null;
  const col = await resourcesCollection();
  const res = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: input.name.trim(),
        description: input.description.trim(),
        url: input.url.trim(),
        tags: input.tags.map((t) => t.trim().toLowerCase()).filter(Boolean),
        category: input.category,
        ...buildNormalizedFields({ name: input.name, tags: input.tags, url: input.url }),
      },
    },
    { returnDocument: "after" }
  );
  return res ? toResource(res) : null;
}

export async function incrementFavoritesCount(id: string, delta: 1 | -1) {
  if (!ObjectId.isValid(id)) return;
  const col = await resourcesCollection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $inc: { favoritesCount: delta } }
  );
}

export async function listResourcesByIds(ids: string[]) {
  const validIds = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
  if (validIds.length === 0) return [];
  const col = await resourcesCollection();
  const docs = await col.find({ _id: { $in: validIds } }).toArray();
  return docs.map(toResource);
}

/** All of a user's own submissions, any status — used by "Mis envíos". */
export async function listResourcesByUser(userId: string) {
  const col = await resourcesCollection();
  const docs = await col
    .find({ "submittedBy.userId": userId })
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map(toResource);
}

/** Lets the original submitter edit their own resource while it's still pending. */
export async function updateOwnPendingResource(
  id: string,
  userId: string,
  input: { name: string; description: string; url: string; tags: string[]; category: CategoryKey }
) {
  if (!ObjectId.isValid(id)) return null;
  const col = await resourcesCollection();
  const res = await col.findOneAndUpdate(
    { _id: new ObjectId(id), "submittedBy.userId": userId, status: "pending" },
    {
      $set: {
        name: input.name.trim(),
        description: input.description.trim(),
        url: input.url.trim(),
        tags: input.tags.map((t) => t.trim().toLowerCase()).filter(Boolean),
        category: input.category,
        ...buildNormalizedFields({ name: input.name, tags: input.tags, url: input.url }),
      },
    },
    { returnDocument: "after" }
  );
  return res ? toResource(res) : null;
}

/** Lets the original submitter withdraw their own resource while it's still pending. */
export async function deleteOwnPendingResource(id: string, userId: string) {
  if (!ObjectId.isValid(id)) return false;
  const col = await resourcesCollection();
  const res = await col.deleteOne({
    _id: new ObjectId(id),
    "submittedBy.userId": userId,
    status: "pending",
  });
  return res.deletedCount > 0;
}

/** Every distinct tag across approved resources, with how many resources use it. */
export async function getAllTagsWithCounts() {
  const col = await resourcesCollection();
  const agg = await col
    .aggregate<{ _id: string; count: number }>([
      { $match: { status: "approved" } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ])
    .toArray();
  return agg.map((t) => ({ tag: t._id, count: t.count }));
}

/** A handful of other approved resources sharing the category or a tag. */
export async function getRelatedResources(resource: Resource, limit = 4) {
  const col = await resourcesCollection();
  const docs = await col
    .find({
      _id: { $ne: new ObjectId(resource.id) },
      status: "approved",
      $or: [{ category: resource.category }, { tags: { $in: resource.tags } }],
    })
    .sort({ favoritesCount: -1, createdAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map(toResource);
}

/** Full backup of every resource (any status), for the admin JSON export. */
export async function exportAllResources() {
  const col = await resourcesCollection();
  const docs = await col.find({}).sort({ createdAt: 1 }).toArray();
  return docs.map(toResource);
}
