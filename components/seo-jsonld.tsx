import { Resource } from "@/data/types";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function SEOJsonLd({
  resources,
  breadcrumb = [],
}: {
  resources: Resource[];
  breadcrumb?: { name: string; url: string }[];
}) {
  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "es-AR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const itemListJson = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: resources.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/recurso/${r.id}`,
        name: r.name,
        description: r.description,
        url: `${SITE_URL}/recurso/${r.id}`,
        keywords: r.tags.join(", "),
        genre: r.category,
      },
    })),
  };

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    ...breadcrumb.map((b, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: b.name,
      item: `${SITE_URL}${b.url}`,
    })),
  ];
  const breadcrumbJson =
    breadcrumbItems.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems,
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }}
      />
      {breadcrumbJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }}
      />
    </>
  );
}
