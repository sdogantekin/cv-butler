import type { CompanyResearchProvider } from "../../company-search";

// Test fixture only — exercises the real dynamic-import resolution path in
// company-search.test.ts. Not used by the app itself.
export const companyResearchProvider: CompanyResearchProvider = {
  async search(companyName) {
    return { answer: `Custom result for ${companyName}`, snippets: [] };
  },
};
