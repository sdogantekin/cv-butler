import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse's pdfjs-dist dependency does dynamic worker-file loading at
  // runtime; bundling it breaks that file lookup ("Setting up fake worker
  // failed: Cannot find module .../pdf.worker.mjs"). Leaving it unbundled
  // lets Node resolve it normally from node_modules.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist", "@napi-rs/canvas"],
  // Being external (above) means output-file-tracing doesn't bundle these,
  // but on Vercel it also failed to auto-detect and copy @napi-rs/canvas's
  // platform-specific native binary into the deployed function — pdf-parse's
  // DOMMatrix polyfill silently failed to load ("Cannot find module
  // '@napi-rs/canvas'"), crashing PDF parsing at runtime in production only
  // (works locally since the full node_modules tree is present, not a traced
  // one). Force-include the whole @napi-rs scope so whichever
  // platform-specific package (@napi-rs/canvas-linux-x64-gnu, etc.) actually
  // gets installed on the build machine is included.
  outputFileTracingIncludes: {
    "/api/analyze/score": ["./node_modules/@napi-rs/**/*"],
    "/api/analyze/match-upload": ["./node_modules/@napi-rs/**/*"],
  },
};

export default nextConfig;
