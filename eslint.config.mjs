import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Design sync: staged converter scripts and generated bundle
    // output (gitignored, but not lint-ignored by default — without this
    // ESLint scans a 278KB minified React bundle and drowns real output).
    ".ds-sync/**",
    "ds-bundle/**",
    ".design-sync/.cache/**",
  ]),
]);

export default eslintConfig;
