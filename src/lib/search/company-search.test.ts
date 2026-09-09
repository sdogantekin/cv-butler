import { afterEach, describe, expect, it, vi } from "vitest";

let mockEnv: { TAVILY_API_KEY?: string; COMPANY_RESEARCH_PROVIDER_MODULE?: string } = {};

vi.mock("@/lib/env", () => ({
  get env() {
    return mockEnv;
  },
}));

const { searchCompanyInfo } = await import("./company-search");

afterEach(() => {
  vi.unstubAllGlobals();
  mockEnv = {};
});

describe("searchCompanyInfo", () => {
  it("returns null and makes no network call when TAVILY_API_KEY is unset", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await searchCompanyInfo("Acme Corp");

    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the parsed answer and snippets on a successful response", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        answer: "Acme Corp is a fast-paced, fully remote startup.",
        results: [{ content: "Acme Corp offers remote-first work." }, { content: "Small team, ~20 people." }],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await searchCompanyInfo("Acme Corp");

    expect(result).toEqual({
      answer: "Acme Corp is a fast-paced, fully remote startup.",
      snippets: ["Acme Corp offers remote-first work.", "Small team, ~20 people."],
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("returns null when the response is not ok", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));

    expect(await searchCompanyInfo("Acme Corp")).toBeNull();
  });

  it("returns null (never throws) when fetch itself rejects", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));

    await expect(searchCompanyInfo("Acme Corp")).resolves.toBeNull();
  });

  it("returns null when the response body doesn't match the expected shape", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: "not-an-array" }) }),
    );

    expect(await searchCompanyInfo("Acme Corp")).toBeNull();
  });

  it("returns null when there is no answer and no snippets at all", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [] }) }));

    expect(await searchCompanyInfo("Acme Corp")).toBeNull();
  });

  it("uses only the custom provider's result when TAVILY_API_KEY is unset", async () => {
    mockEnv = { COMPANY_RESEARCH_PROVIDER_MODULE: "./providers/__fixtures__/valid-test-provider" };
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await searchCompanyInfo("Acme Corp");

    expect(result).toEqual({ answer: "Custom result for Acme Corp", snippets: [] });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("combines Tavily's result with a custom provider's result — an additional source, not a replacement", async () => {
    mockEnv = {
      TAVILY_API_KEY: "tvly-test",
      COMPANY_RESEARCH_PROVIDER_MODULE: "./providers/__fixtures__/valid-test-provider",
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        answer: "Acme Corp is a fast-paced, fully remote startup.",
        results: [{ content: "Acme Corp offers remote-first work." }],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await searchCompanyInfo("Acme Corp");

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(result?.answer).toBe("Acme Corp is a fast-paced, fully remote startup.");
    expect(result?.snippets).toEqual(
      expect.arrayContaining(["Acme Corp offers remote-first work.", "Custom result for Acme Corp"]),
    );
  });

  it("still returns Tavily's result when the custom provider module is misconfigured (never blocks the other source)", async () => {
    mockEnv = { TAVILY_API_KEY: "tvly-test", COMPANY_RESEARCH_PROVIDER_MODULE: "./providers/__fixtures__/invalid-test-provider" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ answer: "Acme Corp is a fast-paced, fully remote startup.", results: [] }),
      }),
    );

    const result = await searchCompanyInfo("Acme Corp");

    expect(result).toEqual({ answer: "Acme Corp is a fast-paced, fully remote startup.", snippets: [] });
  });

  it("returns null (never throws) when the only configured provider module doesn't export a valid provider", async () => {
    mockEnv = { COMPANY_RESEARCH_PROVIDER_MODULE: "./providers/__fixtures__/invalid-test-provider" };

    await expect(searchCompanyInfo("Acme Corp")).resolves.toBeNull();
  });
});
