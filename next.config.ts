import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
// served by Cloudflare Pages (404.html included).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
