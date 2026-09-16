import { describe, expect, it } from "vitest";
import { buildOutputLanguageInstruction } from "./output-language";

describe("buildOutputLanguageInstruction", () => {
  it("names English for locale 'en'", () => {
    expect(buildOutputLanguageInstruction("en")).toContain("fluent English");
  });

  it("names Turkish for locale 'tr'", () => {
    expect(buildOutputLanguageInstruction("tr")).toContain("fluent Turkish");
  });

  it("names German for locale 'de'", () => {
    expect(buildOutputLanguageInstruction("de")).toContain("fluent German");
  });
});
