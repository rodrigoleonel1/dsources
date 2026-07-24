import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SUBMITTABLE_CATEGORY_KEYS } from "@/data/category-keys";
import { getAllApprovedForSeo } from "@/lib/db/resources";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/tags`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/login`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/register`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = SUBMITTABLE_CATEGORY_KEYS.map((cat) => ({
    url: `${SITE_URL}/?cat=${cat}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  let resourceEntries: MetadataRoute.Sitemap = [];
  try {
    const resources = await getAllApprovedForSeo();
    resourceEntries = resources.map((r) => ({
      url: `${SITE_URL}/recurso/${r.id}`,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    // If the DB isn't reachable at build/request time, still return a valid sitemap.
    resourceEntries = [];
  }

  return [...staticEntries, ...categoryEntries, ...resourceEntries];
}
