import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse's pdfjs-dist dependency does dynamic worker-file loading at
  // runtime; bundling it breaks that file lookup ("Setting up fake worker
  // failed: Cannot find module .../pdf.worker.mjs"). Leaving it unbundled
  // lets Node resolve it normally from node_modules.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist", "@napi-rs/canvas"],
  // Being external (above) means output-file-tracing doesn't bundle these,
  // but on Vercel it also failed to auto-detect and copy two things these
  // packages load dynamically at runtime rather than via a statically
  // analyzable import/require: @napi-rs/canvas's platform-specific native
  // binary (pdf-parse's DOMMatrix polyfill silently failed to load) and
  // pdfjs-dist's pdf.worker.mjs ("Setting up fake worker failed: Cannot find
  // module .../pdf.worker.mjs"). Both crashed PDF parsing at runtime in
  // production only (works locally since the full node_modules tree is
  // present, not a traced one) — force-include both full package trees so
  // whichever files they load at runtime are actually there.
  outputFileTracingIncludes: {
    "/api/analyze/score": ["./node_modules/@napi-rs/**/*", "./node_modules/pdfjs-dist/**/*"],
    "/api/analyze/match-upload": [
      "./node_modules/@napi-rs/**/*",
      "./node_modules/pdfjs-dist/**/*",
    ],
  },
};

export default nextConfig;
