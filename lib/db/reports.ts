import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type ReportDoc = {
  _id?: ObjectId;
  resourceId: string;
  resourceName: string;
  reason: string;
  reportedBy: { userId: string; name: string } | null;
  createdAt: Date;
};

export type Report = {
  id: string;
  resourceId: string;
  resourceName: string;
  reason: string;
  reportedBy: { userId: string; name: string } | null;
  createdAt: string;
};

async function reportsCollection() {
  const db = await getDb();
  return db.collection<ReportDoc>("reports");
}

function toReport(doc: ReportDoc): Report {
  return {
    id: doc._id!.toString(),
    resourceId: doc.resourceId,
    resourceName: doc.resourceName,
    reason: doc.reason,
    reportedBy: doc.reportedBy,
    createdAt: (doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt)).toISOString(),
  };
}

export async function createReport(input: {
  resourceId: string;
  resourceName: string;
  reason: string;
  reportedBy: { userId: string; name: string } | null;
}) {
  const col = await reportsCollection();
  const doc: ReportDoc = { ...input, createdAt: new Date() };
  const res = await col.insertOne(doc);
  return toReport({ ...doc, _id: res.insertedId });
}

export async function listReports() {
  const col = await reportsCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toReport);
}

export async function countReports() {
  const col = await reportsCollection();
  return col.countDocuments();
}

export async function dismissReport(id: string) {
  if (!ObjectId.isValid(id)) return false;
  const col = await reportsCollection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}
