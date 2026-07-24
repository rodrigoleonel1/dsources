import type { ComponentType } from "react";
import type { ObjectId } from "mongodb";

export type CategoryKey =
  | "todas"
  | "cursos"
  | "challenges"
  | "herramientas"
  | "documentacion"
  | "diseño"
  | "inspiraciones"
  | "blogs"
  | "apis"
  | "librerias"
  | "repositorios"
  | "componentes"
  | "didactico";

export type ResourceStatus = "approved" | "pending" | "rejected";

/** Shape stored in MongoDB (collection: resources). */
export type ResourceDoc = {
  _id?: ObjectId;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: CategoryKey;
  status: ResourceStatus;
  submittedBy: { userId: string; name: string } | null;
  reviewedBy?: { userId: string; name: string } | null;
  createdAt: Date;
  reviewedAt?: Date | null;
  favoritesCount?: number;
  /** Accent/case-insensitive search helpers, kept in sync on write. */
  nameNormalized?: string;
  tagsNormalized?: string;
  /** Normalized URL (host+path, no protocol/www/trailing slash), used for duplicate detection. */
  urlNormalized?: string;
};

/** Shape sent to the client (dates as strings, _id as string). */
export type Resource = {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: CategoryKey;
  status: ResourceStatus;
  submittedBy: { userId: string; name: string } | null;
  createdAt: string;
  favoritesCount?: number;
};

/** Shape of the static seed catalog (before scripts/seed.ts migrates it into MongoDB). */
export type SeedResource = {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: CategoryKey;
};

export type CategoryItem = {
  key: CategoryKey;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export type UserRole = "user" | "admin";

/** Shape stored in MongoDB (collection: users). */
export type UserDoc = {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
