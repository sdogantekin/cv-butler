import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse's pdfjs-dist dependency does dynamic worker-file loading at
  // runtime; bundling it breaks that file lookup ("Setting up fake worker
  // failed: Cannot find module .../pdf.worker.mjs"). Leaving it unbundled
  // lets Node resolve it normally from node_modules.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist", "@napi-rs/canvas"],
};

export default nextConfig;
