import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  eslint: {
    // Linting is run separately in CI; don't let it block local `next build`.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
