import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type NotificationDoc = {
  _id?: ObjectId;
  userId: string;
  type: "resource_approved" | "resource_rejected" | "report_resolved";
  message: string;
  resourceId?: string;
  read: boolean;
  createdAt: Date;
};

export type Notification = {
  id: string;
  type: NotificationDoc["type"];
  message: string;
  resourceId?: string;
  read: boolean;
  createdAt: string;
};

async function notificationsCollection() {
  const db = await getDb();
  return db.collection<NotificationDoc>("notifications");
}

function toNotification(doc: NotificationDoc): Notification {
  return {
    id: doc._id!.toString(),
    type: doc.type,
    message: doc.message,
    resourceId: doc.resourceId,
    read: doc.read,
    createdAt: (doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt)).toISOString(),
  };
}

export async function createNotification(input: {
  userId: string;
  type: NotificationDoc["type"];
  message: string;
  resourceId?: string;
}) {
  const col = await notificationsCollection();
  await col.insertOne({ ...input, read: false, createdAt: new Date() });
}

export async function listNotifications(userId: string, limit = 20) {
  const col = await notificationsCollection();
  const docs = await col
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map(toNotification);
}

export async function countUnread(userId: string) {
  const col = await notificationsCollection();
  return col.countDocuments({ userId, read: false });
}

export async function markAsRead(userId: string, id: string) {
  if (!ObjectId.isValid(id)) return false;
  const col = await notificationsCollection();
  const res = await col.updateOne(
    { _id: new ObjectId(id), userId },
    { $set: { read: true } }
  );
  return res.matchedCount > 0;
}

export async function markAllAsRead(userId: string) {
  const col = await notificationsCollection();
  await col.updateMany({ userId, read: false }, { $set: { read: true } });
}
