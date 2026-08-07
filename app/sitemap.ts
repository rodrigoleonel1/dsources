import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSubmittableCategories } from "@/lib/db/categories";
import { getAllApprovedForSeo } from "@/lib/db/resources";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/tags`, changeFrequency: "weekly", priority: 0.5 },
  ];

  const categories = await getSubmittableCategories();
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/?cat=${cat.key}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  let resourceEntries: MetadataRoute.Sitemap = [];
  try {
    const resources = await getAllApprovedForSeo();
    resourceEntries = resources.map((r) => ({
      url: `${SITE_URL}/recurso/${r.id}`,
      lastModified: r.createdAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    // If the DB isn't reachable at build/request time, still return a valid sitemap.
    resourceEntries = [];
  }

  return [...staticEntries, ...categoryEntries, ...resourceEntries];
}
