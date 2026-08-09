import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Recursos para desarrolladores`;

export default function OpengraphImage() {
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.14)",
            }}
          >
            <div style={{ display: "flex", fontSize: "36px", fontWeight: 700 }}>D</div>
          </div>
          <div style={{ display: "flex", fontSize: "40px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", fontSize: "76px", fontWeight: 800, lineHeight: 1.05 }}>
              Recursos para
            </div>
            <div style={{ display: "flex", fontSize: "76px", fontWeight: 800, lineHeight: 1.05 }}>
              desarrolladores
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              lineHeight: 1.4,
              maxWidth: "900px",
              color: "#e9d8ff",
            }}
          >
            {SITE_DESCRIPTION.split(". ")[0]}.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "26px", color: "#c4b5fd" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", width: "12px", height: "12px", borderRadius: "999px", background: "#a78bfa" }} />
            <div style={{ display: "flex" }}>Curado por la comunidad</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", width: "12px", height: "12px", borderRadius: "999px", background: "#a78bfa" }} />
            <div style={{ display: "flex" }}>15+ categorías</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}