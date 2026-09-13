import { describe, expect, it, vi } from "vitest";

let cookieValue: string | undefined;

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (name === "locale" && cookieValue !== undefined ? { value: cookieValue } : undefined),
  }),
}));

const { getLocale } = await import("./locale-cookie");

describe("getLocale", () => {
  it("returns the locale from the cookie when it's a supported value", async () => {
    cookieValue = "tr";
    expect(await getLocale()).toBe("tr");
  });

  it("falls back to the default locale when the cookie is unset", async () => {
    cookieValue = undefined;
    expect(await getLocale()).toBe("en");
  });

  it("falls back to the default locale when the cookie holds an unsupported value", async () => {
    cookieValue = "fr";
    expect(await getLocale()).toBe("en");
  });
});
