import type { ObjectId } from "mongodb";

/**
 * Categories are dynamic: the list lives in MongoDB (collection: categories),
 * so this is just an opaque string key.
 */
export type CategoryKey = string;

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
  reviewedBy?: { userId: string; name: string } | null;
  createdAt: Date;
  reviewedAt?: Date | null;
  /** Upvotes (public, browser-tracked). Defaults to 0. */
  votes?: number;
  /** Manually highlighted resource. Defaults to false. */
  featured?: boolean;
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
  createdAt: string;
  votes: number;
  featured: boolean;
};

/** Shape of the static seed catalog (before scripts/seed.ts migrates it into MongoDB). */
export type SeedResource = {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: CategoryKey;
  featured?: boolean;
};

export type CategoryItem = {
  key: CategoryKey;
  label: string;
  /** Key into the icon map (see components/category-icons.tsx). */
  icon: string;
  /** Whether this category can be chosen when submitting a resource. */
  submittable: boolean;
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
