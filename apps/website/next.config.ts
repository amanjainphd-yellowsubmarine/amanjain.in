import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";

function localLanHosts(): string[] {
  const hosts = new Set<string>();
  for (const nets of Object.values(os.networkInterfaces())) {
    if (!nets) continue;
    for (const net of nets) {
      if (net.family === "IPv4" && !net.internal) hosts.add(net.address);
    }
  }
  return [...hosts];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: localLanHosts(),
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: path.join(__dirname, "../.."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
