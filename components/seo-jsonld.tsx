"use client"

import { useEffect, useMemo, useState } from "react"
import Script from "next/script"
import { Resource } from "@/data/types"

export function SEOJsonLd({ resources }: { resources: Resource[] }) {
  const [origin, setOrigin] = useState<string>("")
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin)
  }, [])

  const itemListJson = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: resources.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: r.name,
          description: r.description,
          url: r.url,
          keywords: r.tags.join(", "),
          genre: r.category,
        },
      })),
    }),
    [resources]
  )

  const breadcrumbJson = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
        { "@type": "ListItem", position: 2, name: "Dsources", item: "/dsources" },
      ],
    }),
    []
  )

  const websiteJson = useMemo(
    () =>
      origin
        ? {
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: `${origin}/dsources`,
            name: "Dsources",
            potentialAction: {
              "@type": "SearchAction",
              target: `${origin}/dsources?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }
        : {},
    [origin]
  )

  return (
    <>
      <Script id="ld-website" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <Script id="ld-itemlist" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }} />
    </>
  )
}
