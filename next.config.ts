import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
