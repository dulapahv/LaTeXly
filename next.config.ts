import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  typedRoutes: true,
  logging: {
    browserToTerminal: true,
  },
  experimental: {
    typedEnv: true,
    viewTransition: true,
    inlineCss: true,
    turbopackFileSystemCacheForBuild: true,
    optimizePackageImports: [
      '@monaco-editor/react',
      'monaco-editor',
      'mathjax',
      'better-react-mathjax',
    ],
  },
};

export default nextConfig;
