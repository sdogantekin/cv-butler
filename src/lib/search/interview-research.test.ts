import { afterEach, describe, expect, it, vi } from "vitest";

let mockEnv: { TAVILY_API_KEY?: string } = {};

vi.mock("@/lib/env", () => ({
  get env() {
    return mockEnv;
  },
}));

const { buildInterviewerQuery, researchCompanyForInterview, researchInterviewer } = await import(
  "./interview-research"
);

afterEach(() => {
  vi.unstubAllGlobals();
  mockEnv = {};
});

function stubTavily(body: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({ ok, json: async () => body });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("buildInterviewerQuery", () => {
  it("builds the query from the extracted name, role, and company only", () => {
    const query = buildInterviewerQuery({ name: "Jane Doe", role: "Engineering Manager", company: "Acme" });
    expect(query).toContain('"Jane Doe"');
    expect(query).toContain("Engineering Manager");
    expect(query).toContain("Acme");
  });

  it("returns null without a name, since a bare role or company can't identify a person", () => {
    expect(buildInterviewerQuery({ name: null, role: "CTO", company: "Acme" })).toBeNull();
  });
});

describe("researchInterviewer", () => {
  it("makes no network call when TAVILY_API_KEY is unset", async () => {
    const fetchMock = stubTavily({});
    const result = await researchInterviewer({ name: "Jane Doe", role: null, company: null });
    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("makes no network call when there is no identity to search for", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    const fetchMock = stubTavily({});
    expect(await researchInterviewer(null)).toBeNull();
    expect(await researchInterviewer({ name: null, role: "CTO", company: "Acme" })).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends only the built query, never anything else, and returns the parsed result", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    const fetchMock = stubTavily({ answer: "Jane leads platform engineering.", results: [{ content: "Talk at X" }] });
    const result = await researchInterviewer({ name: "Jane Doe", role: "EM", company: "Acme" });
    expect(result).toEqual({ answer: "Jane leads platform engineering.", snippets: ["Talk at X"] });
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.query).toBe(buildInterviewerQuery({ name: "Jane Doe", role: "EM", company: "Acme" }));
  });

  it("resolves to null on a failed request instead of throwing", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    stubTavily({}, false);
    expect(await researchInterviewer({ name: "Jane Doe", role: null, company: null })).toBeNull();
  });
});

describe("researchCompanyForInterview", () => {
  it("returns null with no company name or no API key, without a network call", async () => {
    const fetchMock = stubTavily({});
    expect(await researchCompanyForInterview(null)).toBeNull();
    expect(await researchCompanyForInterview("Acme")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the parsed answer and snippets when configured", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    stubTavily({ answer: "Acme makes widgets.", results: [{ content: "Launched Widget 2." }] });
    expect(await researchCompanyForInterview("Acme")).toEqual({
      answer: "Acme makes widgets.",
      snippets: ["Launched Widget 2."],
    });
  });
});
