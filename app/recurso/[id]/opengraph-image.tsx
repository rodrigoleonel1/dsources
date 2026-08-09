import { ImageResponse } from "next/og";
import { getResourceById } from "@/lib/db/resources";
import { getCategories } from "@/lib/db/categories";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ResourceOpengraphImage({ params }: Props) {
  const { id } = await params;
  const resource = await getResourceById(id);
  const categories = await getCategories();
  const categoryLabel =
    categories.find((c) => c.key === resource?.category)?.label ?? resource?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
          color: "#faf7ff",
          fontFamily: "Geist, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
            }}
          >
            D
          </div>
          <div style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.02em" }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#c4b5fd",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span>{categoryLabel}</span>
          </div>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {resource?.name ?? "Recurso no encontrado"}
          </div>
          {resource && (
            <div
              style={{
                fontSize: "30px",
                lineHeight: 1.4,
                opacity: 0.85,
                maxWidth: "950px",
                color: "#e9d8ff",
              }}
            >
              {resource.description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "26px",
            color: "#c4b5fd",
          }}
        >
          <span style={{ fontSize: "26px", color: "#e9d8ff" }}>{resource?.url ?? ""}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}